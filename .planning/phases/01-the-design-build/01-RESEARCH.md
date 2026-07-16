# Phase 1: The Design Build - Research

**Researched:** 2026-07-16
**Domain:** Static site (GitHub Pages) · Canvas-2D animation engine · design-system port from Claude Design `.dc.html` snapshots
**Confidence:** HIGH (design + content findings are read directly from the source-of-truth files on disk; only the small set of web-platform claims is CITED rather than VERIFIED)

## Summary

This phase is **a port, not an invention**. Every visual decision is already made and sitting on disk in `.planning/phases/01-the-design-build/design/`. The single most important discovery of this research: **`site/star-engine.js` (shipped by plan 01-01) is byte-identical to the design's `star-engine.js`, and it already contains a complete, vanilla-JS `HeroStar` class** — a faithful port of the `Sirio Star.dc.html` logic with reduced-motion handling, DPR capping, off-screen culling, and hero-relative coordinates already built in. Plan 01-02 does **not** need to write the star; it needs to *supply the DOM the star expects, set the gold palette, and drive `frame(now)` from a rAF loop*. That reframes the hero work from "build an animation engine" to "wire up an engine that already exists."

The remaining work is mostly **translation**: the two `.dc.html` files are Claude Design artifacts, not deployable HTML. They carry `<x-dc>`/`<helmet>` wrappers, a `DCLogic` component class with `componentDidMount`/`props`/`renderVals`, a non-standard `style-hover="..."` attribute, and 100% inline styles. Porting means stripping the framework, converting `style-hover` to real CSS `:hover` rules, and lifting the inline styles into a token system in `site/styles.css` (which is exactly what FOUND-03 asks for). The V4 page already dynamically imports `./star-engine.js`, so the module seam is proven and matches what 01-01 shipped.

Three gaps are **not** solved by the design and need planner attention: (1) **there is no persistent nav anywhere in either design file** — the hero's top bar is `position:absolute` inside the hero and scrolls away, yet every section carries `scroll-margin-top:70px`, which strongly implies a ~70px fixed header that was never drawn; NAV-02 and HERO-04 both depend on it. (2) **HERO-02 (hero reacts to cursor/scroll) has no implementation in either file** — the star breathes on a timer only. (3) **The hero canvas paints an opaque background**, which will hide the V4 fixed deep-field starfield behind it and create a seam at the hero's bottom edge. Additionally, several pieces of the design's placeholder content are factually wrong against `profile.md` and must be replaced, and the design's second Publications row has **no support in profile.md at all** and must be deleted.

**Primary recommendation:** Treat `site/star-engine.js` as a finished dependency — do not rewrite it. Plan 01-02 = hero DOM (copied structurally from `Sirio Star.dc.html`) + `data-art`/`data-typer` hooks + `star.pal = GOLD` + rAF loop + deep-field port + a new fixed 70px nav. Plan 01-03 = section markup with curated real content from `profile.md` + the `:has()`-based swappable media-slot pattern. Everything ships to `site/`.

## User Constraints

> **There is no CONTEXT.md for this phase, by design** — the previous `01-CONTEXT.md` derived from the archived Fable Brief and was deleted (commit bdbc909). The binding constraints below are copied from `.planning/STATE.md` "Decisions" and `CLAUDE.md`, which are the sources of truth in its place. **Treat these with the same authority as locked decisions.**

### Locked Decisions (from STATE.md — do not contradict)

- **[Content]** The hero/Mission introduction is the **verbatim, user-approved** one-liner: *"Biotechnology MSc at DTU Copenhagen. I design and build the hardware, software and automation that free scientists from repetitive lab work."* — **do not reword.**
- **[Content]** Site email is `sirio.feltrin@gmail.com` (as in the approved design), **NOT** the account address `airsiriomax@gmail.com`. Confirmed by user 2026-07-16.
- **[Media]** **No stock or AI-generated imagery — ever.**
- **[Media]** Sirio has **no** project images/videos yet. Media slots ship as the design's labeled striped placeholders but must be **SWAPPABLE** (MEDIA-01): documented assets folder + drop-in + one-line reference. Full media fill is Phase 4 (MEDIA-02).
- **[Media]** Sirio asked whether to find images first so the page structure could adapt → **NO, and this is load-bearing for the ship-small strategy.** The media slot shape is already fixed by the approved design; page structure does **not** depend on what assets turn up. **Media hunting must never block the build.**
- **[Roadmap]** **STRATEGY = ship small, then expand.** "It is ok if for some sections I have only a couple of entries max." Tight beats exhaustive.
- **[Assets]** `_Archive/` (old `site/` mockup + Fable Brief) is git-ignored and **off-limits** — never a design, content, or context source.
- **[Repo]** Site source folder is `site/` — renamed from `app/` in commit 1b4b908. **All paths are `site/`.**
- **[Roadmap]** Theme is settled: "Sirio Star" hero (**gold variant**) + "Sirio V4 - Deep Field × Hyperlight" page. Local snapshots in `.planning/phases/01-the-design-build/design/` are the design source of truth.

### Claude's Discretion (research recommends; planner decides)

- Exact curation of which projects/experience/publications appear (constrained to what `profile.md` supports — see **Curated Content** below).
- The persistent-nav design (the design files do not contain one — see **Gap N-1**).
- How HERO-02 (cursor/scroll reactivity) is satisfied (see **Gap H-2**).
- Whether the hero canvas keeps its opaque background or lets the deep field show through (see **Pitfall 3**).

### Deferred Ideas (OUT OF SCOPE for Phase 1)

- Project detail/case-study pages and the "warp jump" transitions (`data-proj`, `openProj`, `applyTrans`, `drawWarp`) → **Phase 4** (PROJ-01/02/03) and Phase 2 (NAV-03). The V4 design file contains all of this — **do not port it in Phase 1.**
- About/Story, "How I Work With AI", Contact narrative → **Phase 2**.
- Mobile tuning and graceful degradation → **Phase 3** (RESP-01, PERF-01).
- Lazy-loading, SEO/Open Graph, accessibility pass → **Phase 5**.
- "Ask AI about me" concierge → **Phase 6**.
- Real media assets → **Phase 4** (MEDIA-02).

## Project Constraints (from CLAUDE.md)

