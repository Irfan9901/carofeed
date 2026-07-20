const express = require('express');
const path = require('path');
const fs = require('fs');
const { requireAdmin } = require('../middleware/auth');
const { get, set } = require('../../lib/db');

const router = express.Router();

const VALID_NICHE_KEYS = new Set(['purpose', 'audience']);
const VALID_PROMPT_KEYS = new Set(['system_idea', 'user_idea', 'system_slide', 'user_slide', 'negative_prompt']);
const LANDING_SECTIONS = new Set(['hero', 'features', 'steps', 'pricing', 'testimonials', 'faq', 'blog', 'cta', 'appUrl', 'labels', 'customSections', 'settings']);

function assert(cond, msg) { if (!cond) throw new Error(msg); }

function validateNicheMap(body) {
  assert(body && typeof body === 'object' && !Array.isArray(body), 'niches: must be an object');
  for (const [key, val] of Object.entries(body)) {
    assert(typeof key === 'string' && key, `niches: invalid key "${key}"`);
    assert(val && typeof val === 'object' && !Array.isArray(val), `niches: "${key}" must be an object`);
    for (const k of Object.keys(val)) {
      assert(VALID_NICHE_KEYS.has(k), `niches: "${key}" has unknown field "${k}"`);
      assert(typeof val[k] === 'string', `niches: "${key}.${k}" must be a string`);
    }
  }
}

function validateSubnicheMap(body) {
  assert(body && typeof body === 'object' && !Array.isArray(body), 'subniches: must be an object');
  for (const [key, val] of Object.entries(body)) {
    assert(typeof key === 'string' && key, `subniches: invalid key "${key}"`);
    assert(Array.isArray(val), `subniches: "${key}" must be an array`);
    for (const item of val) {
      assert(typeof item === 'string', `subniches: "${key}" items must be strings`);
    }
  }
}

function validateVisualCategories(body) {
  if (body.categories !== undefined) {
    assert(body.categories && typeof body.categories === 'object', 'visual-categories: must be an object or array');
    if (Array.isArray(body.categories)) {
      for (const cat of body.categories) {
        assert(cat && typeof cat === 'object', 'visual-categories: each category must be an object');
        assert(typeof cat.name === 'string', 'visual-categories: each category must have a string name');
        assert(Array.isArray(cat.styles), 'visual-categories: each category must have a styles array');
      }
    } else {
      for (const [key, val] of Object.entries(body.categories)) {
        assert(typeof key === 'string', 'visual-categories: each key must be a string');
        assert(Array.isArray(val), `visual-categories: "${key}" must be an array`);
      }
    }
  }
  if (body.palettes !== undefined) {
    assert(body.palettes && typeof body.palettes === 'object' && !Array.isArray(body.palettes), 'style-palettes: must be an object');
  }
}

function validatePrompts(body) {
  assert(body && typeof body === 'object' && !Array.isArray(body), 'prompts: must be an object');
  for (const k of Object.keys(body)) {
    assert(VALID_PROMPT_KEYS.has(k), `prompts: unknown field "${k}"`);
    assert(typeof body[k] === 'string', `prompts: "${k}" must be a string`);
  }
}

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const KV_KEYS = {
  niches: 'data_niches',
  subniches: 'data_subniches',
  visualCategories: 'data_visual_categories',
  stylePalettes: 'data_style_palettes',
  prompts: 'data_prompts',
  landingPage: 'data_landing_page',
};

function readJSON(name) {
  const filePath = path.join(DATA_DIR, name);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// GET /api/data — load from KV (if available) or fallback to JSON files
async function getData(kvKey, fileName) {
  try {
    const kvData = await get(kvKey);
    if (kvData) return kvData;
  } catch {}
  return readJSON(fileName);
}

router.get('/niches', async (req, res) => {
  try {
    const data = await getData(KV_KEYS.niches, 'niches.json');
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/subniches', async (req, res) => {
  try {
    const data = await getData(KV_KEYS.subniches, 'subniches.json');
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/visual-categories', async (req, res) => {
  try {
    const categories = await getData(KV_KEYS.visualCategories, 'visual-categories.json');
    const palettes = await getData(KV_KEYS.stylePalettes, 'style-palettes.json');
    res.json({ categories, palettes });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/prompts', async (req, res) => {
  try {
    const data = await getData(KV_KEYS.prompts, 'prompts.json');
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin: save updated data to KV
router.put('/niches', requireAdmin, async (req, res) => {
  try { validateNicheMap(req.body); await set(KV_KEYS.niches, req.body); res.json({ success: true }); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/subniches', requireAdmin, async (req, res) => {
  try { validateSubnicheMap(req.body); await set(KV_KEYS.subniches, req.body); res.json({ success: true }); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/visual-categories', requireAdmin, async (req, res) => {
  try {
    validateVisualCategories(req.body);
    if (req.body.categories !== undefined) await set(KV_KEYS.visualCategories, req.body.categories);
    if (req.body.palettes !== undefined) await set(KV_KEYS.stylePalettes, req.body.palettes);
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/prompts', requireAdmin, async (req, res) => {
  try { validatePrompts(req.body); await set(KV_KEYS.prompts, req.body); res.json({ success: true }); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

router.get('/landing', async (req, res) => {
  try {
    const data = await getData(KV_KEYS.landingPage, 'landing.json');
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/landing', requireAdmin, async (req, res) => {
  try {
    const body = req.body;
    assert(body && typeof body === 'object' && !Array.isArray(body), 'landing: must be an object');
    for (const k of Object.keys(body)) {
      assert(LANDING_SECTIONS.has(k), `landing: unknown section "${k}"`);
    }
    await set(KV_KEYS.landingPage, body);
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
