# Phase 2: The Story - Research

**Researched:** 2026-07-17
**Domain:** Scroll-triggered motion design (vanilla JS/CSS, Canvas-2D page) + narrative content architecture
**Confidence:** HIGH on mechanism and in-repo facts · MEDIUM on the external pattern survey · HIGH on the D-38 recommendation

---

<user_constraints>
## User Constraints (from CONTEXT.md)

> `.planning/phases/02-the-story/02-CONTEXT.md` is **authoritative and long**. The planner MUST read it in
> full. This section is a **constraint index**, not a replacement — per the orchestrator's instruction not
> to restate CONTEXT.md at length. Every ID below links to a decision that is **locked** unless marked.

### Locked Decisions — do not re-litigate

| ID | Constraint (one line) |
|----|----|
| D-01 | Order: Hero → Mission → About → Work → Experience → Publications → AI → Contact |
| D-02 | `01–04` numbering untouched; About + AI ship as **unnumbered interludes** |
| D-03 | Add **two** new star-spectrum stops: bio-green (About), indigo/cyan (AI). *Values = Claude's call.* |
| D-04 | About = **three beats**: lab years → the realisation → the pivot |
| D-05/D-06/D-07 | Include repetition-bottleneck + domain-flexible + people threads. **Exclude** martial arts. **Never the word "ego".** |
| D-08 | About goes **deeper**; must not echo the locked Mission one-liner |
| D-09 | ⚠ "late nights fixing broken lab equipment" has **no profile.md backing** — treat as true (Sirio declined to correct), but it is the *only* such beat |
| D-10..D-16 | METHOD = short manifesto, philosophy-first-but-evidence-late, opens on the calculator story. **"Cum grano salis" must NOT appear.** Spine = "same bottleneck, one layer up" |
| D-17..D-19 | Must include: AI-for-documentation, GSD Discuss→Plan→Execute, AI pressure-tests design, "I decide the direction". Link the GSD deck. **Do not invent anything.** |
| D-21..D-24 | Contact = email + LinkedIn + GitHub + iGEM wiki. **No CV link.** Keep existing title + label |
| D-25..D-31 | Media facts (alpha verified, blueprint plate, composite slot, 6.66MB video too heavy) |
| D-34 | ⚠ **THE INVISIBLE-PAGE LANDMINE** — zero CSS rules may hide `[data-reveal]` |
| D-35 | **No motion library.** Port V4 `updateReveals()` as the behavioural baseline |
| D-36 | Reuse `REDUCED` (`star-engine.js:12`). No second media-query source of truth |
| D-37 | **Single rAF loop.** Reveal work is scroll/observer-driven. No layout reads in the loop or pointer handler |
| D-38 | ⚠ The V4 fade-up does **not** convey "automation". Closing this is MOTION-01's real problem |

### Claude's Discretion (research recommends; planner decides)

- **How the reveal is wired** — trigger, thresholds, stagger, re-arm → **§ D-38 Options** below
- **NAV-01 "full-height"** — literal vs "distinct and immersive" → **§ NAV-01 Recommendation** below
- Exact values for the two new palette stops (D-03)
- Video encoding approach (D-31) · blueprint plate construction (D-28) · composite CSS (D-29)

### NOT discretionary

- **METHOD section UI/animation → `/gsd-sketch`, Sirio chooses (D-20).** This research *informs* the sketch
  options; it must not pre-empt the choice. § "Sketch Input for METHOD" is explicitly labelled as input.

### Deferred / OUT OF SCOPE

- **NAV-03 + home↔page warp transitions** → Phase 2.1 (already applied to ROADMAP + `REQUIREMENTS.md:118`).
  **Do not plan, research or port** `startBurst` / `applyTrans` / `drawWarp` / `[data-warpov]`.
- **D-33 vendor images** → Phase 2.1. (R-02 findings below anyway — reusable.)
- Project case-study pages + template (Phase 2.1/4) · AI Concierge ASKAI-* (Phase 6 — **not** CONT-03) ·
  mobile tuning (Phase 3) · MEDIA-02 formal encoding (Phase 4) · martial-arts thread · hero typewriter word list
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description (`REQUIREMENTS.md`) | Research Support |
|----|----|----|
| **NAV-01** | Immersive single-scroll home with distinct, full-height sections | § NAV-01 Recommendation — `min-height: max(100svh, …)` floor on narrative interludes only; **Phase 1 already set this precedent at `styles.css:164-165`** |
| **CONT-01** | About/Story section narrating the biotech → design/automation pivot | § Content Sourcing Map — three beats (D-04) traced to `profile.md:240-245`; `[data-reveal-kind="assemble"]` per beat |
| **CONT-03** | "How I Work With AI" section conveying the philosophy | § Content Sourcing Map — calculator story `profile.md:373-375`; manifesto lines are discrete elements → per-line assemble with **zero text-splitting machinery** |
| **CONT-04** | Contact section with email and social links | § Where Changes Land — extends `index.html:300-309`; `rel="noopener"` mandatory (§ Security Domain) |
| **MOTION-01** | Scroll-triggered animations across sections (reveal / **assemble** / **draw-on**) | § D-38 Options — the requirement text *itself* names assemble + draw-on. **Option B: the reveal-kind vocabulary** |
| **MOTION-02** | Animations honor `prefers-reduced-motion` | § D-36 — inherited. `REDUCED` (`star-engine.js:12`) + `styles.css:1156`. Cost ≈ 3 lines, not a build |

> ⚠ **Requirement-text finding:** `REQUIREMENTS.md:51` spells MOTION-01 as "reveal / **assemble** / **draw-on**".
> D-38 is not a nice-to-have reading of `PROJECT.md:28` — **the requirement itself demands assemble and draw-on.**
> A plan that ships only the V4 fade-up does **not** satisfy MOTION-01 as written. [VERIFIED: `REQUIREMENTS.md:51`]
</phase_requirements>

---

## Summary

Phase 2 is **two unrelated jobs wearing one phase number**: (1) write and mark up two new narrative
sections from `profile.md`, and (2) solve a motion design problem. Job 1 is well-specified by CONTEXT.md
and needs almost no research. Job 2 — D-38 — is the whole reason this document exists.

**The core finding is that D-38 is far cheaper to close than it looks, because the page already contains
the geometry that "draws itself."** `.section__rule` (`styles.css:645`) is a 1px horizontal gradient div
and `.exp__spine` (`styles.css:953`) is a 1px vertical gradient div. Animating `transform: scaleX(0)→1` /
`scaleY(0)→1` on those two elements — a **compositor-only property, effectively free on mobile** — makes
lines literally draw themselves across *every existing section*, with no SVG, no `getTotalLength()`, no
new markup, and no library. That single change converts the page from "fades in" to "assembles" and
delivers `PROJECT.md:28`'s "lines draw themselves" verbatim. The survey (R-01) confirms this is the same
mechanism the referenced sites use, minus the SVG cost.

