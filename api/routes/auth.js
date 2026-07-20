const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
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

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
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

router.get('/me', requireAuth, (req, res) => {
  res.json({
    user: { id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
});

// Reset admin password via ADMIN_RESET_KEY env var
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

module.exports = { router, pruneExpiredTokens };
