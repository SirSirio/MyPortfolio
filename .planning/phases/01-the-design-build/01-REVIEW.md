---
phase: 01-the-design-build
reviewed: 2026-07-16T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - site/index.html
  - site/styles.css
  - site/main.js
  - site/star-engine.js
  - .github/workflows/deploy.yml
findings:
  critical: 1
  warning: 11
  info: 8
  total: 20
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-07-16
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Five files reviewed: the page, the stylesheet, the entry module, the canvas engine, and the Pages workflow.

**What is clean and was verified, not assumed:**

- **`deploy.yml` is correct.** `path: ./site` is right, and a repo-wide grep for `app/` across `*.yml/html/js/css/json` returns **zero** hits — the 1b4b908 rename left no stale reference in the pipeline. Token scope is genuinely least-privilege (`contents: read`, `pages: write`, `id-token: write`); `concurrency` does not cancel in-progress publishes; `on.push.branches` includes `master`, which is this repo's actual default.
- **Injection surface is nil.** No `innerHTML`, no `eval`, no `document.write`, no user-controlled string reaching the DOM. The typewriter uses `textContent` throughout, and every `style` write is a numeric literal or an engine-local constant.
- **`target="_blank"` + `rel="noopener"` pairing is complete.** All four outbound links (CV, LinkedIn, iGEM wiki, DOI) carry it. No reverse-tabnabbing gap.
- **`tintAt()` boundary math is sound.** Traced `y=0`, `y=1`, and every PAL stop — no division by zero, no fallthrough to the `return p[p.length-1][1]` dead branch for in-range input.
- **The orbit state machine does not overlap or leak.** `armed`/`orbiting` re-arm at `b < 0.30` and fire at `b >= 0.45`, once per 20s breath; the longest orbit is 12.5s, so the trigger can never re-enter an active orbit. `this.rings` is filtered by lifetime every frame and cannot grow unbounded.
- **The frame's read/write ordering is correct.** `drawDeep` (no DOM access) → `star.frame` (reads rects, then writes styles) → `applyPointer` (writes only). No read-after-write thrash *inside* the rAF loop. The scroll handler is a different story — see WR-02.

The defects that follow cluster in three places: one viewport-unit mismatch that visibly degrades the deep field on phones (CR-01), per-frame work in `_measure`/`drawDeep` that is invariant and should be hoisted (WR-03, WR-04), and a genuinely thin accessibility layer (WR-01, WR-05 through WR-08).

## Critical Issues

### CR-01: Deep-field canvas backing store is sized from `innerHeight` while its CSS box is `100vh` — stretched and blurred on every phone

**File:** `site/styles.css:133-140`, `site/main.js:74-76`

The canvas element is sized in CSS with the **large** viewport:

```css
.deep { position: fixed; inset: 0; width: 100vw; height: 100vh; }
```

but its bitmap is sized from the **visual** viewport:

```js
const vw = window.innerWidth, vh = window.innerHeight;
const W = Math.round(vw * DPR), H = Math.round(vh * DPR);
```

On desktop these agree, which is why this is invisible in development. On mobile Chrome/Safari with the URL bar shown, `100vh` resolves to the large viewport (bar hidden) while `window.innerHeight` is the current visual height — typically 8–16% shorter (iOS Safari: ~110px). The browser then stretches a bitmap representing ~670 CSS px of starfield to fill an ~780 CSS px box.

Two consequences, both on the primary target device:

1. **Stars render as vertical ellipses**, not dots — a ~16% non-uniform scale.
2. **Everything is resampled and soft.** Bitmap height `670 × 2 = 1340` device px is upscaled into `780 × 2 = 1560` device px, throwing away the entire point of the DPR-aware sizing.

This is an oversight rather than a decision: `.hero` at `styles.css:164-165` correctly uses `min-height: max(100svh, 620px)`, so the small-viewport problem was understood — the fix just was not applied to `.deep`.

**Fix:** stop cross-referencing two different viewport definitions. Measure the canvas's own box, which is correct by construction regardless of which viewport unit the CSS uses, and cache it alongside the hero rect:

```js
/* main.js — cache with the hero rect, not per frame */
let deepW = 0, deepH = 0;
function cacheHeroRect() {
  if (heroEl) heroRect = heroEl.getBoundingClientRect();
  if (deepEl) { deepW = deepEl.clientWidth; deepH = deepEl.clientHeight; }
}

function drawDeep(now) {
  const c = deepEl;
  if (!c || !deepW || !deepH) return;
  const vw = deepW, vh = deepH;
  const W = Math.round(vw * DPR), H = Math.round(vh * DPR);
  if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
  /* ...unchanged... */
}
```