The second finding is that **the V4 baseline that D-35 tells us to port carries two real defects** the
planner must handle deliberately, not port faithfully: it does a `getBoundingClientRect()` read
interleaved with style writes for every reveal element on every scroll event (textbook layout thrashing),
and it animates `filter: blur(10px)→blur(0)` (which Chrome's own performance guidance says not to do).
Both are worse on exactly the device class Phase 3 exists to protect. Swapping the *trigger* to
IntersectionObserver and dropping the blur preserves 100% of the V4 visual contract (stagger, re-arm,
reduced-motion behaviour) while honouring D-37 more strictly than the original does.

**Primary recommendation:** Port V4's reveal **state machine** (D-35), swap its **trigger** to
IntersectionObserver, drop the animated blur, and add a small `data-reveal-kind` vocabulary
(`draw` / `assemble` / `snap`, default = fade-up). Interpret NAV-01 as a `min-height: max(100svh, 620px)`
**floor on the narrative interludes only** — reusing the exact `vh`-then-`svh` fallback pattern Phase 1
already shipped on the hero. Do not use scroll-snap. Do not use `dvh`. Do not add a text-splitting library.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Section content + structure (CONT-01/03/04) | **Static HTML** (`index.html`) | — | Static site, GitHub Pages, no runtime. Content is hand-authored from `profile.md`. |
| Reveal **trigger** (when) | **Browser/Client JS** (`main.js`) | — | Needs viewport geometry. IntersectionObserver = browser-owned layout phase, off the JS main thread. |
| Reveal **appearance** (what motion) | **CSS** (`styles.css`) | JS sets a state attribute only | Compositor-driven transitions. JS must own arming (D-34) but must NOT own keyframe values. |
| Reduced-motion gating | **CSS** (`styles.css:1156`) + `REDUCED` (`star-engine.js:12`) | — | D-36 — already exists. Reuse, do not duplicate. |
| Section accent colour (D-03) | **CSS custom properties** (`styles.css:12-17` + `:572-590`) | — | Section-driven `--accent`; established Phase 1 pattern. |
| Particle flow (`PROJECT.md:28`) | **Canvas 2D** (`drawDeep()`, `main.js:73-94`) | — | **Already shipped.** See § D-38 Options, Finding 0. |
| Full-height sizing (NAV-01) | **CSS** (`styles.css`) | — | `svh` units. No JS viewport measurement — that is the `100vh` hack this replaces. |
| Video weight (D-31) | **Build-time / ffmpeg** | `<video poster>` at runtime | Offline asset prep; ffmpeg verified available. |

**Tier misassignment risk for this phase:** the temptation is to put *appearance* in JS (V4 does — it
writes `el.style.transition = 'opacity 1s ease ...'` as a string at `V4:566`). That works but puts easing
curves and durations in a JS string literal, out of reach of the CSS reduced-motion block at
`styles.css:1156`. Recommend JS writes **only** `data-rev-state`; CSS owns every duration, easing and
transform. This is what makes MOTION-02 free (D-36) rather than a second implementation.

---

## R-01 — Referenced Pattern Survey

> **This is Sirio's explicit ask** (*"research on good dynamic content for the page, so you can be
> inspired by what people are doing for good websites"*). Every pattern below is named, cited to a real
> URL that was fetched or returned by search this session, described mechanically enough to implement in
> vanilla JS/CSS, and costed for mobile.

**⚠ Honesty note on scope:** this survey is grounded in **technique teardowns and live demo galleries**
(Codrops, Bramus/Chrome, CSS-Tricks, MDN, WebKit), not in a broad site-by-site Awwwards crawl. I did not
individually verify a gallery of award-winning portfolio sites, and I have not invented URLs to imply
otherwise. The two **live galleries** below are the right thing to put in front of Sirio if he wants to
browse real examples: <https://scroll-driven-animations.style/> and <https://tympanus.net/codrops/tag/scroll/>.

### P-1 — Self-drawing line (`stroke-dasharray` + `stroke-dashoffset`)

- **Refs:** [CSS-Tricks — How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/) ·
  [Brad Woods — Scroll-driven draw animation](https://garden.bradwoods.io/notes/svg/scroll-driven-draw-animation) ·
  [MDN — stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset) ·
  [Stripe Open Source: Behind the Scenes](https://medium.com/@bdc/stripe-open-source-behind-the-scenes-59790999dea0)
- **Mechanism:** `const L = path.getTotalLength(); path.style.strokeDasharray = L; path.style.strokeDashoffset = L;`
  then transition `strokeDashoffset` → `0`. One dash longer than the path = the path hidden; sliding the
  dash off = the path drawing itself.
- **Mobile cost: MEDIUM.** `stroke-dashoffset` is **not** a compositor property — every frame repaints the
  SVG. Fine for a thin path over a small area; bad for full-viewport complex geometry. The Stripe teardown
  notes their page doesn't scroll at all — elements move independently — which sidesteps the scroll-linked
  repaint entirely. [CITED: css-tricks.com, medium.com/@bdc]
- **Verdict for this phase: SKIP the SVG form.** See Finding 1 in § D-38 — the page already has real 1px
  line elements that achieve the same read via `transform: scaleX()`, which *is* compositor-only. Keep P-1
  in reserve for the Phase 2.1 blueprint-plate grid, where genuine SVG geometry exists.

### P-2 — Masked line reveal (`overflow:hidden` + `translateY(100%)→0`)

- **Refs:** [Codrops — Making Stagger Reveal Animations for Text](https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/) ·
  [Codrops — Experimental On-Scroll Text Animations with SVG Clip-Path](https://tympanus.net/codrops/2024/01/10/experimental-on-scroll-text-animations-with-svg-clip-path/) ·
  [Codrops — SVG Mask Transitions on Scroll (Mar 2026)](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/)
- **Mechanism:** wrap each line in a clipping parent (`overflow:hidden; display:block`), put the text in an
  inner `<span>` at `transform: translateY(100%)`, transition to `translateY(0)`. Stagger by index. Text
  slides **up from behind a hard edge** — it is uncovered, not faded in. This is the single most recognisable
  "authored" motion on modern editorial/portfolio sites.
- **Mobile cost: CHEAP.** `transform` only — compositor-driven, no paint, no layout. `overflow:hidden` on
  the wrapper costs one clip, resolved once.
- **Verdict: ADOPT** as `data-reveal-kind="assemble"`. See the splitting landmine in § Pitfall 4 — the
  Codrops articles all reach for GSAP SplitText / Splitting.js, and **we must not.** D-04 (3 discrete
  paragraphs) and D-15 (5 discrete stanzas) mean **our lines are already separate elements** — we get the
  effect with zero splitting machinery. This is a genuine structural advantage of the approved content shape.

### P-3 — Native CSS scroll-driven animations (`animation-timeline: view()`)

- **Refs:** [MDN — CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) ·
  [Chrome for Developers](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) ·
  [WebKit — A guide to Scroll-Driven Animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) ·
  [Bramus — scroll-driven-animations.style](https://scroll-driven-animations.style/) ·
  [web-features explorer — support data](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/)
- **Mechanism:** `animation: reveal 1ms linear both; animation-timeline: view();` — binds `@keyframes` to
  the element's own progress through the scrollport. No JS at all.
- **Support:** Chrome/Edge 115+ (Jul 2023), Safari 26 + iOS 26 (Sep 2025). **Firefox: NOT supported.**
  web-features explorer: *"Baseline availability blocked since September 2025 by Firefox (10 months)."*
  [CITED: web-platform-dx.github.io/web-features-explorer]
- **Mobile cost: NEAR-ZERO** where supported — runs off the main thread.
- **Verdict: DO NOT use as the primary mechanism.** Firefox has no support, so it needs a full JS fallback →
  **two sources of truth for one behaviour**, which is exactly what D-36 forbids in the reduced-motion case
  and is the same anti-pattern here. Also: it cannot re-arm/replay the way V4's state machine does without
  extra work. **Optional Phase 3+ enhancement only**, gated behind `@supports (animation-timeline: view())`,
  and only if someone wants to reclaim main-thread budget on mobile. Record as a deferred idea, not a plan task.

### P-4 — Sticky-scroll staged assembly (`position: sticky` + scroll progress)

- **Refs:** [Bramus — stacking-cards demo gallery](https://scroll-driven-animations.style/) ·
  [Codrops — Building a Layered Zoom Scroll Effect](https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/)
- **Mechanism:** an over-tall section wraps a `position: sticky` inner; progress `t = f(scrollY - sectionTop)`
  drives a multi-step assembly while the viewport is pinned.
- **Mobile cost: MEDIUM–HIGH in UX, not CPU.** `sticky` itself is cheap. The cost is **scroll distance** —
  it makes the page significantly longer and hijacks the reader's sense of progress. Recruiters scroll fast
  on phones; a pinned section that refuses to advance reads as a broken page.
- **Verdict: DO NOT use for About/Contact.** Legitimate as **one** `/gsd-sketch` option for METHOD (D-20)
  where a 5-stanza manifesto assembling in place is on-theme — but flag the scroll-length cost to Sirio in
  the sketch, not after.

### P-5 — Scroll-driven particle flow (canvas)

- **Ref: the repo itself** — `site/main.js:73-94` (`drawDeep`), 484 stars across 3 parallax layers, offset by
  `window.scrollY * L.f`, with a `sy > vh + 4` cull. [VERIFIED: `site/main.js:83-93`]
- **Mobile cost: ALREADY PAID** — it ships today, DPR capped at 2 (`star-engine.js:13`), culled per-star.
- **Verdict:** See § D-38 Finding 0. This **already satisfies** "particles flow". No work needed.

### P-6 — Terminal / type-on

- **Ref: the repo itself** — `star-engine.js:70-96`, 8 terms, per-term gradients, `a`/`an` article logic,
  reduced-motion static fallback, `textContent` writes. [VERIFIED: `site/star-engine.js:70-104`]
- **Mobile cost: CHEAP** (text node writes, no layout beyond the line box).
- **Verdict: sketch input for METHOD only.** D-11 asks for "a few sharp declarative lines in the site's
  terse mono-label voice" — a type-on manifesto is the most obvious on-brand option and the mechanism is
  already in the codebase. **Offer it as a sketch variant (D-20); do not pick it.**

### Pattern → phase-fit summary

| # | Pattern | Reads as | Mobile cost | Verdict |
|---|---------|----------|-------------|---------|
| P-1 | SVG dashoffset draw-on | lines draw themselves | MEDIUM (paint) | Skip — superseded by scaleX (Finding 1). Reserve for Phase 2.1 |
| P-2 | Masked line reveal | text assembles | CHEAP (transform) | **ADOPT** → `kind="assemble"` |
| P-3 | Native CSS SDA | anything | NEAR-ZERO | Defer — Firefox gap, dual source of truth |
| P-4 | Sticky staged assembly | machine building itself | MEDIUM UX cost | METHOD sketch option only |
| P-5 | Canvas particle flow | particles flow | already paid | **Already shipped** |
| P-6 | Type-on | authored, terse | CHEAP | METHOD sketch option only |

---

## D-38 — The "Automation" Motion Gap: Options & Recommendation

### Finding 0 — `PROJECT.md:28` is a three-legged requirement and one leg already stands

`PROJECT.md:28`: *"things assemble, lines draw themselves, particles flow."*

| Leg | Status |
|-----|--------|
| **particles flow** | ✅ **Already shipped** — `drawDeep()`, `main.js:73-94`, scroll-parallaxed starfield [VERIFIED: `site/main.js`] |
| **lines draw themselves** | ❌ Gap — but nearly free to close (Finding 1) |
| **things assemble** | ❌ Gap — P-2 closes it |

**Planner consequence:** the gap is **two thirds of one sentence**, not a from-scratch motion system. Do not
let the plan grow a particle engine. Scope D-38 to `draw` + `assemble`.

### Finding 1 — the page already contains the lines. They just need `scaleX`.

This is the highest-leverage finding in this document. [VERIFIED: `site/styles.css:645-653`, `:953-961`, `:979-987`]

```css
/* styles.css:645 — ALREADY a 1px horizontal gradient line, one per section head */
.section__rule { flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(var(--accent),0.4), rgba(var(--accent),0)); }

/* styles.css:953 — ALREADY a 1px vertical gradient line down the Experience timeline */
.exp__spine { position: absolute; left: 8px; top: 10px; bottom: 10px; width: 1px;
  background: linear-gradient(180deg, rgba(var(--accent),0), rgba(var(--accent),.55) 16%, …); }
```

Add `transform-origin: left; transform: scaleX(0)` → `scaleX(1)` (and `top` / `scaleY` for the spine) and
the rule **draws itself across the section head** and the spine **draws itself down the timeline**. Then
`.exp__dot` (`styles.css:979`, an absolutely-positioned 9px circle with a glow) pops in with
`transform: scale(0.6)→1` *after* the spine passes it — the timeline visibly **assembles**.

- **`transform` is compositor-only** — no layout, no paint. This is the cheapest animation the web has.
- **No new markup.** No SVG. No `getTotalLength()`. No library (D-35 ✅).
- **It applies to every section already on the page** (`#work`, `#experience`, `#publications` all have a
  `.section__rule`), so D-38 is closed page-wide, not just on the two new sections.
- ⚠ **`.section__rule` is `flex: 1`** — a transform on a flex item does not disturb flex layout. Safe.

**This is the recommendation's spine. If the plan does only one thing for D-38, do this.**

### The reveal-kind vocabulary (Option B — RECOMMENDED)

One attribute, four behaviours. JS writes state; CSS owns motion.

| `data-reveal-kind` | Applies to | Mechanism | Cost |
|---|---|---|---|
| `draw` | `.section__rule`, `.exp__spine`, (later) blueprint grid | `transform: scaleX(0)→1` / `scaleY(0)→1` + `transform-origin` | **FREE** (compositor) |
| `assemble` | `h2`, mission line, About's 3 beats, METHOD's stanzas | `overflow:hidden` wrapper + inner `translateY(100%)→0` (P-2) | **CHEAP** (transform + one clip) |
| `snap` | `.exp__dot`, `.pill`, `.plate__meta` | `transform: scale(.6)→1` + opacity, short duration, slight overshoot `cubic-bezier(.34,1.56,.64,1)` | **FREE** |
| *(absent)* | everything else | V4 fade + `translateY(30px)` — **blur removed** (Pitfall 3) | **CHEAP** |

Stagger stays exactly as V4 defines it: `index × 130ms`, read from `data-reveal`. Re-arm stays exactly as
V4 defines it: replay when the element leaves the viewport. **D-35's behavioural contract is fully preserved.**

### Option comparison

| | Option A — port V4 verbatim | **Option B — V4 state machine + IO trigger + reveal-kind vocabulary** | Option C — sticky staged assembly | Option D — native CSS SDA |
|---|---|---|---|---|
| Closes D-38 / MOTION-01 as written | ❌ No — fade-up only | ✅ Yes — draw + assemble | ✅ Yes | ✅ Yes |
| Honours D-35 (no library, port V4) | ✅ | ✅ state machine, stagger, re-arm all preserved | ⚠ diverges heavily | ❌ replaces it |
| Honours D-37 (no 2nd loop, no loop reads) | ⚠ technically, but thrashes on scroll | ✅ **strictly better** — IO removes the reads entirely | ⚠ needs per-frame progress | ✅ |
| Honours D-34 (no CSS hides reveals) | ✅ | ✅ — JS still arms; see Pitfall 1 | ✅ | ❌ **CSS keyframes hide it → invisible in Firefox** |
| Mobile cost | ⚠ animated blur + N reflows/scroll | ✅ compositor-only, zero scroll reads | ⚠ page length | ✅ but Firefox needs JS anyway |
| Firefox | ✅ | ✅ | ✅ | ❌ |
| Effort | XS | **S–M** | L | M (+ full fallback) |

> **Option D is disqualified by D-34, not just by Firefox.** `animation-timeline: view()` requires
> `@keyframes { from { opacity: 0 } }` in CSS. In Firefox the timeline is ignored and the animation runs
> normally — but any `@supports`-gated variant that sets an initial hidden state in CSS is exactly the
> invisible-page landmine D-34 warns about. Flagging explicitly so nobody "modernises" into it.

### ⚠ Recommendation contains one deviation from D-35 — flagged, not silent

D-35 says *"Port it as the baseline."* Option B ports V4's **state machine, stagger, thresholds, re-arm and
reduced-motion branch verbatim** but **replaces the trigger** (`scroll` + `getBoundingClientRect()` per
element → `IntersectionObserver`) and **drops `filter: blur()`**.

Both changes sit inside **Claude's Discretion** as CONTEXT.md defines it — *"How the reveal is wired (port
`updateReveals()`, thresholds, stagger, re-arm behaviour)"*. The rationale is Pitfalls 2 and 3 below: the
V4 trigger layout-thrashes and the V4 blur is on Chrome's own do-not-animate list — and both get worse on
exactly the mid-range phone Phase 3 exists to protect. **The planner should treat this as a deliberate,
recorded deviation and name it in the plan, not absorb it quietly.**

If the planner or Sirio prefers strict D-35 fidelity: port V4 verbatim first, land it, then treat the IO
swap + blur removal as a Phase 3 (mobile pass) task. That ordering is defensible and loses nothing except
doing the work twice. **Option B in one pass is recommended.**

---

## NAV-01 — Full-Height: Recommendation

**Requirement text:** *"Immersive single-scroll home with distinct, full-height sections"* (`REQUIREMENTS.md:23`).
**Current state:** sections are padding-sized — `.section { padding: var(--pad-section) }`, `styles.css:562-566`.

### Finding — Phase 1 already solved this, on the hero, and the pattern is in the repo

```css
/* site/styles.css:164-165 — SHIPPED. Reuse this exact shape. */
min-height: max(100vh,  620px);   /* fallback for engines without svh */
min-height: max(100svh, 620px);   /* overrides where svh is supported */
```
[VERIFIED: `site/styles.css:155-165`]

Two-declaration cascade fallback, a `max()` floor so short/landscape viewports don't crush the content,
and `min-height` (a **floor**) rather than `height` (a **cage**). This is already the right answer and it is
already Phase-1-approved. **The planner should reuse it verbatim, not invent a second approach.**

### Recommendation: "distinct and immersive", enforced by a floor — on the interludes only

| Section | Full-height? | Why |
|---------|--------------|-----|
| `#top` hero | ✅ already | shipped |
| `#index` Mission | ✅ **add floor** | one big line + pills — it *wants* to be a full screen |
| **About** (new) | ✅ **add floor** | narrative interlude (D-02: unnumbered, quieter) — the pause is the point |
| `#work` | ❌ content-sized | 3 plates ≫ one viewport. A floor is a no-op here anyway |
| `#experience` | ❌ content-sized | 4 rows; the timeline reads better unbroken |
| `#publications` | ⚠ optional floor | exactly 1 row — a floor stops it looking abandoned |
| **AI / METHOD** (new) | ✅ **add floor** | narrative interlude; also the section Sirio wants to be surprised by (D-20) |
| `#contact` | ✅ **add floor** | it is the close. A short section at the page bottom reads as a truncation bug |

```css
/* proposed — mirrors styles.css:164-165 exactly */
.section--full { min-height: max(100vh,  620px);
                 min-height: max(100svh, 620px);
                 display: flex; align-items: center; }
.section--full > .section__inner { width: 100%; }   /* .section__inner is max-width:1180px; margin:0 auto */
```

`min-height` is a floor, so it **cannot clip** — if About's three beats overrun on a small phone, the section
simply grows. That is the property that makes this survive Phase 3 without a rework.

### The mobile trap, and why `svh` not `dvh`

- `100vh` resolves against the **large viewport** (browser chrome hidden). On mobile page load the chrome is
  *visible*, so a `100vh` element is taller than the visible area and **bleeds off-screen**.
  [CITED: [web.dev/blog/viewport-units](https://web.dev/blog/viewport-units)]
- `svh` / `lvh` / `dvh` are **Baseline Widely Available since June 2025** — Chrome 108+, Firefox 101+,
  Safari 15.4+, Edge 108+. [CITED: web.dev/blog/viewport-units; corroborated by search consensus]
- **`svh` — use this.** Smallest viewport, chrome visible. Fixed at load; **never reflows**.
- **`dvh` — do NOT use.** It resizes as the URL bar shows/hides, which means **a layout reflow fires during
  the exact scroll gesture that triggers reveals**. Reflow + reveal transitions + a canvas rAF loop on the
  same frames on a mid-range phone is a compounding jank failure. This is a specific, non-obvious trap for
  *this* page — most sites can afford `dvh`; a page with a live canvas loop cannot. [ASSUMED — reasoning
  from the documented reflow behaviour, not measured on device. Worth a Phase 3 check.]
- **`lvh`** — irrelevant here.

### Explicitly NOT recommended: `scroll-snap`

- `scroll-snap-type: y mandatory` on a page with **variable-height sections** (Work is ~3 viewports tall)
  traps the reader mid-section — the classic mandatory-snap failure.
- It fights momentum scrolling on iOS, and recruiters scroll fast.
- It is user-agency-hostile in a way that reads as broken, not polished — the opposite of the Core Value.
- `y proximity` is the softer variant but is inconsistently implemented and adds a variable nobody asked for.
- **NAV-01 says "distinct", not "paginated".** The `--accent` system + the floor + `scroll-margin-top: 70px`
  (`styles.css:565`) already deliver distinctness. [ASSUMED — design judgement, not a cited finding.]

---

## Content Sourcing Map

> ⚠ **Standing project landmine:** the design snapshots' copy is **fabricated** (invents roles/publications,
> omits AGC). Take structure from the design; take **every fact** from `profile.md`. This has already bitten
> twice this project (CONTEXT.md `<specifics>`). The Work/Experience/Publications sections already on the
> page were correctly written from `profile.md` in Phase 1 — match that standard.

| Beat / claim | Source | Verified |
|---|---|---|
| 5 years hands-on: mammalian cells, microbiology, fermentation, cell-free (D-04 beat 1) | `profile.md:242` — *"After five years of hands-on lab work across mammalian cells, microbiology, fermentation, and cell-free systems"* | ✅ verbatim |
| iGEM Wet Lab Lead — EndoSense (D-04 beat 1) | `profile.md:11`, `:195-204`; already on page at `index.html:255` | ✅ |
| **Repetition is the bottleneck** (D-05, the spine) | `profile.md:242` — *"What drains me is not physical work itself, but excessive repetition: running the same protocol dozens of times with limited creative input. What energizes me is the design layer"* | ✅ verbatim |
| Domain-flexible / biotech-as-edge (D-05) | `profile.md:242` — *"my deep understanding of laboratory needs … is a genuine competitive advantage"*; *"Product design is the constant; the application domain is flexible"* | ✅ verbatim |
| People / collaboration (D-05, D-07) | `profile.md:240` — *"their feedback is my primary motivator"*; `profile.md:245` — *"motivated by accountability, pushing myself to deliver exceptional work when a team is counting on me"* | ✅ |
| ⚠ **"the word ego"** | `profile.md:244` heading is literally *"Ego-Free Collaboration"* and `:245` says *"feedback is not about personal ego"*, `:392` says *"highly collaborative and ego-free"* | ⚠ **D-07 FORBIDS the word regardless.** The source uses it; **the page must not.** Use D-07's approved framing. **This is the single easiest way for a writer to violate D-07 — the temptation is right there in the source.** |
| The pivot: CAD, printed parts, automation, thesis dispenser (D-04 beat 3) | `profile.md:240`, `:378`; thesis already on page at `index.html:173-174` | ✅ |
| ⚠ **"countless late nights fixing broken lab equipment"** (D-04 beat 2) | `PROJECT.md:46` **only** — grep of `profile.md` finds no such claim | ⚠ **D-09: no profile.md backing.** Sirio declined to correct it → treat as true. **The only beat in the phase without profile grounding — do not embellish it further.** |
| **Calculator story** (D-12) | `profile.md:373` — full story verbatim: hated long calculations, teacher's warning, typed random numbers to match the back of the book, then shifted to *"analyzing and mapping out the problem first, identifying the strategy, and only then using the calculator to execute"* | ✅ verbatim — **D-15's approved draft is a faithful compression** |
| *"cum grano salis"* | `profile.md:373` uses it | ⚠ **D-13 FORBIDS it on the page.** Source uses it; page must not. Same trap shape as "ego". |
| AI philosophy / "same bottleneck one layer up" (D-16) | `profile.md:375` — *"AI is a brilliant tool to eliminate repetitive cognitive friction … entirely dependent on conscious human direction, deep underlying logic, and critical judgment. Like physical industrial automation, tools are transformative when directed by genuine understanding, but counterproductive when used blindly."* | ✅ — **`profile.md:375` already makes the lab↔AI bridge explicitly.** D-16's structural bridge is grounded, not invented |
| AI-for-documentation · AI pressure-tests design · GSD Discuss→Plan→Execute (D-17) | Sirio's own GSD deck, `https://sirsirio.github.io/thesis-tools/decks/lab-meeting-2026-06/` | ⚠ **NOT verified this session.** D-17 quotes it; the planner/executor **must open the deck and confirm the quoted language before it reaches the page.** Sirio said *"make smth up idk"* — D-17 correctly refused. **Do not soften that refusal.** |
| Contact links (D-21) | `profile.md:40-44`; `sirio.feltrin@gmail.com` already live at `index.html:306` | ✅ |

**Two source-vs-decision conflicts the planner must brief the writer on explicitly:** `profile.md` contains
both **"ego-free"** (`:244`, `:245`, `:392`) and **"cum grano salis"** (`:373`). The rule "every fact from
profile.md" collides head-on with D-07 and D-13 here. **The decisions win.** Both are *phrasing* bans, not
*content* bans — the collaboration thread and the AI philosophy both stay; only the words go.

---

## Where Changes Land in `site/`

> All paths relative to `D:/06. Job & Applications/05_Portfolio/`. ⚠ `site/`, **not** `app/`.

### `site/index.html`

| Change | Location | Notes |
|---|---|---|
| **About section** (CONT-01) | insert between `</section>` of `#index` (`:143`) and `<!-- 01 SELECTED WORK -->` (`:145`) | needs `id`, `class="section section--full"`, `.section__label`, **no** `.section__numeral` (D-02), `.section__blob` with `data-para`, 3 beats each `[data-reveal="0|1|2"] [data-reveal-kind="assemble"]` |
| **AI/METHOD section** (CONT-03) | insert between `</section>` of `#publications` (`:294`) and `<!-- 04 CONTACT -->` (`:296`) | same shape; **UI/animation from `/gsd-sketch` (D-20) — the plan must not fix it** |
| **Contact links** (CONT-04) | extend `index.html:305-307` | add LinkedIn / GitHub / iGEM wiki beside the existing `mailto:`. **Every one needs `target="_blank" rel="noopener"`** — match `.nav__link` at `:33-34` |
| **GSD deck link** (D-18) | inside the new AI section | `target="_blank" rel="noopener"` |
| ⚠ **Un-nest `.section__head` reveals** | `:158-161`, `:230-233`, `:282-285` | Move `data-reveal="0"` **off** `.section__head` and **onto its two children** (`.section__label`, `.section__rule`) so `.section__rule` can carry `data-reveal-kind="draw"` as a **sibling**, not a nested reveal. See Pitfall 5. |
| ⚠ **Un-nest `.exp` reveals** | `:235-265` | Move `data-reveal="1"` off `.exp`; give `.exp__spine` `data-reveal="1" data-reveal-kind="draw"` and each `.exp__row` its own index (2,3,4,5). Enables the timeline-assembles read. Same nesting rule. |
| Composite media slot (D-29) | `:183` `<figure>` on plate 002 | ⚠ **deliberate MEDIA-01 deviation** — name it in the plan |
| `.section--full` class (NAV-01) | `#index` (`:124`), About, AI, `#contact` (`:300`) | + optionally `#publications` |

### `site/styles.css`

| Change | Location | Notes |
|---|---|---|
| **Two new palette stops** (D-03) | `:12-17`, beside `--star-sirius`… | bare `R,G,B` triplets. ⚠ These intentionally **diverge from `PAL`** (`star-engine.js:4-10`) — see Pitfall 7 |
| **Accent map entries** for About + AI | `:572-590`, beside `#index { --accent: … }` | ⚠ **Omitting these silently breaks the whole section** — Pitfall 6 |
| `.section--full` | near `.section` (`:562`) | reuse the `vh`-then-`svh` cascade from `:164-165` verbatim |
| **Reveal CSS** (the whole vocabulary) | **new block**, near the reduced-motion block (`:1150`) | ⚠ **must key off `[data-rev-state]`, NEVER off the bare reveal attribute** — Pitfall 1 |
| `.section__rule` / `.exp__spine` / `.exp__dot` transform-origins | `:645`, `:953`, `:979` | add `transform-origin`; the `transform` values live in the reveal block |
| Blueprint plate + composite (D-28/D-29) | near `.media-slot` (`:922`) | new CSS — the acknowledged MEDIA-01 deviation |
| Reduced-motion block | `:1156` — **already exists** | ⚠ **Do not add a second `prefers-reduced-motion` query** (D-36) |

### `site/main.js`

| Change | Location | Notes |
|---|---|---|
| `initReveals()` — arm + observe | new function, **beside `applyPara()`** (`:100-111`) | IntersectionObserver. **No rAF loop** (D-37 ✅). Called from `boot()` (`:182`) |
| **Nothing added to `loop()`** | `:158-163` | ⚠ **D-37: do not touch this function.** Reveals are observer-driven |
| **Nothing added to `onScroll()`** | `:165-169` | With IO, `onScroll` needs **no** reveal call at all — strictly less scroll work than today |
| `REDUCED` import | `:11` — **already imported** | reuse (D-36) |

### `site/star-engine.js`

**No changes.** `01-PATTERNS.md:354` — *"DO NOT REWRITE"*. `REDUCED` and `PAL` are consumed, not edited.
⚠ Adding the two new stops (D-03) to `PAL` would change the deep field's tint distribution across the whole
page. **Do not.** See Pitfall 7.

### Asset work (D-31)

`Opentrons-OT2 DALSA media/TimelapseOT2.mp4` → re-encode → `site/assets/media/`. ffmpeg is **available**
(§ Environment Availability). Pair with a `poster` per `site/assets/media/README.md`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| Knowing when an element enters the viewport | a `scroll` handler calling `getBoundingClientRect()` per element (**what V4 does**) | `IntersectionObserver` | Browser resolves geometry in its own layout phase and batches callbacks — **no forced synchronous layout**. [CITED: [webperf.tips/tip/layout-thrashing](https://webperf.tips/tip/layout-thrashing/)] |
| Splitting a paragraph into animatable lines | Splitting.js / SplitText / a manual `Range` line-measurement routine | **author the lines as separate elements** | D-04 (3 beats) and D-15 (5 stanzas) are *already* discrete. Runtime splitting is reflow-dependent, breaks on resize/font-swap, and needs a re-split listener. Also: a library violates D-35. |
| Full-height sections on mobile | the `--vh: window.innerHeight * 0.01` JS hack | `min-height: max(100svh, 620px)` with a `100vh` fallback line | Baseline Widely Available since Jun 2025. The JS hack needs a resize listener → more scroll-time work on the exact device it's meant to help. **Phase 1 already shipped the CSS form at `styles.css:164-165`.** |
| Reduced-motion detection | a second `matchMedia('(prefers-reduced-motion: reduce)')` | `REDUCED` from `star-engine.js:12` + the CSS block at `styles.css:1156` | D-36 — two sources of truth drift |
| Scroll smoothing | Lenis / ScrollSmoother / Locomotive | `html { scroll-behavior: smooth }` — **already at `styles.css:51`** | D-35 bans motion libraries. Smooth-scroll libraries also hijack native scroll, break `scroll-margin-top` anchoring (`styles.css:565`), and fight the reduced-motion block |
| Easing curves / durations in JS strings | `el.style.transition = 'opacity 1s ease ' + d + 'ms…'` (**what V4:566 does**) | a CSS block keyed on `[data-rev-state]`; JS writes only the state + a `--rev-delay` custom property | Keeps MOTION-02 free (the `styles.css:1156` block can reach CSS transitions; it cannot reach a JS string) |

**Key insight:** every "don't" in this table is something the **V4 snapshot actually does**. D-35 tells us to
port V4 — correctly, because its *behaviour* (stagger, re-arm, reduced-motion) is the approved design. But V4
was authored as a standalone design-tool artefact, not as production code for a mid-range phone. **Port the
behaviour; do not port the plumbing.** That distinction is the whole judgement call of this phase.

---

## Common Pitfalls

### Pitfall 1 — The invisible page (D-34), and its NEW IntersectionObserver variant

**What goes wrong:** any CSS rule that hides `[data-reveal]` before/without JS ships a fully invisible page
to every visitor. `styles.css:550-555` carries a loud warning; the verification gate **greps this file for
the literal bracketed selector**, which is why the warning is written without it.

**The new variant:** IntersectionObserver is *more* async than a scroll handler. If the plan "modernises" by
putting `opacity: 0` in CSS and letting IO reveal, then **any** JS failure (module 404 on Pages, a syntax
error, an old browser) = blank page. The V4 design's real insight is not the fade — it is that **the code
that hides is the same code that shows**. Preserve that invariant exactly.

**How to avoid:**
- JS arms (`opacity:0`) and observes in the **same synchronous pass**. No CSS hiding rule, ever.
- CSS may only style `[data-rev-state="hidden"]` / `[data-rev-state="shown"]` — attributes **JS creates**.
  If JS never runs, the attribute never exists, no rule matches, page renders normally. ✅ D-34 satisfied.
- **Warning sign:** any diff to `styles.css` containing the bracketed reveal selector without `rev-state`.

### Pitfall 2 — V4's `updateReveals()` layout-thrashes (the reason for the IO swap)

**What goes wrong:** `V4:560-597` loops every `[data-reveal]` element and, per element, **writes styles then
reads `getBoundingClientRect()`** (`:569`, `:587`) — inside a `scroll` handler that fires ~once per frame.
Read-after-write forces the browser to flush layout **synchronously, per element**. With ~20 reveal elements
that's ~20 forced reflows per scroll event, on a page that is *also* running a canvas rAF loop.

**Why it happens:** the design file was authored standalone in a design tool where it looked fine on a
desktop GPU. `applyPara()` (`main.js:100-111`) has the same shape but is bounded (few elements) and its
±400px cull sits **after** the rect read — the cull saves the *write*, not the *read*.

**How to avoid:** IntersectionObserver. The browser computes intersection during its own layout phase and
calls back only on threshold crossings. **And**: never call `getBoundingClientRect()` *inside* the IO
callback — that reintroduces the exact reflow you removed. Use `entry.isIntersecting` /
`entry.boundingClientRect`, which are pre-resolved and free.
[CITED: [webperf.tips/tip/layout-thrashing](https://webperf.tips/tip/layout-thrashing/); corroborated by
[sujeet.pro/articles/intersection-observer](https://sujeet.pro/articles/intersection-observer)]

**Warning signs:** `getBoundingClientRect` appearing anywhere in a scroll handler or an IO callback in the diff.

### Pitfall 3 — V4 animates `filter: blur(10px)` — Chrome says don't

**What goes wrong:** `V4:575/583` sets `filter: blur(10px)` and `:593` transitions it to `blur(0)` over 1s on
**every reveal element**, staggered 130ms apart so several overlap. Blur is a convolution: every output pixel
samples many input pixels. Chrome's own guidance: *"Running an expensive GPU operation every frame can blow
the 16ms frame budget"* and *"don't animate the blur value directly."*
[CITED: [developer.chrome.com/blog/animated-blur](https://developer.chrome.com/blog/animated-blur)]

**Why it matters here specifically:** the recommended blur workaround (pre-render blurred copies, cross-fade)
costs more complexity than the effect is worth, **and** the page already spends GPU budget on two canvases +
a `backdrop-filter: blur(3px)` glass disc in the star. Phase 3 is the mobile pass; do not hand it a
self-inflicted regression.

**How to avoid:** **drop the blur.** `assemble` (masked slide) and `draw` (scaleX) read as *more* deliberate
than blur-fade, at ~zero cost. This also lets you drop V4's `setTimeout(…, 1700 + d)` at `:594`, whose
purpose is to clear the lingering `filter`/`transform`.

**⚠ Related landmine the setTimeout exists to dodge:** a non-`none` `filter` or `transform` on an element
makes it a **containing block for `position: fixed` descendants**. The nav becomes `position: fixed` when
docked (`main.js:117`, `.nav--docked`). It lives inside `[data-hero]`, which has no `data-reveal` — so it is
safe **today**. **Never put `[data-reveal]` on an ancestor of a `position:fixed` element.** If a future
section wraps anything fixed, this breaks silently and looks like a scroll bug.

### Pitfall 4 — Reaching for a text-splitting library

**What goes wrong:** every Codrops line-reveal tutorial (P-2) uses GSAP SplitText or Splitting.js. Importing
one violates D-35, and runtime splitting is reflow-fragile: it breaks on resize, on font swap (this page loads
three Google fonts, and `main.js:206` already gates boot on `document.fonts.ready` precisely because of
metric shifts), and needs a re-split listener.

**How to avoid:** author the lines as elements. D-04 gives 3 paragraphs; D-15 gives 5 stanzas. The `h2`s are
1–3 words. **We never need to split anything.** State this in the plan so it isn't rediscovered.

**Warning sign:** any new dependency, or any `element.textContent.split('')` in the diff.

### Pitfall 5 — Nested `[data-reveal]` compounds opacity and eats the child's motion

**What goes wrong:** `updateReveals()` selects **all** `[data-reveal]` and treats each independently — it has
**no nesting awareness**. A reveal inside a reveal: opacity multiplies (0 × anything = 0), so the child's
transition runs to completion *while the parent is still at opacity 0*. The child then "appears" with no
motion. Silent, and looks like a random inconsistency.

**Where it bites:** `.section__rule` is a child of `.section__head`, which currently **is** `[data-reveal="0"]`
(`index.html:158`). Giving the rule a `draw` kind in place creates exactly this nest. Same for `.exp__spine` /
`.exp__row` inside `.exp` (`index.html:235`).

**How to avoid:** the un-nesting edits in § Where Changes Land — move `data-reveal` **down** from the container
onto its children so all reveals are **siblings**. Mechanical, but it must be in the plan or the draw effect
will be built and appear not to work.

### Pitfall 6 — A new section without an accent-map entry fails silently and completely

**What goes wrong:** `--accent` is defined **per section id** at `styles.css:572-590`. Every piece of section
furniture reads `rgba(var(--accent), α)`. If About/AI get a `class="section"` but **no `#about { --accent: … }`
entry**, `var(--accent)` is unresolved → `rgba(, 0.4)` is an **invalid declaration** → the browser drops it.
Result: labels, rules, blobs and numerals are all **transparent**. No console error. The section looks half-built.

**How to avoid:** the accent-map entry is a **required task**, not a styling nicety. Verify:
`getComputedStyle(document.querySelector('#about')).getPropertyValue('--accent')` returns a triplet.

### Pitfall 7 — "Fixing" the palette divergence by editing `star-engine.js`'s `PAL`

**What goes wrong:** D-03's two new stops go in `:root` (`styles.css:12-17`). They will **not** be in
`PAL` (`star-engine.js:4-10`), and they will **not** be in the `.grad` mission gradient (which hard-codes the
four stops). A tidy-minded contributor "fixes" this by adding them to `PAL`. `PAL` is consumed by `tintAt()`,
which colours **all 484 deep-field stars** (`main.js:91`) — so this silently re-tints the entire page
background and changes the approved hero composition.

**How to avoid:** `PAL` is the **deep-field star spectrum**. The CSS stops are the **section accent palette**.
They overlap by coincidence of design, not by contract. `01-PATTERNS.md:354` already says do not rewrite the
engine. **The divergence is intentional — comment it at `styles.css:12-17` so it survives.**

Related, already-flagged: `--gold-glow (255,196,110)` is the **hero star**; `--star-antares (244,182,89)` is
the **Work section**. Two different golds (`styles.css:19-22`). Neither new stop may be either.

### Pitfall 8 — Writing "ego" or "cum grano salis" because `profile.md` says them

Covered in § Content Sourcing Map. Restated here because it is the **highest-probability content failure** in
this phase: the rule is "every fact from `profile.md`", and `profile.md` contains both banned phrasings
(`:244`, `:245`, `:392`, `:373`) *in exactly the passages the writer must draw from*. D-07 and D-13 win.

### Pitfall 9 — Shipping 6.66MB of autoplaying video (D-31)

Already decided; restated as an ordering constraint. `TimelapseOT2.mp4` is **6,656,975 bytes**
[VERIFIED: `ls -la "Opentrons-OT2 DALSA media/"`]. The re-encode must land **before or with** the composite
slot task, or the phase ships a home page that autoplays 6.66MB to a recruiter on cellular. Always pair with
`poster` per `site/assets/media/README.md`.

---

## Code Examples

> Shapes, not final code. Values follow V4's approved contract (D-35).

### The reveal — JS owns state only (`site/main.js`, beside `applyPara()`)

```js
/* MOTION-01. Observer-driven, NOT loop-driven — D-37: the rAF loop at :158 is
   untouched and onScroll() gains nothing.

   D-34 INVARIANT: the code that hides is the code that shows. Arming happens
   here, in JS. styles.css must contain NO rule that hides the reveal attribute
   — only rules keyed on [data-rev-state], an attribute this function creates.
   If this module fails to load, nothing is hidden and the page renders fully. */
function initReveals() {
  const els = document.querySelectorAll('[data-reveal]');

  /* D-36 / MOTION-02: reuse REDUCED (star-engine.js:12). Mirrors V4:564 —
     mark shown, never touch style, never observe. No second media query. */
  if (REDUCED) {
    for (const el of els) el.dataset.revState = 'shown';
    return;
  }

  /* Arm. V4:565 — stagger is index x 130ms, handed to CSS as a custom property
     so easing and duration stay in styles.css where the reduced-motion block
     at :1156 can reach them. */
  for (const el of els) {
    el.style.setProperty('--rev-delay', (parseInt(el.dataset.reveal, 10) || 0) * 130 + 'ms');
    el.dataset.revState = 'hidden';
  }

  /* V4:588 fires at top < vh * 0.9 -> rootMargin bottom -10%.
     V4:570 re-arms at 60px clear -> that is the isIntersecting=false edge. */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      /* Never call getBoundingClientRect() here — Pitfall 2. entry fields are
         already resolved by the browser's own layout pass and are free. */
      e.target.dataset.revState = e.isIntersecting ? 'shown' : 'hidden';
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });

  for (const el of els) io.observe(el);
}
```

> ⚠ **IO fires an initial callback for every observed element on the next frame.** Elements already in view
> at load reveal immediately — correct, and it preserves V4's behaviour (V4 reveals on the first
> `updateReveals()` call too). Elements above the viewport at load (e.g. after a hash-link jump) arrive
> `isIntersecting: false` and stay armed until scrolled to — also matching V4's re-arm semantics.

### The reveal vocabulary — CSS owns all motion (`site/styles.css`, near `:1150`)

```css
/* MOTION-01 — the reveal vocabulary.
   ⚠ EVERY selector below is keyed on [data-rev-state], which main.js creates.
   NEVER key one on the bare reveal attribute — that is the invisible page (D-34).

   Durations/easings live here on purpose: the prefers-reduced-motion block at
   :1156 flattens transition-duration globally, so MOTION-02 costs nothing (D-36). */

[data-rev-state] {
  transition:
    opacity   1s ease var(--rev-delay, 0ms),
    transform 1s cubic-bezier(0.22, 1, 0.36, 1) var(--rev-delay, 0ms);  /* V4:566 */
}

/* default kind — V4's fade-up, with filter: blur() REMOVED (Pitfall 3). */
[data-rev-state='hidden'] { opacity: 0; transform: translateY(30px); }   /* V4:574 */
[data-rev-state='shown']  { opacity: 1; transform: none; }

/* kind: draw — D-38's "lines draw themselves". transform is compositor-only:
   no layout, no paint. .section__rule (:645) and .exp__spine (:953) are already
   1px gradient lines — this needs no new markup and no SVG. */
[data-reveal-kind='draw'] { transform-origin: left center; }
[data-reveal-kind='draw'][data-rev-state='hidden'] { opacity: 1; transform: scaleX(0); }
[data-reveal-kind='draw'][data-rev-state='shown']  { opacity: 1; transform: scaleX(1); }
.exp__spine[data-reveal-kind='draw'] { transform-origin: center top; }
.exp__spine[data-reveal-kind='draw'][data-rev-state='hidden'] { transform: scaleY(0); }
.exp__spine[data-reveal-kind='draw'][data-rev-state='shown']  { transform: scaleY(1); }

/* kind: assemble — D-38's "things assemble" (P-2). The element is the clipping
   frame; its child slides up from behind the edge. Needs ONE wrapper span in
   the markup — and no splitting library, because D-04/D-15 lines are already
   discrete elements (Pitfall 4). */
[data-reveal-kind='assemble'] { overflow: hidden; opacity: 1; }
[data-reveal-kind='assemble'] > * { display: block; transition: transform 1s cubic-bezier(0.22,1,0.36,1) var(--rev-delay, 0ms); }
[data-reveal-kind='assemble'][data-rev-state='hidden'] > * { transform: translateY(100%); }
[data-reveal-kind='assemble'][data-rev-state='shown']  > * { transform: translateY(0); }

/* kind: snap — the .exp__dot pops after the spine draws past it. */
[data-reveal-kind='snap'] { transition-duration: 0.45s; }
[data-reveal-kind='snap'][data-rev-state='hidden'] { opacity: 0; transform: scale(0.6); }
[data-reveal-kind='snap'][data-rev-state='shown']  { opacity: 1; transform: scale(1);
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
```

### NAV-01 full-height floor (`site/styles.css`, near `:562`)

```css
/* NAV-01. Reuses the exact cascade Phase 1 shipped on the hero (:164-165):
   the vh line is the fallback; the svh line overrides where supported.
   min-height is a FLOOR, not a cage — content that overruns simply grows,
   which is what makes this survive the Phase 3 mobile pass unchanged.
   ⚠ dvh is deliberately NOT used: it reflows as the URL bar hides, i.e. during
   the exact scroll that fires reveals, on top of a live canvas loop. */
.section--full {
  min-height: max(100vh, 620px);
  min-height: max(100svh, 620px);
  display: flex;
  align-items: center;
}
.section--full > .section__inner { width: 100%; }   /* .section__inner is max-width:1180px; margin:0 auto */
```

### D-31 video re-encode (ffmpeg verified available)

```bash
# 720x1280 H.264, 16.9s, 30fps, 6.66MB -> target <2MB, no visible loss.
# CRF 28 + preset slow + 30fps cap; -movflags +faststart so it streams
# progressively rather than needing the whole file before first frame.
ffmpeg -i "Opentrons-OT2 DALSA media/TimelapseOT2.mp4" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -an \
  -movflags +faststart site/assets/media/ot2-timelapse.mp4

# Poster — mandated by site/assets/media/README.md, always.
ffmpeg -i "Opentrons-OT2 DALSA media/TimelapseOT2.mp4" -ss 00:00:02 -frames:v 1 \
  site/assets/media/ot2-timelapse-poster.jpg
```
`-an` drops audio (a silent timelapse — free bytes). Verify the result is <2MB and eyeball a frame before
committing. **Phase 4 owns the formal MEDIA-02 pass — do not build a pipeline here (D-31).**

---

## Sketch Input for METHOD (D-20) — input only, NOT a recommendation

> ⚠ **The METHOD section's UI/animation is explicitly NOT Claude's discretion.** Sirio: *"for the ui and
> animation, for this section you can surprise me. I think I would like to have some /gsd-sketch versions."*
> The list below exists so `/gsd-sketch` has grounded, costed raw material. **The plan must not pick one.**

| Direction | Mechanism (all in-repo, no library) | Mobile cost | Note for the sketch |
|---|---|---|---|
| **Type-on manifesto** | reuse the typewriter shape at `star-engine.js:70-96` (`textContent`, article logic, reduced-motion fallback) | CHEAP | Most on-brand; mechanism already exists and is proven |
| **Stanza assemble** | the `assemble` kind (P-2), one stanza per beat, 130ms stagger | CHEAP | Consistent with the rest of the page — which is either a virtue or too quiet for the section Sirio wants to be surprised by |
| **Sticky staged reveal** | P-4 — pinned section, 5 stanzas resolve over scroll progress | MEDIUM **UX** cost | Most dramatic. ⚠ Lengthens the page — surface that tradeoff to Sirio *in the sketch*, not after |
| **Calculator / keypad motif** | D-12's story is literally about a calculator; a 7-segment or keypad type-on | CHEAP–MEDIUM | Highest concept-fit, highest gimmick risk. Sirio rejects clichés (D-07) — the sketch is the right place to test it |
| **Terminal / Discuss→Plan→Execute** | D-17 mandates the GSD framework in the copy; three states drawing in sequence (`draw` kind) | CHEAP | Ties D-17's required content to D-38's required motion — the only option where one mechanism serves both |

Constraints every sketch must respect: **no Latin** (D-13) · **manifesto form, not named principles** (D-11) ·
philosophy-first, site-as-evidence late and understated (D-10) · must carry D-17's four mandated contents ·
must honour `REDUCED` (D-36) · no library (D-35).

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact on this phase |
|---|---|---|---|
| `scroll` listener + `getBoundingClientRect()` per element | `IntersectionObserver` | Baseline since ~2019 | **Direct** — the V4 baseline (D-35) uses the old approach. Pitfall 2 |
| `--vh` JS hack (`innerHeight * 0.01`) for full-height | `svh` / `lvh` / `dvh` units | **Baseline Widely Available Jun 2025** | **Direct** — NAV-01. Phase 1 already adopted it at `styles.css:164-165` |
| JS-library scroll animation (GSAP/ScrollTrigger/AOS) | vanilla IO + CSS transitions; CSS SDA where supported | ongoing | **Confirms D-35** — a library is not needed for anything this phase does |
| `:empty` for empty-slot detection | `:has()` | Baseline Dec 2023 | Already adopted Phase 1 (`.media-slot`); relevant to D-29's composite |
| `filter: blur()` transitions as the reveal idiom | masked slide / clip reveal | ~2022 onward | **Direct** — Pitfall 3 |

**Deprecated / outdated for this phase:**
- **ScrollMagic** — its SVG-drawing example still ranks in search results; the project is effectively
  unmaintained and it is a motion library (D-35 ✗). Do not follow those tutorials' plumbing.
- **`animation-timeline` as a primary mechanism** — not deprecated, *not yet arrived*. Firefox blocks Baseline
  as of Sep 2025 (10 months and counting). Revisit post-Firefox.

---

## Package Legitimacy Audit

**This phase installs ZERO external packages.** D-35 forbids motion libraries; § Don't Hand-Roll rules out
text-splitting libraries; the site is dependency-free vanilla ES modules on GitHub Pages
(`index.html:320` — `<script type="module" src="./main.js">`, no bundler, no `package.json` in `site/`).

| Package | Registry | Verdict | Disposition |
|---------|----------|---------|-------------|
| *(none)* | — | — | — |

**Packages removed due to [SLOP] verdict:** none — none were recommended.
**Packages flagged as suspicious [SUS]:** none.

> ⚠ **Planner guard:** if any plan task introduces a dependency (GSAP, Lenis, Splitting.js, AOS,
> ScrollMagic, Framer Motion), that task **contradicts D-35** and must be rejected, not audited. The correct
> response is escalation to Sirio, not a `checkpoint:human-verify`.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| **ffmpeg** | D-31 video re-encode (6.66MB → <2MB) | ✅ | `2023-06-19-git-1617d1a752-full_build` (gyan.dev) | — |
| **ffprobe** | verifying the re-encode | ✅ | bundled with the above | — |
| **node** | `gsd-tools`, local static serve | ✅ | v24.14.1 | — |
| `TimelapseOT2.mp4` | D-29/D-30 composite | ✅ | 6,656,975 bytes, `Opentrons-OT2 DALSA media/` | — |
| 4 CAD renders (D-25) | D-28 blueprint plate | ✅ | alpha verified per D-25 | — |
| Dispenser + EndoSense media (D-32) | Work plates 001/003 | ❌ | — | ✅ **labelled placeholders stay** — MEDIA-01 guarantees no re-engineering; does **not** block the phase |
| GSD deck (D-18 link target) | D-17 content, D-18 link | ⚠ **not opened this session** | — | ❌ **none — see Open Questions Q1** |
| Browser build/bundler | — | **n/a** | — | none needed — static ES modules |

**Missing dependencies with no fallback:** the **GSD deck's actual content** (Q1). Everything else is
available or has an accepted fallback.

**Missing dependencies with fallback:** Dispenser + EndoSense media → placeholders (D-32, explicit).

---

## Security Domain

`security_enforcement: true`, `security_asvs_level: 1` (`.planning/config.json:46-47`).
Context: **static site, GitHub Pages, no server, no auth, no user input, no data store** (`PROJECT.md:37`).

### Applicable ASVS categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | **no** | no auth surface exists |
| V3 Session Management | **no** | no sessions, no cookies, no storage |
| V4 Access Control | **no** | all content is public by design |
| V5 Input Validation | **no** | ⚠ **This phase adds zero input fields.** Contact is `mailto:` + anchors (D-21/D-24). The AI Concierge (ASKAI-*, **Phase 6**) is the phase that introduces an input surface — **do not conflate it with CONT-03** |
| V6 Cryptography | **no** | nothing to encrypt; no keys client-side (`PROJECT.md:37`) |
| V5.3 Output Encoding | **yes** | see below — the one live control |

### Threat patterns for this stack

| Pattern | STRIDE | Standard Mitigation | Status this phase |
|---------|--------|---------------------|-------------------|
| **Reverse tabnabbing** via `target="_blank"` | Tampering | `rel="noopener"` on every outbound link | ⚠ **ACTIVE — CONT-04 adds 4 new outbound links** (LinkedIn, GitHub, iGEM wiki, GSD deck). `01-PATTERNS.md:379-386`: `noopener` is present on **every** external link in both design files and in shipped `index.html:33-34,204,288`. **Match it.** Modern browsers imply `noopener` for `target=_blank`, but the explicit attribute is the shipped pattern and the audit gate |
| **DOM XSS via `innerHTML`** | Tampering | `textContent` only | ⚠ **ACTIVE if METHOD uses a type-on** (D-20 sketch option). `star-engine.js:103-104` uses `textContent` — `01-PATTERNS.md:366-368`: *"'Improving' it to `innerHTML` adds an injection sink for free."* All content is author-controlled, so exploitability is ~nil, but the pattern must hold |
| Supply-chain / dependency compromise | Tampering | no dependencies | ✅ zero packages (§ Package Legitimacy Audit). D-35's no-library rule is, incidentally, the strongest security control in the phase |
| Third-party script injection | Tampering | only Google Fonts (`index.html:9-12`, shipped, `crossorigin`) | ✅ unchanged — this phase adds no `<script src>` |
| Email harvesting | Information Disclosure | obfuscation | ⛔ **Not mitigated, deliberately.** `sirio.feltrin@gmail.com` is plaintext at `index.html:306`, locked by D-21/D-24, and is the *profile* address not the account address. A portfolio that hides its email defeats its purpose |
| Outbound link → third-party content | — | `rel="noopener"` + Sirio controls the targets | ⚠ **D-23: someone must look at `github.com/SirSirio` before this ships.** A sparse profile undercuts the "I build things" claim. Reputational, not security, but it is a **pre-launch gate** and belongs in the plan as a `checkpoint:human-verify` |

**No HIGH findings. Nothing blocks planning** (`security_block_on: high`).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `dvh`'s URL-bar reflow will measurably compound with the canvas rAF loop on a mid-range phone | NAV-01 | LOW — recommendation is `svh` either way; `svh` is correct even if the compounding is negligible. Verify in Phase 3 |
| A2 | ~20 `[data-reveal]` elements × forced reflow per scroll event is a *perceptible* mobile regression | Pitfall 2 | LOW — the layout-thrash mechanism is cited and real; only the *perceptibility* is unmeasured. The IO fix is cheaper than measuring |
| A3 | `scroll-snap` would be user-hostile on this page | NAV-01 | LOW — design judgement. If Sirio wants snap, it is his call; flag the variable-height problem first |
| A4 | The `assemble` kind's `overflow: hidden` won't clip the glow/`box-shadow` of any element it wraps | Code Examples | ⚠ **MEDIUM — REAL.** `.exp__dot` has `box-shadow: 0 0 14px` (`styles.css:987`); `.section__label` sits on accent glow. **An `assemble` wrapper around a glowing element will clip the glow.** Apply `assemble` to **text blocks only**; use `snap`/default for anything with a shadow. **Verify on the first render** |
| A5 | 130ms stagger + 1s duration still read well when the motion is slide/draw rather than fade | D-38 | LOW — V4's approved values; a draw may want to be faster. Tune on the rendered result (Sirio steers by reacting — CONTEXT `<specifics>`) |
| A6 | ffmpeg CRF 28 reaches <2MB with no visible loss on this clip | Code Examples | LOW — verify with ffprobe; adjust CRF. D-31 explicitly says don't over-engineer |
| A7 | The two new palette stops (D-03) can sit "natively in the existing spectrum" without a PAL edit | Pitfall 7 | LOW — CSS accents and `PAL` are already decoupled by design (`--gold-glow` ≠ `--star-antares` proves it) |
| A8 | `#publications` benefits from a full-height floor | NAV-01 | LOW — marked optional; a render decides it |

**Every `[ASSUMED]` above is either a tuning value or a render-time visual call.** None gates planning.
**A4 is the one to actually watch** — it is a real clipping interaction, not a hypothetical.

---

## Open Questions

1. **The GSD deck's actual content (D-17/D-18) — the only real blocker.**
   - *What we know:* D-17 quotes it (*"Turns concepts into live tools and captures the whole process as
     presentable text"*, *"Discusses each design decision, models the physics, and processes the experimental
     results"*) and D-18 links it: `https://sirsirio.github.io/thesis-tools/decks/lab-meeting-2026-06/`.
   - *What's unclear:* **I did not open it this session.** The quotes come from CONTEXT.md, which sourced them
     from Sirio during discussion. They are almost certainly right.
   - *Why it matters:* Sirio said *"make smth up idk"* about the AI-weak-points claim and D-17 correctly
     refused, grounding it in the deck instead. **If the deck doesn't say what D-17 says it says, the
     refusal silently becomes a fabrication** — the exact standing landmine CONTEXT `<specifics>` describes,
     and it has already bitten twice.
   - *Recommendation:* **the plan must include a task to open the deck and verify the quoted language before
     it reaches the page.** Also confirm the URL 200s — it is a live outbound link (D-18).

2. **METHOD's treatment is undecided by design (D-20) — a planning-order constraint, not a gap.**
   - *Recommendation:* the plan must **not** fix METHOD's UI. Either run `/gsd-sketch` before planning, or
     structure the plan so the METHOD markup/CSS task is explicitly gated on Sirio's sketch choice. The
     *content* (D-15's draft) and the *section shell* (accent, label, floor) can be planned now; the
     *treatment* cannot. § Sketch Input exists to feed that, not replace it.

3. **D-27 — the renders' baked-in light-blue-grey shadows on a dark ground.**
   - *What we know:* ~`167,196,225` @ ~24% alpha, authored for light backgrounds; on dark they render as a
     faint **halo**. Sirio reports they looked fine on a dark presentation background.
   - *What's unclear:* whether it reads as on-theme glow or a dirty edge in *this* composition.
   - *Recommendation:* **not resolvable by research — it needs eyes on a render.** Plan a visual check after
     the first composite renders. The blueprint plate (D-28) may make it read as intentional.

4. **Sequencing About vs. the motion vocabulary.**
   - *What's unclear:* which lands first.
   - *Recommendation:* **motion vocabulary first, on the four existing sections.** They already carry inert
     `[data-reveal]` and a `.section__rule`, so the vocabulary is testable **immediately** with zero new
     content. Building About first means writing markup against a reveal contract that doesn't exist yet, then
     debugging content and motion together. **Order: (1) reveal engine + kinds → (2) un-nest existing reveals
     + `draw`/`snap` on rule/spine/dot → (3) NAV-01 floors → (4) About → (5) Contact links → (6) media/composite
     → (7) METHOD, gated on the sketch.**

---

## Sources

### Primary (HIGH confidence — read directly from disk this session)
- `site/main.js` — rAF loop `:158-163`, `applyPara` `:100-111`, `drawDeep` `:73-94`, `REDUCED` import `:11`, `boot` `:182-202`
- `site/styles.css` — tokens `:12-40`, **hero `svh` cascade `:164-165`**, reveal warning `:550-555`, accent map `:562-590`, `.section__rule` `:645`, `.exp__spine` `:953`, `.exp__dot` `:979`, reduced-motion `:1156`
- `site/index.html` — full read; section structure, `[data-reveal]` placement, `rel="noopener"` pattern `:33-34`
- `site/star-engine.js` — `PAL` `:4-10`, **`REDUCED` `:12`**, `DPR` `:13`
- `design/Sirio V4 - Deep Field x Hyperlight.dc.html:552-597` — **`updateReveals()`**, read verbatim
- `.planning/phases/01-the-design-build/01-PATTERNS.md` — full read (do-not-port `:185`, engine `:354`, link safety `:379`, reveal landmine `:347-350`)
- `.planning/phases/02-the-story/02-CONTEXT.md` — full read
- `../00_Profile/profile.md:240-248`, `:365-392` — philosophy + calculator story
- `.planning/PROJECT.md:24,28,46,48` · `.planning/REQUIREMENTS.md:23,38-52,111-119` · `.planning/config.json`
- `ffmpeg -version`, `ls -la "Opentrons-OT2 DALSA media/"` — environment probes

### Secondary (MEDIUM confidence — official docs / vendor engineering guidance, fetched or search-returned)
- [MDN — CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [MDN — stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset)
- [web-features explorer — scroll-driven animations support](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/) — **fetched**; Firefox-blocked since Sep 2025
- [web.dev — The large, small, and dynamic viewport units](https://web.dev/blog/viewport-units)
- [Chrome for Developers — Animating a blur](https://developer.chrome.com/blog/animated-blur)
- [Chrome for Developers — Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [WebKit — A guide to Scroll-Driven Animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)
- [webperf.tips — Layout Thrashing and Forced Reflows](https://webperf.tips/tip/layout-thrashing/)
- [Opentrons — Trademarks](https://opentrons.com/trademarks) — **fetched** (R-02)
- [Embi Tec — RunOne Electrophoresis System](https://embitec.com/pages/runone-electrophoresis) (R-02)

### Tertiary (LOW confidence — technique references, useful as galleries/illustrations, not as authority)
- [scroll-driven-animations.style](https://scroll-driven-animations.style/) — Bramus (Chrome DevRel) demo gallery; **hand-written HTML/CSS/JS, no framework — view-source is the tutorial**
- [Codrops — Making Stagger Reveal Animations for Text](https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/)
- [Codrops — Experimental On-Scroll Text Animations with SVG Clip-Path](https://tympanus.net/codrops/2024/01/10/experimental-on-scroll-text-animations-with-svg-clip-path/)
- [Codrops — SVG Mask Transitions on Scroll (Mar 2026)](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/)
- [Codrops — scroll tag](https://tympanus.net/codrops/tag/scroll/) — live gallery
- [CSS-Tricks — How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/)
- [CSS-Tricks — Scroll Drawing](https://css-tricks.com/scroll-drawing/)
- [Brad Woods — Scroll-driven draw animation](https://garden.bradwoods.io/notes/svg/scroll-driven-draw-animation)
- [Benjamin De Cock — Stripe Open Source: Behind the Scenes](https://medium.com/@bdc/stripe-open-source-behind-the-scenes-59790999dea0)
- [Sujeet Jaiswal — Intersection Observer API: visibility without scroll listeners](https://sujeet.pro/articles/intersection-observer)

> ⚠ **All Codrops line-reveal tutorials use GSAP/Splitting.js.** They are cited for the **mechanism**, not the
> plumbing. D-35 forbids the library; Pitfall 4 explains why we don't need it anyway.

---

## R-02 — Vendor Image Licensing (secondary; D-33 moved to Phase 2.1)

> Low priority per the directive — D-33 is no longer blocking Phase 2. Recorded because it is reusable.

**Finding: neither vendor publishes an editorial-use media licence. D-33's analysis holds unchanged.**

| Vendor | Image | Finding | Confidence |
|---|---|---|---|
| **Opentrons** | `Opentrons-OT2.png` | [opentrons.com/trademarks](https://opentrons.com/trademarks) was **fetched**. It *only* enumerates which marks are registered (*"Opentrons® and the Opentrons' drip logo … are registered trademarks"*). **No permission grant, no editorial-use guideline, no press-kit licence, no media-resource terms.** Their [Knowledge Hub](https://opentrons.com/resources/knowledge-hub) is content marketing, not a media licence. Brand assets on Brandfetch are **third-party aggregated, not a vendor grant** | **HIGH** (page fetched) |
| **Embi Tec** | `RunOne Gel Electrophoresis System.png` | Search across embitec.com surfaced product pages, manuals and reseller listings. **No media-resources page, no press kit, no terms-of-use page found.** | **MEDIUM** (search, not exhaustive crawl) |

**Conclusion — reinforces D-33, adds nothing new:**
1. **Silence is not permission.** Absent an explicit grant, marketing renders are **all rights reserved** by
   default under copyright. Trademark registration notices govern *marks*, not *photographs* — **separate
   rights, separate analysis.** D-33's core point stands: *"attribution and licence are separate; crediting
   Opentrons creates no permission."*
2. **No fair-dealing/fair-use safe harbour was found.** A personal portfolio is not obviously editorial or
   news reporting, and fair use is a defence, not a permission. Practical risk stays very low — but D-33
   already says low risk ≠ permitted, and that remains correct.
3. **The strongest argument is still D-33's own:** Sirio's `TimelapseOT2.mp4` shows **the real OT-2 he
   programmed, in the real DTU lab, with his own green 3D-printed parts** (D-30). The vendor render is both
   legally unpermitted **and** weaker storytelling. Recommend Phase 2.1 take D-33's option (c) — a frame from
   his own timelapse — or (b) his own line-art, which suits the blueprint aesthetic.
4. **If Sirio wants certainty:** email press/marketing at both vendors requesting written permission for
   portfolio use. Cheap, and a written grant closes it permanently. **A Phase 2.1 action, not a Phase 2 one.**

---

## Metadata

**Confidence breakdown:**
- **Standard stack** — **HIGH.** Zero dependencies. Verified by reading the repo: no bundler, no
  `package.json` in `site/`, plain `<script type="module">` (`index.html:320`). D-35 forbids libraries.
- **Architecture / where changes land** — **HIGH.** Every file, line number and integration point was read
  directly from disk this session, not inferred.
- **D-38 recommendation** — **HIGH on mechanism, MEDIUM on aesthetics.** That `transform: scaleX()` on
  `.section__rule` (`styles.css:645`) is compositor-only and free is a fact; that it *reads as* "a line
  drawing itself" to Sirio is a design judgement he steers by reacting to a render (CONTEXT `<specifics>`).
- **NAV-01 recommendation** — **HIGH.** `svh` support is cited, and **Phase 1 already shipped the exact
  pattern** at `styles.css:164-165` — this is precedent-following, not invention.
- **Pattern survey (R-01)** — **MEDIUM.** Mechanisms are cited to MDN/Chrome/WebKit/Codrops and are solid.
  **The survey is technique-grounded, not a site-by-site award-gallery crawl** — stated plainly in R-01's
  honesty note rather than papered over. The two live galleries are the right thing to show Sirio.
- **Pitfalls** — **HIGH.** Every one is either cited to vendor guidance (2, 3) or verified by reading V4 and
  the live source (1, 5, 6, 7, 8, 9).
- **Content sourcing** — **HIGH.** Every claim traced to a `profile.md` line and quoted. The two decision↔source
  conflicts ("ego", "cum grano salis") were found by reading, not assumed.
- **R-02** — **HIGH** for Opentrons (page fetched), **MEDIUM** for Embi Tec (search only). Doesn't change D-33.

**Research date:** 2026-07-17
**Valid until:** ~2026-08-16 (30 days). Stable domain. The one thing that could move: **Firefox shipping
`animation-timeline`** would reopen P-3 as a legitimate primary mechanism.
