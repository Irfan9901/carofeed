const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const { get, set } = require('../../lib/db');
const { hashPassword, verifyPassword } = require('../../lib/crypto');
const { generateToken, requireAuth } = require('../middleware/auth');
const { normalizePhone } = require('../../lib/phone');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many registration attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

function safeUser(u) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, tier: u.tier || "paid", generateCount: u.generateCount || 0 };
}

async function pruneExpiredTokens() {
  try {
    let resetTokens = await get('resetTokens') || [];
    if (!Array.isArray(resetTokens)) resetTokens = [];
    const before = resetTokens.length;
    resetTokens = resetTokens.filter(t => t && !t.used && t.expiresAt > Date.now());
    if (resetTokens.length < before) {
      await set('resetTokens', resetTokens);
    }
    return before - resetTokens.length;
  } catch { return 0; }
}

async function ensureAdminExists() {
  let users = await get('users');
  if (!Array.isArray(users)) users = [];
  const hasAdmin = users.some((u) => u && typeof u === 'object' && u.role === 'admin');
  if (!hasAdmin) {
    if (process.env.VERCEL === '1' && !process.env.ADMIN_SEED_PASSWORD) {
      throw new Error('ADMIN_SEED_PASSWORD env var required on Vercel to seed admin. Set it and redeploy.');
    }
    const adminPwPlain = process.env.ADMIN_SEED_PASSWORD || crypto.randomBytes(4).toString('hex');
    const adminPassword = await hashPassword(adminPwPlain);
    users.push({
      id: 's-admin-001',
      name: 'Admin',
      email: 'admin@cps.local',
      phone: '',
      password: adminPassword,
      role: 'admin',
      tier: 'paid',
      generateCount: 0,
      createdAt: Date.now(),
    });
    await set('users', users);
    if (process.env.VERCEL !== '1') {
      console.log('========================================================================');
      console.log(` Admin seeded — login: admin@cps.local / ${adminPwPlain}`);
      console.log(` Change password immediately after first login.`);
      console.log('========================================================================');
    }
  }
  return users;
}

router.get('/google-config', (req, res) => {
  res.json({ clientId: process.env.GOOGLE_CLIENT_ID || '' });
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const users = await ensureAdminExists();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) return res.status(401).json({ error: 'User not found' });
    if (!(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    if (!user.tier) { user.tier = 'paid'; user.generateCount = user.generateCount || 0; await set('users', users); }

    const token = generateToken(user);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/register', registerLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password required' });
    if (password.length < 4) return res.status(400).json({ error: 'Password minimal 4 karakter' });

    let users = await get('users') || [];
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) return res.status(409).json({ error: 'Email sudah terdaftar' });
    if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) return res.status(409).json({ error: 'Nama sudah digunakan' });

    const newUser = {
      id: 's-' + uuidv4().slice(0, 7),
      name,
      email,
      phone: '',
      password: await hashPassword(password),
      role: 'user',
      tier: 'free',
      generateCount: 0,
      googleId: null,
      avatar: '',
      createdAt: Date.now(),
    };

    users.push(newUser);
    await set('users', users);

    const token = generateToken(newUser);
    res.status(201).json({ token, user: safeUser(newUser) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: 'Google credential required' });

    let payload;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (clientId) {
      const { OAuth2Client } = require('google-auth-library');
      const client = new OAuth2Client(clientId);
      const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
      payload = ticket.getPayload();
    } else {
      try {
        const parts = credential.split('.');
        payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
      } catch { return res.status(501).json({ error: 'Google OAuth not configured on server' }); }
    }

    const { email, name, sub, picture } = payload;
    if (!email) return res.status(400).json({ error: 'Google account has no email' });

    let users = await get('users') || [];
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      user.googleId = sub;
      user.avatar = user.avatar || picture || '';
      if (!user.tier) { user.tier = 'paid'; user.generateCount = user.generateCount || 0; }
    } else {
      user = {
        id: 's-' + uuidv4().slice(0, 7),
        name,
        email,
        phone: '',
        password: '',
        role: 'user',
        tier: 'free',
        generateCount: 0,
        googleId: sub,
        avatar: picture || '',
        createdAt: Date.now(),
      };
      users.push(user);
    }
    await set('users', users);

    const token = generateToken(user);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