| Directive | Implication for planning |
|-----------|--------------------------|
| **Sources of Truth table is binding** | Design = the 3 files in `design/`; Content = `../00_Profile/profile.md`; Scope = ROADMAP/REQUIREMENTS/PROJECT; Live source = `site/`. Anything else is **not authoritative**. |
| **`_Archive/` is off-limits** | Never read as planning context, design reference, or content source. It is git-ignored. |
| **Hosting: static on GitHub Pages** | No server-side runtime. Everything client-side. |
| **Tech stack: Canvas-2D "cosmic engine"** | `star-engine.js` + modern HTML/CSS/JS. **Supersedes the earlier WebGL/Three.js intent.** No bundler. |
| **Theme: dark only** | No light-mode work. |
| **Performance: smooth on mobile** | A janky "wow" backfires. (Formal mobile phase is 3; don't regress here.) |
| **Design ownership: Claude leads, Sirio approves** | Plans should surface visual decisions for approval, not bury them. |
| **Identity balance** | Engineering/design = primary visual identity; biotech = a *hint* (the glow); automation = the *motion*. **This should drive content curation.** |
| **GSD workflow enforcement** | No direct repo edits outside a GSD workflow. |
| **Before treating any pre-existing document as current, check it against git history** | Applies directly to the stale 01-02/01-03 plans. |

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| **FOUND-03** | Dark-themed design-token system (colors, type scale, spacing) applied site-wide | Token values are fully derivable from the design files — see **Design Tokens** table. All four star-spectrum accents map to `PAL` stops in `star-engine.js`. |
| **FOUND-04** | Multi-page architecture with persistent navigation + a single immersive scroll home page | **Partially blocked — see Gap N-1** (no nav exists in the design) and **Open Question 1** (what "multi-page" means: the V4 design answers it with fixed overlays, not separate `.html` files). |
| **HERO-01** | Landing hero presents a WebGL/3D animated "wow" centerpiece on load | **Requirement text is stale.** CLAUDE.md declares Canvas-2D supersedes WebGL/Three.js. Satisfied by `HeroStar` (already on disk). See **Drift D-1**. |
| **HERO-02** | Hero motion reacts to cursor and/or scroll | **GAP — not implemented in any design file.** See **Gap H-2**. |
| **HERO-03** | Hero states the identity in one line | Design has "Hello, I am" + `Sırıo` wordmark + typewriter; the verbatim one-liner lives in the **Mission** section. Both needed. Covers pending todo `2026-06-17-hero-typewriter-rotating-role-animation`. |
| **HERO-04** | Hero exposes primary actions: View CV and LinkedIn | URLs verified in design **and** `profile.md` (they agree). Depends on Gap N-1 for persistence. |
| **NAV-02** | Smooth scrolling with section anchors and a persistent/access nav | `html{scroll-behavior:smooth}` + `scroll-margin-top:70px` + `#top/#index/#work/#experience/#publications/#contact` anchors all exist. **Persistent nav does not — Gap N-1.** |
| **LINK-01** | CV is viewable and/or downloadable (PDF and/or Canva link) | `https://canva.link/5a5yj5bdg78axhv` — appears in both design files **and** `profile.md` "CV Source". Agreement = high confidence. |
| **LINK-02** | LinkedIn link present and correct | `https://www.linkedin.com/in/sirio-vittorio-feltrin/` — agrees across design and `profile.md` Contact. |
| **MEDIA-01** | Media slots swappable: documented folder, drop-in + one-line reference, no re-engineering | Design supplies the slot *shape*; the *swappability mechanism* is new work. See **Media Slot Pattern**. |

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Star animation, breathing, orbits, typewriter | **Browser / Client** (Canvas 2D + rAF) | — | No server exists; the engine is a client ES module already deployed. |
| Design tokens, layout, glass cards, section spectrum | **Browser / Client** (CSS custom properties) | — | Pure CSS; tokens on `:root` per FOUND-03. |
| Deep-field parallax starfield | **Browser / Client** (fixed canvas + `scrollY`) | — | Reads `window.scrollY`; no layout dependency. |
| Content (projects, experience, publications) | **CDN / Static** (hand-authored HTML) | — | No CMS (explicitly out of scope). Content is curated into `site/index.html`. |
| Media assets | **CDN / Static** (`site/assets/media/`) | Browser (`<img>`/`<video>`) | Static files served by Pages; swap = drop file + one-line ref. |
| CV / LinkedIn | **External** (Canva, LinkedIn) | — | Plain outbound links; nothing to host. |
| Build & deploy | **Build / CI** (GitHub Actions) | CDN (Pages) | **Already shipped and proven by 01-01 — do not touch.** |
| Auth / API / data persistence | **— none —** | — | Static site. No backend tier exists in this architecture. |

**Tier sanity note for the planner:** every task in this phase lands in *Browser/Client* or *CDN/Static*. Any task that implies a server, an API route, or a build step is misassigned — the site has no `package.json` and no bundler, and that is correct.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| **`site/star-engine.js`** (first-party) | in-repo, shipped by 01-01 | `PAL`, `tintAt`, `lerp3`, `rgba`, `clamp`, `REDUCED`, `DPR`, **`HeroStar`** | It *is* the approved design's engine. Byte-identical to the design snapshot (`diff` = no output). **[VERIFIED: diff of design/star-engine.js vs site/star-engine.js]** |
| **Vanilla ES modules** | native | `main.js` imports the engine | Module graph already proven over Pages by 01-01. `.nojekyll` present. **[VERIFIED: site/main.js + 01-01-SUMMARY.md]** |
| **Canvas 2D** | native | starfields, rings, glow | Mandated by CLAUDE.md; supersedes WebGL. |
| **CSS Custom Properties** | native | design tokens (FOUND-03) + the star's `--b`/`--glow`/`--core` driver channel | The engine *already writes* CSS vars every frame; tokens are the natural fit. **[VERIFIED: star-engine.js:168-177]** |
| **Google Fonts** (Space Grotesk, Hanken Grotesk, Space Mono) | CDN | the design's font trio | Already correctly loaded in `site/index.html` with all three families + weights. **[VERIFIED: site/index.html]** |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| — | — | — | **None.** This phase installs nothing. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-rolled typewriter (already in engine) | Typed.js | The pending todo suggested it; **unnecessary** — `HeroStar._startType`/`_tick` already implements it *with* reduced-motion handling and per-term gradients. Adding a dep would be a regression. |
| Vanilla CSS tokens | Tailwind / Sass | No build step exists; adding one contradicts the static/no-bundler constraint for zero gain. |
| `HeroStar` | Three.js / WebGL | Explicitly superseded by CLAUDE.md. |
| Manual rAF | GSAP / Framer Motion | The engine owns its own loop; a motion lib would duplicate it. (Phase 2 MOTION-01 may revisit; the V4 `updateReveals` is already a working vanilla implementation.) |

**Installation:**
```bash
# Nothing to install. No package.json, no bundler, no dependencies.
# Local preview only:
python -m http.server -d site 8080
```

**Version verification:** N/A — no external packages are added by this phase. Node v24.14.1 and npm 11.11.0 are present but unused by the site itself.

## Package Legitimacy Audit

**This phase installs no external packages.** No `package.json` exists, no bundler is used, and the recommended stack is entirely first-party (`site/star-engine.js`) plus native web platform APIs.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| *(none)* | — | — | — | — | — | — |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

**Supply-chain surface that *does* exist (for the planner's awareness):**
- **Google Fonts CDN** (`fonts.googleapis.com` / `fonts.gstatic.com`) — third-party runtime dependency, already shipped by 01-01. Noted in **Security Domain**.
- **GitHub Actions** — `actions/checkout@v4`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`. All first-party `actions/*`, already pinned and least-privilege by 01-01. **Do not modify — out of scope.** **[VERIFIED: .github/workflows/deploy.yml]**

## The GOLD Star: Exact Values

All values below are **[VERIFIED: `design/Sirio Star.dc.html`]** — read directly from the approved snapshot.

### Palette (the "gold variant")

`Sirio Star.dc.html` exposes `starColor` as a Claude Design **prop** with three options; the file's `default` is `"Blue-white"`, and **Gold is the variant Sirio wants**. The prop system does not exist in vanilla HTML, so **gold must be hard-coded**:

```js
// Source: design/Sirio Star.dc.html:204-211 (palette())
const map = {
  'Blue-white': { glow: [150, 196, 255], core: [255, 251, 242] },
  'Gold':       { glow: [255, 196, 110], core: [255, 236, 200] },   // ← THIS ONE
  'Violet':     { glow: [197, 160, 255], core: [244, 238, 255] }
};
```

| Token | Gold value | Used for |
|-------|-----------|----------|
| `glow` | `255, 196, 110` | halo, flares, ring stroke, radial bg wash, planet box-shadow, expanding rings |
| `core` | `255, 236, 200` | the star's core, lerped from `[5,5,11]` (near-black) → `core` by `b` |

> **Critical:** these gold values are **distinct from** the `PAL` gold stop in `star-engine.js` (`[244, 182, 89]` at position `0.18`, the Antares/Work accent). They are two different golds and must not be conflated. `--gold-glow: 255,196,110` is the *star*; `--star-antares: 244,182,89` is the *Work section*.

### Breathing cycle

```js
// Source: design/Sirio Star.dc.html:203, 228-230
period() { return ({ Slow: 20, Medium: 13 })[this.props.cycleSpeed] || 18; }   // prop default = "Slow" → 20s
const T = this.period() * 1000;
let b = (Math.sin((now - this.t0) / T * Math.PI * 2 - Math.PI / 2) + 1) / 2;   // 0→1→0 sine, starts at 0
b = b * b * (3 - 2 * b);                                                        // smoothstep
```

- **Period: 20 s** (`cycleSpeed` prop default `"Slow"`). The `|| 18` fallback only fires if the prop is absent.
- **⚠ The engine's default differs:** `HeroStar` uses `opts.periodSec || 15` → **15 s**. To reproduce the approved hero, pass `periodSec: 20`. **[VERIFIED: star-engine.js:42]**
- `-Math.PI/2` phase offset means `b` starts at **0** (dark) and swells — the star ignites shortly after load rather than starting lit.

### The `b`-driven CSS variable channel

Every frame the loop writes these onto the root element; the DOM star's opacity/blur/scale are pure CSS consumers. **This is the whole star-rendering contract:**

| CSS var | Formula | Range |
|---------|---------|-------|
| `--b` | `b` | 0 → 1 |
| `--glow` | `"255,196,110"` (gold, bare triplet) | constant |
| `--core` | `rgb(lerp3([5,5,11], [255,236,200], b))` | near-black → warm cream |
| `--core-blur` | `5 + 58*b` px | 5 → 63 px |
| `--halo-op` | `0.04 + 0.34*b` | 0.04 → 0.38 |
| `--glass-op` | `0.04 + 0.10*b` | 0.04 → 0.14 |
| `--flare-op` | `0.42*b` | 0 → 0.42 |
| `--flare-scale` | `0.28 + 0.72*b` | 0.28 → 1.0 |
| `--ring-op` | `0.5 + 0.4*b` | 0.5 → 0.9 |
| `--dot-op` | `0.4 + 0.5*b` | 0.4 → 0.9 — **⚠ set by the .dc.html but NOT by `HeroStar`** (star-engine.js omits it). Appears unused by the markup; harmless, but note the divergence. |

### Ignition threshold (drives the i-dot orbits)

```js
// Source: design/Sirio Star.dc.html:319-329
if (b < 0.30) this.armed = true;               // re-arm on the dark half of the cycle
if (this.armed && b >= 0.45) {                  // ignite on the way up
  this.armed = false; this.orbiting = true; this.orbitStart = now;
  this.planets[nearIdx]     = mk(nearIdx,     0.34, -1,  8200, true);   // tilted plane, 8.2 s
  this.planets[1 - nearIdx] = mk(1 - nearIdx, 1.0,   1, 12500, false);  // flat screen-plane ring, 12.5 s
}
```

- **Arm at `b < 0.30`, fire at `b >= 0.45`** — hysteresis, so exactly one orbit launches per breath.
- The **near** i-dot gets a **tilted, eccentric** orbit (`k=0.34`, reversed, 8.2 s) that dips **in front of and behind** the star (`depth = sin(th)*0.5+0.5`; `z = depth > 0.5 ? 3 : 1`; radius `0.80–1.22×`, opacity `0.55–1.0`).
- The **far** i-dot gets a **flat circular** orbit (`k=1.0`, 12.5 s, constant size).
- Both use `easeInOutQuad` across **exactly one revolution** (`th: 0 → ±2π`) so each planet **departs from and parks back on its home dot**.
- Orbit duration (8.2 s / 12.5 s) is *shorter* than the 20 s breath — so the dots rest at home between ignitions.

### GOLD star vs. the V4 mockup star it replaces

| Aspect | `Sirio Star.dc.html` (the real hero) | `Sirio V4` hero section (the mockup) |
|--------|--------------------------------------|--------------------------------------|
| Wordmark | `S<span>ı</span>r<span>ı</span><span style="color:transparent">o</span>` — dotless i's, **transparent "o"** | Plain text `Sirio` |
| Star | Full DOM star layer (halo, 3 counter-rotating flares, glass disc, dashed ring, core) + canvas | **None** |
| Canvas | `position:absolute; inset:0` in the hero | **None** (only the page-level fixed `[data-deep]`) |
| Planets | 2 `[data-planet]` divs with orbital mechanics | **None** |
| Typewriter | 8 rotating terms w/ per-term gradients | **None** |
| Marker | — | Literal text: `[ STATIC MOCKUP — THE LIVING SIRIO STAR HERO DROPS IN HERE UNCHANGED ]` (V4:43) |
| Nav bar | Absolute top bar, CV + LinkedIn | Same absolute top bar (identical markup) |
| Scroll hint | **None** | `[data-scrollhint]` → `#index`, animated dot |

**Net:** the V4 hero is an empty box with a label saying "drop the real hero in here." Replacing it means deleting V4:41-43 (`Hello, I am` / `<h1>Sirio</h1>` / the mockup marker) and substituting the Star file's canvas + `[data-planet]` ×2 + `[data-star]` layer + dotless-i `<h1>` + typewriter `<p>` — **while keeping** V4's top bar and `[data-scrollhint]`.

## What `site/star-engine.js` Already Provides vs. What the Hero Still Needs

**`diff design/star-engine.js site/star-engine.js` → identical.** 01-01 copied it verbatim; 296 lines; exports `PAL, REDUCED, DPR, lerp3, rgba, tintAt, clamp, HeroStar`. **[VERIFIED: bash diff, exit 0]**

### ✅ Already provided by `HeroStar` — do NOT rewrite

| Capability | Where | Note |
|-----------|-------|------|
| Breathing `b` + smoothstep | `_draw` :160-163 | |
| Full CSS-var driver channel | `_draw` :168-177 | (minus `--dot-op`) |
| Star layer pinned to the "o" | `_draw` :179-183 | sets `fontSize`/`left`/`top` |
| Optical-centre measurement via font metrics | `_measure` :120-148 | **hero-relative** (`r.left - hr.left`) — better than the .dc.html's viewport-relative version |
| Canvas starfield (130 stars, twinkle) | `_draw` :194-204 | |
| 3 rotating dashed rings | `_draw` :206-219 | |
| Expanding rings (spawn 2.1 s, life 7.6 s) | `_draw` :221-236 | |
| i-dot orbital mechanics (arm 0.30 / fire 0.45, tilt, z-order, depth) | `_draw` :239-294 | |
| Typewriter: 8 terms + per-term gradients | `_startType`/`_tick` :70-117 | |
| **`prefers-reduced-motion`** | :40, 86-91, 162, 221, 248 | `b` pinned to `0.72`; no ring spawn; no orbits; typewriter renders term[0] statically |
| **DPR capping at 2** | :13, 154-157 | `Math.min(devicePixelRatio, 2)` |
| **Off-screen culling** | `frame` :64-66 | `if (hr.bottom < -80) return;` |
| Canvas resize (no listener needed) | `_draw` :154-155 | compares dims each frame |
| `destroy()` | :60 | clears the typewriter timeout |

### ❌ Still needed — the actual 01-02 work

| # | Gap | Detail |
|---|-----|--------|
| **E-1** | **Gold palette is not applied** | `HeroStar` hard-codes `this.pal = { glow: [150,196,255], core: [255,251,242] }` (**blue-white**) at :43, and the constructor **accepts no palette option** (`opts` reads only `reduced` and `periodSec`). → Either set `star.pal = { glow:[255,196,110], core:[255,236,200] }` after construction (**recommended — zero engine edit**), or add `opts.pal`. **Without this the hero ships blue-white, not gold.** |
| **E-2** | **`periodSec` default is 15 s, approved is 20 s** | Pass `new HeroStar(el, { periodSec: 20 })`. |
| **E-3** | **No rAF loop** | `HeroStar` exposes `frame(now)` but **never calls it**. The caller owns the loop. `site/main.js` currently only logs a boot marker. |
| **E-4** | **Hero DOM does not exist** | Engine queries, inside the hero element: `canvas`, `[data-star]`, `[data-planet="near"]`, `[data-planet="far"]`, `h1 > span` (×2 with text `ı`, ×1 with text `o`), `[data-art]`, `[data-typer]`. `site/index.html` has only `<main class="hero"><h1>Sirio</h1></main>`. |
| **E-5** | **`[data-art]` / `[data-typer]` hooks are in NEITHER design file** | The `.dc.html` addresses the typewriter spans **positionally** (`wrap.children[0]`, `wrap.children[1]`, :130-131). The engine requires **explicit attributes** (:83-84). The ported markup **must add `data-art` to the article-prefix span and `data-typer` to the gradient span**, or the typewriter silently no-ops (`if (!this._typeEl) return;`). |
| **E-6** | **No cursor/scroll reactivity** | See **Gap H-2** (HERO-02). |
| **E-7** | **Deep-field starfield is not in the engine** | It lives in the V4 DC script (`_boot` layer setup + `drawDeep`). Must be ported into `main.js`. Uses `eng.tintAt`/`eng.rgba` — which the engine *does* export. |
| **E-8** | **`document.fonts.ready` is not awaited** | The `.dc.html` calls `document.fonts.ready.then(() => this.measure())` (:102); `HeroStar` does not. Mitigated because `_measure` re-runs every frame and self-corrects — but the first frames measure fallback-font metrics, so the star can visibly jump once the webfont lands. Cheap fix: `document.fonts.ready.then(...)` before starting the loop, or accept the settle. |

### Integration seam: star ↔ wordmark

This is the design's cleverest mechanic and the easiest thing to break.

```html
<!-- Source: design/Sirio Star.dc.html:59 — the wordmark -->
<h1>S<span>&#305;</span>r<span>&#305;</span><span style="color:transparent; display:inline-block;">o</span></h1>
```

1. **`&#305;` is U+0131 LATIN SMALL LETTER DOTLESS I** — not `i`. The engine finds the orbs' home positions with `s.textContent.trim() === 'ı'` (:48). **Typing a normal `i` breaks the orbits silently** (`iSpans.length !== 2` → the whole planet block is skipped).
2. **The "o" is `color:transparent`** — the *star itself is the "o"*. The engine finds it with `s.textContent.trim() === 'o'` (:124). It must remain a real text node so it occupies correct metrics; `display:inline-block` preserves its box.
3. **Optical centre, not geometric centre.** A lowercase "o" sits low in its line box, so centring the star on `rect.height/2` looks wrong. The engine derives the true ink centre from font metrics:
   ```js
   // Source: star-engine.js:133-143
   const m = this._mctx.measureText('o');
   const L = parseFloat(cs.lineHeight) || fs * 0.98;
   const baseline   = (L - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
   const inkCenter  = (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
   centerYfrac = (baseline - inkCenter) / L;     // fallback 0.61
   ink = m.actualBoundingBoxAscent * 0.62;       // → oSize, the expanding rings' inner radius
   ```
   Fallback `centerYfrac = 0.61` if `fontBoundingBox*` is unavailable.
4. **The star layer scales with the wordmark.** `starLayer.style.fontSize = h1's computed fontSize` — every star sub-element is sized in `em`, so the whole star scales with `clamp(58px, 12.5vw, 184px)` automatically. **Do not hard-code px on the star layer.**
5. **The orbs' home is offset from the i's box:** `x = r.left + r.width*0.5 + r.width*0.085`, `y = r.top + r.height*0.30`, radius `max(r.height*0.060, 6)` (:242). The `0.085` nudge accounts for the italic-free glyph's optical centre.
6. **Coordinate space:** `HeroStar` computes everything **relative to the hero rect** (`- hr.left` / `- hr.top`). So `[data-star]` and both `[data-planet]` must be `position:absolute` inside a `position:relative` hero, and the hero's canvas must be `inset:0` **within the hero** — not viewport-fixed.

## Architecture Patterns

### System Architecture Diagram

```
                    ┌─────────────────────────────────────────────┐
  git push ────────►│  GitHub Actions (deploy.yml)  [SHIPPED 01-01]│
                    │  checkout → configure-pages → upload ./site  │
                    └──────────────────┬──────────────────────────┘
                                       │ artifact = site/
                                       ▼
                    ┌─────────────────────────────────────────────┐
                    │  GitHub Pages CDN                            │
                    │  sirsirio.github.io/MyPortfolio/             │
                    └──────────────────┬──────────────────────────┘
                                       │ HTTP
                                       ▼
  ┌────────────────────────────── BROWSER ──────────────────────────────┐
  │                                                                      │
  │  index.html ──► styles.css  (design tokens on :root ── FOUND-03)     │
  │      │              ▲                                                 │
  │      │              │ writes --b/--glow/--core each frame             │
  │      ▼              │                                                 │
  │  main.js (entry) ───┴──────────────┐                                  │
  │      │                             │                                  │
  │      │ import                      │ owns the single rAF loop         │
  │      ▼                             ▼                                  │
  │  star-engine.js            ┌──── loop(now) ────┐                      │
  │   ├─ PAL / tintAt ────────►│                    │                     │
  │   ├─ REDUCED / DPR         │  drawDeep(now) ────┼──► [data-deep]      │
  │   ├─ lerp3/rgba/clamp      │   (3 parallax      │    canvas, FIXED,   │
  │   └─ HeroStar ─────────────┤    layers, scrollY)│    z-0, viewport    │
  │        │                   │                    │                     │
  │        │                   │  star.frame(now) ──┼──► hero <canvas>    │
  │        │                   └────────────────────┘    ABSOLUTE, in     │
  │        │                                             the hero          │
  │        ├─ reads  : h1>span[ı,ı,o] → optical centre (getBoundingClientRect)
  │        ├─ writes : [data-star] left/top/fontSize
  │        ├─ writes : [data-planet=near|far] x/y/r/z/opacity
  │        ├─ writes : --b --glow --core --halo-op … on the hero el
  │        └─ writes : [data-typer] textContent + gradient   (setTimeout, not rAF)
  │                                                                       │
  │  DECISION POINTS                                                      │
  │   • REDUCED ? b:=0.72, no ring spawn, no orbits, static typer         │
  │   • hero.bottom < -80 ? skip hero draw entirely                       │
  │   • b<0.30 → arm ;  armed && b>=0.45 → fire ONE orbit per breath      │
  │   • media slot :has(> img,video) ? render asset : striped placeholder │
  │                                                                       │
  │  EXTERNAL (outbound only, no data returns)                            │
  │   ├─► fonts.googleapis.com / fonts.gstatic.com  (font trio)           │
  │   ├─► canva.link/5a5yj5bdg78axhv        (CV      — LINK-01)           │
  │   ├─► linkedin.com/in/sirio-vittorio-feltrin/  (LINK-02)              │
  │   ├─► 2024.igem.wiki/DTU-Denmark/       (EndoSense record)            │
  │   ├─► doi.org/10.1038/s44318-025-00567-1 (EMBO)                       │
  │   └─► mailto:sirio.feltrin@gmail.com                                  │
  └──────────────────────────────────────────────────────────────────────┘

  NOT IN THIS PHASE: [data-proj] overlays · warp jump · openProj/applyTrans/drawWarp
                     (Phase 4 / Phase 2) — present in the V4 file; do not port.
```

### Recommended Project Structure

```
site/                        # THE source root (never "app/")
├── index.html               # 01-02: nav + hero DOM · 01-03: sections
├── styles.css               # 01-02: :root tokens + hero · 01-03: sections
├── main.js                  # 01-02: rAF loop, HeroStar wiring, deep field
├── star-engine.js           # SHIPPED — treat as a finished dependency
├── assets/
│   └── media/               # 01-03: MEDIA-01 documented drop-in folder
│       └── README.md        # names the convention + the one-line ref
├── .nojekyll                # SHIPPED
└── README.md                # SHIPPED — has a stale `serve app` bug (see D-3)
```

### Pattern 1: One rAF loop, many consumers

**What:** A single `requestAnimationFrame` loop in `main.js` drives both the deep field and `HeroStar.frame(now)`.
**When to use:** Always here — the V4 design already works this way (`this.loop = (t) => { this.raf = rAF(this.loop); this.frame(t); }`, V4:345).
**Why:** two independent loops double the layout-read cost and can tear against each other.

```js
// Source: composed from design/Sirio V4:326-357 + star-engine.js:37-67
import { HeroStar, REDUCED, DPR, tintAt, rgba } from './star-engine.js';

const heroEl = document.querySelector('[data-hero]');
const star = new HeroStar(heroEl, { periodSec: 20 });   // E-2: approved period
star.pal = { glow: [255, 196, 110], core: [255, 236, 200] };  // E-1: GOLD

function loop(now) {
  raf = requestAnimationFrame(loop);
  drawDeep(now);        // fixed [data-deep] canvas, parallax by scrollY
  star.frame(now);      // self-culls when the hero scrolls off
}

if (REDUCED) { drawDeep(performance.now()); star.frame(performance.now()); }  // paint once, no loop
else raf = requestAnimationFrame(loop);
```

> **Note the reduced-motion shape:** V4 does exactly this (`if (this.reduced) { this.frame(performance.now()); return; }`, V4:344) — render **one** frame and never loop, plus re-render on resize (V4:342). Combined with `HeroStar`'s internal `b = 0.72`, the result is a **static, fully-lit gold star** rather than a blank canvas. That matches MDN's guidance that reduced-motion means *replace* motion, not delete the visual. **[CITED: developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion]**

### Pattern 2: Deep-field parallax starfield

**What:** Three fixed canvas layers scrolling at different rates, tinted by `tintAt(star.hue)` so the field carries the page's star spectrum.
**When to use:** The page background, behind everything (`position:fixed; inset:0; z-index:0; pointer-events:none`).

```js
// Source: design/Sirio V4 - Deep Field x Hyperlight.dc.html:331-336, 360-379
const mk = (n, rM, rX) => Array.from({ length: n }, () => ({
  x: Math.random(), y: Math.random() * 3, r: rM + Math.random() * (rX - rM),
  ph: Math.random() * 6.28, hue: Math.random()
}));
const layers = [
  { f: 0.14, a: 0.26, stars: mk(280, 0.3, 0.9) },   // far   → slowest
  { f: 0.36, a: 0.40, stars: mk(140, 0.5, 1.3) },
  { f: 0.66, a: 0.58, stars: mk(64,  0.8, 1.9) }    // near  → fastest
];

function drawDeep(now) {
  const vw = innerWidth, vh = innerHeight;
  const W = Math.round(vw * DPR), H = Math.round(vh * DPR);
  if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }   // resize only on change
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, vw, vh);                        // NOTE: clear, not fill — page gradient shows through
  const rel = scrollY, span = vh * 3;
  for (const L of layers) for (const s of L.stars) {
    let sy = (s.y * vh - rel * L.f) % span;
    if (sy < 0) sy += span;
    if (sy > vh + 4) continue;                        // cull off-screen
    const tw = 0.35 + 0.65 * Math.abs(Math.sin(now * 0.0009 + s.ph));
    ctx.beginPath(); ctx.arc(s.x * vw, sy, s.r, 0, 6.2832);
    ctx.fillStyle = rgba(tintAt(s.hue), (L.a * tw).toFixed(3));
    ctx.fill();
  }
}
```

Total 484 stars at density 1. The `% span` wrap with `span = vh*3` makes the field infinite. `clearRect` (not `fillRect`) is what lets the root's vertical gradient show through — **contrast this with the hero canvas, which fills opaquely (see Pitfall 3).**

### Pattern 3: The star-spectrum section system

`PAL` in the engine defines the page's whole colour story, and each section's accent is a `PAL` stop. **[VERIFIED: star-engine.js:4-10 cross-referenced against V4 section styles]**

| # | Section | `id` | Sector name | Accent RGB | `PAL` stop |
|---|---------|------|-------------|-----------|-----------|
| — | Hero | `#top` | — | gold star `255,196,110` | *(star only)* |
| — | Mission | `#index` | DEEP FIELD — OBSERVATION LOG | `150,196,255` | `0.00` |
| 01 | Selected Work | `#work` | ANTARES SECTOR | `244,182,89` | `0.18` |
| 02 | Experience | `#experience` | ALDEBARAN SECTOR | `255,122,89` | `0.46` |
| 03 | Publications | `#publications` | VEGA SECTOR | `171,140,255` | `0.72` |
| 04 | Contact | `#contact` | TRANSMISSION · SIRIUS SECTOR | `150,196,255` | `1.00` |

Each section repeats one structure: a giant outlined numeral (`data-para="-0.07"`, `-webkit-text-stroke:1px rgba(<accent>,0.2x)`, `clamp(170px,27vw,400px)`), a parallax radial blob (`data-para="0.13"`), a mono sector label + gradient rule, an `<h2>`, then content. **The accent is the only thing that changes** — a strong argument for one `.section` class + a `--accent` custom property per section.

Root gradient (V4:26): `linear-gradient(180deg,#04050c 0%,#0c0a09 24%,#110b0a 46%,#100a14 68%,#080a16 86%,#05060d 100%)` — a near-black wash that tracks the same blue→gold→red→violet→blue journey.

### Design Tokens (FOUND-03)

Derived from the design files. Bare `R,G,B` triplets so they compose inside `rgba(var(--x), a)`.

```css
:root {
  /* star spectrum — PAL stops */
  --star-sirius:    150,196,255;   --star-antares:   244,182,89;
  --star-aldebaran: 255,122,89;    --star-vega:      171,140,255;
  /* the GOLD hero star (distinct from --star-antares!) */
  --gold-glow: 255,196,110;        --gold-core: 255,236,200;
  /* surfaces & text */
  --bg-0: #04050c;                 --text-hi: #eef2ff;
  --text-body: rgba(228,232,244,0.76);
  --glass-bg: rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.1);
  /* type */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Hanken Grotesk', sans-serif;
  --font-mono: 'Space Mono', monospace;
}
html { scroll-behavior: smooth; }
```

Recurring scale values worth tokenising: section padding `clamp(80px,12vh,150px) clamp(20px,6vw,84px)`, content max-width `1180px`, `scroll-margin-top:70px`, `h1 clamp(58px,12.5vw,184px)`, `h2 clamp(40px,6vw,86px)`, `h3 clamp(36px,4.4vw,60px)`, mono label `11px/0.24em`, letter-spacing `-0.035em` on display headings.

### Anti-Patterns to Avoid

- **Rewriting `HeroStar`.** It is the approved design, already ported to vanilla, already on disk, already deployed. Touch it only to add an optional `opts.pal` — and even that is avoidable via `star.pal = …`.
- **Shipping `style-hover="…"`.** It is a Claude Design authoring attribute, **not real HTML**. Browsers ignore it → every hover state silently dies. Must become CSS `:hover`.
- **Shipping `<x-dc>`, `<helmet>`, `data-screen-label`, `data-props`, `DCLogic`, `componentDidMount`, `renderVals()`, `<script type="text/x-dc">`, or `./support.js`.** All are Claude Design framework scaffolding.
- **Keeping inline styles.** FOUND-03 explicitly asks for a token system; a 1:1 inline-style copy passes visual review and fails the requirement.
- **Porting the warp/project-overlay machinery.** ~200 lines of V4 (`openProj`, `closeProj`, `startBurst`, `applyTrans`, `drawWarp`, `[data-proj]`, `[data-warpov]`) belong to Phases 2/4.
- **Using `i` instead of `ı` (U+0131)** in the wordmark. Silent failure of the orbit mechanic.
- **Two rAF loops** (one for the hero, one for the deep field).
- **Hard-coding px on `[data-star]`.** It must inherit the h1's computed font-size to scale.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Breathing star, orbits, rings, starfield | A new canvas animation | **`HeroStar` in `site/star-engine.js`** | Already the approved design, verbatim; ~260 lines of tuned constants you would get wrong. |
| Typewriter / rotating roles | Typed.js, or a fresh loop | **`HeroStar._startType`/`_tick`** | Already implements the 8 terms, per-term gradients, the `a`/`an` article logic, *and* reduced-motion static fallback. Closes pending todo `2026-06-17`. |
| "o" optical centring | `rect.height / 2` | **`HeroStar._measure`** font-metric math | Geometric centring visibly misplaces the star; the engine already does baseline/ink-centre maths with a `0.61` fallback. |
| Palette interpolation for the spectrum | A custom lerp/gradient | **`tintAt(y)` + `PAL` + `lerp3` + `rgba`** | Exported and used by the V4 deep field already. |
| Reduced-motion handling | A bespoke `matchMedia` branch in the hero | **`REDUCED` export + engine's internal branches** | Engine already pins `b=0.72`, kills spawns/orbits, and statically renders the typer. |
| DPR/canvas resize | A `resize` listener + manual scaling | **Engine's per-frame dim compare** + `DPR` export | `HeroStar._draw` resizes only when dims actually change; no listener needed. |
| Placeholder ↔ asset swapping | A JS media loader / config array | **CSS `:has()`** on the slot | Zero JS; filling a slot = pasting one element. See **Media Slot Pattern**. |
| Smooth anchor scrolling | JS scroll animation | **`html { scroll-behavior: smooth }`** + `scroll-margin-top` | Already in the design (V4:17); native, honours reduced-motion via the design's own media block (V4:23). |
| Build/deploy | Anything | **The shipped `deploy.yml`** | Proven green; push-to-deploy works. Out of scope. |

**Key insight:** the highest-value move in this phase is **restraint**. 01-01 already copied a complete engine into `site/`, and the design files already encode every constant. The failure mode here is not "too little code" — it is re-implementing a solved thing slightly differently and drifting from the approved design.

## Curated Content — What `profile.md` Actually Supports

**⚠ The design's placeholder content is factually wrong in most rows.** `profile.md` is the *only* content source. Below, every recommendation is traced to a line in `profile.md`, and every design placeholder that must die is named.

### ❌ Design placeholders that are WRONG and must be replaced

| Design says | Reality per `profile.md` | Verdict |
|-------------|--------------------------|---------|
| `"Descriptio od endosese"` (V4:87) | — | Obvious lorem. **Replace.** |
| `"Hardware Lead — iGEM"` (V4:127) | **"iGEM Wet Lab Lead — EndoSense Biosensor"** — a *preferred phrasing* explicitly mandated (profile.md:16) | **Wrong role title. Replace.** |
| `"Research Assistant / 2022 — 2024 / Lab automation"` (V4:133-134) | No such role. Closest: **Research Intern, UniTrento CIBIO, Feb–Sep 2023** (not 2022–2024, not lab automation — it was MD simulation + Western blot) | **Fabricated. Replace or drop.** |
| `"Cell-free diagnostics — co-author / EMBO · 2025"` (V4:152-153) | Real title: **"Mapping cryptic phosphorylation sites in the human proteome"**, *The EMBO Journal* 2025;44:6704–6731 | **Wrong title AND wrong role label.** profile.md:28 mandates **"Contributing author"** and *"do not list position number"*. **Replace.** |
| `"Part collection contribution — iGEM Registry · 2024"` (V4:156-157) | **Nothing in profile.md supports this.** Only ONE publication exists. | **DELETE — do not invent a second publication.** |
| `"Liquid Handler … PLATE 002 · 2025"` (V4:97-98) | MSc thesis; MSc runs Jan 2024 – Sep 2026, thesis deadline Aug 2026 | Description is accurate; **year `2025` is wrong → `2026`**. |
| `"MSc Biotechnology / 2024 — 2026 / DTU Copenhagen"` (V4:121-122) | Matches profile.md:52 | ✅ **Keep.** |
| `"Gold medal"` (V4:128) | Awards table: *"iGEM Gold Medal — DTU Denmark team, iGEM 2024 Jamboree"* (profile.md:339) | ✅ **Keep** — but see **Open Question 3** (profile has an internal contradiction). |

### ✅ Recommended curation — "most important first, tight"

**Selected Work (`#work`) — recommend 3 plates** (design ships 2 articles; 3 keeps the identity triangle and matches CONT-02's future "3–5"):

