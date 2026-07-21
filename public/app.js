let VISUAL_CATEGORIES = {
  "Modern": [
    { id: "minimalist", label: "Minimalist", desc: "Bersih, simpel, banyak ruang kosong", icon: "ti-square-rounded", tags: ["minimalist", "clean composition", "ample negative space", "simple shapes", "understated"] },
    { id: "modern", label: "Modern", desc: "Kontemporer, garis bersih, elegan", icon: "ti-arrows-split-2", tags: ["modern style", "clean lines", "contemporary", "sleek", "refined"] },
    { id: "flat-design", label: "Flat Design", desc: "Bidang warna datar tanpa bayangan", icon: "ti-layout-2", tags: ["flat design", "vector illustration", "solid colors", "no gradients", "simplified shapes"] },
    { id: "material-design", label: "Material Design", desc: "Google-style, elevasi & bayangan", icon: "ti-layers-intersect", tags: ["material design", "elevation shadows", "responsive layout", "bold colors", "card-based ui"] },
    { id: "glassmorphism", label: "Glassmorphism", desc: "Kaca transparan dengan blur", icon: "ti-glass-full", tags: ["glassmorphism", "frosted glass", "backdrop blur", "translucent", "layered depth"] },
    { id: "neumorphism", label: "Neumorphism", desc: "Soft UI, timbul & tenggelam", icon: "ti-border-radius", tags: ["neumorphism", "soft ui", "subtle raised elements", "monochromatic", "smooth shadows"] },
    { id: "claymorphism", label: "Claymorphism", desc: "3D lembut seperti tanah liat", icon: "ti-cube", tags: ["claymorphism", "soft 3d", "playful shapes", "warm lighting", "rounded forms"] },
  ],
  "Illustration": [
    { id: "hand-drawn", label: "Hand Drawn", desc: "Sketsa tangan alami", icon: "ti-pencil", tags: ["hand drawn", "sketchy lines", "organic feel", "imperfect strokes", "artistic"] },
    { id: "sketch", label: "Sketch", desc: "Sketsa pensil cepat", icon: "ti-writing", tags: ["sketch style", "pencil texture", "rough lines", "unfinished look", "conceptual"] },
    { id: "doodle", label: "Doodle", desc: "Coretan santai & imut", icon: "ti-mood-happy", tags: ["doodle", "playful", "whimsical", "casual drawing", "fun characters"] },
    { id: "watercolor", label: "Watercolor", desc: "Cat air lembut & organik", icon: "ti-droplet", tags: ["watercolor", "soft washes", "translucent color", "organic bleeding", "artistic texture"] },
    { id: "line-art", label: "Line Art", desc: "Garis tegas hitam-putih", icon: "ti-minus", tags: ["line art", "black and white", "clean strokes", "minimal detailing", "vector lines"] },
    { id: "outline-illustration", label: "Outline Illustration", desc: "Ilustrasi dengan outline tipis", icon: "ti-border-none", tags: ["outline illustration", "thin borders", "colored fills", "storybook style", "whimsical"] },
  ],
  "3D": [
    { id: "3d-render", label: "3D Render", desc: "Render 3D realistis penuh", icon: "ti-3d-cube-sphere", tags: ["3d render", "realistic materials", "ray tracing", "three-dimensional", "spatial depth"] },
    { id: "3d-illustration", label: "3D Illustration", desc: "Ilustrasi 3D gaya artistik", icon: "ti-shape-3", tags: ["3d illustration", "stylized 3d", "colorful renders", "isometric view", "digital art"] },
    { id: "isometric", label: "Isometric", desc: "Perspektif isometrik 2.5D", icon: "ti-box", tags: ["isometric", "2.5d perspective", "grid-based", "technical view", "gaming aesthetic"] },
    { id: "low-poly", label: "Low Poly", desc: "Poligon rendah, gaya geometris", icon: "ti-triangle", tags: ["low poly", "geometric", "faceted", "polygon art", "modern abstract"] },
  ],
  "Artistic": [
    { id: "oil-painting", label: "Oil Painting", desc: "Lukisan cat minyak klasik", icon: "ti-palette", tags: ["oil painting", "rich textures", "brush strokes", "classical art", "deep colors"] },
    { id: "acrylic-painting", label: "Acrylic Painting", desc: "Cat akrilik tebal & bertekstur", icon: "ti-brush", tags: ["acrylic painting", "thick paint", "vibrant colors", "textured strokes", "modern painting"] },
    { id: "ink-illustration", label: "Ink Illustration", desc: "Tinta hitam tegas & kontras", icon: "ti-feather", tags: ["ink illustration", "black ink", "crosshatching", "high contrast", "detailed linework"] },
    { id: "pencil-drawing", label: "Pencil Drawing", desc: "Gambar pensil realistis", icon: "ti-ballpen", tags: ["pencil drawing", "graphite", "shading", "realistic sketch", "monochrome"] },
    { id: "paper-cut", label: "Paper Cut", desc: "Kolase potongan kertas", icon: "ti-scissors", tags: ["paper cut", "layered paper", "shadow depth", "craft aesthetic", "tactile"] },
    { id: "origami", label: "Origami", desc: "Lipatan kertas geometris", icon: "ti-paper-bag", tags: ["origami", "folded paper", "geometric folds", "paper sculpture", "japanese craft"] },
  ],
  "Classic": [
    { id: "vintage", label: "Vintage", desc: "Nuansa klasik tempo dulu", icon: "ti-clock", tags: ["vintage", "retro color palette", "aged texture", "nostalgic", "warm tones"] },
    { id: "retro", label: "Retro", desc: "Gaya masa lalu yang ikonik", icon: "ti-disc", tags: ["retro poster style", "vintage color palette", "bold outlines", "grain texture", "nostalgic mood"] },
    { id: "bauhaus", label: "Bauhaus", desc: "Geometris, fungsional, berani", icon: "ti-letter-case", tags: ["bauhaus", "geometric abstraction", "primary colors", "functional design", "bold typography"] },
    { id: "swiss-design", label: "Swiss Design", desc: "Grid rapi, tipografi presisi", icon: "ti-grid-dots", tags: ["swiss design", "grid system", "clean typography", "minimal layout", "international style"] },
    { id: "memphis", label: "Memphis", desc: "Ceria, pola abstrak, warna kontras", icon: "ti-diamond", tags: ["memphis design", "bold patterns", "colorful", "abstract shapes", "playful aesthetic"] },
  ],
  "Entertainment": [
    { id: "cartoon", label: "Cartoon", desc: "Gaya kartun ceria & lucu", icon: "ti-mask", tags: ["cartoon", "exaggerated features", "bright colors", "fun style", "friendly characters"] },
    { id: "comic-book", label: "Comic Book", desc: "Gaya komik dengan halftone", icon: "ti-book", tags: ["comic book", "halftone dots", "bold outlines", "pop art colors", "speech bubbles"] },
    { id: "anime", label: "Anime", desc: "Gaya animasi jepang", icon: "ti-eye", tags: ["anime style", "large eyes", "cel shading", "vibrant hair", "japanese aesthetic"] },
    { id: "pixel-art", label: "Pixel Art", desc: "Grafis piksel retro game", icon: "ti-apps", tags: ["pixel art", "8-bit", "blocky graphics", "retro gaming", "limited palette"] },
  ],
  "Premium": [
    { id: "luxury", label: "Luxury", desc: "Mewah, elegan, premium", icon: "ti-crown", tags: ["luxury", "premium materials", "gold accents", "sophisticated", "high-end"] },
    { id: "elegant", label: "Elegant", desc: "Anggun, halus, berkelas", icon: "ti-flower", tags: ["elegant", "refined", "graceful", "soft colors", "sophisticated"] },
    { id: "corporate", label: "Corporate", desc: "Profesional, rapi, formal", icon: "ti-briefcase", tags: ["corporate clean style", "professional", "geometric layout", "subtle shadows", "structured grid"] },
    { id: "editorial", label: "Editorial", desc: "Tipografi besar, gaya majalah", icon: "ti-typography", tags: ["bold editorial layout", "high contrast", "large typography", "magazine style", "strong color blocking"] },
    { id: "magazine-style", label: "Magazine Style", desc: "Layout majalah glossy", icon: "ti-news", tags: ["magazine layout", "polished design", "multi-column", "featured imagery", "glossy finish"] },
  ],
  "Digital": [
    { id: "futuristic", label: "Futuristic", desc: "Neon, sleek, masa depan", icon: "ti-rocket", tags: ["futuristic", "neon colors", "sleek lines", "holographic", "tech aesthetic"] },
    { id: "sci-fi", label: "Sci-Fi", desc: "Fiksi ilmiah, alien, teknologi", icon: "ti-planet", tags: ["sci-fi", "space themes", "alien technology", "dark palette", "glowing accents"] },
    { id: "cyberpunk", label: "Cyberpunk", desc: "Distopia, neon, high-tech", icon: "ti-device-laptop", tags: ["cyberpunk", "neon dystopia", "high tech low life", "dark urban", "glowing neon"] },
    { id: "steampunk", label: "Steampunk", desc: "Mesin uap, vintage-futuristik", icon: "ti-settings", tags: ["steampunk", "victorian era", "brass gears", "steam machinery", "retro futuristic"] },
  ],
  "Realism": [
    { id: "photorealistic", label: "Photorealistic", desc: "Realistis seperti foto asli", icon: "ti-camera", tags: ["photorealistic", "studio lighting", "premium product photography", "shallow depth of field", "high detail"] },
    { id: "cinematic", label: "Cinematic", desc: "Gaya film sinematik", icon: "ti-video", tags: ["cinematic", "film grading", "anamorphic", "dramatic lighting", "movie aesthetic"] },
  ],
  "Creative": [
    { id: "abstract", label: "Abstract", desc: "Bentuk non-representasional", icon: "ti-circle", tags: ["abstract", "non-representational", "expressive forms", "color fields", "conceptual"] },
    { id: "geometric", label: "Geometric", desc: "Bentuk geometris presisi", icon: "ti-shape-2", tags: ["geometric", "precision shapes", "mathematical", "structured patterns", "modern abstract"] },
    { id: "pop-art", label: "Pop Art", desc: "Budaya pop, warna berani", icon: "ti-droplet-filled", tags: ["pop art", "bold colors", "cultural references", "comic style", "mass culture"] },
    { id: "surrealism", label: "Surrealism", desc: "Imajinatif, seperti mimpi", icon: "ti-moon", tags: ["surrealism", "dreamlike", "fantastical", "juxtaposition", "subconscious"] },
    { id: "fantasy", label: "Fantasy", desc: "Dunia fantasi magis", icon: "ti-wand", tags: ["fantasy", "magical", "mythical creatures", "enchanted", "otherworldly"] },
  ],
};

let BUILT_IN_CATEGORIES = [];

let STYLE_PALETTES = {
  minimalist: ["#F5F5F0", "#2D2D2D", "#A8A8A8"],
  modern: ["#1A1A2E", "#E8E8E8", "#C69749"],
  "flat-design": ["#FF6B6B", "#4ECDC4", "#1A1A2E"],
  "material-design": ["#1976D2", "#FF5722", "#F5F5F5"],
  glassmorphism: ["#E8D5B7", "#A8C5D6", "#F0F0F0"],
  neumorphism: ["#E0E0E0", "#FFFFFF", "#B8B8B8"],
  claymorphism: ["#FF9F68", "#6EC8D4", "#F5D6A8"],
  "hand-drawn": ["#2C2C2C", "#F5E6D3", "#8B7355"],
  sketch: ["#3D3D3D", "#E8E0D0", "#B0A090"],
  doodle: ["#FFD93D", "#FF6B6B", "#6BCB77"],
  watercolor: ["#E8B4C8", "#B4D8E8", "#D8E8B4"],
  "line-art": ["#000000", "#FFFFFF", "#404040"],
  "outline-illustration": ["#FF8C42", "#4A6FA5", "#F5E6CA"],
  "3d-render": ["#2D2D2D", "#64B5F6", "#F5F5F5"],
  "3d-illustration": ["#FF6B9D", "#FFD93D", "#6BCB77"],
  isometric: ["#4ECDC4", "#FFE66D", "#FF6B6B"],
  "low-poly": ["#2C3E50", "#E74C3C", "#ECF0F1"],
  "oil-painting": ["#8B4513", "#D4A574", "#2F4F4F"],
  "acrylic-painting": ["#FF7F50", "#9370DB", "#20B2AA"],
  "ink-illustration": ["#1A1A1A", "#FFFFFF", "#666666"],
  "pencil-drawing": ["#4A4A4A", "#D4D4D4", "#F0F0F0"],
  "paper-cut": ["#FF6B6B", "#4ECDC4", "#F5E6CA"],
  origami: ["#DC143C", "#F5F5DC", "#2F4F4F"],
  vintage: ["#C68E5B", "#8B5E3C", "#F5E6CA"],
  retro: ["#E85D75", "#F4A261", "#2D3142"],
  bauhaus: ["#E30613", "#0066B4", "#FFD700"],
  "swiss-design": ["#E30613", "#FFFFFF", "#000000"],
  memphis: ["#00B4D8", "#FF6B6B", "#FFD93D"],
  cartoon: ["#FF6B6B", "#FFD93D", "#4ECDC4"],
  "comic-book": ["#E30613", "#0066B4", "#FFD700"],
  anime: ["#FF9EC4", "#87CEEB", "#FFD700"],
  "pixel-art": ["#2ECC71", "#3498DB", "#F1C40F"],
  luxury: ["#1A1A2E", "#D4AF37", "#F5F5F0"],
  elegant: ["#2D2D2D", "#C0C0C0", "#F5F5F5"],
  corporate: ["#1B3A5C", "#FFFFFF", "#D4AF37"],
  editorial: ["#1A1A1A", "#E30613", "#FFFFFF"],
  "magazine-style": ["#2C2C2C", "#C69749", "#F5F0E8"],
  futuristic: ["#00F5FF", "#FF00FF", "#1A1A2E"],
  "sci-fi": ["#0D1117", "#00FF88", "#0066FF"],
  cyberpunk: ["#FF00FF", "#00FFFF", "#1A0A2E"],
  steampunk: ["#8B4513", "#D4A574", "#2F4F4F"],
  photorealistic: ["#2D2D2D", "#F5F5F5", "#C0C0C0"],
  cinematic: ["#1A1A1A", "#C69749", "#3A3A3A"],
  abstract: ["#FF6B6B", "#4ECDC4", "#9B59B6"],
  geometric: ["#E74C3C", "#3498DB", "#F1C40F"],
  "pop-art": ["#E30613", "#0066B4", "#FFD700"],
  surrealism: ["#9B59B6", "#FF6B9D", "#00CED1"],
  fantasy: ["#6C5CE7", "#FF9EC4", "#00CED1"],
};

let DEFAULT_NEGATIVE = "blurry, low quality, distorted text, extra limbs, watermark, signature, cropped, jpeg artifacts, inconsistent style with other slides, logo, living beings, character";

let DEFAULT_PROMPTS = {
  system_idea: "Kamu adalah asisten kreator konten kreatif. Gunakan bahasa yang SAMA dengan bahasa yang digunakan pada topik/niche yang diberikan. Berdasarkan niche yang diberikan, buatkan 1 ide topik carousel Instagram yang menarik, relevan, dan spesifik. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI. Balas HANYA dengan JSON object: {\"topic\": \"string judul carousel, gunakan bahasa yang sama dengan bahasa topik\"}. Jangan tambahkan teks lain.",
  user_idea: "Niche: {{niche}}",
  system_slide: "Kamu adalah asisten penyusun konten carousel Instagram. Gunakan bahasa yang SAMA dengan bahasa yang digunakan pada topik. Tugasmu: menyusun isi tiap slide (headline, isi teks singkat, ide visual) berdasarkan brief yang diberikan. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI. Buat kalimat yang terdengar manusiawi jika dibaca, bukan kalimat-kalimat nanggung khas AI. Balas HANYA dengan JSON array, tanpa teks lain, tanpa markdown code fence. Format tiap elemen: {\"headline\": \"string pendek menarik, bahasa sesuai topik\", \"body\": \"string 1 kalimat pendukung, bahasa sesuai topik\", \"visualIdea\": \"string deskripsi visual konkret dalam bahasa Inggris untuk AI image generator\"}. Slide pertama harus jadi cover/hook pembuka yang kuat. Buat kalimat pembuka pada slide pertama dengan hook yang emosional dan memikat audiens. Slide terakhir harus jadi kesimpulan atau call-to-action sesuai tujuan. Jika Brand/Catatan diberikan, visualIdea harus menyebutnya sebagai 'text overlay' (contoh: 'brand name text overlay at top left'), jangan pernah menggunakan kata 'logo'. visualIdea TIDAK BOLEH mengandung makhluk hidup, karakter, manusia, hewan, atau mahluk biologis apapun. Hanya diperbolehkan objek, teks, bangunan, abstrak, pemandangan alam tanpa mahluk hidup. Jumlah elemen array harus PERSIS sama dengan jumlah slide yang diminta.",
  user_slide: "Topik: {{topic}}\nTujuan: {{purpose}}\nTarget audiens: {{audience}}\nJumlah slide: {{slideCount}}{{brandNoteLine}}\n \nSusun {{slideCount}} slide untuk carousel ini.",
  negative_prompt: "blurry, low quality, distorted text, extra limbs, watermark, signature, cropped, jpeg artifacts, inconsistent style with other slides, logo, living beings, character"
};

function replacePromptVars(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] !== undefined ? vars[k] : `{{${k}}}`);
}

