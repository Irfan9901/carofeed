const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { get, set } = require('../../lib/db');
const { hashPassword } = require('../../lib/crypto');
const { requireAdmin } = require('../middleware/auth');
const { normalizePhone } = require('../../lib/phone');

const router = express.Router();

router.get('/', requireAdmin, async (req, res) => {
  try {
    const users = (await get('users')) || [];
    const safe = users.map(({ password, ...u }) => u);
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    let users = (await get('users')) || [];
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = {
      id: 's-' + uuidv4().slice(0, 7),
      name,
      email,
      phone: normalizePhone(phone || ''),
      password: await hashPassword(password),
      role: role === 'admin' ? 'admin' : 'user',
      createdAt: Date.now(),
    };

    users.push(newUser);
    await set('users', users);

    const { password: _, ...safe } = newUser;
    res.status(201).json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    let users = (await get('users')) || [];
    const target = users.find((u) => u.id === req.params.id);
    if (!target) return res.status(404).json({ error: 'User not found' });

    if (users.length <= 1) {
      return res.status(400).json({ error: 'Cannot delete the last user' });
    }

    users = users.filter((u) => u.id !== req.params.id);
    await set('users', users);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    let users = (await get('users')) || [];
    const idx = users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    if (req.body.phone !== undefined) {
      users[idx].phone = normalizePhone(req.body.phone);
    }
    if (req.body.name !== undefined) users[idx].name = req.body.name;
    if (req.body.email !== undefined) users[idx].email = req.body.email;
    if (req.body.role !== undefined && req.user.role === 'admin') {
      users[idx].role = req.body.role;
    }

    await set('users', users);
    const { password, ...safe } = users[idx];
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
