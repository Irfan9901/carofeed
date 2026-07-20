const express = require('express');
const { get, set } = require('../../lib/db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const SETTINGS_KEY = 'settings';

const DEFAULTS = { theme: 'dark' };

router.get('/', requireAuth, async (req, res) => {
  try {
    const all = await get(SETTINGS_KEY) || {};
    const userSettings = all[req.user.id] || {};
    res.json({ settings: { ...DEFAULTS, ...userSettings } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', requireAuth, async (req, res) => {
  try {
    const { settings } = req.body;
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: 'settings must be an object' });
    }
    const all = await get(SETTINGS_KEY) || {};
    const current = all[req.user.id] || {};
    all[req.user.id] = { ...current, ...settings };
    await set(SETTINGS_KEY, all);
    res.json({ success: true, settings: all[req.user.id] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
