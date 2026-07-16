---
phase: 01-the-design-build
plan: 02
status: AWAITING-CHECKPOINT
subsystem: ui
tags: [canvas-2d, es-modules, design-tokens, css-custom-properties, requestanimationframe, github-pages, prefers-reduced-motion]

# Dependency graph
requires:
  - phase: 01-01
    provides: "site/ shell (index.html, styles.css, main.js), the byte-identical star-engine.js, the .nojekyll marker and the proven GitHub Actions Pages deploy"
provides:
  - "FOUND-03 design-token system on :root — every later section styles from these"
  - "The living GOLD Sirio Star hero (glow 255,196,110 / core 255,236,200, 20s breath) pinned to the transparent 'o'"
  - "The V4 deep field (3 layers, 484 stars) as a fixed canvas visible THROUGH the hero (D-04)"
  - "A single rAF loop driving both canvases — the loop Plan 01-03 hooks reveals into"
  - "opts.transparent on HeroStar (additive, default false)"
  - "The .nav / .nav--docked docking header (D-01) with working CV + LinkedIn links"
  - "Pointer parallax on the [data-parallax] wrapper (D-05), gated on hover + reduced motion"
affects: [01-03, phase-03-performance, phase-04-projects]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Zero dependencies — first-party engine + native web-platform APIs only"
    - "One rAF loop, many consumers: schedule the frame FIRST, then draw"
    - "The engine owns [data-hero]; main.js supplies DOM, palette and tempo"
    - "Post-construction palette assignment (star.pal) instead of an engine opts.pal"
    - "Cache-rect-on-scroll: no getBoundingClientRect in pointer handlers or the loop body"
    - "Reduced motion replaces motion, it does not delete the visual"

key-files:
  created: []
  modified:
    - "site/index.html — page shell, deep-field canvas, hero DOM, docking nav"
    - "site/styles.css — FOUND-03 tokens, page shell, hero/star/nav styling"
    - "site/main.js — palette, HeroStar wiring, deep field, pointer parallax, nav docking"
    - "site/star-engine.js — additive opts.transparent guard only"
    - "site/README.md — drift D-3 fix (serve app -> serve site)"

key-decisions:
  - "Sirio approved D-02 (the gold star) as-is and D-05 (pointer reactivity) in feel at the Task 3 checkpoint — both are locked; do not retune the drift constants"
  - "D-04 (deep-field continuity) and D-01 (nav docking) are NOT verifiable in 01-02 — this plan builds only the hero, so there is no scroll. Both deferred to Plan 01-03's checkpoint"
  - "Pointer drift is contained with overflow:clip on .hero (never on .page/html/body, which must keep scrolling for 01-03); overflow-clip-margin was measured and rejected because clip-margin content re-contributes to scrollable overflow"
  - "Restored the design's min-height:620px hero floor (V4:33) — it is what guarantees the star's halo has room, making the clip safe and keeping glow clearance >= ~50px at every viewport"
  - "D-02 GOLD palette applied post-construction (star.pal) — the engine hard-codes blue-white and accepts no opts.pal; _draw reads this.pal fresh each frame, so no engine edit was needed"
  - "D-04 resolved as transparent hero canvas + hero starfield removed (star.stars = []) + breathing tint moved to a --b-driven .hero::before overlay"
  - "The engine edit is additive and default-false, so the design snapshot's standalone behaviour is preserved byte-for-byte"
  - "applyPara() runs on scroll rather than per frame — it is scroll-driven, and this keeps getBoundingClientRect out of the rAF loop body"
  - "Pointer drift is applied to the [data-parallax] wrapper, never to [data-planet] (the engine overwrites planet transforms every frame)"

patterns-established:
  - "Design tokens are bare R,G,B triplets so they compose inside rgba(var(--x), a)"
  - "--gold-glow (the star) and --star-antares (the Work section) are two different golds and must not be conflated"
  - "Engine-written CSS vars (--b, --glow, --core, ...) live on the hero element, so every consumer must be a hero descendant"
  - "The design's non-standard hover attribute is always translated into a real :hover rule"

