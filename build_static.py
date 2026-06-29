"""Render the Flask/Jinja templates to a static site in ./dist.

The templates remain the single source of truth: edit them, run this script,
and redeploy. Output is plain HTML + assets, served by nginx (no Python at
runtime). Run locally with:  python build_static.py
"""
import re
import shutil
from pathlib import Path

from app import app

# Route -> output file (relative to dist/). Clean URLs are resolved by nginx
# via try_files, so "/experience" is served from "experience.html".
ROUTES = {
    "/": "index.html",
    "/experience": "experience.html",
    "/skill": "skill.html",
    "/education": "education.html",
    "/project": "project.html",
    "/vi/": "vi/index.html",
    "/vi/experience": "vi/experience.html",
    "/vi/skill": "vi/skill.html",
    "/vi/education": "vi/education.html",
    "/vi/project": "vi/project.html",
}

DIST = Path("dist")


def add_lazy_loading(html: str) -> str:
    """Add loading="lazy" + decoding="async" to <img> tags that lack them.

    Every image on this site sits below the fold, so lazy-loading them all is
    a safe, free perf win on first paint.
    """
    def repl(match: re.Match[str]) -> str:
        tag = match.group(0)
        if "loading=" in tag:
            return tag
        return tag.replace("<img", '<img loading="lazy" decoding="async"', 1)

    return re.sub(r"<img\b[^>]*>", repl, html)


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    client = app.test_client()
    for route, out in ROUTES.items():
        resp = client.get(route)
        if resp.status_code != 200:
            raise SystemExit(f"Route {route} returned {resp.status_code}")
        html = add_lazy_loading(resp.get_data(as_text=True))
        target = DIST / out
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")
        print(f"  {route:18s} -> dist/{out}")

    # Copy static assets verbatim (css, js, images) to dist/static.
    shutil.copytree("static", DIST / "static",
                    ignore=shutil.ignore_patterns(".DS_Store"))
    print(f"Built {len(ROUTES)} pages + static assets into ./dist")


if __name__ == "__main__":
    main()
