---
phase: 02-the-story
plan: 04
subsystem: content
tags: [content, method, motion, tracks, svg, intersection-observer, css, accessibility]
requires:
  - "#method section + .method__act--story + .calc + .ph__em + accent map (Plan 02-03)"
  - "site/method.js — initMethod(), playCalc(), the D timing object, REDUCED import (Plan 02-03)"
  - "initReveals() + data-rev-state / --rev-i reveal vocabulary; snap kind (Plan 02-01)"
  - "--star-zuben (ORIGIN green, Plan 02-02) + --star-rigel (#method accent, Plan 02-03)"
provides:
  - "#method Act 2 — the two tracks: DIGITAL is a LINE, PHYSICAL is a LOOP (CONT-03 closed)"
  - "playTrack() + initArc() in site/method.js — per-track choreography + arc measurement"
  - "the T track-choreography timing object (one editable constant beside D)"
  - "data-ph-state / data-arc-state / data-rail-state — three JS-created armed|lit contracts"
  - "--len arc-path-length custom property, set once from the SVG length at init"
  - "the .track--physical --accent override (SANCTIONED, Cl-2) — kind-of-work encoded in colour"
  - "the IN PRACTICE evidence strip + the .deck-link outbound idiom (deck + GSD repo links)"
affects:
  - "site/index.html (#method gains .method__act--tracks + the evidence strip)"
  - "site/styles.css (track/phase/arc/doc-rail/evidence CSS; the sanctioned .track--physical accent)"
  - "site/method.js (playTrack(), initArc(), T object, track observer, arming in initMethod())"
tech-stack:
  added: []
  patterns:
    - "three armed|lit state attributes (data-ph-state / data-arc-state / data-rail-state), each two values at identical specificity, mirroring data-rev-state (D-34, one step further) — the sketch's body.js root-class scoping is FORBIDDEN and absent"
    - "SVG stroke-dashoffset draw-on for the ONE return arc (a bounded, deliberate non-compositor exception); every other line uses transform: scaleX() because it is free"
    - "getTotalLength() read once in initArc() at init — explicitly NOT a gate-G-5 violation (outside every loop/scroll/IO callback)"
    - "a scoped semantic --accent override on one subtree (.track--physical) where the accent IS the meaning — the one defended deviation from styles.css:557"
key-files:
  created: []
  modified:
    - "site/index.html — .method__act--tracks (DIGITAL + PHYSICAL tracks, return arc, doc-rail), the evidence strip"
    - "site/styles.css — track/phase/deck-link CSS, .track--physical accent, loop-arc + doc-rail, evidence, 860px responsive"
    - "site/method.js — T timing object, playTrack(), initArc(), arming + track observer in initMethod()"
decisions:
  - "OI-2: the invented 'skills carry my design rules' note was CUT, not paraphrased — it returns only in Sirio's own words"
  - ".track--physical { --accent: var(--star-zuben) } is a SANCTIONED override of styles.css:557 (Cl-2): the accent encodes kind-of-work, it is the mechanism the line/loop contrast reads by"
  - "the arc/rail JS machinery (initArc + playTrack's arc/rail branches) landed in Task 1's commit for module coherence, ahead of the PHYSICAL markup it targets — inert until Task 2"
  - "the loop's copy stayed GENERIC per Sirio's round-3 correction — no gravimetric/campaign-app/rotor-solver nouns"
metrics:
  duration: "~40 min"
  completed: "2026-07-17"
  tasks: 3
  files_changed: 3
---

# Phase 2 Plan 04: METHOD Act 2 — Two Tracks, the Loop, the Evidence Summary

Shipped the second act of CONT-03: Sirio's own distinction rendered as structure,
not bullets — **DIGITAL is a LINE** (Discuss → Plan → Execute, wires drawing
themselves left to right and ending after Execute) beside **PHYSICAL is a LOOP**
(four phases in green, a return arc that draws itself back to the start, and a
DOCUMENT rail spanning beneath with its ticks under Test and Analyze Data) — closed
by an understated IN PRACTICE strip that owns the page itself as evidence and links
out to the deck and the GSD repo. Each track lights on its own scroll position, the
whole thing is fully lit and readable with JS off, and nothing invented reached the
page.

