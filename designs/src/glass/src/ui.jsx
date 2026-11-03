import { useEffect, useRef } from 'react';
import { RY, A, splitTitle, pad, PROJECTS } from './lib.js';

/* Section heading: Plus Jakarta eyebrow in mint, Inter ExtraBold uppercase title whose
   last word drops into Instrument Serif italic, with a mint full stop — the hero's rhythm. */
export function SectionHead({ id, eyebrow, title, ar, children, center = false }) {
  const [head, last, punct] = splitTitle(title);
  return (
    <div className={`grid gap-6 lg:grid-cols-4 lg:items-end mb-10 md:mb-14 ${center ? 'text-center' : ''}`}>
      <div className={center ? 'lg:col-span-4 justify-self-center' : 'lg:col-span-2'}>
        <p className="font-jakarta text-[11px] font-bold uppercase tracking-[0.22em] text-mint mb-4">{eyebrow}</p>
        <h2 id={id} className="font-inter font-extrabold uppercase tracking-tight text-[36px] leading-[0.98] md:text-[52px] lg:text-[60px]">
          {head}
          <em className="font-serif font-normal italic normal-case tracking-normal text-white/95">{last}</em>
          <span className="text-mint">{punct}</span>
        </h2>
        {ar && <p lang="ar" dir="rtl" className={`font-arabic mt-3 text-xl md:text-2xl text-white/50 ${center ? '' : 'w-fit'}`}>{A[ar] || ar}</p>}
      </div>
      {children && <div className={center ? 'lg:col-span-4' : 'lg:col-span-2'}>{children}</div>}
    </div>
  );
}

export function Pills({ items, value, onChange, count, label }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {items.map(([k, l]) => (
        <button
          key={k}
          type="button"
          data-k={k}
          aria-pressed={k === value}
          onClick={() => onChange(k)}
          className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors ${k === value ? 'border-mint bg-mint text-ink' : 'border-white/15 text-white/75 hover:border-white/40 hover:text-white'}`}
        >
          {l}
          {count && <span className={`tabular text-[11px] ${k === value ? 'text-ink/70' : 'text-white/45'}`}>{count(k)}</span>}
        </button>
      ))}
    </div>
  );
}

/* A concept illustration (SVG from the shared core) that plays while visible */
export function Cover({ id, className = '' }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) RY.playCovers(ref.current); }, [id]);
  return <div ref={ref} className={`cover-dark ${className}`} dangerouslySetInnerHTML={{ __html: RY.cover(id) }} />;
}

/* A thumbnail of one of Rana's works (opens the viewer) or a project (opens the case study) */
export function Pic({ item, className = '' }) {
  if (item.kind === 'project') {
    const p = PROJECTS.find((x) => x.id === item.id);
    return (
      <button type="button" data-open-project={item.id} data-cover-host aria-label={`Open the ${p.title} case study`}
        className={`liquid-glass block overflow-hidden rounded-2xl text-left ${className}`}>
        <Cover id={item.id} />
        <span className="relative z-[2] block px-3 py-2 font-jakarta text-[11px] font-bold uppercase tracking-[0.16em] text-mint">Concept illustration · {p.title}</span>
      </button>
    );
  }
  const a = RY.byId(item.id);
  return (
    <button type="button" data-open-art={item.id} aria-label={`Open ${a.title}`}
      className={`liquid-glass group block overflow-hidden rounded-2xl p-1.5 text-left ${className}`}>
      <img src={a.src} alt={a.title} loading="lazy" decoding="async" className="relative z-[2] w-full rounded-xl transition-transform duration-700 group-hover:scale-[1.03]" />
      <span className="relative z-[2] block px-1.5 pb-1 pt-2 font-jakarta text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/60">No. {pad(RY.number(a.id))}</span>
    </button>
  );
}
