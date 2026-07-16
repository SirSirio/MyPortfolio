# Phase 01: The Design Build - Pattern Map

**Mapped:** 2026-07-16
**Files analyzed:** 5 (4 modified in `site/`, 1 new folder)
**Analogs found:** 5 / 5 (all exact — this phase is a **port**, every analog is an approved design snapshot on disk)

> **Framing for the planner:** there is no "closest similar file, adapt loosely" here. The analogs are the
> *approved source of truth*. Deviating from them is drift, not creativity. The only files with genuinely
> new work (no analog) are the fixed nav, the pointer parallax, and the `:has()` media slot — all called
> out under **No Analog Found**.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `site/index.html` (hero markup) | view / template | render-once (static DOM read by engine) | `design/Sirio Star.dc.html:25-71` | exact (strip framework) |
| `site/index.html` (section markup) | view / template | render-once (static DOM) | `design/Sirio V4 …dc.html:26-179` | exact (strip framework + recontent) |
| `site/styles.css` | config / stylesheet | render-once + per-frame CSS-var consumption | inline styles across both `.dc.html` + `site/styles.css:1-47` (structure) | role-match (tokenise, no analog for tokens themselves) |
| `site/main.js` | controller / entry module | event-driven (rAF loop + scroll) | `design/Sirio V4 …dc.html:326-391` (`_boot`/`frame`/`drawDeep`/`applyPara`) | exact |
| `site/star-engine.js` | service / library | per-frame transform | **itself** — byte-identical to `design/star-engine.js`; do not rewrite | n/a (finished dependency) |
| `site/assets/media/` + `README.md` | config / docs | file-I/O (drop-in) | `design/Sirio V4 …dc.html:82,94` (slot shape only) | partial (shape yes, mechanism no) |

---

## Pattern Assignments

### `site/index.html` — hero markup (view, render-once)

**Analog:** `design/Sirio Star.dc.html:25-71`

#### THE SEAM: the hero markup contract (grounded in `site/star-engine.js`)

This is the single most important table in this document. Every row is something the **engine already
queries or writes**; if the markup does not supply it, the engine fails **silently** — no console error.

| # | Engine line | Engine does | Markup MUST supply | Silent failure if absent |
|---|---|---|---|---|
| 1 | `:39` `this.el = heroEl` | all coords are **hero-relative** (`- hr.left`/`- hr.top`, `:145-146`, `:242`) | hero element is `position: relative` | star + planets land at wrong offsets |
| 2 | `:44` `heroEl.querySelector('canvas')` | sizes + draws; `frame()` bails `if (!this.canvas)` (`:63`) | a `<canvas>` **inside the hero**, `position:absolute; inset:0` | **entire hero draw is skipped** |
| 3 | `:45` `querySelector('[data-star]')` | writes `style.fontSize` / `left` / `top` (`:180-182`) | `<div data-star>` `position:absolute; z-index:2; pointer-events:none` | star DOM layer never positioned |
| 4 | `:46-47` `[data-planet="near"]`, `[data-planet="far"]` | writes `width/height/left/top/transform/zIndex/opacity/background/boxShadow` (`:284-291`) | two `<div>`s, `position:absolute; border-radius:50%` | planet block guarded off (`:239`) |
| 5 | `:48` `h1 > span` filtered `=== 'ı'` | needs **exactly 2** (`:239` `iSpans.length === 2`) | `&#305;` **U+0131 DOTLESS I** ×2, each in its own `<span>` | **orbits silently never run** |
| 6 | `:124` `h1 > span` filtered `=== 'o'` | anchors the star's optical centre | one `<span>` containing literal `o`, `color:transparent; display:inline-block` | falls back to hero geometric centre (`:125`) |
| 7 | `:122` `root.querySelector('h1')` | reads computed `fontSize`/`lineHeight`/`fontFamily`/`fontWeight` (`:130-135`) | a real `<h1>` with the design's `font: 300 clamp(58px,12.5vw,184px)/0.98 'Space Grotesk'` | metrics fall back, star mis-anchors |
| 8 | `:83` `querySelector('[data-art]')` | `textContent = article` (`:103`) | `<span data-art></span>` | article never types (non-fatal) |
| 9 | `:84` `querySelector('[data-typer]')` | `if (!this._typeEl) return;` (`:85`) | `<span data-typer></span>` | **typewriter no-ops entirely** |
| 10 | `:168-177` `this.el.style.setProperty(…)` | writes 9 CSS vars **on the hero element** | every `--b/--glow/--core/--core-blur/--halo-op/--glass-op/--flare-op/--flare-scale/--ring-op` consumer must be a **descendant of the hero** | star layer renders at fallback values |
| 11 | `:180` `starLayer.style.fontSize = h1fs + 'px'` | scales the whole star | **all star sub-elements sized in `em`** — never px | star does not scale with the wordmark |