let NICHE_MAP = {
  "Kesehatan": { purpose: "edukasi", audience: "umum" },
  "Keuangan": { purpose: "edukasi", audience: "profesional" },
  "Bisnis": { purpose: "edukasi", audience: "pebisnis" },
  "Karier": { purpose: "edukasi", audience: "profesional" },
  "Pendidikan": { purpose: "edukasi", audience: "pelajar" },
  "Teknologi": { purpose: "edukasi", audience: "umum" },
  "Artificial Intelligence": { purpose: "edukasi", audience: "umum" },
  "Digital Marketing": { purpose: "edukasi", audience: "digital-marketer" },
  "Media Sosial": { purpose: "edukasi", audience: "umum" },
  "Content Creator": { purpose: "tutorial", audience: "content-creator" },
  "Branding": { purpose: "brand-awareness", audience: "pebisnis" },
  "Produktivitas": { purpose: "tips-trik", audience: "profesional" },
  "Parenting": { purpose: "edukasi", audience: "orang-tua" },
  "Hubungan": { purpose: "inspirasi", audience: "umum" },
  "Pengembangan Diri": { purpose: "motivasi", audience: "umum" },
  "Hobi": { purpose: "storytelling", audience: "umum" },
  "Kuliner": { purpose: "tutorial", audience: "umum" },
  "Rumah & Taman": { purpose: "tips-trik", audience: "umum" },
  "Hewan Peliharaan": { purpose: "edukasi", audience: "umum" },
  "Fashion": { purpose: "inspirasi", audience: "umum" },
  "Kecantikan": { purpose: "tutorial", audience: "umum" },
  "Otomotif": { purpose: "edukasi", audience: "umum" },
  "Travel": { purpose: "storytelling", audience: "umum" },
  "Spiritual": { purpose: "motivasi", audience: "umum" },
  "Hukum & Administrasi": { purpose: "edukasi", audience: "umum" },
  "Seni & Kreativitas": { purpose: "inspirasi", audience: "umum" },
  "Lingkungan": { purpose: "edukasi", audience: "umum" },
  "Sains": { purpose: "edukasi", audience: "pelajar" },
  "Gaming": { purpose: "storytelling", audience: "umum" },
  "Hiburan": { purpose: "storytelling", audience: "umum" },
};

let SUBNICHE_MAP = {
  "Kesehatan": ["Olahraga & Fitness","Diet & Nutrisi","Kesehatan Mental","Kesehatan Kulit","Kesehatan Jantung","Tidur & Istirahat","Kesehatan Anak","Kesehatan Wanita","Kesehatan Pria","Kesehatan Gigi","Kesehatan Mata","Imunitas & Vitamin","Kesehatan Usus","Kesehatan Tulang","Detoks & Pembersihan","Obat Herbal","Kesehatan Seksual","Kesehatan Lansia","Cek Kesehatan Rutin","Pertolongan Pertama"],
  "Keuangan": ["Investasi Saham","Reksadana","Cryptocurrency","Tabungan & Dana Darurat","Utang & Pinjaman","Asuransi","Pajak Pribadi","Dana Pensiun","Passive Income","Anggaran Bulanan","Kartu Kredit","Cicilan & KPR","Trading Forex","Emas & Logam Mulia","Fintech & E-Wallet","Literasi Keuangan Anak","Side Hustle","Manajemen Risiko","Valuasi Aset","Perencanaan Warisan"],
  "Bisnis": ["Startup & Venture","UMKM & Toko Kecil","Strategi Pemasaran","Manajemen Tim","E-commerce","Bisnis Online","Franchise","Negosiasi & Penjualan","Business Plan","Branding Bisnis","Customer Service","Supply Chain","Bisnis F&B","Bisnis Fashion","Bisnis Digital","Co-working & Kantor","Legalitas Bisnis","Skalasi Bisnis","Inovasi Produk","Bisnis Franchise"],
  "Karier": ["Resign & Pindah Kerja","Gaji & Negosiasi","Wawancara Kerja","CV & Portfolio","LinkedIn & Personal Branding","Kenaikan Jabatan","Kerja Remote","Freelance","Skill Wajib Karier","Networking","Internship","Sertifikasi Profesi","Work Life Balance","Resign dengan Elegan","Karier di Startup","Karier di Luar Negeri","Side Project","Mentor & Coaching","Karier Tanpa Gelar","Burnout & Istirahat"],
  "Pendidikan": ["Teknik Belajar Efektif","Ujian & Try Out","Beasiswa","Kuliah di Luar Negeri","Sekolah Kedinasan","Kursus Online","Skripsi & Tugas Akhir","Membaca Cepat","Mind Mapping","Homeschooling","Pendidikan Anak Usia Dini","Bimbingan Belajar","Jurusan Kuliah","Pendidikan Vokasi","Belajar Bahasa Asing","Soft Skills","Literasi Digital","Guru & Pengajar","Pendidikan Inklusif","Penelitian & Jurnal"],
  "Teknologi": ["Pemrograman & Coding","Cybersecurity","Cloud Computing","Data Science","Blockchain","Internet of Things","Aplikasi Mobile","Web Development","DevOps","Database & SQL","UI UX Design","Sistem Operasi","Jaringan Komputer","Open Source","Startup Teknologi","Gadget & Review","AI Tools","Otomatisasi","Teknologi Ramah Lingkungan","Virtual Reality"],
  "Artificial Intelligence": ["ChatGPT & Prompt Engineering","AI untuk Bisnis","AI untuk Content Creator","Machine Learning","Deep Learning","Computer Vision","Natural Language Processing","AI Ethics","Generative AI","AI untuk Pendidikan","AI Image Generator","AI Video Generator","AI Voice & Audio","AI Automation","AI untuk Kesehatan","AI untuk Coding","AI untuk Marketing","Open Source AI","AI Startup","Masa Depan AI"],
  "Digital Marketing": ["SEO & Search Engine","SEM & Google Ads","Social Media Ads","Email Marketing","Copywriting","Content Marketing","Influencer Marketing","Affiliate Marketing","Google Analytics","Conversion Rate Optimization","Landing Page","Funnel Marketing","Marketing Automation","Video Marketing","Podcast Marketing","Community Marketing","Growth Hacking","Market Research","Retargeting","Brand Awareness"],
  "Media Sosial": ["Instagram Marketing","TikTok Strategy","YouTube Content","Twitter/X Engagement","LinkedIn Strategy","Facebook Marketing","Pinterest Marketing","Snapchat & Discord","Threads & BlueSky","Social Media Analytics","Algorithm & Reach","Viral Content","Hashtag Strategy","Social Media Ads","Community Management","User Generated Content","Social Listening","Engagement Rate","Brand Voice","Crisis Management"],
  "Content Creator": ["Ide Konten","Copywriting Konten","Foto & Videografi","Editing & Post Production","Script Writing","Thumbnail & Cover","Caption & Hook","Konsistensi Posting","Growth Strategy","Monetisasi Konten","Brand Deal & Endorsement","Tools Creator","AI untuk Creator","Kolaborasi Creator","Personal Branding Creator","Manajemen Waktu","Content Planner","Analytics Creator","Platform Strategy","Komunitas & Engagement"],
  "Branding": ["Logo & Identitas Visual","Brand Storytelling","Brand Guideline","Rebranding","Personal Branding","Brand Positioning","Brand Voice & Tone","Brand Awareness","Brand Loyalty","Brand Community","Employer Branding","Brand Collaboration","Brand Audit","Naming & Tagline","Packaging Design","Brand Strategy","Brand Value","Brand Personality","Trust & Credibility","Brand Experience"],
  "Produktivitas": ["Time Management","Pomodoro Technique","To Do List & Prioritas","GTD Method","Morning Routine","Deep Work","Multitasking vs Fokus","Digital Detox","Aplikasi Produktivitas","Notion & Tools","Goal Setting","Kebiasaan Produktif","Prokrastinasi","Energi Management","Meeting Efisien","Delegasi & Outsource","Single Tasking","Journaling","Weekly Review","Workflow Automation"],
  "Parenting": ["Pola Asuh Anak","Nutrisi Anak","Pendidikan Anak","Screen Time","Aktivitas Anak","Kesehatan Anak","Parenting Balita","Parenting Remaja","Ibu Bekerja","Ayah & Parenting","Disiplin Positif","Bonding Orang Tua","Mainan Edukasi","Anak & Teknologi","Parenting Islami","Anak Berkebutuhan Khusus","Sibling Rivalry","Parenting Sendiri","Liburan Keluarga","Komunikasi Anak"],
  "Hubungan": ["Relationship Tips","Komunikasi Pasangan","Long Distance Relationship","Toxic Relationship","Love Language","Quality Time","Trust & Kepercayaan","Konflik & Argumen","Komitmen","Persiapan Nikah","Relationship Goals","Single & Self Love","Breakup & Move On","Relationship dengan Mertua","Romantisme & Kejutan","Persahabatan","Relationship dengan Orang Tua","Relationship Building","Konseling & Terapi"],
  "Pengembangan Diri": ["Mindset & Pola Pikir","Kebiasaan Baik","Public Speaking","Percaya Diri","Journaling & Refleksi","Meditasi & Mindfulness","Growth Mindset","Keluar Zona Nyaman","Manajemen Emosi","Empati & Social Skill","Leadership","Disiplin Diri","Resiliensi","Visualisasi & Afirmasi","Self Awareness","Belajar Skill Baru","Membaca & Literasi","Networking & Relasi","Goal Setting","Self Reward"],
  "Hobi": ["Fotografi","Melukis & Menggambar","Menulis Kreatif","Membaca Buku","Berkebun","Memasak & Baking","DIY & Kerajinan","Musik & Instrumen","Menari","Olahraga Hobi","Koleksi & Barang Antik","Origami & Papercraft","Voluntourism","Geocaching","Calligraphy","Journaling Hobi","Board Games","Chess & Puzzle","Bird Watching","Kaligrafi"],
  "Kuliner": ["Resep Masakan","Makanan Tradisional","Makanan Internasional","Makanan Sehat","Street Food","Minuman & Kopi","Dessert & Kue","Makanan Viral","Kuliner Nusantara","Fine Dining","Food Photography","Review Kuliner","Bisnis Kuliner","Meal Prep","Makanan Vegetarian","Kuliner Halal","Makanan Bayi & Anak","Wine & Minuman","Baking & Pastry","Makanan Diet"],
  "Rumah & Taman": ["Dekorasi Rumah","Interior Design","Renovasi Rumah","Rumah Minimalis","Taman & Landscape","Tanaman Hias","Furniture & Layout","Pencahayaan Rumah","Rumah Ramah Lingkungan","Organisasi Rumah","Kebersihan Rumah","Rumah Mungil","Warna Cat & Dinding","Outdoor Living","DIY Dekorasi","Smart Home","Kolam & Air Mancur","Rumah Sehat","Feng Shui","Garasi & Gudang"],
  "Hewan Peliharaan": ["Anjing & Perawatan","Kucing & Perawatan","Ikan Hias","Burung & Kicau","Hamster & Rodent","Reptil & Exotic","Makanan & Nutrisi","Kesehatan Hewan","Grooming & Perawatan","Hewan Lucu","Dog Training","Cat Behavior","Pet Travel","Adopsi & Rescue","Hewan & Bayi","Bisnis Pet Shop","Pet Community","Pet Fashion & Aksesoris","Kandang & Habitat","Hewan Langka"],
  "Fashion": ["Fashion Pria","Fashion Wanita","Fashion Muslim","Streetwear","Outfit Inspirasi","Fashion & Tren","Sustainable Fashion","Second Hand & Thrift","Fashion untuk Tubuh","Aksesoris & Perhiasan","Sepatu & Sneakers","Tas & Dompet","Fashion Anak","Batik & Tenun","Fashion Formal","Fashion Casual","Fashion Vintage","Fashion Brand Lokal","Capsule Wardrobe","Fashion Budget"],
  "Kecantikan": ["Skincare Routine","Makeup Tutorial","Produk Kecantikan","Perawatan Wajah","Perawatan Rambut","Perawatan Tubuh","Perawatan Kuku","Parfum & Wangian","Kecantikan Alami","Kecantikan Pria","Kecantikan Muslimah","Spa & Relaksasi","Anti Aging","Beauty Tools","Makeup Untuk Pemula","Hijab & Makeup","Produk Lokal","Beauty Review","Kecantikan & Makanan","Beauty Hacks"],
  "Otomotif": ["Review Mobil","Review Motor","Perawatan Kendaraan","Modifikasi Mobil","Modifikasi Motor","Tips Berkendara","Mobil Bekas","Motor Bekas","Mobil Listrik","Otomotif & Teknologi","Balap & Racing","Safety & Keselamatan","Custom & Vintage","Offroad & Adventure","Bengkel & Service","Spare Part & Aksesoris","Komunitas Otomotif","Asuransi Kendaraan","SIM & Administrasi","Road Trip"],
  "Travel": ["Tips Perjalanan","Destinasi Wisata","Backpacker","Hotel & Akomodasi","Kuliner Travel","Wisata Alam","Wisata Budaya","Liburan Keluarga","Solo Travel","Honeymoon","Travel Budget","Wisata Halal","Visa & Dokumen","Travel Photography","Adventure Travel","Staycation","Wisata Sejarah","Transportasi Travel","Travel Hacks","Homestay & Guesthouse"],
  "Spiritual": ["Sholat & Ibadah","Al-Quran & Tilawah","Doa & Dzikir","Puasa & Ramadhan","Zakat & Sedekah","Haji & Umrah","Akhlak & Adab","Rasa Syukur","Tawakal & Ikhlas","Cinta & Pernikahan Islam","Parenting Islami","Muamalah & Ekonomi Islam","Sejarah Islam","Kajian & Majelis","Hijrah & Perubahan","Mindfulness & Meditasi","Yoga & Spiritual","Kebatinan & Kejawen","Agama & Filsafat","Toleransi & Kerukunan"],
  "Hukum & Administrasi": ["Hukum Pidana","Hukum Perdata","Hukum Bisnis","Hukum Ketenagakerjaan","Hukum Keluarga","Hukum Pajak","Hukum Properti","Hukum Digital & IT","HKI & Paten","Kontrak & Perjanjian","Waris & Surat Wasiat","Perdata & Gugatan","Hukum Acara","Mediasi & Arbitrase","Legalitas Usaha","Administrasi Kependudukan","Perizinan & Dokumen","Notaris & PPAT","Konsultan Hukum","Advokat & Pengacara"],
  "Seni & Kreativitas": ["Seni Lukis","Seni Digital","Ilustrasi & Desain","Fotografi Seni","Seni Patung","Seni Teater","Seni Tari","Seni Musik","Seni Kaligrafi","Kreativitas & Ide","Kreativitas Anak","Desain Grafis","Animasi & Motion","Film & Sinema","Karya Seni dari Sampah","Seni Jalanan","Pameran & Galeri","Komunitas Seni","Creative Block","Portofolio Seni"],
  "Lingkungan": ["Perubahan Iklim","Daur Ulang & Upcycle","Kurangi Plastik","Energi Terbarukan","Go Green & Ramah Lingkungan","Konservasi Alam","Reboisasi & Hutan","Laut & Ekosistem","Polusi Udara","Komunitas Lingkungan","Produk Ramah Lingkungan","Zero Waste Lifestyle","Sustainable Fashion","Green Building","Transportasi Ramah Lingkungan","Limbah & Sampah","Pendidikan Lingkungan","Hewan Terancam Punah","Climate Action","Green Business"],
  "Sains": ["Fisika & Alam","Kimia & Reaksi","Biologi & Makhluk Hidup","Astronomi & Luar Angkasa","Matematika & Logika","Ilmu Pengetahuan Populer","Percobaan Sains","Tokoh Ilmuwan","Inovasi Ilmiah","Sains & Teknologi","Bumi & Geologi","Meteorologi & Cuaca","Psikologi Populer","Sosiologi & Masyarakat","Arkeologi","Kesehatan & Kedokteran","Neurosains & Otak","Genetika & DNA","Sains untuk Anak","Jurnal Ilmiah"],
  "Gaming": ["Mobile Game","PC Gaming","Console Gaming","Esports & Turnamen","Game Strategy","RPG & Open World","Battle Royale","Game Edukasi","Game Indie","Game Retro","Streaming Game","Content Creator Game","Komunitas Game","Gaming Gear","Tips & Trik Game","Game Story","Multiplayer & Co-op","Game Terbaru","Gaming Lifestyle","Game Design"],
  "Hiburan": ["Film & Bioskop","Series & Drama","Musik & Konser","Podcast & Radio","Buku & Novel","Stand Up Comedy","Variety Show","Anime & Manga","Acara TV","YouTube Entertainment","Streaming Service","Fandom & Fanbase","Rekomendasi Tontonan","Trivia & Fakta","Selebriti & Gossip","Budaya Pop","Festival & Event","Game Show","Dunia Hiburan","Review Film"],
};

const state = {
  topic: "",
  purpose: "",
  audience: "",
  slideCount: 5,
  aspectRatio: "",
  customRatioW: "",
  customRatioH: "",
  visualCategory: "",
  stylePreset: "",
  customStyle: "",
  palette: "",
  color1: "#1E3A5F",
  color2: "#D4AF37",
  color3: "#F5F5F0",
  brandNote: "",
  lightingNote: "soft even lighting, no harsh shadows",
  compositionNote: "centered composition, balanced margins",
  negativePrompt: DEFAULT_NEGATIVE,
  layout: "",
  slides: [],
  aiLoading: false,
  jsonGenerated: false,
  openCodeApiKey: "",
  openCodeModel: "",
  activeModels: [],
  allModels: [],
  customModels: [],
  generateFailCount: 0,
  _aborted: false,
  _abortController: null,
  authToken: sessionStorage.getItem("cps_auth_token") || localStorage.getItem("cps_auth_token") || "",
  currentUser: null,
  prompts: null,
  categoryImages: {},
};

