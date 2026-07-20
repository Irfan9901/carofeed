const API_BASE = "https://carofeed.vercel.app";
let authToken = null;
let landingData = {};

function $(id) { return document.getElementById(id); }
function val(id) { const e = $(id); return e ? e.value : ""; }
function setVal(id, v) { const e = $(id); if (e) e.value = v; }
function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function show(el) { el.classList.remove("hidden"); }
function hide(el) { el.classList.add("hidden"); }

function toast(msg, type) {
  const t = $("toast");
  t.textContent = msg;
  t.className = "toast " + (type || "");
  setTimeout(() => { t.className = "toast"; }, 3000);
}

async function api(path, opts = {}) {
  const h = { "Content-Type": "application/json" };
  if (authToken) h["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(API_BASE + path, { ...opts, headers: { ...h, ...opts.headers } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ── Auth ──

$("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = val("login-email").trim();
  const password = val("login-password");
  $("login-error").textContent = "";
  if (!email || !password) { $("login-error").textContent = "Isi email dan password"; return; }
  try {
    const res = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.user?.role !== "admin") { $("login-error").textContent = "Akun ini bukan admin"; return; }
    authToken = res.token;
    localStorage.setItem("lnd_admin_token", authToken);
    hide($("login-page"));
    show($("admin-page"));
    await loadData();
  } catch (err) {
    $("login-error").textContent = err.message;
  }
});

$("btn-logout").addEventListener("click", () => {
  authToken = null;
  localStorage.removeItem("lnd_admin_token");
  hide($("admin-page"));
  show($("login-page"));
  $("login-password").value = "";
});

// Check stored token
(async function init() {
  const stored = localStorage.getItem("lnd_admin_token");
  if (stored) {
    try {
      const res = await api("/api/auth/me", { headers: { Authorization: `Bearer ${stored}` } });
      if (res.user?.role === "admin") {
        authToken = stored;
        hide($("login-page"));
        show($("admin-page"));
        await loadData();
        return;
      }
    } catch {}
    localStorage.removeItem("lnd_admin_token");
  }
})();

// ── Tabs ──

$("tab-bar").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab]");
  if (!btn) return;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
  const panel = document.querySelector(`[data-panel="${btn.dataset.tab}"]`);
  if (panel) panel.classList.remove("hidden");
});

// ── Load ──

async function loadData() {
  try {
    landingData = await api("/api/data/landing");
  } catch (e) {
    landingData = {};
    toast("Gagal muat data: " + e.message, "error");
  }
  renderForm();
}

// ── Render Form ──

