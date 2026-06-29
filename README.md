# Portfolio


## Description
This project is my personal portfolio page. Content is authored as Jinja
templates and served as a pre-rendered **static site via nginx** (no Python at
runtime). It is bilingual: English at `/` and Vietnamese under `/vi`.


## How it works
The templates in `templates/` are the single source of truth. At Docker build
time, `build_static.py` renders every page to plain HTML in `dist/`, and nginx
serves that with clean URLs and caching. There is no application server in
production — Flask is used only as the build-time renderer.

To change content: edit the relevant template, commit, and push. The CI/CD
pipeline rebuilds and redeploys automatically (see Project status).


## Local development
Render the static site and preview it:

    python -m venv .venv
    .venv/bin/pip install -r requirements.txt
    .venv/bin/python build_static.py   # outputs ./dist

Or build and run the exact production container locally:

    docker build -t portfolio .
    docker run -p 8088:8080 portfolio   # open http://localhost:8088


## Project structure
- `templates/`: Jinja HTML templates (content). EN at top level, VI under
  `templates/vi/`. `base_en.html` / `vi/base_vi.html` are the layouts and both
  include `_head_scripts.html` (shared theme + JS + CSS head block).
- `static/`: static assets — `css/style.css`, `js/main.js`, `image/`.
- `app.py`: Flask app used by the build step to render templates (defines the
  EN routes; registers the VI blueprint).
- `route/vi.py`: Flask blueprint for the Vietnamese routes.
- `build_static.py`: renders all routes to static HTML in `dist/` and copies
  static assets. Run at Docker build time.
- `nginx.conf`: nginx config — clean URLs, gzip, cache + security headers,
  listens on `8080`.
- `Dockerfile`: multi-stage build — stage 1 renders HTML with Flask, stage 2
  serves it with nginx.
- `requirements.txt`: build-time dependency (Flask).


## Support
nguyennta@icloud.com


## Authors
This project is done by nguyennta@icloud.com


## License
This is just a personal project for portfolio page.


## Project status
- Finished.
- Current host: https://portfolio-698202522757.asia-southeast1.run.app
- This project's source code is hosted on GitHub, with CI/CD handled by Cloud
  Build and deployed via Cloud Run — both part of Google Cloud Platform (GCP).
  Region: `asia-southeast1`, service: `portfolio`. A `git push` triggers the
  build and deploy automatically; the Cloud Run URL stays the same.
