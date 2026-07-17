/* Sirio Feltrin — portfolio entry module.

   Composes two things the approved design snapshots kept separate:
     - the living Sirio Star hero  (design/Sirio Star.dc.html)
     - the deep-field cosmos       (design/Sirio V4 - Deep Field x Hyperlight.dc.html)

   The engine (star-engine.js) owns everything inside [data-hero]. This module
   supplies the palette, the tempo, the deep field, and ONE rAF loop that drives
   both canvases. Do not add a second loop. */

import { HeroStar, REDUCED, DPR, tintAt, rgba } from './star-engine.js';
import { initMethod } from './method.js';

const heroEl = document.querySelector('[data-hero]');
const deepEl = document.querySelector('[data-deep]');
const navEl = document.querySelector('[data-nav]');
const parallaxEl = heroEl && heroEl.querySelector('[data-parallax]');
const heroCanvas = heroEl && heroEl.querySelector('canvas');
const paraEls = Array.from(document.querySelectorAll('[data-para]'));
const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));

/* Tuning knobs — all three are single values, deliberately. */
const DOCK_AT = 70;        /* px: dock once hero.bottom crosses the nav height */
const STAR_DRIFT = 10;     /* px: max pointer drift of the star layer + orbs */
const CANVAS_DRIFT = 6;    /* px: the rings drift ~0.6x as far, reading as depth */
const DRIFT_EASE = 0.06;   /* per frame: drift-and-settle, not cursor tracking */

/* The hero rect is cached on scroll/resize and read everywhere else. The engine
   already interleaves a layout read and writes every frame — never add another
   getBoundingClientRect to the pointer handler or the loop. */
let heroRect = null;
function cacheHeroRect() {
  if (heroEl) heroRect = heroEl.getBoundingClientRect();
}

/* ---------- the star ---------- */

/* periodSec: 5 runs the design's full synchronized choreography at 4x the approved
   "Slow" 20s — Sirio's call. The engine scales the i-dot orbit durations off
   periodMs — each revolution now spans 2 full breaths (2x periodMs) per Sirio's
   steer — so breath and orbits stay locked in sync at any speed. Past the design's
   fastest preset (Medium: 13) and the engine's 15 default, so this must stay explicit.
   No breathFloor: the breath runs the full 0->1 cycle, starting from complete dark
   and blooming to a bright core each pulse — the original behavior. (An earlier
   breathFloor:0.55 lifted the trough above the 0.30 re-arm threshold, which froze
   the i-dot orbits after their first pass; removing it restores the loop.)
   transparent: true is D-04 — it swaps the engine's opaque background fill for a
   clearRect so the fixed deep field shows through the hero. */
const star = new HeroStar(heroEl, { periodSec: 5, transparent: true });

/* D-02 — the GOLD palette. The engine hard-codes blue-white and accepts no
   opts.pal; _draw reads this.pal fresh every frame, so assigning it here needs
   no engine edit. Without this line the hero ships blue-white. */
star.pal = { glow: [255, 196, 110], core: [255, 236, 200] };
const GOLD = star.pal;

/* D-04 — drop the hero's own 130-star field. It is drawn in hero space, so it
   would stick in place while the deep field parallaxes past it, and it would
   double the star density over the first viewport. The deep field's near layer
   already carries bright foreground stars across the hero.
   Tuning knob: re-seed with a smaller field instead of [] if the hero reads sparse. */
star.stars = [];

/* ---------- deep field ---------- */

const mk = (n, rM, rX) =>
  Array.from({ length: n }, () => ({
    x: Math.random(),
    y: Math.random() * 3,
    r: rM + Math.random() * (rX - rM),
    ph: Math.random() * 6.28,
    hue: Math.random()
  }));

const layers = [
  { f: 0.14, a: 0.26, stars: mk(280, 0.3, 0.9) },
  { f: 0.36, a: 0.40, stars: mk(140, 0.5, 1.3) },
  { f: 0.66, a: 0.58, stars: mk(64, 0.8, 1.9) }
];

function drawDeep(now) {
  const c = deepEl;
  if (!c) return;
  const vw = window.innerWidth, vh = window.innerHeight;
  const W = Math.round(vw * DPR), H = Math.round(vh * DPR);
  if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
  const ctx = c.getContext('2d');
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  /* clearRect, not fillRect — this is what lets the page gradient show through. */
  ctx.clearRect(0, 0, vw, vh);
  const rel = window.scrollY, span = vh * 3;
  for (const L of layers) for (const s of L.stars) {
    let sy = (s.y * vh - rel * L.f) % span;
    if (sy < 0) sy += span;
    if (sy > vh + 4) continue;
    const tw = 0.35 + 0.65 * Math.abs(Math.sin(now * 0.0009 + s.ph));
    ctx.beginPath();
    ctx.arc(s.x * vw, sy, s.r, 0, 6.2832);
    ctx.fillStyle = rgba(tintAt(s.hue), (L.a * tw).toFixed(3));
    ctx.fill();
  }
}

/* ---------- scroll-driven parallax decor ---------- */

/* Scroll-driven, so it runs on scroll rather than per frame — the ±400px cull
   is the perf guard. (No [data-para] elements ship until Plan 01-03.) */
