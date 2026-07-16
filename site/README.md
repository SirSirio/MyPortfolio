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

## Files

| File             | Purpose                                                           |
| ---------------- | ---------------------------------------------------------------- |
| `index.html`     | Page shell — loads the font trio and the `main.js` module.       |
| `styles.css`     | Minimal reset + dark cosmic base (`#04050c`).                    |
| `main.js`        | Entry ES module; boots and wires the cosmic engine.              |
| `star-engine.js` | **Shared cosmic engine** — palette, `tintAt`, and `HeroStar`.   |
| `.nojekyll`      | Disables Jekyll so files serve verbatim on Pages.                |