## What Shipped

- **`#method` Act 2 in `site/index.html`** — one new `.method__act--tracks` inside
  the existing single `#method` section (⚠ **one section, not two** — the sketch's
  second `<section>` was a sketch artifact). A `.tracks` grid holds:
  - **DIGITAL** (`.track--digital`, `data-track="digital"`): the deck-verbatim
    `Spec-driven development, run by GSD`, a `.phases--line` of three `.ph` blocks
    (01 Discuss / 02 Plan / 03 Execute), a `track__foot` emphasising **straight
    through and ships**, and the GSD-repo `.deck-link`.
  - **PHYSICAL** (`.track--physical`, `data-track="physical"`): the deck-verbatim
    `Working with AI is one continuous loop`, a `.phases--loop` of four `.ph` blocks
    (01 Discuss & Design / 02 Build & Iterate / 03 Test / 04 Analyze Data), the
    `#loop-arc` SVG return arc (ported verbatim), and the `#doc-rail` DOCUMENT rail.
  - the **evidence strip** (`.evidence`, `data-reveal="6"`, default fade-up): `IN
    PRACTICE`, two `.ev` claims, and the deck `.deck-link`.
- **`site/method.js`** — a **`T` timing object** beside `D` (`phStart 200`,
  `phStep 700`, `arcAfter 700`, `railAfter 700`), **`playTrack(el)`** (reduced
  branch first — sets every `.ph`/arc/rail to `lit` and returns; otherwise staggers
  the phases, then the arc, then the rail), and **`initArc()`** (reads the SVG path
  length once, sets `--len`). `initMethod()` now calls `initArc()` on both paths,
  arms the tracks' `data-ph-state`/`data-arc-state`/`data-rail-state` to `armed`
  only when not `REDUCED`, and attaches a second IntersectionObserver at
  `{ threshold: 0.25 }` on `[data-track]` so each track plays once on its own
  scroll. Under `REDUCED` it attaches **no** track observer.
- **`site/styles.css`** — track/phase geometry (wires `scaleX` draw-on keyed on
  `data-ph-state`, the line ending after Execute), the `.deck-link` outbound idiom,
  the SANCTIONED `.track--physical { --accent: var(--star-zuben) }`, the loop-arc
  `stroke-dashoffset` draw-on keyed on `data-arc-state`, the `.doc-rail` with ticks
  at `calc(50% + 7px)` / `calc(75% + 7px)`, the evidence strip, and one
  `@media (max-width: 860px)` block collapsing both phase rows to one column,
  rotating the wires vertical, and hiding the arc + rail ticks. Labels at weight
  **400** throughout (T-1); one `prefers-reduced-motion` at-rule preserved (D-36).

## Tasks

| Task | Name | Commit |
| ---- | ---- | ------ |
| 1 | DIGITAL is a LINE — the GSD track + the JS engine (T, playTrack, initArc, observer) | fc3de60 |
| 2 | PHYSICAL is a LOOP — the return arc + the DOCUMENT rail | c2172b7 |
| 3 | IN PRACTICE — the understated evidence strip + the deck link | 8faa3a3 |

## Required Records (from plan `<output>`)

### OI-2 — the invented skills line was CUT, not shipped

Phase 01's `.ph__note` in the sketch (`↳ skills carry my design rules in, so it
reasons from my constraints`) is **Claude-invented and unconfirmed** — Sirio asked
only that the design phase "mention the use of skills", never what his skills
contain. **It was cut, not paraphrased, not softened** (`grep -c 'skills carry my
design rules' site/index.html` = 0). An HTML comment at phase 01 records why and
that it returns **only in Sirio's own words** as a one-line edit. This must survive
into Phase 2.1's context — the deep-dive phase will be tempted to re-add it. **Do
not let anyone re-add a guess.** Raised to Sirio in Task 2's human check
(collected at end-of-phase verification per `human_verify_mode: end-of-phase`).

### The `.track--physical` accent override is SANCTIONED (Cl-2)