`cacheHeroRect()` already runs on boot, scroll and resize, so this needs no new listener. Note the scroll call matters here: on mobile the URL bar collapses *during* scroll, which is exactly when `clientHeight` changes.

## Warnings

### WR-01: Scroll parallax ignores `prefers-reduced-motion`

**File:** `site/main.js:98-109`, `site/main.js:180-195`

`boot()` registers the scroll listener **before** the `REDUCED` early-return:

```js
window.addEventListener('scroll', onScroll, { passive: true });   /* line 184 */
window.addEventListener('resize', onResize, { passive: true });
if (REDUCED) { renderStatic(); /* ... */ return; }                 /* line 191 */
```

`onScroll` calls `applyPara()`, which translates all 12 `[data-para]` elements (the giant sector numerals, the section blobs, the media slots) against scroll. Scroll-coupled parallax is precisely the class of motion `prefers-reduced-motion` exists to suppress, and it can trigger vestibular symptoms. The module gates pointer drift on `!REDUCED` (line 122) and gates the rAF loop on `!REDUCED` — parallax is the one motion source that leaks through.

**Fix:**

```js
function applyPara() {
  if (REDUCED) return;
  const vh = window.innerHeight;
  /* ... */
}
```

(Guard inside `applyPara` rather than skipping the listener — `onScroll` still needs to run for `syncNav`, which must keep docking under reduced motion as the comment at line 190 intends.)

### WR-02: `applyPara()` forces a synchronous layout per element, on every unthrottled scroll event

**File:** `site/main.js:98-109`

```js
for (const el of paraEls) {
  const r = par.getBoundingClientRect();   /* READ  */
  ...
  el.style.transform = '...';              /* WRITE */
}
```

Read and write are interleaved inside the loop. Each `el.style.transform` write dirties style; the next iteration's `getBoundingClientRect()` must flush style + layout before it can answer. With 12 `[data-para]` elements that is up to 12 forced synchronous layouts **per scroll event** — and `scroll` is not rAF-throttled here, so on a 120Hz phone it can fire far more often than there are frames to paint. This is the exact "layout thrash" pattern the file's own comment at lines 26-28 warns against for the pointer handler.

**Fix:** batch reads, then batch writes, and coalesce into the rAF loop:

```js
let paraDirty = true;
function applyPara() {
  if (REDUCED) return;
  const vh = window.innerHeight;
  /* phase 1: read everything */
  const offs = paraEls.map(el => {
    const par = el.parentElement;
    if (!par) return null;
    const r = par.getBoundingClientRect();
    if (r.bottom < -400 || r.top > vh + 400) return null;
    return (r.top + r.height / 2 - vh / 2) * -(parseFloat(el.dataset.para) || 0);
  });
  /* phase 2: write everything */
  for (let i = 0; i < paraEls.length; i++) {
    if (offs[i] === null) continue;
    paraEls[i].style.transform = 'translate3d(0,' + offs[i].toFixed(1) + 'px,0)';
  }
}

function onScroll() { paraDirty = true; cacheHeroRect(); syncNav(); }
/* in loop(): if (paraDirty) { applyPara(); paraDirty = false; } */
```

The two-phase split alone removes the thrash; the dirty flag additionally caps the work at one pass per frame.

### WR-03: `_measure()` re-derives font metrics every frame; all of it is invariant between resizes

**File:** `site/star-engine.js:121-149`, called unconditionally from `_draw` at line 159

Every single frame, for the lifetime of the page, `_measure()` performs:

- `root.querySelector('h1')` plus a `querySelectorAll('h1 > span')` scan to re-find the `o` (lines 123-125)
- `o.getBoundingClientRect()` (line 129)
- **`getComputedStyle(h1)`** and four `parseFloat`s off it (lines 131-136)
- **`this._mctx.measureText('o')`** — a full text-shaping call (line 134)

None of these inputs change between frames. The h1's computed font, its line-height, and the `o`'s box only move on **resize, font load, or zoom**. Worse, `_draw` writes ~9 custom properties onto `this.el` at lines 170-178 every frame, which invalidates style for the entire hero subtree — so the next frame's `getComputedStyle(h1)` is a guaranteed forced style recalculation, not a cached read. `_draw` also takes two more `getBoundingClientRect()` calls for the i-spans at line 247, on the same invariant-between-resizes basis.

