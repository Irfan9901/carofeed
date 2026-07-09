const express = require('express');
const { get, set } = require('../../lib/db');
const { encryptApiKey, decryptApiKey } = require('../../lib/crypto');
const { requireAdmin, requireAuth } = require('../middleware/auth');

const router = express.Router();

const FREE_MODELS = [
  { id: 'deepseek-v4-flash-free' },
  { id: 'mimo-v2.5-free' },
  { id: 'nemotron-3-ultra-free' },
  { id: 'north-mini-code-free' },
  { id: 'big-pickle' },
];

async function getConfig() {
  let cfg = await get('config');
  if (!cfg) {
    cfg = { apiKeyEncrypted: null, activeModels: FREE_MODELS.map((m) => m.id), customModels: [], archivedModels: [] };
    await set('config', cfg);
  }
  return cfg;
}

async function saveConfig(cfg) {
  await set('config', cfg);
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
    const cfg = await getConfig();
    cfg.activeModels = activeModels;
    await saveConfig(cfg);
    res.json({ success: true, activeModels });
  } catch (err) {
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
    const cfg = await getConfig();
    if ((cfg.customModels || []).includes(id)) {
      return res.status(409).json({ error: 'Custom model already exists' });
    }
    cfg.customModels = [...(cfg.customModels || []), id];
    cfg.activeModels = [...(cfg.activeModels || []), id];
    await saveConfig(cfg);
    res.status(201).json({ success: true, id });
  } catch (err) {
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
    const cfg = await getConfig();
    const oldId = req.params.id;
    if (!(cfg.customModels || []).includes(oldId)) {
      return res.status(404).json({ error: 'Custom model not found' });
    }
    if ((cfg.customModels || []).includes(newId) && oldId !== newId) {
      return res.status(409).json({ error: 'New model ID already exists' });
    }
    cfg.customModels = (cfg.customModels || []).map((m) => (m === oldId ? newId : m));
    cfg.activeModels = (cfg.activeModels || []).map((m) => (m === oldId ? newId : m));
    await saveConfig(cfg);
    res.json({ success: true, id: newId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/custom-models/:id', requireAdmin, async (req, res) => {
  try {
    const cfg = await getConfig();
    cfg.customModels = (cfg.customModels || []).filter((m) => m !== req.params.id);
    cfg.activeModels = (cfg.activeModels || []).filter((m) => m !== req.params.id);
    await saveConfig(cfg);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/models/:id', requireAdmin, async (req, res) => {
  try {
    const cfg = await getConfig();
    const id = req.params.id;
    if (FREE_MODELS.some((m) => m.id === id)) {
      cfg.archivedModels = [...new Set([...(cfg.archivedModels || []), id])];
      cfg.activeModels = (cfg.activeModels || []).filter((m) => m !== id);
    } else {
      cfg.customModels = (cfg.customModels || []).filter((m) => m !== id);
      cfg.activeModels = (cfg.activeModels || []).filter((m) => m !== id);
    }
    await saveConfig(cfg);
    res.json({ success: true });
  } catch (err) {
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
    const cfg = await getConfig();
    if (apiKey) {
      if (typeof apiKey !== 'string') {
        return res.status(400).json({ error: 'API key must be a string' });
      }
      cfg.apiKeyEncrypted = encryptApiKey(apiKey);
    } else {
      cfg.apiKeyEncrypted = null;
    }
    await saveConfig(cfg);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/chat', requireAuth, async (req, res) => {
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
      const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'User-Agent': 'CarouselPromptStudio/2.0',
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
