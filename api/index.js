const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { initLocal } = require('../lib/db');

const app = express();

// Global rate limiter — berlaku hanya untuk /api/*
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again later.' },
  skip: (req) => !req.path.startsWith('/api/'),
});
app.use(globalLimiter);

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8090';
const ALLOWED_ORIGINS = CORS_ORIGIN.split(',').map((s) => s.trim());
// Dynamic CORS: allow known origins + any Vercel preview deployment
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.some(o => origin === o || origin.endsWith('.' + o.replace(/^https?:\/\//, '')))) return cb(null, true);
    if (origin.endsWith('.vercel.app')) return cb(null, true);
    cb(null, true);
  },
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://cdn.jsdelivr.net https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.vercel.app; frame-ancestors 'none'");
  next();
});
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload too large (max 5MB)' });
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

const authModule = require('./routes/auth');
const authRouter = authModule.router;
const { pruneExpiredTokens } = authModule;

// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', require('./routes/users'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/generate', require('./routes/generate'));
app.use('/api/category-images', require('./routes/categoryImages'));
app.use('/api/custom-categories', require('./routes/customCategories'));
app.use('/api/guide', require('./routes/guide'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/presets', require('./routes/presets'));
app.use('/api/data', require('./routes/data'));

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// SPA fallback
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 8090;

if (process.env.VERCEL !== '1') {
  initLocal();
  pruneExpiredTokens().then(removed => {
    if (removed > 0) console.log(`Pruned ${removed} expired reset token(s)`);
  }).catch(() => {});
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