On a mid-range phone this is the single largest avoidable cost in the frame, and the project's stated constraint is that this canvas stays smooth on real phones.

**Fix:** memoize on the hero's dimensions, which is the only thing that can invalidate the measurement:

```js
_measure(hr) {
  const key = hr.width + 'x' + hr.height;
  if (this._mkey === key) return;          /* centre/oSize/_h1fs still valid */
  this._mkey = key;
  /* ...existing body unchanged... */
}
```

Then invalidate once when webfonts land, since font swap changes metrics without changing hero size — `main.js` already waits on `document.fonts.ready` before `boot()`, so `this._mkey` starts cold at the right moment and no extra hook is needed. Apply the same treatment to the `homes` computation at lines 245-248 (cache the two i-span rects on the same key; only `x`/`y` from the orbit math varies per frame).

### WR-04: `drawDeep()` recomputes each star's colour every frame although `hue` never changes

**File:** `site/main.js:82-91`, seeded at `site/main.js:56-63`

```js
ctx.fillStyle = rgba(tintAt(s.hue), (L.a * tw).toFixed(3));
```

`s.hue` is assigned once at seed time and is never mutated, so `tintAt(s.hue)` returns the same triplet forever — yet it runs per star, per frame. Each call allocates a new 3-element array; `rgba()` then allocates a string; `.toFixed(3)` allocates another. With ~160 stars visible per frame across the three layers that is ~480 short-lived allocations per frame, ~29k/second — pure GC pressure on exactly the device class the project constrains for.

`.toFixed(3)` is also gratuitous: `fillStyle` parses an arbitrary float fine, and `toFixed` is a comparatively slow formatter.

**Fix:** hoist the invariant part into the seed, so the per-frame work is one concat:

```js
const mk = (n, rM, rX) =>
  Array.from({ length: n }, () => {
    const hue = Math.random();
    const c = tintAt(hue);
    return {
      x: Math.random(),
      y: Math.random() * 3,
      r: rM + Math.random() * (rX - rM),
      ph: Math.random() * 6.28,
      hue,
      /* precomputed prefix: 'rgba(R,G,B,' — only alpha varies per frame */
      pre: 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ','
    };
  });

/* in drawDeep: */
ctx.fillStyle = s.pre + (L.a * tw) + ')';
```

### WR-05: No `<main>`, no `<nav>`, and no banner — the page has essentially no landmark structure

**File:** `site/index.html:16-321`

Grepping the file for `<main`, `<nav`, and `<aside` returns nothing. Concretely:

- **No `<main>`.** All content sits in `<div class="page"> > <div class="field">`. Screen-reader users get no "skip to main content" target and no main region to jump to.
- **The nav links are a `<div>`** (`index.html:32`), so the CV and LinkedIn links — the two highest-value actions on a portfolio for a recruiter — are not exposed as a navigation landmark.
- **`<header data-nav>` is not a banner.** It is at `index.html:30`, nested inside `<section class="hero">`. A `<header>` scoped to sectioning content is *not* mapped to the `banner` role. So the docked bar, which is visually the site header for the whole page, has no landmark role at all.

`<footer class="footer">` at line 311 *is* a valid `contentinfo` (its nearest ancestor is a plain `<div>`), so the fix below leaves it alone.

The `contact__title` comment at `styles.css:1098-1101` shows the document outline was deliberately reasoned about — this is the same concern, one level up.

**Fix:** none of this touches the engine's selectors (`[data-hero]`, `[data-star]`, `h1 > span`, `[data-typer]`) or the wordmark:

```html
<div class="page">
  <canvas data-deep class="deep" aria-hidden="true"></canvas>
  <a class="skip-link" href="#index">Skip to content</a>
  <div data-field class="field">
    <section id="top" class="hero" data-hero>
      <header data-nav class="nav">
        <span class="nav__name">SIRIO VITTORIO FELTRIN</span>
        <nav class="nav__links" aria-label="Profile links">
          <a class="nav__link" ...>CV&nbsp;&#8599;</a>
          <a class="nav__link" ...>LinkedIn&nbsp;&#8599;</a>
        </nav>
      </header>
      ...
    </section>
    <main>
      <!-- #index, #work, #experience, #publications, #contact -->
    </main>
    <footer class="footer">...</footer>
  </div>
</div>
```

