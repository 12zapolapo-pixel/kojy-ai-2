import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Laptop, PenTool, MousePointerClick, Megaphone, Camera, Gamepad2,
  Ribbon, Bot, SwatchBook, FlaskConical, Cpu, Palette, Users
} from 'lucide-react';
import { RY, C, A, CATS, PROJECTS, ROLES, SKILLS, INTERESTS, REL, pad, countBy, splitTitle } from './lib.js';
import { SectionHead, Pills, Cover, Pic } from './ui.jsx';

const ICONS = {
  laptop: Laptop, 'pen-tool': PenTool, 'mouse-pointer-click': MousePointerClick, megaphone: Megaphone, camera: Camera,
  'gamepad-2': Gamepad2, ribbon: Ribbon, bot: Bot, 'swatch-book': SwatchBook, 'flask-conical': FlaskConical,
  cpu: Cpu, palette: Palette, users: Users
};
const Icon = ({ name, size = 18 }) => { const I = ICONS[name] || Laptop; return <I size={size} strokeWidth={1.6} aria-hidden="true" />; };
const Eyebrow = ({ children, className = '' }) => <p className={`font-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-mint ${className}`}>{children}</p>;
const useObserve = (deps) => { useEffect(() => { RY.observe(); RY.playCovers(); }, deps); }; // eslint-disable-line react-hooks/exhaustive-deps

