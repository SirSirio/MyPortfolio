/* Sirio cosmic engine — shared by all portfolio versions.
   Exports: PAL, REDUCED, DPR, lerp3, rgba, tintAt, clamp, HeroStar */

export const PAL = [
  [0.00, [150, 196, 255]],
  [0.18, [244, 182, 89]],
  [0.46, [255, 122, 89]],
  [0.72, [171, 140, 255]],
  [1.00, [150, 196, 255]]
];

export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const DPR = Math.min(window.devicePixelRatio || 1, 2);

export function lerp3(a, c, t) {
  return [Math.round(a[0] + (c[0] - a[0]) * t), Math.round(a[1] + (c[1] - a[1]) * t), Math.round(a[2] + (c[2] - a[2]) * t)];
}
export function rgba(c, a) {
  return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a + ')';
}
export function tintAt(y) {
  const p = PAL;
  y = Math.min(1, Math.max(0, y));
  for (let i = 0; i < p.length - 1; i++) {
    if (y <= p[i + 1][0]) {
      const t = (y - p[i][0]) / (p[i + 1][0] - p[i][0]);
      const a = p[i][1], b = p[i + 1][1];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
  }
  return p[p.length - 1][1];
}
export function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

/* The living hero star: breathing cycle, canvas starfield + rings, i-dot orbital
   mechanics, typewriter. Owns everything inside [data-hero]. Call frame(now) each rAF. */
export class HeroStar {
  constructor(heroEl, opts = {}) {
    this.el = heroEl;
    this.reduced = opts.reduced !== undefined ? opts.reduced : REDUCED;
    this.dpr = DPR;
    this.periodMs = (opts.periodSec || 15) * 1000;
    this.transparent = !!opts.transparent;
    this.pal = { glow: [150, 196, 255], core: [255, 251, 242] };
    this.canvas = heroEl.querySelector('canvas');
    this.starLayer = heroEl.querySelector('[data-star]');
    this.planetNear = heroEl.querySelector('[data-planet="near"]');
    this.planetFar = heroEl.querySelector('[data-planet="far"]');
    this.iSpans = Array.from(heroEl.querySelectorAll('h1 > span')).filter(s => s.textContent.trim() === 'ı');
    this.stars = Array.from({ length: 130 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.35,
      ph: Math.random() * 6.28, big: Math.random() < 0.10
    }));
    this.rings = []; this._si = 0; this.spawnEvery = 2100;
    this.center = { x: 0, y: 0 }; this.oSize = 40; this._h1fs = 120;
    this.armed = true; this.orbiting = false; this.planets = [];
    this.t0 = performance.now(); this.lastSpawn = this.t0;
    this._startType();
  }

  destroy() { clearTimeout(this._tt); }

  frame(now) {
    if (!this.el || !this.canvas) return;
    const hr = this.el.getBoundingClientRect();
    if (hr.bottom < -80) return;
    this._draw(now, hr);
  }

  /* ---------- typewriter ---------- */
  _startType() {
    this.terms = [
      { text: 'Engineer', grad: 'linear-gradient(90deg,#7dd3fc,#38bdf8)' },
      { text: 'Designer', grad: 'linear-gradient(90deg,#fcd34d,#fb923c)' },
      { text: 'Developer', grad: 'linear-gradient(90deg,#c4b5fd,#a855f7)' },
      { text: 'Biotechnologist', grad: 'linear-gradient(90deg,#86efac,#34d399)' },
      { text: 'Product Maker', grad: 'linear-gradient(90deg,#fda4af,#fb7185)' },
      { text: 'Lab Automator', grad: 'linear-gradient(90deg,#5eead4,#14b8a6)' },
      { text: 'Data Analyst', grad: 'linear-gradient(90deg,#f9a8d4,#ec4899)' },
      { text: 'AI enthusiast', grad: 'linear-gradient(90deg,#a5b4fc,#818cf8)' }
    ];
    this.terms.forEach(t => { t.prefix = (/^[aeiou]/i.test(t.text) ? 'n ' : ' '); t.full = t.prefix + t.text; });
    this.ti = 0; this.ci = 0; this.deleting = false;
    this._artEl = this.el.querySelector('[data-art]');
    this._typeEl = this.el.querySelector('[data-typer]');
    if (!this._typeEl) return;
    if (this.reduced) {
      this._typeEl.style.backgroundImage = this.terms[0].grad;
      if (this._artEl) this._artEl.textContent = this.terms[0].prefix;
      this._typeEl.textContent = this.terms[0].text;
      return;
    }
    this._typeEl.style.backgroundImage = this.terms[0].grad;
    this._tick = this._tick.bind(this);
    this._tick();
  }
  _tick() {
    const el = this._typeEl;
    if (!el) return;
    const t = this.terms[this.ti];
    el.style.backgroundImage = t.grad;
    const pl = t.prefix.length;
    const render = () => {
      if (this._artEl) this._artEl.textContent = t.prefix.slice(0, Math.min(this.ci, pl));
      el.textContent = this.ci > pl ? t.text.slice(0, this.ci - pl) : '';
    };
    if (!this.deleting) {
      this.ci++;
      render();
      if (this.ci >= t.full.length) { this.deleting = true; this._tt = setTimeout(this._tick, 1500); return; }
      this._tt = setTimeout(this._tick, 72 + Math.random() * 46);
    } else {
      this.ci--;
      render();
      if (this.ci <= 0) { this.deleting = false; this.ti = (this.ti + 1) % this.terms.length; this._tt = setTimeout(this._tick, 380); return; }
      this._tt = setTimeout(this._tick, 40);
    }
  }

  /* ---------- geometry ---------- */
  _measure(hr) {
    const root = this.el;
    const h1 = root.querySelector('h1');
    let o = null;
    for (const s of root.querySelectorAll('h1 > span')) { if (s.textContent.trim() === 'o') { o = s; break; } }
    if (!o || !h1) { this.center.x = hr.width / 2; this.center.y = hr.height / 2; this.oSize = 40; return; }
    const r = o.getBoundingClientRect();
    let centerYfrac = 0.61, ink = r.height * 0.30;
    try {
      if (!this._mctx) this._mctx = document.createElement('canvas').getContext('2d');
      const cs = getComputedStyle(h1);
      this._h1fs = parseFloat(cs.fontSize) || this._h1fs;
      this._mctx.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      const m = this._mctx.measureText('o');
      const fs = parseFloat(cs.fontSize);
      const L = parseFloat(cs.lineHeight) || fs * 0.98;
      const fA = m.fontBoundingBoxAscent, fD = m.fontBoundingBoxDescent;
      if (fA && fD) {
        const baseline = (L - (fA + fD)) / 2 + fA;
        const inkCenter = (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
        const centerY = baseline - inkCenter;
        centerYfrac = centerY / L;
        ink = m.actualBoundingBoxAscent * 0.62;
      }
    } catch (e) {}
    this.center.x = r.left - hr.left + r.width / 2;
    this.center.y = r.top - hr.top + centerYfrac * r.height;
    this.oSize = Math.max(ink, 14);
  }

  /* ---------- draw ---------- */
  _draw(now, hr) {
    const c = this.canvas;
    const W = hr.width, H = hr.height;
    const Wd = Math.round(W * this.dpr), Hd = Math.round(H * this.dpr);
    if (c.width !== Wd || c.height !== Hd) { c.width = Wd; c.height = Hd; }
    const ctx = c.getContext('2d');
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this._measure(hr);

    let b = (Math.sin((now - this.t0) / this.periodMs * Math.PI * 2 - Math.PI / 2) + 1) / 2;
    b = b * b * (3 - 2 * b);
    if (this.reduced) b = 0.72;
    this.b = b;
    const pal = this.pal;
    const cx = this.center.x, cy = this.center.y;

    const core = lerp3([5, 5, 11], pal.core, b);
    const rs = this.el.style;
    rs.setProperty('--b', b.toFixed(3));
    rs.setProperty('--glow', pal.glow[0] + ',' + pal.glow[1] + ',' + pal.glow[2]);
    rs.setProperty('--core', 'rgb(' + core[0] + ',' + core[1] + ',' + core[2] + ')');
    rs.setProperty('--core-blur', (5 + 58 * b).toFixed(1) + 'px');
    rs.setProperty('--halo-op', (0.04 + 0.34 * b).toFixed(3));
    rs.setProperty('--glass-op', (0.04 + 0.10 * b).toFixed(3));
    rs.setProperty('--flare-op', (0.42 * b).toFixed(3));
    rs.setProperty('--flare-scale', (0.28 + 0.72 * b).toFixed(3));
    rs.setProperty('--ring-op', (0.5 + 0.4 * b).toFixed(3));

    if (this.starLayer) {
      this.starLayer.style.fontSize = (this._h1fs || 120) + 'px';
      this.starLayer.style.left = cx + 'px';
      this.starLayer.style.top = cy + 'px';
    }

    if (this.transparent) {
      ctx.clearRect(0, 0, W, H);
    } else {
      const bg = lerp3([4, 5, 12], [10, 15, 32], b);
      ctx.fillStyle = 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')';
      ctx.fillRect(0, 0, W, H);
    }

    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.62);
    g.addColorStop(0, rgba(pal.glow, 0.05 + 0.18 * b));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    for (const s of this.stars) {
      const tw = 0.45 + 0.55 * Math.abs(Math.sin(now * 0.0008 + s.ph));
      const a = (0.16 + 0.5 * b) * tw;
      const rad = s.r * (s.big ? 1.7 : 1);
      if (s.big) {
        ctx.fillStyle = rgba([225, 234, 255], a * 0.5);
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, rad * 2.4, 0, 6.3); ctx.fill();
      }
      ctx.fillStyle = rgba([228, 236, 255], a);
      ctx.beginPath(); ctx.arc(s.x * W, s.y * H, rad, 0, 6.3); ctx.fill();
    }

    const base = Math.min(W, H);
    const rotRings = [
      { r: base * 0.18, dash: [2, 13], w: 1.2, spd: 0.00022, dir: 1 },
      { r: base * 0.28, dash: [12, 19], w: 1.0, spd: 0.00016, dir: -1 },
      { r: base * 0.40, dash: [1, 17], w: 1.0, spd: 0.00012, dir: 1 }
    ];
    const rc = lerp3([60, 64, 92], pal.glow, b);
    for (const rg of rotRings) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(now * rg.spd * rg.dir);
      ctx.strokeStyle = rgba(rc, 0.10 + 0.17 * b);
      ctx.lineWidth = rg.w; ctx.setLineDash(rg.dash);
      ctx.beginPath(); ctx.arc(0, 0, rg.r, 0, 6.3); ctx.stroke(); ctx.restore();
    }
    ctx.setLineDash([]);

    if (!this.reduced && now - this.lastSpawn > this.spawnEvery) {
      this.lastSpawn = now;
      const styles = [{ dash: [], width: 1.4 }, { dash: [2, 12], width: 1.1 }, { dash: [12, 17], width: 1 }, { dash: [1, 8], width: 1.8 }];
      this.rings.push({ born: now, st: styles[this._si++ % styles.length] });
    }
    const life = 7600, maxR = Math.hypot(W, H) * 0.58;
    this.rings = this.rings.filter(r => now - r.born < life);
    for (const r of this.rings) {
      const a = (now - r.born) / life;
      const rad = (1 - Math.pow(1 - a, 3)) * maxR + this.oSize;
      const col = lerp3([50, 54, 80], pal.glow, b);
      ctx.strokeStyle = rgba(col, (1 - a) * (0.12 + 0.4 * b));
      ctx.lineWidth = r.st.width; ctx.setLineDash(r.st.dash);
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.3); ctx.stroke();
    }
    ctx.setLineDash([]);

    /* i-dot planets */
    if (this.iSpans && this.iSpans.length === 2 && this.planetNear && this.planetFar) {
      const homes = this.iSpans.map(s => {
        const r = s.getBoundingClientRect();
        return { x: r.left - hr.left + r.width * 0.5 + r.width * 0.085, y: r.top - hr.top + r.height * 0.30, ps: Math.max(r.height * 0.060, 6) };
      });
      const dn = homes.map(h => Math.hypot(h.x - cx, h.y - cy));
      const nearIdx = dn[0] <= dn[1] ? 0 : 1;

      if (b < 0.30) this.armed = true;
      if (!this.reduced && this.armed && b >= 0.45) {
        this.armed = false; this.orbiting = true; this.orbitStart = now;
        const mk = (i, k, dir, dur, tilt) => {
          const dx = homes[i].x - cx, dy = homes[i].y - cy, d = Math.max(Math.hypot(dx, dy), 1);
          return { R: d, ux: dx / d, uy: dy / d, k: k, dir: dir, dur: dur, tilt: tilt };
        };
        this.planets = [];
        this.planets[nearIdx] = mk(nearIdx, 0.34, -1, 8200, true);
        this.planets[1 - nearIdx] = mk(1 - nearIdx, 1.0, 1, 12500, false);
      }

      let anyActive = false;
      for (let i = 0; i < 2; i++) {
        const h = homes[i];
        const el = (i === nearIdx) ? this.planetNear : this.planetFar;
        const pl = this.planets[i];
        let x = h.x, y = h.y, rad = h.ps, depth = 0.5, z = 1, op = 1;
        if (this.orbiting && pl) {
          const p = (now - this.orbitStart) / pl.dur;
          if (p < 1) {
            anyActive = true;
            const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            const th = pl.dir * 2 * Math.PI * e;
            const perpx = -pl.uy, perpy = pl.ux;
            const ex = pl.R * Math.cos(th), ey = pl.R * pl.k * Math.sin(th);
            x = cx + ex * pl.ux + ey * perpx;
            y = cy + ex * pl.uy + ey * perpy;
            if (pl.tilt) {
              depth = Math.sin(th) * 0.5 + 0.5;
              rad = h.ps * (0.80 + 0.42 * depth);
              op = 0.55 + 0.45 * depth;
              z = depth > 0.5 ? 3 : 1;
            }
          }
        }
        const dia = (rad * 2).toFixed(1);
        el.style.width = el.style.height = dia + 'px';
        el.style.left = x.toFixed(1) + 'px';
        el.style.top = y.toFixed(1) + 'px';
        el.style.transform = 'translate(-50%,-50%)';
        el.style.zIndex = z;
        el.style.opacity = op.toFixed(2);
        el.style.background = '#eef2ff';
        el.style.boxShadow = '0 0 ' + (rad * 0.7 + rad * 0.9 * b).toFixed(1) + 'px rgba(' + pal.glow.join(',') + ',' + (0.30 + 0.4 * b).toFixed(2) + ')';
      }
      if (this.orbiting && !anyActive) this.orbiting = false;
    }
  }
}
