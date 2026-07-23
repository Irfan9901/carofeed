const express = require('express');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();
const GUIDE_KEY = 'guide';

const DEFAULT_GUIDE = [
  { title: 'Pilih Niche', description: 'Pilih niche & subniche yang sesuai' },
  { title: 'Isi Topik / Judul', description: 'Klik Generate untuk memanfaatkan AI atau bisa langsung isi secara manual sesuai niche' },
  { title: 'Tujuan & Audiens', description: 'Tentukan tujuan konten dan target audiens' },
  { title: 'Slide & Rasio', description: 'Atur jumlah slide dan aspek rasio' },
  { title: 'Gaya Visual', description: 'Pilih gaya, layout, dan palet warna. Berikan instruksi tambahan yang ingin diterapkan bila perlu. Isi Nama Brand atau akun anda pada Catatan Brand.' },
  { title: 'Generate AI', description: 'AI menyusun headline & isi tiap slide' },
  { title: 'Edit Slide', description: 'Sesuaikan teks, tambah atau hapus slide' },
  { title: 'Copy JSON Prompt', description: 'Salin JSON prompt lalu paste di image generator seperti ChatGPT (sangat direkomendasikan), atau yang lainnya.' },
];

router.get('/', async (req, res) => {
  try {
    let guide = await get(GUIDE_KEY);
    if (!guide || !Array.isArray(guide) || guide.length === 0) {
      guide = await mutate(GUIDE_KEY, function(g) {
        if (!g || !Array.isArray(g) || g.length === 0) return DEFAULT_GUIDE;
        return g;
      });
    }
    res.json({ guide });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    res.status(500).json({ error: err.message });
  }
});

router.post('/reset', requireAdmin, async (req, res) => {
  try {
    await set(GUIDE_KEY, DEFAULT_GUIDE);
    res.json({ success: true, guide: DEFAULT_GUIDE });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', requireAdmin, async (req, res) => {
  try {
    const { guide } = req.body;
    if (!Array.isArray(guide)) {
      return res.status(400).json({ error: 'guide must be an array' });
    }
    for (const item of guide) {
      if (!item.title || typeof item.title !== 'string') {
        return res.status(400).json({ error: 'Each item must have a title string' });
      }
    }
    await set(GUIDE_KEY, guide);
    res.json({ success: true, guide });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