/* ---------------- About ---------------- */
function Interests() {
  const [i, setI] = useState(0);
  const it = C.interests[i];
  const d = INTERESTS[i];
  const pics = RY.related(REL.interests[i]);
  const onKey = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? C.interests.length - 1 : (i + (e.key === 'ArrowDown' ? 1 : -1) + C.interests.length) % C.interests.length;
    setI(n);
    document.getElementById(`int-tab-${n}`).focus();
  };
  useEffect(() => { RY.playCovers(); }, [i]);
  return (
    <div className="mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-inter text-[26px] font-extrabold uppercase tracking-tight md:text-[34px]">{C.interestsTitle}<span className="text-mint">.</span></h3>
        <p lang="ar" dir="rtl" className="font-arabic text-lg text-white/50">{A.interests}</p>
        <p className="w-full text-[14px] text-white/55">{C.interestsIntro}</p>
      </div>
      <div className="liquid-glass grid overflow-hidden rounded-3xl md:grid-cols-[290px_1fr]" data-reveal>
        <div className="border-b border-white/10 p-3 md:border-b-0 md:border-r" role="tablist" aria-label="Interests" aria-orientation="vertical">
          <div className="flex items-center gap-1.5 px-3 pb-3 pt-1" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
            <span className="ml-3 font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">interests</span>
          </div>
          {C.interests.map((x, k) => (
            <button key={x[1]} id={`int-tab-${k}`} type="button" role="tab" aria-selected={k === i} aria-controls="int-panel" tabIndex={k === i ? 0 : -1}
              onClick={() => setI(k)} onKeyDown={onKey}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] transition-colors ${k === i ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:bg-white/[0.04] hover:text-white'}`}>
              <span className={k === i ? 'text-mint' : ''}><Icon name={x[0]} /></span>{x[1]}
            </button>
          ))}
        </div>
        <div id="int-panel" key={i} role="tabpanel" aria-labelledby={`int-tab-${i}`} className="panel-in grid gap-8 p-6 md:p-9 xl:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>{d.tag}</Eyebrow>
            <h4 className="mt-3 font-inter text-[28px] font-extrabold uppercase leading-tight tracking-tight md:text-[34px]">{it[1]}<span className="text-mint">.</span></h4>
            <p className="mt-3 font-serif text-xl italic text-white/75">{it[2]}</p>
            <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.75] text-white/75">{d.desc}</p>
            <p className="mt-5 text-[12.5px] text-white/45">{d.connection}</p>
          </div>
          <div className="flex flex-wrap content-start gap-3 xl:w-[300px]">
            {pics.map((p) => <Pic key={p.id} item={p} className={p.kind === 'project' ? 'w-full max-w-[300px]' : 'w-[140px]'} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const [trait, setTrait] = useState(-1);
  useObserve([]);
  return (
    <section id="about" aria-labelledby="about-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <SectionHead id="about-h" eyebrow={C.aboutLabel} title={C.aboutTitle} ar="about">
        <p className="font-serif text-[26px] italic text-white/85">{C.hello}</p>
        <Eyebrow className="mt-2">{C.helloTag}</Eyebrow>
      </SectionHead>
      <div className="grid gap-10 lg:grid-cols-4">
        <div className="grid content-start gap-5 text-[17px] leading-[1.75] text-white/70 lg:col-span-2 [&_strong]:font-semibold [&_strong]:text-white">
          <p className="font-inter text-[22px] font-semibold leading-snug text-white" data-reveal>{C.lede}</p>
          {C.aboutParas.map((p, k) => <p key={k} data-reveal style={{ '--i': k }} dangerouslySetInnerHTML={{ __html: p }} />)}
        </div>
        <div className="grid content-start gap-5 lg:col-span-2">
          <blockquote className="liquid-glass rounded-3xl p-7 md:p-10" data-reveal>
            <span className="block font-serif text-[30px] italic leading-[1.15] md:text-[38px]">“{C.aboutQuote}”</span>
            <Eyebrow className="mt-6">— {C.name}</Eyebrow>
          </blockquote>
          <div className="liquid-glass rounded-3xl p-6 md:p-8" data-reveal style={{ '--i': 1 }}>
            <p className="text-[13px] text-white/55">{C.traitsIntro}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {C.traits.map((t, k) => (
                <li key={t[0]}><button type="button" aria-pressed={k === trait} onClick={() => setTrait(k)}
                  className={`rounded-full border px-3.5 py-2 text-[13px] transition-colors ${k === trait ? 'border-mint bg-mint text-ink' : 'border-white/15 text-white/80 hover:border-mint hover:text-mint'}`}>{t[0]}</button></li>
              ))}
            </ul>
            <p key={trait} aria-live="polite" className="panel-in mt-5 min-h-[3.4em] font-serif text-[20px] italic leading-snug text-white/85">
              {trait < 0 ? C.heroQuote : <><span className="font-inter text-[15px] font-bold not-italic text-mint">{C.traits[trait][0]}.</span> {C.traits[trait][1]}</>}
            </p>
          </div>
        </div>
      </div>
      <Interests />
    </section>
  );
}

/* ---------------- Close-up plate ---------------- */
export function Plate({ i }) {
  const d = REL.details[i];
  const a = RY.byId(d.art);
  return (
    <div className="gutter mx-auto max-w-content pt-24 md:pt-32">
      <a href="#archive" data-open-art={d.art} data-reveal aria-label={`Close-up of No. ${pad(RY.number(d.art))}, ${a.title} — open the full piece`}
        className="plate group relative block h-[46vw] max-h-[540px] min-h-[260px] overflow-hidden rounded-[32px]">
        <span className="crop absolute inset-0 block" style={{ '--x': `${d.x}%`, '--y': `${d.y}%`, '--z': d.zoom }}><img src={a.src} alt="" /></span>
        <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <span className="liquid-glass absolute bottom-4 left-4 right-4 rounded-2xl px-5 py-4 md:bottom-6 md:left-6 md:right-auto md:max-w-[460px]">
          <Eyebrow>Close-up · No. {pad(RY.number(d.art))}</Eyebrow>
          <span className="mt-1 block font-inter text-[20px] font-extrabold uppercase tracking-tight md:text-[24px]">{d.caption}<span className="text-mint">.</span></span>
          <span className="mt-1 block text-[13px] text-white/60">{a.title}</span>
        </span>
      </a>
    </div>
  );
}

/* ---------------- Work (archive) ---------------- */
export function Work() {
  const [cat, setCat] = useState('all');
  const list = RY.filterWorks(cat);
  useEffect(() => { RY.currentList = () => RY.filterWorks(cat); }, [cat]);
  useObserve([cat]);
  return (
    <section id="archive" aria-labelledby="work-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <SectionHead id="work-h" eyebrow="Design archive · 16 works" title={C.archiveTitle} ar="archive">
        <p className="text-[15px] leading-[1.75] text-white/70">{C.archiveIntro}</p>
        <p className="mt-4 font-serif text-[20px] italic text-mint">“{C.archiveQuote}”</p>
      </SectionHead>
      <div className="mb-8 grid gap-4">
        <Pills items={C.filters} value={cat} onChange={setCat} count={RY.count} label="Filter the archive" />
        <p aria-live="polite" className="min-h-[1.6em] text-[14px] text-white/55 [&_strong]:text-white" dangerouslySetInnerHTML={{ __html: CATS[cat] || CATS.all }} />
      </div>
      <ul key={cat} className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
        {list.map((a, i) => (
          <li key={a.id} className="card-in mb-5 break-inside-avoid" style={{ '--i': Math.min(i, 10) }}>
            <button type="button" data-open-art={a.id} data-open-list="filtered" aria-label={`Open No. ${pad(RY.number(a.id))}: ${a.title}`}
              className="art-card liquid-glass group block w-full overflow-hidden rounded-3xl p-2 text-left">
              <span className="relative block overflow-hidden rounded-[18px]">
                <img src={a.src} alt={a.title} loading="lazy" decoding="async" width={Math.round(RY.ratio(a) * 1000)} height="1000" className="block h-auto w-full" />
                <span className="art-meta absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 pt-16">
                  <span className="block font-jakarta text-[10.5px] font-bold uppercase tracking-[0.18em] text-mint">No. {pad(RY.number(a.id))} · {RY.size(a)}</span>
                  <span lang="ar" dir="rtl" className="mt-1 block font-arabic text-[14px] text-white/85">{a.arabicTitle}</span>
                </span>
              </span>
              <span className="flex items-start justify-between gap-3 px-2.5 pb-2 pt-3">
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-white/45">{a.org}</span>
                  <span className="mt-1 block text-[15px] font-semibold leading-snug">{a.title}</span>
                </span>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-white/40 transition-colors group-hover:text-mint" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Projects ---------------- */
export function Projects() {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? PROJECTS : PROJECTS.filter((p) => p.type === cat);
  useObserve([cat]);
  return (
    <section id="projects" aria-labelledby="projects-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <SectionHead id="projects-h" eyebrow="Case studies · 6 projects" title={C.projectsTitle} ar="projects">
        <p className="text-[15px] leading-[1.75] text-white/70">{C.projectsIntro}</p>
        <div className="mt-5"><Pills items={C.projFilters} value={cat} onChange={setCat} count={countBy(PROJECTS, 'type')} label="Filter projects" /></div>
      </SectionHead>
      <div key={cat} className="grid gap-5 md:grid-cols-2">
        {list.map((p, i) => {
          const feature = p.id === 'proj-01' && cat === 'all';
          return (
            <article key={p.id} data-cover-host className={`liquid-glass card-in grid overflow-hidden rounded-3xl ${feature ? 'md:col-span-2 lg:grid-cols-[1.1fr_1fr]' : ''}`} style={{ '--i': i }}>
              <div className="p-2"><Cover id={p.id} className="overflow-hidden rounded-[18px] border border-white/5" /></div>
              <div className="grid content-start gap-4 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-inter text-[40px] font-extrabold leading-none text-white/15 tabular" aria-hidden="true">{p.number}</span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/60">{RY.typeLabel(p.type)}</span>
                  <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] ${p.type === 'prototype' ? 'border-mint text-mint' : 'border-white/15 text-white/60'}`}>{p.statusBadge}</span>
                </div>
                <h3 className="font-inter text-[28px] font-extrabold uppercase leading-none tracking-tight md:text-[34px]">{p.title}<span className="text-mint">.</span></h3>
                <p className="font-serif text-[20px] italic text-white/75">{p.subtitle}</p>
                <p className="text-[15px] leading-[1.7] text-white/70">{p.summary}</p>
                <ul className="p-features grid gap-1.5 text-[14px]">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <p className="text-[12px] text-white/45">{p.focusTags.join(' · ')}</p>
                <button type="button" data-open-project={p.id} className="group inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-white/20 px-5 text-[12px] font-bold uppercase tracking-wide transition-colors hover:border-mint hover:text-mint">
                  Open case study <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Journey ---------------- */
export function Journey() {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? ROLES : ROLES.filter((x) => x.category === cat);
  const olRef = useRef(null);
  useObserve([cat]);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      raf = 0;
      const el = olRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tl', Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / Math.max(1, r.height))).toFixed(4));
    };
    const sched = () => { if (!raf) raf = requestAnimationFrame(on); };
    window.addEventListener('scroll', sched, { passive: true });
    on();
    return () => { window.removeEventListener('scroll', sched); cancelAnimationFrame(raf); };
  }, []);
  const [head, last, punct] = splitTitle(C.journeyTitle);
  return (
    <section id="experience" aria-labelledby="exp-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <div className="grid gap-10 lg:grid-cols-4">
        <div className="self-start lg:sticky lg:top-28">
          <Eyebrow className="mb-4">{C.journeyLabel}</Eyebrow>
          <h2 id="exp-h" className="font-inter text-[36px] font-extrabold uppercase leading-[0.98] tracking-tight md:text-[44px]">
            {head}<em className="font-serif font-normal normal-case italic tracking-normal">{last}</em><span className="text-mint">{punct}</span>
          </h2>
          <p lang="ar" dir="rtl" className="mt-3 w-fit font-arabic text-xl text-white/50">{A.journey}</p>
          <p className="mt-6 text-[15px] leading-[1.75] text-white/70 [&_strong]:text-white" dangerouslySetInnerHTML={{ __html: C.journeyIntro }} />
          <div className="mt-6"><Pills items={C.expFilters} value={cat} onChange={setCat} count={countBy(ROLES, 'category')} label="Filter roles" /></div>
        </div>
        <ol ref={olRef} key={cat} className="relative grid gap-5 lg:col-span-3">
          <span aria-hidden="true" className="timeline-line absolute bottom-0 left-[9px] top-2 w-px overflow-hidden bg-white/10" />
          {list.map((x, i) => (
            <li key={x.org + x.role} className="card-in relative pl-10" style={{ '--i': i }}>
              <span aria-hidden="true" className="absolute left-[3px] top-8 h-[13px] w-[13px] rounded-full border-2 border-mint bg-ink shadow-[0_0_14px_rgba(94,210,156,0.6)]" />
              <article className="liquid-glass grid gap-6 rounded-3xl p-6 md:grid-cols-[1fr_auto] md:p-8">
                <div>
                  <Eyebrow>{x.badge}</Eyebrow>
                  <h3 className="mt-2 font-inter text-[22px] font-extrabold uppercase tracking-tight md:text-[26px]">{x.org}</h3>
                  <p className="font-serif text-[24px] italic text-white/80">{x.role}</p>
                  <p className="mt-4 text-[15px] font-semibold text-white/85">{x.summary}</p>
                  <p className="mt-2 text-[15px] leading-[1.7] text-white/65">{x.details}</p>
                  {x.relatedArtId && (
                    <button type="button" data-open-art={x.relatedArtId} className="mt-4 inline-flex min-h-[40px] items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-mint hover:underline">
                      {x.relatedArtLabel}<ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
                {x.relatedArtId && <div className="w-[130px]"><Pic item={{ kind: 'art', id: x.relatedArtId }} /></div>}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
export function Skills() {
  const [cluster, setCluster] = useState('all');
  const [sel, setSel] = useState(null);
  const s = sel ? SKILLS[sel.k][sel.i] : null;
  const pics = s ? RY.related(REL.skills[s.name]) : [];
  useObserve([]);
  useEffect(() => { RY.playCovers(); }, [sel]);
  const total = Object.values(SKILLS).flat().length;
  return (
    <section id="skills" aria-labelledby="skills-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <SectionHead id="skills-h" eyebrow={C.skillsLabel} title={C.skillsTitle} ar="skills">
        <p className="text-[15px] leading-[1.75] text-white/70">{C.skillsIntro}</p>
        <div className="mt-5">
          <Pills items={[['all', 'All']].concat(C.clusters.map((c) => [c.key, c.title]))} value={cluster} onChange={setCluster}
            count={(k) => (k === 'all' ? total : SKILLS[k].length)} label="Show skill group" />
        </div>
      </SectionHead>
      <div className="grid gap-5 lg:grid-cols-3">
        {C.clusters.map((c, ci) => (
          <div key={c.key} data-reveal style={{ '--i': ci }} className={`liquid-glass rounded-3xl p-6 transition-opacity duration-500 md:p-8 ${cluster !== 'all' && cluster !== c.key ? 'opacity-30' : ''}`}>
            <p className="flex items-center gap-2 font-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-mint"><Icon name={c.icon} size={16} />{c.tag}</p>
            <h3 className="mt-3 font-inter text-[24px] font-extrabold uppercase tracking-tight">{c.title}<span className="text-mint">.</span></h3>
            <p className="mt-2 text-[14px] text-white/60">{c.desc}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SKILLS[c.key].map((sk, i) => {
                const on = sel && sel.k === c.key && sel.i === i;
                return (
                  <li key={sk.name}><button type="button" aria-pressed={!!on} onClick={() => setSel({ k: c.key, i })}
                    className={`rounded-full border px-3.5 py-2 text-[13px] transition-colors ${on ? 'border-mint bg-mint text-ink' : 'border-white/15 text-white/80 hover:border-mint hover:text-mint'}`}>{sk.name}</button></li>
                );
              })}
            </ul>
            <p className="mt-6 font-serif text-[18px] italic text-white/55">“{c.quote}”</p>
          </div>
        ))}
      </div>
      <div aria-live="polite" className="liquid-glass mt-5 grid gap-6 rounded-3xl p-6 md:p-8 lg:grid-cols-[1fr_auto]">
        <div key={s ? s.name : 'none'} className="panel-in">
          <Eyebrow>Where I’ve used it</Eyebrow>
          <h4 className="mt-2 font-inter text-[30px] font-extrabold uppercase tracking-tight">{s ? s.name : C.skillsEmpty[0]}<span className="text-mint">.</span></h4>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-white/70">{s ? s.note : C.skillsEmpty[1]}</p>
          <a href="#archive" className="mt-5 inline-flex min-h-[40px] items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-mint hover:underline">See the work <ArrowUpRight size={14} /></a>
        </div>
        <div key={(s ? s.name : 'none') + '-pics'} className="panel-in flex flex-wrap content-start gap-3 lg:max-w-[560px] lg:justify-end">
          {pics.map((p) => <Pic key={p.id} item={p} className={p.kind === 'project' ? 'w-full max-w-[320px]' : 'w-[120px]'} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Beyond ---------------- */
const SPANS = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-4', 'md:col-span-3', 'md:col-span-3'];
export function Beyond({ onIdea }) {
  useObserve([]);
  return (
    <section id="beyond" aria-labelledby="beyond-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <SectionHead id="beyond-h" eyebrow={C.beyondLabel} title={C.beyondTitle} ar="beyond">
        <p className="text-[15px] leading-[1.75] text-white/70">{C.beyondIntro}</p>
      </SectionHead>
      <div className="grid gap-5 md:grid-cols-6">
        {C.beyond.map((b, i) => {
          const pics = RY.related(REL.beyond[i]);
          return (
            <article key={b.title} data-reveal style={{ '--i': i % 3 }} className={`liquid-glass grid content-start gap-4 rounded-3xl p-6 md:p-8 ${SPANS[i]}`}>
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 text-mint"><Icon name={b.icon} /></span>
                <Eyebrow>{b.tag}</Eyebrow>
              </div>
              <h3 className="font-inter text-[20px] font-extrabold uppercase tracking-tight">{b.title}</h3>
              <p className="text-[15px] leading-[1.7] text-white/70 [&_em]:font-serif [&_em]:text-[17px] [&_em]:text-white" dangerouslySetInnerHTML={{ __html: b.text }} />
              {b.swatches && (
                <div className="grid grid-cols-5 gap-2" role="img" aria-label={b.swatches.map((w) => w[1]).join(', ')}>
                  {b.swatches.map((w) => <span key={w[0]} className="grid gap-1.5 text-[11px] text-white/50"><span className="h-14 rounded-xl border border-white/10" style={{ background: w[0] }} />{w[1]}</span>)}
                </div>
              )}
              {b.foot && <p className="font-serif text-[19px] italic text-mint">{b.foot}</p>}
              {pics.length > 0 && <div className="flex flex-wrap gap-3">{pics.map((p) => <Pic key={p.id} item={p} className={p.kind === 'project' ? 'w-full max-w-[380px]' : 'w-[130px]'} />)}</div>}
              {b.idea && (
                <button type="button" onClick={onIdea} className="group inline-flex min-h-[46px] w-fit items-center gap-2 rounded-full bg-mint px-5 text-[12px] font-bold uppercase tracking-wide text-ink">
                  {b.idea.replace(/\s*→$/, '')}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [head, last, punct] = splitTitle(C.contactTitle);
  const [user, domain] = C.email.split('@');
  const openCV = () => RY.openOverlay(document.getElementById('cv'));
  const field = 'w-full rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[16px] text-white placeholder:text-white/35 transition-colors focus:border-mint focus:outline-none';
  return (
    <section id="contact" aria-labelledby="contact-h" className="gutter mx-auto max-w-content pt-28 md:pt-40">
      <div className="grid gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Eyebrow className="mb-4">{C.contactLabel}</Eyebrow>
          <h2 id="contact-h" className="font-inter text-[36px] font-extrabold uppercase leading-[0.98] tracking-tight md:text-[52px] lg:text-[60px]">
            {head}<em className="font-serif font-normal normal-case italic tracking-normal">{last}</em><span className="text-mint">{punct}</span>
          </h2>
          <p lang="ar" dir="rtl" className="mt-3 w-fit font-arabic text-xl text-white/50">{A.contact}</p>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.75] text-white/70">{C.contactIntro}</p>
          <p className="mt-5 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.16em] text-white/60"><span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_10px_#5ed29c]" />{C.contactStatus}</p>
          <a href={`mailto:${C.email}`} className="mt-8 block break-words font-inter text-[26px] font-extrabold tracking-tight transition-colors hover:text-mint md:text-[40px]">{user}@<wbr />{domain}</a>
          <ul className="mt-8 border-t border-white/10">
            {[
              ['Email', <span key="e">{C.email}</span>, C.email, 'Email'],
              ['LinkedIn', <a key="l" href={C.linkedin.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 hover:text-mint">{C.linkedin.label}</a>, C.linkedin.href, 'LinkedIn link'],
              ['X', <a key="x" href={C.x.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 hover:text-mint">{C.x.label}</a>, C.x.href, 'X profile link']
            ].map(([k, v, copy, label]) => (
              <li key={k} className="grid grid-cols-[96px_1fr_auto] items-center gap-3 border-b border-white/10 py-2.5 text-[15px]">
                <span className="font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{k}</span>
                <span className="min-w-0 break-words">{v}</span>
                <button type="button" data-copy={copy} data-copy-label={label} className="min-h-[38px] rounded-full border border-white/15 px-4 text-[11px] font-bold uppercase tracking-wide transition-colors hover:border-mint hover:text-mint">Copy</button>
              </li>
            ))}
            <li className="grid grid-cols-[96px_1fr_auto] items-center gap-3 border-b border-white/10 py-2.5 text-[15px]">
              <span className="font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">CV</span>
              <span>Read or download</span>
              <button type="button" onClick={openCV} className="min-h-[38px] rounded-full bg-mint px-4 text-[11px] font-bold uppercase tracking-wide text-ink">Open</button>
            </li>
          </ul>
          <p data-copy-status role="status" aria-live="polite" className="mt-3 min-h-[1.4em] text-[13px] text-white/55" />
        </div>
        <form data-contact noValidate className="liquid-glass grid content-start gap-5 rounded-3xl p-6 md:p-9 lg:col-span-2">
          <h3 className="font-inter text-[24px] font-extrabold uppercase tracking-tight">Write to me<span className="text-mint">.</span></h3>
          <div className="grid gap-2">
            <label htmlFor="f-name" className="font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Your name</label>
            <input id="f-name" name="name" type="text" autoComplete="name" maxLength={80} placeholder="e.g. Sara Al-Harbi" aria-describedby="e-name" className={field} />
            <p id="e-name" data-err="name" className="err" hidden>Add your name so I know who’s writing.</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="f-topic" className="font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">What’s on your mind?</label>
            <select id="f-topic" name="topic" className={`${field} [&>option]:bg-ink`} defaultValue={C.topics[0][0]}>
              {C.topics.map((t) => <option key={t[0]} value={t[0]}>{t[1]}</option>)}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="f-msg" className="font-jakarta text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Message</label>
            <textarea id="f-msg" name="message" rows={5} maxLength={2000} placeholder="Tell me about your idea, project or team…" aria-describedby="e-msg" className={`${field} resize-y`} />
            <p id="e-msg" data-err="message" className="err" hidden>Write a short message first.</p>
          </div>
          <button type="submit" className="group inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-full bg-mint px-7 text-[13px] font-bold uppercase tracking-wide text-ink transition-[filter] hover:brightness-110">
            Open in my email app<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p data-form-status role="status" aria-live="polite" hidden className="rounded-2xl border border-mint/30 bg-mint/10 p-4 text-[14px] text-white/85" />
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="gutter mx-auto max-w-content pb-12 pt-28 md:pt-40" style={{ paddingBottom: 'max(48px, calc(24px + env(safe-area-inset-bottom, 0px)))' }}>
      <div className="liquid-glass grid items-end gap-6 rounded-3xl p-8 md:grid-cols-[1fr_auto] md:p-12">
        <div>
          <p className="font-inter text-[28px] font-extrabold uppercase tracking-tight md:text-[44px]">{C.footer}<span className="text-mint">.</span></p>
          <p className="mt-3 text-[14px] text-white/55">© <span data-year className="tabular">2026</span> {C.footerNote}</p>
          <p data-clock-wrap className="mt-1 text-[12px] text-white/40">Jeddah · <span data-clock className="tabular">--:--</span></p>
        </div>
        <a href="#top" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 px-5 text-[12px] font-bold uppercase tracking-wide transition-colors hover:border-mint hover:text-mint">Back to top ↑</a>
      </div>
    </footer>
  );
}
