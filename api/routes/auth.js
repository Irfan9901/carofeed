const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { hashPassword, verifyPassword } = require('../../lib/crypto');
const { generateToken, requireAuth } = require('../middleware/auth');
const { normalizePhone } = require('../../lib/phone');
const sendEmail = require('../lib/email');

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
    await mutate('resetTokens', async (resetTokens) => {
      const arr = Array.isArray(resetTokens) ? resetTokens : [];
      return arr.filter(t => t && !t.used && t.expiresAt > Date.now());
    });
  } catch {}
}

async function ensureAdminExists() {
  return await mutate('users', async (users) => {
    if (!Array.isArray(users)) users = [];
    const hasAdmin = users.some((u) => u && typeof u === 'object' && u.role === 'admin');
    if (!hasAdmin) {
      if (process.env.VERCEL === '1' && !process.env.ADMIN_SEED_PASSWORD) {
        console.warn('ADMIN_SEED_PASSWORD not set — admin cannot be auto-seeded on Vercel. Use /api/auth/reset-admin instead.');
        return users;
      }
      const adminPwPlain = process.env.ADMIN_SEED_PASSWORD || crypto.randomBytes(4).toString('hex');
      const adminPassword = await hashPassword(adminPwPlain);
      // Cek apakah sudah ada user dengan email admin (misal hasil register sebelumnya)
      const existing = users.findIndex(u => u.email === 'admin@cps.local');
      if (existing !== -1) {
        // Upgrade jadi admin daripada bikin duplikat
        users[existing].role = 'admin';
        users[existing].tier = 'paid';
        users[existing].password = adminPassword;
        if (users[existing].email !== 'admin@cps.local') users[existing].email = 'admin@cps.local';
      } else {
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
      }
      if (process.env.VERCEL !== '1') {
        console.log('========================================================================');
        console.log(` Admin seeded — login: admin@cps.local / ${adminPwPlain}`);
        console.log(` Change password immediately after first login.`);
        console.log('========================================================================');
      }
    }
    return users;
  });
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

    if (!user.tier) {
      await mutate('users', async (users) => {
        const u = users.find(x => x.id === user.id);
        if (u) { u.tier = 'paid'; u.generateCount = u.generateCount || 0; }
        return users;
      });
    }

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

    let newUser;
    await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new HttpError(409, 'Email sudah terdaftar');
      if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) throw new HttpError(409, 'Nama sudah digunakan');
      newUser = {
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
      return users;
    });

    const token = generateToken(newUser);
    res.status(201).json({ token, user: safeUser(newUser) });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
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

    let foundUser;
    await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (foundUser) {
        foundUser.googleId = sub;
        foundUser.avatar = foundUser.avatar || picture || '';
        if (!foundUser.tier) { foundUser.tier = 'paid'; foundUser.generateCount = foundUser.generateCount || 0; }
      } else {
        foundUser = {
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
        users.push(foundUser);
      }
      return users;
    });

    const token = generateToken(foundUser);
    res.json({ token, user: safeUser(foundUser) });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

