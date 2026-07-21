const express = require('express');
const { get, set } = require('../../lib/db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/complete', requireAuth, async (req, res) => {
  try {
    let users = await get('users') || [];
    const idx = users.findIndex(u => u.id === req.user.id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    if (!users[idx].tier) users[idx].tier = 'paid';
    users[idx].generateCount = (users[idx].generateCount || 0) + 1;
    await set('users', users);

    res.json({ success: true, generateCount: users[idx].generateCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
