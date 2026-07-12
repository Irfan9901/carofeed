const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const SALT_ROUNDS = 12;
const APP_CIPHER_ALGO = 'aes-256-gcm';
const APP_CIPHER_SALT = 'cps-v2-server-salt-9f3a2b';

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function getCipherKey() {
  return crypto.scryptSync(APP_CIPHER_SALT, 'cps-key-derivation', 32);
}

function encryptApiKey(plaintext) {
  const key = getCipherKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(APP_CIPHER_ALGO, key, iv);
  let encrypted = cipher.update(plaintext, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return JSON.stringify({ iv: iv.toString('hex'), ct: encrypted, tag: authTag });
}

function decryptApiKey(encoded) {
  try {
    const { iv, ct, tag } = JSON.parse(encoded);
    const key = getCipherKey();
    const decipher = crypto.createDecipheriv(APP_CIPHER_ALGO, key, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    let decrypted = decipher.update(ct, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  } catch (e) {
    console.error('crypto: failed to decrypt API key:', e.message);
    return null;
  }
}

module.exports = { hashPassword, verifyPassword, encryptApiKey, decryptApiKey };
