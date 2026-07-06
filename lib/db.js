const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

let store;
let useRedis = false;

if (process.env.KV_URL && process.env.KV_REST_API_TOKEN) {
  try {
    const { Redis } = require('@upstash/redis');
    store = new Redis({
      url: process.env.KV_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    useRedis = true;
  } catch {}
}

let memCache = {};

function loadFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      memCache = JSON.parse(raw);
    }
  } catch {}
}

function saveToFile() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(memCache, null, 2), 'utf-8');
  } catch {}
}

async function get(key) {
  if (useRedis) return store.get(key);
  return memCache[key] ?? null;
}

async function set(key, value) {
  if (useRedis) return store.set(key, value);
  memCache[key] = value;
  saveToFile();
}

async function del(key) {
  if (useRedis) return store.del(key);
  delete memCache[key];
  saveToFile();
}

function initLocal() {
  loadFromFile();
  return { get, set, del };
}

module.exports = { get, set, del, initLocal };