function renderForm() {
  const d = landingData || {};

  // Hero
  const h = d.hero || {};
  setVal("f-hero-badge", h.badge || "");
  setVal("f-hero-title-main", h.titleMain || "");
  setVal("f-hero-title-grad", h.titleGradient || "");
  setVal("f-hero-sub", h.subtitle || "");
  const stats = h.stats || [{num:"",label:""},{num:"",label:""},{num:"",label:""}];
  $("f-hero-stats").innerHTML = stats.map((s, i) =>
    `<div class="flex-row"><input value="${esc(s.num)}" placeholder="Angka" data-idx="${i}" data-field="num"><input value="${esc(s.label)}" placeholder="Label" data-idx="${i}" data-field="label"></div>`
  ).join("");

  // Features
  const feats = d.features || [];
  $("f-features-list").innerHTML = feats.map((f, i) =>
    `<div class="panel-card">
      <div class="flex-row mb-12">
        <input value="${esc(f.icon)}" placeholder="icon" data-idx="${i}" data-field="icon" style="width:48px;text-align:center">
        <select data-idx="${i}" data-field="gradient">
          <option value="var(--grad-purple)" ${f.gradient==='var(--grad-purple)'?'selected':''}>Purple</option>
          <option value="var(--grad-teal)" ${f.gradient==='var(--grad-teal)'?'selected':''}>Teal</option>
          <option value="var(--grad-pink)" ${f.gradient==='var(--grad-pink)'?'selected':''}>Pink</option>
          <option value="var(--grad-orange)" ${f.gradient==='var(--grad-orange)'?'selected':''}>Orange</option>
          <option value="var(--grad-blue)" ${f.gradient==='var(--grad-blue)'?'selected':''}>Blue</option>
          <option value="var(--grad-cyan)" ${f.gradient==='var(--grad-cyan)'?'selected':''}>Cyan</option>
        </select>
      </div>
      <input value="${esc(f.title)}" placeholder="Judul" data-idx="${i}" data-field="title" class="mb-12">
      <textarea rows="2" placeholder="Deskripsi" data-idx="${i}" data-field="desc">${esc(f.desc)}</textarea>
    </div>`
  ).join("");

  // Steps
  const steps = d.steps || [];
  $("f-steps-list").innerHTML = steps.map((s, i) =>
    `<div class="panel-card">
      <div class="flex-row mb-12">
        <span style="font-size:12px;font-weight:700;color:#5c6378;width:20px">${i+1}</span>
        <input value="${esc(s.title)}" placeholder="Judul langkah" data-idx="${i}" data-field="title">
      </div>
      <textarea rows="2" placeholder="Deskripsi" data-idx="${i}" data-field="desc">${esc(s.desc)}</textarea>
    </div>`
  ).join("");

  // Pricing
  const prices = d.pricing || [];
  $("f-pricing-list").innerHTML = prices.map((p, i) =>
    `<div class="panel-card" style="${p.featured?'border-color:rgba(124,58,237,.3)':''}">
      <div class="flex-row mb-12">
        <input value="${esc(p.name)}" placeholder="Nama paket" data-idx="${i}" data-field="name">
        <input value="${esc(p.price)}" placeholder="Harga" data-idx="${i}" data-field="price" style="width:90px">
        <input value="${esc(p.period||'')}" placeholder="/bln" data-idx="${i}" data-field="period" style="width:60px">
      </div>
      <div class="flex-row mb-12">
        <input value="${esc(p.badge||'')}" placeholder="Badge" data-idx="${i}" data-field="badge">
        <label class="checkbox-label w-auto" style="white-space:nowrap"><input type="checkbox" ${p.featured?'checked':''} data-idx="${i}" data-field="featured"> Featured</label>
        <input value="${esc(p.buttonLabel||'')}" placeholder="Tombol" data-idx="${i}" data-field="buttonLabel">
      </div>
      <div><label class="text-xs" style="text-transform:none;letter-spacing:0">Fitur (1 per baris)</label>
        <textarea rows="3" placeholder="Fitur (1 per baris)" data-idx="${i}" data-field="features">${(p.features||[]).join('\n')}</textarea>
      </div>
    </div>`
  ).join("");

  // Testimonials
  const testis = d.testimonials || [];
  $("f-testimonials-list").innerHTML = testis.map((t, i) =>
    `<div class="panel-card">
      <div class="flex-row mb-12">
        <input value="${esc(t.initial)}" placeholder="Init" data-idx="${i}" data-field="initial" style="width:48px;text-align:center">
        <select data-idx="${i}" data-field="gradient">
          <option value="var(--grad-purple)" ${t.gradient==='var(--grad-purple)'?'selected':''}>Purple</option>
          <option value="var(--grad-teal)" ${t.gradient==='var(--grad-teal)'?'selected':''}>Teal</option>
          <option value="var(--grad-orange)" ${t.gradient==='var(--grad-orange)'?'selected':''}>Orange</option>
          <option value="var(--grad-pink)" ${t.gradient==='var(--grad-pink)'?'selected':''}>Pink</option>
        </select>
        <input value="${t.stars||5}" placeholder="5" data-idx="${i}" data-field="stars" style="width:50px;text-align:center">
      </div>
      <input value="${esc(t.name)}" placeholder="Nama" data-idx="${i}" data-field="name" class="mb-12">
      <input value="${esc(t.role)}" placeholder="Role" data-idx="${i}" data-field="role" class="mb-12">
      <textarea rows="2" placeholder="Testimonial" data-idx="${i}" data-field="text">${esc(t.text)}</textarea>
    </div>`
  ).join("");

  // FAQ
  const faqs = d.faq || [];
  $("f-faq-list").innerHTML = faqs.map((f, i) =>
    `<div class="panel-card">
      <input value="${esc(f.q)}" placeholder="Pertanyaan" data-idx="${i}" data-field="q" class="mb-12">
      <textarea rows="2" placeholder="Jawaban" data-idx="${i}" data-field="a">${esc(f.a)}</textarea>
    </div>`
  ).join("");

  // Blog
  const blogs = d.blog || [];
  $("f-blog-list").innerHTML = blogs.map((b, i) =>
    `<div class="panel-card">
      <div class="flex-row mb-12">
        <input value="${esc(b.icon)}" placeholder="icon" data-idx="${i}" data-field="icon" style="width:48px;text-align:center">
        <input value="${esc(b.tag)}" placeholder="Tag" data-idx="${i}" data-field="tag">
        <select data-idx="${i}" data-field="gradient">
          <option value="var(--grad-purple)" ${b.gradient==='var(--grad-purple)'?'selected':''}>Purple</option>
          <option value="var(--grad-teal)" ${b.gradient==='var(--grad-teal)'?'selected':''}>Teal</option>
          <option value="var(--grad-orange)" ${b.gradient==='var(--grad-orange)'?'selected':''}>Orange</option>
          <option value="var(--grad-pink)" ${b.gradient==='var(--grad-pink)'?'selected':''}>Pink</option>
        </select>
      </div>
      <input value="${esc(b.title)}" placeholder="Judul artikel" data-idx="${i}" data-field="title" class="mb-12">
      <textarea rows="2" placeholder="Deskripsi" data-idx="${i}" data-field="desc">${esc(b.desc)}</textarea>
    </div>`
  ).join("");

  // CTA
  const c = d.cta || {};
  setVal("f-cta-title-main", c.titleMain || "");
  setVal("f-cta-title-grad", c.titleGradient || "");
  setVal("f-cta-desc", c.desc || "");
  setVal("f-cta-btn", c.buttonLabel || "");
  setVal("f-app-url", d.appUrl || "");

  // Labels
  const labs = d.labels || {};
  setVal("f-label-featuresTitle", labs.featuresTitle || "");
  setVal("f-label-featuresDesc", labs.featuresDesc || "");
  setVal("f-label-stepsTitle", labs.stepsTitle || "");
  setVal("f-label-stepsDesc", labs.stepsDesc || "");
  setVal("f-label-pricingTitle", labs.pricingTitle || "");
  setVal("f-label-pricingDesc", labs.pricingDesc || "");
  setVal("f-label-testimonialsTitle", labs.testimonialsTitle || "");
  setVal("f-label-testimonialsDesc", labs.testimonialsDesc || "");
  setVal("f-label-faqTitle", labs.faqTitle || "");
  setVal("f-label-faqDesc", labs.faqDesc || "");
  setVal("f-label-blogTitle", labs.blogTitle || "");
  setVal("f-label-blogDesc", labs.blogDesc || "");

  // Custom Sections
  renderCustomSections(d.customSections || []);

  // Settings
  const set = d.settings || {};
  setVal("f-set-nav-login", set.navLogin || "");
  setVal("f-set-nav-register", set.navRegister || "");
  setVal("f-set-hero-primary", set.heroPrimary || "");
  setVal("f-set-hero-secondary", set.heroSecondary || "");
  const size = set.btnSize || "md";
  const sizeRadio = $(`f-set-btn-size-${size}`);
  if (sizeRadio) sizeRadio.checked = true;
  const adminFs = set.adminFontSize || "medium";
  const fsRadio = $(`f-set-admin-font-${adminFs}`);
  if (fsRadio) fsRadio.checked = true;
  applyAdminFontSize(adminFs);
}

