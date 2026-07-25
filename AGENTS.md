# Carofeed

## Ringkasan Project
AI-powered Instagram carousel prompt generator (Bahasa Indonesia).
Tech stack: Node.js/Express, Vanilla JS, Tailwind CSS, Vercel KV, Supabase, JWT + Google Auth.
Frontend SPA di `public/index.html` + `app.js` (~3600 baris).
URL: https://carofeed.vercel.app

## Struktur File Kunci
- `api/index.js` — Express entry point
- `api/routes/auth.js` — Auth, quota, review, generate/complete
- `api/routes/ai.js` — AI models & chat
- `api/routes/users.js` — User management (admin)
- `api/routes/presets.js` — Preset CRUD
- `api/routes/data.js` — CMS data (niches, subniches, visual categories, palettes, prompts, landing)
- `api/routes/admin.js` — Admin config
- `api/routes/categoryImages.js` — Category image upload/delete
- `api/routes/customCategories.js` — Custom categories CRUD
- `api/routes/guide.js` — Guide content
- `api/routes/settings.js` — User settings
- `lib/db.js` — Database abstraction (KV/JSON fallback)
- `lib/supabase.js` — Supabase storage client
- `lib/auth.js` — JWT helpers
- `public/styles.css` — Tailwind static build + custom CSS

## Database & Storage

### DB Layer (`lib/db.js`)
Abstraction atas Vercel KV / JSON fallback. Tiga operasi dasar:
- `get(key)` — baca value
- `set(key, value)` — timpa value
- `mutate(key, callback)` — atomic read-modify-write (baca -> ubah -> simpan). Dipakai untuk semua update (register, increment, push array, dll.)

Production: `@upstash/redis` REST API.
Development (DEV_MODE=true): JSON file di `data/`.

### KV Keys
users, presets, config, settings, appConfig, resetTokens, categoryImages, customCategories, guide, data_*, deviceAccounts:<deviceId>

### Image Storage (Supabase)
Upload: base64 dataURL -> Supabase Storage -> URL disimpan di `categoryImages` key.
Delete: hapus dari Supabase + hapus entry dari KV.

### Alur Data Sederhana
User action -> API route -> `get`/`mutate` key -> KV/JSON -> response JSON

## Deployment (WAJIB setiap selesai)
1. `git add <files> && git commit -m "pesan" && git push`
2. `npx vercel deploy --prod --yes`
   - Tambah `--force` jika perlu skip cache
3. `npx vercel alias set <deployment-url> carofeed.vercel.app`
4. URL live: https://carofeed.vercel.app