router.get('/quota', requireAuth, async (req, res) => {
  try {
    let users = await get('users') || [];
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.tier) { user.tier = 'paid'; user.generateCount = user.generateCount || 0; await set('users', users); }

    const config = await get('appConfig') || { freeLimit: 20, upgradeLink: '' };
    const freeLimit = config.freeLimit || 20;
    const upgradeLink = config.upgradeLink || '';
    const generateCount = user.generateCount || 0;
    const tier = user.tier || 'paid';

    if (tier === 'paid') return res.json({ tier, generateCount, freeLimit, upgradeLink, canGenerate: true });

    // Device check: prevent same device from using multiple free accounts
    const deviceId = req.headers['x-device-id'];
    let deviceBlocked = false;
    if (deviceId) {
      const deviceAccounts = await get(`deviceAccounts:${deviceId}`) || [];
      if (deviceAccounts.length > 0 && !deviceAccounts.includes(user.id)) {
        deviceBlocked = true;
      }
    }

    res.json({ tier, generateCount, freeLimit, upgradeLink, canGenerate: generateCount < freeLimit && !deviceBlocked, deviceBlocked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    let users = await get('users');
    if (!users) users = [];
    const idx = users.findIndex((u) => u.id === req.user.id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    if (!(await verifyPassword(currentPassword, users[idx].password))) {
      return res.status(401).json({ error: 'Current password is wrong' });
    }

    users[idx].password = await hashPassword(newPassword);
    await set('users', users);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ error: 'Email and phone required' });
    }

    let users = await get('users');
    if (!users) users = [];
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(404).json({ error: 'Email anda belum terdaftar, segera hubungi admin' });

    const storedPhone = normalizePhone(user.phone || '');
    if (storedPhone && storedPhone !== normalizePhone(phone)) {
      return res.status(401).json({ error: 'Phone number does not match' });
    }

    await pruneExpiredTokens();
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    let resetTokens = await get('resetTokens') || [];
    resetTokens.push({
      tokenHash,
      userId: user.id,
      expiresAt: Date.now() + 60 * 60 * 1000,
      used: false,
    });
    await set('resetTokens', resetTokens);

    res.json({
      success: true,
      resetToken,
      waNumber: storedPhone || normalizePhone(phone),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password required' });
    }
    if (newPassword.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    let resetTokens = await get('resetTokens') || [];
    const entry = resetTokens.find(
      (t) => t.tokenHash === tokenHash && !t.used && t.expiresAt > Date.now()
    );
    if (!entry) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    let users = await get('users');
    if (!users) users = [];
    const idx = users.findIndex((u) => u.id === entry.userId);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    users[idx].password = await hashPassword(newPassword);
    entry.used = true;
    await set('users', users);
    await pruneExpiredTokens();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    let users = await get('users') || [];
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.tier) { user.tier = 'paid'; user.generateCount = user.generateCount || 0; await set('users', users); }

    res.json({ user: safeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/reset-admin', async (req, res) => {
  try {
    const { resetKey, newPassword } = req.body;
    const expectedKey = process.env.ADMIN_RESET_KEY;
    if (!expectedKey) return res.status(400).json({ error: 'ADMIN_RESET_KEY not configured on server' });
    if (!resetKey || resetKey !== expectedKey) return res.status(403).json({ error: 'Invalid reset key' });
    if (!newPassword || newPassword.length < 4) return res.status(400).json({ error: 'Password minimal 4 karakter' });

    let users = await get('users');
    if (!Array.isArray(users)) users = [];
    const idx = users.findIndex(u => u && u.role === 'admin');
    if (idx === -1) return res.status(404).json({ error: 'No admin found' });

    users[idx].password = await hashPassword(newPassword);
    await set('users', users);
    res.json({ success: true, email: users[idx].email });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Sub-routers for cross-mounting (reduce Vercel function count) ---
const adminRouter = express.Router();
adminRouter.get('/config', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
    const config = await get('appConfig') || { freeLimit: 20, upgradeLink: '' };
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
adminRouter.put('/config', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
    const { freeLimit, upgradeLink } = req.body;
    const config = {
      freeLimit: typeof freeLimit === 'number' && freeLimit > 0 ? freeLimit : 20,
      upgradeLink: typeof upgradeLink === 'string' ? upgradeLink : '',
    };
    await set('appConfig', config);
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const generateRouter = express.Router();
generateRouter.post('/complete', requireAuth, async (req, res) => {
  try {
    let users = await get('users') || [];
    const idx = users.findIndex(u => u.id === req.user.id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    if (!users[idx].tier) users[idx].tier = 'paid';

    // Record device→user mapping for free accounts
    const deviceId = req.headers['x-device-id'];
    if (deviceId && users[idx].tier === 'free') {
      const deviceAccounts = await get(`deviceAccounts:${deviceId}`) || [];
      if (!deviceAccounts.includes(users[idx].id)) {
        deviceAccounts.push(users[idx].id);
        await set(`deviceAccounts:${deviceId}`, deviceAccounts);
      }
    }

    users[idx].generateCount = (users[idx].generateCount || 0) + 1;
    await set('users', users);

    res.json({ success: true, generateCount: users[idx].generateCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = { router, pruneExpiredTokens, adminRouter, generateRouter };
