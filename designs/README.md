# Rana Yaser — portfolio designs

Four complete versions of the same portfolio. Every design uses Rana's own text, her 16 artworks
and her 6 projects; only the visual world changes. Each finished file is self-contained (artworks
embedded), so it can be opened directly in a browser or uploaded to any static host.

| File | Design | Idea |
|---|---|---|
| `rana-portfolio-gallery.html` | A · Gallery wall | An exhibition: works hung on wires from a picture rail, museum wall labels, a floor plan that tracks where you are, light and “after hours” (dark) modes |
| `rana-portfolio-print.html` | B · Two-ink print studio | A risograph zine: blue = logic, fluorescent pink = creativity, violet where they overprint; crop marks, halftone, an idea-slip printer |
| `rana-portfolio-cinema.html` | C · Night screening room | A cinema: film-leader countdown, the work projected on a letterboxed screen, a film-strip archive, ticket projects, end credits |
| `rana-portfolio-glass.html` | D · Liquid glass | The CodeNest hero brief, built exactly as written (its own copy, logo and PROJECTS / BLOG / ABOUT / RESUME menu) over an HLS background video, followed by Rana's portfolio in the same dark liquid-glass style. React + Tailwind + hls.js + lucide-react. BLOG opens the "Beyond the work" scrapbook, the closest thing the portfolio has to a blog |

## Editing content

All text lives in one place and is shared by every design:

- `src/core/content.js` — page text (`CONTENT`) and the new Arabic headings/menu labels (`AR`)
- `src/core/data.js` — artworks, projects, roles, skills, interests
- `src/core/relations.js` — which artworks/projects illustrate each section
- `src/art/` — the artwork images

Design D's hero copy is the `HERO` object in `src/glass/src/lib.js`.

## Building

```bash
python3 designs/src/build.py            # builds all four into designs/
python3 designs/src/build.py gallery    # or just one
```

Design D needs Node 18+; the build script runs `npm install` and `vite build` for it automatically.
For live editing of Design D: `cd designs/src/glass && npm run dev`.

`--artifact-dir DIR` also writes variants for the claude.ai artifact viewer. That viewer blocks the
external video stream, so `--hero-mp4 URL` gives Design D's variant an MP4 copy of the same loop
(uploaded as an artifact asset) to fall back to. In a normal browser the HLS stream plays directly.

## Before publishing

- Replace the placeholder email `ranayaser.contact@email.com` in `src/core/content.js` (used everywhere).
- Check the LinkedIn URL in the same file.