> **`--dot-op` divergence:** `Sirio Star.dc.html:247` sets `--dot-op`; `site/star-engine.js` **does not**.
> No markup consumes it. Do not add it back and do not consume it.

**Wordmark** (`Sirio Star.dc.html:59`) — copy the character sequence exactly, comment it loudly:
```html
<h1>S<span style="position:relative;">&#305;</span>r<span style="position:relative;">&#305;</span><span style="color:transparent; display:inline-block;">o</span></h1>
```
Verify: `document.querySelectorAll('[data-hero] h1 > span').length === 3`.

**Star layer, verbatim structure** (`Sirio Star.dc.html:31-47`) — 6 sub-spans, all `em`-sized, in this z-order:
halo (`2.7em`, `--halo-op`, radial `--glow`) → flare A (`2.0em`, `spinRev 56s`, `--flare-op × 0.5`) →
flare B (`1.45em`, `spin 46s`, white) → flare C (`0.96em`, `spinRev 32s`, `--glow`) →
glass disc (`0.92em`, `--glass-op`, `backdrop-filter:blur(3px)`) → dashed ring (`0.78em`, `spin 17s`, `--ring-op`) →
core (`0.5em`, `background:var(--core)`, `box-shadow: 0 0 var(--core-blur) rgba(var(--glow),0.85)`).
Keyframes `spin`/`spinRev`/`blink` come from `Sirio Star.dc.html:18-21`.

**Typewriter markup** — the `.dc.html:60-67` version is **positional** (`wrap.children[0]`/`[1]`,
`:130-131`) and will NOT work with the engine. Port with attributes added:
```html
<p class="hero__type">
  <span>I am a</span>
  <span class="typer">
    <span data-art></span>     <!-- REQUIRED by star-engine.js:83 -->
    <span data-typer></span>   <!-- REQUIRED by star-engine.js:84 — omit ⇒ silent no-op -->
    <span class="caret"></span>
  </span>
</p>
```

**Coordinate-space divergence — the one place the engine is BETTER than the design:**
```js
// design/Sirio Star.dc.html:198-199 + :314 — VIEWPORT-relative (standalone full-screen file)
this.center.x = r.left + r.width / 2;
{ x: r.left + r.width * 0.5 + r.width * 0.085, y: r.top + r.height * 0.30, … }

// site/star-engine.js:145-146 + :242 — HERO-relative (composable). USE THIS.
this.center.x = r.left - hr.left + r.width / 2;
{ x: r.left - hr.left + r.width * 0.5 + r.width * 0.085, y: r.top - hr.top + r.height * 0.30, … }
```
→ The hero must be a `position:relative` **section in a scrolling page**, not `position:absolute; inset:0`
with `body{overflow:hidden}` as the `.dc.html` has it (`:16`, `:25`). Do **not** copy `overflow:hidden` on body.

**Top bar** (`Sirio Star.dc.html:49-55`) — keep the markup/typography, but it becomes the **fixed nav**
(see No Analog Found / N-1). `rel="noopener"` is already present on both links — **preserve it**.

**Framework scaffolding to strip:** `<x-dc>`, `<helmet>`, `./support.js`, `data-screen-label`,
`<script type="text/x-dc">`, `data-props`, `DCLogic`, `componentDidMount`, `renderVals()`.

---

### `site/main.js` (controller, event-driven)

**Analog:** `design/Sirio V4 …dc.html:326-391`
**Current state:** `site/main.js:1-9` — a 9-line boot marker importing `tintAt`. Whole file is replaced.

**Import pattern to preserve** (`site/main.js:6` — the proven Pages module seam):
```js
import { tintAt } from './star-engine.js';   // relative, extensioned, no bundler
```
V4 uses `await import('./star-engine.js')` (`:327`) because DC needs async boot. **Static import is
correct here** — `site/main.js` is already `<script type="module">` (`site/index.html:19`).

