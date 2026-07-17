/* Sirio Feltrin — METHOD choreography.

   This module owns ONE thing: the timer-driven calculator sequence in #method
   (CONT-03). It is imported by main.js — index.html ships exactly one
   <script type="module"> and gate G-6 forbids a second <script src>, so this
   file is reached through an import, never through its own script tag.

   It MUST NEVER:
     - add a second animation-frame loop. main.js owns the only rAF loop (D-37).
       The calculator is setTimeout-driven and resolves geometry through an
       IntersectionObserver, in the browser's own layout phase — no forced layout
       reads (gate G-5), no scroll-handler work.
     - add a second reduced-motion source. REDUCED is imported from
       star-engine.js, the single source of truth (D-36). No second media query
       is created here.
     - write raw markup into the DOM. Every screen write is textContent, matching
       star-engine.js:103-104 (L-5 / threat T-02-10): the strings are
       author-controlled literals, and setting element HTML directly would add an
       injection sink the next contributor inherits for free. The sketch's variant
       A built an HTML string — that is NOT the locked variant, not ported from. */

import { REDUCED } from './star-engine.js';

/* Every calculator timing lives in ONE object, at the top, so re-pacing is a
   numbers-only edit. Timing IS the point of this rebuild: Sirio could not read
   the sketch's first cut — every hold was roughly tripled (~7s -> ~21s). Expect
   him to want these slower still, not faster; treat them as a floor. Values and
   their first-cut originals are recorded verbatim from the approved sketch. */
const D = {
  keyStep:   240,   // ms between key presses (was 165)
  mashPause: 3400,  // hold on the meaningless answer  (was ~260)
  preOrder:  1200,  // beat before the order starts
  lineHold:  2600,  // how long each sentence sits before the next (was 520)
  finalHold: 2800,  // before the last line lands
};

/* The two tracks' choreography timings — the same one-object rule as D, so
   re-pacing Act 2 is a numbers-only edit. Values are the approved sketch's.
   ⚠ C-3's lesson is phase-wide: Sirio could not read the first cut and every
   hold was roughly tripled. Treat these as a FLOOR, not a target. */
const T = {
  phStart:   200,  // ms before the first phase in a track lights
  phStep:    700,  // ms between successive phases lighting
  arcAfter:  700,  // ms after the last phase before the return arc draws
  railAfter: 700,  // ms after the arc before the DOCUMENT rail arrives
};

/* Timer hygiene: every setTimeout handle is tracked so a run can clear the lot
   before it starts. Overlapping runs cannot leak timers (sketch bug 2). */
let timers = [];

/* Play-once guard. Without it the sequence could be started twice and the second
   run would clear the first run's timers mid-play, visibly stalling the
   animation (sketch bug 2). One run per page load. */
let played = false;

function playCalc() {
  timers.forEach(clearTimeout);
  timers = [];

  const out = document.getElementById('calc-out');
  const ghost = document.getElementById('calc-ghost');
  const keys = [...document.querySelectorAll('#calc-keys .key')];
  if (!out || !ghost) return;

  keys.forEach((k) => k.classList.remove('key--press'));
  out.classList.remove('calc__out--resolved');
  out.style.whiteSpace = 'pre-line'; // the resolved chain stacks on newlines

  /* Reduced motion FIRST, before any timer is scheduled (UI-SPEC C-5). It skips
     to the RESOLVED state, not a blank one — the argument still lands, only its
     pacing is lost. That is the C-5 test: if any claim existed only in motion,
     the section would be wrong. */
  if (REDUCED) {
    ghost.textContent = 'MAP → STRATEGY → EXECUTE';
    out.classList.add('calc__out--resolved');
    out.textContent = 'THE DIRECTION IS MINE';
    return;
  }

  // Beat 1 — mash the keys. "typing numbers until they matched the answers"
  ghost.textContent = '873 ÷ 41 = ?';
  out.textContent = '0';
  let seq = '';
  const mash = ['7', '3', '8', '4', '1', '9', '2', '6', '5', '0', '3', '7'];
  mash.forEach((d, i) => {
    timers.push(setTimeout(() => {
      const k = keys.find((x) => x.textContent === d);
      if (k) {
        k.classList.add('key--press');
        setTimeout(() => k.classList.remove('key--press'), 130);
      }
      seq = (seq + d).slice(-8);
      out.textContent = seq;
    }, 900 + i * D.keyStep));
  });
  let t = 900 + mash.length * D.keyStep + 300;

  // Beat 2 — the answer that means nothing. The long hold IS the point.
  timers.push(setTimeout(() => {
    ghost.textContent = 'ANSWER MATCHED. UNDERSTOOD NOTHING.';
    out.textContent = '21.29268';
  }, t));
  t += D.mashPause;

  // Beat 3 — the order resolves, one readable line at a time. Lines STACK and
  // stay on screen (\n) so there is time to read each before the next lands.
  timers.push(setTimeout(() => {
    ghost.textContent = 'THEN I LEARNED THE ORDER';
    out.classList.add('calc__out--resolved');
    out.textContent = '';
  }, t));
  t += D.preOrder;

  ['MAP THE PROBLEM', 'CHOOSE THE STRATEGY', 'LET THE TOOL EXECUTE'].forEach((s, i) => {
    timers.push(setTimeout(() => {
      out.textContent += (i ? '\n' : '') + s;
    }, t + i * D.lineHold));
  });
  t += 3 * D.lineHold + D.finalHold;

  timers.push(setTimeout(() => {
    ghost.textContent = 'NEVER THE REVERSE';
    out.textContent = 'THE DIRECTION IS MINE';
  }, t));
}

