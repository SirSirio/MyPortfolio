# Phase 2: The Story - Pattern Map

**Mapped:** 2026-07-17
**Files analyzed:** 5 (3 modified, 1 new-optional, 1 asset drop)
**Analogs found:** 5 / 5 — every new construct has a shipped in-repo analog

> **Phase 2 creates almost no new file — it extends three shipped ones.** That is the headline
> finding. There is no greenfield module here: `#origin` and `#method` are new *markup inside an
> existing document*, `initReveals()` is a new *function beside an existing one*, and the reveal
> vocabulary is a new *block in an existing stylesheet*. The analogs are therefore unusually strong
> and unusually binding — the planner should treat "match the neighbouring code" as the default and
> justify every departure.

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `site/index.html` — `#origin` section | markup / content | static render | `#index` Mission (`:124-143`) + `#work` head (`:154-162`) | **exact** — same `.section` shape |
| `site/index.html` — `#method` section | markup / content | static render + timer-driven | **sketch 001 variant D** (`.planning/sketches/001-method-section/index.html:627-774`) — LOCKED | **exact** (structure) / **needs re-theming** (colour, type, `body.js`) |
| `site/index.html` — `#contact` links | markup | static render | `.nav__link` (`:33-34`) + `.plate__link` (`:204`) | **exact** |
| `site/index.html` — un-nest reveals | markup | static render | `#work` `.section__head` (`:158-161`) | **exact** (it is the thing being edited) |
| `site/index.html` — composite media slot | markup | static render | `.media-slot` figure (`:183`) | **role-match** — deliberate MEDIA-01 deviation (D-29) |
| `site/styles.css` — 2 palette stops | config / tokens | n/a | `:root` stops (`:12-17`) | **exact** |
| `site/styles.css` — accent map entries | config | n/a | `#index`…`#contact` map (`:572-590`) | **exact** |
| `site/styles.css` — `.section--full` | layout | n/a | `.hero` floor (`:164-165`) | **exact** — reuse verbatim |
| `site/styles.css` — reveal vocabulary | motion | state-driven | **no analog** — `styles.css` has zero reveal rules by design (D-34) | **none** → see § No Analog Found |
| `site/styles.css` — METHOD section CSS | component | n/a | sketch 001 CSS (`:282-435`) + `.exp__*` (`:945-988`) | **role-match** |
| `site/main.js` — `initReveals()` | motion controller | event-driven (IO) | `applyPara()` (`main.js:100-111`) — shape; V4 `updateReveals()` — behaviour | **role-match** (trigger deliberately differs, DEV-1) |
| `site/main.js` — METHOD sequence | motion controller | timer-driven | sketch `playD()` / `playTrack()` (`:966-1123`) | **exact** — port, re-theme |
| `site/assets/media/*` | asset | file I/O | `site/assets/media/README.md` contract | **exact** |

---

## Pattern Assignments

### `site/index.html` — `#origin` (markup, static render)

**Analog:** `site/index.html:154-162` (`#work` head) + `:124-143` (`#index` Mission).

**Section shell pattern** — copy this shape exactly, minus the numeral (D-02):

```html
<!-- site/index.html:154-162 — the shipped section shell -->
<section id="work" class="section">
  <span aria-hidden="true" data-para="-0.07" class="section__numeral section__numeral--right">01</span>
  <div data-para="0.13" class="section__blob section__blob--work"></div>
  <div class="section__inner">
    <div data-reveal="0" class="section__head">
      <span class="section__label">01 — ANTARES SECTOR</span>
      <span class="section__rule"></span>
    </div>
    <h2 data-reveal="0">Selected Work</h2>
```

**What `#origin` changes, and why each change is licensed:**

| Element | Shipped `#work` | `#origin` | Licence |
|---|---|---|---|
| `class` | `section` | `section section--full` | NAV-01 / UI-SPEC § Full-Height |
| `.section__numeral` | present | **ABSENT** | D-02 — interludes are unnumbered |
| `.section__label` | `01 — ANTARES SECTOR` | `// ORIGIN` | UI-SPEC § Section Anatomy |
| `.section__blob` | `data-para="0.13"` | keep `data-para` | free depth via shipped `applyPara()` |
| `data-reveal` on `.section__head` | yes | **no — moved to children** | Pitfall 5 / UI-SPEC P-1 |

