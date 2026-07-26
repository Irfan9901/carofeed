# Design System — Carofeed

---

## 1. Color Palette

### Dark Theme (`:root`)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-canvas` | `#000000` | Page background |
| `--bg-panel` | `#111835` | Card/panel/section background |
| `--bg-card` | `#111835` | Card background (same as panel) |
| `--bg-card-hover` | `#2A271E` | Card hover state |
| `--border-soft` | `#5E6B8A` | Subtle borders |
| `--border-strong` | `#5E5842` | Strong borders |
| `--amber` | `#E8A33D` | Primary accent — buttons, active states, highlights |
| `--amber-dim` | `#C4882A` | Dimmed amber — input focus border |
| `--amber-soft` | `#3A2E16` | Soft amber — hover backgrounds |
| `--coral` | `#D9714E` | Secondary accent — warning, role badges |
| `--cream` | `#F3EDE0` | Primary text color (off-white) |
| `--ink-soft` | `#C8C0B0` | Muted text |
| `--ink-faint` | `#948C7A` | Placeholder text, disabled states |

### Light Theme (`.light-theme`)
| Token | Value | Change |
|-------|-------|--------|
| `--bg-canvas` | `#F8F6F1` | Creamy white |
| `--bg-panel` | `#F0EDE4` | Warm light |
| `--bg-card` | `#FFFFFF` | Pure white |
| `--bg-card-hover` | `#F5F2EB` | Subtle hover |
| `--border-soft` | `#DDD8CC` | Light border |
| `--border-strong` | `#C4BBA8` | Medium border |
| `--amber` | `#8A6318` | Deep amber |
| `--amber-dim` | `#7A5510` | Darker amber |
| `--amber-soft` | `#E8D8B8` | Light amber |
| `--coral` | `#A84A2A` | Deep coral |
| `--cream` | `#1A1814` | Near-black text |
| `--ink-soft` | `#4A463C` | Dark muted |
| `--ink-faint` | `#7A7466` | Medium muted |

### Semantic Color Usage
- **All buttons:** Solid amber (`#ffbe0b` dark / `var(--amber)` light), font-weight 600
- **Primary action (Generate AI):** `.btn-ai` — amber bg, amber border
- **Ghost action (Copy, Unduh):** `.btn-ghost` — same styling as primary
- **Admin buttons (dropdown):** `.dropdown-btn` — `var(--ink-soft)`, hover → `var(--amber-soft)` bg + `var(--amber)` text
- **Input fields:** `.input-field` — bg `#100E0A`, border `var(--border-soft)`, focus → `var(--amber-dim)` + amber shadow
- **Active/selected:** `var(--amber)` text, amber border, amber-soft bg gradient

---

## 2. Typography

| Font | Role | Import |
|------|------|--------|
| **Inter** | Body text — all default text | Google Fonts |
| **Fraunces** | Display — headings, titles (`.font-display`) | Google Fonts |
| **JetBrains Mono** | Monospace — code/JSON output (`.font-mono`) | Google Fonts |

### Font Sizes (dark theme default)
```
text-[10px] — smallest labels
text-xs (12px) — secondary info, meta
text-sm (14px) — body text, form labels
text-base (16px) — body emphasis
text-lg (18px) — section headings
text-xl+ — not used in app (landing only)
```

### Responsive Scaling (desktop `>=1024px`)
```
#panel-right .text-xs  → 13px
#panel-right .text-sm  → 15px
#panel-right .text-base → 17px
#panel-right .text-lg  → 19px
#panel-right .text-[10px] → 11px
#panel-right .text-[11px] → 12px
```

---

## 3. Components

### Buttons

| Class | Purpose | Style |
|-------|---------|-------|
| `.btn-primary` | Main actions | amber `#ffbe0b` bg, `#1A1408` text, 600 weight |
| `.btn-ghost` | Secondary actions | same as primary (visually identical) |
| `.btn-ai` | Generate/AI | same as primary, with `.btn-ai:disabled` |
| `.btn-slide-copy` | Slide copy | opacity .7 → 1 on hover/active |
| `.dropdown-btn` | Admin dropdown items | `var(--ink-soft)`, amber hover |
| `.btn-ghost` (admin modals) | Add/Save | Same amber style |
| `.btn-cancel` | Cancel/Batal (modal) | `background:var(--amber-soft)` (`#3A2E16`), `color:var(--ink-soft)` — lebih kontras dari modal bg |
| `.color-swatch-btn` | Color picker swatch | 24px height, `::-webkit-color-swatch` styling |

Button states: `:hover` → `filter:brightness(1.15)`, `:active` → same, `:disabled` → opacity .5.

### Input Fields (`.input-field`)
- Background: `#100E0A` (dark) / `#FFFFFF` (light)
- Border: 1px `var(--border-soft)`, hover → `var(--amber-dim)`
- Focus: outline none, border `var(--amber-dim)`, box-shadow `0 0 0 3px #8A652622`
- Placeholder: `var(--ink-faint)`
- `<select.input-field>`: Custom chevron SVG, `appearance: none`, `padding-right:36px`

### Enhanced Select (`enhanceSelect()`)
- **Trigger:** `.enhanced-trigger` — mimics `.input-field`, border changes on hover/focus/open
- **Dropdown:** `.enhanced-dropdown` — `background:var(--bg-panel)`, max-height 200px, scrollbar
- **Options:** `.option` — padding 10px 14px, font-size 13px, word-break
  - **Hover:** `rgba(232,163,61,.12)` (amber tint)
  - **Selected:** `rgba(232,163,61,.2)` bg + `var(--amber)` text
  - Light theme: `#e8ddd0` hover, `#ddd0c0` selected