requirements-completed: []  # PENDING — D-04 + D-01 deferred to 01-03's checkpoint. See "Checkpoint Status".

# Metrics
duration: ~55min
completed: PENDING
---

# Phase 01 Plan 02: The Living GOLD Cosmos Summary

**The approved gold Sirio Star (255,196,110 / 255,236,200, 20s breath, orbiting dotless-i orbs, 8-role typewriter) ported onto the V4 deep field via a transparent hero canvas, plus the FOUND-03 token system, cursor parallax and a nav that docks into a 70px glass bar carrying working CV + LinkedIn links.**

## Checkpoint Status — READ FIRST

**Task 3 got a partial approval + one defect, now fixed. Task 3 is still not signed off.**

Sirio's verdict at the Task 3 checkpoint:

| Item | Verdict | Consequence |
|------|---------|-------------|
| **D-02** — the approved star, in gold | **APPROVED as-is** | Do not touch the star, its gold treatment, the 20s breath, or the i-dot orbits. |
| **D-05** — pointer reactivity | **APPROVED in feel** ("yes fine") | Feel is locked. It was also the direct cause of the defect below — fixed by containment, *not* by reducing the drift constants. |
| **D-04** — deep-field continuity across the hero's bottom edge | **NOT VERIFIABLE — deferred to 01-03** | See below. |
| **D-01** — nav docking (incl. the "pops vs fades" question) | **NOT VERIFIABLE — deferred to 01-03** | See below. |

### Why D-04 and the nav docking are deferred (checkpoint design error, not an implementation gap)

Sirio: *"there is no real scroll... unless I am missing something."* He is right, and the
Task 3 checkpoint was wrong to ask. **This plan builds only the hero** — the DOM below
`<section class="hero">` is empty, so the page is exactly one viewport tall and there is
nothing to scroll. Both deferred items are only observable once content exists below the
hero:

- **D-04** asks whether star density/brightness changes at the hero's bottom edge. With no
  section under the hero there is no boundary to inspect.
- **D-01** docks when `hero.bottom <= 70`, which cannot happen without scroll. The
  "pops vs fades" concern raised in the previous return is likewise unobservable.

Both carry forward to **Plan 01-03's checkpoint**, where real sections sit below the hero.
Scroll space was deliberately **not** manufactured to test them — a synthetic scroll would
prove nothing about the real composition.

**Task 3 remains unapproved on the deferred items, so `requirements-completed` stays empty
and Plan 01-03 must not be started off this summary.**

The tuning knobs Task 3 exists to settle, all single constants in `site/main.js`:

| Knob | Current | Status |
|------|---------|--------|
| Pointer drift | `STAR_DRIFT = 10`, `CANVAS_DRIFT = 6`, `DRIFT_EASE = 0.06` | **Locked** — approved in feel; do not change to work around layout issues |
| Hero star density | `star.stars = []` | Deferred to 01-03 (a D-04 judgement) — re-seed 30–40 stars if the hero reads sparse |
| Dock threshold | `DOCK_AT = 70` | Deferred to 01-03 |

## Performance

- **Duration:** ~55 min (Tasks 1–2 + the post-checkpoint defect fix)
- **Tasks:** 2 of 3 complete; Task 3 partially approved (D-02, D-05) with D-04 + D-01 deferred to 01-03
- **Files modified:** 5
- **Net:** +842 / −29 lines
- **Commits:** 3 (`0b5cabf` feat, `fa835eb` feat, `badbcdf` fix)

## Accomplishments