function applyPara() {
  const vh = window.innerHeight;
  for (const el of paraEls) {
    const par = el.parentElement;
    if (!par) continue;
    const r = par.getBoundingClientRect();
    if (r.bottom < -400 || r.top > vh + 400) continue;
    const f = parseFloat(el.dataset.para) || 0;
    el.style.transform =
      'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * -f).toFixed(1) + 'px,0)';
  }
}

/* ---------- scroll reveals (MOTION-01) ---------- */

/* Observer-driven, NOT loop-driven (D-37): reveals resolve their own geometry in
   the browser's layout phase, so loop() and onScroll() gain nothing and are left
   untouched — the page does strictly less scroll work than it did before. The IO
   callback deliberately makes NO layout read (no rect measurement); the browser has
   already resolved entry.isIntersecting for us (DEV-1, gate G-5).

   D-34 invariant — the code that hides is the code that shows: this function is the
   ONLY writer of data-rev-state, and styles.css must contain no rule that hides a
   reveal element except ones keyed on data-rev-state, an attribute this function
   creates. If this module fails to load nothing is ever hidden and the page renders
   fully.

   D-36 / MOTION-02 — reduced motion reuses the REDUCED import (:11); no second
   matchMedia and no second prefers-reduced-motion query (styles.css already has one). */
function initReveals() {
  /* Reduced-motion branch first: present everything, never observe, never style. */
  if (REDUCED) {
    for (const el of revealEls) el.dataset.revState = 'shown';
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      /* isIntersecting:false is V4's re-arm — reveals replay on scroll-back. */
      e.target.dataset.revState = e.isIntersecting ? 'shown' : 'hidden';
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
  /* Arm and observe in one synchronous pass: CSS owns the interval, JS never
     computes milliseconds — --rev-i is the unitless stagger index. */
  for (const el of revealEls) {
    el.style.setProperty('--rev-i', String(parseInt(el.dataset.reveal, 10) || 0));
    el.dataset.revState = 'hidden';
    io.observe(el);
  }
}

/* ---------- nav docking (D-01) ---------- */

function syncNav() {
  if (!navEl || !heroRect) return;
  navEl.classList.toggle('nav--docked', heroRect.bottom <= DOCK_AT);
}

/* ---------- pointer parallax (D-05) ---------- */

/* Two gates: no drift under reduced motion, and none on touch devices where
   there is no cursor to drift toward. */
const POINTER_OK = !REDUCED && window.matchMedia('(hover: hover)').matches;

let ptTargetX = 0, ptTargetY = 0, ptX = 0, ptY = 0;

/* Stores the target only — the loop applies it. No layout reads here. */
function onPointerMove(e) {
  if (!heroRect || !heroRect.width || !heroRect.height) return;
  const nx = (e.clientX - (heroRect.left + heroRect.width / 2)) / (heroRect.width / 2);
  const ny = (e.clientY - (heroRect.top + heroRect.height / 2)) / (heroRect.height / 2);
  ptTargetX = Math.max(-1, Math.min(1, nx));
  ptTargetY = Math.max(-1, Math.min(1, ny));
}

/* Drift the [data-parallax] wrapper, never the planets — the engine overwrites
   their transform every frame. The wrapper is inset:0 on the hero, so moving it
   drifts the star and both orbs together and preserves the engine's coordinates. */
function applyPointer() {
  if (!POINTER_OK) return;
  ptX += (ptTargetX - ptX) * DRIFT_EASE;
  ptY += (ptTargetY - ptY) * DRIFT_EASE;
  if (parallaxEl) {
    parallaxEl.style.transform =
      'translate3d(' + (ptX * STAR_DRIFT).toFixed(2) + 'px,' +
      (ptY * STAR_DRIFT).toFixed(2) + 'px,0)';
  }
  if (heroCanvas) {
    heroCanvas.style.transform =
      'translate3d(' + (ptX * CANVAS_DRIFT).toFixed(2) + 'px,' +
      (ptY * CANVAS_DRIFT).toFixed(2) + 'px,0)';
  }
}

/* ---------- loop ---------- */

function loop(now) {
  requestAnimationFrame(loop);
  drawDeep(now);
  star.frame(now);
  applyPointer();
}

function onScroll() {
  cacheHeroRect();
  syncNav();
  applyPara();
}

function onResize() {
  cacheHeroRect();
  syncNav();
}

function renderStatic() {
  const now = performance.now();
  drawDeep(now);
  star.frame(now);
}

function boot() {
  cacheHeroRect();
  syncNav();
  applyPara();
  initReveals();
  /* METHOD's calculator choreography. Observer- and timer-driven (D-37): it adds
     no rAF loop and never touches loop()/onScroll(). Inert without #method. */
  initMethod();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  /* Reduced motion: render exactly one frame and never loop. The engine pins
     b = 0.72 internally, so this is a static, fully-lit gold star — not a blank
     canvas. Re-render on resize since nothing else will. The nav still docks;
     the CSS reduced-motion block flattens its transition. */
  if (REDUCED) {
    renderStatic();
    window.addEventListener('resize', renderStatic, { passive: true });
    return;
  }
  if (POINTER_OK) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }
  requestAnimationFrame(loop);
}

/* E-8 — the engine measures 'o' against the h1's computed font. Before Space
   Grotesk lands those metrics come from the fallback and the star visibly jumps. */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(boot);
} else {
  boot();
}