function applyAdminFontSize(val) {
  document.body.dataset.adminFont = val === "small" ? "small" : val === "large" ? "large" : "";
}

function renderCustomSections(sections) {
  $("f-custom-sections").innerHTML = sections.map((s, i) => {
    const isText = s.type === "text-image";
    const isCarousel = s.type === "carousel";
    const isVideo = s.type === "video-embed";
    return `<div class="panel-card" data-cs-idx="${i}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="font-size:11px;font-weight:600;color:#5c6378;text-transform:uppercase">${s.type || 'text-image'} #${i+1}</span>
        <div style="display:flex;gap:4px">
          <button class="cs-move btn-ghost" data-idx="${i}" data-dir="up" style="padding:2px 6px;font-size:11px">↑</button>
          <button class="cs-move btn-ghost" data-idx="${i}" data-dir="down" style="padding:2px 6px;font-size:11px">↓</button>
          <button class="cs-del btn-ghost" data-idx="${i}" style="padding:2px 6px;font-size:11px;color:#ef4444">✕</button>
        </div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <select data-idx="${i}" data-field="type" style="flex:1">
          <option value="text-image" ${isText?'selected':''}>Text + Image</option>
          <option value="carousel" ${isCarousel?'selected':''}>Image Carousel</option>
          <option value="video-embed" ${isVideo?'selected':''}>Video Embed</option>
        </select>
        <select data-idx="${i}" data-field="bg" style="width:90px">
          <option value="default" ${(s.bg||'default')==='default'?'selected':''}>Default</option>
          <option value="dark" ${s.bg==='dark'?'selected':''}>Dark</option>
        </select>
      </div>
      <input value="${esc(s.title||'')}" placeholder="Judul section" data-idx="${i}" data-field="title" class="mb-12">
      <textarea rows="2" placeholder="Deskripsi" data-idx="${i}" data-field="desc" class="mb-12">${esc(s.desc||'')}</textarea>
      ${isText ? `
        <div class="flex-row mb-12">
          <input value="${esc(s.image||'')}" placeholder="URL Gambar" data-idx="${i}" data-field="image">
          <select data-idx="${i}" data-field="imagePosition" style="width:80px">
            <option value="right" ${s.imagePosition!=='left'?'selected':''}>Kanan</option>
            <option value="left" ${s.imagePosition==='left'?'selected':''}>Kiri</option>
          </select>
        </div>
      ` : ''}
      ${isCarousel ? `
        <div><label style="text-transform:none;letter-spacing:0">Gambar (1 URL per baris)</label>
        <textarea rows="3" placeholder="https://..." data-idx="${i}" data-field="images">${(s.images||[]).join('\n')}</textarea></div>
      ` : ''}
      ${isVideo ? `
        <input value="${esc(s.videoUrl||'')}" placeholder="URL Embed (YouTube, Vimeo)" data-idx="${i}" data-field="videoUrl" class="mb-12">
        <input value="${esc(s.thumbnail||'')}" placeholder="URL Thumbnail (opsional)" data-idx="${i}" data-field="thumbnail">
      ` : ''}
    </div>`;
  }).join("");
}