| Plate | Title | Year | Source | Why it earns the slot |
|-------|-------|------|--------|----------------------|
| **001** | **Portable Precision Liquid Dispenser** | 2026 | profile.md:57 (MSc Thesis) | The flagship. *Self-designed*: Fusion360 + Arduino + electronics/motors + 3D printing + a custom AI-assisted testing app with DoE. Hits **design + hardware + automation + AI** in one artefact — the exact identity CLAUDE.md wants foregrounded. |
| **002** | **Automated Gel Electrophoresis (DALSA / Opentrons OT-2)** | 2025 | profile.md:87-103 | Grade 12/12. ~785-line OT-2 Python protocol, 5 Fusion360 3D-printed components, full Double Diamond with user interviews. **144 samples/run, ~10 min/gel** — the most quantifiable automation win in the profile. |
| **003** | **EndoSense — Cell-Free Biosensor** | 2024 | profile.md:193-204 | The **biotech hint**. iGEM Gold. Crucially it carries a **public, verifiable link** (`https://2024.igem.wiki/DTU-Denmark/`) which profile.md:11 mandates always be included. |

> **Ordering note:** this is **importance order, not chronological** — it deliberately inverts the design's chronological plate order (EndoSense 001 → Liquid Handler 002). ROADMAP success criterion 3 says "most important items first", and CLAUDE.md says engineering/design is primary with biotech a *hint*. Leading with the wet-lab biosensor would invert the intended identity. **Accent colours are section-driven, not project-driven, so reordering costs nothing.**
>
> If the planner prefers to honour "a couple of entries" literally, drop plate 003 — but then the iGEM wiki link disappears from the site, which is a real loss.

