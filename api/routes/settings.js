const express = require('express');
const { get, set, mutate, HttpError } = require('../../lib/db');
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
    let userSettings;
    await mutate(SETTINGS_KEY, function(all) {
      if (!all || typeof all !== 'object') all = {};
      const current = all[req.user.id] || {};
      all[req.user.id] = { ...current, ...settings };
      userSettings = all[req.user.id];
      return all;
    });
    res.json({ success: true, settings: userSettings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
