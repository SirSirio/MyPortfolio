/* Sirio Feltrin — portfolio entry module.

   Composes two things the approved design snapshots kept separate:
     - the living Sirio Star hero  (design/Sirio Star.dc.html)
     - the deep-field cosmos       (design/Sirio V4 - Deep Field x Hyperlight.dc.html)

   The engine (star-engine.js) owns everything inside [data-hero]. This module
   supplies the palette, the tempo, the deep field, and ONE rAF loop that drives
   both canvases. Do not add a second loop. */

import { HeroStar, REDUCED, DPR, tintAt, rgba, clamp, lerp3 } from './star-engine.js';
import { initMethod } from './method.js';
import { applyLang, getInitialLang, onLangChange, TERMS } from './i18n.js';

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
  /* MOTION-02 / D-36 — parallax is continuous scroll-driven motion, so it is
     suppressed under reduced motion. Returning before the transform write leaves
     every [data-para] element at its natural position (no translate). */
  if (REDUCED) return;
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

/* ---------- warp / hyperlight transitions (ported from the V4 design) ----------

   Ported VERBATIM in logic from the approved design snapshot
   `.planning/phases/01-the-design-build/design/Sirio V4 - Deep Field x Hyperlight.dc.html:394-550`
   (the DC-class warp methods), translated from a class to module scope:
     - `this.eng.X`  → the named star-engine imports (clamp, tintAt, rgba, lerp3)
     - `this.reduced` → the REDUCED import; `this.dpr` → the DPR import
     - the DC prop knobs (warpIntensity / jumpSeconds / starDensity) collapse to
       their DC defaults as the module constants below.
   This owns the click → deep-dive → return transition and paints the [data-warpc]
   overlay canvas. openProj/closeProj honour reduced motion with an instant swap
   (no starfield warp). D-20's engine-pause guard lives in loop() below. */

const JUMP_MS = 1600;   /* DC jumpSeconds default (1.6s) — the warp duration */
const WARP_INT = 1;     /* DC warpIntensity default — scales the star speed */
const WARP_DENS = 1;    /* DC starDensity default — scales the warp star count */

const fieldEl = document.querySelector('[data-field]');
const warpov = document.querySelector('[data-warpov]');
const warpc = document.querySelector('[data-warpc]');
const flash = document.querySelector('[data-flash]');

let curProj = null;   /* id of the open project overlay, or null when on the field */
let trans = null;     /* the active warp transition, or null when idle */
let burst = null;     /* a short scroll-jump burst (inert until a [data-jump] wires it) */
let _wt = performance.now();
let ot2Ctx = null;    /* the OT-2 deep-dive GSAP context (Plan 03), or null when torn down */

/* The warp starfield: points stream out of the centre as their z shrinks toward 0
   (ported from .dc.html:337-338). spawn seeds one at a random angle and radius. */
function spawn(z) {
  const a = Math.random() * Math.PI * 2;
  const rr = 0.25 + Math.pow(Math.random(), 0.6) * 1.25;
  return { x: Math.cos(a) * rr, y: Math.sin(a) * rr, z: z || 1, hue: Math.random() };
}
const wstars = Array.from({ length: Math.round(340 * WARP_DENS) }, () => spawn(Math.random()));

function projEl(id) { return document.querySelector('[data-proj="' + id + '"]'); }

function openProj(id) {
  if (trans) return;
  const target = projEl(id); if (!target) return;
  const fromId = curProj && curProj !== id ? curProj : null;
  const pos = parseFloat(target.dataset.pos); /* palette position of the destination */
  if (REDUCED) {
    if (fromId) { const f = projEl(fromId); if (f) { f.style.visibility = 'hidden'; f.style.opacity = '0'; } }
    target.style.visibility = 'visible'; target.style.opacity = '1'; target.scrollTop = 0;
    document.body.style.overflow = 'hidden'; curProj = id; return;
  }
  trans = {
    start: performance.now(), dur: JUMP_MS, pos: isNaN(pos) ? 0 : pos, max: 0.016 * WARP_INT,
    out: fromId ? { id: fromId } : { isField: true },
    into: { id: id }
  };
  curProj = id;
}

