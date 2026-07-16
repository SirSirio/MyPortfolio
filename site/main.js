/* Sirio Feltrin — portfolio entry module.

   Composes two things the approved design snapshots kept separate:
     - the living Sirio Star hero  (design/Sirio Star.dc.html)
     - the deep-field cosmos       (design/Sirio V4 - Deep Field x Hyperlight.dc.html)

   The engine (star-engine.js) owns everything inside [data-hero]. This module
   supplies the palette, the tempo, the deep field, and ONE rAF loop that drives
   both canvases. Do not add a second loop. */

import { HeroStar, REDUCED, DPR, tintAt, rgba } from './star-engine.js';

const heroEl = document.querySelector('[data-hero]');
const deepEl = document.querySelector('[data-deep]');
const paraEls = Array.from(document.querySelectorAll('[data-para]'));

/* ---------- the star ---------- */

/* periodSec: 20 is mandatory — the engine defaults to 15, and 20s ("Slow") is
   the approved tempo. transparent: true is D-04 — it swaps the engine's opaque
   background fill for a clearRect so the fixed deep field shows through the hero. */
const star = new HeroStar(heroEl, { periodSec: 20, transparent: true });

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

/* ---------- loop ---------- */

function loop(now) {
  requestAnimationFrame(loop);
  drawDeep(now);
  star.frame(now);
}

function onScroll() {
  applyPara();
}

function renderStatic() {
  const now = performance.now();
  drawDeep(now);
  star.frame(now);
}

function boot() {
  applyPara();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Reduced motion: render exactly one frame and never loop. The engine pins
     b = 0.72 internally, so this is a static, fully-lit gold star — not a blank
     canvas. Re-render on resize since nothing else will. */
  if (REDUCED) {
    renderStatic();
    window.addEventListener('resize', renderStatic, { passive: true });
    return;
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