/* Act 2 — light one track's phases (and, in the loop's case, its return arc and
   DOCUMENT rail) on that track's OWN scroll position. Writes only attribute
   values, never markup (L-5 / threat T-02-17). */
function playTrack(el) {
  const phases = [...el.querySelectorAll('.ph')];

  /* Reduced motion FIRST: set every element to its resolved lit state and
     return — fully lit, every word present, only the pacing lost (UI-SPEC C-5).
     ⚠ This is the case styles.css:1156 CANNOT rescue: it flattens durations but
     does not reset an armed stroke-dashoffset or scaleX(0). JS owns the end
     state. */
  if (REDUCED) {
    phases.forEach((p) => p.setAttribute('data-ph-state', 'lit'));
    el.querySelectorAll('.loop-arc').forEach((a) => a.setAttribute('data-arc-state', 'lit'));
    el.querySelectorAll('.doc-rail').forEach((r) => r.setAttribute('data-rail-state', 'lit'));
    return;
  }

  phases.forEach((p, i) => {
    setTimeout(() => p.setAttribute('data-ph-state', 'lit'), T.phStart + i * T.phStep);
  });

  const after = T.phStart + phases.length * T.phStep;
  const arc = el.querySelector('.loop-arc');
  if (arc) setTimeout(() => arc.setAttribute('data-arc-state', 'lit'), after + T.arcAfter);
  const rail = el.querySelector('.doc-rail');
  if (rail) {
    setTimeout(
      () => rail.setAttribute('data-rail-state', 'lit'),
      after + (arc ? T.arcAfter : 0) + T.railAfter,
    );
  }
}

/* Measure each loop-arc path ONCE, at init, and set --len so the CSS
   stroke-dasharray/offset can draw it. ⚠ getTotalLength() is a layout read, and
   it is SAFE here: one read, at init, OUTSIDE every loop, scroll handler and IO
   callback. Gate G-5 forbids reads in loop()/onScroll()/the IO callback — it does
   NOT apply to initArc(). Do not misapply the gate to it. */
function initArc() {
  document.querySelectorAll('.loop-arc path').forEach((p) => {
    const len = Math.ceil(p.getTotalLength());
    p.style.setProperty('--len', len);
  });
}

/* The module's single export. Inert on any page without #method. */
export function initMethod() {
  const method = document.getElementById('method');
  if (!method) return;

  /* The arc needs its length resolved on BOTH paths — the reduced path sets
     data-arc-state="lit", whose dasharray still needs --len. Measure before
     arming or observing. */
  initArc();

  const tracks = [...method.querySelectorAll('[data-track]')];

  /* Reduced motion: resolve everything immediately and DO NOT attach an
     observer. Under REDUCED there is no sequence to play, so a missed or late IO
     callback would leave the calculator and tracks dimmed forever (the sketch
     learned this the hard way). */
  if (REDUCED) {
    playCalc();
    tracks.forEach((t) => playTrack(t));
    return;
  }

  /* Arm every phase (and, for the loop, its arc + rail) in the SAME synchronous
     pass that observes — the code that hides is the code that shows (D-34). Only
     when not REDUCED: JS never runs -> the attribute never exists -> nothing is
     hidden. */
  tracks.forEach((t) => {
    t.querySelectorAll('.ph').forEach((p) => p.setAttribute('data-ph-state', 'armed'));
    t.querySelectorAll('.loop-arc').forEach((a) => a.setAttribute('data-arc-state', 'armed'));
    t.querySelectorAll('.doc-rail').forEach((r) => r.setAttribute('data-rail-state', 'armed'));
  });

  const target = method.querySelector('.calc') || method.querySelector('.method__act--story');

  /* Play the calculator on its own scroll position, once. threshold 0.18 is the
     sketch's value. No forced layout read in the callback (gate G-5) — the
     observer resolves geometry in the browser's layout phase. */
  if (target) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !played) {
          played = true;
          playCalc();
          io.disconnect();
        }
      }
    }, { threshold: 0.18 });
    io.observe(target);
  }

  /* The track observer — each track lights on its OWN scroll position rather
     than both firing together off-screen (Sirio asked for this explicitly). A
     per-track Set guards each to play once. */
  const trackSeen = new Set();
  const trackIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const name = e.target.dataset.track;
      if (e.isIntersecting && !trackSeen.has(name)) {
        trackSeen.add(name);
        playTrack(e.target);
      }
    }
  }, { threshold: 0.25 });
  tracks.forEach((t) => trackIO.observe(t));
}