Wrapping only the content sections (not the hero) in `<main>` keeps `[data-hero]` a direct child of `.field`, so no CSS selector or engine query changes. Note `<div data-field class="field">` currently has no styling dependency on being a div.

### WR-06: The `<h1>` accessible name is "Sırıo", not "Sirio"

**File:** `site/index.html:91-94`

```html
<h1 class="wordmark">S<span class="wordmark__i">&#305;</span>r<span
  class="wordmark__i">&#305;</span><span class="wordmark__o">o</span></h1>
```

`&#305;` is U+0131 LATIN SMALL LETTER DOTLESS I. The load-bearing reasons for it are documented and correct — I am not proposing to change the glyphs. But the consequence is that the page's `<h1>`, its single most important piece of text, computes an accessible name of **"Sırıo"**. Screen readers announce U+0131 inconsistently (some read it as "i", some fall back to a character-name announcement or spell it out); the string also does not match a search for "Sirio", and copy-pasting the name yields dotless i's.

The final `o` compounds it: it is `color: transparent` (`styles.css:252-255`), so sighted users read the star as the "o" while the accessible name still carries a literal "o" — correct, but only by luck.

**Fix:** one attribute, invisible to the engine (which matches on `textContent`, never on `aria-label`):

```html
<h1 class="wordmark" aria-label="Sirio">S<span
  class="wordmark__i">&#305;</span>r<span
  class="wordmark__i">&#305;</span><span
  class="wordmark__o">o</span></h1>
```

### WR-07: Heading levels skip from `h2` to `h4`

**File:** `site/index.html:234-264` (Experience), `site/index.html:286-291` (Publications)

Experience is `<h2>Experience</h2>` followed directly by four `<h4>` role titles. Publications is `<h2>Publications</h2>` followed by an `<h4>`. Both skip `h3`. Work gets this right (`h2` → `h3` per plate), which is what makes the other two read as oversights rather than intent.

Heading-level skips break screen-reader outline navigation — a user jumping by heading level cannot tell whether an `h4` under an `h2` is a sibling or a nested subsection.

**Fix:** demote to `<h3>` in both sections and adjust the two selectors that target them:

```css
.exp__row h3 { /* was .exp__row h4 */ }
.pub h3      { /* was .pub h4 */ }
```

The `font:` shorthands in those rules already set the size explicitly, so nothing changes visually.

### WR-08: Four text styles fail WCAG AA contrast

**File:** `site/styles.css:495`, `styles.css:518`, `styles.css:693`, `styles.css:1147`

Computed against the `.page` gradient behind each (sRGB relative luminance, WCAG 2.x ratio):

| Element | Declaration | Size | Ratio | AA needs |
|---|---|---|---|---|
| `.corner-mark` (:495) | `rgba(228,236,255,0.32)` | 11px | **~2.5:1** | 4.5:1 |
| `.footer__inner` (:1147) | `rgba(228,236,255,0.38)` | 11px | **~2.9:1** | 4.5:1 |
| `.scrollhint__label` (:518) | `rgba(228,236,255,0.42)` | 10px | **~3.2:1** | 4.5:1 |
| `.section__label--lead` (:693) | `rgba(228,236,255,0.45)` | 11px | **~4.0:1** | 4.5:1 |

`.corner-mark` fails even the 3:1 large-text threshold, and it is 11px — nowhere near large text. These are not decorative flourishes: the footer carries the name, `.scrollhint__label` is the page's only affordance telling a visitor there is anything below the fold, and `.section__label--lead` is the Mission section's lead line.

Checked and **passing**, for contrast with the above: `.nav__name` (0.55 → ~5.8:1), `.nav__link` (0.6), `--text-body` (0.76), `.section__label` accent triplets (~8:1 at Antares), `.pub__role`, `.exp__at`.

**Fix:** raise the four alphas. These clear 4.5:1 against the darkest stop of the gradient:

```css
.corner-mark        { color: rgba(228, 236, 255, 0.55); }  /* was 0.32 */
.footer__inner      { color: rgba(228, 236, 255, 0.58); }  /* was 0.38 */
.scrollhint__label  { color: rgba(228, 236, 255, 0.60); }  /* was 0.42 */
.section__label--lead { color: rgba(228, 236, 255, 0.62); } /* was 0.45 */
```

The muted register survives — 0.55–0.62 still reads as clearly secondary against `--text-hi` at full opacity.