`.track--physical { --accent: var(--star-zuben); }` is the **one defended deviation**
from the `styles.css:557` rule ("`--accent` is section-driven, never plate-driven").
It is **not** the bug that warning names: there the V4 design gave a Work plate an
Aldebaran accent inside an Antares section *arbitrarily* (decoration masquerading as
meaning). Here the accent **is** the meaning — it encodes kind-of-work and is the
mechanism by which the line/loop contrast reads at a glance. It is a **scoped,
semantic, bounded** custom-property override on one subtree; the section head
(`.section__label`, `.section__rule`, `.section__blob`) still derives from
`#method`'s rigel. **Bonus resonance:** PHYSICAL green **is** ORIGIN green — physical
work is the lab root, said in colour without a word. A comment in `styles.css`
records this so a future reader does not "fix" it against `:557`.

### `getTotalLength()` in `initArc()` is NOT a gate-G-5 violation

`initArc()` reads the SVG path length **once, at init, outside every loop, scroll
handler and IO callback** (`grep -c 'getTotalLength' site/method.js` = 1). Gate G-5
forbids layout reads in `loop()` / `onScroll()` / the IO callback — it does **not**
apply to a one-shot init read. `getBoundingClientRect` in `method.js` stays 0 and in
`main.js` stays 3 (baseline). A comment in `method.js` records this so the gate is
not later misapplied to `initArc()`.

### OI-5 carried to Phase 3 — mobile not validated below ~485 CSS px

The `@media (max-width: 860px)` block is **rendered but not validated below ~485 CSS
px** (headless Chrome clamps there). The tracks were never checked at 375/390px.
**Phase 3's mobile pass owns the real-device check** — the vertical wires, the
stacked phases, and the hidden arc/rail-ticks all need confirming there.

### The reduced-motion arc — the case the CSS block cannot rescue

`styles.css`'s `prefers-reduced-motion` block flattens **durations** but does **not
reset values** — an armed `stroke-dashoffset: var(--len)` or `scaleX(0)` is *not*
rescued by it. So **JS owns the resolved end state**: under `REDUCED`, `initMethod()`
attaches no observer and `playTrack()` sets `data-ph-state="lit"`,
`data-arc-state="lit"`, `data-rail-state="lit"` on every element immediately, and
`initArc()` still runs so `--len` resolves the dasharray to a fully-drawn arc
(`stroke-dashoffset: 0`). This is **structurally** correct in the code; the actual
browser render (arc fully drawn, rail present, nothing dimmed) is the **single most
likely thing to have been got wrong** and must be confirmed on a reduced-motion
reload at end-of-phase — it could not be rendered in this headless environment.

### Measured track-sequence durations + Sirio's pacing steer

Computed from the locked `T` object (each track fires on its own `threshold: 0.25`
scroll trigger):

- **DIGITAL** — dots light at 200 / 900 / 1600 ms; the last wire draws over 800 ms,
  so the line **settles ~2.4 s** after the track enters view.
- **PHYSICAL** — dots at 200 / 900 / 1600 / 2300 ms; the return arc begins drawing at
  3700 ms and completes its 1.5 s draw at **~5.2 s**; the DOCUMENT rail arrives at
  4400 ms and settles at ~5.2 s. So the full loop **resolves ~5.2 s** after entry.

**Sirio's steer is documented, not resolved:** the phase-wide C-3 lesson (he could
not read the calculator's first cut, everything roughly tripled) means these `T`
values are a **floor** — expect him to want the tracks slower, not faster. Re-pacing
is a numbers-only edit on `T`. Confirm on a render.

## Deviations from Plan

### Adjustments (to satisfy the plan's own verification gates)

**1. [Rule 3 — Blocking] Reworded comments that tripped literal-string gates**
- **Found during:** Tasks 1–3.
- **Issue:** several gates are literal greps. Explanatory comments quoting the exact
  tokens inflated the counts: `body.js` (gate G-2 wants 0), `data-sec=` (wants 0),
  `getTotalLength` (wants exactly 1), and `IN PRACTICE` (wants exactly 1).
