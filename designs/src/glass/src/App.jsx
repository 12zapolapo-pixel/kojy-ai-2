import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { RY, pad } from './lib.js';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import { About, Work, Plate, Projects, Journey, Skills, Beyond, Contact, Footer } from './Sections.jsx';
import Overlays from './Overlays.jsx';

/* Three thin grid lines at 25 / 50 / 75% run behind the whole page (desktop) */
function GridLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden lg:block">
      {['25%', '50%', '75%'].map((l) => <span key={l} className="absolute bottom-0 top-0 w-px bg-white/10" style={{ left: l }} />)}
    </div>
  );
}

function ScrollBar() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, d.scrollTop / max) : 0})`;
    };
    const sched = () => { if (!raf) raf = requestAnimationFrame(on); };
    window.addEventListener('scroll', sched, { passive: true });
    on();
    return () => window.removeEventListener('scroll', sched);
  }, []);
  return <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px]"><div ref={ref} className="h-full origin-left bg-gradient-to-r from-mint to-cyan" style={{ transform: 'scaleX(0)' }} /></div>;
}

function IdeaToast({ idea, onClose }) {
  return (
    <div aria-live="polite" className="fixed bottom-5 right-5 z-[70] w-[min(360px,calc(100vw-40px))]">
      {idea && (
        <div key={idea.n} className="liquid-glass glass-solid panel-in rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-mint">Idea jar · No. {pad(idea.n)}</p>
            <button type="button" onClick={onClose} aria-label="Dismiss idea" className="-m-2 grid h-9 w-9 place-items-center rounded-full text-white/60 hover:text-white"><X size={16} /></button>
          </div>
          <p className="mt-2 font-serif text-[21px] italic leading-snug">{idea.text}</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    if (!window.__ryInit) { window.__ryInit = true; RY.init(); }
    RY.observe();
    RY.playCovers();
    /* The case-study sheet also shows the project's concept illustration */
    const base = RY.openProject;
    RY.openProject = (id) => {
      base(id);
      const el = document.getElementById('d-cover');
      if (el) { el.innerHTML = RY.cover(id); RY.playCovers(el); }
    };
    /* Glass sheen follows the pointer */
    const sheen = (e) => {
      const g = e.target && e.target.closest ? e.target.closest('.liquid-glass') : null;
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty('--mx', `${e.clientX - r.left}px`);
      g.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    if (RY.fine) document.addEventListener('pointermove', sheen, { passive: true });
    return () => { document.removeEventListener('pointermove', sheen); RY.openProject = base; };
  }, []);

  const showIdea = useCallback(() => setIdea(RY.nextIdea()), []);
  useEffect(() => {
    if (!idea) return undefined;
    const t = setTimeout(() => setIdea(null), 8000);
    return () => clearTimeout(t);
  }, [idea]);

  return (
    <>
      <a href="#main" className="fixed left-3 top-[-60px] z-[80] rounded-full bg-mint px-4 py-2 text-sm font-bold text-ink focus:top-3">Skip to content</a>
      <GridLines />
      <ScrollBar />
      <Header />
      <main id="main" className="relative z-[1]">
        <Hero />
        <About />
        <Work />
        <Plate i={4} />
        <Projects />
        <Journey />
        <Skills />
        <Plate i={1} />
        <Beyond onIdea={showIdea} />
        <Contact />
        <Footer />
      </main>
      <Overlays />
      <IdeaToast idea={idea} onClose={() => setIdea(null)} />
    </>
  );
}