**One rAF loop, many consumers** (`V4:344-346, 349-357`):
```js
// V4:345 — the loop shape. Note rAF is scheduled FIRST, then frame() runs.
this.loop = (t) => { this.raf = requestAnimationFrame(this.loop); this.frame(t); };
this.raf = requestAnimationFrame(this.loop);
```
**Reduced-motion shape — copy exactly** (`V4:342-344`): render **one** frame, never loop, re-render on resize.
```js
this._onResize = () => { if (this.reduced) this.frame(performance.now()); };
window.addEventListener('resize', this._onResize);
if (this.reduced) { this.frame(performance.now()); return; }
```
Combined with `star-engine.js:162` (`if (this.reduced) b = 0.72`) this yields a **static, fully-lit gold
star** — not a blank canvas.

**Gold palette + period — the two lines that make the hero the approved hero:**
```js
// design/Sirio Star.dc.html:207 (palette map) + :203 (cycleSpeed "Slow" ⇒ 20)
const star = new HeroStar(heroEl, { periodSec: 20 });          // engine default is 15 (star-engine.js:42)
star.pal = { glow: [255, 196, 110], core: [255, 236, 200] };   // engine hard-codes BLUE-WHITE at :43
```
`HeroStar`'s constructor reads only `opts.reduced` and `opts.periodSec` (`:40-42`) — **there is no
`opts.pal`**. Post-construction assignment is the zero-engine-edit path; `_draw` reads `this.pal` fresh
each frame (`:164`).
> **⚠ `--gold-glow: 255,196,110` (the star) is NOT `--star-antares: 244,182,89` (`PAL[1]`, the Work
> section). Two different golds. Do not conflate.**

**Deep field, verbatim** (`V4:331-336` layer construction, `V4:360-379` draw):
```js
const mk = (n, rM, rX) => Array.from({ length: n }, () => ({
  x: Math.random(), y: Math.random() * 3, r: rM + Math.random() * (rX - rM),
  ph: Math.random() * 6.28, hue: Math.random()
}));
this.layers = [
  { f: 0.14, a: 0.26, stars: mk(280, 0.3, 0.9) },
  { f: 0.36, a: 0.40, stars: mk(140, 0.5, 1.3) },
  { f: 0.66, a: 0.58, stars: mk(64, 0.8, 1.9) }
];
// draw — V4:360-379
if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }   // resize ONLY on change
ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
ctx.clearRect(0, 0, vw, vh);                       // clearRect — NOT fillRect. Root gradient shows through.
const rel = window.scrollY, span = vh * 3;
for (const L of this.layers) for (const s of L.stars) {
  let sy = (s.y * vh - rel * L.f) % span;
  if (sy < 0) sy += span;
  if (sy > vh + 4) continue;                       // cull
  const tw = 0.35 + 0.65 * Math.abs(Math.sin(now * 0.0009 + s.ph));
  ctx.beginPath(); ctx.arc(s.x * vw, sy, s.r, 0, 6.2832);
  ctx.fillStyle = eng.rgba(eng.tintAt(s.hue), (L.a * tw).toFixed(3));
  ctx.fill();
}
```
Drop V4's `this.dens()` density multiplier (a DC prop). 484 stars at density 1.
> **Contrast worth flagging:** `drawDeep` uses `clearRect` (`V4:367`); `HeroStar._draw` uses an **opaque**
> `fillRect` (`star-engine.js:186-187`). That is Pitfall 3 — a decision for Sirio.

**Parallax** (`V4:381-391`) — note the cull is the perf guard, keep it:
```js
const r = par.getBoundingClientRect();
if (r.bottom < -400 || r.top > vh + 400) continue;
const f = parseFloat(el.dataset.para) || 0;
el.style.transform = 'translate3d(0,' + ((r.top + r.height/2 - vh/2) * -f).toFixed(1) + 'px,0)';
```

**Scroll listener** (`V4:340-341`): `window.addEventListener('scroll', fn, { passive: true })` — keep `passive`.

**Font-metric guard** — the `.dc.html` has it (`:102`), `HeroStar` does not:
```js
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.measure());
```
Port as `document.fonts.ready.then(() => { raf = requestAnimationFrame(loop); })`.