function closeProj() {
  if (trans || !curProj) return;
  const id = curProj;
  /* Tear down the OT-2 scroll-telling before the return warp — ctx.revert() kills
     every tween + ScrollTrigger and restores inline styles, so a reopen rebuilds
     cleanly (no leaked/duplicate triggers). No-ops when nothing was built (reduced
     motion, or a different overlay). Covers both the reduced and animated paths. */
  killOt2Motion();
  if (REDUCED) {
    const p = projEl(id); if (p) { p.style.visibility = 'hidden'; p.style.opacity = '0'; }
    document.body.style.overflow = ''; curProj = null; return;
  }
  trans = {
    start: performance.now(), dur: JUMP_MS, live: true, max: 0.016 * WARP_INT,
    out: { id: id },
    into: { isField: true }
  };
  curProj = null;
}

function startBurst() {
  if (REDUCED || trans) return;
  burst = { start: performance.now(), dur: 950, live: true, max: 0.0075 * WARP_INT };
}

/* ---------- OT-2 deep-dive scroll-telling (Plan 02.1-03) ----------

   The "machine assembles itself" motion layer for the [data-proj="ot2"] overlay,
   built with the vendored GSAP core + ScrollTrigger (index.html tail scripts, which
   attach window.gsap + window.ScrollTrigger before this module runs). Design rules,
   all enforced here:
     - REDUCED is the SINGLE reduced-motion source (no second media-query source, no
       gsap reduced-motion helper). Under reduced motion nothing is built and every
       section renders complete by
       default — GSAP is the ONLY thing that animates, and gsap.from()/timelines set
       their own "from" state at runtime, so a no-JS / reduced visitor sees the final
       state (RESEARCH Pattern 4, D-36).
     - Every ScrollTrigger sets scroller = the [data-proj="ot2"] element — NEVER the
       window, which is frozen while the overlay is open (RESEARCH Pitfall 1).
     - Built only AFTER the warp completes (called from applyTrans at t>=1), so
       ScrollTrigger never measures the scaled/blurred inner (RESEARCH § R-03), then
       ScrollTrigger.refresh() recomputes.
     - Every trigger lives inside gsap.context(fn, scroller); killOt2Motion() →
       ctx.revert() kills every tween + trigger and restores inline styles, so a
       reopen rebuilds cleanly (no leaks — threat T-02.1-07).
     - Vocabulary is transform / opacity / stroke-dashoffset ONLY (cheap on mobile,
       R-01); draw-on uses POSITIVE dashoffset (Safari-safe, Pattern 2); every tween
       is scrub-linked to the overlay scroll (no autonomous loops — the signature
       automation motion is the real timelapse video now leading the masthead). */
