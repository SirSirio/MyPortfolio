/* Portable Precision Liquid Dispenser — pump-head fluidic-path animation.

   Lifted VERBATIM from Sirio's thesis site (sirsirio.github.io/thesis-tools,
   the landing page's #hero-rotor motif) so the portfolio shows the exact same
   scene: a 50 ml Falcon-style source → dip tube → tangential entry into a 4-roller
   peristaltic pump head (proto-02 geometry: N=4, R=19.7 mm, rollerR=5 mm, 180°
   top wrap) → needle → open 1.5 ml Eppendorf. Motion is one GSAP timeline: rotor
   rotation and the liquid slug's stroke-dashoffset share the same clock, so they
   are phase-locked by construction.

   Only two things changed from the thesis original:
     - the container id is #pump-anim (was #hero-rotor);
     - the code is wrapped in an IIFE and self-inits on DOMContentLoaded here,
       instead of running inline in the thesis page's own module.

   Classic script (not a module) so the vendored global `gsap` is available; loaded
   after assets/vendor/gsap.min.js and before main.js in index.html. If gsap is
   missing or #pump-anim is absent, it bails silently. Reduced motion is handled
   inside initHeroMotion() (freezes on a legible static frame). The .hero-* classes
   are scoped under .pump-anim in styles.css so nothing here leaks into the page. */
