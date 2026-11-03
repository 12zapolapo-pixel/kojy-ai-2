/* Rana Yaser portfolio — animated concept illustrations for the six projects.
   Each is a diagram of what the project does (not a screenshot). Colours come
   from --cv-* variables so every design can print them in its own palette. */
(function () {
  'use strict';
  const iso = (cx, cy, w, h, t) => {
    const top = `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
    const left = `${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + t} ${cx - w},${cy + t}`;
    const right = `${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + t} ${cx},${cy + h + t}`;
    return { top, left, right };
  };
  const CX = 150;
  const slab = (i, cy, cls, label) => {
    const s = iso(CX, cy, 104, 44, 16);
    return `<g class="cv-slab ${cls}" style="--i:${i}">
      <polygon class="f-left" points="${s.left}"/><polygon class="f-right" points="${s.right}"/><polygon class="f-top" points="${s.top}"/>
      <g class="cv-slab-lines"><line x1="${CX - 52}" y1="${cy - 22}" x2="${CX + 10}" y2="${cy + 9}"/><line x1="${CX - 30}" y1="${cy - 33}" x2="${CX + 32}" y2="${cy - 2}"/></g>
      <line class="cv-lead" x1="${CX + 108}" y1="${cy}" x2="${CX + 128}" y2="${cy}"/>
      <text x="${CX + 134}" y="${cy + 4}">${label}</text>
    </g>`;
  };

  const COVERS = {
    /* Jeddah Food Fest — RTL React dashboard, bars grow, medal swings */
    'proj-01': () => `
      <rect class="cv-paper" x="0" y="0" width="400" height="250"/>
      <g class="cv-win">
        <rect class="cv-screen" x="22" y="18" width="356" height="214" rx="10"/>
        <path class="cv-ffbar" d="M32 18 h336 a10 10 0 0 1 10 10 v14 h-356 v-14 a10 10 0 0 1 10 -10 z"/>
        <circle cx="38" cy="30" r="3.5" class="cv-dotw"/><circle cx="50" cy="30" r="3.5" class="cv-dotw"/><circle cx="62" cy="30" r="3.5" class="cv-dotw"/>
        <text x="364" y="34" text-anchor="end" class="cv-onff" lang="ar">مهرجان جدة للأكل</text>
        <path class="cv-ffside" d="M300 42 h78 v180 a10 10 0 0 1 -10 10 h-68 z"/>
        <rect class="cv-ffon" x="310" y="58" width="58" height="13" rx="4"/>
        <rect class="cv-ffoff" x="318" y="80" width="50" height="9" rx="3"/>
        <rect class="cv-ffoff" x="326" y="98" width="42" height="9" rx="3"/>
        <g class="cv-cards">
          <rect x="36" y="56" width="76" height="40" rx="6"/><rect x="122" y="56" width="76" height="40" rx="6"/><rect x="208" y="56" width="78" height="40" rx="6"/>
          <rect class="cv-ffon" x="46" y="78" width="36" height="7" rx="3"/><rect class="cv-ffon" x="132" y="78" width="46" height="7" rx="3"/><rect class="cv-ffon" x="218" y="78" width="28" height="7" rx="3"/>
          <rect class="cv-ffoff" x="46" y="66" width="52" height="5" rx="2"/><rect class="cv-ffoff" x="132" y="66" width="52" height="5" rx="2"/><rect class="cv-ffoff" x="218" y="66" width="52" height="5" rx="2"/>
        </g>
        <line class="cv-base" x1="36" y1="214" x2="286" y2="214"/>
        ${[58, 86, 44, 104, 76, 112, 66].map((h, i) => `<rect class="cv-bar" style="--i:${i}" x="${44 + i * 34}" y="${214 - h}" width="20" height="${h}" rx="3"/>`).join('')}
        <g class="cv-medal"><path class="cv-ribbon" d="M330 160 l-10 30 l12 -6 l6 12 l6 -28 z M350 160 l10 30 l-12 -6 l-6 12 l-6 -28 z"/><circle cx="340" cy="158" r="20"/><text x="340" y="162" text-anchor="middle" class="cv-medal-t">1st</text></g>
      </g>`,

    /* Tamkeen — campus map, accessible route draws from the gate to FCIT */
    'proj-02': () => `
      <rect class="cv-paper" x="0" y="0" width="400" height="250"/>
      <g class="cv-streets"><path d="M0 84 H400 M0 168 H400 M124 0 V250 M276 0 V250"/></g>
      <g class="cv-blocks">
        <rect x="18" y="18" width="88" height="50" rx="6"/><rect x="292" y="18" width="90" height="50" rx="6"/>
        <rect x="142" y="100" width="116" height="52" rx="6"/><rect x="292" y="184" width="90" height="48" rx="6"/><rect x="142" y="184" width="116" height="48" rx="6"/>
      </g>
      <g class="cv-trees">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${160 + i * 20}" cy="120" r="6" style="--i:${i}"/>`).join('')}</g>
      <rect class="cv-place cv-place-a" x="142" y="18" width="116" height="50" rx="6"/><text x="176" y="47" text-anchor="middle">FCIT</text>
      <rect class="cv-place" x="292" y="100" width="90" height="52" rx="6"/><text x="337" y="130" text-anchor="middle">Library</text>
      <rect class="cv-place" x="18" y="184" width="88" height="48" rx="6"/><text x="62" y="212" text-anchor="middle">Gate</text>
      <path class="cv-route-shadow" d="M106 208 H124 V84 H226 V66"/>
      <path class="cv-route" pathLength="1" d="M106 208 H124 V84 H226 V66"/>
      <circle class="cv-here" cx="106" cy="208" r="5"/><circle class="cv-here-ring" cx="106" cy="208" r="5"/>
      <g class="cv-pin"><path d="M226 20 c-9 0 -15 7 -15 15 c0 11 15 25 15 25 s15 -14 15 -25 c0 -8 -6 -15 -15 -15 z"/><circle cx="226" cy="35" r="5" class="cv-pin-dot"/></g>
      <g class="cv-north"><path d="M372 222 l6 -16 l6 16 l-6 -4 z"/><text x="378" y="242" text-anchor="middle" class="cv-small">N</text></g>`,

    /* A-Closet — wardrobe rail, garments sway, AI picks an outfit */
    'proj-03': () => {
      const xs = [50, 96, 142, 188, 234];
      const garments = [
        (x) => `<path class="cv-g1" d="M${x - 12} 66 h24 l12 70 h-48 z"/>`,
        (x) => `<path class="cv-g2" d="M${x - 16} 66 h32 l8 14 l-8 4 v52 h-32 v-52 l-8 -4 z"/>`,
        (x) => `<path class="cv-g3" d="M${x - 17} 66 h34 v70 h-34 z M${x} 66 v40 M${x - 8} 66 l8 18 l8 -18"/>`,
        (x) => `<path class="cv-g4" d="M${x - 14} 66 h28 l4 40 h-10 l-4 30 h-8 l-4 -30 h-10 z"/>`,
        (x) => `<path class="cv-g1" d="M${x - 15} 66 h30 l6 16 l-6 2 v52 h-30 v-52 l-6 -2 z"/>`
      ];
      return `
      <rect class="cv-paper" x="0" y="0" width="400" height="250"/>
      <line class="cv-rail" x1="22" y1="42" x2="262" y2="42"/><circle class="cv-railend" cx="22" cy="42" r="5"/><circle class="cv-railend" cx="262" cy="42" r="5"/>
      ${xs.map((x, i) => `<g class="cv-hang" style="--i:${i};transform-origin:${x}px 42px">
          <path class="ln" d="M${x} 42 v8 M${x - 18} 64 L${x} 50 L${x + 18} 64 Z"/>${garments[i](x)}</g>`).join('')}
      <g class="cv-links">${xs.filter((_, i) => i % 2 === 0).map((x) => `<path class="cv-flow" d="M${x} 140 C ${x} 175, 150 170, 150 200"/>`).join('')}</g>
      <g class="cv-ai"><circle cx="150" cy="206" r="18"/><path class="cv-spark" d="M150 194 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 l9 -3 z"/></g>
      <path class="cv-flow" d="M168 206 C 210 206, 220 150, 268 150"/>
      <g class="cv-outfit"><rect x="268" y="118" width="112" height="112" rx="10"/>
        <path class="cv-g2" d="M300 138 h22 l6 10 l-6 3 v26 h-22 v-26 l-6 -3 z"/><path class="cv-g4" d="M302 182 h18 l3 30 h-8 l-2 -18 l-2 18 h-8 z"/><rect class="cv-g3" x="338" y="170" width="26" height="22" rx="4"/><path class="ln" d="M343 170 q8 -12 16 0"/>
        <text x="324" y="133" text-anchor="middle" class="cv-small">Club Day</text></g>`;
    },

    /* Custom Fashion Platform — designer ↔ store ↔ launch, with flowing links */
    'proj-04': () => `
      <rect class="cv-paper" x="0" y="0" width="400" height="250"/>
      <path class="cv-arc" d="M110 108 C 134 66, 160 66, 184 108"/><path class="cv-arc" d="M184 142 C 160 184, 134 184, 110 142"/>
      <path class="cv-arc" d="M259 108 C 274 74, 288 74, 303 108"/>
      <path class="cv-flowline" d="M110 108 C 134 66, 160 66, 184 108"/><path class="cv-flowline" d="M184 142 C 160 184, 134 184, 110 142"/><path class="cv-flowline" d="M259 108 C 274 74, 288 74, 303 108"/>
      <g class="cv-node" style="--i:0"><circle cx="72" cy="125" r="40"/>
        <path class="ln" d="M56 140 l26 -30 l6 6 l-26 30 h-6 z M80 112 l6 6"/><path class="ln cv-thread" d="M54 146 c10 6 24 4 30 -4"/>
        <text x="72" y="188" text-anchor="middle">Designer</text></g>
      <g class="cv-node" style="--i:1"><circle cx="221" cy="125" r="40"/>
        <path class="cv-awning" d="M197 110 h48 l-4 12 h-40 z"/><path class="ln" d="M201 122 v20 h40 v-20 M215 142 v-12 h12 v12"/>
        <text x="221" y="188" text-anchor="middle">Store</text></g>
      <g class="cv-node" style="--i:2"><circle cx="340" cy="125" r="40"/>
        <path class="cv-bag" d="M324 116 h32 l3 32 h-38 z"/><path class="ln" d="M332 116 v-5 a8 8 0 0 1 16 0 v5"/>
        <text x="340" y="188" text-anchor="middle">Launch</text></g>
      <text x="200" y="232" text-anchor="middle" class="cv-small">Independent designer ↔ brand</text>`,

    /* AI Academic Search — query types, verified results slide in */
    'proj-05': () => `
      <rect class="cv-paper" x="0" y="0" width="400" height="250"/>
      <rect class="cv-search" x="28" y="22" width="344" height="36" rx="18"/>
      <circle class="ln" cx="48" cy="40" r="7"/><path class="ln" d="M53 45 l6 6"/>
      <text x="66" y="44" class="cv-query">Layered software architecture…</text><rect class="cv-caret" x="252" y="31" width="2" height="18"/>
      ${[0, 1, 2].map((i) => `<g class="cv-result" style="--i:${i}">
        <rect x="28" y="${74 + i * 54}" width="236" height="44" rx="8"/>
        <rect class="cv-line1" x="42" y="${86 + i * 54}" width="${150 - i * 24}" height="7" rx="3"/>
        <rect class="cv-line2" x="42" y="${100 + i * 54}" width="${110 + i * 16}" height="5" rx="2"/>
        <rect class="cv-cal" x="200" y="${84 + i * 54}" width="18" height="16" rx="3"/><path class="ln" d="M200 ${89 + i * 54} h18"/>
        <circle class="cv-ok" cx="244" cy="${96 + i * 54}" r="10"/><path class="cv-tick" pathLength="1" d="M239 ${96 + i * 54} l4 4 l7 -8"/>
      </g>`).join('')}
      <g class="cv-chat"><path d="M282 74 h88 a8 8 0 0 1 8 8 v74 a8 8 0 0 1 -8 8 h-60 l-14 14 v-14 h-14 a8 8 0 0 1 -8 -8 v-74 a8 8 0 0 1 8 -8 z"/>
        <circle class="cv-bot" cx="312" cy="98" r="11"/><circle cx="308" cy="96" r="1.8" class="cv-eye"/><circle cx="316" cy="96" r="1.8" class="cv-eye"/>
        <rect class="cv-line2" x="294" y="118" width="70" height="5" rx="2"/><rect class="cv-line2" x="294" y="128" width="56" height="5" rx="2"/>
        <g class="cv-typing"><circle cx="300" cy="148" r="3"/><circle cx="310" cy="148" r="3"/><circle cx="320" cy="148" r="3"/></g></g>
      <text x="282" y="210" class="cv-small">✓ Peer-reviewed</text><text x="282" y="226" class="cv-small">✓ Date verified</text>`,

    /* Law Firm Consultation System — layered architecture, exploded isometric view */
    'proj-06': () => `
      <rect class="cv-paper" x="0" y="0" width="400" height="250"/>
      <g class="cv-packets"><circle cx="150" cy="70" r="4" style="--i:0"/><circle cx="150" cy="70" r="4" style="--i:1"/><circle cx="150" cy="70" r="4" style="--i:2"/></g>
      ${slab(2, 186, 'cv-l3', 'Data Access')}
      ${slab(1, 128, 'cv-l2', 'Business / Service')}
      ${slab(0, 70, 'cv-l1', 'Presentation')}`
  };

  RY.cover = (id, label) => {
    const draw = COVERS[id];
    if (!draw) return '';
    const p = PROJECTS_DATA.find((x) => x.id === id);
    return `<svg class="cv cv-${id}" viewBox="0 0 400 250" role="img" aria-label="${RY.esc(label || `Concept illustration: ${p ? p.title : ''}`)}" focusable="false">${draw()}</svg>`;
  };

  /* Play the illustrations while they are on screen; replay on hover */
  const live = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      e.target.classList.toggle('is-live', e.isIntersecting);
      if (e.isIntersecting) e.target.classList.add('is-play');
    });
  }, { threshold: 0.25 }) : null;
  RY.playCovers = (root = document) => {
    RY.$$('svg.cv:not([data-cv-bound])', root).forEach((svg) => {
      svg.dataset.cvBound = '1';
      if (live && !RY.reduced()) live.observe(svg); else svg.classList.add('is-play', 'is-live');
      const host = svg.closest('[data-cover-host]') || svg;
      host.addEventListener('pointerenter', () => {
        if (RY.reduced()) return;
        svg.classList.remove('is-play');
        void svg.getBoundingClientRect();
        svg.classList.add('is-play');
      });
    });
  };
})();
