# Sirio Feltrin — Portfolio (site source)

This directory (`site/`) is the **source root** of the deployed portfolio site.
It is served as-is — plain static HTML/CSS/JS, no bundler, no server runtime.

## Deploy

Deployment is automated with **GitHub Actions** — see
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).
Every push to `main` or `master` uploads this `site/` folder as the Pages
artifact and redeploys the live site. The empty [`.nojekyll`](./.nojekyll)
marker disables Jekyll so module/underscore-prefixed files are served verbatim.

## Local preview

Serve this folder over HTTP (ES modules require a server, not `file://`):

```bash
npx --yes serve site
# or
python -m http.server -d site 8080
```

Then open the printed `http://localhost:...` URL.

## Deep-dive links

The project deep-dives are overlays inside `index.html`, not separate pages,
but each one has its own shareable URL:

| Deep-dive                     | Link                                                          |
| ----------------------------- | ------------------------------------------------------------- |
| Automated Gel Electrophoresis | `https://sirsirio.github.io/MyPortfolio/#gel-electrophoresis` |
| Digital Solutions for the Lab | `https://sirsirio.github.io/MyPortfolio/#digital-solutions`   |

How it behaves (hash routing in `main.js`, see `PROJ_SLUG`):

- Opening a deep-dive from its card puts its link in the address bar.
- A direct link opens that deep-dive instantly on load, without the warp.
- Browser Back, the "back to work" link and **Esc** all close the deep-dive and
  return to the main page; Forward reopens it.
- Section anchors (`#work`, `#index`, …) are unaffected.

Limitation: link previews (LinkedIn, Slack, email) ignore everything after `#`,
so these links show the homepage's preview card. Separate per-project pages
would be needed for per-project preview cards.

**Adding a deep-dive:** give its overlay a `data-proj="<id>"`, add
`<id>: '<slug>'` to `PROJ_SLUG` (next to its `PROJ_MOTION` entry), and list the
link above. The slug must not match any element `id` on the page.

## Files

| File             | Purpose                                                           |
| ---------------- | ---------------------------------------------------------------- |
| `index.html`     | Page shell — loads the font trio and the `main.js` module.       |
| `styles.css`     | Minimal reset + dark cosmic base (`#04050c`).                    |
| `main.js`        | Entry ES module; boots and wires the cosmic engine.              |
| `star-engine.js` | **Shared cosmic engine** — palette, `tintAt`, and `HeroStar`.   |
| `.nojekyll`      | Disables Jekyll so files serve verbatim on Pages.                |
