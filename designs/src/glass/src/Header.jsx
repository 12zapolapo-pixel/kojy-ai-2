import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RY, HERO } from './lib.js';

/* PROJECTS / BLOG / ABOUT (+ RESUME, which opens the CV sheet) */
const LINKS = HERO.nav;

/* White minimalist mark: a pair of code brackets holding the "nest egg" */
function Logo() {
  return (
    <a href="#top" className="group flex min-h-[44px] items-center gap-2.5 text-white" aria-label={`${HERO.brand} — back to top`}>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M10.5 8 4 15l6.5 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:-translate-x-0.5" />
        <path d="M19.5 8 26 15l-6.5 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-0.5" />
        <circle cx="15" cy="15" r="2.7" fill="currentColor" />
      </svg>
      <span className="font-inter text-[19px] font-bold tracking-tight">{HERO.brand}</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  /* Full-screen menu: lock scroll, trap focus, close on Esc, return focus to the button */
  useEffect(() => {
    document.documentElement.classList.toggle('menu-lock', open);
    if (!open) return undefined;
    const panel = panelRef.current;
    const first = panel && panel.querySelector('a, button');
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current && btnRef.current.focus(); }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll('a, button')];
      const f = items[0], l = items[items.length - 1];
      if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
      else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const openCV = () => { setOpen(false); RY.openOverlay(document.getElementById('cv')); };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? 'border-b border-white/10 bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'}`} style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <div className="gutter mx-auto flex h-[72px] max-w-content items-center justify-between">
          <Logo />
          <nav aria-label="Primary" data-nav className="hidden md:block">
            <ul className="flex items-center gap-9">
              {LINKS.map((l) => (
                <li key={l.href}><a href={l.href} className="font-inter text-[16px] font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-mint aria-[current=true]:text-mint">{l.label}</a></li>
              ))}
              <li><button type="button" onClick={openCV} className="font-inter text-[16px] font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-mint">Resume</button></li>
            </ul>
          </nav>
          <button ref={btnRef} type="button" className="grid h-11 w-11 place-items-center rounded-full text-white md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div id="mobile-menu" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}
        className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden">
        <div className="gutter flex h-full flex-col pt-[104px] pb-10">
          <ul className="grid gap-2">
            {LINKS.map((l, i) => (
              <li key={l.href} className="panel-in" style={{ animationDelay: `${i * 50}ms` }}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-inter text-[32px] font-extrabold uppercase tracking-tight text-white transition-colors hover:text-mint">{l.label}</a>
              </li>
            ))}
            <li className="panel-in" style={{ animationDelay: `${LINKS.length * 50}ms` }}>
              <button type="button" onClick={openCV} className="block w-full border-b border-white/10 py-4 text-left font-inter text-[32px] font-extrabold uppercase tracking-tight text-white transition-colors hover:text-mint">Resume</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
