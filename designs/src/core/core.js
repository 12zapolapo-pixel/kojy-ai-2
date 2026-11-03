/* Rana Yaser portfolio — shared behaviour for every design.
   No styling lives here. Each design supplies markup with the data-* hooks used
   below (data-viewer, data-v="…", data-project-modal, data-p="…", data-overlay,
   data-contact, data-copy …) and styles them in its own world. */
(function () {
  'use strict';
  const RY = (window.RY = {});
  const mq = (q) => window.matchMedia(q);
  RY.reduced = () => mq('(prefers-reduced-motion: reduce)').matches;
  RY.fine = mq('(pointer: fine)').matches;
  RY.EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
  RY.$ = (s, r = document) => r.querySelector(s);
  RY.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  RY.pad = (n) => String(n).padStart(2, '0');
  RY.esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  RY.icons = (attrs) => { if (window.lucide) window.lucide.createIcons(attrs ? { attrs } : undefined); };

  /* ---------- Embedded images → blob: URLs ----------
     Every picture is decoded once and shared, however many times it appears.
     If a browser refuses blob: images, everything falls back to the data URIs. */
  (function shareImages() {
    if (!window.Blob || !window.URL || !URL.createObjectURL || !window.atob) return;
    ARCHIVE_WORKS.forEach((a) => {
      if (!a.src || a.src.indexOf('data:') !== 0) return;
      try {
        const comma = a.src.indexOf(',');
        const mime = a.src.slice(5, a.src.indexOf(';'));
        const bin = atob(a.src.slice(comma + 1));
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        a._data = a.src;
        a.src = URL.createObjectURL(new Blob([bytes], { type: mime }));
      } catch (e) { /* keep the data URI */ }
    });
    const first = ARCHIVE_WORKS.find((a) => a._data);
    if (!first) return;
    const probe = new Image();
    probe.onerror = () => {
      ARCHIVE_WORKS.forEach((a) => {
        if (!a._data) return;
        const blob = a.src;
        a.src = a._data;
        document.querySelectorAll('img').forEach((im) => { if (im.getAttribute('src') === blob) im.src = a._data; });
      });
    };
    probe.src = first.src;
  })();

  /* ---------- Artwork helpers ---------- */
  RY.works = ARCHIVE_WORKS;
  RY.byId = (id) => ARCHIVE_WORKS.find((a) => a.id === id);
  RY.number = (id) => ARCHIVE_WORKS.findIndex((a) => a.id === id) + 1;
  RY.ratio = (art) => {
    const m = art.aspectClass.match(/aspect-\[(\d+)\/(\d+)\]/);
    return m ? Number(m[1]) / Number(m[2]) : 1;
  };
  RY.size = (art) => (art.format.match(/\(([^)]+)\)/) || [, ''])[1];
  RY.formatName = (art) => art.format.replace(/\s*\([^)]*\)\s*$/, '');
  RY.count = (cat) => (cat === 'all' ? ARCHIVE_WORKS.length : ARCHIVE_WORKS.filter((a) => a.categories.includes(cat)).length);
  RY.filterWorks = (cat) => (cat === 'all' ? ARCHIVE_WORKS.slice() : ARCHIVE_WORKS.filter((a) => a.categories.includes(cat)));
  RY.img = (id, opts = {}) => {
    const a = RY.byId(id);
    if (!a) return '';
    const r = RY.ratio(a);
    return `<img src="${a.src}" alt="${RY.esc(opts.alt != null ? opts.alt : a.title)}" ${opts.eager ? '' : 'loading="lazy" '}decoding="async" width="${Math.round(r * 1000)}" height="1000"${opts.cls ? ` class="${opts.cls}"` : ''}>`;
  };
  /* A close-up of one artwork: focal point x/y in %, zoom factor */
  RY.crop = (d, cls = '') => {
    const a = RY.byId(d.art);
    if (!a) return '';
    return `<span class="crop ${cls}" style="--x:${d.x}%;--y:${d.y}%;--z:${d.zoom}">${RY.img(d.art, { alt: `Detail of ${a.title}` })}</span>`;
  };
  RY.related = (rel) => {
    if (!rel) return [];
    const out = (rel.art || []).map((id) => ({ kind: 'art', id }));
    if (rel.project) out.push({ kind: 'project', id: rel.project });
    return out;
  };
  RY.fillArt = (root = document) => {
    RY.$$('img[data-art]', root).forEach((img) => {
      const a = RY.byId(img.dataset.art);
      if (!a || img.getAttribute('src')) return;
      img.src = a.src;
      if (!img.hasAttribute('alt')) img.alt = a.title;
    });
  };

  /* ---------- Reveal on scroll ----------
     Only elements that start below the fold get a hidden state, so the first
     screen is always complete and nothing stays hidden if scripts fail.
     A rAF-throttled geometry check (not IntersectionObserver) decides when to
     reveal, because designs hide elements with clip-path, which observers treat
     as zero-area and would never report. */
  const io = 'IntersectionObserver' in window;
  const pending = new Set();
  let checking = false;
  const check = () => {
    checking = false;
    const fold = window.innerHeight * 0.94;
    pending.forEach((el) => {
      if (!el.isConnected) { pending.delete(el); return; }
      const r = el.getBoundingClientRect();
      if (r.top < fold && r.bottom > 0) { el.classList.add('is-in'); pending.delete(el); }
    });
  };
  const schedule = () => { if (!checking && pending.size) { checking = true; requestAnimationFrame(check); } };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  RY.observe = (root = document) => {
    const fold = window.innerHeight * 0.92;
    RY.$$('[data-reveal]:not(.is-in)', root).forEach((el) => {
      if (RY.reduced()) { el.classList.add('is-in'); return; }
      if (!el.classList.contains('pre') && el.getBoundingClientRect().top < fold) {
        requestAnimationFrame(() => el.classList.add('is-in'));
        return;
      }
      el.classList.add('pre');
      pending.add(el);
    });
    schedule();
  };

  /* ---------- Overlays (dialogs) ---------- */
  let lastTrigger = null;
  const openOverlays = () => RY.$$('[data-overlay]:not([hidden])');
  RY.openOverlay = (el, opts = {}) => {
    if (!el || !el.hidden) return;
    lastTrigger = document.activeElement;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar', sw + 'px');
    document.documentElement.classList.add('is-locked');
    el.hidden = false;
    if (opts.instant || RY.reduced()) el.classList.add('is-open');
    else requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-open')));
    const target = RY.$('[data-autofocus]', el) || RY.$('button, a[href]', el);
    setTimeout(() => target && target.focus({ preventScroll: true }), 60);
    el.dispatchEvent(new CustomEvent('overlay:open'));
  };
  RY.closeOverlay = (el) => {
    if (!el || el.hidden || el.dataset.closing) return;
    el.dataset.closing = '1';
    el.classList.remove('is-open');
    const ms = RY.reduced() ? 0 : Number(el.dataset.closeMs || 260);
    setTimeout(() => {
      el.hidden = true;
      delete el.dataset.closing;
      if (!openOverlays().length) document.documentElement.classList.remove('is-locked');
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
      el.dispatchEvent(new CustomEvent('overlay:close'));
    }, ms);
  };
  document.addEventListener('click', (e) => {
    const closer = e.target.closest('[data-close]');
    if (closer) { RY.closeOverlay(closer.closest('[data-overlay]')); return; }
    const ov = e.target.matches('[data-overlay], [data-backdrop]') ? e.target.closest('[data-overlay]') : null;
    if (ov) RY.closeOverlay(ov);
  });
  document.addEventListener('keydown', (e) => {
    const list = openOverlays();
    const top = list[list.length - 1];
    if (!top) return;
    if (e.key === 'Escape') { e.preventDefault(); RY.closeOverlay(top); return; }
    if (e.key !== 'Tab') return;
    const items = RY.$$('button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', top).filter((n) => n.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (!top.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- Artwork viewer ---------- */
  const V = (RY.viewer = { list: [], i: 0, zoom: false, framed: false, key: '' });
  V.el = () => RY.$('[data-viewer]');
  const vSet = (root, k, v) => RY.$$(`[data-v="${k}"]`, root).forEach((n) => { n.textContent = v; });
  V.render = (dir = 0) => {
    const root = V.el();
    const art = V.list[V.i];
    if (!root || !art) return;
    const pal = ART_PALETTES[art.id] || { colors: [], craft: '' };
    vSet(root, 'counter', `${RY.pad(V.i + 1)} / ${RY.pad(V.list.length)}`);
    vSet(root, 'no', RY.pad(RY.number(art.id)));
    vSet(root, 'title', art.title);
    vSet(root, 'ar', art.arabicTitle);
    vSet(root, 'org', art.org);
    vSet(root, 'cat', art.categoryLabel);
    vSet(root, 'desc', art.description);
    vSet(root, 'format', art.format);
    vSet(root, 'format-name', RY.formatName(art));
    vSet(root, 'size', RY.size(art));
    vSet(root, 'handle', art.handle);
    vSet(root, 'craft', pal.craft);
    RY.$$('[data-v="swatches"]', root).forEach((sw) => {
      sw.innerHTML = pal.colors.map((h) => `<button type="button" class="v-swatch" data-copy="${h}" data-copy-label="${h}" title="Copy ${h}"><span style="background:${h}"></span><code>${h}</code></button>`).join('');
    });
    RY.$$('[data-v="badges"]', root).forEach((b) => {
      b.innerHTML = art.categories.map((c) => `<span class="v-badge">${RY.esc((CONTENT.filters.find((f) => f[0] === c) || [c, c])[1])}</span>`).join('');
    });
    root.style.setProperty('--art-ratio', RY.ratio(art));
    root.style.setProperty('--art-tint', pal.colors[1] || pal.colors[0] || 'transparent');
    root.classList.toggle('is-zoomed', V.zoom);
    root.classList.toggle('is-framed', V.framed);
    RY.$$('[data-v-act="zoom"]', root).forEach((b) => { b.setAttribute('aria-pressed', String(V.zoom)); });
    RY.$$('[data-v-act="original"]', root).forEach((b) => b.setAttribute('aria-pressed', String(!V.framed)));
    RY.$$('[data-v-act="framed"]', root).forEach((b) => b.setAttribute('aria-pressed', String(V.framed)));
    const img = RY.$('[data-v="img"]', root);
    if (img) {
      img.style.transformOrigin = '';
      img.src = art.src;
      img.alt = `${art.title} — ${art.arabicTitle}`;
      if (dir !== null && img.animate && !RY.reduced()) {
        img.animate(
          [{ opacity: 0, translate: `${dir * 36}px 0`, scale: dir ? 1 : 0.97 }, { opacity: 1, translate: '0 0', scale: 1 }],
          { duration: 560, easing: RY.EASE }
        );
      }
    }
    const strip = RY.$('[data-v="strip"]', root);
    if (strip) {
      const key = V.list.map((a) => a.id).join();
      if (key !== V.key) {
        V.key = key;
        strip.innerHTML = V.list.map((a, idx) => `<button type="button" class="v-thumb" data-v-jump="${idx}" aria-label="Show ${RY.esc(a.title)}"><img src="${a.src}" alt="" loading="lazy" decoding="async"></button>`).join('');
      }
      RY.$$('.v-thumb', strip).forEach((t, idx) => {
        const on = idx === V.i;
        if (on) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
        if (on && t.scrollIntoView) t.scrollIntoView({ inline: 'center', block: 'nearest', behavior: RY.reduced() ? 'auto' : 'smooth' });
      });
    }
    root.dispatchEvent(new CustomEvent('viewer:render', { detail: { art, dir } }));
  };
  V.open = (id, list, fromImg) => {
    const pool = list && list.some((a) => a.id === id) ? list : ARCHIVE_WORKS.slice();
    V.list = pool;
    V.i = Math.max(0, pool.findIndex((a) => a.id === id));
    V.zoom = false;
    const root = V.el();
    if (!root) return;
    const img = RY.$('[data-v="img"]', root);
    const doOpen = (instant) => { V.render(instant ? null : 0); RY.openOverlay(root, { instant }); };
    if (fromImg && img && document.startViewTransition && !RY.reduced()) {
      fromImg.style.viewTransitionName = 'ry-art';
      const t = document.startViewTransition(() => {
        fromImg.style.viewTransitionName = '';
        img.style.viewTransitionName = 'ry-art';
        doOpen(true);
      });
      t.finished.finally(() => { img.style.viewTransitionName = ''; });
    } else {
      doOpen(false);
    }
  };
  V.go = (d) => { if (!V.list.length) return; V.i = (V.i + d + V.list.length) % V.list.length; V.zoom = false; V.render(d); };
  V.jump = (idx) => { const d = Math.sign(idx - V.i); V.i = idx; V.zoom = false; V.render(d); };
  document.addEventListener('click', (e) => {
    const jump = e.target.closest('[data-v-jump]');
    if (jump) { V.jump(Number(jump.dataset.vJump)); return; }
    const act = e.target.closest('[data-v-act]');
    if (!act) return;
    const a = act.dataset.vAct;
    if (a === 'prev') V.go(-1);
    else if (a === 'next') V.go(1);
    else if (a === 'zoom') { V.zoom = !V.zoom; V.render(null); }
    else if (a === 'original') { V.framed = false; V.render(null); }
    else if (a === 'framed') { V.framed = true; V.render(null); }
  });
  document.addEventListener('keydown', (e) => {
    const root = V.el();
    if (!root || root.hidden) return;
    if (e.key === 'ArrowRight') V.go(1);
    if (e.key === 'ArrowLeft') V.go(-1);
  });
  document.addEventListener('pointermove', (e) => {
    const root = V.el();
    if (!root || root.hidden || !V.zoom) return;
    const img = RY.$('[data-v="img"]', root);
    if (!img || !img.contains(e.target)) return;
    const r = img.getBoundingClientRect();
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
  (function swipe() {
    let x0 = null, y0 = null;
    document.addEventListener('touchstart', (e) => {
      const root = V.el();
      if (!root || root.hidden || !e.target.closest('[data-v-stage]')) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', (e) => {
      if (x0 === null || V.zoom) { x0 = null; return; }
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) V.go(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  })();
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-open-art]');
    if (!card) return;
    e.preventDefault();
    const list = card.dataset.openList === 'filtered' && RY.currentList ? RY.currentList() : null;
    V.open(card.dataset.openArt, list, card.querySelector('img'));
  });

  /* ---------- Project case studies + live previews ---------- */
  const SIMS = {
    'proj-01': `
      <div class="ff" data-ff>
        <div class="ff-bar">
          <div class="ff-bar-title"><span lang="ar">مهرجان جدة للأكل</span> • Jeddah Food Fest React Dashboard <span class="ff-pill">1st Place Winner</span></div>
          <div class="ff-bar-actions">
            <button type="button" data-sim="ff-theme" aria-pressed="false">Toggle Light / Dark UI</button>
            <button type="button" data-sim="ff-side" aria-pressed="true">Mobile Sidebar</button>
          </div>
        </div>
        <div class="ff-body" dir="rtl" lang="ar">
          <aside class="ff-side">
            <div class="ff-side-title">القائمة الرئيسية (RTL)</div>
            <button type="button" data-sim="ff-tab:overview" aria-current="true">نظرة عامة</button>
            <button type="button" data-sim="ff-tab:booths">أركان المطاعم</button>
            <button type="button" data-sim="ff-tab:visitors">تفاعل الزوار</button>
          </aside>
          <div class="ff-main">
            <div class="ff-head">
              <div><div class="ff-kicker">تجربة Vibe-Coding الأولى باستخدام React</div><div class="ff-h" data-ff-heading>لوحة تحكم مهرجان جدة للأكل — واجهة عربية متجاوبة</div></div>
              <span class="ff-chip">React State Active</span>
            </div>
            <div class="ff-stats">
              <div><span>الوضع الليلي / النهاري</span><b>Light &amp; Dark</b></div>
              <div><span>تخطيط الواجهة</span><b>Arabic-Friendly</b></div>
              <div><span>النتيجة في المسابقة</span><b>المركز الأول</b></div>
            </div>
            <p class="ff-status" data-ff-status aria-live="polite">جرب الأزرار في الأعلى لتبديل الوضع الليلي/النهاري أو القائمة الجانبية المتجاوبة كما في نموذج React الفائز!</p>
          </div>
        </div>
      </div>`,
    'proj-02': `
      <div class="sim">
        <div class="sim-head"><div><b class="sim-title">Tamkeen (تمكين) Interactive Wayfinder</b><span class="sim-sub">KAU Women’s Campus Navigation Concept</span></div><span class="sim-hint">Click a campus destination below ↓</span></div>
        <div class="sim-grid">
          <button type="button" class="sim-opt" data-sim="tam:fcit" aria-pressed="true"><b>FCIT Building</b><span>Faculty of Computing &amp; IT • Labs &amp; Halls</span></button>
          <button type="button" class="sim-opt" data-sim="tam:library" aria-pressed="false"><b>Central Library &amp; Study</b><span>Accessible Ramp • Quiet Zones</span></button>
          <button type="button" class="sim-opt" data-sim="tam:gate" aria-pressed="false"><b>Main Student Gate &amp; Services</b><span>Shuttle Stop • Student Lounge</span></button>
        </div>
        <div class="sim-out" data-sim-out="tam" aria-live="polite"><div><b>Active Route Preview: FCIT Building (كلية الحاسبات وتقنية المعلومات)</b><span>Accessible Step-Free Path Available • Estimated Walk: 4 mins • Shaded Walkway</span></div><em class="sim-tag">UX Concept</em></div>
      </div>`,
    'proj-03': `
      <div class="sim">
        <div class="sim-head"><b class="sim-title">A-Closet • Smart Wardrobe AI Concept Simulator</b><span class="sim-hint">Select an occasion to test personalized outfit logic:</span></div>
        <div class="sim-row">
          <button type="button" class="sim-opt sim-opt--pill" data-sim="aclo:campus" aria-pressed="true">University &amp; Club Day</button>
          <button type="button" class="sim-opt sim-opt--pill" data-sim="aclo:pitch" aria-pressed="false">Competition Pitch</button>
          <button type="button" class="sim-opt sim-opt--pill" data-sim="aclo:creative" aria-pressed="false">Creative Studio</button>
        </div>
        <div class="sim-out" data-sim-out="aclo" aria-live="polite"><div><b>AI Curated Combination: University &amp; Club Leadership Day</b><span>Smart Wardrobe Match: Breathable structured layering + comfortable walking footwear + tote space for laptop &amp; sketchpad.</span></div></div>
      </div>`,
    'proj-04': `
      <div class="sim">
        <div class="sim-head"><b class="sim-title">Custom Fashion Platform Concept</b><span class="sim-hint">Independent Designer ↔ Brand Bridge</span></div>
        <div class="sim-grid sim-flow">
          <div class="sim-card"><b>01. Designer Portfolio</b><p>Independent designers showcase capsules without needing commercial overhead.</p></div>
          <div class="sim-card"><b>02. Store Discovery</b><p>Boutiques &amp; retail brands browse verified local talent and request collaborations.</p></div>
          <div class="sim-card"><b>03. Shared Launch</b><p>Co-branded collections bring fresh creative work directly to shoppers.</p></div>
        </div>
      </div>`,
    'proj-05': `
      <div class="sim">
        <div class="sim-head"><b class="sim-title">AI Academic Search Engine &amp; Chatbot Concept</b><span class="sim-hint">Verified Dated Sources Only</span></div>
        <div class="sim-query">
          <div class="sim-query-line"><span>Sample Student Query:</span> <strong>“Layered software architecture in enterprise information systems”</strong></div>
          <div class="sim-row"><span class="sim-chip">✓ Peer-Reviewed Source</span><span class="sim-chip">Publication Date Verified</span><span class="sim-chip">Student-Level Summary</span></div>
        </div>
      </div>`,
    'proj-06': `
      <div class="sim">
        <div class="sim-head"><b class="sim-title">Law Firm Consultation System — Layered Architecture</b><span class="sim-hint">Click any architectural layer to inspect:</span></div>
        <div class="sim-stack">
          <button type="button" class="sim-opt sim-layer" data-sim="law:1" aria-pressed="false"><b>1. Presentation Layer</b><span>Client &amp; legal advisor interfaces for booking and tracking consultations.</span></button>
          <button type="button" class="sim-opt sim-layer" data-sim="law:2" aria-pressed="false"><b>2. Business / Service Layer</b><span>Consultation workflow routing, legal specialization matching &amp; case rules.</span></button>
          <button type="button" class="sim-opt sim-layer" data-sim="law:3" aria-pressed="false"><b>3. Data Access Layer</b><span>Structured storage for client records, case histories &amp; appointment logs.</span></button>
        </div>
      </div>`
  };
  const FF_TABS = {
    overview: ['نظرة عامة — لوحة تحكم مهرجان جدة للأكل', 'تعرض النظرة العامة مؤشرات المهرجان بتصميم عربي متجاوب حاز على المركز الأول.'],
    booths: ['أركان المطاعم — تنظيم وتصنيف المشاركين', 'واجهة تفاعلية لاستعراض أركان المهرجان وتصنيفاتها بسلاسة.'],
    visitors: ['تفاعل الزوار — تجربة مستخدم سهلة وواضحة', 'تصميم يركز على سهولة الوصول وتجربة الزائر عبر الجوال وسطح المكتب.']
  };
  const TAMKEEN = {
    fcit: ['Active Route Preview: FCIT Building (كلية الحاسبات وتقنية المعلومات)', 'Accessible Step-Free Path Available • Estimated Walk: 4 mins • Shaded Walkway'],
    library: ['Active Route Preview: Central Library & Study Commons', 'Elevator & Ramp Access Verified • Quiet Study Wings & Digital Catalog Kiosks'],
    gate: ['Active Route Preview: Main Student Gate & Campus Hub', 'Direct Campus Shuttle Connection • Clear Wayfinding Signage for New Students']
  };
  const ACLOSET = {
    campus: ['AI Curated Combination: University & Club Leadership Day', 'Smart Wardrobe Match: Breathable structured layering + comfortable walking footwear + tote space for laptop & sketchpad.'],
    pitch: ['AI Curated Combination: Hackathon & Competition Pitch', 'Smart Wardrobe Match: Confident editorial blazer silhouette + signature pastel accent piece ready for stage presentations.'],
    creative: ['AI Curated Combination: Creative Design & Photography Walk', 'Smart Wardrobe Match: Playful color-coordinated layers inspired by soft pink, cream, and navy.']
  };
  const pressOnly = (btn) => {
    RY.$$('[data-sim]', btn.parentElement).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  };
  const flash = (el) => { if (el && el.animate && !RY.reduced()) el.animate([{ opacity: 0.35, translate: '0 6px' }, { opacity: 1, translate: '0 0' }], { duration: 380, easing: RY.EASE }); };
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-sim]');
    if (!btn) return;
    const [kind, arg] = btn.dataset.sim.split(':');
    const box = btn.closest('.sim, .ff');
    if (kind === 'ff-theme') {
      const dark = box.classList.toggle('is-dark');
      btn.setAttribute('aria-pressed', String(dark));
      const st = RY.$('[data-ff-status]', box);
      st.textContent = dark ? 'تم تفعيل الوضع الليلي (Dark Mode) في نموذج لوحة تحكم مهرجان جدة للأكل!' : 'تم تفعيل الوضع النهاري (Light Mode) بالهوية البرتقالية المشرقة!';
      flash(st);
    } else if (kind === 'ff-side') {
      const hidden = box.classList.toggle('no-side');
      btn.setAttribute('aria-pressed', String(!hidden));
    } else if (kind === 'ff-tab') {
      const t = FF_TABS[arg] || FF_TABS.overview;
      RY.$('[data-ff-heading]', box).textContent = t[0];
      RY.$('[data-ff-status]', box).textContent = t[1];
      RY.$$('[data-sim^="ff-tab"]', box).forEach((b) => (b === btn ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
      flash(RY.$('.ff-main', box));
    } else if (kind === 'tam' || kind === 'aclo') {
      const d = (kind === 'tam' ? TAMKEEN : ACLOSET)[arg];
      const out = RY.$(`[data-sim-out="${kind}"]`, box);
      out.innerHTML = `<div><b>${RY.esc(d[0])}</b><span>${RY.esc(d[1])}</span></div>${kind === 'tam' ? '<em class="sim-tag">Tamkeen UX</em>' : ''}`;
      pressOnly(btn);
      flash(out);
    } else if (kind === 'law') {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      RY.$$('[data-sim^="law"]', box).forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', String(on));
      box.classList.toggle('has-active', on);
    }
  });

  RY.project = { id: null };
  const pSet = (root, k, html, asText = true) => RY.$$(`[data-p="${k}"]`, root).forEach((n) => { if (asText) n.textContent = html; else n.innerHTML = html; });
  RY.typeLabel = (t) => (CONTENT.projFilters.find((f) => f[0] === t) || [t, t])[1];
  RY.openProject = (id) => {
    const p = PROJECTS_DATA.find((x) => x.id === id);
    const root = RY.$('[data-project-modal]');
    if (!p || !root) return;
    RY.project.id = id;
    pSet(root, 'number', p.number);
    pSet(root, 'title', p.title);
    pSet(root, 'subtitle', p.subtitle);
    pSet(root, 'badge', p.statusBadge);
    pSet(root, 'type', RY.typeLabel(p.type));
    pSet(root, 'summary', p.summary);
    pSet(root, 'note', p.honestNote);
    pSet(root, 'features', p.features.map((f) => `<li>${RY.esc(f)}</li>`).join(''), false);
    pSet(root, 'tags', p.focusTags.map((t) => `<li>${RY.esc(t)}</li>`).join(''), false);
    pSet(root, 'icon', `<i data-lucide="${p.icon}"></i>`, false);
    pSet(root, 'sim', SIMS[id] || '', false);
    root.dataset.type = p.type;
    RY.icons();
    if (root.hidden) RY.openOverlay(root);
    else {
      const scroller = root.matches('[data-p-scroll]') ? root : RY.$('[data-p-scroll]', root);
      if (scroller) scroller.scrollTop = 0;
      const body = RY.$('[data-p-body]', root);
      if (body && body.animate && !RY.reduced()) body.animate([{ opacity: 0, translate: '0 16px' }, { opacity: 1, translate: '0 0' }], { duration: 460, easing: RY.EASE });
    }
  };
  document.addEventListener('click', (e) => {
    const o = e.target.closest('[data-open-project]');
    if (o) { RY.openProject(o.dataset.openProject); return; }
    const step = e.target.closest('[data-p-step]');
    if (step) {
      const idx = PROJECTS_DATA.findIndex((p) => p.id === RY.project.id);
      const n = (idx + Number(step.dataset.pStep) + PROJECTS_DATA.length) % PROJECTS_DATA.length;
      RY.openProject(PROJECTS_DATA[n].id);
    }
  });

  /* ---------- Copy to clipboard ---------- */
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
      ta.remove(); return ok;
    }
  }
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    e.stopPropagation();
    const ok = await copyText(btn.dataset.copy);
    if (!btn.dataset.orig) btn.dataset.orig = btn.innerHTML;
    btn.classList.add('is-copied');
    if (!btn.classList.contains('v-swatch')) btn.textContent = ok ? 'Copied' : 'Select & copy';
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { btn.innerHTML = btn.dataset.orig; btn.classList.remove('is-copied'); }, 1600);
    const live = RY.$('[data-copy-status]');
    if (live) live.textContent = ok ? `${btn.dataset.copyLabel || 'Text'} copied to your clipboard.` : `Couldn’t copy automatically — select ${btn.dataset.copyLabel || 'the text'} and copy it by hand.`;
  });

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  RY.bindContact = () => {
    const form = RY.$('[data-contact]');
    if (!form) return;
    const fields = { name: form.elements.name, message: form.elements.message };
    const setErr = (k, bad) => {
      const el = fields[k];
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      const msg = RY.$(`[data-err="${k}"]`, form);
      if (msg) msg.hidden = !bad;
    };
    Object.keys(fields).forEach((k) => fields[k].addEventListener('input', () => setErr(k, false)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = fields.name.value.trim();
      const message = fields.message.value.trim();
      const topic = form.elements.topic.value;
      setErr('name', !name);
      setErr('message', !message);
      if (!name || !message) {
        (!name ? fields.name : fields.message).focus();
        if (form.animate && !RY.reduced()) form.animate([{ translate: '0 0' }, { translate: '-6px 0' }, { translate: '5px 0' }, { translate: '-2px 0' }, { translate: '0 0' }], { duration: 320 });
        return;
      }
      const subject = `${topic} — from ${name}`;
      const body = `${message}\n\n— ${name}`;
      window.location.href = `mailto:${CONTENT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = RY.$('[data-form-status]', form);
      if (status) {
        status.hidden = false;
        status.textContent = `Thanks, ${name}! Your email app should open with the message ready to send. If nothing happens, write to ${CONTENT.email} directly.`;
      }
    });
  };

  /* ---------- CV download (plain-text summary) ---------- */
  RY.downloadCV = () => {
    const cv = CONTENT.cv;
    const lines = [
      'RANA YASER — CURRICULUM VITAE SUMMARY',
      'Personal Brand: "Beauty & Brains" — Technology meets creativity',
      '================================================================', '',
      'EDUCATION', ...cv.education, '',
      'EXPERIENCE & LEADERSHIP', ...cv.experience.map((x) => `• ${x[0]} — ${x[1]}`), '',
      'SELECTED PROJECTS', ...cv.projects.map((x, i) => `${RY.pad(i + 1)}. ${x[0]} — ${x[1]}`), '',
      'SKILLS TOOLBOX',
      ...CONTENT.clusters.map((c) => `• ${c.title}: ${SKILLS_DATA[c.key].map((s) => s.name).join(', ')}`), '',
      `Email: ${CONTENT.email}`, `LinkedIn: ${CONTENT.linkedin.href}`, `X: ${CONTENT.x.href}`
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Rana_Yaser_CV_Summary.txt';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  document.addEventListener('click', (e) => { if (e.target.closest('[data-download-cv]')) RY.downloadCV(); });

  /* ---------- Idea jar ---------- */
  let ideaN = 0;
  RY.nextIdea = () => { ideaN += 1; return { n: ideaN, text: CONTENT.ideas[ideaN % CONTENT.ideas.length] }; };

  /* ---------- Theme (light / dark) with a circular reveal ---------- */
  RY.bindTheme = (btn, storeKey) => {
    if (!btn) return;
    const root = document.documentElement;
    const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : mq('(prefers-color-scheme: dark)').matches;
    const sync = () => { btn.setAttribute('aria-pressed', String(isDark())); btn.dispatchEvent(new CustomEvent('theme:change', { detail: { dark: isDark() } })); };
    sync();
    btn.addEventListener('click', () => {
      const apply = () => {
        root.dataset.theme = isDark() ? 'light' : 'dark';
        try { localStorage.setItem(storeKey, root.dataset.theme); } catch (e) { /* storage blocked */ }
        sync();
      };
      if (!document.startViewTransition || RY.reduced()) { apply(); return; }
      const r = btn.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.classList.add('is-theming');
      const t = document.startViewTransition(apply);
      t.ready.then(() => root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] }, { duration: 760, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' })).catch(() => {});
      t.finished.finally(() => root.classList.remove('is-theming'));
    });
  };

  /* ---------- Mobile menu ---------- */
  RY.bindMenu = () => {
    const btn = RY.$('[data-menu-toggle]');
    const menu = RY.$('[data-menu]');
    if (!btn || !menu) return;
    const set = (open) => {
      menu.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('menu-open', open);
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    RY.$$('a', menu).forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
  };

  /* ---------- Small live details ---------- */
  RY.bindDetails = () => {
    RY.$$('[data-year]').forEach((n) => { n.textContent = String(new Date().getFullYear()); });
    const clocks = RY.$$('[data-clock]');
    if (clocks.length) {
      try {
        const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit' });
        const tick = () => clocks.forEach((c) => { c.textContent = fmt.format(new Date()); });
        tick(); setInterval(tick, 20000);
      } catch (e) { clocks.forEach((c) => { c.closest('[data-clock-wrap]')?.remove(); }); }
    }
  };

  /* ---------- Section-aware nav ---------- */
  RY.bindNav = () => {
    const links = RY.$$('[data-nav] a[href^="#"]');
    if (!links.length || !io) return;
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.removeAttribute('aria-current'));
        const a = map.get(e.target.id);
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((a, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  };

  /* ---------- Text slots: data-c="path" (text), data-c-html="path" (trusted HTML), data-ar="path" ---------- */
  const pick = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  RY.text = (path) => pick(CONTENT, path);
  RY.fill = (root = document) => {
    RY.$$('[data-c]', root).forEach((n) => { const v = pick(CONTENT, n.dataset.c); if (v != null) n.textContent = v; });
    RY.$$('[data-c-html]', root).forEach((n) => { const v = pick(CONTENT, n.dataset.cHtml); if (v != null) n.innerHTML = v; });
    RY.$$('[data-ar]', root).forEach((n) => {
      const v = pick(AR, n.dataset.ar);
      if (v == null) return;
      n.textContent = v;
      n.setAttribute('lang', 'ar');
      if (!n.hasAttribute('dir')) n.setAttribute('dir', 'rtl');
    });
  };

  RY.init = () => {
    RY.fill();
    RY.fillArt();
    RY.bindContact();
    RY.bindMenu();
    RY.bindDetails();
    RY.bindNav();
    RY.icons();
  };
})();