### WR-09: `DPR` and `REDUCED` are captured once at module load and never re-evaluated

**File:** `site/star-engine.js:12-13`

```js
export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const DPR = Math.min(window.devicePixelRatio || 1, 2);
```

Both are read at import time and frozen for the session.

- **`DPR`:** `devicePixelRatio` changes on browser zoom and when a window moves between monitors of different density. Both canvases keep sizing their bitmaps to the stale ratio, so the star and the deep field go soft after a zoom and never recover without a reload. The DPR-vs-CSS-box mismatch this creates is the same failure mode as CR-01, just triggered differently.
- **`REDUCED`:** toggling the OS setting has no effect until reload; the rAF loop keeps running for a user who just asked it to stop.

**Fix:** make both live. `DPR` needs the resolution-media-query trick because there is no `devicePixelRatio` change event:

```js
export let DPR = Math.min(window.devicePixelRatio || 1, 2);
function watchDPR() {
  const mq = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
  mq.addEventListener('change', () => {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    watchDPR();   /* re-arm: the query itself is now stale */
  }, { once: true });
}
watchDPR();

const RM = window.matchMedia('(prefers-reduced-motion: reduce)');
export let REDUCED = RM.matches;
RM.addEventListener('change', e => { REDUCED = e.matches; });
```

`export let` keeps live bindings across ES modules, so `main.js`'s existing `import { REDUCED, DPR }` sees updates with no call-site change. The canvas-resize checks in both draw functions (`if (c.width !== W)`) then pick up the new size on the next frame for free. `HeroStar` reads `this.dpr` from `DPR` in its constructor (line 41), so that copy also needs to re-read — or just use the live `DPR` binding directly in `_draw`.

### WR-10: `document.fonts.ready.then(boot)` has no timeout — the whole page is one unresolved promise away from dead

**File:** `site/main.js:204-208`

```js
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(boot);
} else {
  boot();
}
```

`boot()` is the only thing that starts the rAF loop, registers the scroll listener, and docks the nav. Every one of those is gated on a promise from a **third-party font CDN** (`fonts.googleapis.com`, `index.html:7-12`). If that promise does not settle — CDN blocked by a corporate proxy, a network the browser never gives up on, an extension interfering — the visitor gets a dark page with an unstyled name, no star, no animation, no nav docking, and no scroll parallax. The wow-moment is the project's stated core value; making it strictly dependent on an external CDN resolving is a poor trade for the font-metric jump the comment describes.

Note the fallback branch is also close to unreachable in practice: `document.fonts` is universally supported, so the `else` is dead code that reads like a safety net but never fires.

**Fix:** race it. Worst case the star measures against the fallback font and re-measures when Space Grotesk lands — the visible jump the comment wants to avoid, but only on a slow network, and vastly better than nothing rendering at all:

```js
const fontsReady = (document.fonts && document.fonts.ready)
  ? document.fonts.ready
  : Promise.resolve();
const timeout = new Promise(r => setTimeout(r, 2000));
Promise.race([fontsReady, timeout]).then(boot);

/* Re-measure if the font lands after we already booted. Cheap once WR-03
   memoizes _measure: this just drops the cache key. */
fontsReady.then(() => { star._mkey = null; });
```

### WR-11: `onResize()` does not call `applyPara()` — parallax offsets go stale on resize and orientation change

**File:** `site/main.js:163-172`

```js
function onScroll() { cacheHeroRect(); syncNav(); applyPara(); }
function onResize() { cacheHeroRect(); syncNav(); }          /* applyPara missing */
```

`boot()` calls all three (lines 181-183) and `onScroll` calls all three; `onResize` calls two. But `applyPara`'s output depends on `window.innerHeight` and on every `[data-para]` parent's rect — both of which resize changes and scroll does not necessarily follow. On a phone orientation change, or a desktop window resize with no subsequent scroll, every sector numeral and section blob keeps the translate computed for the old viewport until the visitor happens to scroll.

**Fix:**

```js
function onResize() { cacheHeroRect(); syncNav(); applyPara(); }
```

