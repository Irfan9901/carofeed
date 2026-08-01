const express = require('express');
const rateLimit = require('express-rate-limit');
const { get, set, mutate, HttpError } = require('../../lib/db');
const { encryptApiKey, decryptApiKey } = require('../../lib/crypto');
const { requireAdmin, requireAuth } = require('../middleware/auth');

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many AI requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const FREE_MODELS = [
  { id: 'deepseek-v4-flash-free' },
  { id: 'mimo-v2.5-free' },
  { id: 'nemotron-3-ultra-free' },
  { id: 'north-mini-code-free' },
  { id: 'big-pickle' },
];

const DEFAULT_PROMPTS = {
  system_idea: "Kamu adalah asisten kreator konten kreatif yang menguasai teknik hypnotic copywriting karya Joe Vitale. Gunakan bahasa yang SAMA dengan bahasa yang digunakan pada topik/niche yang diberikan. Ikuti aturan sumber ide berikut dengan ketat: (1) Jika pengguna memberikan niche DAN subniche, maka topik dan coverHook WAJIB berkaitan erat dengan hal-hal yang relevan pada subniche tersebut (masalah, tips, tren, atau praktik yang dibahas di subniche itu), spesifik dan mendalam. Nama niche/subniche TIDAK wajib disebut secara literal di topik, coverHook, atau isi slide — yang penting substansinya berhubungan dengan niche dan subniche. Contoh: niche='Keuangan', subniche='Investasi Saham' → topik seperti '7 Kesalahan Investasi Saham yang Sering Membuat Pemula Rugi' atau 'Strategi Jual Murah Saat Pasar Sedang Turun', bukan topik keuangan yang umum. (2) Jika pengguna hanya memberikan niche tanpa subniche, topik dan coverHook boleh bersifat generik namun tetap berkaitan erat dengan niche besar tersebut. (3) Jika pengguna tidak memberikan niche maupun subniche, pilih sendiri satu niche secara acak sebagai sumber ide topik dan coverHook. Berdasarkan sumber ide tersebut, buatkan 1 ide topik carousel Instagram yang menarik, relevan, dan spesifik dengan pendekatan hypnotic copywriting. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI. Balas HANYA dengan JSON object: {\"topic\": \"string judul carousel yang bersifat umum sebagai tema besar, gunakan teknik hypnotic copywriting Joe Vitale (pattern interrupt, curiosity gap, emotional trigger) agar langsung memikat perhatian\", \"coverHook\": \"string hook spesifik yang lebih fokus dan konkret, diturunkan dari sumber ide sesuai aturan di atas. Biasanya dalam bentuk angka, cara, tips, atau pertanyaan yang memicu rasa penasaran. Contoh: topic='Menghadapi krisis ekonomi di Indonesia', coverHook='5 Cara Berhemat di Masa Krisis Ekonomi Saat Ini'\"}. Jangan tambahkan teks lain.",
  user_idea: "Niche: {{niche}}\nSubniche: {{subniche}}\n\nBuat 1 ide topik carousel sesuai aturan pada system prompt.",
  system_coverhook: "Kamu adalah asisten kreator konten kreatif yang menguasai teknik hypnotic copywriting karya Joe Vitale. Topik carousel SUDAH ditentukan oleh pengguna — JANGAN membuat topik baru atau mengubah topik. Tugasmu: buatkan 1 coverHook yang fokus dan spesifik sebagai inti pembahasan dari topik tersebut, tetap berhubungan dengan niche dan subniche yang diberikan (tidak wajib menyebutkan nama niche/subniche secara literal). Gunakan bahasa yang SAMA dengan bahasa topik, santai alami seperti tulisan manusia, hindari frasa klise AI, dengan teknik hypnotic copywriting (pattern interrupt, curiosity gap, emotional trigger, embedded command). Balas HANYA dengan JSON object: {\"coverHook\": \"string hook fokus yang lebih konkret dan spesifik dari topik. Biasanya dalam bentuk angka, cara, tips, atau pertanyaan yang memicu rasa penasaran. Contoh: topik='Menghadapi krisis ekonomi di Indonesia', coverHook='5 Cara Berhemat di Masa Krisis Ekonomi Saat Ini'\"}. Jangan tambahkan teks lain.",
  system_slide: "Kamu adalah asisten penyusun konten carousel Instagram yang menguasai teknik hypnotic copywriting karya Joe Vitale. Gunakan bahasa yang SAMA dengan bahasa yang digunakan pada topik. Tugasmu: menyusun isi tiap slide (headline, isi teks singkat, ide visual) berdasarkan brief yang diberikan. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI. Buat kalimat yang terdengar manusiawi jika dibaca, bukan kalimat-kalimat nanggung khas AI. Balas HANYA dengan JSON array, tanpa teks lain, tanpa markdown code fence. Format tiap elemen: {\"headline\": \"string pendek menarik, bahasa sesuai topik\", \"body\": \"string 1 kalimat pendukung, bahasa sesuai topik\", \"visualIdea\": \"string deskripsi visual konkret dalam bahasa Inggris untuk AI image generator\"}. Slide pertama harus jadi cover/hook pembuka yang kuat menggunakan hypnotic copywriting Joe Vitale. Gunakan teknik hypnotic copywriting karya Joe Vitale di SETIAP slide agar pembaca terus tergerak membaca sampai akhir: pola kalimat yang memicu rasa penasaran (curiosity gap), pattern interrupt (kalimat yang mematahkan ekspektasi), embedded command (perintah tersirat), ajakan emosional, dan direct address (Anda/Kamu). Bukan sekadar informatif — setiap slide harus membuat pembaca ingin lanjut ke slide berikutnya dengan rasa penasaran yang tak tertahankan. Slide terakhir harus jadi kesimpulan atau call-to-action sesuai tujuan. Seluruh isi slide (headline, body, visualIdea) harus berhubungan dengan niche dan subniche yang ada pada brief, namun tidak wajib menyebutkan nama niche/subniche secara literal. visualIdea TIDAK BOLEH mengandung makhluk hidup, karakter, manusia, hewan, atau mahluk biologis apapun. Hanya diperbolehkan objek, teks, bangunan, abstrak, pemandangan alam tanpa mahluk hidup. Jumlah elemen array harus PERSIS sama dengan jumlah slide yang diminta.",
  user_slide: "Topik: {{topic}}\nTujuan: {{purpose}}\nTarget audiens: {{audience}}\nNiche: {{niche}}\nSubniche: {{subniche}}\nJumlah slide: {{slideCount}}{{brandNoteLine}}\n \nSusun {{slideCount}} slide untuk carousel ini.",
  user_coverhook: "Topik: {{topic}}\nNiche: {{niche}}\nSubniche: {{subniche}}\n\nBuat 1 cover hook yang fokus sebagai inti pembahasan dari topik di atas.",
  system_poster: "Kamu adalah asisten kreator konten visual yang menguasai teknik hypnotic copywriting karya Joe Vitale. Tugasmu: membuat 1 poster tunggal (single poster) yang BERDIRI SENDIRI — BUKAN bagian dari carousel, TIDAK boleh ada kelanjutan, TIDAK boleh menyebut slide lain, TIDAK boleh berakhir dengan ajakan \"lanjut ke slide berikutnya\". Seluruh pesan harus tuntas dalam SATU slide: hook pembuka yang kuat → inti/value utama → kesimpulan + call-to-action. Gunakan bahasa yang SAMA dengan bahasa topik, santai alami seperti tulisan manusia, hindari frasa klise AI. Pakai teknik hypnotic copywriting (pattern interrupt, curiosity gap, emotional trigger, embedded command, direct address). Seluruh isi harus berhubungan dengan niche dan subniche pada brief, tidak wajib menyebutnya secara literal. visualIdea TIDAK BOLEH mengandung makhluk hidup, karakter, manusia, hewan, atau mahluk biologis apapun — hanya objek, teks, bangunan, abstrak, pemandangan alam tanpa makhluk hidup. Balas HANYA dengan JSON array berisi PERSIS SATU elemen: [{\"headline\": \"string hook singkat memikat, bahasa sesuai topik\", \"body\": \"string 1-2 kalimat pendukung yang memuat inti pesan DAN call-to-action, bahasa sesuai topik\", \"visualIdea\": \"string deskripsi visual konkret dalam bahasa Inggris untuk AI image generator yang menggambarkan keseluruhan konsep poster\"}]. Tanpa teks lain, tanpa markdown code fence.",
  user_poster: "Topik: {{topic}}\nTujuan: {{purpose}}\nTarget audiens: {{audience}}\nNiche: {{niche}}\nSubniche: {{subniche}}\nJumlah slide: {{slideCount}}{{brandNoteLine}}\n \nBuat 1 poster tunggal yang tuntas tanpa kelanjutan sesuai brief di atas.",
  system_posteridea: "Kamu adalah asisten kreator konten kreatif yang menguasai teknik hypnotic copywriting karya Joe Vitale. Pengguna akan membuat POSTER TUNGGAL (1 slide, tanpa kelanjutan) — jadi topik dan coverHook yang kamu buat harus BUKAN tips, BUKAN daftar angka/cara (misal '5 Cara…', '7 Tips…'), BUKAN serial, dan BUKAN bagian awal dari serial atau tips; keduanya harus berupa ide copywriting persuasif yang berdiri sendiri dan tuntas dalam satu pesan. Ikuti aturan sumber ide berikut dengan ketat: (1) Jika pengguna memberikan niche DAN subniche, maka topik dan coverHook WAJIB berkaitan erat dengan hal-hal yang relevan pada subniche tersebut, spesifik dan mendalam. Nama niche/subniche TIDAK wajib disebut secara literal. Contoh: niche='Keuangan', subniche='Investasi Saham' → topik seperti 'Kepanikan pasar adalah saat kamu paling dikendalikan emosi', bukan '7 Kesalahan Investasi Saham yang Sering Membuat Pemula Rugi'. (2) Jika pengguna hanya memberikan niche tanpa subniche, topik dan coverHook boleh bersifat generik namun tetap berkaitan erat dengan niche besar tersebut. (3) Jika pengguna tidak memberikan niche maupun subniche, pilih sendiri satu niche secara acak sebagai sumber ide. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI, dengan teknik hypnotic copywriting (pattern interrupt, curiosity gap, emotional trigger). Balas HANYA dengan JSON object: {\"topic\": \"string tema besar poster tunggal, non-tips non-serial, memikat perhatian\", \"coverHook\": \"string hook spesifik poster tunggal, copywriting persuasif yang menuntaskan satu pesan, non-tips non-serial, bukan 'X Cara/Tips…'\"}. Jangan tambahkan teks lain.",
  user_posteridea: "Niche: {{niche}}\nSubniche: {{subniche}}\n\nBuat 1 ide topik poster tunggal (non-tips, non-serial) sesuai aturan pada system prompt.",
  system_posterhook: "Kamu adalah copywriter konten Instagram yang menguasai teknik hypnotic copywriting karya Joe Vitale. Topik SUDAH ditentukan oleh pengguna — JANGAN membuat topik baru atau mengubah topik. Tugasmu: buatkan 1 headline/cover hook untuk POSTER TUNGGAL yang berdiri sendiri. Hook ini BUKAN tips, BUKAN daftar angka/cara (misal '5 Cara…', '7 Tips…'), BUKAN serial, dan BUKAN bagian awal dari serial atau tips — melainkan copywriting/teks persuasif yang tuntas memikat dalam satu kalimat: pattern interrupt, curiosity gap, emotional trigger, atau direct address. Tetap berhubungan dengan niche dan subniche yang diberikan (tidak wajib menyebutkan nama niche/subniche secara literal). Gunakan bahasa yang SAMA dengan bahasa topik, santai alami seperti tulisan manusia, hindari frasa klise AI. Balas HANYA dengan JSON object: {\"coverHook\": \"string hook poster tunggal berupa copywriting persuasif non-tips non-serial, spesifik dan konkret\"}. Jangan tambahkan teks lain.",
  user_posterhook: "Topik: {{topic}}\nNiche: {{niche}}\nSubniche: {{subniche}}\n\nBuat 1 cover hook poster tunggal (copywriting persuasif, bukan tips/serial) dari topik di atas.",
  negative_prompt: "blurry, low quality, distorted text, extra limbs, watermark, signature, cropped, jpeg artifacts, inconsistent style with other slides, logo, living beings, character"
};