**DO NOT PORT** from V4 (Phase 2/4): `openProj` (`:394+`), `closeProj`, `startBurst`, `applyTrans`,
`drawWarp`, `this.wstars`/`spawn` (`:337-338`), `[data-proj]` restore (`:319-323`), and the
`frame()` calls to `applyTrans`/`drawWarp` (`:355-356`).

---

### `site/styles.css` (config, render-once + per-frame var consumption)

**Analog:** structural conventions from `site/styles.css:1-47`; values from both `.dc.html` inline styles.
**Current state:** 47 lines of walking-skeleton CSS. `*{box-sizing}`, the reset, and the
`prefers-reduced-motion` block (`:38-47`) survive; `.hero`/`h1` rules (`:21-36`) are replaced.

**Existing convention to keep** (`site/styles.css:1-6`, matching `Sirio Star.dc.html:15`):
```css
* { box-sizing: border-box; }
```

**Root page shell** (`V4:17-26`):
```css
html { scroll-behavior: smooth; }
html, body { margin:0; padding:0; background:#04050c; -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility; }
::selection { background: rgba(150,196,255,0.22); }
a { color:#96c4ff; } a:hover { color:#bcd9ff; }
/* the page's whole colour journey, V4:26 */
background: linear-gradient(180deg,#04050c 0%,#0c0a09 24%,#110b0a 46%,#100a14 68%,#080a16 86%,#05060d 100%);
/* V4:26 wrapper also carries: position:relative; width:100%; overflow-x:clip; */
```
> **`overflow-x: clip`** (V4:26) — not `hidden`. `hidden` on an ancestor breaks `position:fixed`
> containment and `scroll-behavior:smooth`. Copy `clip`.

**Reduced-motion block** — `site/styles.css:38-47` already exists and is **stricter** than the design's
(`V4:23`, which only kills `animation-*` and `scroll-behavior`). Keep the existing shipped version.

**Design tokens (FOUND-03)** — bare `R,G,B` triplets so they compose in `rgba(var(--x), a)`:
```css
:root {
  --star-sirius:150,196,255; --star-antares:244,182,89;
  --star-aldebaran:255,122,89; --star-vega:171,140,255;   /* = PAL stops, star-engine.js:4-10 */
  --gold-glow:255,196,110; --gold-core:255,236,200;       /* the HERO STAR — NOT --star-antares */
  --bg-0:#04050c; --text-hi:#eef2ff; --text-body:rgba(228,232,244,0.76);
  --glass-bg:rgba(255,255,255,0.04); --glass-border:rgba(255,255,255,0.1);
  --font-display:'Space Grotesk',sans-serif; --font-body:'Hanken Grotesk',sans-serif;
  --font-mono:'Space Mono',monospace;
  --pad-section:clamp(80px,12vh,150px) clamp(20px,6vw,84px);
  --max-w:1180px; --nav-h:70px;
}
```
Fonts are **already correctly loaded** with all three families + weights (`site/index.html:9-12`) — no change.

**One `.section` class + per-section `--accent`** — every section is structurally identical
(`V4:69-104` ≡ `:107-138` ≡ `:141-161`); **only the accent triplet changes**:

| id | Sector label | `--accent` | PAL stop | Numeral side | stroke α |
|---|---|---|---|---|---|
| `#index` | `DEEP FIELD — OBSERVATION LOG · 2026` | `var(--star-sirius)` | 0.00 | — | — |
| `#work` | `01 — ANTARES SECTOR` | `var(--star-antares)` | 0.18 | right (`V4:70`) | 0.22 |
| `#experience` | `02 — ALDEBARAN SECTOR` | `var(--star-aldebaran)` | 0.46 | left (`V4:108`) | 0.20 |
| `#publications` | `03 — VEGA SECTOR` | `var(--star-vega)` | 0.72 | right (`V4:142`) | 0.20 |
| `#contact` | `04 — TRANSMISSION · SIRIUS SECTOR` | `var(--star-sirius)` | 1.00 | — | — |