// ── Collect ──

function collectData() {
  const d = {};

  // Hero
  const h = {};
  h.badge = val("f-hero-badge");
  h.titleMain = val("f-hero-title-main");
  h.titleGradient = val("f-hero-title-grad");
  h.subtitle = val("f-hero-sub");
  const stats = [];
  document.querySelectorAll("#f-hero-stats > div").forEach(row => {
    const num = row.querySelector('[data-field="num"]')?.value || "";
    const label = row.querySelector('[data-field="label"]')?.value || "";
    stats.push({ num, label });
  });
  h.stats = stats;
  d.hero = h;

  // Features
  d.features = collectList("f-features-list", ["icon", "gradient", "title", "desc"]);

  // Steps
  d.steps = collectList("f-steps-list", ["title", "desc"]);

  // Pricing
  const prices = [];
  document.querySelectorAll("#f-pricing-list > .panel-card").forEach(card => {
    const idx = card.querySelector("[data-idx]")?.dataset.idx;
    const featuresRaw = card.querySelector(`[data-idx="${idx}"][data-field="features"]`)?.value || "";
    prices.push({
      name: card.querySelector(`[data-idx="${idx}"][data-field="name"]`)?.value || "",
      price: card.querySelector(`[data-idx="${idx}"][data-field="price"]`)?.value || "",
      period: card.querySelector(`[data-idx="${idx}"][data-field="period"]`)?.value || null,
      badge: card.querySelector(`[data-idx="${idx}"][data-field="badge"]`)?.value || null,
      buttonLabel: card.querySelector(`[data-idx="${idx}"][data-field="buttonLabel"]`)?.value || "",
      featured: card.querySelector(`[data-idx="${idx}"][data-field="featured"]`)?.checked || false,
      features: featuresRaw.split("\n").map(s => s.trim()).filter(Boolean),
    });
  });
  d.pricing = prices;

  // Testimonials
  const testis = [];
  document.querySelectorAll("#f-testimonials-list > .panel-card").forEach(card => {
    const idx = card.querySelector("[data-idx]")?.dataset.idx;
    testis.push({
      initial: card.querySelector(`[data-idx="${idx}"][data-field="initial"]`)?.value || "",
      gradient: card.querySelector(`[data-idx="${idx}"][data-field="gradient"]`)?.value || "",
      stars: parseInt(card.querySelector(`[data-idx="${idx}"][data-field="stars"]`)?.value) || 5,
      name: card.querySelector(`[data-idx="${idx}"][data-field="name"]`)?.value || "",
      role: card.querySelector(`[data-idx="${idx}"][data-field="role"]`)?.value || "",
      text: card.querySelector(`[data-idx="${idx}"][data-field="text"]`)?.value || "",
    });
  });
  d.testimonials = testis;

  // FAQ
  const faqs = [];
  document.querySelectorAll("#f-faq-list > .panel-card").forEach(card => {
    const idx = card.querySelector("[data-idx]")?.dataset.idx;
    faqs.push({
      q: card.querySelector(`[data-idx="${idx}"][data-field="q"]`)?.value || "",
      a: card.querySelector(`[data-idx="${idx}"][data-field="a"]`)?.value || "",
    });
  });
  d.faq = faqs;

  // Blog
  d.blog = collectList("f-blog-list", ["icon", "tag", "gradient", "title", "desc"]);

  // CTA
  const c = {};
  c.titleMain = val("f-cta-title-main");
  c.titleGradient = val("f-cta-title-grad");
  c.desc = val("f-cta-desc");
  c.buttonLabel = val("f-cta-btn");
  d.cta = c;

  d.appUrl = val("f-app-url");

  // Labels
  d.labels = {
    featuresTitle: val("f-label-featuresTitle"),
    featuresDesc: val("f-label-featuresDesc"),
    stepsTitle: val("f-label-stepsTitle"),
    stepsDesc: val("f-label-stepsDesc"),
    pricingTitle: val("f-label-pricingTitle"),
    pricingDesc: val("f-label-pricingDesc"),
    testimonialsTitle: val("f-label-testimonialsTitle"),
    testimonialsDesc: val("f-label-testimonialsDesc"),
    faqTitle: val("f-label-faqTitle"),
    faqDesc: val("f-label-faqDesc"),
    blogTitle: val("f-label-blogTitle"),
    blogDesc: val("f-label-blogDesc"),
  };

  // Custom Sections
  d.customSections = collectCustomSections();

  // Settings
  d.settings = {
    navLogin: val("f-set-nav-login"),
    navRegister: val("f-set-nav-register"),
    heroPrimary: val("f-set-hero-primary"),
    heroSecondary: val("f-set-hero-secondary"),
    btnSize: document.querySelector("input[name='btn-size']:checked")?.value || "md",
    adminFontSize: document.querySelector("input[name='admin-font-size']:checked")?.value || "medium",
  };

  return d;
}