**The un-nesting edit (P-1) — the one that makes `draw` work at all.** `.section__rule` is a child of
`.section__head`, and `.section__head` currently *is* `[data-reveal="0"]`. A reveal inside a reveal
multiplies opacity — the child transitions to completion while the parent is still at 0, then
"appears" with no motion. Apply to `:158`, `:230`, `:282` **and** the two new sections:

```html
<!-- AFTER — reveals are siblings, never nested -->
<div class="section__head">
  <span data-reveal="0" class="section__label">// ORIGIN</span>
  <span data-reveal="0" data-reveal-kind="draw" class="section__rule"></span>
</div>
<h2 data-reveal="0" data-reveal-kind="assemble">How I got here</h2>
```

**Comment-density pattern — this file's most distinctive convention.** Every shipped section carries
a block comment stating *why* it deviates from the design and *what breaks if edited*
(`:116-123`, `:145-153`, `:210-225`, `:269-277`, `:296-299`). These are load-bearing — `:75-87`
literally prevents a "fix" that would silently kill the hero star. **New sections must carry one.**
`#origin`'s comment should record D-09 (the late-nights beat has no `profile.md` backing) and D-02
(unnumbered on purpose, not an omission).

**Content grounding:** every beat traces to `profile.md` (see RESEARCH § Content Sourcing Map). The
Phase 1 sections set the standard — `:151-153` says *"Every description below is written from
../00_Profile/profile.md. The design's placeholder copy is not ported."* Match it.

---

### `site/index.html` — `#method` (markup, timer-driven)