Repeating section furniture (`V4:69-78`):
```css
.section { position:relative; padding:var(--pad-section); scroll-margin-top:var(--nav-h); }  /* 70px, V4:53,69,107,141,164 */
.section__numeral { position:absolute; top:-2%; font:500 clamp(170px,27vw,400px)/0.8 var(--font-display);
  letter-spacing:-0.04em; color:transparent; -webkit-text-stroke:1px rgba(var(--accent),0.22);
  pointer-events:none; user-select:none; }                       /* + aria-hidden="true" data-para="-0.07" */
.section__blob { position:absolute; width:50vw; height:50vw; border-radius:50%;
  background:radial-gradient(circle, rgba(var(--accent),0.10), rgba(var(--accent),0) 62%);
  pointer-events:none; }                                          /* data-para="0.13" */
.section__label { font:400 11px var(--font-mono); letter-spacing:0.26em; color:rgba(var(--accent),0.85); white-space:nowrap; }
.section__rule { flex:1; height:1px; background:linear-gradient(90deg, rgba(var(--accent),0.4), rgba(var(--accent),0)); }
.section__inner { position:relative; max-width:var(--max-w); margin:0 auto; }
h2 { margin:14px 0 0; font:300 clamp(40px,6vw,86px) var(--font-display); letter-spacing:-0.035em; color:var(--text-hi); }
```

**`style-hover` → real CSS — ~14 occurrences, ALL must be translated.** The paired `transition:` lives in
the *normal* `style` attribute and **does** survive, which is why this fails silently: the transitions are
present with nothing to transition to.

| Where | `style-hover` (design) | Real CSS |
|---|---|---|
| Nav links `V4:37,38` | `color:rgba(228,236,255,0.95)` | `.nav a:hover{color:rgba(228,236,255,.95)}` |
| Sector pills `V4:59-62` | `border-color:rgba(<a>,0.8); box-shadow:0 0 18px rgba(<a>,0.25)` | `.pill:hover{border-color:rgba(var(--accent),.8); box-shadow:0 0 18px rgba(var(--accent),.25)}` |
| Media slot `V4:82` | `box-shadow:0 40px 110px rgba(240,160,60,0.24); border-color:rgba(244,182,89,0.7)` | `.media-slot:hover{…}` |
| Plate CTA `V4:88,100` | `border-color:rgba(<a>,0.9); box-shadow:0 0 20px rgba(<a>,0.3)` | `.plate__cta:hover{…}` |
| Publication row `V4:151,155` | `background:rgba(255,255,255,0.03)` | `.pub:hover{background:rgba(255,255,255,.03)}` |
| Contact email `V4:169` | `text-shadow:0 0 22px rgba(150,196,255,0.85); border-color:rgba(150,196,255,0.9)` | `.contact a:hover{…}` |

Pill base (`V4:59`): `font:400 11px var(--font-mono); letter-spacing:.2em; border:1px solid rgba(var(--accent),.35); border-radius:999px; padding:10px 20px; transition:border-color .3s ease, box-shadow .3s ease;`

**Keyframes to port:** `spin`/`spinRev`/`blink` (`Sirio Star.dc.html:18-21`), `scrollDot` (`V4:22`).

---

### `site/index.html` — section markup (view, render-once)

**Analog:** `design/Sirio V4 …dc.html:26-179`

**Hero substitution:** delete `V4:41-43` (`Hello, I am` / `<h1>Sirio</h1>` / the literal
`[ STATIC MOCKUP — THE LIVING SIRIO STAR HERO DROPS IN HERE UNCHANGED ]` marker). Substitute the Star
file's canvas + 2 planets + `[data-star]` + dotless-i `<h1>` + typewriter `<p>`. **Keep** V4's top bar
(`:34-40`) and `[data-scrollhint]` (`:44-49`).

**Mission** (`V4:53-66`) — the one-liner is **verbatim-locked and already exactly right in the design**.
Copy as-is including the gradient span:
```html
<p>Biotechnology MSc at DTU Copenhagen. I design and build the <span class="grad">hardware, software and automation</span> that free scientists from repetitive lab work.</p>
```
```css
.grad { background-image:linear-gradient(90deg,#96c4ff,#f4b659 40%,#ff7a59 68%,#ab8cff);
        background-clip:text; -webkit-background-clip:text; color:transparent; }   /* the PAL spectrum again */
```
Mission `<p>` type (`V4:57`): `font:300 clamp(28px,4.3vw,60px)/1.18 var(--font-display); letter-spacing:-0.02em; max-width:1050px; text-wrap:pretty;`
> `V4:63` — *"— SECTOR JUMPS ENGAGE A SHORT WARP BURST"* — **delete**. The warp is Phase 2/4; the copy
> would promise a behaviour Phase 1 does not ship.

