const express = require('express');
const { get, set } = require('../../lib/db');
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
    const cats = await get(CUSTOM_KEY) || {};
    if (cats[name]) {
      return res.status(400).json({ error: 'Kategori sudah ada' });
    }
    cats[name] = styles || [];
    await set(CUSTOM_KEY, cats);
    res.json({ success: true, category: name, styles: cats[name] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/custom-categories/:catName — hapus kategori (admin only)
router.delete('/:catName', requireAdmin, async (req, res) => {
  try {
    const { catName } = req.params;
    const cats = await get(CUSTOM_KEY) || {};
    if (cats[catName]) {
      // hapus juga gambar-gambar style di dalam kategori ini
      const images = await get(IMAGE_KEY) || {};
      const styles = cats[catName] || [];
      styles.forEach((s) => { delete images[s.id]; });
      delete cats[catName];
      await set(CUSTOM_KEY, cats);
      await set(IMAGE_KEY, images);
    }
    res.json({ success: true, category: catName });
  } catch (err) {
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
    const cats = await get(CUSTOM_KEY) || {};
    if (!cats[catName]) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan' });
    }
    if (cats[catName].some((s) => s.id === id)) {
      return res.status(400).json({ error: 'Style id sudah ada di kategori ini' });
    }
    cats[catName].push({
      id,
      label,
      desc: desc || '',
      icon: icon || 'ti-star',
      tags: tags || [],
    });
    await set(CUSTOM_KEY, cats);
    res.json({ success: true, category: catName, styles: cats[catName] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/custom-categories/:catName/styles/:styleId — hapus style (admin only)
router.delete('/:catName/styles/:styleId', requireAdmin, async (req, res) => {
  try {
    const { catName, styleId } = req.params;
    const cats = await get(CUSTOM_KEY) || {};
    if (!cats[catName]) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan' });
    }
    cats[catName] = cats[catName].filter((s) => s.id !== styleId);
    await set(CUSTOM_KEY, cats);
    // hapus juga gambarnya
    const images = await get(IMAGE_KEY) || {};
    if (images[styleId]) {
      delete images[styleId];
      await set(IMAGE_KEY, images);
    }
    res.json({ success: true, category: catName, styleId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