**Experience (`#experience`) — recommend 4 rows** (design ships 3; reverse-chronological, as the design is):

| Period | Role | Right column | Source |
|--------|------|--------------|--------|
| **2024 — Present** | **Student Assistant — PM Team** | AGC Biologics, Copenhagen | profile.md:155. **Currently missing from the design entirely** — it is his *current job*; omitting it would be conspicuous to a recruiter. |
| **2024 — 2026** | **MSc Biotechnology** | DTU Copenhagen | profile.md:52 ✅ already correct in the design |
| **2024** | **iGEM Wet Lab Lead — EndoSense Biosensor** | iGEM Gold Medal | profile.md:16 (mandated phrasing), :193, :339 |
| **2023** | **Research Intern — CIBIO, UniTrento** | EMBO publication | profile.md:208. Keep it: it is the **provenance of the Publications entry**; dropping it leaves the EMBO row unexplained. |

> If forced to 3 rows, drop **Research Intern** — but keep AGC. Do **not** keep the design's fabricated "Research Assistant 2022–2024".

**Publications (`#publications`) — exactly 1 row.** profile.md supports **one** publication. Full, correct entry:

- **Title:** *Mapping cryptic phosphorylation sites in the human proteome*
- **Role label:** **Contributing author** (mandated; *"do not list position number"* — so **no "10th of 20"**, and **not** "co-author")
- **Venue:** *The EMBO Journal* · 2025 · 44:6704–6731
- **Link:** `https://doi.org/10.1038/s44318-025-00567-1` (profile.md:210 also gives the Springer URL)

