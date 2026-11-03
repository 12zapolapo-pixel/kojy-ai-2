#!/usr/bin/env python3
"""Build Rana Yaser's portfolio designs into single, self-contained HTML files.

Usage:  python3 designs/src/build.py [design ...] [--artifact-dir DIR] [--hero-mp4 URL]

Each design lives in designs/src/<design>/index.html and pulls in the shared
core (data.js, content.js, core.js, sim.css). Artworks in designs/src/art are
embedded as data URIs so every output file works offline as one file.

--artifact-dir also writes claude.ai preview variants. That viewer blocks the
external video stream, so --hero-mp4 gives Design D's preview an MP4 copy to play.
"""
import base64
import json
import pathlib
import re
import sys

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent
DESIGNS = {"gallery": "Rana Yaser Gallery", "print": "Rana Yaser Print Studio", "cinema": "Rana Yaser Screening Room", "glass": "Rana Yaser Liquid Glass"}


def art_uri(name: str) -> str:
    data = (SRC / "art" / f"{name}.jpg").read_bytes()
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()


def build_react(design: str) -> str:
    """Design D is a React + Tailwind project; Vite builds it into one file (core + art included)."""
    import subprocess
    proj = SRC / design
    if not (proj / "node_modules").exists():
        subprocess.run(["npm", "install", "--no-audit", "--no-fund"], cwd=proj, check=True)
    subprocess.run(["npm", "run", "build"], cwd=proj, check=True, stdout=subprocess.DEVNULL)
    return (proj / "dist" / "index.html").read_text(encoding="utf-8")


def build(design: str) -> str:
    if (SRC / design / "package.json").exists():
        html = build_react(design)
        missing = re.findall(r"@@ART:|<!--@CORE_JS@-->", html)
        if missing:
            raise SystemExit(f"{design}: unresolved placeholders {missing[:3]}")
        return html
    html = (SRC / design / "index.html").read_text(encoding="utf-8")
    core_js = "\n".join((SRC / "core" / f).read_text(encoding="utf-8") for f in ("data.js", "content.js", "relations.js", "core.js", "covers.js"))
    core_css = "\n".join((SRC / "core" / f).read_text(encoding="utf-8") for f in ("sim.css", "covers.css"))
    html = html.replace("/*@CORE_CSS@*/", core_css)
    html = html.replace("<!--@CORE_JS@-->", "<script>\n" + core_js + "\n</script>")
    html = re.sub(r"@@ART:(art-\d\d)@@", lambda m: art_uri(m.group(1)), html)
    missing = re.findall(r"@@[A-Z_]+[:@]|/\*@[A-Z_]+@\*/|<!--@[A-Z_]+@-->", html)
    if missing:
        raise SystemExit(f"{design}: unresolved placeholders {missing[:3]}")
    return html


def to_artifact(html: str, title: str, extra_js: str = "") -> str:
    """The claude.ai viewer supplies <html>/<head>/<body>; move our attributes onto them with a script."""
    html_attrs = dict(re.findall(r'(\w[\w-]*)="([^"]*)"', re.search(r"<html([^>]*)>", html).group(1)))
    body_attrs = dict(re.findall(r'(\w[\w-]*)="([^"]*)"', re.search(r"<body([^>]*)>", html).group(1)))
    head = html[html.index("<head>") + 6: html.index("</head>")]
    head = re.sub(r'\s*<meta charset="[^"]*"\s*/?>', "", head)
    head = re.sub(r'\s*<meta name="viewport"[^>]*>', "", head)
    head = re.sub(r"\s*<title>.*?</title>", "", head, flags=re.S)
    body = html[re.search(r"<body[^>]*>", html).end(): html.rindex("</body>")]
    setattrs = "".join(f'document.documentElement.setAttribute({k!r},{v!r});' for k, v in html_attrs.items())
    setattrs += "".join(f'document.body.setAttribute({k!r},{v!r});' for k, v in body_attrs.items())
    return (f"<title>{title}</title>\n"
            '<meta name="claude:viewport-fit-sides" content="cover">\n'
            f"{head}\n<script>{setattrs}{extra_js}</script>\n{body}")


def main():
    art_dir = None
    if "--artifact-dir" in sys.argv:
        art_dir = pathlib.Path(sys.argv[sys.argv.index("--artifact-dir") + 1])
        art_dir.mkdir(parents=True, exist_ok=True)
    hero_mp4 = sys.argv[sys.argv.index("--hero-mp4") + 1] if "--hero-mp4" in sys.argv else ""
    only = [a for a in sys.argv[1:] if a in DESIGNS]
    for design, title in DESIGNS.items():
        if only and design not in only:
            continue
        if not (SRC / design / "index.html").exists():
            print(f"skip {design} (no template yet)")
            continue
        html = build(design)
        out = OUT / f"rana-portfolio-{design}.html"
        out.write_text(html, encoding="utf-8")
        print(f"built {out.name}  {len(html) / 1e6:.2f} MB")
        if art_dir:
            extra = f"window.__HERO_MP4={json.dumps(hero_mp4)};".replace("</", "<\\/") if design == "glass" and hero_mp4 else ""
            (art_dir / f"rana-{design}.html").write_text(to_artifact(html, title, extra), encoding="utf-8")


if __name__ == "__main__":
    main()