const PROMPTS_VERSION = 6;

function defaultConfig() {
  return { apiKeyEncrypted: null, activeModels: FREE_MODELS.map((m) => m.id), customModels: [], archivedModels: [], prompts: { ...DEFAULT_PROMPTS }, promptsVersion: PROMPTS_VERSION };
}

async function getConfig() {
  let cfg = await get('config');
  if (!cfg) return defaultConfig();
  // Migrasi satu kali: prompt baru (versi 2) menimpa prompt lama yang tersimpan
  if (cfg.promptsVersion !== PROMPTS_VERSION) {
    cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS }, promptsVersion: PROMPTS_VERSION };
    await set('config', cfg);
  } else if (!cfg.prompts) {
    cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS } };
  }
  return cfg;
}

router.get('/models', requireAuth, async (req, res) => {
  try {
    const cfg = await getConfig();
    const archived = cfg.archivedModels || [];
    const filteredFree = FREE_MODELS.filter((m) => !archived.includes(m.id));
    const customModels = (cfg.customModels || []).map((id) => ({ id, custom: true }));
    const allModels = [...filteredFree, ...customModels];
    res.json({
      models: allModels,
      activeModels: cfg.activeModels || allModels.map((m) => m.id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/models', requireAdmin, async (req, res) => {
  try {
    const { activeModels } = req.body;
    if (!Array.isArray(activeModels)) {
      return res.status(400).json({ error: 'activeModels must be an array' });
    }
    await mutate('config', function(cfg) {
      if (!cfg) cfg = defaultConfig();
      if (!cfg.prompts) cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS } };
      cfg.activeModels = activeModels;
      return cfg;
    });
    res.json({ success: true, activeModels });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/custom-models', requireAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Model ID required' });
    }
    if (FREE_MODELS.some((m) => m.id === id)) {
      return res.status(409).json({ error: 'Model is already in the free list' });
    }
    await mutate('config', function(cfg) {
      if (!cfg) cfg = defaultConfig();
      if (!cfg.prompts) cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS } };
      if ((cfg.customModels || []).includes(id)) throw new HttpError(409, 'Custom model already exists');
      cfg.customModels = [...(cfg.customModels || []), id];
      cfg.activeModels = [...(cfg.activeModels || []), id];
      return cfg;
    });
    res.status(201).json({ success: true, id });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/custom-models/:id', requireAdmin, async (req, res) => {
  try {
    const { id: newId } = req.body;
    if (!newId || typeof newId !== 'string') {
      return res.status(400).json({ error: 'New model ID required' });
    }
    if (FREE_MODELS.some((m) => m.id === newId)) {
      return res.status(409).json({ error: 'Model ID already exists in free list' });
    }
    const oldId = req.params.id;
    await mutate('config', function(cfg) {
      if (!cfg) cfg = defaultConfig();
      if (!cfg.prompts) cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS } };
      if (!(cfg.customModels || []).includes(oldId)) throw new HttpError(404, 'Custom model not found');
      if ((cfg.customModels || []).includes(newId) && oldId !== newId) throw new HttpError(409, 'New model ID already exists');
      cfg.customModels = (cfg.customModels || []).map((m) => (m === oldId ? newId : m));
      cfg.activeModels = (cfg.activeModels || []).map((m) => (m === oldId ? newId : m));
      return cfg;
    });
    res.json({ success: true, id: newId });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/models/:id', requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await mutate('config', function(cfg) {
      if (!cfg) cfg = defaultConfig();
      if (!cfg.prompts) cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS } };
      if (FREE_MODELS.some((m) => m.id === id)) {
        cfg.archivedModels = [...new Set([...(cfg.archivedModels || []), id])];
      } else {
        cfg.customModels = (cfg.customModels || []).filter((m) => m !== id);
      }
      cfg.activeModels = (cfg.activeModels || []).filter((m) => m !== id);
      return cfg;
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api-key', requireAuth, async (req, res) => {
  try {
    const cfg = await getConfig();
    res.json({ hasKey: !!cfg.apiKeyEncrypted, keyPrefix: cfg.apiKeyEncrypted ? cfg.apiKeyEncrypted.substring(0, 12) + '...' : null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/api-key', requireAdmin, async (req, res) => {
  try {
    const { apiKey } = req.body;
    if (apiKey && typeof apiKey !== 'string') {
      return res.status(400).json({ error: 'API key must be a string' });
    }
    await mutate('config', function(cfg) {
      if (!cfg) cfg = defaultConfig();
      if (!cfg.prompts) cfg = { ...cfg, prompts: { ...DEFAULT_PROMPTS } };
      cfg.apiKeyEncrypted = apiKey ? encryptApiKey(apiKey) : null;
      return cfg;
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/prompts', requireAuth, async (req, res) => {
  try {
    const cfg = await getConfig();
    const prompts = { ...DEFAULT_PROMPTS, ...(cfg.prompts || {}) };
    res.json({ prompts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/prompts', requireAdmin, async (req, res) => {
  try {
    const { prompts } = req.body;
    if (!prompts || typeof prompts !== 'object') {
      return res.status(400).json({ error: 'prompts object required' });
    }
    await mutate('config', function(cfg) {
      if (!cfg) cfg = defaultConfig();
      const existing = cfg.prompts || {};
      cfg.prompts = { ...DEFAULT_PROMPTS, ...existing, ...prompts };
      return cfg;
    });
    res.json({ success: true });
  } catch (err) {
    if (err instanceof HttpError) return res.status(err.statusCode).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/chat', requireAuth, aiLimiter, async (req, res) => {
  try {
    const { model, messages, max_tokens, temperature } = req.body;

    if (!model || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'model and messages required' });
    }

    const cfg = await getConfig();
    if (!cfg.apiKeyEncrypted) {
      return res.status(400).json({ error: 'API key not configured. Ask admin to set it up.' });
    }

    const apiKey = decryptApiKey(cfg.apiKeyEncrypted);
    if (!apiKey) {
      return res.status(500).json({ error: 'Failed to decrypt API key' });
    }
    // Re-encrypt with current salt if was using legacy salt
    if (cfg.apiKeyEncrypted !== encryptApiKey(apiKey)) {
      await mutate('config', function(cfg) {
        if (!cfg) cfg = defaultConfig();
        cfg.apiKeyEncrypted = encryptApiKey(apiKey);
        return cfg;
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
      const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'User-Agent': 'Carofeed/2.0',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          max_tokens: max_tokens || 2000,
          temperature: temperature || 0.7,
          messages,
        }),
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errText = await response.text();
        return res.status(response.status).json({ error: `OpenCode API error: ${errText}` });
      }

      const data = await response.json();
      res.json(data);
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        return res.status(504).json({ error: 'AI request timed out' });
      }
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