> **Concrete CSS consequence:** the design's two publication rows use `border-top` on row 1 and `border-top + border-bottom` on row 2 (V4:151,155) to build a shared rule set. Collapsing to **one** row means that row needs **both** borders, or the list renders with a hanging open edge.

**Contact (`#contact`):** `sirio.feltrin@gmail.com` — design (V4:169) and profile.md:42 **agree**, and STATE.md locks it. ✅ No change.

**Nav / hero actions:** CV `https://canva.link/5a5yj5bdg78axhv` and LinkedIn `https://www.linkedin.com/in/sirio-vittorio-feltrin/` — design and profile.md:406-407 **agree**. ✅ No change. Both already carry `target="_blank" rel="noopener"`.

**Mission one-liner:** verbatim, locked, and **already exactly right in the design** (V4:57), including the gradient span on *"hardware, software and automation"* (`#96c4ff → #f4b659 40% → #ff7a59 68% → #ab8cff` — the PAL spectrum again). ✅ Copy as-is.

### Typewriter terms (already correct in the engine)

The pending todo (`2026-06-17-hero-typewriter-rotating-role-animation`) asked for: prefix `"I'm a "`, words *Engineer, Biotechnologist, Product Designer, Developer*, per-term colour, reduced-motion fallback, no layout shift.

The approved design **already exceeds this** with 8 terms and per-term gradients **[VERIFIED: star-engine.js:71-80]**: `Engineer`, `Designer`, `Developer`, `Biotechnologist`, `Product Maker`, `Lab Automator`, `Data Analyst`, `AI enthusiast` — plus automatic `a`/`an` article selection (`/^[aeiou]/i.test(t.text) ? 'n ' : ' '`).

**Divergences from the todo (design wins — it is the approved source):** prefix is **"I am a"** not "I'm a"; "Product Designer" appears as **"Designer"** + **"Product Maker"**. → **The todo is satisfied by the design and can be closed.** Its "no layout shift" concern is worth noting though: the design centres the line via flex with only `min-height:1.7em` (V4-equivalent `Sirio Star.dc.html`:60), so the text **re-centres as the word grows/shrinks**. That is the approved behaviour — flag for Phase 3 if it reads badly on mobile.

## Media Slot Pattern (MEDIA-01)

### The slot shape as the design actually defines it

**[VERIFIED: design/Sirio V4 - Deep Field x Hyperlight.dc.html:82, 94, 194, 211-213]**

| Slot | Aspect | Where | Label |
|------|--------|-------|-------|
| Home project card | **`aspect-ratio: 16/9`** | V4:82, V4:94 | `[ project video / image ]`, `[ device render / gif ]` |
| Project page hero | `aspect-ratio: 16/8` | V4:194 | `[ HERO MEDIA — … ]` *(Phase 4)* |
| Project gallery tile | `aspect-ratio: 4/3` | V4:211-213 | `[ photo ]`, `[ cad / render ]` *(Phase 4)* |

> **⚠ Drift D-2 — correcting the record:** STATE.md says the media slot is *"a 16:10 box"*, and the stale `01-03-PLAN.md` says `16:10` too. **The approved design says `16/9`.** Neither file contains `16/10` anywhere. The *decision* ("one box serving image OR video; structure doesn't depend on assets") stands and is unaffected — only the ratio literal is wrong. **Phase 1 should build `16/9` and the record should be corrected.**

Placeholder styling to preserve (V4:82):
```css
background: repeating-linear-gradient(135deg, rgba(var(--accent),0.09) 0 11px, rgba(var(--accent),0.02) 11px 22px);
border: 1px dashed rgba(var(--accent), 0.32);
border-radius: 18px;
box-shadow: 0 30px 90px rgba(220,140,40,0.10);   /* accent-tinted lift */
/* label: Space Mono, 12px, 0.14em, uppercase, rgba(var(--accent),0.65) */
```

