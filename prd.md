# PRD: Carofeed

> **URL:** https://carofeed.vercel.app
> **Alias:** carofeed.vercel.app
> **Tagline:** "Mengubah Ide Menjadi Carousel Profesional"
> **Tujuan:** AI-powered Instagram carousel prompt generator untuk content creator Indonesia

---

## 1. Ringkasan Produk

Carofeed adalah aplikasi web yang membantu content creator Indonesia membuat konten Instagram carousel secara profesional. Pengguna memilih topik dan preferensi visual, AI menghasilkan konten per slide (headline, body, visualIdea), lalu output siap di-copy sebagai JSON prompt untuk image generator seperti ChatGPT.

---

## 2. Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Node.js + Express.js (serverless via Vercel Functions) |
| Frontend | Vanilla JS + Tailwind CSS (static build) — single HTML SPA |
| Database | Vercel KV (Upstash Redis), fallback JSON file lokal |
| AI | OpenCode API (`opencode.ai/zen/v1/chat/completions`) |
| Auth | JWT (jsonwebtoken) + Google Sign-In |
| Email | Nodemailer via Gmail SMTP |
| Image Storage | Supabase Storage |
| Dependencies | express, cors, bcryptjs, jsonwebtoken, uuid, google-auth-library, nodemailer, playwright, @upstash/redis |

---

## 3. Arsitektur

- **Vercel Routing:** `/api/*` → `api/index.js`, `/*` → `public/index.html`
- **Backend:** Express app monolithic, routes per domain di `api/routes/`
- **Frontend:** Single `public/index.html` + `public/app.js` (~3600 baris) + `public/styles.css` (545 baris)
- **Database Layer:** `lib/db.js` — abstraction over Upstash Redis (production) atau JSON file (development)
- **No JS framework/library** — pure vanilla JS DOM manipulation

---

## 4. Database Schema (KV Keys)

Semua operasi database melalui `lib/db.js` — abstraction layer dengan 3 fungsi:
- `get(key)` — read value
- `set(key, value)` — overwrite value
- `mutate(key, callback)` — atomic read-modify-write: baca current → callback ubah → simpan

Production menggunakan `@upstash/redis` (REST API). Development (`DEV_MODE=true`) pakai JSON file di folder `data/`. `mutate()` dipakai untuk semua update yang butuh baca+tulis (register user, increment generate count, push array, dll.) untuk menghindari race condition.

| Key | Type | Deskripsi |
|-----|------|-----------|
| `users` | `User[]` | Array of user objects |
| `presets` | `Preset[]` | Array of preset objects |
| `config` | `object` | AI configuration (models, prompts, api key) |
| `settings` | `object` keyed by userId | User preferences (theme, dll) |
| `appConfig` | `object` | `{ freeLimit, upgradeLink }` |
| `resetTokens` | `object` keyed by token | Password reset tokens |
| `categoryImages` | `object` keyed by styleId | `{ styleId: supabaseUrl }` |
| `customCategories` | `object` keyed by name | `{ name: Style[] }` |
| `guide` | `GuideItem[]` | Step-by-step guide content |
| `data_*` | varies | CMS data: niches, subniches, visualCategories, palettes, prompts, layouts, landing page |
| `deviceAccounts:<deviceId>` | `string[]` | Daftar user ID free yang pernah generate dari device ini. Begitu ada 1+ entry, device tidak bisa dipakai akun free lain. |

### User Object

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "password": "bcrypt hash",
  "role": "user | admin",
  "tier": "free | paid",
  "wa": "string (opsional)",
  "generateCount": 0,
  "deviceId": "string (opsional)",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Preset Object