// ── API client ──
async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json" };
  if (state.authToken) headers["Authorization"] = `Bearer ${state.authToken}`;
  const res = await fetch(path, { ...options, headers: { ...headers, ...options.headers } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

function storeToken(token) {
  state.authToken = token;
  try { sessionStorage.setItem("cps_auth_token", token); } catch {}
  try { localStorage.setItem("cps_auth_token", token); } catch {}
}

function clearToken() {
  state.authToken = "";
  try { sessionStorage.removeItem("cps_auth_token"); } catch {}
  try { localStorage.removeItem("cps_auth_token"); } catch {}
}

function getCurrentUser() {
  return state.currentUser;
}

function isAdmin() {
  return state.currentUser?.role === "admin";
}

function renderUserMenu() {
  const u = state.currentUser;
  const label = document.getElementById("user-menu-label");
  const info = document.getElementById("dropdown-user-info");
  const welcome = document.getElementById("welcome-user-name");
  if (label) label.textContent = u ? "Welcome, " + u.name : "Guest";
  if (info) info.textContent = u ? `${u.name} (${u.role})` : "Belum login";
  if (welcome) welcome.textContent = u ? u.name : "User";

  const admin = u?.role === "admin";
  const els = [
    "btn-switch-user",
    "btn-change-password",
    "btn-login-dropdown",
    "btn-logout",
    "btn-ai-panel",
    "btn-prompt-ai",
    "btn-admin-panel",
    "btn-category-images",
    "btn-niche-management",
    "btn-guide",
    "btn-settings",
    "admin-only-section",
  ];
  const visibility = {
    btnSwitchUser: { guest: false, user: false, admin: true },
    btnChangePassword: { guest: false, user: true, admin: true },
    btnLoginDropdown: { guest: true, user: false, admin: false },
    btnLogout: { guest: false, user: true, admin: true },
    btnAiPanel: { guest: false, user: false, admin: true },
    btnPromptAi: { guest: false, user: false, admin: true },
    btnAdminPanel: { guest: false, user: false, admin: true },
    btnCategoryImages: { guest: false, user: false, admin: true },
    btnNicheManagement: { guest: false, user: false, admin: true },
    btnGuide: { guest: false, user: false, admin: true },
    btnSettings: { guest: true, user: true, admin: true },
    adminOnlySection: { guest: false, user: false, admin: true },
  };

  const idMap = [
    ["btn-switch-user", "btnSwitchUser"],
    ["btn-change-password", "btnChangePassword"],
    ["btn-login-dropdown", "btnLoginDropdown"],
    ["btn-logout", "btnLogout"],
    ["btn-ai-panel", "btnAiPanel"],
    ["btn-prompt-ai", "btnPromptAi"],
    ["btn-admin-panel", "btnAdminPanel"],
    ["btn-category-images", "btnCategoryImages"],
    ["btn-niche-management", "btnNicheManagement"],
    ["btn-guide", "btnGuide"],
    ["btn-settings", "btnSettings"],
    ["admin-only-section", "adminOnlySection"],
  ];

  const role = u ? (admin ? "admin" : "user") : "guest";
  for (const [id, key] of idMap) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (visibility[key][role]) el.classList.remove("hidden");
    else el.classList.add("hidden");
  };
}

async function renderUserList() {
  try {
    const users = await api("/api/users");
    const list = document.getElementById("user-list");
    list.innerHTML = users.map((u) => `
      <div class="flex items-center justify-between rounded-lg px-3 py-2 text-xs" style="background:var(--bg-canvas)">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span style="color:var(--cream)">${escapeHtml(u.name)}</span>
          <span style="color:var(--ink-faint)">${escapeHtml(u.email)}</span>
          <input data-phone-user="${u.id}" type="tel" value="${escapeHtml(u.phone || "")}" class="input-field rounded px-1.5 py-0.5 text-xs" style="width:120px; background:var(--bg-card); color:var(--ink-soft)" placeholder="No. WA">
          <span class="px-1.5 py-0.5 rounded text-[10px]" style="background:var(--amber-soft); color:var(--amber)">${u.role}</span>
        </div>
        ${users.length > 1 && u.id !== state.currentUser?.id ? `
          <button data-delete-user="${u.id}" class="hover:text-[var(--coral)]" style="color:var(--ink-faint)">
            <i class="ti ti-trash text-sm"></i>
          </button>
        ` : ""}
      </div>
    `).join("");
  } catch { showToast("Gagal memuat daftar user", "error"); }
}

let _scrollLockDepth = 0;
function lockScroll() { _scrollLockDepth++; document.body.style.overflow = 'hidden'; }
function unlockScroll() {
  _scrollLockDepth = Math.max(0, _scrollLockDepth - 1);
  if (_scrollLockDepth === 0) document.body.style.overflow = '';
}

function showLoginModal() {
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("forgot-form").classList.add("hidden");
  document.getElementById("inp-login-name").value = localStorage.getItem("cps_last_name") || "";
  document.getElementById("inp-login-email").value = localStorage.getItem("cps_last_email") || "";
  document.getElementById("inp-login-password").value = "";
  document.getElementById("inp-forgot-email").value = "";
  document.getElementById("inp-forgot-phone").value = "";
  document.getElementById("login-modal").classList.remove("hidden");
  document.getElementById("login-modal").scrollTop = 0;
  document.body.style.overflow = "hidden";
}

function applyRoleVisibility() {
  renderUserMenu();
  const bar = document.getElementById("preset-bar");
  if (bar) {
    if (getCurrentUser()) {
      bar.classList.remove("hidden");
      loadPresets();
    } else {
      bar.classList.add("hidden");
    }
  }
}

async function addUser() {
  const name = document.getElementById("inp-user-name").value.trim();
  const email = document.getElementById("inp-user-email").value.trim();
  const phone = normalizePhone(document.getElementById("inp-user-phone").value);
  const password = document.getElementById("inp-user-password").value;
  const role = document.getElementById("inp-user-role").value;
  if (!name || !email) { showToast("Isi nama dan email", "error"); return; }
  if (!password) { showToast("Isi password", "error"); return; }
  try {
    await api("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, password, role }),
    });
    document.getElementById("inp-user-name").value = "";
    document.getElementById("inp-user-email").value = "";
    document.getElementById("inp-user-phone").value = "";
    document.getElementById("inp-user-password").value = "";
    await renderUserList();
    showToast(`User "${name}" (${role}) ditambahkan`, "success");
  } catch (err) { showToast(err.message, "error"); }
}

async function deleteUser(id) {
  try {
    await api(`/api/users/${id}`, { method: "DELETE" });
    await renderUserList();
    renderUserMenu();
    applyRoleVisibility();
  } catch (err) { showToast(err.message, "error"); }
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40) || "carousel";
}

function uid() {
  return "s-" + Math.random().toString(36).slice(2, 9);
}

function buildDefaultSlides(count) {
  const slides = [];
  for (let i = 0; i < count; i++) {
    const isFirst = i === 0;
    const isLast = i === count - 1 && count > 1;
    let role = "isi";
    if (isFirst) role = "cover";
    else if (isLast) role = "penutup";

    slides.push({
      id: uid(),
      role,
      headline: isFirst ? (state.topic || "Judul carousel") : isLast ? "Kesimpulan / ajakan" : `Poin ${i}`,
      body: "",
      visualIdea: "",
    });
  }
  return slides;
}

function reconcileSlideCount(newCount) {
  const current = state.slides;
  if (newCount === current.length) return;
  if (newCount < current.length) {
    state.slides = current.slice(0, newCount);
  } else {
    const toAdd = newCount - current.length;
    for (let i = 0; i < toAdd; i++) {
      current.push({ id: uid(), role: "isi", headline: `Poin baru`, body: "", visualIdea: "" });
    }
  }
  // re-tag roles for first/last
  state.slides.forEach((s, idx) => {
    if (idx === 0) s.role = "cover";
    else if (idx === state.slides.length - 1 && state.slides.length > 1) s.role = "penutup";
    else s.role = "isi";
  });
}

function findStyleById(id) {
  for (const styles of Object.values(VISUAL_CATEGORIES)) {
    const found = styles.find((s) => s.id === id);
    if (found) return found;
  }
  return null;
}

function activeStyleTags() {
  const preset = findStyleById(state.stylePreset);
  const base = preset ? [...preset.tags] : [];
  if (state.customStyle.trim()) {
    state.customStyle.split(",").map((t) => t.trim()).filter(Boolean).forEach((t) => base.push(t));
  }
  return base;
}

function getPaletteString() {
  const c1 = state.color1 || "";
  const c2 = state.color2 || "";
  const c3 = state.color3 || "";
  const colors = [c1, c2, c3].filter(Boolean);
  if (colors.length) return colors.join(", ");
  return state.palette || "";
}

function composeMainPrompt(slide) {
  const parts = [];

  const ratio = getAspectRatioValue();
  parts.push(`A premium Instagram carousel ${slide.role} in ${ratio} portrait format. Highly detailed, professional quality, sharp focus, rich textures, cinematic lighting.`);

  const preset = findStyleById(state.stylePreset);
  if (preset) {
    parts.push(` ${preset.label} aesthetic with ${preset.tags.slice(0, 3).join(", ")}.`);
  }

  if (slide.visualIdea) {
    parts.push(` The visual scene: ${slide.visualIdea}.`);
  }

  if (slide.headline) {
    parts.push(` Text overlay reads "${slide.headline}".`);
    if (slide.body) {
      parts.push(` Supporting text: "${slide.body}".`);
    }
  }

  const layout = state.layout ? state.layout.replace(/-/g, " ") : "";
  if (layout) {
    parts.push(` Layout: ${layout}.`);
  }

  const tags = activeStyleTags();
  if (tags.length) {
    parts.push(` Style direction: ${tags.join(", ")}.`);
  }

  const pal = getPaletteString();
  if (pal) {
    parts.push(` Color palette: ${pal}.`);
  }

  if (state.lightingNote && state.lightingNote !== "—") {
    parts.push(` Lighting: ${state.lightingNote}.`);
  }

  if (state.compositionNote && state.compositionNote !== "—") {
    parts.push(` Composition: ${state.compositionNote}.`);
  }

  if (state.brandNote) {
    parts.push(` Brand: ${state.brandNote}.`);
  }

  let prompt = parts.join("") + " STRICT NON-NEGOTIABLE RULE: Absolutely NO living beings, people, characters, animals, creatures, humans, faces, body parts, or any biological entity. No mascots, no cartoon characters, no people. Only objects, text, abstract shapes, buildings, nature without living beings.";

  prompt += `\n\nNegative prompt: ${state.negativePrompt || DEFAULT_NEGATIVE}`;

  return prompt;
}

// ---------- RENDER ----------

function populateVisualCategory() {
  const el = document.getElementById("inp-visual-category");
  const cats = Object.keys(VISUAL_CATEGORIES);
  el.innerHTML = '<option value="">Pilih kategori visual</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join("");
  el.value = state.visualCategory;
  el._enhancedRefresh?.();
}

function populateNicheDropdown(selected) {
  const el = document.getElementById("inp-evergreen-niche");
  const keys = Object.keys(NICHE_MAP).sort();
  el.innerHTML = '<option value="">Pilih niche</option>' + keys.map(k => `<option value="${k}">${k}</option>`).join("");
  if (selected && NICHE_MAP[selected]) el.value = selected;
  el._enhancedRefresh?.();
}

function updateColorSwatches() {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`inp-color-${i}`);
    if (el) el.style.background = state[`color${i}`];
  }
}

function applyStylePalette(styleId) {
  const palette = STYLE_PALETTES[styleId];
  if (!palette || palette.length === 0) return;
  state.color1 = palette[0] || state.color1;
  state.color2 = palette[1] || state.color2;
  state.color3 = palette[2] || state.color3;
  updateColorSwatches();
  refreshJsonOutput();
}

// ── Color Picker ──

let _cpTarget = null;
let _cpH = 0, _cpS = 100, _cpV = 100;
let _cpCache = null;

function hsvToRgb(h, s, v) {
  s /= 100; v /= 100;
  const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return [(r + m) * 255 | 0, (g + m) * 255 | 0, (b + m) * 255 | 0];
}

function buildColorCache(w, h, hue) {
  try {
    if (!w || !h) return null;
    const canvas = document.getElementById("color-canvas");
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(w, h);
    const d = imageData.data;
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const s = (px / w) * 100;
        const v = (1 - py / h) * 100;
        const [r, g, b] = hsvToRgb(hue, s, v);
        const i = (py * w + px) * 4;
        d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255;
      }
    }
    return imageData;
  } catch (e) { console.error('cp:buildColorCache', e); return null; }
}

function hsvToHex(h, s, v) {
  s /= 100; v /= 100;
  const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function hexToHsv(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (mx === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return { h, s: mx ? (d / mx) * 100 : 0, v: mx * 100 };
}

function drawColorField() {
  try {
    const canvas = document.getElementById("color-canvas");
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.round(rect.width), h = Math.round(rect.height);
    if (w < 1 || h < 1) return;
    const w2 = w * 2, h2 = h * 2;

    if (canvas.width !== w2 || canvas.height !== h2 || !_cpCache) {
      canvas.width = w2;
      canvas.height = h2;
      _cpCache = buildColorCache(w2, h2, _cpH);
      if (!_cpCache) return;
    }

    const ctx = canvas.getContext("2d");
    ctx.putImageData(_cpCache, 0, 0);

    // indicator in canvas pixel coordinates (no transforms)
    const cx = (_cpS / 100) * w2;
    const cy = (1 - _cpV / 100) * h2;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1A1408";
    ctx.stroke();
  } catch (e) { console.error('cp:drawColorField', e); }
}

function redrawColorField() {
  if (!_cpCache) { drawColorField(); return; }
  try {
    const canvas = document.getElementById("color-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(_cpCache, 0, 0);

    const w2 = canvas.width, h2 = canvas.height;
    const cx = (_cpS / 100) * w2;
    const cy = (1 - _cpV / 100) * h2;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1A1408";
    ctx.stroke();
  } catch (e) { console.error('cp:redrawColorField', e); }
}

function getColorFromCanvas(x, y) {
  const rect = document.getElementById("color-canvas").parentElement.getBoundingClientRect();
  const sx = Math.max(0, Math.min(1, x / rect.width));
  const sy = Math.max(0, Math.min(1, y / rect.height));
  _cpS = sx * 100;
  _cpV = (1 - sy) * 100;
  const hex = hsvToHex(_cpH, _cpS, _cpV);
  document.getElementById("color-preview").style.background = hex;
  document.getElementById("color-hex").value = hex.slice(1);
  redrawColorField();
}

function handleColorEvent(e) {
  e.preventDefault();
  const rect = document.getElementById("color-canvas").parentElement.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  getColorFromCanvas(clientX - rect.left, clientY - rect.top);
}

function openColorPicker(target) {
  _cpTarget = target;
  const currentHex = state[target];
  const hsv = hexToHsv(currentHex);
  _cpH = hsv.h;
  _cpS = hsv.s;
  _cpV = hsv.v;

  document.getElementById("color-preview").style.background = currentHex;
  document.getElementById("color-hex").value = currentHex.slice(1);
  document.getElementById("color-hue").value = _cpH;

  // Populate presets from current style palette
  const presetsEl = document.getElementById("color-presets");
  const palette = state.stylePreset ? STYLE_PALETTES[state.stylePreset] : null;
  if (palette && palette.length) {
    presetsEl.innerHTML = palette.map(c =>
      `<button class="preset-chip rounded-lg border" style="width:28px;height:28px;background:${c};border-color:var(--border-soft)" data-color="${c}"></button>`
    ).join("");
  } else {
    presetsEl.innerHTML = "";
  }

  // Set up canvas
  const canvas = document.getElementById("color-canvas");
  const parent = canvas.parentElement;
  _cpCache = null;
  parent.style.height = parent.offsetWidth > 0 ? parent.offsetWidth + "px" : "180px";
  setTimeout(() => { drawColorField(); }, 50);

  document.getElementById("color-modal").classList.remove("hidden");
  lockScroll();
}

function applyColor() {
  if (!_cpTarget) return;
  const hex = "#" + document.getElementById("color-hex").value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
  if (hex.length === 7) {
    state[_cpTarget] = hex;
    updateColorSwatches();
    refreshJsonOutput();
  }
  document.getElementById("color-modal").classList.add("hidden");
  unlockScroll();
  _cpTarget = null;
}

function renderStylePresets() {
  const grid = document.getElementById("style-grid");
  const styles = state.visualCategory ? VISUAL_CATEGORIES[state.visualCategory] || [] : [];
  if (styles.length === 0) {
    grid.innerHTML = "";
    return;
  }
  grid.innerHTML = styles.map((s) => {
    const img = state.categoryImages[s.id];
    return `
    <button data-style="${s.id}" class="style-card relative text-left rounded-lg px-3 py-2.5 border" style="background:var(--bg-card); border-color:${s.id === state.stylePreset ? 'var(--amber)' : 'var(--border-soft)'}">
      ${img ? `<img src="${img}" alt="${s.label}" class="style-thumb" loading="lazy">` : ""}
      <div class="flex items-center justify-between mb-1">
        <i class="ti ${s.icon} text-base" style="color:var(--amber-dim)"></i>
        <i class="ti ti-circle-check-filled style-check text-sm" style="color:var(--amber)"></i>
      </div>
      <div class="text-xs font-medium" style="color:var(--cream)">${s.label}</div>
      <div class="text-[10px] mt-0.5" style="color:var(--ink-faint)">${s.desc}</div>
    </button>`;
  }).join("");

  grid.querySelectorAll("[data-style]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.stylePreset = btn.getAttribute("data-style");
      syncStyleCardClasses();
      applyStylePalette(state.stylePreset);
    });
  });
  syncStyleCardClasses();
}

function syncStyleCardClasses() {
  document.querySelectorAll("#style-grid [data-style]").forEach((btn) => {
    const isActive = btn.getAttribute("data-style") === state.stylePreset;
    btn.classList.toggle("active", isActive);
    btn.style.borderColor = isActive ? "var(--amber)" : "var(--border-soft)";
  });
}

function roleBadgeClass(role) {
  if (role === "cover") return "role-badge-cover";
  if (role === "penutup") return "role-badge-penutup";
  return "role-badge-isi";
}

function roleLabel(role) {
  if (role === "cover") return "Cover";
  if (role === "penutup") return "Penutup";
  return "Isi";
}

function renderSlidesArea() {
  const hasGeneratedSlides = state.slides.some((s) => s.body || s.visualIdea);
  document.getElementById("empty-state").classList.toggle("hidden", hasGeneratedSlides);
  document.getElementById("slides-area").classList.toggle("hidden", !hasGeneratedSlides);
  if (!hasGeneratedSlides) return;

  document.getElementById("slide-count-label").textContent = state.slides.length;
  renderCarouselTrack();
  renderSlideList();
  refreshJsonOutput();
}

function getAspectRatioValue() {
  if (state.aspectRatio === "custom" && state.customRatioW && state.customRatioH) {
    return `${state.customRatioW}:${state.customRatioH}`;
  }
  return state.aspectRatio || "4:5";
}

