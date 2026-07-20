const API_BASE = "https://carofeed.vercel.app";

function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

function renderStars(n) {
  return "★".repeat(n || 5);
}

function renderPage(data) {
  if (!data) return;

  const appUrl = data.appUrl || API_BASE;
  const set = data.settings || {};
  const btnSize = set.btnSize || "sm";

  // Nav actions
  const navLogin = set.navLogin || "Masuk";
  const navRegister = set.navRegister || "Coba Gratis";
  document.getElementById("nav-actions").innerHTML =
    `<a href="${esc(appUrl)}" class="btn btn-outline btn-${btnSize}">${esc(navLogin)}</a>` +
    `<a href="${esc(appUrl)}" class="btn btn-primary btn-${btnSize}">${esc(navRegister)}</a>`;
  document.getElementById("mobile-actions").innerHTML =
    `<a href="${esc(appUrl)}" class="btn btn-outline btn-${btnSize} w-full">${esc(navLogin)}</a>` +
    `<a href="${esc(appUrl)}" class="btn btn-primary btn-${btnSize} w-full">${esc(navRegister)}</a>`;

  const h = data.hero || {};

  // Hero badge
  const heroBadge = document.getElementById("hero-badge");
  if (h.badge) heroBadge.textContent = h.badge;

  // Hero title
  document.getElementById("hero-title").innerHTML =
    esc(h.titleMain || "Buat Carousel Instagram") + "<br>" +
    '<span class="gradient-text">' + esc(h.titleGradient || "10x Lebih Cepat dengan AI") + "</span>";

  // Hero subtitle
  const heroSub = document.getElementById("hero-sub");
  if (h.subtitle) heroSub.textContent = h.subtitle;

  // Hero actions
  const heroSize = set.btnSize === "sm" ? "md" : set.btnSize;
  const heroPrimary = set.heroPrimary || "Mulai Gratis";
  const heroSecondary = set.heroSecondary || "Lihat Fitur ↓";
  const heroActions = document.getElementById("hero-actions");
  heroActions.innerHTML =
    `<a href="${esc(appUrl)}" class="btn btn-primary btn-${heroSize}">${esc(heroPrimary)}</a>` +
    `<a href="#fitur" class="btn btn-ghost btn-${heroSize}">${esc(heroSecondary)}</a>`;

  // Hero stats
  const stats = (h.stats || []).map(s =>
    `<div class="stat"><span class="stat-num">${esc(s.num)}</span><span class="stat-label">${esc(s.label)}</span></div>`
  ).join("");
  if (stats) document.getElementById("hero-stats").innerHTML = stats;

  // Labels
  const labs = data.labels || {};
  const labsMap = {
    featuresTitle: ".section-title", featuresDesc: ".section-desc", stepsTitle: "#steps-title", stepsDesc: "#steps-desc",
    pricingTitle: ".section-title", pricingDesc: ".section-desc", testimonialsTitle: ".section-title", testimonialsDesc: ".section-desc",
    faqTitle: ".section-title", faqDesc: ".section-desc", blogTitle: ".section-title", blogDesc: ".section-desc",
  };
  // Apply labels to sections
  const sectionLabels = [
    { id: "fitur", title: labs.featuresTitle, desc: labs.featuresDesc },
    { id: null, title: labs.stepsTitle, desc: labs.stepsDesc, titleEl: "#steps-title", descEl: "#steps-desc" },
    { id: "harga", title: labs.pricingTitle, desc: labs.pricingDesc },
    { id: "testimonial", title: labs.testimonialsTitle, desc: labs.testimonialsDesc },
    { id: "faq", title: labs.faqTitle, desc: labs.faqDesc },
    { id: "blog", title: labs.blogTitle, desc: labs.blogDesc },
  ];
  sectionLabels.forEach(s => {
    const sec = s.id ? document.getElementById(s.id) : null;
    if (s.title) {
      const el = sec ? sec.querySelector(".section-title") : document.querySelector(s.titleEl);
      if (el) el.innerHTML = s.title;
    }
    if (s.desc) {
      const el = sec ? sec.querySelector(".section-desc") : document.querySelector(s.descEl);
      if (el) el.textContent = s.desc;
    }
  });

  // Features
  const feats = data.features || [];
  document.getElementById("features-grid").innerHTML = feats.map(f =>
    `<div class="feature-card">
      <div class="feature-icon" style="background:${f.gradient || 'var(--grad-purple)'}">${f.icon || ''}</div>
      <h3>${esc(f.title)}</h3>
      <p>${esc(f.desc)}</p>
    </div>`
  ).join("");

  // Steps
  const steps = data.steps || [];
  if (steps.length) {
    document.getElementById("steps").innerHTML = steps.map((s, i) =>
      `<div class="step">
        <div class="step-num">${s.num || (i + 1)}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
      </div>${i < steps.length - 1 ? '<div class="step-arrow">→</div>' : ''}`
    ).join("");
  }

  // Pricing
  const prices = data.pricing || [];
  document.getElementById("pricing-grid").innerHTML = prices.map(p => {
    const featured = p.featured ? " pricing-card-featured" : "";
    const badge = p.badge ? `<div class="featured-badge">${esc(p.badge)}</div>` : "";
    const features = (p.features || []).map((f, i) => {
      const enabled = p.enabled ? p.enabled[i] : true;
      const icon = enabled ? '✓' : '✗';
      return `<li>${icon} ${esc(f)}</li>`;
    }).join("");
    const period = p.period ? `<span class="price-period">${esc(p.period)}</span>` : "";
    const btnClass = p.featured ? "btn-primary" : "btn-outline";
    return `<div class="pricing-card${featured}">
      ${badge}
      <h3>${esc(p.name)}</h3>
      <div class="price">${esc(p.price)}${period}</div>
      <ul class="price-features">${features}</ul>
      <a href="${esc(appUrl)}" class="btn ${btnClass} w-full">${esc(p.buttonLabel || 'Pilih Paket')}</a>
    </div>`;
  }).join("");

  // Testimonials
  const testis = data.testimonials || [];
  document.getElementById("testimonials-grid").innerHTML = testis.map(t =>
    `<div class="testimonial-card">
      <div class="stars">${renderStars(t.stars)}</div>
      <p>${esc(t.text)}</p>
      <div class="testimonial-author">
        <div class="author-avatar" style="background:${t.gradient || 'var(--grad-purple)'}">${esc(t.initial || (t.name ? t.name.charAt(0) : ''))}</div>
        <div>
          <div class="author-name">${esc(t.name)}</div>
          <div class="author-role">${esc(t.role)}</div>
        </div>
      </div>
    </div>`
  ).join("");

  // FAQ
  const faqs = data.faq || [];
  document.getElementById("faq-list").innerHTML = faqs.map(f =>
    `<div class="faq-item">
      <button class="faq-question">
        <span>${esc(f.q)}</span>
        <span class="faq-arrow">↓</span>
      </button>
      <div class="faq-answer">
        <p>${esc(f.a)}</p>
      </div>
    </div>`
  ).join("");

  // Blog
  const blogs = data.blog || [];
  document.getElementById("blog-grid").innerHTML = blogs.map(b =>
    `<article class="blog-card">
      <div class="blog-img" style="background:${b.gradient || 'var(--grad-purple)'}">${b.icon || '📝'}</div>
      <div class="blog-body">
        <span class="blog-tag">${esc(b.tag)}</span>
        <h3>${esc(b.title)}</h3>
        <p>${esc(b.desc)}</p>
        <a href="#" class="blog-read">Baca Selengkapnya →</a>
      </div>
    </article>`
  ).join("");

  // Custom Sections
  const customSections = data.customSections || [];
  const container = document.getElementById("custom-sections-container");
  if (container) {
    container.innerHTML = customSections.map(s => {
      const bgClass = s.bg === "dark" ? " section-dark" : "";
      let html = `<section class="section${bgClass}"><div class="container">`;
      if (s.title) html += `<h2 class="section-title">${esc(s.title)}</h2>`;

      if (s.type === "text-image") {
        const img = s.image ? `<div class="cs-image-wrap"><img src="${esc(s.image)}" alt="" class="cs-image" loading="lazy"></div>` : "";
        const txt = s.desc ? `<div class="cs-text"><p>${esc(s.desc)}</p></div>` : "";
        if (img || txt) {
          html += `<div class="cs-text-image ${s.imagePosition === 'left' ? 'cs-image-left' : ''}">`;
          if (s.imagePosition === 'left') { html += img; html += txt; }
          else { html += txt; html += img; }
          html += `</div>`;
        }
      } else {
        if (s.desc) html += `<p class="section-desc" style="margin-bottom:32px">${esc(s.desc)}</p>`;
      }

      if (s.type === "carousel" && s.images && s.images.length) {
        html += `<div class="cs-carousel" data-idx="${s.id || ''}">`;
        html += `<div class="cs-carousel-track">`;
        s.images.forEach((url, i) => {
          html += `<div class="cs-carousel-slide${i === 0 ? ' active' : ''}"><img src="${esc(url)}" alt="" loading="lazy"></div>`;
        });
        html += `</div>`;
        if (s.images.length > 1) {
          html += `<div class="cs-carousel-dots">`;
          s.images.forEach((_, i) => {
            html += `<button class="cs-dot${i === 0 ? ' active' : ''}" data-slide="${i}"></button>`;
          });
          html += `</div>`;
          html += `<button class="cs-prev">‹</button><button class="cs-next">›</button>`;
        }
        html += `</div>`;
      }

      if (s.type === "video-embed" && s.videoUrl) {
        const thumb = s.thumbnail ? `<div class="cs-video-thumb" style="background-image:url(${esc(s.thumbnail)})"><button class="cs-play-btn">▶</button></div>` : "";
        html += `<div class="cs-video-wrap" data-video-url="${esc(s.videoUrl)}">`;
        if (thumb) {
          html += thumb;
        } else {
          html += `<div class="cs-video-embed"><iframe src="${esc(s.videoUrl)}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
        }
        html += `</div>`;
      }

      html += `</div></section>`;
      return html;
    }).join("");
  }

  // Init carousels
  document.querySelectorAll(".cs-carousel").forEach(initCarousel);

  // Init video thumbs
  document.querySelectorAll(".cs-video-thumb").forEach(el => {
    el.addEventListener("click", () => {
      const wrap = el.parentElement;
      const url = wrap.dataset.videoUrl || el.dataset.videoUrl || "";
      if (url) {
        wrap.innerHTML = `<div class="cs-video-embed"><iframe src="${esc(url)}" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`;
      }
    });
  });

  // CTA
  const c = data.cta || {};
  const ctaTitle = document.getElementById("cta-title");
  ctaTitle.innerHTML =
    esc(c.titleMain || "Siap Bikin Carousel") + "<br>" +
    '<span class="gradient-text">' + esc(c.titleGradient || "10x Lebih Cepat?") + "</span>";
  const ctaDesc = document.getElementById("cta-desc");
  if (c.desc) ctaDesc.textContent = c.desc;
  const ctaBtn = document.getElementById("cta-btn");
  ctaBtn.href = appUrl;
  if (c.buttonLabel) ctaBtn.textContent = c.buttonLabel;

  // Re-init FAQ accordion
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.removeEventListener("click", faqHandler);
    btn.addEventListener("click", faqHandler);
  });

  // Re-init intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll(".feature-card, .pricing-card, .testimonial-card, .blog-card, .step").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

function faqHandler(e) {
  const item = e.currentTarget.parentElement;
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

// ── Carousel ──
function initCarousel(el) {
  const track = el.querySelector(".cs-carousel-track");
  const slides = track?.querySelectorAll(".cs-carousel-slide");
  const dots = el.querySelectorAll(".cs-dot");
  const prev = el.querySelector(".cs-prev");
  const next = el.querySelector(".cs-next");
  let current = 0;
  if (!track || !slides?.length) return;
  function goTo(idx) {
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }
  if (prev) prev.addEventListener("click", () => goTo(current - 1));
  if (next) next.addEventListener("click", () => goTo(current + 1));
  dots.forEach(d => d.addEventListener("click", () => goTo(parseInt(d.dataset.slide))));
  // Auto-play
  let interval = setInterval(() => goTo(current + 1), 4000);
  el.addEventListener("mouseenter", () => clearInterval(interval));
  el.addEventListener("mouseleave", () => { interval = setInterval(() => goTo(current + 1), 4000); });
}

// Mobile menu
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.toggle("open");
});
document.querySelectorAll(".mobile-link").forEach(l => {
  l.addEventListener("click", () => document.getElementById("mobileMenu").classList.remove("open"));
});

// Init FAQ on page
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", faqHandler);
});

// Load data
fetch(API_BASE + "/api/data/landing")
  .then(r => r.ok ? r.json() : null)
  .then(data => {
    if (data) renderPage(data);
  })
  .catch(() => {});
