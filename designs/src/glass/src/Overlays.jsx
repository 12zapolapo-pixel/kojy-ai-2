import { memo } from 'react';
import { C } from './lib.js';

/* These dialogs are rendered once and never re-rendered by React: the shared core
   (core.js) fills their data-v / data-p slots and opens/closes them. */
const eyebrow = 'font-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-mint';
const pill = 'inline-flex min-h-[36px] items-center rounded-full border border-white/15 px-4 text-[11.5px] font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-mint hover:text-white';

function Viewer() {
  return (
    <div className="viewer ov flex flex-col bg-ink/95 backdrop-blur-xl" data-viewer data-overlay data-close-ms="300" hidden role="dialog" aria-modal="true" aria-labelledby="v-title"
      style={{ padding: 'env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px)' }}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 md:px-6">
        <span className="tabular mr-auto font-jakarta text-[12px] font-bold uppercase tracking-[0.2em] text-white/50" data-v="counter" />
        <div className="flex rounded-full border border-white/15 p-1" role="group" aria-label="Presentation">
          <button type="button" data-v-act="original" aria-pressed="true" className="rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-white/70">Original</button>
          <button type="button" data-v-act="framed" aria-pressed="false" className="rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-white/70">Glass frame</button>
        </div>
        <button type="button" data-v-act="zoom" aria-pressed="false" className={`${pill} hidden md:inline-flex`}>Zoom</button>
        <button type="button" data-close data-autofocus className={pill}>Close</button>
      </div>
      <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[minmax(0,1fr)_380px] md:overflow-hidden">
        <div className="v-stage relative grid min-h-[60vh] place-items-center overflow-hidden px-3 py-6 md:px-20 md:py-10" data-v-stage data-backdrop>
          <button type="button" data-v-act="prev" aria-label="Previous work" className="liquid-glass absolute bottom-4 left-4 z-10 grid h-12 w-12 place-items-center rounded-full text-lg md:bottom-auto md:top-1/2 md:-translate-y-1/2">←</button>
          <div className="v-frame liquid-glass grid place-items-center">
            <img data-v="img" alt="" data-v-act="zoom" className="viewer-img h-auto w-auto max-w-full rounded-md object-contain shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]" />
          </div>
          <button type="button" data-v-act="next" aria-label="Next work" className="liquid-glass absolute bottom-4 right-4 z-10 grid h-12 w-12 place-items-center rounded-full text-lg md:bottom-auto md:top-1/2 md:-translate-y-1/2">→</button>
        </div>
        <aside className="grid content-start gap-4 border-t border-white/10 p-6 md:overflow-y-auto md:border-l md:border-t-0">
          <p className={eyebrow}>No. <span data-v="no" className="tabular" /> · <span data-v="cat" /></p>
          <h2 id="v-title" data-v="title" className="font-inter text-[24px] font-extrabold leading-tight tracking-tight" />
          <p data-v="ar" lang="ar" dir="rtl" className="font-arabic text-[18px] leading-relaxed text-white/55" />
          <p data-v="desc" className="text-[14.5px] leading-[1.7] text-white/75" />
          <dl className="border-t border-white/10 text-[13.5px]">
            <div className="grid grid-cols-[86px_1fr] gap-3 border-b border-white/10 py-2.5"><dt className="text-white/45">Format</dt><dd data-v="format" /></div>
            <div className="grid grid-cols-[86px_1fr] gap-3 border-b border-white/10 py-2.5"><dt className="text-white/45">Made for</dt><dd data-v="org" /></div>
            <div className="grid grid-cols-[86px_1fr] gap-3 border-b border-white/10 py-2.5"><dt className="text-white/45">Credit</dt><dd data-v="handle" /></div>
          </dl>
          <p className={eyebrow}>Palette — tap to copy</p>
          <div data-v="swatches" className="flex flex-wrap gap-2" />
          <p data-v="craft" className="text-[13px] text-white/55" />
          <div data-v="badges" className="flex flex-wrap gap-2" />
        </aside>
      </div>
      <div data-v="strip" className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 md:px-6" aria-label="All works in this view" />
    </div>
  );
}

