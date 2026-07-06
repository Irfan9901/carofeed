const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { get, set } = require('../../lib/db');
const { hashPassword, verifyPassword } = require('../../lib/crypto');
const { generateToken, requireAuth } = require('../middleware/auth');

const router = express.Router();

function normalizePhone(phone) {
  const digits = (phone || '').replace(/[^0-9]/g, '');
  if (digits.startsWith('0')) return '62' + digits.slice(1);
  if (digits.startsWith('8')) return '62' + digits;
  return digits;
}

async function ensureAdminExists() {
  let users = await get('users');
  if (!users) users = [];
  const hasAdmin = users.some((u) => u.role === 'admin');
  if (!hasAdmin) {
    const adminPassword = await hashPassword('admin');
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
  }
  return users;
}

router.post('/login', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    const users = await ensureAdminExists();
    const user = users.find(
      (u) => u.name.toLowerCase() === name.toLowerCase() && u.email.toLowerCase() === email.toLowerCase()
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

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    let users = await get('users');
    if (!users) users = [];

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await hashPassword(password);
    const newUser = {
      id: 's-' + uuidv4().slice(0, 7),
      name,
      email,
      phone: normalizePhone(phone || ''),
      password: hashed,
      role: role === 'admin' ? 'admin' : 'user',
      createdAt: Date.now(),
    };

    users.push(newUser);
    await set('users', users);

    const token = generateToken(newUser);
    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
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

router.post('/forgot-password', async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ error: 'Email and phone required' });
    }

    let users = await get('users');
    if (!users) users = [];
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(404).json({ error: 'Email not registered' });

    const storedPhone = normalizePhone(user.phone || '');
    if (storedPhone && storedPhone !== normalizePhone(phone)) {
      return res.status(401).json({ error: 'Phone number does not match' });
    }

    const newPassword = Math.random().toString(36).slice(2, 8);
    user.password = await hashPassword(newPassword);
    await set('users', users);

    res.json({
      success: true,
      resetPassword: newPassword,
      waNumber: storedPhone || normalizePhone(phone),
    });
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

module.exports = router;