(With WR-02's dirty flag, this becomes `paraDirty = true;` — same one-line shape.)

## Info

### IN-01: `GOLD` is assigned and never read

**File:** `site/main.js:45`

```js
const GOLD = star.pal;
```

Grep confirms the only other occurrence of `GOLD` in `site/` is the word inside the comment on line 41. Dead binding.

**Fix:** delete line 45. The line above it (`star.pal = {...}`) is the one doing the work.

### IN-02: Unused export and unread field

**File:** `site/star-engine.js:33`, `site/star-engine.js:164`

- `export function clamp(...)` — not imported by `main.js` (which takes `HeroStar, REDUCED, DPR, tintAt, rgba`) and not referenced anywhere inside `star-engine.js` itself. `main.js` even open-codes clamping at lines 131-132 with `Math.max(-1, Math.min(1, nx))` rather than importing it.
- `this.b = b;` at line 164 is assigned every frame and never read.

**Fix:** either use `clamp` at `main.js:131-132` or drop the export; delete `this.b`. (If `this.b` is intended as a public read-out for a future phase, a comment saying so would stop the next reader from deleting it.)

### IN-03: `data-jump` and `data-scrollhint` have no consumer

**File:** `site/index.html:110`, `index.html:134-137`

Grep for `data-jump|data-scrollhint|data-reveal` across `site/*.js` returns nothing. `data-reveal` is explicitly documented as inert-until-Phase-2 (`index.html:121-123`) — good. `data-jump` (five elements) and `data-scrollhint` (one) get no such note, so they read as wiring that was forgotten rather than deferred. The anchors work today purely via `href` + `scroll-behavior: smooth`.

**Fix:** add a one-line comment mirroring the `data-reveal` note, or remove them until the phase that consumes them.

### IN-04: Dead transition on `.scrollhint`

**File:** `site/styles.css:509`

`transition: opacity 0.6s ease;` — nothing ever changes `.scrollhint`'s opacity. No `:hover` rule sets it, and no JS touches it. Presumably the design faded the hint out on scroll and only the transition survived the port.

**Fix:** remove, or implement the fade it implies.

### IN-05: Empty catch swallows measurement failures silently

**File:** `site/star-engine.js:145`

```js
} catch (e) {}
```

This one is defensible — `centerYfrac` and `ink` are given fallback values at line 127 *before* the `try`, so a throw leaves defined behaviour. Flagging only because a silent catch around `getComputedStyle` + `measureText` will also swallow a genuine bug introduced later in that block.

**Fix:** `catch (e) { /* fontBoundingBox* unsupported — fall back to the ratios above */ }` — the comment costs nothing and tells the next reader the emptiness is deliberate.

### IN-06: Decorative canvases are not hidden from assistive tech

**File:** `site/index.html:19`, `index.html:40`

Neither `<canvas data-deep>` nor `<canvas class="hero__canvas">` has `aria-hidden="true"`. Both are purely decorative and have no fallback content. Most screen readers ignore an empty canvas, so impact is low — but it is not guaranteed, and the intent should be explicit.

**Fix:** `aria-hidden="true"` on both. (Included in WR-05's snippet.)

### IN-07: `.hero__content { pointer-events: none }` makes the name and tagline unselectable

**File:** `site/styles.css:221-225`

Nothing inside `.hero__content` is interactive, so this breaks no functionality — but it does mean a visitor cannot select or copy "Sirio" or the rotating role from the hero. On a portfolio, the name is a plausible thing to want to copy. If the rule exists to keep the cursor from interacting with the star, note that `.star` and `.hero__parallax` already set `pointer-events: none` themselves (`styles.css:218`, `styles.css:308`).

**Fix:** drop it from `.hero__content` and verify the star still ignores the cursor; if some child does need it, scope it to that child.

### IN-08: `HeroStar.destroy()` is never called; `heroEl` is passed unguarded

**File:** `site/star-engine.js:61`, `site/main.js:13-17`, `main.js:39`

- `destroy()` (which clears the typewriter's `setTimeout` chain) has no caller. Harmless on a single-page site that never tears down — worth knowing it is unexercised code before anyone relies on it.
- `main.js` carefully guards `heroEl &&` three times (lines 16-17, 31) and then passes `heroEl` straight into `new HeroStar(heroEl, ...)` at line 39, where the constructor immediately does `heroEl.querySelector(...)` at line 45. If `[data-hero]` were ever absent, the guards buy nothing and the module throws at import time. Inconsistent rather than wrong — the element always exists in the shipped HTML.

**Fix:** pick one posture. Either drop the `heroEl &&` guards as noise, or gate construction: `const star = heroEl ? new HeroStar(heroEl, {...}) : null;` and null-check at the two call sites in `loop`/`renderStatic`.

---

_Reviewed: 2026-07-16_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