router.get('/quota', requireAuth, async (req, res) => {
  try {
    let users = await get('users') || [];
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.tier) {
      await mutate('users', async (users) => {
        const u = users.find(x => x.id === user.id);
        if (u) { u.tier = 'paid'; u.generateCount = u.generateCount || 0; }
        return users;
      });
    }

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

    res.json({ tier, generateCount, freeLimit, upgradeLink, canGenerate: generateCount < freeLimit && !deviceBlocked, deviceBlocked, reviewRequired: tier === 'free' && generateCount === 10 });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/review/send — free user review after 10 generates
router.post('/review/send', requireAuth, async (req, res) => {
  try {
    const { q1, q2 } = req.body;
    if (!q1 || !q2) return res.status(400).json({ error: 'Both questions must be answered' });

    const users = await get('users') || [];
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const html = `
      <h2>Review Pengguna Carousel Studio</h2>
      <p><strong>Nama:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <hr>
      <p><strong>1. Bagaimana pendapatmu tentang produk ini?</strong></p>
      <p>${q1}</p>
      <p><strong>2. Bagaimana produk ini membantu kamu?</strong></p>
      <p>${q2}</p>
    `;

    await sendEmail('cerddig@gmail.com', 'Review Pengguna Carousel Studio', html);
    res.json({ success: true });
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

    await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      const idx = users.findIndex((u) => u.id === req.user.id);
      if (idx === -1) throw new HttpError(404, 'User not found');
      if (!(await verifyPassword(currentPassword, users[idx].password))) {
        throw new HttpError(401, 'Current password is wrong');
      }
      users[idx].password = await hashPassword(newPassword);
      return users;
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    let users = await get('users');
    if (!users) users = [];
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(404).json({ error: `Email ${email} tidak ditemukan` });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    await mutate('resetTokens', async (resetTokens) => {
      let arr = Array.isArray(resetTokens) ? resetTokens : [];
      arr = arr.filter(t => t && !t.used && t.expiresAt > Date.now()); // prune expired
      arr.push({
        tokenHash,
        userId: user.id,
        expiresAt: Date.now() + 60 * 60 * 1000,
        used: false,
      });
      return arr;
    });

    const html = `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#E8A33D">Reset Password Carofeed</h2>
        <p>Halo <strong>${user.name || 'User'}</strong>,</p>
        <p>Token reset password Anda:</p>
        <div style="background:#2A271E;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:16px;color:#E8A33D;word-break:break-all;margin:16px 0;text-align:center">
          ${resetToken}
        </div>
        <p style="color:#948C7A;font-size:12px">Token berlaku 1 jam. Abaikan email ini jika Anda tidak meminta reset password.</p>
      </div>
    `;

    try {
      await sendEmail(email, 'Token Reset Password Carofeed', html);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal mengirim email. Coba lagi nanti.' });
    }
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
    let foundEntry;
    await mutate('resetTokens', async (resetTokens) => {
      let arr = Array.isArray(resetTokens) ? resetTokens : [];
      foundEntry = arr.find(
        (t) => t.tokenHash === tokenHash && !t.used && t.expiresAt > Date.now()
      );
      if (!foundEntry) throw new HttpError(400, 'Invalid or expired reset token');
      foundEntry.used = true;
      return arr.filter(t => t && !t.used && t.expiresAt > Date.now()); // prune expired sekalian
    });

    await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      const idx = users.findIndex((u) => u.id === foundEntry.userId);
      if (idx === -1) throw new HttpError(404, 'User not found');
      users[idx].password = await hashPassword(newPassword);
      return users;
    });

    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    let users = await get('users') || [];
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.tier) {
      await mutate('users', function(u) { var us = u || []; var found = us.find(function(x) { return x.id === user.id; }); if (found) { found.tier = 'paid'; found.generateCount = found.generateCount || 0; } return us; });
    }

    res.json({ user: safeUser(user) });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
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

    let adminEmail;
    await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      const idx = users.findIndex(u => u && u.role === 'admin');
      if (idx === -1) throw new HttpError(404, 'No admin found');
      users[idx].password = await hashPassword(newPassword);
      adminEmail = users[idx].email;
      return users;
    });
    res.json({ success: true, email: adminEmail });
  } catch (e) {
    if (e instanceof HttpError) return res.status(e.statusCode).json({ error: e.message });
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
    const deviceId = req.headers['x-device-id'];
    let generateCount;

    const result = await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      const idx = users.findIndex(u => u.id === req.user.id);
      if (idx === -1) throw new HttpError(404, 'User not found');
      if (!users[idx].tier) users[idx].tier = 'paid';
      users[idx].generateCount = (users[idx].generateCount || 0) + 1;
      generateCount = users[idx].generateCount;
      return users;
    });

    // Record device→user mapping for free accounts (separate key, so separate mutate)
    if (deviceId && result) {
      const user = result.find(u => u.id === req.user.id);
      if (user && user.tier === 'free') {
        await mutate(`deviceAccounts:${deviceId}`, async (deviceAccounts) => {
          const arr = Array.isArray(deviceAccounts) ? deviceAccounts : [];
          if (!arr.includes(user.id)) {
            arr.push(user.id);
          }
          return arr;
        });
      }
    }

    res.json({ success: true, generateCount });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = { router, pruneExpiredTokens, adminRouter, generateRouter };
