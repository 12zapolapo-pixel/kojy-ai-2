import { Fragment, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { HERO, HLS_SRC, useReducedMotion } from './lib.js';

/* An MP4 copy of the same loop for sandboxes that block the stream (the claude.ai preview).
   The build injects its address into the preview variant only. */
const MP4_COPY = typeof window.__HERO_MP4 === 'string' ? window.__HERO_MP4 : '';

/* Large horizontal ellipse glow, cyan / dark green, 25px Gaussian blur */
function Glow({ glowRef }) {
  return (
    <svg ref={glowRef} className="glow pointer-events-none absolute left-1/2 top-[-6%] h-[620px] w-[1400px] max-w-none" viewBox="0 0 1400 620" aria-hidden="true">
      <defs>
        <filter id="hero-glow-blur" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="25" /></filter>
        <radialGradient id="hero-glow-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#1aa38f" stopOpacity="0.32" />
          <stop offset="75%" stopColor="#0b5a52" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#063b36" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="700" cy="250" rx="600" ry="150" fill="url(#hero-glow-fill)" filter="url(#hero-glow-blur)" />
      <ellipse cx="700" cy="232" rx="300" ry="56" fill="#4fd1d9" fillOpacity="0.14" filter="url(#hero-glow-blur)" />
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const glowRef = useRef(null);
  const heroRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = userPaused || reduced;

  useEffect(() => { const r = requestAnimationFrame(() => setEntered(true)); return () => cancelAnimationFrame(r); }, []);

  /* Background video: the HLS stream through hls.js (enableWorker: false for sandboxed
     environments), or Safari's native HLS. If the stream can't load, the MP4 copy plays. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    let hls = null;
    const tryPlay = () => { if (!pausedRef.current) video.play().catch(() => {}); };
    const fail = () => setFailed(true);
    const useCopy = () => {
      if (hls) { hls.destroy(); hls = null; }
      video.removeEventListener('error', useCopy);
      if (!MP4_COPY) { fail(); return; }
      video.addEventListener('error', fail, { once: true });
      video.addEventListener('loadeddata', tryPlay, { once: true });
      video.src = MP4_COPY;
    };
    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('pause', onPause);
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false });
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
      hls.on(Hls.Events.ERROR, (_e, data) => { if (data.fatal) useCopy(); });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.addEventListener('error', useCopy, { once: true });
      video.addEventListener('loadedmetadata', tryPlay, { once: true });
      video.src = HLS_SRC;
    } else {
      useCopy();
    }
    /* Pause while the hero is off screen */
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) video.pause();
        else if (!pausedRef.current && video.readyState > 1) video.play().catch(() => {});
      }, { threshold: 0.05 });
      io.observe(video);
    }
    return () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('error', useCopy);
      video.removeEventListener('error', fail);
      if (io) io.disconnect();
      if (hls) hls.destroy();
    };
  }, []);

  useEffect(() => { if (reduced && videoRef.current) videoRef.current.pause(); }, [reduced]);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { setUserPaused(true); v.pause(); }
    else { setUserPaused(false); pausedRef.current = false; v.play().catch(() => setFailed(true)); }
  };

  /* Glow drifts slightly with the pointer */
  useEffect(() => {
    const hero = heroRef.current, glow = glowRef.current;
    if (!hero || !glow || reduced || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const step = () => { x += (tx - x) * 0.06; y += (ty - y) * 0.06; glow.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`; raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(step) : 0; };
    const on = (e) => { const r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 60; ty = ((e.clientY - r.top) / r.height - 0.5) * 30; if (!raf) raf = requestAnimationFrame(step); };
    hero.addEventListener('pointermove', on);
    return () => { hero.removeEventListener('pointermove', on); cancelAnimationFrame(raf); };
  }, [reduced]);

  const words = HERO.headline;
  const lastWord = words[words.length - 1].replace(/\.$/, '');

  return (
    <section id="top" ref={heroRef} aria-labelledby="hero-title" className={`relative isolate flex min-h-[100svh] flex-col overflow-hidden ${entered ? 'hero-in' : ''}`}>
      {/* Background: HLS video at 60% opacity, left and bottom-up gradients, central glow */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${playing ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`hero-aurora ${reduced ? '' : 'is-moving'}`} />
        </div>
        <video ref={videoRef} className="hero-video absolute inset-0 h-full w-full object-cover" style={{ opacity: playing ? 0.6 : 0 }} muted loop playsInline preload="auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] to-transparent" />
        {/* Phones: the text spans the full width, over the brightest part of the video */}
        <div className="absolute inset-0 bg-[#070b0a]/30 md:hidden" />
        {/* Three thin grid lines at 25 / 50 / 75% (desktop), above the video and gradients */}
        <div className="absolute inset-0 hidden lg:block">
          {['25%', '50%', '75%'].map((l) => <span key={l} className="absolute inset-y-0 w-px bg-white/10" style={{ left: l }} />)}
        </div>
        <Glow glowRef={glowRef} />
      </div>

      <div className="gutter relative mx-auto flex w-full max-w-content flex-1 flex-col justify-center pb-24 pt-[136px] md:pt-[168px]">
        <div className="max-w-[920px]">
          {/* Liquid glass card: 200×200, floating above the headline, shifted exactly 50px up */}
          <div className="translate-y-[-50px]">
            <div className={reduced ? '' : 'float'}>
              <div className="liquid-glass rise flex h-[200px] w-[200px] flex-col justify-between rounded-[22px] p-4" style={{ '--d': '0.05s' }}>
                <span className="font-inter text-[14px] font-medium tracking-wide text-white/80 tabular">{HERO.card.tag}</span>
                <span className="block">
                  <span className="block font-inter text-[18px] font-medium leading-[1.15] text-white">
                    {HERO.card.headline[0]}<em className="font-serif font-normal italic">{HERO.card.headline[1]}</em>{HERO.card.headline[2]}
                  </span>
                  <span className="mt-2 block font-inter text-[11px] leading-[1.45] text-white/60">{HERO.card.text}</span>
                </span>
              </div>
            </div>
          </div>

          <p className="rise -mt-6 font-jakarta text-[11px] font-bold uppercase tracking-[0.22em] text-[#5ed29c]" style={{ '--d': '0.15s' }}>{HERO.eyebrow}</p>
          <h1 id="hero-title" aria-label={words.join(' ')} className="mt-4 text-balance font-inter text-[40px] font-extrabold uppercase leading-[0.96] tracking-tight text-white sm:text-[54px] lg:text-[72px]">
            {words.map((w, i) => (
              <Fragment key={w + i}>
                <span className="word" aria-hidden="true">
                  <span style={{ '--i': i }}>
                    {i === words.length - 1 ? <>{lastWord}<span className="text-[#5ed29c]">.</span></> : w}
                  </span>
                </span>
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          <p className="rise mt-6 max-w-[512px] font-inter text-[14px] leading-relaxed text-white/70" style={{ '--d': '0.6s' }}>{HERO.description}</p>
          <div className="rise mt-8" style={{ '--d': '0.72s' }}>
            <a href="#about" className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#5ed29c] px-7 font-inter text-[13px] font-bold uppercase tracking-wide text-[#070b0a] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]">
              {HERO.cta}<ArrowRight size={17} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Background-video control (moving content must be pausable) */}
      <div className="gutter pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-content justify-end">
        {!failed && (
          <button type="button" onClick={toggleVideo}
            className="liquid-glass rise pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-white/80 hover:text-white"
            style={{ '--d': '0.9s' }} aria-label={playing ? 'Pause background video' : 'Play background video'}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
    </section>
  );
}