**Analog:** `.planning/sketches/001-method-section/index.html:627-774` — **variant D, LOCKED by Sirio.**
Structure, objects and animation port as-is. Colour and type do **not** (his words: *"I take this only
for the actual parts and objects and animation, not for details like font"*).

**Port verbatim — Act 1 shell** (`sketch:631-660`): `.calc-wrap`, `.calc__screen`, `.calc__ghost`,
`.calc__out`, the 4×4 `.keys` grid, and the five `.manifesto` `<p>` stanzas (D-15's approved draft).

```html
<!-- sketch:640-659 — port structure; re-theme colour/type -->
<div class="calc calc--big" data-rise>            <!-- → data-reveal -->
  <div class="calc__screen">
    <div class="calc__ghost" id="d-ghost">&nbsp;</div>
    <div class="calc__out" id="d-out">0</div>
  </div>
  <div class="keys" id="d-keys">
    <div class="key">7</div><div class="key">8</div><div class="key">9</div><div class="key op">÷</div>
    …
  </div>
</div>
<div class="manifesto">
  <p data-rise>I was ten, and I hated long division. The calculator could just do it.</p>
  …
  <p class="land" data-rise>Same bottleneck, one layer up. …</p>
</div>
```

**Four mechanical conversions the sketch requires before it is production markup:**

| # | Sketch | Production | Why |
|---|---|---|---|
| 1 | `data-rise` / `data-draw` + `.in` class | `data-reveal` + `data-reveal-kind` + `data-rev-state` | one vocabulary, UI-SPEC C-2 |
| 2 | **two** `<section data-sec="d">` + `data-sec="d2"` | **one** `<section id="method">` with `.method__act` children | one accent entry, one floor — UI-SPEC § `#method` |
| 3 | `<em style="font-style:normal;color:rgba(var(--accent),0.9)">` (`sketch:725`) | a class (e.g. `.ph__em`) | inline style; the live site has zero inline `style=` on content |
| 4 | `<button class="replay" onclick="play('d',true)">` (`sketch:772`) | **drop it** | sketch-only affordance; also the only inline handler |

**⛔ Two sketch lines that must not ship as-is:**

- `sketch:719` — `↳ skills carry my design rules in, so it reasons from my constraints` is
  **OI-2: Claude-invented and unconfirmed.** Blocks the line, not the phase. Replace with Sirio's
  words or cut the note — the loop reads without it.
- `sketch:737` — `AI processes the results and runs the stats.` is the deck's blunter claim. The
  `.ph__note` at `:738` (*"I give the direction — it writes the custom Python. It does not run
  itself."*) is Sirio's deliberate narrowing. **Keep the note; do not widen the desc back.**

**Contact/outbound link pattern applies here too** — `sketch:702` and `:769` already carry
`target="_blank" rel="noopener"` correctly. Preserve.

---

### `site/index.html` — `#contact` links (markup, static render)

**Analog:** `site/index.html:33-34` (`.nav__link`) and `:204` (`.plate__link`).

```html
<!-- site/index.html:33-34 — the shipped outbound pattern -->
<a class="nav__link" href="https://canva.link/5a5yj5bdg78axhv" target="_blank" rel="noopener">CV&nbsp;&#8599;</a>
<a class="nav__link" href="https://www.linkedin.com/in/sirio-vittorio-feltrin/" target="_blank" rel="noopener">LinkedIn&nbsp;&#8599;</a>
```

**Three conventions this excerpt encodes — all three are audit gates (G-7):**

1. `target="_blank" rel="noopener"` on every outbound link. `:29` states *why*: **`noopener` is what
   blocks reverse tabnabbing.** Modern browsers imply it; the explicit attribute is the shipped
   pattern and the grep target.
2. **`&#8599;` (↗), not a literal glyph** — the whole file uses numeric entities for arrows
   (`&#8599;` ↗, `&#8600;` ↘ at `:134-137`). Match it.
3. **`&nbsp;` before the arrow** — the glyph never orphans onto its own line.

**Extend, do not rebuild (D-24).** The existing `#contact` block:

```html
<!-- site/index.html:300-308 — keep the title, keep the label, add links -->
<section id="contact" class="section section--contact">
  <div data-para="0.1" class="section__blob section__blob--contact"></div>
  <div class="section__inner">
    <div data-reveal="0" class="section__label section__label--contact">04 — TRANSMISSION · SIRIUS SECTOR</div>
    <h2 data-reveal="1" class="contact__title">Let's build something.</h2>
    <div data-reveal="2">
      <a class="contact__email" href="mailto:sirio.feltrin@gmail.com">sirio.feltrin@gmail.com</a>
    </div>
```

The email is the primary CTA and already correct. New links (LinkedIn / GitHub / iGEM) go **beside**
it as secondary. **No CV link (D-22).**

---

### `site/styles.css` — tokens + accent map (config)

**Analog:** `site/styles.css:12-17` and `:568-590`.

```css
/* site/styles.css:12-17 — bare R,G,B triplets so they compose in rgba(var(--x), a) */
:root {
  /* Deep-field palette stops — these mirror PAL in star-engine.js:4-10. */
  --star-sirius: 150, 196, 255;
  --star-antares: 244, 182, 89;
  --star-aldebaran: 255, 122, 89;
  --star-vega: 171, 140, 255;
```

⚠ **The shipped comment says the stops "mirror PAL". The two new stops deliberately will not.**
That is L-3 / Pitfall 7: `PAL` (`star-engine.js:4-10`) feeds `tintAt()`, which colours all 484
deep-field stars (`main.js:91`). Adding the new stops to `PAL` silently re-tints the whole page.
**The divergence must be commented at the token site or the next tidy-minded edit "fixes" it** —
and the existing comment actively invites that fix. Update it.

```css
/* site/styles.css:568-590 — the accent map. One entry per section id. */
#index      { --accent: var(--star-sirius); }
#work       { --accent: var(--star-antares); }
#experience { --accent: var(--star-aldebaran); }
#publications { --accent: var(--star-vega); }
#contact    { --accent: var(--star-sirius); }
```

⚠ **`#origin` and `#method` entries are a REQUIRED task, not styling polish** (P-4 / Pitfall 6).
Omit them → `var(--accent)` unresolved → `rgba(, 0.4)` is an invalid declaration → the browser drops
it → labels, rules and blobs render **transparent, with no console error.** The section looks
half-built and nothing tells you why. Gate G-4 exists for exactly this.

**The architectural comment at `:544-560` is the section system's spec** — it states the two rules
this phase must not break: *"there is exactly one `.section` class, and each section sets `--accent`
to the PAL stop it owns"*, and *"`--accent` is section-driven, never plate-driven"*. UI-SPEC Cl-2
grants **one scoped, defended exception** (`.track--physical { --accent: var(--star-zuben) }`) — it
is the mechanism by which the line/loop contrast reads. Name it in the plan as sanctioned.

---

### `site/styles.css` — `.section--full` (layout)

**Analog:** `site/styles.css:164-165` — **reuse verbatim, do not invent a second approach.**

```css
/* site/styles.css:158-165 — the shipped two-declaration cascade fallback */
.hero {
  /* The 620px floor is the design's (V4:33). It is not cosmetic: it guarantees
     the star's halo always has room inside the hero … */
  min-height: max(100vh, 620px);
  min-height: max(100svh, 620px);
}
```

Two declarations, not `@supports`: the second overrides where `svh` is supported and is ignored
where it is not. `min-height` is a **floor**, not a cage — content that overruns simply grows, which
is the property that makes this survive the Phase 3 mobile pass unchanged. `svh`, never `dvh`
(`dvh` reflows during the exact scroll gesture that triggers reveals, on a page with a live canvas
rAF loop).

---

### `site/styles.css` — reveal vocabulary (motion) — **NO ANALOG BY DESIGN**

There is deliberately **zero** reveal CSS in this file. The warning at `:550-555` is the analog:

```css
/* site/styles.css:550-555 */
   ⚠ NEVER add a rule selecting the reveal attribute to this file.
   updateReveals() (V4:579-585) is what sets opacity:0, and it is
   deferred to Phase 2 (MOTION-01). The attributes ship inert; a
   hiding rule here would ship an INVISIBLE page to every visitor.
   (Written without the literal bracketed selector on purpose — the
   verification gate greps this file for it.)
```

**Phase 2 does not violate this warning — it satisfies its intent by a different route.** The rule
survives as: *no hiding rule may key on a selector that exists without JS.* CSS keys only on
`[data-rev-state="…"]`, an attribute `initReveals()` creates. JS never runs → attribute never exists
→ no rule matches → page renders fully.

**⚠ The warning's own text is now stale and should be updated in place, not deleted** — it names
`updateReveals()` and calls the work "deferred to Phase 2". Leaving it as-is after Phase 2 ships
makes the file lie about its own state. Rewrite it to state the `data-rev-state` contract, and
**keep it free of the literal bracketed selector** — G-2 greps this file.

**Elements to animate already exist. They need only `transform-origin` + a transform:**

```css
/* site/styles.css:645-653 — ALREADY a 1px horizontal gradient line, one per section head */
.section__rule {
  flex: 1;                    /* ⚠ a transform on a flex item does not disturb flex layout — safe */
  height: 1px;
  background: linear-gradient(90deg, rgba(var(--accent), 0.4), rgba(var(--accent), 0));
}

/* site/styles.css:953-966 — ALREADY a 1px vertical gradient line down the timeline */
.exp__spine {
  position: absolute; left: 8px; top: 10px; bottom: 10px; width: 1px;
  background: linear-gradient(180deg, rgba(var(--accent),0), rgba(var(--accent),.55) 16%, …);
}

/* site/styles.css:979-988 — the 9px dot that pops AFTER the spine passes it */
.exp__dot {
  position: absolute; left: -42px; width: 9px; height: 9px; border-radius: 50%;
  background: rgb(var(--accent));
  box-shadow: 0 0 14px rgba(var(--accent), 0.9);   /* ⚠ L-2: assemble's overflow:hidden would clip this */
}
```

Add `transform-origin: left center` / `center top` at the element; the transform values live in the
reveal block. **This closes "lines draw themselves" across every existing section for the cost of
two `transform-origin` declarations** — `#work`, `#experience` and `#publications` all already have
a `.section__rule`.

**Reduced motion — reuse, never duplicate** (`styles.css:1156-1165`):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

⚠ **This block flattens *durations*; it does not reset *values*.** Anything whose armed state is a
non-default value (the loop arc's `stroke-dashoffset`, a `scaleX(0)`) is **not** rescued by it — JS
must set the resolved end state. `initReveals()`'s `REDUCED` early-return does exactly that. This is
why the sketch's extra `@media (prefers-reduced-motion)` at `sketch:391` was needed *there* and is
**redundant here** (`playTrack()`'s reduced branch adds `.lit`, which sets `stroke-dashoffset: 0`).
**Do not port it — D-36 forbids the second query.**

---

### `site/main.js` — `initReveals()` (motion controller, IO-driven)

**Analog for shape and placement:** `applyPara()` (`main.js:100-111`). **Analog for behaviour:**
V4's `updateReveals()` (stagger, re-arm, reduced branch) — ported; its *trigger* is not (DEV-1).

```js
/* site/main.js:96-111 — the neighbour. Note the comment states the tier decision
   ("scroll-driven, so it runs on scroll rather than per frame") and names the guard. */
function applyPara() {
  const vh = window.innerHeight;
  for (const el of paraEls) {
    const par = el.parentElement;
    if (!par) continue;
    const r = par.getBoundingClientRect();
    if (r.bottom < -400 || r.top > vh + 400) continue;      /* the ±400px cull is the perf guard */
    const f = parseFloat(el.dataset.para) || 0;
    el.style.transform = 'translate3d(0,' + (…).toFixed(1) + 'px,0)';
  }
}
```

**What to copy from it:** module-scope element cache (`paraEls`, `main.js:18` — queried once at load,
not per call); `dataset` read + `parseFloat(…) || 0` defaulting; a rationale comment naming the
tier decision and the guard.

**What NOT to copy:** the `getBoundingClientRect()` read. `initReveals()` is observer-driven —
`entry.isIntersecting` is pre-resolved and free. Calling `getBoundingClientRect()` inside the IO
callback reintroduces the exact reflow DEV-1 removes (G-5).

**The reduced-motion gate pattern** — `main.js` already establishes early-return-on-`REDUCED`:

```js
/* site/main.js:11 — REDUCED is imported already. Reuse it; do not add a second matchMedia. */
import { HeroStar, REDUCED, DPR, tintAt, rgba } from './star-engine.js';

/* site/main.js:193-197 — the shipped gate shape: do the static thing, return, never loop. */
if (REDUCED) {
  renderStatic();
  window.addEventListener('resize', renderStatic, { passive: true });
  return;
}
```

`initReveals()` mirrors this exactly: mark every element `shown`, return, never observe.

**The loop is closed to this phase** (`main.js:1-9`, `:156-169`):

```js
/* site/main.js:7-9 — the module's own contract, stated at the top of the file */
   The engine (star-engine.js) owns everything inside [data-hero]. This module
   supplies the palette, the tempo, the deep field, and ONE rAF loop that drives
   both canvases. Do not add a second loop.

function loop(now) { requestAnimationFrame(loop); drawDeep(now); star.frame(now); applyPointer(); }
function onScroll() { cacheHeroRect(); syncNav(); applyPara(); }
```

`loop()` and `onScroll()` are **untouched** — with IO, `onScroll` gains nothing, so the page does
strictly *less* scroll work than today (D-37 ✅, G-5).

**Boot ordering** (`main.js:182-210`): call `initReveals()` from `boot()`, alongside `applyPara()`.
Note `boot()` is gated on `document.fonts.ready` (`:206-207`) — E-8, because the engine measures
against computed font metrics. Reveals inherit that gating for free, which is *desirable*: arming
before font swap would stagger against shifting metrics.

**Listener convention:** every listener in this file is `{ passive: true }` (`:186-187`, `:195`, `:199`).

---

### `site/main.js` — METHOD sequence (motion controller, timer-driven)

**Analog:** `sketch:966-1123` — port. This is the pacing Sirio approved after his first-cut rejection.

```js
/* sketch:962-972 — LOCKED. Port this object verbatim, at the top of the module.
   "Timing is the whole point of this rebuild: Sirio could not read the sentences." */
const D = {
  keyStep:   240,   // ms between key presses (was 165)
  mashPause: 3400,  // hold on the meaningless answer  (was ~260)
  preOrder:  1200,  // beat before the order starts
  lineHold:  2600,  // how long each sentence sits before the next (was 520)
  finalHold: 2800,  // before the last line lands
};
```

**Keep them in one object, at the top.** Re-pacing must stay a numbers-only edit — the "reveal
timings tuned by eye run far too fast" lesson is phase-wide, and Sirio may well want them slower
still.

**Three patterns in the sketch JS that are load-bearing, not incidental:**

```js
/* sketch:1062-1069 — the play-once guard. Sketch bug 2: the load handler AND the
   observer both fired the sequence; the second run cleared the first's timers mid-play. */
const played = new Set();
function play(v, force) {
  if (!force && played.has(v)) return;
  played.add(v);
  …
}

/* sketch:973-975 — timer hygiene. Every setTimeout is tracked and cleared on replay. */
let dTimers = [];
function playD() { dTimers.forEach(clearTimeout); dTimers = []; … }

/* sketch:985-990 — the reduced branch skips to the RESOLVED state, not a blank one.
   The argument still lands; only its pacing is lost. That is the C-5 test. */
if (isReduced()) {
  ghost.textContent = 'MAP → STRATEGY → EXECUTE';
  out.classList.add('resolved');
  out.textContent = 'THE DIRECTION IS MINE';
  return;
}
```

**`textContent`, never `innerHTML`** — `sketch:1002`, `:1010`, `:1025` all use `textContent`, matching
`star-engine.js:103-104` and `01-PATTERNS.md:366-368` (*"'Improving' it to `innerHTML` adds an
injection sink for free"*). ⚠ **Variant A does not** — `sketch:859-860` builds an `ACC` HTML string
and renders it. **Variant A is not the locked variant; do not port from it.**

**Conversions required:**

| Sketch | Production | Why |
|---|---|---|
| `body.js .ph__wire { transform: scaleX(0) }` (`sketch:355`, `:192`, `:211`, `:417`) | `[data-method-state="armed"] .ph__wire { … }` | **shipped a dark page twice** (README § Bugs, bug 1) — `body.js` scoping made the hide `(0,3,1)`, out-specifying the `.in` reveal at `(0,3,1)`. The fix carried `body.js` on both sides to reach `(0,4,1)` — a specificity race a future edit silently loses. `data-*-state` removes the race. **G-2 greps `site/` for `body.js` → must be zero hits.** |
| `isReduced()` = `RQ.matches \|\| FORCED_REDUCED` (`sketch:800-802`) | `REDUCED` from `star-engine.js:12` | `FORCED_REDUCED` is the sketch toolbar's override — sketch-only. D-36: one source of truth |
| `@media (prefers-reduced-motion)` at `sketch:391` | **drop** | redundant — `playTrack()`'s reduced branch already sets `.lit`; D-36 forbids a second query |
| `window.addEventListener('load', …)` (`sketch:1123`) | `boot()` via `document.fonts.ready` | matches `main.js:206` |

**`initArc()` (`sketch:1055-1060`) is safe and should port.** It calls `getTotalLength()` — a layout
read — but **once, at init, outside any loop or scroll handler.** That does not violate D-37 or G-5,
which forbid reads *in the loop, the pointer handler and the IO callback*. Worth stating in the plan
so the gate is not misapplied to it.

**⚠ Module placement is a real planner decision.** UI-SPEC says *"one object at the top of the
module"* without saying which module. Both options are defensible: keeping it in `main.js` matches
the one-module convention and reuses the `REDUCED` import; a separate `site/method.js` keeps `main.js`
focused on the cosmic engine, which is what its header comment (`:1-9`) claims it is for. **If split,
it must be a second `<script type="module">` or an import from `main.js` — `index.html:320` ships
exactly one module tag and G-6 forbids new `<script src>`.** Importing from `main.js` is the safer
read of the gate.

---

### `site/assets/media/*` (asset, file I/O)

**Analog:** `site/assets/media/README.md` — the MEDIA-01 contract. **Read it before dropping assets.**

```css
/* site/styles.css:920-932 — the FILLED state. The placeholder chrome simply stops matching. */
.media-slot > img,
.media-slot > video { width: 100%; height: 100%; object-fit: cover; display: block; }
```

The placeholder switches off via `:not(:has(> img, > video))` — **`:has()`, not `:empty`**, because
whitespace text nodes would break `:empty`. Contract: drop the file in, add one line, no CSS change.

⚠ **The composite slot (D-29) knowingly breaks that contract** — a 9:16 video beside a blueprint
parts plate inside a 16:9 box needs new CSS. Accepted; **name it in the plan as a deliberate
MEDIA-01 deviation.** The surviving reason is aspect ratio, not background: the four renders are
1.13:1 / 1.68:1 / 1.26:1 / 1.48:1 and `object-fit: cover` at 16:9 would crop them.

**Ordering constraint (D-31 / Pitfall 9):** the re-encode lands **before or with** the composite
task, or the phase ships a home page autoplaying 6.66MB to a recruiter on cellular. Always pair with
a `poster`.

---

## Shared Patterns

### Outbound links
**Source:** `site/index.html:33-34` · **Apply to:** all 5 new outbound links (LinkedIn, GitHub, iGEM, GSD deck, GSD repo)
```html
<a class="nav__link" href="…" target="_blank" rel="noopener">LinkedIn&nbsp;&#8599;</a>
```
`rel="noopener"` blocks reverse tabnabbing (`index.html:29`) and is **the audit gate (G-7)** — the
only live security control this phase touches. Numeric entity `&#8599;`, `&nbsp;` before it.

### Reduced motion
**Source:** `star-engine.js:12` + `styles.css:1156` + the gate shape at `main.js:193-197`
**Apply to:** `initReveals()`, the METHOD sequence
```js
export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
One source of truth. Early-return, do the static thing, never observe, never loop. ⚠ The CSS block
flattens durations but does not reset armed values — JS owns the resolved end state.

### Section accent
**Source:** `styles.css:568-590` · **Apply to:** `#origin`, `#method`
One `--accent` entry per section id; labels, rules, blobs and numerals all derive from it free.
**Omitting the entry breaks the section silently and completely** (Pitfall 6, G-4).

### The "why" comment
**Source:** `index.html:75-87`, `:116-123`, `:145-153`; `styles.css:544-560`, `:158-163`; `main.js:1-9`, `:26-28`
**Apply to:** every new section and every new function
This codebase's strongest convention: each non-obvious decision carries a comment naming **what
breaks if you undo it**. Several are the only thing preventing a plausible "fix" from silently
killing a feature. New code must carry the same — and **stale ones must be updated, not left to
lie** (`styles.css:550-555` is now stale; `:13` will be stale once the new stops diverge from `PAL`).

### Element caching + no layout reads on hot paths
**Source:** `main.js:18`, `:26-32`
```js
/* The hero rect is cached on scroll/resize and read everywhere else. … never add
   another getBoundingClientRect to the pointer handler or the loop. */
```
Query the NodeList once at module scope. `initReveals()` extends this: no rect reads at all.

---

## No Analog Found

| File / construct | Role | Data Flow | Reason |
|---|---|---|---|
| `styles.css` reveal vocabulary block | motion | state-driven | **No reveal CSS exists — by design (D-34).** `styles.css:550-555` forbids the obvious form. The vocabulary (`draw` / `assemble` / `snap` / default) is new, but every *element* it targets ships already (`.section__rule`, `.exp__spine`, `.exp__dot`). Use RESEARCH § reveal-kind vocabulary + UI-SPEC C-2/C-3 for values. |
| `.method__*` component CSS | component | n/a | Sketch 001 CSS (`:282-435`) is the structural analog but is **explicitly not a colour/type source** (Sirio: *"not for details like font"*). Take geometry from the sketch; take colour from `styles.css:12-40` tokens and type from UI-SPEC T-3. ⚠ Sketch used `700` weight on `.track__kind` (`:317`) and free-form spacing (`26px`, `22px`, `10px`, `6px`) — **pull to 400 and normalise to the 4-multiple micro scale** per UI-SPEC T-1 / S-1. |
| Blueprint plate + composite slot CSS | component | n/a | No composite media exists on the page. `.media-slot` (`styles.css:900-932`) is the nearest shape but is single-asset `object-fit: cover`. Deliberate MEDIA-01 deviation (D-29). |

---

## Metadata

**Analog search scope:** `site/` (index.html, main.js, styles.css, star-engine.js), `.planning/sketches/001-method-section/`
**Files scanned:** 6 · **Excluded:** `_Archive/` (off-limits per CLAUDE.md), design snapshots read only via RESEARCH/UI-SPEC citations
**Pattern extraction date:** 2026-07-17