function updateRatioIcon() {
  const icon = document.getElementById("ratio-icon");
  const val = state.aspectRatio;
  if (!val || val === "custom") { icon.className = "text-base w-5 text-center flex-shrink-0"; icon.style.color = "var(--ink-faint)"; return; }
  const [w, h] = val.split(":").map(Number);
  let cls = "ti-square";
  if (w > h) cls = "ti-rectangle";
  else if (w < h) cls = "ti-rectangle-vertical";
  icon.className = `ti ${cls} text-base w-5 text-center flex-shrink-0`;
  icon.style.color = "var(--ink-faint)";
}

function renderCarouselTrack() {
  const track = document.getElementById("carousel-track");
  const ratio = getAspectRatioValue();
  const ratioClass = ratio === "1:1" ? "aspect-square" : ratio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]";

  track.innerHTML = state.slides.map((s, idx) => `
    <div class="carousel-card w-44 ${ratioClass} rounded-xl border flex flex-col relative overflow-hidden" style="background:linear-gradient(160deg, var(--bg-card), #19170F); border-color:var(--border-soft)">
      <div class="relative z-10 flex flex-col p-4 h-full">
        <span class="text-[10px] px-2 py-0.5 rounded-full border self-start mb-2 ${roleBadgeClass(s.role)}" style="background:rgba(0,0,0,.4)">${roleLabel(s.role)}</span>
        <p class="font-display text-sm leading-snug" style="color:var(--cream); text-shadow: 0 1px 4px rgba(0,0,0,.6)">${escapeHtml(s.headline) || `<span style="color:var(--ink-faint)">Belum ada headline</span>`}</p>
        ${s.body ? `<p class="text-[11px] mt-2 leading-snug" style="color:var(--ink-soft); text-shadow: 0 1px 3px rgba(0,0,0,.5)">${escapeHtml(truncate(s.body, 70))}</p>` : ""}
        <span class="mt-auto text-[10px] font-mono pt-2" style="color:var(--ink-faint); text-shadow: 0 1px 3px rgba(0,0,0,.5)">${idx + 1} / ${state.slides.length}</span>
      </div>
    </div>
  `).join("");
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function normalizePhone(phone) {
  const digits = (phone || "").replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;
  return digits;
}

function renderSlideList() {
  const list = document.getElementById("slide-list");
  list.innerHTML = state.slides.map((s, idx) => `
    <div class="rounded-xl border p-4" style="background:var(--bg-card); border-color:var(--border-soft)">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs px-2.5 py-1 rounded-full border ${roleBadgeClass(s.role)}">Slide ${idx + 1} · ${roleLabel(s.role)}</span>
        <div class="flex items-center gap-2">
          ${state.slides.length > 1 ? `<button data-remove="${s.id}" class="text-xs flex items-center gap-1 hover:text-[var(--coral)]" style="color:var(--ink-faint)"><i class="ti ti-trash text-sm"></i></button>` : ""}
        </div>
      </div>

      <label class="block text-[11px] mb-1" style="color:var(--ink-soft)">Headline</label>
      <textarea data-field="headline" data-id="${s.id}" class="input-field w-full rounded-lg px-3 py-2 text-sm mb-3" placeholder="Judul singkat slide ini" rows="1">${escapeHtml(s.headline)}</textarea>

      <label class="block text-[11px] mb-1" style="color:var(--ink-soft)">Isi teks singkat</label>
      <textarea data-field="body" data-id="${s.id}" class="input-field w-full rounded-lg px-3 py-2 text-sm mb-3" placeholder="Kalimat pendukung, 1 kalimat" rows="1">${escapeHtml(s.body)}</textarea>

      <label class="block text-[11px] mb-1" style="color:var(--ink-soft)">Ide visual utama</label>
      <textarea data-field="visualIdea" data-id="${s.id}" class="input-field w-full rounded-lg px-3 py-2 text-sm mb-3" placeholder="contoh: ilustrasi celengan dan grafik naik" rows="1">${escapeHtml(s.visualIdea)}</textarea>

      <button data-copy-json="${s.id}" class="btn-ghost btn-slide-copy w-full rounded-lg py-2 text-xs flex items-center justify-center gap-1.5">
        <i class="ti ti-code text-sm" style="pointer-events:none"></i> Copy JSON slide ini
      </button>
    </div>
  `).join("");

  list.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", (e) => {
      const id = e.target.getAttribute("data-id");
      const field = e.target.getAttribute("data-field");
      const slide = state.slides.find((s) => s.id === id);
      if (slide) {
        slide[field] = e.target.value;
        renderCarouselTrack();
        refreshJsonOutput();
      }
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    });
  });
  list.querySelectorAll("textarea[data-field]").forEach((t) => {
    t.style.height = "auto";
    t.style.height = t.scrollHeight + "px";
  });

  list.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-remove");
      state.slides = state.slides.filter((s) => s.id !== id);
      state.slides.forEach((s, idx) => {
        if (idx === 0) s.role = "cover";
        else if (idx === state.slides.length - 1 && state.slides.length > 1) s.role = "penutup";
        else s.role = "isi";
      });
      document.getElementById("inp-count").value = String(state.slides.length);
      renderSlidesArea();
    });
  });

  list.querySelectorAll("[data-copy-json]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      copySlideJson(btn.getAttribute("data-copy-json"), btn);
    });
  });
}

async function renderEmptyState() {
  try {
    const data = await api("/api/guide");
    const guide = data.guide || [];
    const container = document.getElementById("guide-steps");
    if (!container) return;
    container.innerHTML = guide.map((step, i) => `
      <div class="rounded-lg border px-3 py-2.5 flex items-start gap-2.5 ${i === guide.length - 1 && guide.length % 2 === 1 ? 'col-span-2' : ''}" style="background:var(--bg-card); border-color:var(--border-soft)">
        <span class="guide-step-num flex-shrink-0 font-semibold" style="color:var(--amber)">${i + 1}.</span>
        <div class="flex-1">
          <p class="lg:text-sm text-xs font-medium" style="color:var(--cream)">${escapeHtml(step.title)}</p>
          <p class="lg:text-sm text-[10px] mt-0.5" style="color:var(--ink-soft)">${escapeHtml(step.description)}</p>
        </div>
      </div>
    `).join("");
  } catch (e) {
    console.warn('Gagal memuat panduan:', e);
  }
}

async function loadGuideForAdmin() {
  try {
    const data = await api("/api/guide");
    return data.guide || [];
  } catch { return []; }
}

let _dragIdx = null;
let _touchDragIdx = null;

function reorderGuide(from, to) {
  if (from === null || from === to) return;
  const guide = window._guideData;
  if (!guide) return;
  const [moved] = guide.splice(from, 1);
  guide.splice(to, 0, moved);
  window._guideData = guide;
  renderGuideEditor(guide);
}

function setupTouchDrag(row, list) {
  let startY, touchIdx, clone, cloneY;

  const onTouchStart = (e) => {
    const handle = row.querySelector(".guide-drag-handle");
    if (handle && !handle.contains(e.target)) return;
    if (e.target.closest("input") || e.target.closest("textarea") || e.target.closest("button")) return;
    const touch = e.touches[0];
    startY = touch.clientY;
    touchIdx = parseInt(row.dataset.idx);
    _touchDragIdx = touchIdx;
  };

  const onTouchMove = (e) => {
    if (_touchDragIdx === null) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rows = list.querySelectorAll(".guide-step-row");
    rows.forEach((r) => r.style.border = "");
    for (const r of rows) {
      const rect = r.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (touch.clientY < mid) {
        r.style.border = "1px dashed var(--amber-dim)";
        break;
      }
    }
  };

  const onTouchEnd = (e) => {
    if (_touchDragIdx === null) return;
    const touch = e.changedTouches[0];
    const rows = list.querySelectorAll(".guide-step-row");
    rows.forEach((r) => r.style.border = "");
    let targetIdx = rows.length - 1;
    for (let i = 0; i < rows.length; i++) {
      const rect = rows[i].getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      if (touch.clientY < mid) {
        targetIdx = i;
        break;
      }
    }
    if (targetIdx > _touchDragIdx) targetIdx--;
    reorderGuide(_touchDragIdx, targetIdx);
    _touchDragIdx = null;
  };

  row.addEventListener("touchstart", onTouchStart, { passive: true });
  row.addEventListener("touchmove", onTouchMove, { passive: false });
  row.addEventListener("touchend", onTouchEnd);
}

function renderGuideEditor(guide) {
  const list = document.getElementById("guide-list");
  if (!list) return;
  list.innerHTML = guide.map((step, i) => `
    <div class="rounded-lg px-3 py-2.5 guide-step-row" draggable="true" data-idx="${i}" style="background:var(--bg-canvas); cursor:grab; touch-action:none">
      <div class="flex items-center gap-2 mb-1.5">
        <span class="guide-drag-handle flex-shrink-0 text-xs" style="color:var(--ink-faint); cursor:grab; user-select:none">
          <i class="ti ti-grip-vertical text-sm"></i>
        </span>
        <span class="text-xs font-medium flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style="background:var(--amber-soft); color:var(--amber)">${i + 1}</span>
        <div class="flex-1 min-w-0">
          <input class="guide-title input-field w-full rounded-lg px-2.5 py-1.5 text-xs" value="${escapeHtml(step.title)}" placeholder="Judul langkah" data-idx="${i}">
        </div>
        <div class="flex items-center gap-0.5 flex-shrink-0">
          <button class="guide-move-btn text-xs hover:text-[var(--amber)] ${i === 0 ? 'opacity-20 pointer-events-none' : ''}" style="color:var(--ink-faint)" data-idx="${i}" data-dir="up" title="Naik">
            <i class="ti ti-chevron-up text-sm"></i>
          </button>
          <button class="guide-move-btn text-xs hover:text-[var(--amber)] ${i === guide.length - 1 ? 'opacity-20 pointer-events-none' : ''}" style="color:var(--ink-faint)" data-idx="${i}" data-dir="down" title="Turun">
            <i class="ti ti-chevron-down text-sm"></i>
          </button>
          <button class="guide-del-btn text-xs hover:text-[var(--coral)]" style="color:var(--ink-faint)" data-idx="${i}">
            <i class="ti ti-trash text-sm"></i>
          </button>
        </div>
      </div>
      <textarea class="guide-desc input-field w-full rounded-lg px-2.5 py-1.5 text-xs" rows="2" placeholder="Deskripsi langkah" data-idx="${i}" style="resize:vertical; min-height:2.5rem">${escapeHtml(step.description)}</textarea>
    </div>
  `).join("");

  // Auto-expand textareas
  list.querySelectorAll(".guide-desc").forEach((ta) => {
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  });

  // HTML5 Drag & drop (desktop)
  list.querySelectorAll(".guide-step-row").forEach((row) => {
    row.addEventListener("dragstart", (e) => {
      _dragIdx = parseInt(row.dataset.idx);
      row.style.opacity = "0.4";
      e.dataTransfer.effectAllowed = "move";
    });
    row.addEventListener("dragend", () => {
      row.style.opacity = "";
      _dragIdx = null;
      list.querySelectorAll(".guide-step-row").forEach((r) => r.style.border = "");
    });
    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      list.querySelectorAll(".guide-step-row").forEach((r) => r.style.border = "");
      row.style.border = "1px dashed var(--amber-dim)";
    });
    row.addEventListener("dragleave", () => {
      row.style.border = "";
    });
    row.addEventListener("drop", (e) => {
      e.preventDefault();
      row.style.border = "";
      reorderGuide(_dragIdx, parseInt(row.dataset.idx));
    });
  });

  // Touch drag & drop (mobile)
  list.querySelectorAll(".guide-step-row").forEach((row) => setupTouchDrag(row, list));
}

function openGuideModal() {
  document.getElementById("user-dropdown").classList.add("hidden");
  document.getElementById("guide-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderGuideEditor([]);
  loadGuideForAdmin().then((guide) => {
    renderGuideEditor(guide);
    window._guideData = guide;
  });
}

function closeGuideModal() {
  document.getElementById("guide-modal").classList.add("hidden");
  document.body.style.overflow = "";
  window._guideData = null;
}

/* ── Personalization ── */
function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === "light") {
    html.classList.add("light-theme");
  } else {
    html.classList.remove("light-theme");
  }
  const darkBtn = document.getElementById("btn-theme-dark");
  const lightBtn = document.getElementById("btn-theme-light");
  if (darkBtn && lightBtn) {
    const active = theme === "light" ? lightBtn : darkBtn;
    const inactive = theme === "light" ? darkBtn : lightBtn;
    active.style.background = "var(--amber)";
    active.style.color = "#1a1a1a";
    inactive.style.background = "transparent";
    inactive.style.color = "var(--ink-faint)";
  }
  try { localStorage.setItem("cps_theme", theme); } catch {}
}

async function loadSettings() {
  const saved = localStorage.getItem("cps_theme");
  if (state.currentUser) {
    try {
      const data = await api("/api/settings");
      const theme = data.settings?.theme || saved || "dark";
      applyTheme(theme);
      return;
    } catch {}
  }
  applyTheme(saved || "dark");
}

async function saveSettings(changes) {
  try { localStorage.setItem("cps_theme", changes.theme || "dark"); } catch {}
  if (state.currentUser) {
    try {
      await api("/api/settings", {
        method: "PUT",
        body: JSON.stringify({ settings: changes }),
      });
    } catch {}
  }
}

