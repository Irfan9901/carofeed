const express = require('express');
const { get, set } = require('../../lib/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/config', requireAdmin, async (req, res) => {
  try {
    const config = await get('appConfig') || { freeLimit: 20, upgradeLink: '' };
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/config', requireAdmin, async (req, res) => {
  try {
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

module.exports = router;