function CaseStudy() {
  return (
    <div className="ov bg-black/70 backdrop-blur-sm" data-project-modal data-overlay data-close-ms="320" hidden role="dialog" aria-modal="true" aria-labelledby="p-title">
      <div className="ov-panel absolute inset-x-0 bottom-0 top-[4vh] overflow-y-auto rounded-t-[32px] border-t border-white/10 bg-[#0a110f] md:top-[6vh]" data-p-scroll>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0a110f]/90 px-5 py-3 backdrop-blur md:px-10">
          <div className="flex gap-2">
            <button type="button" data-p-step="-1" className={pill}>← Previous</button>
            <button type="button" data-p-step="1" className={pill}>Next →</button>
          </div>
          <button type="button" data-close data-autofocus className={pill}>Close</button>
        </div>
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-10 md:px-10" data-p-body style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom, 0px))' }}>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="flex flex-wrap gap-2">
                <span data-p="type" className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/65" />
                <span data-p="badge" className="rounded-full border border-mint px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-mint" />
              </p>
              <p data-p="number" className="tabular mt-5 font-inter text-[64px] font-extrabold leading-none text-white/15" />
              <h2 id="p-title" data-p="title" className="font-inter text-[36px] font-extrabold uppercase leading-none tracking-tight md:text-[52px]" />
              <p data-p="subtitle" className="mt-3 font-serif text-[24px] italic text-white/75" />
            </div>
            <div id="d-cover" className="cover-dark liquid-glass overflow-hidden rounded-3xl p-2" />
          </div>
          <div><p className={eyebrow}>Interface preview — try it</p><div data-p="sim" className="mt-3" /></div>
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className={eyebrow}>Overview</p>
              <p data-p="summary" className="mt-3 text-[16px] leading-[1.75] text-white/80" />
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[14px] leading-relaxed text-white/75"><b className="text-white">What this is:</b> <span data-p="note" /></p>
            </div>
            <div>
              <p className={eyebrow}>Key features</p>
              <ul data-p="features" className="p-features mt-3 grid gap-2 text-[15px]" />
              <ul data-p="tags" className="p-tags mt-5 flex flex-wrap gap-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CV() {
  const cv = C.cv;
  return (
    <div className="ov grid place-items-center bg-black/75 p-4 backdrop-blur-sm" id="cv" data-overlay hidden role="dialog" aria-modal="true" aria-labelledby="cv-title">
      <div className="ov-panel liquid-glass glass-solid max-h-full w-full max-w-[760px] overflow-y-auto rounded-3xl p-6 md:p-10">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div><p className={eyebrow}>Curriculum vitae</p><h2 id="cv-title" className="mt-2 font-inter text-[28px] font-extrabold uppercase tracking-tight md:text-[36px]">Rana Yaser — Resume Snapshot<span className="text-mint">.</span></h2></div>
          <button type="button" data-close data-autofocus className={pill}>Close</button>
        </div>
        {[['Education', cv.education.map((e, i) => (i ? <span key={e} className="text-white/55">{e}</span> : <b key={e}>{e}</b>))],
          ['Experience & leadership', cv.experience.map((e) => <span key={e[0]}><b>{e[0]}</b> <span className="text-white/55">— {e[1]}</span></span>)],
          ['Selected work', cv.projects.map((e) => <span key={e[0]}><b>{e[0]}</b> <span className="text-white/55">— {e[1]}</span></span>)]
        ].map(([h, items]) => (
          <div key={h} className="grid gap-3 border-b border-white/10 py-5 md:grid-cols-[170px_1fr]">
            <p className={eyebrow}>{h}</p>
            <ul className="grid gap-2 text-[15px]">{items.map((it, k) => <li key={k}>{it}</li>)}</ul>
          </div>
        ))}
        <div className="flex justify-end pt-6">
          <button type="button" data-download-cv className="inline-flex min-h-[46px] items-center rounded-full bg-mint px-6 text-[12px] font-bold uppercase tracking-wide text-ink">Download summary (.txt)</button>
        </div>
      </div>
    </div>
  );
}

function Overlays() {
  return (<><Viewer /><CaseStudy /><CV /></>);
}
export default memo(Overlays);