function openSettingsModal() {
  document.getElementById("user-dropdown").classList.add("hidden");
  document.getElementById("settings-modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  const theme = localStorage.getItem("cps_theme") || "dark";
  applyTheme(theme);
}

function closeSettingsModal() {
  document.getElementById("settings-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

/* ── Presets ── */
function collectPresetData() {
  return {
    topic: state.topic,
    purpose: state.purpose,
    audience: state.audience,
    slideCount: state.slideCount,
    aspectRatio: state.aspectRatio,
    customRatioW: state.customRatioW,
    customRatioH: state.customRatioH,
    visualCategory: state.visualCategory,
    stylePreset: state.stylePreset,
    customStyle: state.customStyle,
    palette: state.palette,
    color1: state.color1,
    color2: state.color2,
    color3: state.color3,
    brandNote: state.brandNote,
    lightingNote: state.lightingNote,
    compositionNote: state.compositionNote,
    negativePrompt: state.negativePrompt,
    layout: state.layout,
    evergreenNiche: document.getElementById("inp-evergreen-niche")?.value || "",
    subniche: document.getElementById("inp-subniche")?.value || "",
  };
}

function applyPresetData(data) {
  state.topic = data.topic || "";
  state.purpose = data.purpose || "";
  state.audience = data.audience || "";
  state.slideCount = data.slideCount || 5;
  state.aspectRatio = data.aspectRatio || "";
  state.customRatioW = data.customRatioW || "";
  state.customRatioH = data.customRatioH || "";
  state.visualCategory = data.visualCategory || "";
  state.stylePreset = data.stylePreset || "";
  state.customStyle = data.customStyle || "";
  state.palette = data.palette || "";
  state.color1 = data.color1 || "#1E3A5F";
  state.color2 = data.color2 || "#D4AF37";
  state.color3 = data.color3 || "#F5F5F0";
  state.brandNote = data.brandNote || "";
  state.lightingNote = data.lightingNote || "soft even lighting, no harsh shadows";
  state.compositionNote = data.compositionNote || "centered composition, balanced margins";
  state.negativePrompt = data.negativePrompt || DEFAULT_NEGATIVE;
  state.layout = data.layout || "";

  const topicEl = document.getElementById("inp-topic");
  if (topicEl) { topicEl.value = state.topic; autoExpand(topicEl); }
  const purposeEl = document.getElementById("inp-purpose");
  if (purposeEl) purposeEl.value = state.purpose;
  const audienceEl = document.getElementById("inp-audience");
  if (audienceEl) audienceEl.value = state.audience;
  const countEl = document.getElementById("inp-count");
  if (countEl) countEl.value = state.slideCount;
  const ratioEl = document.getElementById("inp-ratio");
  if (ratioEl) ratioEl.value = state.aspectRatio;
  const ratioW = document.getElementById("inp-ratio-w");
  if (ratioW) ratioW.value = state.customRatioW;
  const ratioH = document.getElementById("inp-ratio-h");
  if (ratioH) ratioH.value = state.customRatioH;
  const catEl = document.getElementById("inp-visual-category");
  if (catEl) catEl.value = state.visualCategory;
  const customStyleEl = document.getElementById("inp-customstyle");
  if (customStyleEl) { customStyleEl.value = state.customStyle; autoExpand(customStyleEl); }
  const paletteEl = document.getElementById("inp-palette");
  if (paletteEl) paletteEl.value = state.palette;
  const brandEl = document.getElementById("inp-brand");
  if (brandEl) { brandEl.value = state.brandNote; autoExpand(brandEl); }
  const layoutEl = document.getElementById("inp-layout");
  if (layoutEl) layoutEl.value = state.layout;

  const nicheEl = document.getElementById("inp-evergreen-niche");
  if (nicheEl) {
    nicheEl.value = data.evergreenNiche || "";
    nicheEl._enhancedRefresh?.();
    const subEl = document.getElementById("inp-subniche");
    if (subEl) {
      subEl.innerHTML = "";
      const items = SUBNICHE_MAP[nicheEl.value] || [];
      subEl.innerHTML = '<option value="">Pilih Subniche</option>' + items.map(i => `<option value="${i}">${i}</option>`).join("");
      subEl.value = data.subniche || "";
      subEl._enhancedRefresh?.();
    }
  }

  document.querySelectorAll("[data-enhanced]").forEach(el => el._enhancedRefresh?.());
  updateColorSwatches();
  renderStylePresets();
  renderSlidesArea();
  if (typeof refreshJsonPreview === "function") refreshJsonPreview();
}

async function loadPresets() {
  const select = document.getElementById("preset-select");
  const overlay = document.getElementById("preset-empty-overlay");
  if (!select) return;
  const currentVal = select.value;
  select.innerHTML = '<option value="">Muat preset...</option>';
  if (!getCurrentUser()) return;
  try {
    const data = await api("/api/presets");
    const presets = data.presets || [];
    for (const p of presets) {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      select.appendChild(opt);
    }
    if (currentVal) { select.value = currentVal; }
    else { select.value = ""; }
    if (overlay) {
      overlay.classList.toggle("hidden", presets.length > 0);
    }
  } catch {}
  select._enhancedRefresh?.();
}

function showPrompt(msg, placeholder) {
  return new Promise((resolve) => {
    const modal = document.getElementById("preset-name-modal");
    const input = document.getElementById("preset-name-input");
    document.getElementById("preset-name-msg").textContent = msg;
    input.value = "";
    input.placeholder = placeholder || "";
    modal.classList.remove("hidden");
    lockScroll();
    setTimeout(() => input.focus(), 100);
    const cleanup = () => { modal.classList.add("hidden"); unlockScroll(); };
    const ok = () => { cleanup(); resolve(input.value.trim()); };
    document.getElementById("preset-name-ok").onclick = ok;
    document.getElementById("preset-name-cancel").onclick = () => { cleanup(); resolve(null); };
    input.onkeydown = (e) => { if (e.key === "Enter") ok(); if (e.key === "Escape") { cleanup(); resolve(null); } };
    modal.onclick = (e) => { if (e.target === modal) { cleanup(); resolve(null); } };
  });
}

async function savePreset() {
  if (!getCurrentUser()) { showToast("Login untuk menyimpan preset", "error"); return; }
  const name = await showPrompt("Nama preset:", "cth: Kesehatan Mental");
  if (!name) return;
  try {
    const data = collectPresetData();
    await api("/api/presets", {
      method: "POST",
      body: JSON.stringify({ name, data }),
    });
    showToast("Preset disimpan", "success");
    loadPresets();
  } catch (err) { showToast(err.message, "error"); }
}

async function deletePreset() {
  const select = document.getElementById("preset-select");
  const id = select?.value;
  if (!id) return;
  const ok = await showConfirm("Hapus preset ini?");
  if (!ok) return;
  try {
    await api("/api/presets/" + id, { method: "DELETE" });
    showToast("Preset dihapus", "success");
    loadPresets();
  } catch (err) { showToast(err.message, "error"); }
}

async function loadSelectedPreset() {
  const select = document.getElementById("preset-select");
  const id = select?.value;
  if (!id) {
    if (select && select.options.length <= 1) {
      showAlert(
        "Belum ada Preset tersimpan saat ini, lakukan pengisian sesuai panduan lalu tekan tombol simpan untuk menyimpan preset. Beri nama Preset Anda sesuai keinginan Anda.",
        () => {
          const target = document.getElementById("empty-state");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      );
    }
    return;
  }
  try {
    const data = await api("/api/presets");
    const preset = data.presets.find(p => p.id === id);
    if (!preset) return;
    applyPresetData(preset.data);
    showToast("Preset dimuat", "success");
  } catch (err) { showToast(err.message, "error"); }
}

function showToast(message, type = "default") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  const iconMap = { success: "ti-check", error: "ti-alert-circle", default: "ti-info-circle" };
  const colorMap = { success: "var(--amber)", error: "var(--coral)", default: "var(--ink-soft)" };
  toast.className = "toast flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm";
  toast.style.background = "var(--bg-card)";
  toast.style.borderColor = "var(--border-strong)";
  toast.style.color = "var(--cream)";
  toast.innerHTML = `<i class="ti ${iconMap[type]} text-base" style="color:${colorMap[type]}"></i><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity .25s ease";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function showConfirm(msg) {
  return new Promise((resolve) => {
    const modal = document.getElementById("confirm-modal");
    document.getElementById("confirm-msg").textContent = msg;
    modal.classList.remove("hidden");
    lockScroll();
    const cleanup = () => { modal.classList.add("hidden"); unlockScroll(); };
    document.getElementById("confirm-ok").onclick = () => { cleanup(); resolve(true); };
    document.getElementById("confirm-cancel").onclick = () => { cleanup(); resolve(false); };
  });
}

function showAlert(msg, onOk) {
  const modal = document.getElementById("alert-modal");
  document.getElementById("alert-msg").textContent = msg;
  modal.classList.remove("hidden");
  lockScroll();
  const cleanup = () => { modal.classList.add("hidden"); unlockScroll(); };
  document.getElementById("alert-ok").onclick = () => { cleanup(); if (onOk) onOk(); };
  modal.onclick = (e) => { if (e.target === modal) { cleanup(); } };
}

function resetApp(silent) {
  abortGeneration();
  state.topic = "";
  state.purpose = "";
  state.audience = "";
  state.slides = [];
  state.customStyle = "";
  state.palette = "";
  state.color1 = "#1E3A5F";
  state.color2 = "#D4AF37";
  state.color3 = "#F5F5F0";
  state.brandNote = "";
  state.visualCategory = "";
  state.stylePreset = "";
  state.layout = "";
  state.aspectRatio = "";
  state.customRatioW = "";
  state.customRatioH = "";
  state.slideCount = 5;
  state.jsonGenerated = false;

  document.getElementById("inp-topic").value = "";
  autoExpand(document.getElementById("inp-topic"));
  document.getElementById("inp-purpose").value = "";
  document.getElementById("inp-audience").value = "";
  document.getElementById("inp-visual-category").value = "";
  document.getElementById("inp-layout").value = "";
  document.getElementById("inp-count").value = "";
  document.getElementById("inp-ratio").value = "";
  document.getElementById("inp-customstyle").value = "";
  autoExpand(document.getElementById("inp-customstyle"));
  updateColorSwatches();
  document.getElementById("inp-palette").value = "";
  document.getElementById("inp-brand").value = "";
  autoExpand(document.getElementById("inp-brand"));
  document.getElementById("custom-ratio-fields").classList.add("hidden");
  document.getElementById("json-panel").classList.add("hidden");

  updateRatioIcon();
  renderStylePresets();
  renderSlidesArea();
  const nicheEl = document.getElementById("inp-evergreen-niche");
  if (nicheEl) nicheEl.value = "";
  const subEl = document.getElementById("inp-subniche");
  if (subEl) {
    subEl.innerHTML = '<option value="">Pilih Subniche</option>';
    subEl.value = "";
  }
  const presetEl = document.getElementById("preset-select");
  if (presetEl) presetEl.value = "";
  // Refresh all enhanced selects
  document.querySelectorAll("[data-enhanced]").forEach(el => el._enhancedRefresh?.());
  if (!silent) showToast("Semua input & slide direset", "default");
}

function abortGeneration() {
  state._aborted = true;
  if (state._abortController) {
    try { state._abortController.abort(); } catch {}
    state._abortController = null;
  }
}

// ---------- AI (via backend) ----------

async function fetchFreeModels() {
  try {
    const data = await api("/api/ai/models");
    state.allModels = data.models;
    state.activeModels = data.activeModels;
    state.customModels = data.models.filter((m) => m.custom).map((m) => m.id);
    const select = document.getElementById("inp-model");
    const active = data.models.filter((m) => data.activeModels.includes(m.id));
    select.innerHTML = active.length
      ? active.map((m) => `<option value="${m.id}" ${m.id === state.openCodeModel ? "selected" : ""}>${m.name || m.id}</option>`).join("")
      : `<option value="">Tidak ada model aktif</option>`;
    if (!state.openCodeModel || !data.activeModels.includes(state.openCodeModel)) {
      state.openCodeModel = active.length ? active[0].id : "";
      select.value = state.openCodeModel;
    }
    select._enhancedRefresh?.();
    renderAIModelList();
  } catch { showToast("Gagal memuat daftar model", "error"); }
}

async function loadPrompts() {
  try {
    const data = await api("/api/ai/prompts");
    state.prompts = data.prompts;
    state.negativePrompt = data.prompts.negative_prompt;
  } catch { state.prompts = { ...DEFAULT_PROMPTS }; }
}

async function loadCategoryImages() {
  try {
    const data = await api("/api/category-images");
    state.categoryImages = data.images || {};
  } catch { state.categoryImages = {}; }
}

async function loadCustomCategories() {
  try {
    const data = await api("/api/custom-categories");
    if (data.categories) {
      Object.entries(data.categories).forEach(([catName, styles]) => {
        VISUAL_CATEGORIES[catName] = styles;
      });
    }
  } catch (e) { console.warn('Gagal memuat kategori kustom:', e); }
}

function openImageModal() {
  document.getElementById("img-modal").classList.remove("hidden");
  document.getElementById("img-modal").scrollTop = 0;
  document.body.style.overflow = "hidden";
  renderCategoryImageManager();
}

function closeImageModal() {
  document.getElementById("img-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

// ── Niche & Subniche Manager ──

function openNicheModal() {
  document.getElementById("niche-modal").classList.remove("hidden");
  document.getElementById("niche-modal").scrollTop = 0;
  document.body.style.overflow = "hidden";
  renderNicheManager();
}

function closeNicheModal() {
  document.getElementById("niche-modal").classList.add("hidden");
  document.body.style.overflow = "";
}

function renderNicheManager() {
  const list = document.getElementById("niche-list");
  const keys = Object.keys(NICHE_MAP);
  list.innerHTML = keys.map(name => {
    const cfg = NICHE_MAP[name] || {};
    const subs = (SUBNICHE_MAP[name] || []).join("\n");
    const en = s => escapeHtml(String(s));
    return `
      <div class="rounded-lg p-3" style="background:var(--bg-canvas)">
        <div class="flex items-center justify-between mb-2 gap-2">
          <input class="input-field flex-1 rounded px-2 py-1.5 text-xs" value="${en(name)}" placeholder="Nama niche" data-field="name">
          <button data-del-niche="${name}" class="text-xs hover:text-[var(--coral)]" style="color:var(--ink-faint);flex-shrink:0"><i class="ti ti-trash"></i></button>
        </div>
        <div class="flex gap-2 mb-2">
          <input class="input-field flex-1 rounded px-2 py-1.5 text-xs" value="${en(cfg.purpose)}" placeholder="Purpose (edukasi/promosi/inspirasi)" data-field="purpose">
          <input class="input-field flex-1 rounded px-2 py-1.5 text-xs" value="${en(cfg.audience)}" placeholder="Audience" data-field="audience">
        </div>
        <textarea class="input-field w-full rounded px-2 py-1.5 text-xs resize-y" rows="3" placeholder="Subniche (1 per baris)" data-field="subniches" style="min-height:56px">${subs}</textarea>
      </div>
    `;
  }).join("");
}

async function saveNicheChanges() {
  const cards = document.querySelectorAll("#niche-list > div");
  const newNicheMap = {};
  const newSubnicheMap = {};
  for (const card of cards) {
    const name = (card.querySelector('[data-field="name"]').value || "").trim();
    if (!name) continue;
    newNicheMap[name] = {
      purpose: (card.querySelector('[data-field="purpose"]').value || "").trim(),
      audience: (card.querySelector('[data-field="audience"]').value || "").trim(),
    };
    newSubnicheMap[name] = card.querySelector('[data-field="subniches"]').value.split("\n").map(s => s.trim()).filter(Boolean);
  }
  try {
    await api("/api/data/niches", { method: "PUT", body: JSON.stringify(newNicheMap) });
    await api("/api/data/subniches", { method: "PUT", body: JSON.stringify(newSubnicheMap) });
    NICHE_MAP = newNicheMap;
    SUBNICHE_MAP = newSubnicheMap;
    showToast("Niche & subniche berhasil disimpan", "success");
    closeNicheModal();
    populateNicheDropdown();
    const el = document.getElementById("inp-evergreen-niche");
    const sub = document.getElementById("inp-subniche");
    const items = SUBNICHE_MAP[el.value] || [];
    sub.innerHTML = '<option value="">Pilih Subniche</option>' + items.map(i => `<option value="${i}">${i}</option>`).join("");
    sub.value = "";
    sub._enhancedRefresh?.();
  } catch (err) {
    showToast("Gagal menyimpan: " + err.message, "error");
  }
}

function renderCategoryImageManager() {
  const list = document.getElementById("category-image-list");
  const cats = Object.keys(VISUAL_CATEGORIES);

  list.innerHTML = `
    <div class="flex gap-2 mb-2">
      <button id="btn-add-cat" class="btn-ghost text-[10px] rounded-md px-2 py-1 flex items-center gap-1" style="flex-shrink:0">
        <i class="ti ti-plus text-xs"></i> Tambah Kategori
      </button>
    </div>
    ${cats.map((cat) => {
    const styles = VISUAL_CATEGORIES[cat];
    return `
      <div class="rounded-lg p-3" style="background:var(--bg-canvas)">
        <div class="flex items-center justify-between mb-2">
          <div class="text-xs font-medium" style="color:var(--cream)">${cat}</div>
          <div class="flex gap-1">
            <button data-add-style="${cat}" class="btn-ghost text-[10px] rounded-md px-1.5 py-0.5 flex items-center gap-0.5" title="Tambah sub-kategori">
              <i class="ti ti-plus text-xs"></i>
            </button>
            <button data-del-cat="${cat}" class="text-xs hover:text-[var(--coral)]" style="color:var(--ink-faint)" title="Hapus kategori"><i class="ti ti-trash"></i></button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          ${styles.map((s) => {
      const img = state.categoryImages[s.id] || "";
      return `
            <div class="flex items-center gap-3 rounded-lg px-3 py-2" style="background:var(--bg-card)">
              <div class="flex-1 min-w-0">
                <div class="text-xs" style="color:var(--cream)">${s.label}</div>
                <div class="text-[10px]" style="color:var(--ink-faint)">${s.id}</div>
              </div>
              ${img ? `<img src="${img}" class="cat-img-thumb">` : `<span class="text-[10px]" style="color:var(--ink-faint)">Tidak ada gambar</span>`}
              <label class="btn-ghost text-[10px] rounded-md px-2 py-1 cursor-pointer" style="flex-shrink:0">
                ${img ? "Ganti" : "Upload"}
                <input type="file" accept="image/*" data-upload-img="${s.id}" class="hidden">
              </label>
              ${img ? `<button data-del-img="${s.id}" class="text-xs hover:text-[var(--coral)]" style="color:var(--ink-faint)" title="Hapus gambar"><i class="ti ti-photo-off"></i></button>` : ""}
              <button data-del-style="${cat}|${s.id}" class="text-xs hover:text-[var(--coral)]" style="color:var(--ink-faint)" title="Hapus sub-kategori"><i class="ti ti-trash"></i></button>
            </div>`;
    }).join("")}
        </div>
      </div>`;
  }).join("")}
  `;

  // Upload handler
  list.querySelectorAll("[data-upload-img]").forEach((inp) => {
    inp.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const styleId = e.target.getAttribute("data-upload-img");
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const imageData = ev.target.result;
        try {
          await api(`/api/category-images/${styleId}`, { method: "PUT", body: JSON.stringify({ imageData }) });
          state.categoryImages[styleId] = imageData;
          renderCategoryImageManager();
          renderStylePresets();
          showToast(`Gambar untuk ${styleId} disimpan`, "success");
        } catch (err) {
          showToast("Gagal upload: " + (err.message || ""), "error");
        }
      };
      reader.readAsDataURL(file);
    });
  });

  // Delete image handler
  list.querySelectorAll("[data-del-img]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const styleId = e.currentTarget.getAttribute("data-del-img");
      try {
        await api(`/api/category-images/${styleId}`, { method: "DELETE" });
        delete state.categoryImages[styleId];
        renderCategoryImageManager();
        renderStylePresets();
        showToast(`Gambar ${styleId} dihapus`, "success");
      } catch (err) {
        showToast("Gagal hapus: " + (err.message || ""), "error");
      }
    });
  });

  // Delete style handler
  list.querySelectorAll("[data-del-style]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const val = e.currentTarget.getAttribute("data-del-style");
      const [catName, styleId] = val.split("|");
      const ok = await showConfirm(`Hapus sub-kategori "${styleId}" dari "${catName}"?`);
      if (!ok) return;
      try {
        await api(`/api/custom-categories/${encodeURIComponent(catName)}/styles/${encodeURIComponent(styleId)}`, { method: "DELETE" });
        // If built-in, remove locally without API (just reset on reload)
        if (!BUILT_IN_CATEGORIES.includes(catName)) {
          VISUAL_CATEGORIES[catName] = VISUAL_CATEGORIES[catName].filter((s) => s.id !== styleId);
        } else {
          // For built-in, just delete the image
          delete state.categoryImages[styleId];
        }
        renderCategoryImageManager();
        renderStylePresets();
        showToast(`Sub-kategori ${styleId} dihapus`, "success");
      } catch (err) {
        showToast("Gagal hapus: " + (err.message || ""), "error");
      }
    });
  });

  // Delete category handler
  list.querySelectorAll("[data-del-cat]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const catName = e.currentTarget.getAttribute("data-del-cat");
      const ok = await showConfirm(`Hapus seluruh kategori "${catName}" beserta sub-kategori dan gambarnya?`);
      if (!ok) return;
      const isBuiltIn = BUILT_IN_CATEGORIES.includes(catName);
      try {
        if (isBuiltIn) {
          const updated = { ...VISUAL_CATEGORIES };
          delete updated[catName];
          await api("/api/data/visual-categories", { method: "PUT", body: JSON.stringify({ categories: updated }) });
        } else {
          await api(`/api/custom-categories/${encodeURIComponent(catName)}`, { method: "DELETE" });
        }
        delete VISUAL_CATEGORIES[catName];
        renderCategoryImageManager();
        renderStylePresets();
        populateVisualCategory();
        showToast(`Kategori "${catName}" dihapus`, "success");
      } catch (err) {
        showToast("Gagal hapus: " + (err.message || ""), "error");
      }
    });
  });

  // Add category handler
  const addCatBtn = document.getElementById("btn-add-cat");
  if (addCatBtn) {
    // Remove old listener by cloning
    const newBtn = addCatBtn.cloneNode(true);
    addCatBtn.parentNode.replaceChild(newBtn, addCatBtn);
    newBtn.addEventListener("click", async () => {
      const name = prompt("Nama kategori baru:");
      if (!name || !name.trim()) return;
      const trimmed = name.trim();
      if (VISUAL_CATEGORIES[trimmed]) {
        showToast("Kategori sudah ada", "error");
        return;
      }
      try {
        await api("/api/custom-categories", { method: "POST", body: JSON.stringify({ name: trimmed }) });
        VISUAL_CATEGORIES[trimmed] = [];
        renderCategoryImageManager();
        populateVisualCategory();
        showToast(`Kategori "${trimmed}" ditambahkan`, "success");
      } catch (err) {
        showToast("Gagal: " + (err.message || ""), "error");
      }
    });
  }

  // Add style handler
  list.querySelectorAll("[data-add-style]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const catName = e.currentTarget.getAttribute("data-add-style");
      const id = prompt("ID sub-kategori (tanpa spasi, contoh: my-style):");
      if (!id || !id.trim()) return;
      const idTrimmed = id.trim();
      const label = prompt("Nama label sub-kategori (contoh: My Style):");
      if (!label || !label.trim()) return;
      const labelTrimmed = label.trim();
      const desc = prompt("Deskripsi singkat (opsional):") || "";
      const icon = "ti-star";
      const isBuiltIn = BUILT_IN_CATEGORIES.includes(catName);
      try {
        if (!isBuiltIn) {
          await api(`/api/custom-categories/${encodeURIComponent(catName)}/styles`, {
            method: "POST",
            body: JSON.stringify({ id: idTrimmed, label: labelTrimmed, desc, icon }),
          });
        }
        VISUAL_CATEGORIES[catName].push({ id: idTrimmed, label: labelTrimmed, desc, icon, tags: [] });
        renderCategoryImageManager();
        renderStylePresets();
        showToast(`Sub-kategori "${labelTrimmed}" ditambahkan`, "success");
      } catch (err) {
        showToast("Gagal: " + (err.message || ""), "error");
      }
    });
  });
}

function getActiveModels() {
  return state.activeModels.filter((id) => state.allModels.some((m) => m.id === id));
}

function renderAIModelList() {
  const list = document.getElementById("ai-model-list");
  if (!list) return;
  if (!state.allModels.length) {
    list.innerHTML = `<div class="text-xs" style="color:var(--ink-faint)">Klik Refresh untuk memuat daftar model</div>`;
    return;
  }
  list.innerHTML = state.allModels.map((m) => {
    const checked = state.activeModels.includes(m.id);
    const isCustom = state.customModels.includes(m.id);
    return `<div class="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--bg-card-hover)] group" style="color:var(--ink-soft)">
      <input type="checkbox" data-toggle-model="${m.id}" ${checked ? "checked" : ""} class="rounded flex-shrink-0" style="accent-color:var(--amber)">
      ${isCustom
        ? `<input id="model-name-${m.id}" type="text" value="${m.name || m.id}" class="flex-1 text-xs px-1.5 py-0.5 rounded" style="background:#100E0A; border:1px solid var(--border-soft); color:var(--cream); min-width:0; outline:none" data-model-id="${m.id}" spellcheck="false">
           <span class="text-[10px] opacity-50 flex-shrink-0">kustom</span>`
        : `<span class="flex-1 text-xs">${m.name || m.id}</span>`
      }
      ${`<button data-remove-model="${m.id}" class="flex-shrink-0 text-rose-400 hover:text-rose-300 text-sm p-1 opacity-60 hover:opacity-100" title="Hapus model"><i class="ti ti-trash"></i></button>`}
    </div>`;
  }).join("");
  // Rename on blur/Enter
  list.querySelectorAll("[data-model-id]").forEach((input) => {
    const origId = input.getAttribute("data-model-id");
    const save = async () => {
      const val = input.value.trim();
      if (!val || val === origId) return;
      try {
        await api(`/api/ai/custom-models/${encodeURIComponent(origId)}`, { method: "PUT", body: JSON.stringify({ id: val }) });
        input.setAttribute("data-model-id", val);
        await fetchFreeModels();
        showToast(`Model diubah menjadi "${val}"`, "success");
      } catch (err) { showToast(err.message, "error"); }
    };
    input.addEventListener("blur", save);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { input.blur(); } });
  });
}

async function callOpenCode(systemPrompt, userPrompt, signal) {
  const model = state.openCodeModel;
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${state.authToken}` },
    signal,
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Tidak ada respons teks dari AI");
  return text;
}

// ---------- AI GENERATION ----------

async function generateIdeaFromNiche() {
  if (!getCurrentUser()) { showToast("Lakukan Login untuk melanjutkan proses", "error"); return; }
  const evergreen = document.getElementById("inp-evergreen-niche").value;
  const subniche = document.getElementById("inp-subniche").value;
  const niche = evergreen + (subniche ? " - " + subniche : "");
  if (!evergreen) { document.getElementById("niche-alert-modal").classList.remove("hidden"); lockScroll(); return; }

  const keyStatus = await api("/api/ai/api-key");
  if (!keyStatus.hasKey) { showToast("API Key belum diatur. Minta Admin untuk mengatur API Key.", "error"); return; }
  if (!getActiveModels().length) { showToast("Model AI belum dipilih.", "error"); return; }

  abortGeneration();
  state._aborted = false;
  state._abortController = new AbortController();
  const signal = state._abortController.signal;

  const btn = document.getElementById("btn-generate-idea");
  const label = document.getElementById("btn-idea-label");
  btn.disabled = true;
  const originalLabel = label.innerHTML;

  const p = state.prompts || DEFAULT_PROMPTS;
  const systemPrompt = p.system_idea;
  const userPrompt = replacePromptVars(p.user_idea, { niche });

  const modelsToTry = getActiveModels();
  let lastError = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    if (state._aborted) break;
    const modelId = modelsToTry[i];
    state.openCodeModel = modelId;
    label.innerHTML = `<span class="inline-flex items-center gap-2"><section class="dots-container"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></section> Menggali ide… <span class="text-[10px] ml-1 opacity-60">Escape batal</span></span>`;

    try {
      const text = await callOpenCode(systemPrompt, userPrompt, signal);
      if (state._aborted) throw new DOMException("Aborted", "AbortError");

      let cleaned = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
      const result = JSON.parse(cleaned);
      const topic = result.topic || `Tips ${niche.toLowerCase()} untuk pemula`;

      document.getElementById("inp-topic").value = topic;
      state.topic = topic;

      renderSlidesArea();
      showToast(`Ide untuk niche "${niche}" berhasil dibuat`, "success");

      btn.disabled = false;
      label.innerHTML = originalLabel;
      state._abortController = null;
      state._aborted = false;
      return;
    } catch (err) {
      lastError = err;
      if (err.name === "AbortError" || state._aborted) break;
      if (err.message?.includes("429")) break;
      if (isAdmin() && i < modelsToTry.length - 1) showToast(`Model ${modelId} gagal, coba model lain…`, "warning");
    }
  }

  btn.disabled = false;
  label.innerHTML = originalLabel;
  state._abortController = null;
  state._aborted = false;

  if (lastError) {
    if (lastError.name === "AbortError" || state._aborted) showToast("Proses dibatalkan", "error");
    else if (lastError.message?.includes("429")) showToast("Kuota harian AI habis.", "error");
    else { console.error(lastError); showToast("Gagal generate ide. Coba lagi nanti.", "error"); }
  }
}

async function aiGenerateSlideContent() {
  if (!getCurrentUser()) { showToast("Lakukan Login untuk melanjutkan proses", "error"); return; }
  if (!state.topic.trim()) { showToast("Isi topik carousel dulu di langkah 1", "error"); return; }

  const keyStatus = await api("/api/ai/api-key");
  if (!keyStatus.hasKey) {
    showToast(isAdmin() ? "Masukkan OpenCode API Key di panel Admin" : "API Key belum diatur", "error");
    return;
  }
  if (!getActiveModels().length) {
    showToast(isAdmin() ? "Aktifkan minimal satu model AI di Admin Panel" : "Model AI belum diatur", "error");
    return;
  }

  abortGeneration();
  state._aborted = false;
  state._abortController = new AbortController();
  const signal = state._abortController.signal;

  const btn = document.getElementById("btn-ai-generate");
  const label = document.getElementById("btn-ai-label");
  btn.disabled = true;
  const originalLabel = label.textContent;

  const p = state.prompts || DEFAULT_PROMPTS;
  const systemPrompt = p.system_slide;
  const brandNoteLine = state.brandNote.trim() ? `\nBrand/Catatan: ${state.brandNote.trim()}` : "";
  const userPrompt = replacePromptVars(p.user_slide, {
    topic: state.topic,
    purpose: state.purpose,
    audience: state.audience,
    slideCount: String(state.slideCount),
    brandNoteLine,
  });

  const modelsToTry = getActiveModels();
  let lastError = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    if (state._aborted) break;
    const modelId = modelsToTry[i];
    state.openCodeModel = modelId;
    const select = document.getElementById("inp-model");
    if (select) select.value = modelId;
    label.innerHTML = `<span class="inline-flex items-center gap-2"><section class="dots-container"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></section> AI menyusun slide… <span class="text-[10px] ml-1 opacity-60">Escape batal</span></span>`;
    setSlideListSkeleton(true);

    try {
      const text = await callOpenCode(systemPrompt, userPrompt, signal);
      if (state._aborted) throw new DOMException("Aborted", "AbortError");

      let cleaned = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Format respons tidak sesuai");

      state.slides = parsed.slice(0, state.slideCount).map((item, idx) => ({
        id: uid(),
        role: idx === 0 ? "cover" : idx === Math.min(parsed.length, state.slideCount) - 1 && parsed.length > 1 ? "penutup" : "isi",
        headline: item.headline || `Poin ${idx + 1}`,
        body: item.body || "",
        visualIdea: item.visualIdea || "",
      }));

      state.generateFailCount = 0;
      state.slideCount = state.slides.length;
      document.getElementById("inp-count").value = String(state.slideCount);
      renderSlidesArea();
      showToast("Isi slide berhasil disusun AI", "success");
      btn.disabled = false;
      label.textContent = originalLabel;
      setSlideListSkeleton(false);
      state._abortController = null;
      state._aborted = false;
      return;
    } catch (err) {
      lastError = err;
      if (err.name === "AbortError" || state._aborted) break;
      if (err.message?.includes("429")) break;
      if (isAdmin() && i < modelsToTry.length - 1) showToast(`Model ${modelId} gagal, coba model lain…`, "warning");
    }
  }

  btn.disabled = false;
  label.textContent = originalLabel;
  setSlideListSkeleton(false);
  state._abortController = null;

  if (state._aborted) { state._aborted = false; showToast("Proses dibatalkan", "error"); }
  else if (lastError?.message?.includes("429")) { state.generateFailCount++; showToast("Kuota harian AI habis.", "error"); }
  else { console.error(lastError); state.generateFailCount++; showToast(state.generateFailCount >= 3 ? "Tunggu beberapa saat, baru coba lagi." : "Gagal, silahkan coba lagi.", "error"); }
}

