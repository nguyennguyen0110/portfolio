# Portfolio


## Description
This project is my personal portfolio page. Content is authored as HTML
templates and built into a **static site with [Zola](https://www.getzola.org)**
(a single Rust binary), hosted on Firebase Hosting. It is bilingual: English at
`/` and Vietnamese under `/vi`.


## How it works
The templates in `templates/` are the single source of truth. `zola build`
renders every page to plain HTML in `dist/` in a few milliseconds, and Firebase
Hosting serves it with clean URLs and caching. There is no application server.

To change content: edit the relevant template, commit, and push. GitHub Actions
rebuilds and redeploys automatically (see Project status).


## Local development
Install Zola once (`brew install zola`), then:

    zola serve    # live preview at http://127.0.0.1:1111
    zola build    # outputs ./dist


## Project structure
- `config.toml`: Zola config — base URL, languages, output directory.
- `content/`: one small stub per page that points at its template
  (`experience.md` for EN, `experience.vi.md` for VI). To add a page, add a
  stub and a template.
- `templates/`: HTML templates (content). EN at top level, VI under
  `templates/vi/`. `base_en.html` / `vi/base_vi.html` are the layouts and both
  include `_head_scripts.html` (shared theme + JS + CSS head block).
- `static/`: static assets, copied to the site root — `css/style.css`,
  `js/main.js`, `image/`.
- `firebase.json`: hosting config — clean URLs, cache + security headers.
- `.github/workflows/deploy.yml`: builds with Zola and deploys on push to `main`.


## Support
nguyennta@icloud.com


## Authors
This project is done by nguyennta@icloud.com


## License
This is just a personal project for portfolio page.


## Project status
- Finished.
- Current host: https://nguyennta.io.vn
- Source code is hosted on GitHub. A `git push` to `main` triggers GitHub
  Actions, which builds the site with Zola and deploys it to Firebase Hosting
  (GCP project `nguyennta-portfolio`).