function initOt2Motion() {
  if (REDUCED) return;
  const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;   /* vendored globals must be live at runtime */
  const scroller = document.querySelector('[data-proj="ot2"]');
  if (!scroller) return;
  gsap.registerPlugin(ScrollTrigger);

  ot2Ctx = gsap.context(() => {
    /* Seed a draw-on: dasharray = dashoffset = path length, so the stroke starts
       hidden and tweens to 0 (positive offset only — Safari mishandles negative). */
    const seedDraw = (sel) => gsap.utils.toArray(sel).forEach((el) => {
      const len = (el.getTotalLength && el.getTotalLength()) || 0;
      if (len) gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });

    /* — APPROACH: the hand-built Double Diamond outline draws itself on as the
         section enters, scrub-linked to the overlay scroll (POSITIVE dashoffset,
         Safari-safe). Static + fully drawn by default under reduced motion / no JS. — */
    seedDraw('.dd-edge');
    const ddTl = gsap.timeline({
      scrollTrigger: { scroller, trigger: '[data-ot2-diamond]', start: 'top 88%', end: 'top 40%', scrub: 0.6 }
    });
    /* Both edges draw on together, LEFT-TO-RIGHT: the outline expands (diverge) then
       narrows (converge), twice. Fills, cues and phase names fade in in the same order. */
    ddTl.to('.dd-edge', { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
    ddTl.from('.dd-frame', { opacity: 0, ease: 'none', duration: 0.4 }, 0);
    ddTl.from('.dd-tri', { opacity: 0, ease: 'none', stagger: 0.25, duration: 0.5 }, 0.1);
    ddTl.from('.dd-cue', { opacity: 0, ease: 'none', stagger: 0.2, duration: 0.35 }, 0.15);
    ddTl.from('.dd-name', { opacity: 0, y: 6, ease: 'none', stagger: 0.25, duration: 0.4 }, 0.2);

    /* — BUILD: the CAD parts assemble onto the deck-plan plate, part by part,
         scrub-linked to the overlay scroll. — */
    gsap.from('[data-ot2-assembly] .blueprint__part', {
      y: 44, scale: 0.85, opacity: 0, transformOrigin: '50% 100%', ease: 'none', stagger: 0.12,
      scrollTrigger: { scroller, trigger: '[data-ot2-assembly] .blueprint', start: 'top 84%', end: 'top 40%', scrub: 0.6 }
    });

    /* — OUTCOME: the big display numbers rise with a scrubbed emphasis. — */
    gsap.from('[data-ot2-outcome] .ot2-stat__n', {
      y: 30, opacity: 0, ease: 'none', stagger: 0.1,
      scrollTrigger: { scroller, trigger: '[data-ot2-outcome] .ot2-stats', start: 'top 90%', end: 'top 56%', scrub: 0.6 }
    });
  }, scroller);

  ScrollTrigger.refresh();   /* recompute now the warp transform/filter are cleared */
}

function killOt2Motion() {
  if (ot2Ctx) { ot2Ctx.revert(); ot2Ctx = null; }
}

/* palette position of the current scroll — the warp inherits the gradient the page is at */
function scrollPos() {
  const doc = document.documentElement;
  return clamp(window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight), 0, 1);
}

function applyTrans(now) {
  const tr = trans; if (!tr) return;
  const t = clamp((now - tr.start) / tr.dur, 0, 1);
  const vh = window.innerHeight;
  const outEl = tr.out.isField ? fieldEl : projEl(tr.out.id);
  const inEl = tr.into.isField ? fieldEl : projEl(tr.into.id);
  const h = clamp(t / 0.5, 0, 1);
  const b = clamp((t - 0.5) / 0.5, 0, 1);
  /* departure: fly past the outgoing view */
  if (outEl && t < 0.55) {
    const ea = h * h;
    const tgt = tr.out.isField ? outEl : (outEl.querySelector('[data-proj-inner]') || outEl);
    if (tr.out.isField) tgt.style.transformOrigin = '50% ' + (window.scrollY + vh / 2) + 'px';
    tgt.style.transform = 'scale(' + (1 + ea * 4).toFixed(3) + ')';
    tgt.style.filter = 'blur(' + (ea * 9).toFixed(1) + 'px)';
    outEl.style.opacity = clamp(1 - h * 1.3, 0, 1).toFixed(3);
  }
  /* mid-point swap (masked by the warp field) — load-bearing DOM handover */
  if (t >= 0.5 && !tr._mid) {
    tr._mid = true;
    if (!tr.out.isField && outEl) {
      outEl.style.visibility = 'hidden'; outEl.style.opacity = '0';
      const oi = outEl.querySelector('[data-proj-inner]'); if (oi) { oi.style.transform = ''; oi.style.filter = ''; }
    }
    if (!tr.into.isField && inEl) { inEl.style.visibility = 'visible'; inEl.scrollTop = 0; document.body.style.overflow = 'hidden'; }
    if (tr.into.isField) document.body.style.overflow = '';
  }
  /* arrival: incoming view scales up out of the warp */
  if (t >= 0.5 && inEl) {
    const eb = 1 - Math.pow(1 - b, 3);
    const tgt = tr.into.isField ? inEl : (inEl.querySelector('[data-proj-inner]') || inEl);
    if (tr.into.isField) tgt.style.transformOrigin = '50% ' + (window.scrollY + vh / 2) + 'px';
    const sc = tr.into.isField ? (3.2 - 2.2 * eb) : (0.32 + 0.68 * eb);
    tgt.style.transform = 'scale(' + sc.toFixed(3) + ')';
    tgt.style.filter = b > 0.96 ? 'none' : 'blur(' + ((1 - eb) * 10).toFixed(1) + 'px)';
    inEl.style.opacity = clamp(b * 1.4, 0, 1).toFixed(3);
  }
  if (t >= 1) {
    if (inEl) {
      inEl.style.opacity = tr.into.isField ? '' : '1';
      const tg = tr.into.isField ? inEl : (inEl.querySelector('[data-proj-inner]') || inEl);
      tg.style.transform = ''; tg.style.filter = '';
    }
    if (outEl && tr.out.isField) { outEl.style.transform = ''; outEl.style.filter = ''; outEl.style.opacity = ''; }
    const intoId = tr.into.id;
    trans = null;   /* clear FIRST so the engine-pause guard is active and ScrollTrigger
                       measures a settled, transform-free inner (RESEARCH § R-03). */
    /* Build the OT-2 scroll-telling only once the warp INTO ot2 has fully landed. */
    if (intoId === 'ot2') initOt2Motion();
  }
}

/* ---------- warp starfield overlay ---------- */
function drawWarp(now) {
  const c = warpc; if (!c) return;
  const dt = Math.max(1, Math.min(50, now - _wt)); _wt = now;
  const act = trans || burst;
  if (!act) {
    if (warpov && warpov.style.opacity !== '0') warpov.style.opacity = '0';
    if (flash && flash.style.opacity !== '0') flash.style.opacity = '0';
    if (c._painted) { const x = c.getContext('2d'); x.clearRect(0, 0, c.width, c.height); c._painted = false; }
    return;
  }
  const isJump = act === trans;
  const t = clamp((now - act.start) / act.dur, 0, 1);
  warpov.style.opacity = '1';
  const vw = window.innerWidth, vh = window.innerHeight;
  const W = Math.round(vw * DPR), H = Math.round(vh * DPR);
  if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
  const ctx = c.getContext('2d');
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, vw, vh);
  c._painted = true;
  const prof = Math.pow(Math.sin(Math.PI * t), 1.4);
  const speed = prof * act.max;
  const bgA = isJump ? clamp(prof * 1.7, 0, 1) : prof * 0.3;
  ctx.fillStyle = 'rgba(4,5,12,' + bgA.toFixed(3) + ')';
  ctx.fillRect(0, 0, vw, vh);
  /* tint follows the page palette: live scroll position for returns, destination sector for jumps */
  const pos = act.live ? scrollPos() : (act.pos || 0);
  const tint = tintAt(pos);
  const cx = vw / 2, cy = vh / 2, f = Math.min(vw, vh) * 0.5;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(vw, vh) * 0.55);
  g.addColorStop(0, rgba(tint, (0.04 + 0.16 * prof).toFixed(3)));
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, vw, vh);
  ctx.lineCap = 'round';
  for (let k = 0; k < wstars.length; k++) {
    const s = wstars[k];
    s.z -= speed * dt * 0.06 * (0.7 + s.hue * 0.6);
    if (s.z <= 0.035) { wstars[k] = spawn(1); continue; }
    const px = cx + s.x / s.z * f, py = cy + s.y / s.z * f;
    if (px < -60 || px > vw + 60 || py < -60 || py > vh + 60) { wstars[k] = spawn(1); continue; }
    const near = 1 - s.z;
    /* per-star spread: sample neighbouring palette colours around the section tint */
    const col = lerp3([225, 232, 250], tintAt(clamp(pos + (s.hue - 0.5) * 0.26, 0, 1)), 0.3 + s.hue * 0.5);
    const a = clamp((0.08 + near * 0.75) * (0.25 + 0.75 * prof), 0, 0.85);
    const streak = speed * 900 * (0.5 + near);
    if (streak > 1.2) {
      const z2 = Math.min(1, s.z + speed * 40 * (0.7 + s.hue * 0.6));
      const qx = cx + s.x / z2 * f, qy = cy + s.y / z2 * f;
      const grad = ctx.createLinearGradient(px, py, qx, qy);
      grad.addColorStop(0, rgba(col, a.toFixed(3)));
      grad.addColorStop(1, rgba(col, 0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.7 + near * 1.7;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke();
    } else {
      const tw = 0.45 + 0.55 * Math.abs(Math.sin(now * 0.0009 + s.hue * 6.28));
      ctx.fillStyle = rgba(col, (a * tw).toFixed(3));
      ctx.beginPath(); ctx.arc(px, py, 0.5 + near * 1.6, 0, 6.2832); ctx.fill();
    }
  }
  if (flash) flash.style.opacity = isJump ? (Math.pow(Math.abs(Math.sin(Math.PI * t)), 10) * 0.5).toFixed(3) : '0';
  if (!isJump && t >= 1) burst = null;
}

/* ---------- loop ---------- */

function loop(now) {
  requestAnimationFrame(loop);
  /* D-20 engine-pause guard: while a project overlay is open (and not mid-warp)
     the deep-field engine and pointer drift PAUSE so the subpage owns the frame
     budget. The warp itself (applyTrans/drawWarp) always runs — both self-clear
     when idle — and star.frame keeps the hero alive for the return. */
  if (!(curProj && !trans)) { drawDeep(now); applyPointer(); }
  star.frame(now);
  applyTrans(now);
  drawWarp(now);
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

/* ---------- language toggle (i18n, quick 260720-p2u) ----------

   The nav EN/IT control switches the whole site. applyLang() (in i18n.js) rewrites
   every [data-i18n*] node; these two helpers feed it the two DYNAMIC surfaces the
   dictionary can't reach through markup: the hero typewriter's term list and the
   toggle's own pressed-state. termsFor() resolves the language's term array (EN falls
   back if a lang is missing); syncLangButtons() reflects the active language on the
   two buttons for AT + the CSS active treatment. */
function termsFor(lang) {
  return TERMS[lang] || TERMS.en;
}
function syncLangButtons(lang) {
  document.querySelectorAll('.nav__lang-btn').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
}

function boot() {
  cacheHeroRect();
  syncNav();
  applyPara();
  initReveals();
  /* METHOD's calculator choreography. Observer- and timer-driven (D-37): it adds
     no rAF loop and never touches loop()/onScroll(). Inert without #method. */
  initMethod();
  /* Language wiring (i18n). Register the typewriter subscriber BEFORE the first
     applyLang so the hero renders in the initial language; method.js registered its
     own calc subscriber inside initMethod() just above. The toggle uses <button>s
     (state, not navigation). Then resolve the initial language (stored choice ->
     browser -> English) and apply it ONCE — after initReveals()/initMethod() so
     every annotated element and every subscriber already exists. This runs BEFORE
     the reduced-motion return below, so Italian text ships under reduced motion too. */
  onLangChange((lang) => star.setLang(termsFor(lang)));
  document.querySelectorAll('.nav__lang-btn').forEach((b) => {
    b.addEventListener('click', () => { applyLang(b.dataset.lang); syncLangButtons(b.dataset.lang); });
  });
  const initialLang = getInitialLang();
  applyLang(initialLang);
  syncLangButtons(initialLang);
  /* Warp open/close wiring (D-04). Wired ONCE here — the site has no per-frame
     acquire(), so no __wired guard is needed. Click + Enter/Space give the OT-2
     card keyboard parity (A11y — it is not a mouse-only trap). This sits BEFORE
     the reduced-motion return below on purpose: openProj/closeProj each have a
     REDUCED branch that swaps instantly, so reduced-motion visitors still open
     and close the deep-dive. */
  document.querySelectorAll('[data-open]').forEach((b) => {
    b.addEventListener('click', (e) => { e.preventDefault(); openProj(b.dataset.open); });
    b.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProj(b.dataset.open); }
    });
  });
  document.querySelectorAll('[data-close]').forEach((b) => {
    b.addEventListener('click', (e) => { e.preventDefault(); closeProj(); });
  });
  /* MOTION-02 — media-slot clips carry no autoplay attribute (see index.html).
     Start every one here only when motion is allowed; reduced-motion visitors
     keep the static poster and get manual controls instead. querySelectorAll (not
     a single querySelector) so BOTH the OT-2 composite clip and the pump-head clip
     are covered — a lone querySelector would only start whichever comes first in
     the DOM, silently leaving the other frozen. */
  document.querySelectorAll('.media-slot video').forEach((clip) => {
    if (REDUCED) clip.setAttribute('controls', '');
    else clip.play().catch(() => {});
  });
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