function setSlideListSkeleton(loading) {
  if (!loading) { renderSlidesArea(); return; }
  const list = document.getElementById("slide-list");
  const track = document.getElementById("carousel-track");
  document.getElementById("slides-area").classList.remove("hidden");
  document.getElementById("empty-state").classList.add("hidden");
  const n = state.slideCount || 5;
  list.innerHTML = Array.from({ length: n }).map(() => `
    <div class="rounded-xl border p-4" style="background:var(--bg-card); border-color:var(--border-soft)">
      <div class="shimmer h-5 w-24 rounded-full mb-3"></div>
      <div class="shimmer h-9 w-full rounded-lg mb-3"></div>
      <div class="shimmer h-9 w-full rounded-lg mb-3"></div>
      <div class="shimmer h-9 w-full rounded-lg"></div>
    </div>
  `).join("");
  track.innerHTML = Array.from({ length: n }).map(() => `
    <div class="carousel-card w-44 aspect-[4/5] rounded-xl shimmer"></div>
  `).join("");
}

// ---------- JSON OUTPUT ----------

function buildSingleSlideJson(slide, idx) {
  return {
    series_id: slugify(state.topic),
    title: state.topic,
    slide_number: idx + 1,
    role: slide.role,
    headline: slide.headline,
    body_text: slide.body || null,
    visual_idea: slide.visualIdea || null,
    aspect_ratio: getAspectRatioValue(),
    global_style: {
      preset: state.stylePreset,
      layout: state.layout || null,
      style_tags: activeStyleTags(),
      palette: getPaletteString() || "konsisten di semua slide, pilih warna yang harmonis",
      lighting: state.lightingNote,
      composition: state.compositionNote,
      brand_note: state.brandNote || null,
      consistency_instruction: "Gunakan gaya visual, palet warna, dan pencahayaan yang sama persis di semua slide agar terlihat sebagai satu rangkaian carousel yang utuh.",
    },
    prompt: composeMainPrompt(slide),
    negative_prompt: state.negativePrompt,
  };
}

function buildJsonOutput() {
  return {
    series_id: slugify(state.topic),
    title: state.topic,
    purpose: state.purpose,
    audience: state.audience,
    total_slides: state.slides.length,
    aspect_ratio: getAspectRatioValue(),
    global_style: {
      preset: state.stylePreset,
      layout: state.layout || null,
      style_tags: activeStyleTags(),
      palette: getPaletteString() || "konsisten di semua slide, pilih warna yang harmonis",
      lighting: state.lightingNote,
      composition: state.compositionNote,
      brand_note: state.brandNote || null,
      consistency_instruction: "Gunakan gaya visual, palet warna, dan pencahayaan yang sama persis di semua slide agar terlihat sebagai satu rangkaian carousel yang utuh.",
    },
    negative_prompt: state.negativePrompt,
    slides: state.slides.map((s, idx) => ({
      slide_number: idx + 1,
      role: s.role,
      headline: s.headline,
      body_text: s.body || null,
      visual_idea: s.visualIdea || null,
      prompt: composeMainPrompt(s),
      negative_prompt: state.negativePrompt,
      aspect_ratio: getAspectRatioValue(),
    })),
  };
}

function refreshJsonOutput() {
  if (!state.topic.trim()) return;
  const hasEmptyHeadline = state.slides.some((s) => !s.headline.trim());
  if (hasEmptyHeadline) return;
  const json = buildJsonOutput();
  document.getElementById("json-output").textContent = JSON.stringify(json, null, 2);
}

function selectJsonOutputText() {
  const node = document.getElementById("json-output");
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function legacyCopyFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function showCopySuccess(label) {
  label.textContent = "Tersalin";
  setTimeout(() => (label.textContent = "Salin"), 1800);
  showToast("JSON disalin ke clipboard", "success");
}

function showCopyFailed() {
  selectJsonOutputText();
  if (isIOS()) {
    showToast("Ketuk dan tahan teks yang terpilih, lalu pilih Salin", "error");
  } else {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    showToast(`Teks sudah terpilih, tekan ${isMac ? "Cmd" : "Ctrl"}+C`, "error");
  }
}

function handleCopyJson() {
  const text = document.getElementById("json-output").textContent;
  const label = document.getElementById("copy-label");

  if (!text || !text.trim()) {
    showToast("Belum ada JSON untuk disalin", "error");
    return;
  }

  // Clipboard API: panggil synchronous dari user gesture (tidak pakai async/await)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccess(label);
    }).catch(() => {
      // fallback: select text + instruksi manual
      showCopyFailed();
    });
  } else {
    // Fallback: execCommand (jarang available, iOS 16+ sudah hapus)
    if (legacyCopyFallback(text)) {
      showCopySuccess(label);
    } else {
      showCopyFailed();
    }
  }
}

function handleDownloadJson() {
  const text = document.getElementById("json-output").textContent;
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${slugify(state.topic)}-carousel-prompts.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("File JSON diunduh", "success");
}

function copySlideJson(slideId, btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="ti ti-clipboard text-sm"></i> Menyalin…';

  try {
    const slide = state.slides.find((s) => s.id === slideId);
    if (!slide) { btn.innerHTML = '<i class="ti ti-alert-circle text-sm"></i> Gagal'; setTimeout(() => renderSlideList(), 1500); return; }
    const idx = state.slides.indexOf(slide);
    const json = buildSingleSlideJson(slide, idx);
    const text = JSON.stringify(json, null, 2);

    let settled = false;
    function done(ok) {
      if (settled) return;
      settled = true;
      clearTimeout(safety);
      if (ok) {
        btn.innerHTML = '<i class="ti ti-check text-sm"></i> Tersalin';
        showToast(`JSON slide ${idx + 1} disalin`, "success");
        setTimeout(() => { btn.innerHTML = orig; }, 1800);
      } else {
        btn.innerHTML = orig;
        showCopySlideFailed(text);
      }
    }

    const safety = setTimeout(() => done(false), 3000);

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text).then(() => done(true)).catch(() => done(false));
    } else if (legacyCopyFallback(text)) {
      done(true);
    } else {
      done(false);
    }
  } catch (err) {
    btn.innerHTML = '<i class="ti ti-alert-circle text-sm"></i> Gagal';
    setTimeout(() => renderSlideList(), 2000);
    showToast("Gagal menyalin: " + (err.message || ""), "error");
  }
}

function showCopySlideFailed(text) {
  if (isIOS()) {
    // Tampilkan textarea visible di bawah tombol agar user bisa long-press
    const wrapper = document.createElement("div");
    wrapper.id = "slide-copy-fallback";
    wrapper.style.cssText = "position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:20px";
    wrapper.addEventListener("click", (e) => { if (e.target === wrapper) wrapper.remove(); });
    const box = document.createElement("div");
    box.style.cssText = "background:#1C1A14;border:1px solid #4A4533;border-radius:12px;padding:16px;width:100%;max-width:500px;max-height:80vh;display:flex;flex-direction:column";
    box.innerHTML = '<p style="color:#E8A33D;font-size:13px;margin-bottom:10px">⚠️ Salin otomatis gagal. Salin manual:</p>';
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.readOnly = true;
    ta.style.cssText = "background:#100E0A;color:#D8CFA8;border:1px solid #4A4533;border-radius:8px;padding:12px;font:12px monospace;width:100%;min-height:120px;resize:vertical;outline:none;flex:1";
    box.appendChild(ta);
    const btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:8px;margin-top:10px;justify-content:flex-end";
    btnRow.innerHTML = '<button class="btn-ghost" style="padding:6px 14px;font-size:12px;border-radius:8px">Tutup</button>';
    btnRow.querySelector("button").addEventListener("click", () => wrapper.remove());
    box.appendChild(btnRow);
    wrapper.appendChild(box);
    document.body.appendChild(wrapper);
    setTimeout(() => { ta.focus(); ta.select(); ta.setSelectionRange(0, text.length); }, 100);
    showToast("Ketuk & tahan teks, lalu pilih Salin", "error");
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    textarea.readOnly = true;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    showToast(`Gagal salin otomatis. Tekan ${isMac ? "Cmd" : "Ctrl"}+C`, "error");
    setTimeout(() => document.body.removeChild(textarea), 5000);
  }
}

