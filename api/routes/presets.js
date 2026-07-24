const express = require('express');
const crypto = require('crypto');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const PRESETS_KEY = 'presets';

router.get('/', requireAuth, async (req, res) => {
  try {
    const all = await get(PRESETS_KEY) || [];
    const userPresets = all.filter((p) => p.userId === req.user.id);
    res.json({ presets: userPresets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, data } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'name is required' });
    }
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'data must be an object' });
    }

    let preset;
    let duplicate = false;
    await mutate(PRESETS_KEY, function(all) {
      if (!Array.isArray(all)) all = [];
      if (all.some(p => p.userId === req.user.id && p.name.toLowerCase() === name.trim().toLowerCase())) {
        duplicate = true;
        return all;
      }
      preset = {
        id: crypto.randomBytes(8).toString('hex'),
        userId: req.user.id,
        name: name.trim(),
        data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      all.push(preset);
      return all;
    });
    if (duplicate) return res.status(409).json({ error: 'Sudah Ada, Gunakan Nama Yang Berbeda' });
    res.json({ success: true, preset });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, data } = req.body;
    let updated;
    await mutate(PRESETS_KEY, function(all) {
      if (!Array.isArray(all)) all = [];
      const idx = all.findIndex((p) => p.id === req.params.id && p.userId === req.user.id);
      if (idx === -1) throw new HttpError(404, 'Preset not found');
      if (name) all[idx].name = name.trim();
      if (data) all[idx].data = data;
      all[idx].updatedAt = Date.now();
      updated = all[idx];
      return all;
    });
    res.json({ success: true, preset: updated });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await mutate(PRESETS_KEY, function(all) {
      if (!Array.isArray(all)) all = [];
      const filtered = all.filter((p) => !(p.id === req.params.id && p.userId === req.user.id));
      if (filtered.length === all.length) throw new HttpError(404, 'Preset not found');
      return filtered;
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