**Work plate** (`V4:80-102`) — 2 articles → **3 plates**, in **importance order** (not the design's
chronological order). Alternation is `flex-wrap:wrap-reverse; flex-direction:row-reverse` on even plates
(`V4:92`). Per-plate structure `V4:84-89`: mono `PLATE 00N · YYYY` → `h3` → `p` → CTA pill.
- **Accent is section-driven, not plate-driven.** `V4:94-100` gives plate 002 an `aldebaran` accent — that
  is a design-file inconsistency (Work = Antares). Use `var(--accent)` throughout; reordering then costs nothing.
- Remove `data-open="…"` + `cursor:pointer` + the `OPEN PLATE — WARP JUMP →` CTA, **or** keep the CTA as
  a non-jumping link. Nothing to open in Phase 1.
- `Descriptio od endosese` (`V4:87`) is lorem — replace from `profile.md`.
- Plates per RESEARCH: **001** Portable Precision Liquid Dispenser (2026) · **002** Automated Gel
  Electrophoresis / DALSA OT-2 (2025) · **003** EndoSense (2024, carries the mandatory
  `https://2024.igem.wiki/DTU-Denmark/` link).

**Experience row** (`V4:118-123`) — spine + dot + 3-column baseline row:
```css
.exp { position:relative; margin-top:clamp(44px,5.5vw,70px); padding-left:46px; }
.exp__spine { position:absolute; left:8px; top:10px; bottom:10px; width:1px;
  background:linear-gradient(180deg, rgba(var(--accent),0), rgba(var(--accent),.55) 16%, rgba(var(--accent),.55) 84%, rgba(var(--accent),0)); }
.exp__row { position:relative; display:flex; flex-wrap:wrap; align-items:baseline; gap:8px 40px; padding:clamp(20px,2.6vw,30px) 0; }
.exp__dot { position:absolute; left:-42px; top:calc(clamp(20px,2.6vw,30px) + .55em);
  width:9px; height:9px; border-radius:50%; background:rgb(var(--accent)); box-shadow:0 0 14px rgba(var(--accent),.9); }
.exp__row > span:first-of-type { flex:0 0 160px; font:400 14px var(--font-mono); letter-spacing:.06em; color:rgba(255,150,120,.88); }
.exp__row h4 { margin:0; flex:1 1 240px; font:400 clamp(24px,2.8vw,34px) var(--font-display); letter-spacing:-.02em; color:#fff; }
```
3 rows → **4** (add **Student Assistant — PM Team / AGC Biologics, 2024—Present** — his current job,
absent from the design). `Hardware Lead — iGEM` (`V4:127`) → **`iGEM Wet Lab Lead — EndoSense Biosensor`**
(mandated phrasing). `Research Assistant / 2022—2024 / Lab automation` (`V4:132-134`) is **fabricated** →
**Research Intern — CIBIO, UniTrento / 2023**.

**Publications** (`V4:150-159`) — **2 rows → 1**. The design builds a shared rule set by putting
`border-top` on row 1 (`:151`) and `border-top + border-bottom` on row 2 (`:155`). **Collapsing to one row
means that row needs BOTH borders**, or the list has a hanging open edge:
```css
.pub { display:flex; flex-wrap:wrap; justify-content:space-between; align-items:baseline; gap:8px 32px;
  padding:clamp(22px,2.8vw,32px) 14px;
  border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1);
  transition:background .4s ease; }
```
Row 2 (`Part collection contribution — iGEM Registry · 2024`, `V4:156-157`) has **zero support in
`profile.md`** → **DELETE**. Row 1 → *Mapping cryptic phosphorylation sites in the human proteome* ·
**Contributing author** (mandated; **no position number**, **not** "co-author") · *The EMBO Journal* ·
2025 · 44:6704–6731 · `https://doi.org/10.1038/s44318-025-00567-1`. The `↗` in `V4:153` implies a link —
make the row an `<a>` with `target="_blank" rel="noopener"`.

**Contact** (`V4:164-171`) + **footer** (`V4:173-178`) — copy as-is. `sirio.feltrin@gmail.com` is correct
and locked.

**`data-reveal` attributes** — port them with the markup (`V4:56,58,73,77,78,80,92,111,115,116,145,149,150,167,168,169`).
`updateReveals()` (`V4:560-597`) is Phase 2. Without it elements simply render normally (the function is
what sets `opacity:0` in the first place — `:579-585`) — so **do not add a CSS rule that hides
`[data-reveal]`**, or Phase 1 ships an invisible page.