function collectCustomSections() {
  const sections = [];
  document.querySelectorAll("#f-custom-sections > .panel-card").forEach(card => {
    const idx = card.dataset.csIdx;
    if (idx === undefined) return;
    const type = card.querySelector(`[data-idx="${idx}"][data-field="type"]`)?.value || "text-image";
    const s = {
      type,
      bg: card.querySelector(`[data-idx="${idx}"][data-field="bg"]`)?.value || "default",
      title: card.querySelector(`[data-idx="${idx}"][data-field="title"]`)?.value || "",
      desc: card.querySelector(`[data-idx="${idx}"][data-field="desc"]`)?.value || "",
    };
    if (type === "text-image") {
      s.image = card.querySelector(`[data-idx="${idx}"][data-field="image"]`)?.value || "";
      s.imagePosition = card.querySelector(`[data-idx="${idx}"][data-field="imagePosition"]`)?.value || "right";
    }
    if (type === "carousel") {
      const raw = card.querySelector(`[data-idx="${idx}"][data-field="images"]`)?.value || "";
      s.images = raw.split("\n").map(x => x.trim()).filter(Boolean);
    }
    if (type === "video-embed") {
      s.videoUrl = card.querySelector(`[data-idx="${idx}"][data-field="videoUrl"]`)?.value || "";
      s.thumbnail = card.querySelector(`[data-idx="${idx}"][data-field="thumbnail"]`)?.value || "";
    }
    sections.push(s);
  });
  return sections;
}