### Recommended pattern: CSS `:has()` — zero JS, true drop-in

```html
<!-- EMPTY (ships now): striped placeholder renders automatically -->
<figure class="media-slot" data-label="[ project video / image ]"></figure>

<!-- FILLED (later): paste ONE element. No CSS, no JS, no re-engineering. -->
<figure class="media-slot" data-label="[ project video / image ]">
  <img src="./assets/media/dispenser.jpg" alt="Portable precision liquid dispenser prototype">
</figure>

<!-- FILLED with video: same slot, same class -->
<figure class="media-slot" data-label="[ project video / image ]">
  <video src="./assets/media/dispenser.mp4" poster="./assets/media/dispenser.jpg"
         muted loop playsinline autoplay></video>
</figure>
```

```css
.media-slot {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  overflow: hidden;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* EMPTY → striped placeholder + label */
.media-slot:not(:has(> img, > video)) {
  background: repeating-linear-gradient(135deg,
              rgba(var(--accent), 0.09) 0 11px,
              rgba(var(--accent), 0.02) 11px 22px);
  border: 1px dashed rgba(var(--accent), 0.32);
  box-shadow: 0 30px 90px rgba(var(--accent), 0.10);
}
.media-slot:not(:has(> img, > video))::after {
  content: attr(data-label);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(var(--accent), 0.65);
}

/* FILLED → asset fills the box; placeholder chrome disappears */
.media-slot > img,
.media-slot > video {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
```

**Why this satisfies MEDIA-01 exactly:**
- **Documented folder** → `site/assets/media/` with a `README.md` naming the convention.
- **Drop-in + one-line reference** → copy the file in, paste one `<img>`/`<video>`. Literally one line.
- **No re-engineering** → the toggle is a CSS selector. No JS, no config array, no build.
- **Slot shape is asset-independent** → honours the locked decision that media hunting never blocks the build.

**Why `:has()` and not `:empty`:** **`:empty` is a trap here.** It matches only elements with *no child nodes at all* — and **whitespace counts as a text node**. So the natural, prettier-formatted markup
```html
<figure class="media-slot">
</figure>
```
is **not** `:empty`, and the placeholder would silently vanish. `:has()` is immune to whitespace. `:has()` is **Baseline widely available, across browsers since December 2023** **[CITED: developer.mozilla.org/en-US/docs/Web/CSS/:has]** — safe for a 2026 portfolio.

**Assets README should specify** (so a future drop-in is unambiguous): folder `site/assets/media/`; lowercase-hyphen filenames matching the project slug; `.jpg`/`.webp` for stills, `.mp4` (H.264) for clips; a `poster` still for every video; **no stock or AI-generated imagery, ever** (locked decision). Encoding/sizing is formally **Phase 4 (MEDIA-02)** — Phase 1 only guarantees the slot accepts the file.

## Gaps: Things the Design Does NOT Solve

### Gap N-1 — There is no persistent nav in the design (blocks NAV-02, weakens HERO-04, touches FOUND-04)

**[VERIFIED: both design files]** The top bar (`SIRIO VITTORIO FELTRIN` + `CV ↗` + `LinkedIn ↗`) is `position:absolute; top:0` **inside the hero section** (`Sirio Star.dc.html`:49, V4:34). It scrolls away with the hero and never returns. There is no `position:fixed` nav anywhere in either file.

**But the design leaves a fingerprint of one:** every single section carries **`scroll-margin-top: 70px`** (V4:53, 69, 107, 141, 164). `scroll-margin-top` exists *only* to stop a fixed header from covering an anchored heading. **The design was authored expecting a ~70px persistent header that was never drawn.**

**Recommendation:** Plan 01-02 builds a `position:fixed` nav, height **70px**, reusing the existing top-bar markup and typography (Space Mono, 12px, `0.2em`, `rgba(228,236,255,0.55/0.6)`), carrying the wordmark left + `CV ↗` / `LinkedIn ↗` right. Suggested treatment: transparent over the hero, then a glass/blur background once `scrollY > ~70` (tokens `--glass-bg`/`--glass-border` already exist for exactly this). This single element satisfies **NAV-02's "persistent/access nav"** and makes **HERO-04's CV/LinkedIn** permanently reachable. **Flag to Sirio as a design addition, since it is not in the approved snapshot** (CLAUDE.md: Claude leads design, Sirio approves).

### Gap H-2 — HERO-02 (cursor/scroll reactivity) is not implemented anywhere

**[VERIFIED: `Sirio Star.dc.html` and `star-engine.js` contain no `mousemove`/`pointermove` handler]** The star breathes on a `performance.now()` timer only. `HeroStar.frame()` reads scroll position solely to *cull* itself (`hr.bottom < -80`). The V4 deep field reacts to `scrollY`, and `data-para` elements parallax — but that is the *page*, not the *hero centrepiece*.

Options for the planner:

| Option | Effort | Fidelity risk |
|--------|--------|---------------|
| **A. Count deep-field + `data-para` scroll parallax as "reacts to scroll"** | none | Arguably satisfies the literal text ("cursor **and/or** scroll") but the *hero star itself* is inert. Weak reading. |
| **B. (recommended) Add a small pointer-parallax offset to the star + planets** | small | Additive: track normalised pointer offset from hero centre, apply a few px of translate to `[data-star]`/`[data-planet]`, easing toward the pointer. Must be gated on `REDUCED` and skipped on touch (no hover). Low risk to the approved look. |
| **C. Pointer-reactive ignition** (cursor proximity nudges `b`) | medium | Interferes with the tuned 20 s breathing + arm/fire hysteresis. **Not recommended.** |

**Recommendation: B**, implemented in `main.js` (not by editing the engine), with `@media (hover: hover)` gating and a `REDUCED` bail-out. Surface to Sirio for approval — it is a motion behaviour absent from the approved design.

### Gap M-1 — MEDIA-01 is uncovered by any existing plan

Confirmed: MEDIA-01 was added to the ROADMAP after 01-02/01-03 were authored, and neither plan mentions it. The **Media Slot Pattern** above is the proposed coverage. It belongs in **01-03** (with the Work section), plus the `site/assets/media/README.md`.

## Common Pitfalls

### Pitfall 1: Layout thrashing — the engine interleaves reads and writes every frame

**What goes wrong:** `HeroStar._draw` runs, per frame: `getBoundingClientRect` (read) → `style.setProperty` ×9 (write) → `starLayer.style.left/top` (write) → `getBoundingClientRect` on the i-spans (read) → planet style writes (write). Plus `frame()` already did a `getBoundingClientRect` on the hero. Reading geometry *after* writing styles in the same frame **forces synchronous layout**. **[CITED: webperf.tips/tip/layout-thrashing; gist.github.com/paulirish/5d52fb081b3570c81e3a]** — *"Reading offsetHeight or getBoundingClientRect after a style mutation in the same callback forces a synchronous layout… batch your reads first, batch your writes last."*
**Why it happens:** the design was authored for visual fidelity in a design tool, not for frame budget.
**How to avoid:** **Do not refactor the engine in Phase 1** — it currently holds 60fps on desktop and rewriting it risks drifting from the approved design. Instead: (a) **know this is the #1 candidate** when Phase 3 (PERF-01) profiles on a mid-range phone; (b) don't *add* more interleaved reads (e.g. implement pointer parallax by caching the hero rect on resize/scroll, not by re-measuring per frame); (c) `applyPara`'s per-element `getBoundingClientRect` (V4:387) multiplies this — it already culls at ±400px, keep that.
**Warning signs:** DevTools Performance showing purple "Recalculate Style"/"Layout" bars inside every rAF tick; jank that worsens as sections are added.

### Pitfall 2: Reduced-motion and DPR are captured at module load and never re-read

**What goes wrong:** `export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;` and `export const DPR = Math.min(window.devicePixelRatio || 1, 2);` are **module-level constants** (star-engine.js:12-13). Toggling the OS reduced-motion setting, or dragging the window to a different-DPR monitor, has **no effect until a reload**. On a DPR change the canvas renders soft/blurry.
**Why it happens:** evaluated once at import.
**How to avoid:** acceptable for v1 — but if cheap, listen in `main.js`: `matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', …)` to start/stop the loop **[CITED: MDN prefers-reduced-motion]**, and re-read `devicePixelRatio` on `resize`. **Do not** bake this into the engine in Phase 1; it is a natural Phase 3 (PERF-01) / Phase 5 (A11Y-01) item.
**Warning signs:** blurry canvas after moving windows between a laptop screen and an external monitor.

### Pitfall 3: The hero canvas paints an OPAQUE background and will hide the deep field

**What goes wrong:** `HeroStar._draw` does `ctx.fillStyle = 'rgb(' + bg + ')'; ctx.fillRect(0,0,W,H);` where `bg = lerp3([4,5,12],[10,15,32], b)` (star-engine.js:185-187) — a **fully opaque** fill that breathes with the star. Meanwhile V4's deep field is a `position:fixed; z-index:0` canvas, and the hero lives inside `[data-field]` at `z-index:1`. **The hero's canvas therefore covers the deep field across the entire first viewport**, and the deep field only appears once you scroll past the hero — producing a **visible seam and a starfield discontinuity at the hero's bottom edge**, plus two independent starfields that don't align.
**Why it happens:** `Sirio Star.dc.html` was authored as a **standalone, full-viewport screen** (`html,body{overflow:hidden}`), where an opaque background is correct. V4 was authored with a *mockup* hero, so the two files were never actually composed. **This is the single largest untested integration point.**
**How to avoid (recommended):** in `main.js`, after constructing the star, neutralise the opaque fill so the fixed deep field and the root gradient show through the hero — mirroring how `drawDeep` uses `clearRect`. The breathing background tint can be preserved *without* the canvas by putting a `--b`-driven `rgba` overlay on the hero element in CSS (the engine already publishes `--b` and `--glow`). Then decide whether the hero's own 130-star field is still wanted on top of the deep field's 484 (likely reduce or drop it — otherwise the hero is markedly denser than the rest of the page).
**Alternative:** keep the hero canvas opaque and accept that the deep field starts below the fold. Cheaper, but the seam is real and the "one continuous cosmos" idea is lost.
**Decision required — surface to Sirio.** **Warning signs:** a horizontal edge where star density/brightness visibly changes as you scroll out of the hero.