function autoExpand(el) {
  if (!el || el.tagName !== "TEXTAREA") return;
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

// ---------- INIT / BIND ----------

function bindInputs() {
  document.getElementById("inp-topic").addEventListener("input", (e) => {
    state.topic = e.target.value;
    const hadSlides = state.slides.length > 0;
    if (!hadSlides && state.topic.trim()) {
      state.slides = buildDefaultSlides(state.slideCount);
    }
    if (state.slides[0] && state.slides[0].role === "cover") {
      state.slides[0].headline = state.topic || "Judul carousel";
    }
    if (hadSlides) {
      renderCarouselTrack();
    } else {
      renderSlidesArea();
    }
  });

  document.getElementById("inp-purpose").addEventListener("change", (e) => { state.purpose = e.target.value; });
  document.getElementById("inp-audience").addEventListener("change", (e) => { state.audience = e.target.value; });

  document.getElementById("inp-count").addEventListener("change", (e) => {
    const n = Math.max(1, Math.min(15, Number(e.target.value) || 1));
    state.slideCount = n;
    if (state.slides.length > 0) {
      reconcileSlideCount(n);
      renderSlidesArea();
    }
  });

  document.getElementById("inp-ratio").addEventListener("change", (e) => {
    state.aspectRatio = e.target.value;
    const customFields = document.getElementById("custom-ratio-fields");
    customFields.classList.toggle("hidden", e.target.value !== "custom");
    if (e.target.value !== "custom") {
      state.customRatioW = "";
      state.customRatioH = "";
    }
    updateRatioIcon();
    renderCarouselTrack();
  });

  document.getElementById("inp-ratio-w").addEventListener("input", (e) => {
    state.customRatioW = e.target.value;
    renderCarouselTrack();
  });

  document.getElementById("inp-ratio-h").addEventListener("input", (e) => {
    state.customRatioH = e.target.value;
    renderCarouselTrack();
  });

  document.getElementById("inp-customstyle").addEventListener("input", (e) => { state.customStyle = e.target.value; refreshJsonOutput(); });
  document.getElementById("inp-color-1").addEventListener("click", () => openColorPicker("color1"));
  document.getElementById("inp-color-2").addEventListener("click", () => openColorPicker("color2"));
  document.getElementById("inp-color-3").addEventListener("click", () => openColorPicker("color3"));
  document.getElementById("inp-palette").addEventListener("input", (e) => { state.palette = e.target.value; refreshJsonOutput(); });
  document.getElementById("inp-brand").addEventListener("input", (e) => { state.brandNote = e.target.value; refreshJsonOutput(); });

  // ── Color Picker Modal ──
  const canvas = document.getElementById("color-canvas");
  if (canvas) {
    let picking = false;
    function onColorMove(e) { if (picking) handleColorEvent(e); }
    canvas.addEventListener("mousedown", (e) => { picking = true; handleColorEvent(e); });
    canvas.addEventListener("mousemove", onColorMove);
    document.addEventListener("mouseup", () => { picking = false; });
    canvas.addEventListener("touchstart", (e) => { picking = true; handleColorEvent(e); }, { passive: false });
    canvas.addEventListener("touchmove", (e) => { if (picking) handleColorEvent(e); }, { passive: false });
    canvas.addEventListener("touchend", () => { picking = false; });
  }

  let _hueRaf = null;
  document.getElementById("color-hue").addEventListener("input", (e) => {
    _cpH = Number(e.target.value);
    _cpCache = null;
    if (_hueRaf) cancelAnimationFrame(_hueRaf);
    _hueRaf = requestAnimationFrame(() => {
      _hueRaf = null;
      drawColorField();
      const hex = hsvToHex(_cpH, _cpS, _cpV);
      document.getElementById("color-preview").style.background = hex;
      document.getElementById("color-hex").value = hex.slice(1);
    });
  });

  document.getElementById("color-hex").addEventListener("input", (e) => {
    const val = "#" + e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
    if (val.length === 7) {
      document.getElementById("color-preview").style.background = val;
      const hsv = hexToHsv(val);
      _cpH = hsv.h; _cpS = hsv.s; _cpV = hsv.v;
      document.getElementById("color-hue").value = _cpH;
      _cpCache = null;
      drawColorField();
    }
  });
  document.getElementById("color-hex").addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyColor();
  });

  document.getElementById("btn-apply-color").addEventListener("click", applyColor);
  document.getElementById("btn-close-color").addEventListener("click", () => {
    document.getElementById("color-modal").classList.add("hidden");
    unlockScroll();
    _cpTarget = null;
  });
  document.getElementById("color-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById("color-modal").classList.add("hidden");
      unlockScroll();
      _cpTarget = null;
    }
  });
  document.getElementById("color-presets").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-color]");
    if (chip) {
      const c = chip.getAttribute("data-color");
      document.getElementById("color-preview").style.background = c;
      document.getElementById("color-hex").value = c.slice(1);
      const hsv = hexToHsv(c);
      _cpH = hsv.h; _cpS = hsv.s; _cpV = hsv.v;
      document.getElementById("color-hue").value = _cpH;
      _cpCache = null;
      drawColorField();
    }
  });

  function populateSubniche() {
    const el = document.getElementById("inp-evergreen-niche");
    const sub = document.getElementById("inp-subniche");
    const items = SUBNICHE_MAP[el.value] || [];
    sub.innerHTML = '<option value="">Pilih Subniche</option>' + items.map(i => `<option value="${i}">${i}</option>`).join("");
    sub.value = "";
    sub._enhancedRefresh?.();
  }
  function updateNicheGenerateBtn() {
    document.getElementById("btn-generate-idea").disabled = false;
  }

  document.getElementById("inp-evergreen-niche").addEventListener("change", () => {
    populateSubniche();
    updateNicheGenerateBtn();
  });

  document.getElementById("inp-visual-category").addEventListener("change", (e) => {
    state.visualCategory = e.target.value;
    state.stylePreset = "";
    renderStylePresets();
    refreshJsonOutput();
  });
  document.getElementById("inp-layout").addEventListener("change", (e) => {
    state.layout = e.target.value;
    refreshJsonOutput();
  });

  document.getElementById("btn-generate-idea").addEventListener("click", generateIdeaFromNiche);
  updateNicheGenerateBtn();

  document.getElementById("inp-model").addEventListener("change", (e) => {
    state.openCodeModel = e.target.value;
  });

  document.getElementById("btn-refresh-models").addEventListener("click", fetchFreeModels);

  document.getElementById("btn-ai-generate").addEventListener("click", aiGenerateSlideContent);

  document.getElementById("btn-reset").addEventListener("click", resetApp);

  document.getElementById("btn-add-slide").addEventListener("click", () => {
    state.slides.push({ id: uid(), role: "isi", headline: "Poin baru", body: "", visualIdea: "" });
    state.slides.forEach((s, idx) => {
      if (idx === 0) s.role = "cover";
      else if (idx === state.slides.length - 1 && state.slides.length > 1) s.role = "penutup";
      else s.role = "isi";
    });
    state.slideCount = state.slides.length;
    document.getElementById("inp-count").value = String(state.slideCount);
    renderSlidesArea();
  });

  document.getElementById("btn-copy-json").addEventListener("click", handleCopyJson);
  document.getElementById("btn-download-json").addEventListener("click", handleDownloadJson);
  document.getElementById("json-output").addEventListener("click", () => {
    selectJsonOutputText();
  });

  // USER MANAGEMENT
  document.getElementById("btn-user-menu").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("user-dropdown").classList.toggle("hidden");
  });
  document.addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
  });
  document.getElementById("btn-switch-user").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    showLoginModal();
  });
  document.getElementById("btn-login-dropdown").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    showLoginModal();
  });
  document.getElementById("btn-logout").addEventListener("click", async () => {
    const ok = await showConfirm("Yakin ingin logout?");
    if (!ok) return;
    resetApp(true);
    clearToken();
    state.currentUser = null;
    state.openCodeApiKey = "";
    renderUserMenu();
    applyRoleVisibility();
    document.getElementById("user-dropdown").classList.add("hidden");
    showLoginModal();
  });
  document.getElementById("btn-change-password").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    document.getElementById("inp-password-current").value = "";
    document.getElementById("inp-password-new").value = "";
    document.getElementById("inp-password-confirm").value = "";
    document.getElementById("password-modal").classList.remove("hidden");
    lockScroll();
    document.getElementById("inp-password-current").focus();
  });
  document.getElementById("btn-close-password").addEventListener("click", () => {
    document.getElementById("password-modal").classList.add("hidden");
    unlockScroll();
  });
  document.getElementById("password-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) { document.getElementById("password-modal").classList.add("hidden"); unlockScroll(); }
  });
  document.getElementById("btn-close-niche-alert").addEventListener("click", () => {
    document.getElementById("niche-alert-modal").classList.add("hidden");
    unlockScroll();
  });
  document.getElementById("niche-alert-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) { document.getElementById("niche-alert-modal").classList.add("hidden"); unlockScroll(); }
  });
  document.getElementById("btn-save-password").addEventListener("click", async () => {
    if (!getCurrentUser()) { showToast("Silakan login terlebih dahulu", "error"); return; }
    const current = document.getElementById("inp-password-current").value;
    const newPass = document.getElementById("inp-password-new").value;
    const confirm = document.getElementById("inp-password-confirm").value;
    if (!current) { showToast("Isi password saat ini", "error"); return; }
    if (!newPass) { showToast("Isi password baru", "error"); document.getElementById("inp-password-new").focus(); return; }
    if (newPass !== confirm) { showToast("Konfirmasi password tidak cocok", "error"); document.getElementById("inp-password-confirm").value = ""; document.getElementById("inp-password-confirm").focus(); return; }
    try {
      await api("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword: current, newPassword: newPass }),
      });
      document.getElementById("password-modal").classList.add("hidden");
      unlockScroll();
      showToast("Password berhasil diubah", "success");
    } catch (err) { showToast(err.message, "error"); }
  });
  document.getElementById("inp-password-confirm").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btn-save-password").click();
  });

  document.getElementById("btn-admin-panel").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    document.getElementById("admin-modal").classList.remove("hidden");
    lockScroll();
    renderUserList();
  });
  document.getElementById("btn-close-admin").addEventListener("click", () => {
    document.getElementById("admin-modal").classList.add("hidden");
    unlockScroll();
  });

  document.getElementById("btn-category-images").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    openImageModal();
  });
  document.getElementById("btn-close-img").addEventListener("click", closeImageModal);

  // -- Guide Modal --
  document.getElementById("btn-guide").addEventListener("click", openGuideModal);
  document.getElementById("btn-close-guide").addEventListener("click", closeGuideModal);
  document.getElementById("guide-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeGuideModal();
  });
  document.getElementById("btn-add-guide-step").addEventListener("click", () => {
    const guide = window._guideData || [];
    guide.push({ title: "Langkah baru", description: "" });
    window._guideData = guide;
    renderGuideEditor(guide);
  });
  document.getElementById("guide-list").addEventListener("click", (e) => {
    const guide = window._guideData || [];
    const delBtn = e.target.closest(".guide-del-btn");
    if (delBtn) {
      const idx = parseInt(delBtn.dataset.idx);
      guide.splice(idx, 1);
      window._guideData = guide;
      renderGuideEditor(guide);
      return;
    }
    const moveBtn = e.target.closest(".guide-move-btn");
    if (moveBtn) {
      const idx = parseInt(moveBtn.dataset.idx);
      const dir = moveBtn.dataset.dir;
      const targetIdx = dir === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= guide.length) return;
      [guide[idx], guide[targetIdx]] = [guide[targetIdx], guide[idx]];
      window._guideData = guide;
      renderGuideEditor(guide);
    }
  });
  document.getElementById("guide-list").addEventListener("input", (e) => {
    const target = e.target;
    const guide = window._guideData || [];
    const idx = parseInt(target.dataset.idx);
    if (isNaN(idx) || !guide[idx]) return;
    if (target.classList.contains("guide-title")) {
      guide[idx].title = target.value;
    } else if (target.classList.contains("guide-desc")) {
      guide[idx].description = target.value;
      target.style.height = "auto";
      target.style.height = target.scrollHeight + "px";
    }
  });
  document.getElementById("btn-save-guide").addEventListener("click", async () => {
    const guide = window._guideData || [];
    if (guide.length === 0) { showToast("Minimal 1 langkah", "error"); return; }
    try {
      await api("/api/guide", { method: "PUT", body: JSON.stringify({ guide }) });
      showToast("Panduan berhasil disimpan", "success");
      closeGuideModal();
      renderEmptyState();
    } catch (err) { showToast(err.message, "error"); }
  });
  document.getElementById("btn-reset-guide").addEventListener("click", async () => {
    const ok = await showConfirm("Reset panduan ke default?");
    if (!ok) return;
    try {
      const data = await api("/api/guide/reset", { method: "POST" });
      window._guideData = data.guide;
      renderGuideEditor(data.guide);
      showToast("Panduan direset ke default", "success");
    } catch (err) { showToast(err.message, "error"); }
  });
  // -- Niche & Subniche --
  document.getElementById("btn-niche-management").addEventListener("click", () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    openNicheModal();
  });
  document.getElementById("btn-close-niche").addEventListener("click", closeNicheModal);
  document.getElementById("niche-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeNicheModal();
  });
  document.getElementById("btn-add-niche").addEventListener("click", () => {
    const inp = document.getElementById("inp-new-niche");
    const name = inp.value.trim();
    if (!name) { showToast("Masukkan nama niche", "error"); return; }
    if (NICHE_MAP[name]) { showToast("Niche sudah ada", "error"); return; }
    NICHE_MAP[name] = { purpose: "", audience: "" };
    SUBNICHE_MAP[name] = [];
    inp.value = "";
    renderNicheManager();
  });
  document.getElementById("niche-list").addEventListener("click", (e) => {
    const delBtn = e.target.closest("[data-del-niche]");
    if (!delBtn) return;
    const name = delBtn.dataset.delNiche;
    delete NICHE_MAP[name];
    delete SUBNICHE_MAP[name];
    renderNicheManager();
  });
  document.getElementById("btn-save-niches").addEventListener("click", saveNicheChanges);
  // -- Settings --
  document.getElementById("btn-settings").addEventListener("click", openSettingsModal);
  document.getElementById("btn-close-settings").addEventListener("click", closeSettingsModal);
  document.getElementById("settings-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeSettingsModal();
  });
  document.getElementById("btn-theme-dark").addEventListener("click", () => {
    applyTheme("dark");
    saveSettings({ theme: "dark" });
  });
  document.getElementById("btn-theme-light").addEventListener("click", () => {
    applyTheme("light");
    saveSettings({ theme: "light" });
  });

  // -- Presets --
  document.getElementById("btn-save-preset").addEventListener("click", savePreset);
  document.getElementById("btn-delete-preset").addEventListener("click", deletePreset);
  document.getElementById("preset-select").addEventListener("change", loadSelectedPreset);
  document.getElementById("preset-empty-overlay").addEventListener("click", () => {
    showAlert(
      "Belum ada Preset tersimpan saat ini, lakukan pengisian sesuai panduan lalu tekan tombol simpan untuk menyimpan preset. Beri nama Preset Anda sesuai keinginan Anda.",
      () => {
        const target = document.getElementById("empty-state");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    );
  });

  document.getElementById("img-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeImageModal();
  });
  document.getElementById("admin-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) { document.getElementById("admin-modal").classList.add("hidden"); unlockScroll(); }
  });
  // -- Prompt AI Modal --
  async function openPromptModal() {
    document.getElementById("user-dropdown").classList.add("hidden");
    document.getElementById("prompt-modal").classList.remove("hidden");
    lockScroll();
    try {
      const data = await api("/api/ai/prompts");
      const p = data.prompts;
      document.getElementById("prompt-system-idea").value = p.system_idea;
      document.getElementById("prompt-user-idea").value = p.user_idea;
      document.getElementById("prompt-system-slide").value = p.system_slide;
      document.getElementById("prompt-user-slide").value = p.user_slide;
      document.getElementById("prompt-negative").value = p.negative_prompt;
      ["prompt-system-idea","prompt-user-idea","prompt-system-slide","prompt-user-slide","prompt-negative"].forEach(id => autoExpand(document.getElementById(id)));
    } catch (err) { showToast("Gagal memuat prompts", "error"); }
  }
  document.getElementById("btn-prompt-ai").addEventListener("click", openPromptModal);
  document.getElementById("btn-close-prompt").addEventListener("click", () => {
    document.getElementById("prompt-modal").classList.add("hidden");
    unlockScroll();
  });
  document.getElementById("prompt-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) { document.getElementById("prompt-modal").classList.add("hidden"); unlockScroll(); }
  });
  document.getElementById("btn-save-prompts").addEventListener("click", async () => {
    const ok = await showConfirm("Simpan perubahan prompt?");
    if (!ok) return;
    const prompts = {
      system_idea: document.getElementById("prompt-system-idea").value.trim(),
      user_idea: document.getElementById("prompt-user-idea").value.trim(),
      system_slide: document.getElementById("prompt-system-slide").value.trim(),
      user_slide: document.getElementById("prompt-user-slide").value.trim(),
      negative_prompt: document.getElementById("prompt-negative").value.trim(),
    };
    try {
      await api("/api/ai/prompts", { method: "PUT", body: JSON.stringify({ prompts }) });
      state.prompts = prompts;
      state.negativePrompt = prompts.negative_prompt;
      showToast("Prompt berhasil disimpan", "success");
      document.getElementById("prompt-modal").classList.add("hidden");
      unlockScroll();
    } catch (err) { showToast(err.message, "error"); }
  });
  document.getElementById("btn-reset-prompts").addEventListener("click", async () => {
    const ok = await showConfirm("Reset semua prompt ke default?");
    if (!ok) return;
    const prompts = { ...DEFAULT_PROMPTS };
    document.getElementById("prompt-system-idea").value = prompts.system_idea;
    document.getElementById("prompt-user-idea").value = prompts.user_idea;
    document.getElementById("prompt-system-slide").value = prompts.system_slide;
    document.getElementById("prompt-user-slide").value = prompts.user_slide;
    document.getElementById("prompt-negative").value = prompts.negative_prompt;
    ["prompt-system-idea","prompt-user-idea","prompt-system-slide","prompt-user-slide","prompt-negative"].forEach(id => autoExpand(document.getElementById(id)));
    try {
      await api("/api/ai/prompts", { method: "PUT", body: JSON.stringify({ prompts }) });
      state.prompts = prompts;
      state.negativePrompt = prompts.negative_prompt;
      showToast("Prompt direset ke default", "success");
    } catch (err) { showToast(err.message, "error"); }
  });
  // -- AI Modal --
  document.getElementById("btn-ai-panel").addEventListener("click", async () => {
    document.getElementById("user-dropdown").classList.add("hidden");
    document.getElementById("inp-ai-api-key").value = "";
    document.getElementById("btn-delete-api-key").classList.add("hidden");
    document.getElementById("ai-key-status").textContent = "";
    document.getElementById("ai-modal").classList.remove("hidden");
    lockScroll();
    renderAIModelList();
    try {
      const keyStatus = await api("/api/ai/api-key");
      if (keyStatus.hasKey) {
        document.getElementById("ai-key-status").textContent = "✓ API Key tersimpan";
        document.getElementById("btn-delete-api-key").classList.remove("hidden");
      } else {
        document.getElementById("ai-key-status").textContent = "Belum ada API Key";
      }
    } catch (e) { console.warn('Gagal cek status API Key:', e); }
  });
  document.getElementById("btn-close-ai").addEventListener("click", () => {
    document.getElementById("ai-modal").classList.add("hidden");
    unlockScroll();
  });
  document.getElementById("ai-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) { document.getElementById("ai-modal").classList.add("hidden"); unlockScroll(); }
  });
  document.getElementById("btn-add-user").addEventListener("click", addUser);
  document.getElementById("user-list").addEventListener("change", async (e) => {
    const input = e.target.closest("[data-phone-user]");
    if (input) {
      try {
        await api(`/api/users/${input.getAttribute("data-phone-user")}`, {
          method: "PUT",
          body: JSON.stringify({ phone: normalizePhone(input.value) }),
        });
      } catch (e) { console.warn('Gagal menyimpan nomor telepon:', e); }
    }
  });
  document.getElementById("user-list").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete-user]");
    if (btn) deleteUser(btn.getAttribute("data-delete-user"));
  });
  let saveKeyTimeout;
  document.getElementById("inp-ai-api-key").addEventListener("input", (e) => {
    clearTimeout(saveKeyTimeout);
    saveKeyTimeout = setTimeout(async () => {
      const val = e.target.value;
      if (val) {
        try {
          await api("/api/ai/api-key", { method: "PUT", body: JSON.stringify({ apiKey: val }) });
          state.openCodeApiKey = "(terpasang)";
          document.getElementById("ai-key-status").textContent = "✓ Tersimpan";
          document.getElementById("btn-delete-api-key").classList.remove("hidden");
          showToast("API Key disimpan di server", "success");
        } catch (err) { showToast(err.message, "error"); }
      } else {
        document.getElementById("ai-key-status").textContent = "";
        document.getElementById("btn-delete-api-key").classList.add("hidden");
      }
    }, 600);
  });
  document.getElementById("btn-delete-api-key").addEventListener("click", async () => {
    const ok = await showConfirm("Hapus API Key yang tersimpan?");
    if (!ok) return;
    try {
      await api("/api/ai/api-key", { method: "PUT", body: JSON.stringify({}) });
      state.openCodeApiKey = "";
      document.getElementById("inp-ai-api-key").value = "";
      document.getElementById("ai-key-status").textContent = "Belum ada API Key";
      document.getElementById("btn-delete-api-key").classList.add("hidden");
      showToast("API Key dihapus", "success");
    } catch (err) { showToast(err.message, "error"); }
  });
  document.getElementById("btn-toggle-ai-key").addEventListener("click", () => {
    const inp = document.getElementById("inp-ai-api-key");
    const icon = document.querySelector("#btn-toggle-ai-key i");
    if (inp.type === "password") {
      inp.type = "text";
      icon.className = "ti ti-eye-off text-base";
    } else {
      inp.type = "password";
      icon.className = "ti ti-eye text-base";
    }
  });
  document.getElementById("ai-model-list")?.addEventListener("change", async (e) => {
    const cb = e.target.closest("[data-toggle-model]");
    if (cb) {
      const modelId = cb.getAttribute("data-toggle-model");
      if (cb.checked) {
        if (!state.activeModels.includes(modelId)) state.activeModels.push(modelId);
      } else {
        state.activeModels = state.activeModels.filter((id) => id !== modelId);
      }
      try { await api("/api/ai/models", { method: "PUT", body: JSON.stringify({ activeModels: state.activeModels }) }); } catch (e) { console.warn('Gagal menyimpan model aktif:', e); }
    }
  });
  document.getElementById("ai-model-list")?.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-remove-model]");
    if (btn) {
      const modelId = btn.getAttribute("data-remove-model");
      const ok = await showConfirm(`Hapus model "${modelId}"?`);
      if (!ok) return;
      try {
        await api(`/api/ai/models/${encodeURIComponent(modelId)}`, { method: "DELETE" });
        showToast(`Model "${modelId}" dihapus`, "success");
        fetchFreeModels();
      } catch (err) { showToast(err.message, "error"); }
    }
  });
  async function addCustomModel() {
    const inp = document.getElementById("inp-custom-model");
    const id = inp.value.trim();
    if (!id) { showToast("Masukkan ID model", "error"); return; }
    try {
      await api("/api/ai/custom-models", { method: "POST", body: JSON.stringify({ id }) });
      inp.value = "";
      fetchFreeModels();
      showToast(`Model "${id}" ditambahkan`, "success");
    } catch (err) { showToast(err.message, "error"); }
  }
  document.getElementById("btn-add-custom-model")?.addEventListener("click", addCustomModel);
  document.getElementById("inp-custom-model")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addCustomModel();
  });
  document.getElementById("btn-refresh-ai-models")?.addEventListener("click", async () => {
    await fetchFreeModels();
    try {
      const keyStatus = await api("/api/ai/api-key");
      if (keyStatus.hasKey) {
        document.getElementById("ai-key-status").textContent = "✓ API Key tersimpan";
        document.getElementById("btn-delete-api-key").classList.remove("hidden");
      }
    } catch (e) { console.warn('Gagal cek status API Key:', e); }
  });
  // Enter to add user
  document.getElementById("inp-user-email").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addUser();
  });
  document.getElementById("inp-user-password").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addUser();
  });
  document.getElementById("inp-user-phone").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addUser();
  });

  // LOGIN
  async function doLogin() {
    resetApp(true);
    const name = document.getElementById("inp-login-name").value.trim();
    const email = document.getElementById("inp-login-email").value.trim();
    const password = document.getElementById("inp-login-password").value;
    if (!email) { showToast("Isi email", "error"); return; }
    if (!password) { showToast("Isi password", "error"); return; }
    try {
      const result = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ name: name || undefined, email, password }),
      });
      storeToken(result.token);
      state.currentUser = result.user;
      try { localStorage.setItem("cps_last_name", name); } catch {}
      try { localStorage.setItem("cps_last_email", email); } catch {}
      renderUserMenu();
      applyRoleVisibility();
      document.getElementById("login-modal").classList.add("hidden");
      document.body.style.overflow = "";
      await loadApiKeyAndModels();
      loadSettings();
    } catch (err) {
      showToast(err.message, "error");
      document.getElementById("inp-login-password").value = "";
    }
  }
  document.getElementById("btn-login").addEventListener("click", doLogin);
  document.getElementById("inp-login-password").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doLogin();
  });
  document.querySelectorAll("[data-toggle-pw]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const inp = document.getElementById(btn.getAttribute("data-toggle-pw"));
      const icon = btn.querySelector("i");
      if (inp.type === "password") {
        inp.type = "text";
        icon.className = "ti ti-eye-off";
      } else {
        inp.type = "password";
        icon.className = "ti ti-eye";
      }
    });
  });
  document.getElementById("login-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) e.stopPropagation();
  });

  // FORGOT PASSWORD
  function showForgotForm() {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("reset-form").classList.add("hidden");
    document.getElementById("forgot-form").classList.remove("hidden");
  }
  document.getElementById("btn-show-forgot").addEventListener("click", showForgotForm);
  document.getElementById("btn-back-login").addEventListener("click", () => {
    document.getElementById("forgot-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
  });
  document.getElementById("btn-forgot").addEventListener("click", async () => {
    const email = document.getElementById("inp-forgot-email").value.trim();
    const phone = normalizePhone(document.getElementById("inp-forgot-phone").value);
    if (!email) { showToast("Masukkan email", "error"); return; }
    if (!phone) { showToast("Masukkan nomor WhatsApp", "error"); return; }
    const waWindow = window.open("", "_blank");
    try {
      const result = await api("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email, phone }),
      });
      waWindow.location.href = `https://wa.me/${result.waNumber}?text=${encodeURIComponent('Token reset Carofeed: ' + result.resetToken)}`;
      showToast("Cek WhatsApp untuk token reset", "success");
      document.getElementById("forgot-form").classList.add("hidden");
      document.getElementById("reset-form").classList.remove("hidden");
    } catch (err) { waWindow.close(); showAlert(err.message); }
  });
  document.getElementById("inp-forgot-email").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btn-forgot").click();
  });
  document.getElementById("inp-forgot-phone").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btn-forgot").click();
  });

  // RESET PASSWORD
  document.getElementById("btn-back-login-2").addEventListener("click", () => {
    document.getElementById("reset-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
  });
  document.getElementById("btn-reset-password").addEventListener("click", async () => {
    const token = document.getElementById("inp-reset-token").value.trim();
    const newPass = document.getElementById("inp-reset-password").value;
    const confirm = document.getElementById("inp-reset-confirm").value;
    if (!token) { showToast("Masukkan token reset", "error"); return; }
    if (!newPass) { showToast("Masukkan password baru", "error"); return; }
    if (newPass.length < 4) { showToast("Password minimal 4 karakter", "error"); return; }
    if (newPass !== confirm) { showToast("Konfirmasi password tidak cocok", "error"); return; }
    try {
      await api("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword: newPass }),
      });
      showToast("Password berhasil direset. Silakan login.", "success");
      document.getElementById("reset-form").classList.add("hidden");
      document.getElementById("login-form").classList.remove("hidden");
      document.getElementById("inp-reset-token").value = "";
      document.getElementById("inp-reset-password").value = "";
      document.getElementById("inp-reset-confirm").value = "";
      document.getElementById("token-display-area").classList.add("hidden");
    } catch (err) { showToast(err.message, "error"); }
  });
  document.getElementById("inp-reset-confirm").addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btn-reset-password").click();
  });
}