---

### `site/star-engine.js` (service) — **DO NOT REWRITE**

`diff design/star-engine.js site/star-engine.js` → identical. 296 lines. Exports
`PAL, REDUCED, DPR, lerp3, rgba, tintAt, clamp, HeroStar`.

The **only** defensible edit is adding `opts.pal` to the constructor (`:38-43`) — and even that is
avoidable via `star.pal = GOLD`. Prefer zero engine edits in Phase 1.

Already handled internally — **do not re-implement in `main.js`**: reduced-motion (`:40,86-91,162,221,248`),
DPR cap at 2 (`:13,154-157`), off-screen culling (`:64-66`), canvas resize without a listener (`:154-155`),
`destroy()` (`:60`), typewriter incl. `a`/`an` article logic (`:81`).

**Security invariant:** the typewriter uses `textContent` (`:103-104`). Keep it. "Improving" it to
`innerHTML` adds an injection sink for free.

---

## Shared Patterns

### Accent-driven theming
**Source:** `star-engine.js:4-10` (`PAL`) ↔ V4 section styles
**Apply to:** every section, every pill, every media slot, the spine, the numeral, the blob
One `--accent: R,G,B` per section; all children read `rgba(var(--accent), α)`. This is the whole reason
the file is portable and the reason plate reordering is free.

### External-link safety
**Source:** `Sirio Star.dc.html:52-53`, `V4:37-38` — already correct in the design
**Apply to:** CV, LinkedIn, iGEM wiki, DOI
```html
<a href="…" target="_blank" rel="noopener">CV&nbsp;&#8599;</a>
```
`rel="noopener"` is present on every external link in both design files. **Preserve it** — mitigates
reverse tabnabbing. Copy the `&nbsp;` before `↗` too (keeps the arrow from orphaning).

### Canvas sizing
**Source:** `star-engine.js:154-157` ≡ `V4:363-366` — the same pattern in both
```js
const W = Math.round(vw * DPR), H = Math.round(vh * DPR);
if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }   // only on change
ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
```
No `resize` listener needed. Assigning `canvas.width` clears the canvas — hence the guard.

### Reduced-motion: replace, don't delete
**Source:** `V4:342-344` + `star-engine.js:162`
One static frame + `b = 0.72` ⇒ a fully-lit gold star, not a blank box. Re-render on resize.

### Mono label typography
**Source:** `V4:56, 74, 85, 167, 174`
`font: 400 11px var(--font-mono)` · `letter-spacing: .24em` (section label) / `.26em` (sector) / `.2em`
(plate/nav) / `.18em` (footer) · uppercase · `rgba(var(--accent), .85)` or `rgba(228,236,255, .32–.55)`.

### Read-then-write ordering (perf)
**Source:** `star-engine.js:64 → 158 → 168-183 → 241` (the interleave)
**Do not refactor the engine in Phase 1.** But **do not add** new interleaved reads either — implement
pointer parallax by caching the hero rect on resize/scroll, never by re-measuring per frame. `applyPara`'s
±400px cull (`V4:387`) is the model to copy.

---

## No Analog Found

Files/features with no match in the design or the live source — the planner should use RESEARCH.md and
**flag these to Sirio as design additions** (CLAUDE.md: Claude leads design, Sirio approves).