- **Fix:** reworded each comment to describe the constraint without the banned
  literal (e.g. "runtime class on the root element" for `body.js`, "the SVG
  path-length read" for the `getTotalLength` comment). No functional change; the code
  obeys every rule. Same convention Plan 02-03 recorded.
- **Files:** `site/index.html`, `site/styles.css`, `site/method.js`.
  **Commits:** fc3de60, c2172b7, 8faa3a3.

### Module-coherence choice (not a discovered bug)

The plan assigns `initArc()` and `playTrack()`'s arc/rail branches to Task 2, but
they landed in **Task 1's commit** (fc3de60) so `method.js` stayed a single coherent
edit rather than a function split across two commits. They are **inert until Task 2**
adds the `.loop-arc` / `.doc-rail` markup they target (empty NodeLists before then),
so no behaviour shipped early. Task 2 (c2172b7) added only the PHYSICAL markup + CSS.

### Verification-harness note (no code change)

As Plans 02-01 and 02-03 recorded, `node --check site/method.js` defaults to CommonJS
for a `.js` file with no `package.json` (gate G-6 forbids one), so it rejects the ES
`import`. Syntax was validated with `node --check --input-type=module < site/method.js`
— clean. Harness quirk, not a code issue.

## Known Stubs

None. Both tracks carry fully-authored static content; the calculator, arc and rail
are real objects wired to real timer/observer choreography. The tracks ship
**intentionally in their resolved DOM state** (no `data-*-state` attribute) and are
armed + animated at runtime by `method.js` — that is the designed JS-off / reduced
end state (fully lit, every word present), not an unwired stub.

## Threat Flags

None beyond the plan's `<threat_model>`. The two new `target="_blank"` links both
carry `rel="noopener"` (T-02-15; parity 9/9); `open-gsd/gsd-core` and the deck both
re-verified live (200); `playTrack()`/`initArc()` write only attribute values and one
numeric custom property, never markup (T-02-17, `innerHTML` = 0); the forbidden
root-class reveal pattern is absent (T-02-18, the `body.js` grep = 0); zero packages,
one script tag (T-02-SC). No new inputs, endpoints, or trust-boundary surface.

## Verification Gates

- **G-1 (JS disabled):** structural — no rule hides a `.ph`/arc/rail/evidence element
  except by a JS-created attribute, so JS-off renders every word and the arc is
  visible. Human browser check deferred to end-of-phase.
- **G-2 (greps clean):** `grep -rn 'body\.js' site/` = 0 (the gate the sketch failed
  twice); `grep -c '\[data-reveal\]' site/styles.css` = 0. PASS.
- **G-3 (reduced motion):** `initMethod()` attaches no track observer under `REDUCED`
  and `playTrack()` sets every element `lit`; `initArc()` resolves `--len`. Structural
  PASS; render check deferred (see the reduced-motion record above).
- **G-4 (accent resolves):** `#method` → rigel; `.track--physical` → `--star-zuben`.
  Computed-style check deferred to a render.
- **G-5 (no loop reads):** `getBoundingClientRect` in `method.js` = 0, `main.js` = 3
  (unchanged); `getTotalLength` = 1 (in `initArc()`, not a violation); `loop()` /
  `onScroll()` untouched. PASS.
- **G-6 (zero dependencies):** no `site/package.json`; `<script` = 1. PASS.
- **G-7 (`rel="noopener"`):** `target="_blank"` = `rel="noopener"` = 9. PASS.
- **G-8 (no banned phrasing):** `grep -ciE '\bego\b|grano|salis' site/index.html` = 0. PASS.
- **G-10 (OI-2):** the skills line is cut (`grep` = 0); raised to Sirio for his words.
- **Live links:** `open-gsd/gsd-core` → 200; the lab-meeting deck → 200. PASS.

Not reachable this plan: G-9 (the `github.com/SirSirio` review — plan 02).

## Self-Check: PASSED

- FOUND: site/index.html, site/styles.css, site/method.js (all modified)
- FOUND commits: fc3de60, c2172b7, 8faa3a3
- star-engine.js and main.js byte-identical to the plan base (git diff --quiet clean)
