const path = require('path');
const fs = require('fs');

const IS_VERCEL = process.env.VERCEL === '1';
const DATA_FILE = path.join(__dirname, '..', 'data.json');

let kv;
let useKV = false;

const KV_TOKEN = process.env.KV_REST_API_TOKEN || '';
let KV_URL = process.env.KV_REST_API_URL || process.env.KV_URL || '';

// Derive REST API URL from rediss:// URL if needed
if (KV_URL.startsWith('rediss://') && !KV_URL.startsWith('https://')) {
  KV_URL = KV_URL.replace(/^rediss:\/\/[^@]+@/, 'https://').replace(/:6379$/, '');
}

if (KV_URL.startsWith('https://') && KV_TOKEN) {
  try {
    const { createClient } = require('@vercel/kv');
    kv = createClient({ url: KV_URL, token: KV_TOKEN });
    useKV = true;
  } catch (e) {
    if (IS_VERCEL) {
      throw new Error('db: Vercel KV init failed — ' + e.message);
    }
    console.error('db: KV init failed:', e.message);
  }
}

let memCache = {};

function loadFromFile() {
  if (IS_VERCEL) return;
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      memCache = JSON.parse(raw);
    }
  } catch (e) { console.error('db: failed to load data file:', e.message); }
}

function saveToFile() {
  if (IS_VERCEL) return;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(memCache, null, 2), 'utf-8');
  } catch (e) { console.error('db: failed to save data file:', e.message); }
}

async function get(key) {
  if (useKV) return kv.get(key);
  if (IS_VERCEL) throw new Error('db: KV not available');
  return memCache[key] ?? null;
}

async function set(key, value) {
  if (useKV) return kv.set(key, value);
  if (IS_VERCEL) throw new Error('db: KV not available');
  memCache[key] = value;
  saveToFile();
}

async function del(key) {
  if (useKV) return kv.del(key);
  if (IS_VERCEL) throw new Error('db: KV not available');
  delete memCache[key];
  saveToFile();
}

function initLocal() {
  loadFromFile();
  return { get, set, del };
}

module.exports = { get, set, del, initLocal };