(function () {
  'use strict';

  const cosd = a => Math.cos(a * Math.PI / 180);
  const sind = a => Math.sin(a * Math.PI / 180);

  function buildHeroRotor() {
    const N = 4;        // roller count (fixed)
    const R = 19.7;      // rotor radius, mm — proto-02 design value
    const rollerR = 5;   // MR105ZZ bearing radius, mm (10 mm OD)
    const f = v => v.toFixed(2);

    // ── Pump (rotor) geometry ──
    const pcx = 380, pcy = 150;  // pump centre, SVG user-space
    const OUTER = 64;            // visual budget for R + rollerR, in SVG user units
    const scale = OUTER / (R + rollerR);
    const Rpx = R * scale;
    const rrPx = rollerR * scale;

    // 4 rollers at 90° spacing on the pitch circle, first at top (-90°)
    let rollers = '';
    for (let i = 0; i < N; i++) {
      const ang = -90 + i * 360 / N;
      const x = pcx + Rpx * cosd(ang);
      const y = pcy + Rpx * sind(ang);
      rollers += `<circle class="hero-roller" cx="${f(x)}" cy="${f(y)}" r="${f(rrPx)}" />`;
    }
    const rotorGroup = `<g id="hero-rotor-group">
      <circle class="hero-hub" cx="${pcx}" cy="${pcy}" r="${f(rrPx * 0.45)}" />
      ${rollers}
    </g>`;

    // Wrap endpoints sit on the horizontal through the pump centre; control
    // points directly below force a vertical (tangent-to-pitch-circle) approach.
    const wrapLeftX = pcx - Rpx, wrapRightX = pcx + Rpx;

    // ── 50 ml Falcon-style source (screw cap, ticks, conical bottom, liquid
    // pooled into the cone), far left ──
    const srcX0 = 30, srcX1 = 100, srcCx = (srcX0 + srcX1) / 2;
    const capX0 = 27, capX1 = 103, capY0 = 20, capY1 = 38;
    const bodyTop = 38, bodyBottom = 190;
    const coneTipY = bodyBottom + Math.round((bodyBottom - bodyTop) / 4);
    const liquidTop = bodyBottom - 60;
    let ticks = '';
    const tickCount = 5;
    for (let i = 0; i < tickCount; i++) {
      const ty = bodyTop + (bodyBottom - bodyTop) * (i + 1) / (tickCount + 1);
      ticks += `<line class="hero-vessel-tick" x1="${srcX1 - 10}" y1="${f(ty)}" x2="${srcX1}" y2="${f(ty)}" />`;
    }
    const sourceVessel = `
      <path class="hero-vessel" d="M ${srcX0} ${bodyBottom} L ${srcCx} ${coneTipY} L ${srcX1} ${bodyBottom} Z" />
      <rect class="hero-vessel" x="${srcX0}" y="${bodyTop}" width="${srcX1 - srcX0}" height="${bodyBottom - bodyTop}" rx="6" />
      <path class="hero-vessel-liquid" d="M ${srcX0} ${bodyBottom} L ${srcCx} ${coneTipY} L ${srcX1} ${bodyBottom} Z" />
      <rect class="hero-vessel-liquid" x="${srcX0 + 3}" y="${liquidTop}" width="${srcX1 - srcX0 - 6}" height="${bodyBottom - liquidTop}" rx="4" />
      ${ticks}
      <rect class="hero-vessel-cap" x="${capX0}" y="${capY0}" width="${capX1 - capX0}" height="${capY1 - capY0}" rx="3" />
      <line class="hero-vessel-tick" x1="${capX0 + 5}" y1="26" x2="${capX1 - 5}" y2="26" />
      <line class="hero-vessel-tick" x1="${capX0 + 5}" y1="32" x2="${capX1 - 5}" y2="32" />`;

    // Dip tube: just above the conical bottom, rising through the cap.
    const dipStart = { x: srcCx, y: coneTipY - 16 };
    const capExit  = { x: srcCx, y: capY0 - 6 };

    // ── 1.5 ml Eppendorf-style collection tube (short shoulder, aggressive
    // taper, small liquid pool, open snap cap on a hinge), far right ──
    const dstX0 = 583, dstX1 = 617, dstCx = (dstX0 + dstX1) / 2;
    const shoulderTop = 228, shoulderBottom = 242;
    const eppTipY = shoulderBottom + 50;
    const liqFrac = 0.46;
    const liqY = shoulderBottom + (eppTipY - shoulderBottom) * liqFrac;
    const halfWidthAtLiqY = ((dstX1 - dstX0) / 2) * (1 - liqFrac);
    const hinge = { x: dstX1, y: shoulderTop };
    const capFlapLen = 22;
    const destVessel = `
      <path class="hero-vessel" d="M ${dstX0} ${shoulderBottom} L ${dstCx} ${eppTipY} L ${dstX1} ${shoulderBottom} Z" />
      <rect class="hero-vessel" x="${dstX0}" y="${shoulderTop}" width="${dstX1 - dstX0}" height="${shoulderBottom - shoulderTop}" rx="4" />
      <path class="hero-vessel-liquid" d="M ${f(dstCx - halfWidthAtLiqY)} ${f(liqY)} L ${f(dstCx + halfWidthAtLiqY)} ${f(liqY)} L ${dstCx} ${eppTipY} Z" />
      <rect class="hero-cap-flap" x="${hinge.x - capFlapLen}" y="${hinge.y - 4}" width="${capFlapLen}" height="8" rx="3" transform="rotate(135 ${hinge.x} ${hinge.y})" />
      <circle class="hero-cap-hinge" cx="${hinge.x}" cy="${hinge.y}" r="2.4" />`;

    // Needle: short, rigid, straight — visually distinct from the soft tube.
    const needleTop = { x: dstCx, y: 195 };
    const needleTip = { x: dstCx, y: shoulderTop - 8 };
    const needleLine = `<line class="hero-needle" x1="${needleTop.x}" y1="${needleTop.y}" x2="${needleTip.x}" y2="${needleTip.y}" />`;
    const dropletCircle = `<circle class="hero-droplet" id="hero-droplet" cx="${needleTip.x}" cy="${needleTip.y}" r="4.5" />`;

    // One continuous path: dip tube → vertical-tangent Bezier into the wrap →
    // 180° top wrap → vertical-tangent Bezier into the needle-top hand-off.
    // preWrapD is the same first two segments, rendered display:none, purely so
    // initHeroMotion() can .getTotalLength() the real wrap-entry arc position.
    const preWrapD = `M ${dipStart.x} ${dipStart.y} `
      + `L ${capExit.x} ${capExit.y} `
      + `C ${capExit.x} ${capExit.y - 20}, ${f(wrapLeftX)} ${f(pcy + 25)}, ${f(wrapLeftX)} ${pcy}`;
    const tubeD = preWrapD + ` `
      + `A ${f(Rpx)} ${f(Rpx)} 0 0 0 ${f(wrapRightX)} ${pcy} `
      + `C ${f(wrapRightX)} ${f(pcy + 35)}, ${needleTop.x} ${needleTop.y - 20}, ${needleTop.x} ${needleTop.y}`;

    const html = `<svg viewBox="0 0 700 320" width="100%" style="max-width:580px;height:auto;" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="hero-packet-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--accent)"/>
          <stop offset="100%" stop-color="var(--accent-2)"/>
        </linearGradient>
      </defs>
      ${sourceVessel}
      ${destVessel}
      <path class="hero-tube-wall" d="${tubeD}" />
      <path class="hero-tube-liquid" d="${tubeD}" />
      <path class="hero-tube-slug" id="hero-tube-slug" d="${tubeD}" />
      <path id="hero-tube-prewrap" d="${preWrapD}" style="display:none" />
      ${needleLine}
      ${dropletCircle}
      <circle class="hero-rotor-disc" cx="${pcx}" cy="${pcy}" r="${f(Rpx)}" />
      ${rotorGroup}
    </svg>`;

    return { html, geo: { Rpx, rrPx, needleTip } };
  }

  // ── GSAP-driven motion — ONE timeline drives rotor rotation and the slug
  // stroke-dashoffset. ROTOR_SIGN and FLOW_SIGN are independent so the liquid
  // always advances Falcon → needle regardless of spin direction. The sync
  // derivation (slug speed = roller tangential speed, spacing = quarter wrap)
  // is computed at runtime from the real DOM-measured geometry, not eyeballed.
  function initHeroMotion(geo) {
    const rotorGroupEl = document.getElementById('hero-rotor-group');
    const slugEl = document.getElementById('hero-tube-slug');
    const dropletEl = document.getElementById('hero-droplet');
    const preWrapEl = document.getElementById('hero-tube-prewrap');
    if (!rotorGroupEl || !slugEl || !dropletEl || typeof gsap === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ROTOR_SIGN = -1; // -1 = counter-clockwise on screen
    const FLOW_SIGN = 1;   // +1 = liquid advances inlet(Falcon) → outlet(needle)
    const T = 4; // rotor period, seconds
    const circumference = 2 * Math.PI * geo.Rpx;
    const spacing = circumference / 4;
    const slugDash = 10;
    slugEl.setAttribute('stroke-dasharray', `${slugDash.toFixed(2)} ${(spacing - slugDash).toFixed(2)}`);

    const sWrapStart = preWrapEl ? preWrapEl.getTotalLength() : 0;
    // Each slug is the pocket trapped between two consecutive rollers; centre the
    // dash in the gap (half a spacing along, minus half the dash length).
    const pocketOffset = spacing / 2 - slugDash / 2;
    const dashOffset0 = -((((sWrapStart + pocketOffset) % spacing) + spacing) % spacing);

    const totalLen = slugEl.getTotalLength();
    const speed = circumference / T;
    const transitTime = totalLen / speed;
    const dropCycle = T / 4;
    const dropDelay = transitTime % dropCycle;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' }, paused: true });
    tl.fromTo(rotorGroupEl, { rotation: 0 }, { rotation: ROTOR_SIGN * 360, duration: T, transformOrigin: '50% 50%' }, 0);
    tl.fromTo(slugEl, { strokeDashoffset: dashOffset0 }, { strokeDashoffset: dashOffset0 - FLOW_SIGN * circumference, duration: T }, 0);

    // Droplet release(s), timed so a drop detaches when a slug reaches the needle
    // tip. The loop condition guarantees no child tween ends past T (a timeline's
    // repeat length is the max child end-time), which would desync the loop.
    const dropDuration = dropCycle * 0.6;
    for (let k = 0, pos = dropDelay; pos + dropDuration <= T && k < 4; k++, pos += dropCycle) {
      tl.fromTo(dropletEl,
        { attr: { cy: geo.needleTip.y }, opacity: 0 },
        {
          keyframes: {
            '0%':   { opacity: 0 },
            '15%':  { opacity: 1 },
            '75%':  { attr: { cy: geo.needleTip.y + 18 }, opacity: 1 },
            '100%': { attr: { cy: geo.needleTip.y + 22 }, opacity: 0 }
          },
          duration: dropDuration,
          ease: 'power1.in'
        },
        pos);
    }

    if (prefersReducedMotion) {
      // Freeze on a legible static frame rather than hiding the scene.
      tl.progress(0.15).pause();
      gsap.set(dropletEl, { attr: { cy: geo.needleTip.y + 6 }, opacity: 1 });
      return;
    }

    tl.play();
    // Brief spin-up: ramp the whole timeline's playback rate from standstill.
    // Scaling timeScale uniformly cannot desync the shared-clock tweens.
    gsap.fromTo(tl, { timeScale: 0 }, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
  }

  function init() {
    const el = document.getElementById('pump-anim');
    if (!el) return;
    const built = buildHeroRotor();
    el.innerHTML = built.html;
    initHeroMotion(built.geo);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