```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "string",
  "data": { /* all form fields */ },
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

---

## 5. Fitur Detail

### A. Manajemen Konten Carousel

- **Input fields:**
  - Niche (30 pilihan, misal: Bisnis, Kesehatan, Teknologi, Parenting, dll.)
  - Subniche (20 per niche, total ~600)
  - Topik/judul — manual atau generate via AI (jika topik sudah diisi manual, "Generate ide dari niche" hanya membuat cover hook — topik tidak ditimpa)
  - Tujuan konten (textarea)
  - Target audiens (textarea)
  - Jumlah slide (1-15, default 5)
  - Aspek rasio (1:1, 4:5, 9:16)
  - Gaya visual dari 49 style preset dalam 10 kategori (Modern, Illustration, 3D, Artistic, Classic, Tropical, Urban, Luxury, Playful, Minimal)
  - Layout slide (40+ layout dari `data_layouts` key — admin dapat mengelola via CRUD)
  - Palet warna (3 warna + auto-fill dari style palette)
  - Color picker HSV
  - Custom style tags (comma-separated) — digabung ke `activeStyleTags()` untuk `style_tags` & modul Style Direction (dedupe case-insensitive)
  - Brand notes
  - Swipe text toggle ("Geser untuk melanjutkan") — hanya dipakai di output slide isi carousel, tidak di poster/penutup
  - Negative prompt (field JSON terpisah, tidak duplikat di dalam `prompt`)
- **AI Generate Ide Topik:** POST ke AI dengan konteks niche/subniche → menghasilkan `{ topic, coverHook }`. Jika topik sudah diisi manual → mode hook-only: hanya `coverHook` dibuat, topik tidak ditimpa (`generateIdeaFromNiche()` di app.js)
- **AI Generate Konten Slide:** POST ke AI → menghasilkan `{ headline, body, visualIdea }` per slide
- **Poster Tunggal (Jumlah slide = 1):** memakai prompt `system_poster`/`user_poster` (editable admin) → JSON array berisi PERSIS 1 elemen yang tuntas tanpa kelanjutan (hook → inti → CTA). Brief tetap lengkap: topic, purpose, audience, slideCount=1, brandNote, niche, subniche, customStyle, dan coverHook diadaptasi menjadi "Poster headline HARUS persis: …" + perintah tuntas tanpa kelanjutan. Label tombol: "AI menyusun poster…"
- **Slide Editor:** Add slide, remove slide, reorder (drag), edit teks per slide
- **JSON Output:** Viewer dengan copy button

### B. Copy Prompt Output (Salin Prompt)

Fitur **salin prompt** menghasilkan 1 string `prompt` per slide (dari `composeMainPrompt()` di `app.js`). Struktur tersusun dari modul-modul berikut, dianggap aktif sesuai input/kondisi:

| Modul | Isi | Sumber Parameter | Kondisi |
|-------|-----|------------------|---------|
| **1. Opening** | `A professional premium social media poster in {rasio} portrait format.` **atau** `A premium Instagram carousel {role} in {rasio} portrait format.` + kualitas (`Highly ultra realistic ... cinematic lighting material`) + visualIdea + `IGNORE any color mentioned.` | `state.slideCount`, `state.ratio` (`getAspectRatioValue()`), `slide.role`, `slide.visualIdea` | selalu |
| **2. Konteks Niche/Topic/Hook** | `Visual elements relevant to the {niche} ({subniche}) niche ...` + `Topic-related visual elements: "{topic}".` + `Cover hook-related visual elements: "{coverHook}".` | `#inp-evergreen-niche`, `#inp-subniche` (DOM), `state.topic`, `state.coverHook` | tiap baris hanya jika terisi |
| **3. Style Direction** | `The ENTIRE composition MUST follow the style: {preset-tags}, {custom-style-tags}, {hex-palette}. Every background, texture...` — satu-satunya blok style, tanpa duplikasi label preset | `activeStyleTags()` (preset `state.stylePreset` + custom `state.customStyle`, dedupe case-insensitive) + hex warna | jika ada tag/palette |
| **4. Layout** | `Layout: {label}. Posisi teks: {textPos}...` | `state.layout` → `LAYOUT_LIST` | jika layout terpilih |
| **5. Text Overlay** | `Text overlay reads "{headline}". Supporting text: "{body}".` | `slide.headline`, `slide.body` | jika headline terisi |
| **6. Color Palette** | `Color palette: Primary (use as backgrounds, Texts, main elements): {c1}. Secondary (use as text and elements): {c2}. Accent (use as text and elements): {c3}.` | `state.color1..3`, fallback `state.palette` | jika warna manual terisi |
| **7. Brand Note** | `Text overlay "{brandNote}" at top left corner, without logo.` | `state.brandNote` | jika terisi |
| **8. Swipe Text** | `Include subtle "Geser Untuk Melanjutkan →" text at the bottom.` | `state.slideCount`, `state.swipeText` | slideCount > 1 DAN swipe ON DAN role ≠ penutup |
| **9. CTA (Penutup)** | `Call-to-action text: ... never "Geser", "→" or "swipe".` | — | hanya `role === "penutup"` (poster/tunggal TANPA CTA) |
| **10. Strict Rules** | Larangan makhluk hidup + `Ignore any color instructions ... use ONLY palette colors` | konstanta | selalu |

