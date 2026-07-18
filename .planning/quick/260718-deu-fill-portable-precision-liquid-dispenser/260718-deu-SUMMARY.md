---
quick_id: 260718-deu
slug: fill-portable-precision-liquid-dispenser
description: "Fill the Portable Precision Liquid Dispenser media slot with the thesis hero-rotor animation + the pump-head video, both clickable to the thesis site"
date: 2026-07-18
status: complete
commit: dfce6f3
---

# Quick Task 260718-deu — Summary

## What was done

The **Portable Precision Liquid Dispenser** plate (`site/index.html` plate 001,
the flagship MSc-thesis card) was still the empty striped placeholder
`[ device render / gif ]`. It now shows a **two-up media pairing** — a live
peristaltic-pump animation beside the prototype dispensing clip — and the whole
slot links out to Sirio's thesis site (opens in a new tab). No portfolio detail
page was built: the thesis site **is** the project's detail page, per Sirio.

### 1. The animation (`site/pump-anim.js`, new)
The animation in Sirio's reference image is the thesis landing page's `#hero-rotor`
motif — a **JS-built SVG driven by GSAP**, not a downloadable file. It was lifted
**verbatim** from the live thesis page: `buildHeroRotor()` (Falcon source → dip
tube → 4-roller pump head with a 180° top wrap → needle → open Eppendorf, real
proto-02 geometry: N=4, R=19.7 mm, rollerR=5 mm) and `initHeroMotion()` (one GSAP
timeline phase-locking rotor rotation to the liquid slug's stroke-dashoffset, plus
timed droplet releases). Only the container id changed (`#hero-rotor` → `#pump-anim`)
and it was wrapped in a self-initialising IIFE. It bails safely if `gsap` is absent
or `#pump-anim` is missing, and keeps the thesis' reduced-motion freeze (static
legible frame). Sirio explicitly approved importing GSAP.

### 2. The video (`site/assets/media/pump-head-web.mp4`)
The proto-02 pump-head dispensing clip — the **web version** (540×960 portrait,
h264, 23 s, 1.75 MB), per Sirio ("use the web one"); the 9.9 MB raw file was left
out as too heavy. A poster frame (`pump-head-web-poster.jpg`) was extracted for the
MOTION-02 fail-safe. Both assets are **first-party, committed, relative paths** —
never a remote `src` (per `site/assets/media/README.md`).

### 3. GSAP vendored (`site/assets/vendor/gsap.min.js`)
GSAP 3.15.0 (72 KB) vendored locally — no CDN. Loaded as a classic script before
the `pump-anim.js` classic script and the `main.js` module, so the global `gsap`
is ready when the animation self-inits.

### 4. Markup + CSS (`site/index.html`, `site/styles.css`)
- The empty `<figure>` became
  `<figure class="media-slot media-slot--pump">…<a href="…thesis…" target="_blank"
  rel="noopener"><div id="pump-anim">…</div><video class="pump-clip" …></video></a>`.
- New **self-contained** `.media-slot--pump` modifier (flex row: animation `flex:1`,
  portrait clip fixed-height `object-fit:contain`, stacks at ≤860px), **modelled on
  but not reusing** `.media-slot--composite` — so the shipped OT-2 rules are
  untouched.
- Placeholder filled-test (`.media-slot:not(:has(…))`, ×2) extended with
  `> a > video` so the stripes switch off for the link-wrapped video.
- The `.hero-*` styles are copied **scoped under `.pump-anim`**, with
  `--accent:#ff6b2b; --accent-2:#e83535;` pinned on that scope — the portfolio's own
  `--accent` is a section-driven RGB triplet (`rgba(var(--accent),…)`), while the
  vendored SVG uses `--accent` as a whole color; scoping keeps the two idioms apart
  and holds the animation to the thesis orange.

### 5. Video autoplay generalised (`site/main.js`)
MOTION-02's start logic was `querySelector('.media-slot--composite video')` — a
single match. With a second (earlier-in-DOM) composite-style video that would have
stolen the match and left OT-2 frozen. Changed to loop over **all**
`.media-slot video`, so both the OT-2 clip and the pump clip autoplay (or get
`controls` under reduced motion).

## Verification

Static / structural (deterministic):
- All new assets serve **200** locally (`pump-head-web.mp4`, poster,
  `gsap.min.js`, `pump-anim.js`).
- `buildHeroRotor()` run in Node (pure geometry) → valid SVG: 4 rollers, all
  required ids (`hero-rotor-group`, `hero-tube-slug`, `hero-tube-prewrap`,
  `hero-droplet`), gradient def, `viewBox="0 0 700 320"`, **no NaN/undefined**.
- `node --check` passes for `pump-anim.js` and `main.js`.
- DOM confirmed: `figure.media-slot--pump > a[href=…thesis…, target=_blank,
  rel=noopener] > (div#pump-anim + video.pump-clip)`; the `:has(> a > video)`
  filled-test now matches → placeholder off. Script order gsap → pump-anim → main.
- OT-2 composite figure and its autoplay path unchanged; `main.js` now selects
  both videos.

**Not** verified live in a browser: the running GSAP motion (rotor spin, slug
flow, droplet) and `getTotalLength()` sync. The Playwright MCP browser profile was
locked by another session this run, and no headless browser / SVG rasteriser is
installed locally. The animation is **verbatim, already-working thesis code**, so
the risk is limited to integration (load order + container), which is verified
structurally. **Final eyeball:** open `site/index.html` — or free the Playwright
profile and I'll screenshot it.

## Files changed

- `site/pump-anim.js` (new) — animation build + GSAP motion
- `site/assets/vendor/gsap.min.js` (new) — GSAP 3.15.0, vendored
- `site/assets/media/pump-head-web.mp4` (new) — web pump-head clip
- `site/assets/media/pump-head-web-poster.jpg` (new) — poster
- `site/index.html` — slot markup + script tags
- `site/styles.css` — `.media-slot--pump`, scoped `.pump-anim`, placeholder test
- `site/main.js` — start all `.media-slot` videos

## Out of scope (unchanged)

- Video re-encoding / `srcset` / lazy-load — Phase 4 (MEDIA-02).
- Any thesis-site change; any portfolio detail page for this project.
- Hero Sirio Star tuning (owned by Sirio).

Commit: `dfce6f3`