| Feature | File | Role | Data Flow | Reason |
|---|---|---|---|---|
| **Fixed 70px nav (N-1)** | `index.html` / `styles.css` / `main.js` | component | scroll-driven | **No `position:fixed` nav exists in either design file.** The top bar is `position:absolute; top:0` inside the hero (`Star:49`, `V4:34`) and scrolls away. The design's fingerprint of the intended one is `scroll-margin-top:70px` on **every** section (`V4:53,69,107,141,164`). Nearest analog for *markup + typography* = `V4:34-40`; nearest analog for *the glass treatment* = `--glass-bg`/`--glass-border` tokens. Recommend: transparent over hero → glass/blur at `scrollY > 70`. **Requires approval (A4).** |
| **Pointer parallax (H-2)** | `main.js` | controller | pointer-driven | **No `mousemove`/`pointermove` handler in `Sirio Star.dc.html` or `star-engine.js`.** The star breathes on a timer only. Recommended Option B: few-px eased translate on `[data-star]`/`[data-planet]`, gated `@media (hover:hover)` + `REDUCED` bail-out, implemented in `main.js` **not** the engine. **Requires approval (A5).** |
| **`:has()` media slot** | `styles.css` | config | file-I/O | Design supplies the slot **shape** (`V4:82,94`) but toggles nothing — it is a hard-coded placeholder. The swap **mechanism** is new. `:empty` is a trap (whitespace is a text node); `:has()` is Baseline since Dec 2023. |
| **`site/assets/media/README.md`** | docs | config | file-I/O | Nothing analogous in the repo. |
| **Hero canvas transparency (Pitfall 3)** | `main.js` / `styles.css` | — | — | `HeroStar._draw:186-187` fills **opaquely**; `drawDeep` (`V4:367`) uses `clearRect`. The two files were **never composed** — `Sirio Star.dc.html` was authored standalone with `body{overflow:hidden}` (`:16`). The hero canvas will hide the fixed deep field across the whole first viewport → visible seam at the hero's bottom edge. **Biggest open visual decision (A6) — needs Sirio's eyes on a render.** |

**Media slot — the shape the design fixes** (`V4:82`) + the mechanism RESEARCH proposes:
```css
.media-slot { width:100%; aspect-ratio:16/9; border-radius:18px; overflow:hidden; margin:0;
  display:flex; align-items:center; justify-content:center; }
.media-slot:not(:has(> img, > video)) {
  background:repeating-linear-gradient(135deg, rgba(var(--accent),.09) 0 11px, rgba(var(--accent),.02) 11px 22px);
  border:1px dashed rgba(var(--accent),.32);
  box-shadow:0 30px 90px rgba(var(--accent),.10);
  transition:box-shadow .5s ease, border-color .5s ease; }
.media-slot:not(:has(> img, > video))::after {
  content:attr(data-label); font-family:var(--font-mono); font-size:12px;
  letter-spacing:.14em; text-transform:uppercase; color:rgba(var(--accent),.65); }
.media-slot > img, .media-slot > video { width:100%; height:100%; object-fit:cover; display:block; }
```
Fill = paste one element. **`aspect-ratio:16/9`** — the design says `16/9` (`V4:82,94`); `16/10` appears
nowhere (drift D-2).

---

## Drift Register (found during mapping)

| # | Drift | Evidence | Action |
|---|---|---|---|
| **D-3 (confirmed)** | `site/README.md:19` says `npx --yes serve app` | grepped: the only `app` reference under `site/`; folder is `site/` | One-word fix. `site/index.html`, `styles.css`, `main.js`, `star-engine.js` are **clean** — zero `app/` references. |
| **D-2 (confirmed)** | Media slot ratio recorded as 16:10 | `V4:82,94` both say `aspect-ratio:16/9`; `16/10` appears in neither design file | Build **16/9**. |
| **NEW — accent inconsistency** | `V4:92-100` plate 002 uses `255,122,89` (Aldebaran) inside the **Antares** Work section | read directly from V4 | Design-file inconsistency. `--accent` per **section** resolves it; note it so it isn't "faithfully" copied as a bug. |
| **NEW — dead copy** | `V4:63` promises *"SECTOR JUMPS ENGAGE A SHORT WARP BURST"* | warp is Phase 2/4 | Delete the line in Phase 1. |
| **NEW — `overflow` divergence** | `Sirio Star.dc.html:16` sets `html,body{overflow:hidden}`; `V4:26` uses `overflow-x:clip` | standalone vs. page | Copy V4's `clip`. Copying the Star file's `overflow:hidden` would kill the whole scrolling page. |
| **NEW — positional typewriter** | `Sirio Star.dc.html:130-131` uses `wrap.children[0]/[1]`; `star-engine.js:83-84` requires `[data-art]`/`[data-typer]` | both read | A literal markup port **silently disables** the typewriter. |

## Metadata

**Analog search scope:** `site/`, `.planning/phases/01-the-design-build/design/` (`_Archive/` excluded — off-limits)
**Files scanned:** 8 (`site/` ×5 + design ×3)
**Analogs read in full:** `site/star-engine.js` (296), `Sirio Star.dc.html` (375), `Sirio V4 …dc.html` (targeted: 1-200, 318-402, 558-602), `site/index.html`, `site/styles.css`, `site/main.js`
**Pattern extraction date:** 2026-07-16
