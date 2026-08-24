/* Digital Solutions work card — the "live data" canvas (quick 260824-fms v2).

   Replaces the static spine diagram the card first shipped with: Sirio asked for
   something more visual and dynamic than the three-tools schematic. This is an
   abstract telemetry scene — the page's whole claim ("structure the data at the
   moment it is captured") played as motion:

     raw signals (drifting glow particles, left)
       → cross a parse gate (vertical scanline; a ripple marks each crossing)
       → land as records in a grid (cells bloom on write, then decay),

   so the grid stays in a living steady state: writes arrive, old records fade.
   Nothing here is a chart of real data — it is deliberately abstract.

   Same contract as pump-anim.js (the plate-001 precedent):
     - classic script (not a module), self-inits on DOMContentLoaded;
     - bails silently if #sw-card-viz is absent;
     - reduced motion: paints ONE complete static frame (grid part-filled, gate
       lit, a few particles frozen mid-flight with tails) and never starts rAF;
     - pauses the loop while the card is off-screen (IntersectionObserver).

   Colour is read from the CSS --accent triplet at runtime, so the card keeps the
   work section's Antares gold on the landing page with no colour hard-coded out
   of sync with styles.css. The canvas is aria-hidden decoration — the plate's
   role="button" aria-label carries the semantics. */
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const COLS = 6, ROWS = 5;
  const SPAWN_MS = 460;         /* one signal roughly every half second */
  const FLIGHT_MS = 2300;       /* spawn → landed */
  const GATE_T = 0.62;          /* bezier t at which a particle reads as "parsed" */
  const DECAY_S = 9;            /* seconds for a written record to fade back down */

  function init() {
    const host = document.getElementById('sw-card-viz');
    if (!host) return;

    const canvas = document.createElement('canvas');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* --accent is an RGB triplet string ("255, 199, 119"); fall back to a warm
       neutral if a future refactor ever changes the variable's shape. */
    let ACC = '255, 199, 119';
    const raw = getComputedStyle(host).getPropertyValue('--accent').trim();
    if (/^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$/.test(raw)) ACC = raw;
    const CORE = '235, 242, 255';   /* the site's star-core white-blue */

    let W = 0, H = 0, gateX = 0, cells = [], seeded = false;

    function cellRect(i) {
      const gx0 = W * 0.615, gx1 = W * 0.955;
      const gy0 = H * 0.13, gy1 = H * 0.87;
      const cw = (gx1 - gx0) / COLS, chh = (gy1 - gy0) / ROWS;
      const c = i % COLS, r = (i - c) / COLS;
      return { x: gx0 + c * cw + 3, y: gy0 + r * chh + 3, w: cw - 6, h: chh - 6 };
    }

    function resize() {
      const r = host.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gateX = W * 0.535;
      /* Cell LEVELS survive a resize (only geometry is recomputed), so a window
         drag does not visibly reshuffle the grid. Seed once so the first paint
         is already a living system, not an empty one. */
      if (!seeded) {
        for (let i = 0; i < COLS * ROWS; i++) {
          cells.push({ level: Math.random() < 0.55 ? 0.15 + Math.random() * 0.6 : 0, flash: 0 });
        }
        seeded = true;
      }
    }

    /* One in-flight signal: a cubic bezier from off-canvas left to its cell. */
    function spawn(now) {
      /* Prefer writing into faded cells so the grid churns evenly. */
      let best = 0, bestScore = Infinity;
      for (let k = 0; k < 4; k++) {
        const i = (Math.random() * cells.length) | 0;
        const s = cells[i].level + cells[i].flash * 2;
        if (s < bestScore) { bestScore = s; best = i; }
      }
      const tgt = cellRect(best);
      const y0 = H * (0.12 + Math.random() * 0.76);
      return {
        cell: best,
        born: now,
        p0: { x: -W * 0.03, y: y0 },
        p1: { x: gateX * 0.45, y: y0 + (Math.random() - 0.5) * H * 0.28 },
        p2: { x: gateX, y: (y0 + tgt.y + tgt.h / 2) / 2 },
        p3: { x: tgt.x + tgt.w / 2, y: tgt.y + tgt.h / 2 },
        rippled: false
      };
    }

    function bez(p, t) {
      const u = 1 - t;
      return {
        x: u * u * u * p.p0.x + 3 * u * u * t * p.p1.x + 3 * u * t * t * p.p2.x + t * t * t * p.p3.x,
        y: u * u * u * p.p0.y + 3 * u * u * t * p.p1.y + 3 * u * t * t * p.p2.y + t * t * t * p.p3.y
      };
    }
    const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let particles = [], ripples = [], lastSpawn = 0;

    function drawFrame(now, dt) {
      ctx.clearRect(0, 0, W, H);

      /* Faint dot lattice — the same quiet ground the blueprint plate uses. */
      const step = Math.max(22, W / 30);
      ctx.fillStyle = 'rgba(' + ACC + ', 0.07)';
      for (let x = step / 2; x < W; x += step)
        for (let y = step / 2; y < H; y += step)
          ctx.fillRect(x, y, 1, 1);

      /* The parse gate: a breathing vertical scanline. */
      const breath = 0.55 + 0.25 * Math.sin(now / 1400);
      const gg = ctx.createLinearGradient(0, H * 0.06, 0, H * 0.94);
      gg.addColorStop(0, 'rgba(' + ACC + ', 0)');
      gg.addColorStop(0.5, 'rgba(' + ACC + ', ' + (0.75 * breath) + ')');
      gg.addColorStop(1, 'rgba(' + ACC + ', 0)');
      ctx.strokeStyle = gg;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(gateX, H * 0.06);
      ctx.lineTo(gateX, H * 0.94);
      ctx.stroke();

      /* Record cells. */
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i], r = cellRect(i);
        if (dt) {
          c.level = Math.max(0, c.level - dt / DECAY_S);
          c.flash = Math.max(0, c.flash - dt * 2.6);
        }
        const a = 0.05 + 0.30 * c.level + 0.45 * c.flash;
        const s = 0.14 + 0.50 * c.level + 0.45 * c.flash;
        ctx.fillStyle = 'rgba(' + ACC + ', ' + a + ')';
        ctx.strokeStyle = 'rgba(' + ACC + ', ' + s + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(r.x, r.y, r.w, r.h, 4);
        else ctx.rect(r.x, r.y, r.w, r.h);
        ctx.fill();
        ctx.stroke();
        if (c.flash > 0.02) {           /* fresh write: a white-hot core blink */
          ctx.fillStyle = 'rgba(' + CORE + ', ' + (0.5 * c.flash) + ')';
          ctx.beginPath();
          ctx.arc(r.x + r.w / 2, r.y + r.h / 2, 2.4 + 2 * c.flash, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* Gate-crossing ripples. */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += (dt || 0) * 46;
        rp.a -= (dt || 0) * 2.2;
        if (rp.a <= 0) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = 'rgba(' + CORE + ', ' + rp.a + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* Signals in flight, each with a bezier-following tail. */
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const t = easeInOut(Math.min(1, (now - p.born) / FLIGHT_MS));
        if (!p.rippled && t >= GATE_T) {
          p.rippled = true;
          const g = bez(p, GATE_T);
          ripples.push({ x: g.x, y: g.y, r: 2, a: 0.5 });
        }
        if (t >= 1) {
          cells[p.cell].level = 1;
          cells[p.cell].flash = 1;
          particles.splice(i, 1);
          continue;
        }
        const pos = bez(p, t);
        const parsed = t >= GATE_T;
        /* Tail: a short poly-segment of the path behind the head. */
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        for (let k = 1; k <= 5; k++) {
          const bt = Math.max(0, t - k * 0.028);
          const bp = bez(p, bt);
          ctx.lineTo(bp.x, bp.y);
        }
        ctx.strokeStyle = 'rgba(' + ACC + ', ' + (parsed ? 0.55 : 0.3) + ')';
        ctx.lineWidth = parsed ? 1.5 : 1.1;
        ctx.stroke();
        /* Head: soft glow + core. Brighter once parsed. */
        const glowR = parsed ? 7 : 5;
        const gr = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowR);
        gr.addColorStop(0, 'rgba(' + CORE + ', ' + (parsed ? 0.95 : 0.65) + ')');
        gr.addColorStop(0.45, 'rgba(' + ACC + ', ' + (parsed ? 0.55 : 0.35) + ')');
        gr.addColorStop(1, 'rgba(' + ACC + ', 0)');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ---- static path (reduced motion): one finished-looking frame ---- */
    if (REDUCED) {
      resize();
      const now = 800;              /* any fixed clock value works for a still */
      for (let k = 0; k < 3; k++) {
        const p = spawn(now - 400 - k * 600);
        particles.push(p);
      }
      drawFrame(now, 0);
      particles = [];
      window.addEventListener('resize', () => { resize(); drawFrame(now, 0); });
      return;
    }

    /* ---- live path ---- */
    let running = true, last = 0;
    function loop(now) {
      requestAnimationFrame(loop);
      if (!running || !W) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (now - lastSpawn > SPAWN_MS && particles.length < 7) {
        lastSpawn = now;
        particles.push(spawn(now));
      }
      drawFrame(now, dt);
    }

    new IntersectionObserver((es) => {
      for (const e of es) running = e.isIntersecting;
    }, { threshold: 0 }).observe(host);

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