async function loadApiKeyAndModels() {
  try {
    const keyStatus = await api("/api/ai/api-key");
    if (keyStatus.hasKey) state.openCodeApiKey = "(terpasang)";
    const modelData = await api("/api/ai/models");
    state.allModels = modelData.models;
    state.activeModels = modelData.activeModels;
    state.customModels = modelData.models.filter((m) => m.custom).map((m) => m.id);
    if (modelData.models.length > 0 && !state.openCodeModel) {
      state.openCodeModel = modelData.models[0].id;
    }
    const modelSelect = document.getElementById("inp-model");
    if (modelSelect) {
      modelSelect.innerHTML = modelData.models
        .filter((m) => modelData.activeModels.includes(m.id))
        .map((m) => `<option value="${m.id}" ${m.id === state.openCodeModel ? "selected" : ""}>${m.name || m.id}</option>`)
        .join("");
      modelSelect._enhancedRefresh?.();
    }
    if (isAdmin() && keyStatus.hasKey) {
      document.getElementById("ai-key-status").textContent = "✓ Terpasang";
    }
  } catch (e) { console.warn('Gagal memuat data awal:', e); }
}

async function loadStaticData() {
  const results = await Promise.allSettled([
    fetch('/api/data/visual-categories').then(r => r.ok && r.json()),
    fetch('/api/data/niches').then(r => r.ok && r.json()),
    fetch('/api/data/subniches').then(r => r.ok && r.json()),
  ]);
  const [vc, niches, subniches] = results.map(r => r.status === 'fulfilled' ? r.value : null);
  if (vc?.categories) { VISUAL_CATEGORIES = vc.categories; BUILT_IN_CATEGORIES = Object.keys(vc.categories); }
  else BUILT_IN_CATEGORIES = Object.keys(VISUAL_CATEGORIES);
  if (vc?.palettes) STYLE_PALETTES = vc.palettes;
  if (niches && typeof niches === 'object') NICHE_MAP = niches;
  if (subniches && typeof subniches === 'object') SUBNICHE_MAP = subniches;
}

function closeAllDropdowns() {
  document.querySelectorAll(".enhanced-dropdown:not(.hidden)").forEach(el => {
    el.classList.add("hidden");
    const trigger = el.parentElement.querySelector(".enhanced-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
}

function enhanceSelect(id) {
  try {
    const sel = document.getElementById(id);
    if (!sel || sel.dataset.enhanced) return;
    sel.dataset.enhanced = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "relative";
    wrapper.style.minWidth = "0";
    for (const cls of ["w-full", "flex-1"]) {
      if (sel.classList.contains(cls)) wrapper.classList.add(cls);
    }

    const isXs = sel.classList.contains("text-xs");
    const sizing = isXs ? "px-3 py-2 text-xs" : "px-3 py-2.5 text-sm";
    const trigger = document.createElement("div");
    trigger.className = "input-field w-full rounded-lg " + sizing + " flex items-center gap-2 cursor-pointer enhanced-trigger";
    trigger.tabIndex = 0;
    trigger.setAttribute("role", "combobox");
    trigger.setAttribute("aria-expanded", "false");

    const triggerText = document.createElement("span");
    triggerText.className = "truncate flex-1";
    triggerText.style.color = "var(--ink-faint)";

    const chevron = document.createElement("i");
    chevron.className = "ti ti-chevron-down text-xs shrink-0";
    chevron.style.color = "var(--ink-faint)";

    trigger.append(triggerText, chevron);

    const dropdown = document.createElement("div");
    dropdown.className = "enhanced-dropdown hidden absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border";
    dropdown.style.cssText = "background:var(--bg-panel);border-color:var(--border-soft);box-shadow:0 8px 24px rgba(0,0,0,.4);max-height:200px;overflow-y:auto";

    sel.style.display = "none";
    sel.parentNode.insertBefore(wrapper, sel);
    wrapper.append(trigger, dropdown, sel);

    function refreshOptions() {
      if (!sel || !dropdown) return;
      dropdown.innerHTML = "";
      const selectedVal = sel.value;
      const opts = sel.options;
      if (!opts) return;
      for (let i = 0; i < opts.length; i++) {
        const opt = opts[i];
        const div = document.createElement("div");
        div.className = "option" + (opt.value === selectedVal ? " selected" : "");
        div.dataset.value = opt.value;
        div.textContent = opt.textContent;
        div.title = opt.textContent;
        dropdown.appendChild(div);
      }
      const idx = sel.selectedIndex;
      if (idx >= 0 && sel.options[idx] && sel.options[idx].value) {
        triggerText.textContent = sel.options[idx].textContent;
        triggerText.style.color = "";
      } else {
        triggerText.textContent = sel.options[0]?.textContent || "Pilih...";
        triggerText.style.color = "var(--ink-faint)";
      }
    }

    refreshOptions();

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasOpen = !dropdown.classList.contains("hidden");
      closeAllDropdowns();
      if (!wasOpen) {
        dropdown.classList.remove("hidden");
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger.click(); }
      if (e.key === "Escape") closeAllDropdowns();
    });

    dropdown.addEventListener("click", (e) => {
      const opt = e.target.closest(".option");
      if (!opt) return;
      sel.value = opt.dataset.value;
      refreshOptions();
      closeAllDropdowns();
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    });

    sel._enhancedRefresh = refreshOptions;
  } catch (e) {
    console.warn("enhanceSelect gagal untuk", id, e);
    const sel = document.getElementById(id);
    if (sel) { sel.style.display = ""; sel.dataset.enhanced = ""; }
  }
}

async function init() {
  console.log('[init] start');
  ["preset-select","inp-evergreen-niche","inp-subniche","inp-purpose",
   "inp-audience","inp-count","inp-ratio","inp-visual-category",
   "inp-layout","inp-model","inp-user-role"].forEach(enhanceSelect);
  console.log('[init] enhanceSelect done');

  populateVisualCategory();
  populateNicheDropdown();
  renderStylePresets();
  bindInputs();
  renderSlidesArea();
  renderEmptyState();
  console.log('[init] first pass done');

  loadStaticData().then(() => { populateVisualCategory(); populateNicheDropdown(); });

  // Aktifkan :active pseudo-class di iOS Safari (tanpa ini :active tidak bekerja di <button>)
  document.body.addEventListener("touchstart", () => {}, { passive: true });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".enhanced-trigger, .enhanced-dropdown")) return;
    closeAllDropdowns();
  });

  updateColorSwatches();
  updateRatioIcon();
  console.log('[init] sync pass done');

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state._abortController) abortGeneration();
  });

  if (state.authToken) {
    try {
      const me = await api("/api/auth/me");
      state.currentUser = me.user;
      renderUserMenu();
      applyRoleVisibility();
      await Promise.all([
        loadApiKeyAndModels(),
        loadPrompts(),
        loadCategoryImages(),
        loadCustomCategories(),
      ]);
      if (state.openCodeApiKey) fetchFreeModels();
    } catch (e) {
      console.error('Init gagal, session tidak valid:', e);
      clearToken();
      state.currentUser = null;
      renderUserMenu();
      applyRoleVisibility();
      showLoginModal();
    }
  } else {
    state.currentUser = null;
    renderUserMenu();
    applyRoleVisibility();
    showLoginModal();
  }
  loadSettings();
  ["inp-topic","inp-brand","inp-customstyle","prompt-system-idea","prompt-user-idea","prompt-system-slide","prompt-user-slide","prompt-negative"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => autoExpand(el));
    autoExpand(el);
  });
  console.log('[init] complete');
}

init();