### Pitfall 4: `style-hover` silently drops every hover state

**What goes wrong:** `style-hover="border-color:rgba(244,182,89,0.8); box-shadow:…"` appears **~14 times** across V4 (nav links, sector pills, media boxes, plate CTAs, publication rows, the contact email). It is a Claude Design authoring attribute; browsers treat it as an unknown attribute and **ignore it entirely**. A verbatim port looks correct in screenshots and is **completely dead on hover**.
**How to avoid:** enumerate every `style-hover` and translate it into a real CSS `:hover` rule. Note the paired `transition:` declarations are in the *normal* `style` attribute and **do** survive — so the transitions will be present with nothing to transition to, which is exactly why this fails quietly.
**Warning signs:** nothing lights up on hover; the design "feels dead" despite looking right.

### Pitfall 5: The dotless "ı" and the transparent "o" are load-bearing

**What goes wrong:** the wordmark is `S ı r ı o` using **U+0131** (`&#305;`), with the `o` set `color:transparent`. `HeroStar` locates the orbs' homes via `textContent.trim() === 'ı'` and the star's anchor via `=== 'o'`. Typing a normal `i`, or "fixing" the transparent `o` (it looks like a bug — the wordmark reads "Sır" with a gap), **silently disables** the orbits (`iSpans.length !== 2` skips the entire planet block) or drops the star to the hero's geometric centre (`if (!o || !h1)` fallback).
**How to avoid:** comment the markup loudly. Verify by counting: `document.querySelectorAll('[data-hero] h1 > span').length === 3`.
**Warning signs:** star sits dead-centre of the hero instead of on the "o"; i-dots never orbit.

### Pitfall 6: The typewriter no-ops without `data-art` / `data-typer`

**What goes wrong:** `_startType` does `this._typeEl = this.el.querySelector('[data-typer]'); if (!this._typeEl) return;` — **a silent early return**. Neither design file contains these attributes (the `.dc.html` uses positional `children[0]`/`children[1]`). Port the markup literally and the typewriter simply never runs, with no error.
**How to avoid:** the ported `<p>` must be `<span data-art></span><span data-typer></span><span class="caret"></span>`.
**Warning signs:** "I am a" with a blinking caret and no word, and no console error.

### Pitfall 7: Font-metric measurement before webfonts load

**What goes wrong:** `_measure` uses `measureText('o')` against the h1's computed font. Before Space Grotesk arrives, metrics come from the fallback → the star anchors slightly off and visibly jumps when the webfont swaps. `Sirio Star.dc.html` guards this with `document.fonts.ready.then(() => this.measure())` (:102); **`HeroStar` does not**.
**How to avoid:** `document.fonts.ready.then(() => requestAnimationFrame(loop))`, or accept the settle (the per-frame `_measure` self-corrects within one frame). Low severity, one-line fix.
**Warning signs:** star visibly jumps ~100ms after load.

## Code Examples

### Complete hero wiring (the heart of 01-02)

```js
// site/main.js — Source: composed from star-engine.js:37-67 + design/Sirio Star.dc.html:204-211
import { HeroStar, REDUCED } from './star-engine.js';

const GOLD = { glow: [255, 196, 110], core: [255, 236, 200] };   // Sirio Star.dc.html:207

const heroEl = document.querySelector('[data-hero]');
const star = new HeroStar(heroEl, { periodSec: 20 });   // approved "Slow"; engine default is 15
star.pal = GOLD;                                        // engine hard-codes blue-white; no opts.pal exists

let raf = null;
function loop(now) { raf = requestAnimationFrame(loop); drawDeep(now); star.frame(now); }

document.fonts.ready.then(() => {                       // avoid the font-swap star jump
  if (REDUCED) { drawDeep(performance.now()); star.frame(performance.now()); }  // one static frame
  else raf = requestAnimationFrame(loop);
});
```

### Hero markup contract (every selector the engine needs)

```html
<!-- Source: structure from design/Sirio Star.dc.html:26-68; data-art/data-typer added per star-engine.js:83-84 -->
<section id="top" class="hero" data-hero>          <!-- MUST be position:relative -->
  <canvas></canvas>                                 <!-- absolute; inset:0; z-0; pointer-events:none -->
  <div data-planet="far"></div>                     <!-- absolute; engine sets x/y/size/z/opacity -->
  <div data-planet="near"></div>
  <div data-star>…halo / 3 flares / glass disc / dashed ring / core…</div>

  <div class="hero__intro">Hello, I am</div>
  <!-- ı = U+0131 DOTLESS I (×2). The "o" is transparent — the STAR is the "o". Do not "fix". -->
  <h1>S<span>&#305;</span>r<span>&#305;</span><span class="wordmark__o">o</span></h1>

  <p class="hero__type">
    <span>I am a</span>
    <span class="typer">
      <span data-art></span>                        <!-- article: " " or "n " -->
      <span data-typer></span>                      <!-- the word + its gradient -->
      <span class="caret"></span>
    </span>
  </p>
</section>
```

### `style-hover` → real CSS (do this ~14 times)