function collectList(listId, fields) {
  const items = [];
  document.querySelectorAll(`#${listId} > .panel-card`).forEach(card => {
    const idx = card.querySelector("[data-idx]")?.dataset.idx;
    const item = {};
    fields.forEach(f => {
      const el = card.querySelector(`[data-idx="${idx}"][data-field="${f}"]`);
      item[f] = el ? el.value : "";
    });
    items.push(item);
  });
  return items;
}

// ── Custom Sections Events ──

$("btn-add-section").addEventListener("click", () => {
  const sections = collectCustomSections();
  sections.push({ type: "text-image", bg: "default", title: "", desc: "", image: "", imagePosition: "right" });
  renderCustomSections(sections);
});

$("f-custom-sections").addEventListener("click", (e) => {
  const del = e.target.closest(".cs-del");
  const move = e.target.closest(".cs-move");
  if (del) {
    let sections = collectCustomSections();
    const idx = parseInt(del.dataset.idx);
    sections.splice(idx, 1);
    renderCustomSections(sections);
  }
  if (move) {
    let sections = collectCustomSections();
    const idx = parseInt(move.dataset.idx);
    const dir = move.dataset.dir;
    const target = dir === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= sections.length) return;
    [sections[idx], sections[target]] = [sections[target], sections[idx]];
    renderCustomSections(sections);
  }
});

$("f-custom-sections").addEventListener("change", (e) => {
  const sel = e.target.closest("select[data-field='type']");
  if (!sel) return;
  let sections = collectCustomSections();
  renderCustomSections(sections);
});

// ── Save ──

$("btn-save").addEventListener("click", async () => {
  const data = collectData();
  try {
    await api("/api/data/landing", { method: "PUT", body: JSON.stringify(data) });
    landingData = data;
    applyAdminFontSize(data.settings?.adminFontSize || "medium");
    toast("Landing page berhasil disimpan", "success");
  } catch (err) {
    toast("Gagal menyimpan: " + err.message, "error");
  }
});
