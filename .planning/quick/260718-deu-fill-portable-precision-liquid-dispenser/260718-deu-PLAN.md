---
quick_id: 260718-deu
slug: fill-portable-precision-liquid-dispenser
description: "Fill the Portable Precision Liquid Dispenser media slot with the thesis hero-rotor animation + the pump-head video, both clickable to the thesis site"
date: 2026-07-18
status: planned
---

# Quick Task 260718-deu — PLAN

## Goal

Settle the media content for the **Portable Precision Liquid Dispenser** plate
(the flagship MSc-thesis card, `site/index.html` plate 001). Its media slot is
currently the empty striped placeholder `[ device render / gif ]`. Fill it with
**two** first-party media, side by side, the whole slot clickable and landing on
Sirio's thesis site — no portfolio detail page (the thesis site IS the detail page):

1. The **peristaltic pump-head animation** — the `#hero-rotor` SVG+GSAP motif from
   the thesis landing page (Falcon source → dip tube → 4-roller pump head → needle
   → Eppendorf, with phase-locked rotor spin + liquid slug + droplet).
2. The **proto-02 pump-head dispensing video** (`pump-head-web.mp4`, 540×960
   portrait, 1.7 MB, web-optimised — NOT the 9.9 MB raw file).

Link target for both: `https://sirsirio.github.io/thesis-tools/index.html`
(new tab, `rel="noopener"`).

## Decisions (locked with Sirio this session)

- **Animation source:** lift the thesis `#hero-rotor` widget verbatim — its
  `buildHeroRotor()` geometry + `initHeroMotion()` GSAP timeline + `.hero-*` CSS.
  Sirio explicitly approved importing GSAP ("Yes import GSAP. I will do it anyways").
- **Video file:** the web version `pump-head-web.mp4`, per Sirio ("use the web one").
- **No hot-linking:** all assets committed first-party with relative paths, per
  `site/assets/media/README.md`. GSAP vendored locally at `assets/vendor/gsap.min.js`.
- **No detail page:** the media links straight out to the thesis site.

## Assets (already staged in working tree)

- `site/assets/media/pump-head-web.mp4` — 540×960, h264, 23 s, 1.75 MB
- `site/assets/media/pump-head-web-poster.jpg` — poster frame (MOTION-02 fail-safe)
- `site/assets/vendor/gsap.min.js` — GSAP 3.15.0 (72 KB), vendored from thesis site

## Tasks

### Task 1 — Scoped animation widget (JS + CSS)
- **files:** `site/pump-anim.js` (new), `site/styles.css`
- **action:**
  - New `site/pump-anim.js`: a classic-script IIFE holding `buildHeroRotor()` and
    `initHeroMotion()` lifted verbatim from the thesis page, targeting `#pump-anim`
    (was `#hero-rotor`). Self-inits on DOMContentLoaded; bails safely if `gsap`
    is undefined or the container is absent. Keeps the thesis reduced-motion freeze.
  - `styles.css`: add the `.hero-*` rules **scoped under `.pump-anim`** so they can
    never leak into the rest of the page, and pin `--accent:#ff6b2b;
    --accent-2:#e83535;` on `.pump-anim` (the portfolio's own `--accent` is a
    section-driven RGB triplet used as `rgba(var(--accent),…)`; the thesis idiom
    uses `--accent` as a whole hex color — pinning on the widget scope keeps the two
    from colliding and holds the animation to the thesis orange).
- **verify:** `#pump-anim svg` renders the scene; rotor spins, slug flows, droplet
  releases; nothing outside `.pump-anim` changes color.
- **done:** animation appears and animates in the slot; no style leakage.

### Task 2 — Fill the slot, wire scripts, generalise video autoplay
- **files:** `site/index.html`, `site/main.js`, `site/styles.css`
- **action:**
  - `index.html` plate 001: replace the empty `<figure class="media-slot" …>` with
    `<figure class="media-slot media-slot--pump" …><a href="…thesis…"
    target="_blank" rel="noopener"><div class="pump-anim" id="pump-anim"></div>
    <video class="pump-clip" src="./assets/media/pump-head-web.mp4"
    poster="…poster.jpg" muted loop playsinline …></video></a></figure>`
    (no `autoplay` attr — started from JS, MOTION-02).
  - `index.html`: add `<script src="./assets/vendor/gsap.min.js"></script>` and
    `<script src="./pump-anim.js"></script>` before the `main.js` module tag.
  - `styles.css`: add a self-contained `.media-slot--pump` modifier (flex row:
    animation `flex:1`, portrait video fixed-height `object-fit:contain`; stacks at
    ≤860px) — modelled on `.media-slot--composite` but NOT reusing it, so the
    shipped OT-2 composite rules are untouched. Extend the placeholder filled-test
    (`.media-slot:not(:has(…))` ×2) with `> a > video` so the striped placeholder
    switches off for a link-wrapped video.
  - `main.js`: replace the single `.media-slot--composite video` MOTION-02 start
    with a loop over **all** `.media-slot video` (covers OT-2 + the new clip;
    prevents the new earlier-in-DOM video from stealing OT-2's single querySelector).
- **verify:** slot shows animation + portrait video side by side, no stripes; whole
  slot links to the thesis site in a new tab; both OT-2 and pump videos autoplay
  (or show controls under reduced motion); no horizontal scroll at 375px.
- **done:** card media settled and matches the two-up composite look of the OT-2 card.

## Must-haves

- Empty `[ device render / gif ]` placeholder gone from plate 001.
- `#pump-anim` present and populated; GSAP vendored locally (no CDN/remote src).
- `pump-head-web.mp4` referenced by **relative** path, committed first-party.
- Whole slot is an `<a>` to `https://sirsirio.github.io/thesis-tools/index.html`,
  `target="_blank" rel="noopener"`.
- OT-2 composite autoplay NOT regressed.
- `.hero-*` styles scoped to `.pump-anim`; no color/id leakage elsewhere.

## Out of scope

- Video re-encoding / `srcset` / lazy-load (Phase 4, MEDIA-02).
- Any thesis-site change. Any portfolio detail page for this project.
- Retuning the hero Sirio Star (owned by Sirio; unrelated).
