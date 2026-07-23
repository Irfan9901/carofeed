const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { hashPassword } = require('../../lib/crypto');
const { requireAdmin } = require('../middleware/auth');
const { normalizePhone } = require('../../lib/phone');

const router = express.Router();

router.get('/', requireAdmin, async (req, res) => {
  try {
    const users = (await get('users')) || [];
    const safe = users.map(({ password, ...u }) => ({ ...u, tier: u.tier || 'paid', generateCount: u.generateCount || 0 }));
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

    let safe;
    await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new HttpError(409, 'Email already registered');
      }
      const newUser = {
        id: 's-' + uuidv4().slice(0, 7),
        name,
        email,
        phone: normalizePhone(phone || ''),
        password: await hashPassword(password),
        role: role === 'admin' ? 'admin' : 'user',
        tier: 'paid',
        generateCount: 0,
        createdAt: Date.now(),
      };
      users.push(newUser);
      const { password: _, ...rest } = newUser;
      safe = rest;
      return users;
    });
    res.status(201).json(safe);
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const target = await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      const target = users.find((u) => u.id === req.params.id);
      if (!target) throw new HttpError(404, 'User not found');
      if (users.length <= 1) throw new HttpError(400, 'Cannot delete the last user');
      return { value: users.filter((u) => u.id !== req.params.id), email: target.email };
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const safe = await mutate('users', async (users) => {
      if (!Array.isArray(users)) users = [];
      const idx = users.findIndex((u) => u.id === req.params.id);
      if (idx === -1) throw new HttpError(404, 'User not found');
      if (req.body.phone !== undefined) {
        users[idx].phone = normalizePhone(req.body.phone);
      }
      if (req.body.name !== undefined) users[idx].name = req.body.name;
      if (req.body.email !== undefined) users[idx].email = req.body.email;
      if (req.body.role !== undefined && req.user.role === 'admin') {
        users[idx].role = req.body.role;
      }
      if (req.body.tier !== undefined && ['free', 'paid'].includes(req.body.tier)) {
        users[idx].tier = req.body.tier;
      }
      const { password, ...safe } = users[idx];
      return { value: users, safe };
    });
    res.json(safe);
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
