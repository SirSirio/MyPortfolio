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

requirements-completed: []  # PENDING — Task 3 checkpoint is unapproved. See "Checkpoint Status".

# Metrics
duration: ~35min
completed: PENDING
---

# Phase 01 Plan 02: The Living GOLD Cosmos Summary

**The approved gold Sirio Star (255,196,110 / 255,236,200, 20s breath, orbiting dotless-i orbs, 8-role typewriter) ported onto the V4 deep field via a transparent hero canvas, plus the FOUND-03 token system, cursor parallax and a nav that docks into a 70px glass bar carrying working CV + LinkedIn links.**

## Checkpoint Status — READ FIRST

**This plan is NOT complete.** Tasks 1 and 2 are implemented, verified and committed.
**Task 3 is a blocking `checkpoint:human-verify` and is unapproved.**

Auto-mode was off, and Task 3's acceptance criterion is explicit that it *cannot be
self-certified*: D-04 (hero/deep-field composition) and D-05 (pointer parallax) are a
composition and a motion that exist in **no approved snapshot** — the star file and the
V4 page were approved separately and have never been composed. RESEARCH flags both A5
and A6 as MEDIUM confidence requiring Sirio's eyes on a render, and CLAUDE.md is explicit
that Claude leads design while Sirio approves each step.

**Do not mark requirements complete and do not start Plan 01-03 on this checkpoint.**
`requirements-completed` is deliberately empty until Sirio approves.

The three values Task 3 exists to tune are single constants, all in `site/main.js`:

| Knob | Current | Where | If Sirio says |
|------|---------|-------|---------------|
| Hero star density | `star.stars = []` | `main.js` | "hero too sparse" -> re-seed 30–40 stars |
| Pointer drift | `STAR_DRIFT = 10`, `CANVAS_DRIFT = 6`, `DRIFT_EASE = 0.06` | `main.js` | "too strong / too subtle" -> one number |
| Dock threshold | `DOCK_AT = 70` | `main.js` | "docks too late/early" -> one number |

## Performance

- **Duration:** ~35 min (Tasks 1–2 only; Task 3 pending human verification)
- **Tasks:** 2 of 3 complete (Task 3 = blocking checkpoint)
- **Files modified:** 5
- **Net:** +815 / −27 lines

## Accomplishments

- **D-02 — the gold star.** `star.pal = { glow: [255,196,110], core: [255,236,200] }` at `main.js`. The engine hard-codes blue-white at `star-engine.js:43` and its constructor accepts no `opts.pal`; because `_draw` re-reads `this.pal` every frame, post-construction assignment needed zero engine edit. Tempo pinned at `periodSec: 20` (the engine's default of 15 is wrong).
- **The hero markup contract.** Every one of the engine's silent-failure selectors is satisfied and verified structurally: a `<canvas>` inside `[data-hero]` (without it `frame()` bails and nothing draws), exactly 3 `h1 > span` children resolving to `["ı","ı","o"]`, `[data-art]`/`[data-typer]` (absent from both design files; without `[data-typer]` the typewriter early-returns silently), both `[data-planet]`s and the 6-span star layer in z-order, all sized in `em`.
- **FOUND-03.** 17 tokens on `:root`, zero inline `style="` attributes in `index.html` (a 1:1 inline-style port would have passed visual review and failed the requirement).
- **D-04.** One surgical, additive, backward-compatible engine edit: `opts.transparent` swaps the opaque background fill for `clearRect`. `diff` against the design snapshot shows **only** the constructor line and the guarded background block. Default stays `false`.
- **D-01 / D-05.** Both are genuine additions (neither design file contains a persistent nav or any pointer handler), built in the design's language: ambient drift, no bounce; glass fade, no transform.

## Task Commits

1. **Task 1: The living GOLD cosmos — tokens, hero DOM, gold star, deep field, composition (D-04)** — `0b5cabf` (feat)
2. **Task 2: Reactivity and persistent access — pointer parallax (D-05) + docking nav (D-01) + CV/LinkedIn** — `fa835eb` (feat)
3. **Task 3: Sirio approves the rendered hero** — **BLOCKED, awaiting human verification**

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

- **The nav's docked state pops rather than fades.** `position` is not animatable, so at the dock moment the bar switches `absolute` → `fixed` and its text appears instantly; only the glass (`background`, `backdrop-filter`, `border-color`) fades over 0.45s. This is exactly what the plan prescribes ("At rest it is the design's in-hero bar… add a `nav--docked` class that switches it to `position:fixed`"), and CSS alone cannot fade in an element whose resting opacity is already 1. **Flagging it for Task 3** — if the pop reads badly, the fix is small (drive opacity from the dock class with a JS-set initial state) and is a Phase 3 polish candidate rather than a rebuild.
- No package installs, no dependencies added — the threat register's `T-01-SC` row stays empty by design.

## Threat Flags

None. This plan adds no new network endpoint, auth path, file access or schema. The only
security-relevant surface is the two outbound links (T-01-01), whose `rel="noopener"` is
preserved and asserted by an automated gate. The engine's typewriter sink remains
`textContent` (T-01-03) — untouched, as required.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

**Blocked on the Task 3 checkpoint.** Once Sirio approves:

Plan 01-03 inherits and must **not** re-derive:

- **Tokens (`:root`):** `--star-sirius` · `--star-antares` · `--star-aldebaran` · `--star-vega` · `--gold-glow` · `--gold-core` · `--bg-0` · `--text-hi` · `--text-body` · `--glass-bg` · `--glass-border` · `--font-display` · `--font-body` · `--font-mono` · `--pad-section` · `--max-w` · `--nav-h`. Colour tokens are **bare R,G,B triplets** — use as `rgba(var(--star-antares), 0.35)`.
- **Section styling hooks:** sections are `<section id="...">` inside `<div data-field>`; `section[id]` already carries `scroll-margin-top: var(--nav-h)` globally, so new sections get correct anchoring for free. Use `var(--pad-section)` for padding and `var(--max-w)` for the inner wrapper. `.page` owns the page gradient and `overflow-x: clip`.
- **The loop:** `main.js` runs exactly one rAF loop (`loop()`) and one `onScroll()`. Hook reveals into those — **do not add a second loop or a second scroll listener.**
- **`applyPara()` already exists** and handles any `[data-para]` element with the ±400px cull. 01-03 only needs to add the markup.
- **`#index` is referenced but does not exist yet** — the hero's `[data-scrollhint]` points at it. Plan 01-03's Mission section must use `id="index"`, and it carries the identity one-liner (ROADMAP criterion 4, clause 2), which deliberately does **not** live in the nav.
- **Nav links:** `#work` / `#experience` / `#publications` / `#contact` were intentionally omitted; add them with the sections.

## Self-Check: PASSED

- All 5 modified files present on disk.
- Both task commits resolve (`0b5cabf`, `fa835eb`).
- `min_lines` contract met: index.html 120/60, styles.css 532/180, main.js 208/80.
- `contains` contract met: `data-typer`, `--gold-glow`, `new HeroStar`, `opts.transparent`.
- `key_links` contract met: static `HeroStar` import, GOLD `star.pal` assignment, `data-hero`, both link hrefs.
- Both task verification gates exit 0; Task 1's gate re-run after Task 2 (no regression).
- `diff site/star-engine.js design/star-engine.js` = the two additive hunks only.

*Not self-certified:* Task 3 (blocking human-verify). No runtime/visual claim in this
summary has been confirmed in a browser — that is precisely what the checkpoint is for.

---
*Phase: 01-the-design-build*
*Status: Tasks 1–2 complete and committed; Task 3 checkpoint awaiting Sirio's approval*
