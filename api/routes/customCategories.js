const express = require('express');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
const CUSTOM_KEY = 'customCategories';
const IMAGE_KEY = 'categoryImages';

// GET /api/custom-categories — ambil semua kategori kustom
router.get('/', async (req, res) => {
  try {
    const cats = await get(CUSTOM_KEY) || {};
    res.json({ categories: cats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/custom-categories — tambah kategori baru (admin only)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, styles } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Nama kategori diperlukan' });
    }
    await mutate(CUSTOM_KEY, function(cats) {
      if (!cats || typeof cats !== 'object') cats = {};
      if (cats[name]) throw new HttpError(400, 'Kategori sudah ada');
      cats[name] = styles || [];
      return cats;
    });
    res.json({ success: true, category: name, styles: styles || [] });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/custom-categories/:catName — hapus kategori (admin only)
router.delete('/:catName', requireAdmin, async (req, res) => {
  try {
    const { catName } = req.params;
    const images = await get(IMAGE_KEY) || {};
    await mutate(CUSTOM_KEY, function(cats) {
      if (!cats || typeof cats !== 'object') cats = {};
      if (cats[catName]) {
        const styles = cats[catName] || [];
        styles.forEach((s) => { delete images[s.id]; });
        delete cats[catName];
      }
      return cats;
    });
    await set(IMAGE_KEY, images);
    res.json({ success: true, category: catName });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// POST /api/custom-categories/:catName/styles — tambah style ke kategori (admin only)
router.post('/:catName/styles', requireAdmin, async (req, res) => {
  try {
    const { catName } = req.params;
    const { id, label, desc, icon, tags } = req.body;
    if (!id || !label) {
      return res.status(400).json({ error: 'id dan label style diperlukan' });
    }
    const result = await mutate(CUSTOM_KEY, function(cats) {
      if (!cats || typeof cats !== 'object') cats = {};
      if (!cats[catName]) throw new HttpError(404, 'Kategori tidak ditemukan');
      if (cats[catName].some((s) => s.id === id)) throw new HttpError(400, 'Style id sudah ada di kategori ini');
      cats[catName].push({
        id,
        label,
        desc: desc || '',
        icon: icon || 'ti-star',
        tags: tags || [],
      });
      return cats;
    });
    res.json({ success: true, category: catName, styles: result[catName] });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/custom-categories/:catName/styles/:styleId — hapus style (admin only)
router.delete('/:catName/styles/:styleId', requireAdmin, async (req, res) => {
  try {
    const { catName, styleId } = req.params;
    const images = await get(IMAGE_KEY) || {};
    await mutate(CUSTOM_KEY, function(cats) {
      if (!cats || typeof cats !== 'object') cats = {};
      if (!cats[catName]) throw new HttpError(404, 'Kategori tidak ditemukan');
      cats[catName] = cats[catName].filter((s) => s.id !== styleId);
      return cats;
    });
    if (images[styleId]) {
      delete images[styleId];
      await set(IMAGE_KEY, images);
    }
    res.json({ success: true, category: catName, styleId });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