**Catatan:** pemakaian `getPaletteString()` yang lain (untuk AI generate) tidak berubah; wording khusus "peran warna" hanya dipakai di modul 6. Kata `CTA` di seed layout (`data/layouts.json`) sudah diganti `area ajakan` untuk menghindari image generator menggambar teks "Geser".

### C. Preset System

- **Simpan preset** — validasi duplicate name per user
- **Load preset** — dropdown memuat semua preset user
- **Hapus preset**
- Data preset: seluruh parameter form + slide content

### C. Free Tier & Review System

- **Free limit:** 20 generates (default, configurable via admin panel)
- **Device lock:** 1 device = maksimal 1 akun free. Setelah device dipakai akun free A untuk generate, akun free B di device yang sama langsung diblokir (bahkan sebelum mencapai limit 20). Cek di `/api/auth/quota` (line 243-248) via `deviceAccounts:<deviceId>`.
- **Review prompt:** modal muncul di generate ke-10
- **2 review questions:** "Seberapa puas?" (bintang) + "Apa yang kurang?"
- **Email delivery:** review → `cerddig@gmail.com`
- **Thank you modal:** setelah review terkirim

### D. Admin Panel

- **User Management:**
  - Table: Nama, Email, WA, Role, Tier, Generate Count, Actions (Delete)
  - Role dropdown: user / admin
  - Tier dropdown: free / paid (admin auto-paid, disabled)
  - GenerateCount: inline edit
  - Filter by role, search by email
  - Tambah user manual (name, email, password, role, WA)
- **Konfigurasi:**
  - freeLimit (number)
  - upgradeLink (URL)
  - AI model management: enable/disable, custom models, archive
  - API key editor
  - Prompt editor: system/user prompt (idea, slide, coverhook, poster) + negative prompt
  - Guide editor (8 steps, reorderable)
  - Category images: upload/delete per styleId
  - Custom categories: add/delete, add/remove styles with images
  - Niche/subniche full CRUD (tambah/hapus niche, tambah/hapus subniche)
  - Layout slide CRUD — admin dapat tambah/edit/hapus layout (disimpan di `data_layouts` key)
  - Visual categories & palettes editor
  - Switch user: login sebagai user lain
  - Landing page CMS: hero title, subtitle, features, pricing cards, FAQ, footer

### E. User Features

- Register (email + password + optional WA)
- Login (email + password)
- Google Sign-In
- Forgot password → email reset link
- Reset password dengan token
- Change password (dari dalam app)
- Dark/Light theme toggle
- Swipe text toggle (on/off "Geser untuk melanjutkan")
- Panduan penggunaan (8-step guide rail)

### F. Autentikasi & Keamanan

- **JWT:** 7 hari expiry, dikirim via httpOnly cookie + Authorization header
- **Admin seed:** ADMIN_SEED_PASSWORD env → auto-create admin pertama
- **Admin reset:** `/api/auth/reset-admin` dengan ADMIN_RESET_KEY
- **Rate limiting:**
  - Login: 10 attempts per 15 menit per IP
  - Register: 5 attempts per 15 menit per IP
  - AI chat: 20 requests per menit
  - Global: 100 requests per menit
- **Middleware:** `requireAdmin` check, `requireUser` check
- **CORS:** strict origin

### G. UI/UX