- **D-02 — the gold star.** `star.pal = { glow: [255,196,110], core: [255,236,200] }` at `main.js`. The engine hard-codes blue-white at `star-engine.js:43` and its constructor accepts no `opts.pal`; because `_draw` re-reads `this.pal` every frame, post-construction assignment needed zero engine edit. Tempo pinned at `periodSec: 20` (the engine's default of 15 is wrong).
- **The hero markup contract.** Every one of the engine's silent-failure selectors is satisfied and verified structurally: a `<canvas>` inside `[data-hero]` (without it `frame()` bails and nothing draws), exactly 3 `h1 > span` children resolving to `["ı","ı","o"]`, `[data-art]`/`[data-typer]` (absent from both design files; without `[data-typer]` the typewriter early-returns silently), both `[data-planet]`s and the 6-span star layer in z-order, all sized in `em`.
- **FOUND-03.** 17 tokens on `:root`, zero inline `style="` attributes in `index.html` (a 1:1 inline-style port would have passed visual review and failed the requirement).
- **D-04.** One surgical, additive, backward-compatible engine edit: `opts.transparent` swaps the opaque background fill for `clearRect`. `diff` against the design snapshot shows **only** the constructor line and the guarded background block. Default stays `false`.
- **D-01 / D-05.** Both are genuine additions (neither design file contains a persistent nav or any pointer handler), built in the design's language: ambient drift, no bounce; glass fade, no transform.

## The Phantom-Scroll Fix (post-checkpoint)

**Defect:** a vertical scrollbar appeared on a page with nothing to scroll to, and moving
the cursor downward scrolled the page. Reported by Sirio; independently reproduced here in
real Chrome over CDP before any change was made.

**Cause.** Both D-05 drift layers — `[data-parallax]` and `.hero__canvas` — are
`position: absolute; inset: 0`, so each lays out at exactly hero height. Translating them
down a few px pushes their *boxes* below the hero, and a transformed box still contributes
to **scrollable** overflow. Nothing contained them on the Y axis: `.hero` computed
`overflow: visible` and `.page` clips only X.

**Measured at 1280x647, dpr 1.25 (Sirio's actual setup):**

| | at rest | after drift to hero bottom |
|---|---|---|
| `documentElement.scrollHeight` | 647 | **657** |
| `documentElement.clientHeight` | 647 | 647 |
| Phantom scroll | 0 | **~10px** |
| `[data-parallax]` bottom | 647.0 | 656.62 (hero bottom 647) |
| `.hero__canvas` bottom | 647.0 | 652.77 |

**Fix:** `overflow: clip` on `.hero` — `clip`, not `hidden`, so the hero never becomes a
scroll container. `.page`/`html`/`body` keep `overflow-y: visible`, preserving the real
scroll Plan 01-03 needs. The approved D-05 drift constants were **not** touched.

**Candidates were measured, not assumed.** Two plausible fixes were disproved:

| Candidate | Drift-added scroll | Verdict |
|-----------|--------------------|---------|
| `.hero { overflow: clip }` | **0px** | **shipped** |
| `overflow: clip` + `overflow-clip-margin: 64px` | 10px | **rejected** — clip-margin content re-contributes to scrollable overflow, defeating the clip entirely |
| Shrink `[data-parallax]` box only (`inset: 0 0 24px 0`) | 6px | **rejected** — removes the wrapper's 9.8px but leaves the canvas's 5.8px; both layers must be contained |

**Also restored `min-height: 620px` (the design's own floor, V4:33)**, which this plan had
dropped in favour of `100vh`/`100svh`. This is *part of* the fix, not scope creep: it is
what makes the clip safe. Without it a wide+short window pushes the halo past the hero's
bottom edge, and the clip would cut the glow into exactly the hard line D-04 forbids.

**Satisfying the D-04 no-seam constraint** — the clip provably does not create a seam:

1. **`[data-deep]` is a fixed sibling OUTSIDE the hero**, not a descendant, so the deep
   field is not clipped and reads continuously across the hero's bottom edge. Verified: its
   rect is unchanged by the clip. D-04 is structurally unaffected.
2. **The hero canvas already terminates at its own bounds by construction** — a canvas clips
   its own drawing, so the expanding rings (maxR ≈ 831px on a 647px canvas) were always cut
   at the hero edge. The clip introduces nothing new there.
3. **The glow stops well short of the edge.** Star-halo clearance from the hero's bottom
   edge, shipped CSS, drift applied:

   | Viewport | Glow clearance | Drift-added scroll |
   |---|---|---|
   | 2560x1440 | 460.28px | 0 |
   | 1920x1080 | 279.96px | 0 |
   | 1920x700 | 89.97px | 0 |
   | 1920x620 (at the floor) | **49.96px** (worst case) | 0 |
   | 1512x850 (macbook, dpr 2) | 165.63px | 0 |
   | 1280x647 dpr 1.25 (Sirio) | 98.41px | 0 |
   | 768x1024 (tablet) | 379.19px | 0 |
   | 390x844 (mobile) | 344.57px | 0 |

   Minimum clearance across all viewports: **~50px**. Before restoring the floor it reached
   **−50px** at 1920x420 (glow cut). Drift magnitude is preserved throughout (~9.6–9.95px of
   the 10px maximum), so the approved D-05 feel is untouched. The docked nav still escapes
   the clip (`position: fixed` descendants are not clipped by a non-transformed ancestor);
   verified `true` at every viewport.

**On "legitimate vs phantom" scroll.** With the 620px floor, viewports shorter than 620px
(e.g. 1920x500) do scroll — by exactly `620 − viewportHeight`. That is *real* content scroll
to a real element and is what the approved design specifies. The discriminator is
`driftOver − restOver`: baseline was `0 → 10` (drift adds 10 = phantom); shipped is
`20 → 20` (drift adds 0). At every viewport where the hero fits, both are 0.

## Task Commits

1. **Task 1: The living GOLD cosmos — tokens, hero DOM, gold star, deep field, composition (D-04)** — `0b5cabf` (feat)
2. **Task 2: Reactivity and persistent access — pointer parallax (D-05) + docking nav (D-01) + CV/LinkedIn** — `fa835eb` (feat)
3. **Task 3: Sirio approves the rendered hero** — D-02 approved, D-05 approved in feel; D-04 + D-01 deferred to 01-03. Defect fix: **`badbcdf`** (fix)

## Files Created/Modified

- `site/index.html` — page shell, fixed `[data-deep]` canvas, `[data-field]` wrapper, hero DOM (canvas, `[data-parallax]`, planets, 6-span star layer, dotless-i wordmark, typewriter), docking nav, scroll hint. 120 lines, zero inline styles.
- `site/styles.css` — 17 `:root` tokens, reset/shell/gradient, hero + star + nav + furniture, the `--b`-driven breathing overlay, reduced-motion block. 532 lines.
- `site/main.js` — GOLD assignment, HeroStar at 20s, deep field (484 stars), one rAF loop, pointer parallax, nav docking, `document.fonts.ready` guard. 208 lines.
- `site/star-engine.js` — **additive only**: `this.transparent = !!opts.transparent` + the guarded background block.
- `site/README.md` — `serve app` → `serve site` (drift D-3).

## Decisions Made

- **`applyPara()` runs on scroll, not per frame.** The V4 source calls it inside `frame()`, but Task 2's acceptance criterion forbids `getBoundingClientRect` in the rAF loop body (Pitfall 1). It is scroll-driven, so the scroll listener is its natural home and behaviour is identical. Phase 1 ships zero `[data-para]` elements regardless; the function is in place for 01-03.
- **Hero star density set to `[]`, not thinned.** The hero field is drawn in hero space, so it would stick in place while the deep field parallaxes — a worse artifact than the density jump it was meant to prevent. The deep field's near layer (64 stars, r 0.8–1.9, α 0.58) already carries bright foreground stars across the hero.
- **The `[data-parallax]` wrapper carries `z-index: 2`.** Its pointer transform creates a stacking context, which confines the planets' engine-set `zIndex` (1 = behind the star, 3 = in front) to the wrapper. The relative ordering the orbit depth effect depends on is preserved, and both stay below the text (z4), exactly as in the design where planets z1/z3 sit under the content at z4.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocking] Task 1's dotless-i gate used `grep -c`, which counts lines, not matches**

- **Found during:** Task 1
- **Issue:** The gate asserts `grep -c '&#305;' site/index.html` equals `2`. Both dotless-i entities were on the single `<h1>` line, so `grep -c` returned `1` (one *matching line*) while the actual match count was already correct at 2. The gate blocked on a correct implementation.
- **Fix:** Split the `<h1>` across lines **inside the tags** (breaking at the attribute whitespace), so each `&#305;` lands on its own line. Breaking *between* the spans instead would have injected whitespace text nodes and rendered the name as `S ı r ı o` — the exact silent failure the plan warns about. A comment in the markup states this so nobody reflows it.
- **Verification:** `grep -c` now returns 2; a structural parse confirms `h1 > span` count is 3, contents are `["ı","ı","o"]`, and the rendered wordmark is `"Sırıo"` with no whitespace.
- **Committed in:** `0b5cabf`

**2. [Rule 3 — Blocking] The noopener pairing gate counted a occurrence inside an HTML comment**

- **Found during:** Task 2
- **Issue:** The gate asserts the `target="_blank"` count equals the `rel="noopener"` count. A comment explaining *why* noopener is required contained the literal attribute string, making the counts 2 vs 3 and failing the gate on correct markup. (The plan anticipated this class of self-invalidating gate for `style-hover`, but not here.)
- **Fix:** Reworded the comment to describe the noopener relationship without the literal attribute string. Both links keep `target="_blank"` and their noopener relation (T-01-01).
- **Verification:** Counts are now 2 and 2, non-zero.
- **Committed in:** `fa835eb`

---

**Total deviations:** 2 auto-fixed (both Rule 3 — blocking gate defects, not implementation defects)
**Impact on plan:** Neither changed behaviour or design intent. Both were verification-harness
bugs where the plan's greps disagreed with the plan's own stated intent; in each case the
implementation already satisfied the intent. No scope creep, no security impact.

## Issues Encountered

- **Phantom scroll from uncontained drift** — found by Sirio at the Task 3 checkpoint, fixed in `badbcdf`. Full measurement and rationale above. Root cause was mine: D-05 added transforms to two hero-sized layers without containing them, and the plan's Task 2 acceptance criteria (which the implementation passed) had no gate for scrollable overflow. **Lesson for 01-03: any new transformed decorative layer needs the same containment check.**
- **The nav's docked state pops rather than fades.** `position` is not animatable, so at the dock moment the bar switches `absolute` → `fixed` and its text appears instantly; only the glass (`background`, `backdrop-filter`, `border-color`) fades over 0.45s. This is exactly what the plan prescribes, and CSS alone cannot fade in an element whose resting opacity is already 1. **Not observable in 01-02 (no scroll) — carried to 01-03's checkpoint.** Left as the plan prescribes. If the pop reads badly, the fix is small (drive opacity from the dock class with a JS-set initial state).
- No package installs, no dependencies added — the threat register's `T-01-SC` row stays empty by design.

## Known Artifacts (deliberately not fixed)

- **0.2px subpixel overflow at devicePixelRatio 1.25** (Windows 125% scaling — Sirio's actual setup). `100vh`, `100svh` and `100dvh` all resolve to **647.2px** against a **647px** `clientHeight`, so the hero's own box overhangs by 0.2px. A unit swap cannot fix it since all three units agree, and it is invisible once real content scrolls. **Not contorting the layout for it.** The acceptance gate therefore uses `scrollHeight <= clientHeight + 1` to absorb it. Distinct from the phantom scroll above (which was ~10px and cursor-driven): this one is static and does not grow with drift. Headless Chrome at dpr 1.25 resolved `100vh` to exactly 647, so it did not reproduce there — it is a real-window rounding artifact.
- **`favicon.ico` 404** in the console. Out of scope for this plan; picked up as later polish (a 1-line `<link rel="icon">` or a file in `site/`).

## Threat Flags

None. This plan adds no new network endpoint, auth path, file access or schema. The only
security-relevant surface is the two outbound links (T-01-01), whose `rel="noopener"` is
preserved and asserted by an automated gate. The engine's typewriter sink remains
`textContent` (T-01-03) — untouched, as required.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

**D-02 and D-05 are approved and locked. D-04 and D-01 are inherited as open checkpoint
items that Plan 01-03 MUST verify** — they were not verifiable here (no scroll). 01-03's
checkpoint must explicitly ask Sirio to confirm:

1. **D-04** — scroll slowly past the hero's bottom edge: no horizontal line where star
   density or brightness changes. If the hero reads sparse, re-seed `star.stars` (~30–40).
2. **D-01** — the bar docks into a fixed 70px glass nav; check whether the instant
   `absolute → fixed` switch reads as a pop.

Plan 01-03 inherits and must **not** re-derive:

- **Tokens (`:root`):** `--star-sirius` · `--star-antares` · `--star-aldebaran` · `--star-vega` · `--gold-glow` · `--gold-core` · `--bg-0` · `--text-hi` · `--text-body` · `--glass-bg` · `--glass-border` · `--font-display` · `--font-body` · `--font-mono` · `--pad-section` · `--max-w` · `--nav-h`. Colour tokens are **bare R,G,B triplets** — use as `rgba(var(--star-antares), 0.35)`.
- **Section styling hooks:** sections are `<section id="...">` inside `<div data-field>`; `section[id]` already carries `scroll-margin-top: var(--nav-h)` globally, so new sections get correct anchoring for free. Use `var(--pad-section)` for padding and `var(--max-w)` for the inner wrapper. `.page` owns the page gradient and `overflow-x: clip`.
- **The loop:** `main.js` runs exactly one rAF loop (`loop()`) and one `onScroll()`. Hook reveals into those — **do not add a second loop or a second scroll listener.**
- **`.hero` carries `overflow: clip` and `min-height: max(100svh, 620px)`** — both load-bearing (see the phantom-scroll fix above). Do not remove either, do not weaken `clip` to `hidden`, and **never** move an overflow constraint onto `.page`/`html`/`body` — that would kill 01-03's scroll. Any *new* transformed decorative layer must be re-checked for scrollable-overflow contribution.
- **`applyPara()` already exists** and handles any `[data-para]` element with the ±400px cull. 01-03 only needs to add the markup.
- **`#index` is referenced but does not exist yet** — the hero's `[data-scrollhint]` points at it. Plan 01-03's Mission section must use `id="index"`, and it carries the identity one-liner (ROADMAP criterion 4, clause 2), which deliberately does **not** live in the nav.
- **Nav links:** `#work` / `#experience` / `#publications` / `#contact` were intentionally omitted; add them with the sections.

## Self-Check: PASSED

- All 5 modified files present on disk.
- All three commits resolve (`0b5cabf`, `fa835eb`, `badbcdf`).
- `min_lines` contract met: index.html 120/60, styles.css 557/180, main.js 208/80.
- `contains` contract met: `data-typer`, `--gold-glow`, `new HeroStar`, `opts.transparent`.
- `key_links` contract met: static `HeroStar` import, GOLD `star.pal` assignment, `data-hero`, both link hrefs.
- Both task verification gates exit 0, re-run after the fix (no regression).
- `diff site/star-engine.js design/star-engine.js` = the two additive hunks only.
- **Overflow gate (automated, real Chrome over CDP, 8 viewports):** `scrollHeight <= clientHeight + 1` at rest and after pointer drift to the hero's bottom edge; no vertical scrollbar; drift preserved at ~9.6–9.95px of 10px; glow clearance >= 49.96px. All pass.

*Still not self-certified:* the **D-04** and **D-01** visual judgements, deferred to 01-03's
checkpoint. D-02 and D-05 were approved by Sirio at this plan's checkpoint.

---
*Phase: 01-the-design-build*
*Status: Tasks 1–2 complete; D-02 + D-05 approved; phantom-scroll defect fixed and measured; D-04 + D-01 deferred to Plan 01-03's checkpoint*