### Legacy Custom Select (`.cs-*`)
- Alternative custom select used in niche management
- `.cs-menu` — rounded 10px, padding 4px, box-shadow, fade-in animation
- `.cs-option:hover` → `#3A3426`, selected `[aria-selected="true"]` → `#4A3A1A` + `var(--amber)` text

### Modals
- Full-screen overlay: `fixed inset-0 z-50`, `background:rgba(0,0,0,.6)`
- Content card: `.rounded-xl border`, max-w-md, `background:var(--bg-card)`, `border-color:var(--border-strong)`
- Header: `flex items-center justify-between` with close button (`.ti ti-x`)
- Close on overlay click: `if (e.target === e.currentTarget) closeFn()`
- Body scroll lock: `document.body.style.overflow = "hidden"` / `""`

### Prompt Modal (Reusable)
- `showPrompt(msg, placeholder)` — function returning `Promise<string|null>` (`app.js:1562`)
- Used for: save preset name, add category name
- Modal id: `preset-name-modal` — input + Batal (amber-soft) + Simpan (amber) buttons
- Enter → confirm, Escape → cancel, overlay click → cancel

### Modal Inputs
- Admin modals (Kelola Niche, Kelola Layout, Kelola User): `py-2.5 text-sm` — **must match** the main form input standard (`~40px` height)
- Previously used `py-1.5 text-xs` (`~32px`) — standardized in 2026

### Cards
- `.style-card` — cursor pointer, `transform` + `border-color` + `background` transitions
  - Active: `border-color:var(--amber)`, amber gradient bg
  - Hover: `translateY(-1px)`, `var(--bg-card-hover)`
- `.carousel-card` — scroll-snap align center, `flex:0 0 auto`
- Guide step cards — grid/gap, with numbered circle (`.guide-step-num`)

### Toast Notifications (`.toast`)
- Animation: `slide-up` (fade in + translate up) `.25s ease both`
- Positioned dynamically via JS

### Slide Editor
- `#slide-list` — vertical flex with gap
- Each slide: drag handle + editable fields (headline, body, visual idea)
- Reorder: touch drag + mouse drag (separate handlers)

### Image Thumbnails
- `.style-thumb` — 100% width, `border-radius:6px`
- `.cat-img-thumb` — 48x36px, `object-fit:cover`, `border-radius:4px`

---

## 4. Layout

### Page Structure
```
<header> — Logo, user menu, admin dropdown
<main.layout-main> (CSS Grid)
  ├── <section#panel-left> — Form inputs, step rail, generate button
  └── <section#panel-right> — Empty state / slide preview / JSON output
```

### Grid Layout (desktop `>=1024px`)
```css
.layout-main {
  grid-template-columns: 520px 1fr;
  grid-template-rows: minmax(0, 1fr);
}
```

### Grid Layout (mobile `<1024px`)
- Single column (`1fr`), overflow visible
- Border-right removed, replaced with bottom border
- Sections stack vertically

### Step Rail
- Vertical timeline with numbered circles
- Each step: circle (`.step-num`) + title + description
- Connecting line: pseudo-element `::before` — absolute, 1px width, gradient to transparent

### Spacing Patterns
```
Padding: p-3 (12px), p-4 (16px), p-5 (20px), p-6 (24px)
Gap: gap-2 (8px), gap-3 (12px), gap-4 (16px), gap-5 (20px)
Margin: mb-1.5 (6px), mb-2 (8px), mb-3 (12px), mb-4 (16px), mb-5 (20px)
Rounded: rounded-lg (8px), rounded-xl (12px), rounded-md (6px)
```

---

## 5. Animations

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `slide-up` | 0.35s | ease both | Panel transitions, toast, modal content |
| `pulse-soft` | 1.6s | ease-in-out infinite | Loading states |
| `shimmer` | 1.4s | ease-in-out infinite | Skeleton loading (gradient slide) |
| `cs-fade-in` | 0.18s | ease | Custom select menu open |
| hover transitions | 0.15s | ease | Buttons, cards, inputs, dropdown options |

---

## 6. Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|------------|--------|-------------|
| `>=1024px` | Desktop | 2-column grid, font upscaling, carousel visible |
| `<1024px` | Tablet/mobile | Single column, border-right → border-bottom |
| `<=640px` | Small mobile | Hidden carousel, hidden meta, dropdown full-width |
| `<=480px` | Extra small | Reduced padding, smaller carousel cards |

---

## 7. Theme Toggle (Dark/Light)

Toggled by JS: adds/removes `class="light-theme"` on `<html>` element.

**All theme-aware styles:**
- CSS custom variables (colors) swapped via `.light-theme` cascade
- Button colors overridden (amber background → `#FFFFFF` text)
- Input field backgrounds → `#FFFFFF`
- Shimmer gradient colors swapped
- Dropdown option hover/selected colors swapped

---

## 8. Scrollbar Styling

```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #3a3526; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #4a4533; }
```
Overridden in specific components (`.cs-menu`, `.enhanced-dropdown`) for thinner scrollbars.

---

## 9. Admin Panel Dropdown

Located in `#user-dropdown` — contains admin-only buttons:
- Kelola AI, Kelola Prompt AI, Kelola user, Kelola Gambar Kategori, Kelola Niche, Kelola Layout, Kelola Panduan
- Visibility controlled by JS object `visibility` with `{ guest, user, admin }` keys
- Mobile: full-width, `border-radius:10px`, amber hover with transform effects