- **Theme:** Dark mode by default (bg #000, panel #111835)
- **Light mode:** toggleable via JS (class toggle on `<html>`)
- **Typography:** Inter (body), Fraunces (display), JetBrains Mono (code)
- **Color accent:** Amber (#E8A33D / #ffbe0b) — semua button solid amber
- **Form labels:** text-sm (14px)
- **Scrollbar:** custom dark styling
- **Step rail:** vertical timeline dengan numbered circles
- **Responsive:** mobile-first, touch-friendly
- **Loading states:** spinner saat AI generate
- **Toast notifications:** untuk feedback sukses/error

---

## 6. API Endpoints

### Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/auth/google-config` | Public | Google OAuth client ID |
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| POST | `/api/auth/google` | Public | Google Sign-In |
| GET | `/api/auth/quota` | User | Quota info + review check |
| POST | `/api/auth/review/send` | User | Submit review |
| POST | `/api/auth/change-password` | User | Change password |
| POST | `/api/auth/forgot-password` | Public | Send reset email |
| POST | `/api/auth/reset-password` | Public | Reset with token |
| GET | `/api/auth/me` | User | Current user data |
| POST | `/api/auth/reset-admin` | Public | Emergency admin reset |

### Users (Admin)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/users` | Admin | List all users |
| POST | `/api/users` | Admin | Create user manually |
| PUT | `/api/users/:id` | Admin | Update role/tier/count |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Presets
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/presets` | User | List user presets |
| POST | `/api/presets` | User | Save preset |
| PUT | `/api/presets/:id` | User | Update preset |
| DELETE | `/api/presets/:id` | User | Delete preset |

### AI
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/ai/models` | User | Active models list |
| PUT | `/api/ai/models` | Admin | Set active models |
| POST | `/api/ai/custom-models` | Admin | Add custom model |
| PUT | `/api/ai/custom-models/:id` | Admin | Rename custom model |
| DELETE | `/api/ai/models/:id` | Admin | Archive/remove |
| GET | `/api/ai/api-key` | User | Check API key exists |
| PUT | `/api/ai/api-key` | Admin | Update API key |
| GET | `/api/ai/prompts` | User | Get system/user/negative prompts |
| PUT | `/api/ai/prompts` | Admin | Update prompts |
| POST | `/api/ai/chat` | User | AI chat completion |

### Admin Config
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/admin/config` | User | Get appConfig (freeLimit, upgradeLink) |
| PUT | `/api/admin/config` | Admin | Update appConfig |

### Generate
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/generate/complete` | User | Increment generate count |

### Settings
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/settings` | User | Get user settings |
| PUT | `/api/settings` | User | Update user settings |

### Category Images
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/category-images` | Public | All category images |
| PUT | `/api/category-images/:styleId` | Admin | Upload image (base64, max 5MB) |
| DELETE | `/api/category-images/:styleId` | Admin | Delete image |

### Custom Categories
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/custom-categories` | Public | All custom categories |
| POST | `/api/custom-categories` | Admin | Create category |
| DELETE | `/api/custom-categories/:catName` | Admin | Delete category + images |
| POST | `/api/custom-categories/:catName/styles` | Admin | Add style to category |
| DELETE | `/api/custom-categories/:catName/styles/:styleId` | Admin | Remove style |

### Guide
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/guide` | Public | Get guide (auto-seeded) |
| PUT | `/api/guide` | Admin | Update guide |
| POST | `/api/guide/reset` | Admin | Reset to default |

### CMS Data
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/data/niches` | Public | Get niches |
| GET | `/api/data/subniches` | Public | Get subniches |
| GET | `/api/data/visual-categories` | Public | Visual categories + palettes |
| GET | `/api/data/layouts` | Public | Get layout options |
| GET | `/api/data/prompts` | Public | CMS prompts |
| GET | `/api/data/landing` | Public | Landing page content |
| PUT | `/api/data/:key` | Admin | Update any CMS data (niches, subniches, layouts, dll) |

---

## 7. Struktur File

```
/
├── api/
│   ├── index.js              # Express app entry point
│   ├── middleware/
│   │   └── auth.js           # requireAdmin, requireUser middleware
│   └── routes/
│       ├── auth.js           # Auth endpoints
│       ├── users.js          # User management (admin)
│       ├── presets.js        # Preset CRUD
│       ├── ai.js             # AI models, prompts, chat
│       ├── admin.js          # Admin config
│       ├── settings.js       # User settings
│       ├── categoryImages.js # Category image upload
│       ├── customCategories.js # Custom categories CRUD
│       ├── guide.js          # Guide content
│       └── data.js           # CMS data
├── lib/
│   ├── db.js                 # Database abstraction (KV / JSON)
│   ├── supabase.js           # Supabase image storage client
│   └── auth.js               # JWT helpers
├── public/
│   ├── index.html            # SPA frontend
│   ├── app.js                # All frontend logic (~3600 lines)
│   └── styles.css            # Tailwind static + custom CSS
├── data/                     # JSON fallback (dev, gitignored)
├── vercel.json               # Vercel routing config
├── package.json
└── prd.md                    # This document
```

---

## 8. Deployment Workflow

```bash
# 1. Commit & push ke git
git add <files> && git commit -m "pesan" && git push

# 2. Deploy ke Vercel
npx vercel deploy --prod --yes
# Tambah --force jika perlu skip cache

# 3. Pastikan alias mengarah
npx vercel alias set <deployment-url> carofeed.vercel.app
```

**Environment Variables:**
- `JWT_SECRET` — secret untuk signing JWT
- `EMAIL_USER` / `EMAIL_PASS` — Gmail SMTP credentials
- `KV_URL` / `KV_REST_API_URL` / `KV_REST_API_TOKEN` — Upstash Redis
- `GOOGLE_CLIENT_ID` — Google OAuth
- `SUPABASE_URL` / `SUPABASE_KEY` — Image storage
- `ADMIN_RESET_KEY` — emergency admin reset
- `ADMIN_SEED_PASSWORD` — initial admin password
- `CORS_ORIGIN` — allowed origin
- `DEV_MODE` — flag untuk fallback JSON file db

---

## 9. Evolusi (Carousel Studio → Carofeed)

- **Nama domain:** carofeed.vercel.app
- **Brand logo:** SVG bar chart (36px box) — diambil dari inisial "CF"
- **Header baru:** "Carofeed" + tagline "Mengubah Ide Menjadi Carousel Profesional"
- **Meta:** title "Carofeed", description "Mengubah Ide Menjadi Carousel Profesional", theme-color #000
- **Semua referensi internal** di frontend (title, headings, logo) sudah diubah ke "Carofeed"
- **Backend API** tidak menggunakan nama brand — tetap generic

---

## 10. Catatan Teknis

- **Database:** Operasi `get`/`set`/`mutate` via `lib/db.js`. Mutations menggunakan callback untuk atomicity via Redis `JSON.GET` + `JSON.SET`. `mutate()` adalah pattern utama — cukup panggil dengan key + callback, urusan baca-tulis-simpan dihandle otomatis.
- **AI:** OpenCode API chat completion. System prompt + user prompt digabung, dikirim dengan model terpilih. Semua model auto-fallback ke model pertama jika model terpilih error.
- **Image upload:** Base64 data URL → `uploadImage(styleId, dataUrl)` di `lib/supabase.js` → URL dari Supabase disimpan di KV `categoryImages[styleId]`. Delete: `deleteImage(styleId)` hapus dari Supabase + hapus entry dari KV.
- **Layouts:** Awalnya hardcoded sebagai 40 `<option>` di `index.html`. Sekarang data-driven via `data_layouts` key — admin bisa tambah/edit/hapus layout lewat modal manager. Seed data di `data/layouts.json`.
- **Error handling:** Custom `HttpError` class untuk status code, global error handler di Express.
- **Rate limiting:** In-memory Map per IP, di-reset tiap 15 menit.
- **Free tier:** Device-based blocking: setelah device dipakai free user A, user ID-nya dicatat di `deviceAccounts:<deviceId>`. Jika akun free lain (user B) login di device yang sama, `deviceBlocked = true` dan `canGenerate = false` —