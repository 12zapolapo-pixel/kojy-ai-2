/* global ARCHIVE_WORKS, CATEGORY_DESCRIPTIONS, PROJECTS_DATA, EXPERIENCE_DATA, SKILLS_DATA, INTEREST_DETAILS, CONTENT, AR, RELATED */
import { useEffect, useState } from 'react';

/* The shared portfolio core (Rana's text, artworks and behaviour) is loaded as a classic
   script before this bundle, so its globals are available here. */
export const RY = window.RY;
export const WORKS = ARCHIVE_WORKS;
export const CATS = CATEGORY_DESCRIPTIONS;
export const PROJECTS = PROJECTS_DATA;
export const ROLES = EXPERIENCE_DATA;
export const SKILLS = SKILLS_DATA;
export const INTERESTS = INTEREST_DETAILS;
export const C = CONTENT;
export const A = AR;
export const REL = RELATED;

export const HLS_SRC = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

/* Hero + header copy, exactly as written in the CodeNest hero brief.
   The "Master in-demand coding skills…" description is completed from its opening words. */
export const HERO = {
  brand: 'CodeNest',
  card: {
    tag: '[ 2025 ]',
    headline: ['Taught by ', 'Industry', ' Professionals'],
    text: 'Learn from developers who build, ship and review real products every day.'
  },
  eyebrow: 'Career-Ready Curriculum',
  headline: ['Launch', 'your', 'coding', 'career.'],
  description: 'Master in-demand coding skills through hands-on projects, real-world challenges and guidance from mentors who work in the industry — and build a portfolio you’re proud to show.',
  cta: 'Get Started',
  nav: [
    { href: '#projects', label: 'Projects' },
    { href: '#beyond', label: 'Blog' },
    { href: '#about', label: 'About' }
  ]
};

export const pad = (n) => String(n).padStart(2, '0');

/* "More than just a major." → ["More than just a ", "major", "."] */
export function splitTitle(parts) {
  const full = parts.join(' ').replace(/\s+/g, ' ').trim();
  const m = full.match(/^([\s\S]*?)(\S+?)([.?!]?)$/);
  return m ? [m[1], m[2], m[3]] : [full, '', ''];
}

export function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setReduced(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return reduced;
}

export const countBy = (list, key) => (k) => (k === 'all' ? list.length : list.filter((x) => (Array.isArray(x[key]) ? x[key].includes(k) : x[key] === k)).length);