```html
<!-- BEFORE — design authoring format; browsers IGNORE style-hover -->
<a data-jump href="#work"
   style="…; transition: border-color 0.3s ease, box-shadow 0.3s ease;"
   style-hover="border-color:rgba(244,182,89,0.8); box-shadow:0 0 18px rgba(244,182,89,0.25)">01 WORK ↘</a>
```
```css
/* AFTER — real, tokenised */
.pill { transition: border-color .3s ease, box-shadow .3s ease;
        border: 1px solid rgba(var(--accent), .35); }
.pill:hover { border-color: rgba(var(--accent), .8);
              box-shadow: 0 0 18px rgba(var(--accent), .25); }
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| WebGL / Three.js hero (REQUIREMENTS HERO-01, FOUND-01 wording) | **Canvas-2D cosmic engine** | 2026-07-16, via the approved Claude Design + CLAUDE.md | Lighter on mobile, no dependency, already implemented. **REQUIREMENTS text is stale — see D-1.** |
| `:empty` / JS toggling for conditional placeholders | **CSS `:has()`** | Baseline widely available Dec 2023 **[CITED: MDN]** | Enables a zero-JS swappable media slot immune to the whitespace trap. |
| `app/` as the site source root | **`site/`** | commit 1b4b908 | **All plan paths must say `site/`.** |
| Fixed-size canvas | `devicePixelRatio`-scaled backing store, capped at 2 | long-standing | Already correct in the engine (`Math.min(dpr,2)`, `setTransform(dpr,…)`). **[CITED: MDN devicePixelRatio]** |

**Deprecated/outdated:**
- **`_Archive/`** (old `site/` mockup + Fable Brief) — superseded, git-ignored, off-limits.
- **`01-CONTEXT.md`** — deleted (bdbc909); derived from the archived brief. Do not resurrect.
- **`01-02-PLAN.md` / `01-03-PLAN.md`** — stale (`app/` paths ×35 and ×20; no MEDIA-01; Fable-Brief lineage; `16:10`; "two Publications"). Being regenerated.

## Drift Register (corrections to the written record)

| # | Drift | Reality | Action |
|---|-------|---------|--------|
| **D-1** | REQUIREMENTS HERO-01 says *"WebGL/3D animated wow centerpiece"* | CLAUDE.md mandates Canvas-2D; `HeroStar` is Canvas-2D | Requirement **intent** (an animated wow centrepiece on load) is met. Planner should note the supersession rather than build WebGL. Consider correcting REQUIREMENTS.md text. |
| **D-2** | STATE.md + `01-03-PLAN.md` say media slot is **16:10** | Design says **`aspect-ratio:16/9`** (V4:82,94). `16/10` appears nowhere. | Build **16/9**. Correct STATE.md. The *decision* it records is unaffected. |
| **D-3** | `site/README.md` local-preview says `npx --yes serve app` | Folder is `site/` | One-word fix (`serve site`). Missed by the `app/`→`site/` rename. |
| **D-4** | `01-01-SUMMARY.md` documents `app/…` paths throughout | Files now live at `site/…` | Historical record; harmless, but **don't let the planner inherit `app/` from it**. |
| **D-5** | REQUIREMENTS FOUND-04 *"Multi-page architecture"* is mapped to Phase 1 | No second page exists until Phase 4 (PROJ-01/02) | See **Open Question 1** — Phase 1 delivers persistent nav + single scroll home; the multi-page *mechanism* is a Phase 4 decision. |
| **D-6** | `01-03-PLAN.md` asserts *"two Publications"* | `profile.md` supports **exactly one** | One row. Do not invent the iGEM Registry entry. |

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Git | version control | ✓ | 2.46.0.windows.1 | — |
| Python | local preview (`http.server`) | ✓ | 3.10.9 | `npx serve` |
| Node | optional local preview | ✓ | v24.14.1 | Python http.server |
| npm | not used by the site | ✓ | 11.11.0 | — |
| GitHub Actions + Pages | deploy | ✓ | shipped, green | — |
| Browser w/ Canvas 2D + `:has()` + `aspect-ratio` | the whole site | ✓ | all Baseline | — |
| **`gh` CLI** | — | **✗** | — | **Not needed** — repo exists, remote configured, push-to-deploy proven. (01-01 handled repo creation via a human checkpoint.) |
| **Project images/videos** | MEDIA-02 (**Phase 4**) | **✗** | — | **MEDIA-01 striped placeholders — this is the plan, not a workaround.** Locked: media must never block the build. |

**Missing dependencies with no fallback:** none — nothing blocks this phase.
**Missing dependencies with fallback:** `gh` CLI (unnecessary); real media (placeholders by design).

**Project skills:** none in `05_Portfolio`. The parent `../.agents/skills/` holds 20 CV/career ResumeSkills; none apply to Phase 1. (`portfolio-case-study-writer` may be useful in **Phase 4**.)

## Security Domain

`security_enforcement: true`, `security_asvs_level: 1`. **This is a static, read-only marketing page with no user input, no auth, no data store, and no server** — most ASVS categories are structurally N/A in Phase 1.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | **no** | No accounts, no login. |
| V3 Session Management | **no** | No sessions, no cookies, no storage. |
| V4 Access Control | **no** | All content is public by intent. |
| V5 Input Validation | **no (Phase 1)** | **Zero user input in this phase.** Becomes live in **Phase 6** (ASKAI-04 free-text) — and ASKAI-06 already mandates no client-side key. |
| V6 Cryptography | **no** | No secrets. HTTPS is provided by Pages. |
| V14 Configuration | **yes** | Pinned first-party `actions/*`, least-privilege token — **already satisfied by 01-01**. Do not weaken. |

### Known Threat Patterns for a static Pages site

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| **Reverse tabnabbing** via `target="_blank"` | Tampering | `rel="noopener"` — **already present on every external link in the design** (V4:37,38; Star:52,53). Preserve it on CV, LinkedIn, iGEM wiki, and DOI links. **[VERIFIED: design files]** |
| **Third-party CDN compromise** (Google Fonts) | Tampering | Accepted risk (shipped by 01-01). Optional hardening: self-host fonts, or add SRI/CSP. **Defer to Phase 5** — do not expand scope here. |
| **Supply chain via CI actions** | Tampering / EoP | Only pinned first-party `actions/*` at `contents:read, pages:write, id-token:write`. Already correct — **treat `deploy.yml` as out of scope**. |
| **XSS via injected content** | Tampering | All content is hand-authored static HTML. **No `innerHTML` anywhere.** ⚠ The engine's typewriter uses `textContent` (star-engine.js:103-104) — **correct and safe. If anyone "improves" it to `innerHTML`, that introduces an injection sink for free.** Keep `textContent`. |
| **Email harvesting** (`mailto:`) | Info disclosure | Accepted — the address is intentionally public (locked decision). |
| **Secrets in the repo** | Info disclosure | None exist; nothing to leak. No API key ships until Phase 6, which explicitly forbids it client-side. |

**Net:** no security work is required in Phase 1 beyond *preserving* what 01-01 established and keeping `rel="noopener"` + `textContent`.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| **A1** | The `cycleSpeed` prop default `"Slow"` (→ **20 s**) is the breathing period Sirio approved, not the `|| 18` fallback or the engine's 15 s | The GOLD Star | Low. Star breathes at a slightly different rate than approved; one-number fix. |
| **A2** | Leading Work with the thesis dispenser (importance order) rather than the design's chronological EndoSense-first is what "most important first" means | Curated Content | Low-med. **Content decision — confirm with Sirio.** Reordering is trivial. |
| **A3** | 3 Work plates / 4 Experience rows is the right reading of "a couple of entries max" | Curated Content | Low. **Confirm with Sirio** — trimming is trivial, and the design ships 2/3. |
| **A4** | The `scroll-margin-top:70px` fingerprint implies an intended ~70px fixed header | Gap N-1 | Med. If Sirio wants no persistent nav, NAV-02 needs a different answer. **Requires approval — it is a design addition.** |
| **A5** | Pointer-parallax (Option B) is the right way to satisfy HERO-02 | Gap H-2 | Med. **Requires approval** — adds motion not in the approved design. |
| **A6** | Making the hero canvas transparent so the deep field shows through is preferable to the seam | Pitfall 3 | **Med-high — the biggest open visual decision.** Both files are individually approved; their *composition* has never been seen. **Requires Sirio's eyes on a rendered result.** |
| **A7** | The iGEM medal is **Gold** | Curated Content | Low. profile.md contradicts itself: Awards table + CV guidelines say **Gold Medal**; the Experience entry says *"medal (2024 Jamboree — type TBC)"*. Two sources to one → Gold. **Worth a one-line confirmation.** |
| **A8** | Liquid dispenser year is **2026**, not the design's 2025 | Curated Content | Low. Thesis deadline is Aug 2026 (profile.md:391); MSc ends Sep 2026. Could be labelled "2025–2026". **Confirm.** |
| **A9** | Scroll-reveals (`data-reveal`) may ship in Phase 1 even though MOTION-01 is Phase 2 | Open Question 2 | Low. Scope-accounting only, not a build risk. |

## Open Questions

1. **What does FOUND-04's "multi-page architecture" mean, and must Phase 1 settle it?**
   - *What we know:* Phase 1 owns FOUND-04. The V4 design answers "multi-page" **not** with separate `.html` files but with `position:fixed` overlay divs (`[data-proj]`) revealed by a warp transition — an SPA-ish pattern on a static host. Phase 4's PROJ-01 asks for a "reusable project case-study page template."
   - *What's unclear:* whether Phase 1 must implement any multi-page mechanism, or only the persistent nav + single immersive scroll home (the parts of FOUND-04 that are visible now).
   - *Recommendation:* **Phase 1 delivers persistent nav + single-scroll home and stops there.** Do not port the overlay machinery. Note in the plan that the design's answer exists so Phase 4 doesn't re-litigate it. Building detail pages now contradicts both "ship small" and the Phase 4 boundary.

2. **Do scroll-reveals ship in Phase 1?**
   - *What we know:* `data-reveal` is authored into every V4 section, and `updateReveals()` (V4:560-597) is a complete, working, reduced-motion-aware vanilla implementation. But MOTION-01/02 are formally **Phase 2**.
   - *What's unclear:* whether porting the sections *without* reveals is even coherent — the attributes are structural to the markup, and stripping them is more work than keeping them.
   - *Recommendation:* **port `data-reveal` attributes with the markup; leave `updateReveals()` for Phase 2** (elements simply render normally without it). This keeps Phase 1 tight, keeps the markup faithful, and lets Phase 2 light it up by adding one function. If the planner prefers, including `updateReveals()` now is also defensible — it is ~35 lines and already handles `REDUCED`.

3. **iGEM medal type — Gold?** See **A7**. profile.md:339 and the CV guidelines say Gold; profile.md:195 says "type TBC". Recommend **Gold** (two authoritative sources), and suggest correcting profile.md:195.

4. **Does the hero keep its own 130-star field once composed with the deep field's 484?** Tied to **A6/Pitfall 3**. If the hero canvas goes transparent, the two fields stack and the hero becomes noticeably denser than the rest of the page. Recommend evaluating on a rendered page and likely reducing/removing the hero's own field.

## Sources

### Primary (HIGH confidence — read directly from sources of truth on disk)
- `.planning/phases/01-the-design-build/design/Sirio Star.dc.html` (375 ln) — gold palette, breathing period, ignition thresholds, orbital mechanics, wordmark seam, typewriter
- `.planning/phases/01-the-design-build/design/Sirio V4 - Deep Field x Hyperlight.dc.html` (603 ln) — page structure, section spectrum, media slots, `style-hover`, deep field, deferred warp/overlay machinery
- `.planning/phases/01-the-design-build/design/star-engine.js` (296 ln) — `HeroStar`, `PAL`, `tintAt`, `REDUCED`, `DPR`
- `site/star-engine.js` — **`diff` vs the design file: identical** (bash, exit 0)
- `site/index.html`, `site/styles.css`, `site/main.js`, `site/README.md`, `.github/workflows/deploy.yml` — current shipped state
- `../00_Profile/profile.md` (408 ln) — **the only content source**
- `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, `.planning/STATE.md`, `CLAUDE.md`, `../CLAUDE.md`
- `gsd-tools query init.phase-op 01` → `has_context: false` (confirms no CONTEXT.md)

### Secondary (MEDIUM confidence — official documentation, fetched this session)
- [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — "removes, reduces, **or replaces** motion"; Baseline since Jan 2020; `matchMedia` + `change` listener
- [MDN — `:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) — **Baseline widely available, across browsers since December 2023**
- [MDN — `devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) — canvas backing-store sizing pattern
- [MDN — `<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture), [MDN — `HTMLVideoElement.poster`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/poster)

### Tertiary (LOW confidence — WebSearch, corroborated against the code)
- [Layout Thrashing and Forced Reflows — webperf.tips](https://webperf.tips/tip/layout-thrashing/)
- [What forces layout/reflow — Paul Irish](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
- [Animation Performance 101 — Viget](https://www.viget.com/articles/animation-performance-101-optimizing-javascript)
- [Responsive Video Poster — Nigel O'Toole](https://nigelotoole.github.io/responsive-video-poster/)

*Provider note: `.planning/config.json` has all premium search providers disabled, so the `research-plan` seam routed every question to built-in `websearch`/`webfetch` (seam-classified LOW). MDN-sourced claims are tagged `[CITED: url]`. The load-bearing findings in this document are not web claims — they are read directly from the design snapshots and the shipped code, which is why overall confidence is HIGH.*

## Metadata

**Confidence breakdown:**
- **Standard stack:** HIGH — no packages; the engine is first-party and verified byte-identical to the design.
- **Gold star values / breathing / ignition:** HIGH — read from the approved snapshot, cross-checked against the engine.
- **Hero↔wordmark seam:** HIGH — both the markup and the measuring code were read line by line.
- **Engine gaps (E-1…E-8):** HIGH — each traced to a specific line number.
- **Content curation:** HIGH on *what profile.md supports* / MEDIUM on *which items to pick* (A2, A3 are judgement calls needing Sirio's nod).
- **Media slot pattern:** HIGH on the design's slot shape (verified 16/9, correcting the 16:10 record); MEDIUM on the `:has()` mechanism (documented Baseline, not yet built here).
- **Pitfalls:** HIGH for 3–7 (read from code); MEDIUM for 1–2 (well-documented web-perf behaviour applied to this code).
- **Nav (N-1) / HERO-02 (H-2) / hero-canvas composition (Pitfall 3):** MEDIUM — genuine gaps in the approved design that need **Sirio's approval**, not just implementation.

**Research date:** 2026-07-16
**Valid until:** ~2026-09-14 (30 days+; the design snapshots are frozen local files and the stack has no moving dependencies — the only invalidator is a design change or new content in `profile.md`)



