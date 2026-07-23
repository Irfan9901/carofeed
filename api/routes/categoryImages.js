const express = require('express');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { requireAdmin } = require('../middleware/auth');
const { uploadImage, deleteImage } = require('../../lib/supabase');

const router = express.Router();

const IMAGE_KEY = 'categoryImages';

// GET /api/category-images — ambil semua gambar kategori
router.get('/', async (req, res) => {
  try {
    const images = await get(IMAGE_KEY) || {};
    res.json({ images });
  } catch (err) {
    console.error('Get category images error:', err);
    res.status(500).json({ error: 'Failed to load category images' });
  }
});

// PUT /api/category-images/:styleId — upload/ganti gambar (admin only)
router.put('/:styleId', requireAdmin, async (req, res) => {
  try {
    const { styleId } = req.params;
    const { imageData } = req.body;
    if (!imageData || typeof imageData !== 'string') {
      return res.status(400).json({ error: 'imageData (base64 data URL) required' });
    }
    if (!imageData.startsWith('data:image/')) {
      return res.status(400).json({ error: 'imageData must start with data:image/' });
    }
    const sizeBytes = Math.round(imageData.length * 0.75);
    if (sizeBytes > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'Image too large (max 5MB)' });
    }

    const url = await uploadImage(styleId, imageData);
    if (!url) {
      return res.status(500).json({ error: 'Failed to upload image to storage' });
    }

    await mutate(IMAGE_KEY, function(images) {
      if (!images || typeof images !== 'object') images = {};
      images[styleId] = url;
      return images;
    });
    res.json({ success: true, styleId, url });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error('Upload image error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// DELETE /api/category-images/:styleId — hapus gambar (admin only)
router.delete('/:styleId', requireAdmin, async (req, res) => {
  try {
    const { styleId } = req.params;
    await deleteImage(styleId);
    await mutate(IMAGE_KEY, function(images) {
      if (!images || typeof images !== 'object') images = {};
      delete images[styleId];
      return images;
    });
    res.json({ success: true, styleId });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error('Delete image error:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
