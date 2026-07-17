---
phase: 02-the-story
plan: 01
subsystem: motion
tags: [motion, reveal, intersection-observer, css, accessibility]
requires:
  - "site/main.js boot() + REDUCED import (Phase 1)"
  - "inert [data-reveal] attributes + .section__rule / .exp__spine (Phase 1)"
provides:
  - "initReveals() — IntersectionObserver-driven reveal arming (main.js)"
  - "data-rev-state / data-reveal-kind reveal vocabulary (styles.css)"
  - "reveal kinds: default fade-up, draw (scaleX/scaleY), snap (pop), assemble (masked slide)"
  - "--rev-stagger + --rev-i cadence tokens"
affects:
  - "every content section already on the page (#index #work #experience #publications #contact)"
  - "future plans 02-02..02-05 consume the same vocabulary (snap's first consumer is .ph__dot in 02-04)"
tech-stack:
  added: []
  patterns:
    - "IntersectionObserver replaces V4's per-scroll getBoundingClientRect reveal trigger (DEV-1)"
    - "state-machine motion: JS writes one data-* attribute + one custom property, CSS owns all timing"
    - "D-34 structural invariant: only JS-created attributes hide elements, so JS-off renders complete"
key-files:
  created: []
  modified:
    - "site/main.js — initReveals(), revealEls cache, boot() call site"
    - "site/styles.css — --rev-stagger token, reveal vocabulary block, transform-origins, rewritten section-system warning"
    - "site/index.html — un-nested reveals on 3 section heads + exp timeline, assemble spans on 3 headings"
decisions:
  - ".exp__dot pop keyed on its ROW's data-rev-state (descendant rule), not a nested snap reveal — resolves UI-SPEC C-2 vs C-6 P-1"
  - "DEV-1: IntersectionObserver trigger instead of V4's scroll-handler rect reads (Claude's-Discretion grant)"
  - "DEV-2: animated filter: blur() dropped (Chrome guidance; GPU budget) (Claude's-Discretion grant)"
  - "line-height: 1.2 applied preemptively to assemble inner child (descender guard; browser render check unavailable in this environment)"
metrics:
  duration: "~30 min"
  completed: "2026-07-17"
  tasks: 3
  files_changed: 3
---

# Phase 2 Plan 01: Reveal Motion Vocabulary Summary

Lit up Phase 1's inert `[data-reveal]` attributes with an IntersectionObserver-driven,
`prefers-reduced-motion`-honouring reveal vocabulary (fade-up / draw / snap / assemble) that
reads as automation — the page assembles, lines draw themselves — for zero new dependencies and
strictly less scroll work than before.

## What Shipped

- **`initReveals()` in `site/main.js`** — observer-driven reveal arming. Reduced-motion branch
  runs first (reuses the existing `REDUCED` import, never constructs an observer, presents
  everything). Otherwise arms each `[data-reveal]` with a unitless `--rev-i` stagger index plus
  `data-rev-state='hidden'`, then observes with `{ rootMargin: '0px 0px -10% 0px', threshold: 0 }`.
  The callback flips `data-rev-state` on `isIntersecting` (and back on exit — reveals replay on
  scroll-back). No layout read in the callback. Called from `boot()` right after `applyPara()`;
  `loop()` and `onScroll()` are byte-identical to their pre-task state.
- **Reveal vocabulary in `site/styles.css`** — a new block before the reduced-motion block:
  - Base `[data-rev-state]` fade-up (`opacity` + `translateY(30px)` → `none`), 1s approved curve,
    delayed by `--rev-stagger * --rev-i`.
  - `draw` kind — `scaleX`/`scaleY` on the shipped 1px `.section__rule` and `.exp__spine`
    (opacity held at 1 so a drawing line never fades); each gains a `transform-origin`.
  - `snap` kind — scale-up with overshoot cubic-bezier (first consumer is `.ph__dot` in 02-04).
  - `assemble` kind — `overflow: hidden` frame whose inner `<span>` slides up from behind a hard
    edge; frame held static at `(0,2,0)` so only the child moves.
  - `.exp__dot` pop keyed on its row's state, offset `+240ms` so the timeline reads spine → row → dot.
  - New `--rev-stagger: 130ms` token in `:root`.
- **`site/index.html`** — un-nested the reveals (P-1/P-2): `data-reveal` moved off `.section__head`
  onto its label + rule, off `.exp` onto the spine, with the four `.exp__row`s indexed 2–5. The
  three section rules and the spine carry `data-reveal-kind="draw"`; the three `h2`s carry
  `data-reveal-kind="assemble"` with their text wrapped in a single `<span>` each.

## Tasks

| Task | Name | Commit |
| ---- | ---- | ------ |
| 1 | initReveals() + base data-rev-state vocabulary | 213a1d8 |
| 2 | draw + snap kinds, un-nest section/timeline reveals | 97e170d |
| 3 | assemble kind on the three section headings | 6409e5b |

## Required Records (from plan `<output>`)

### The `.exp__dot` resolution

UI-SPEC **C-2** lists the `snap` kind for `.exp__dot`, but C-6 **P-1** / Pitfall 5 forbid nesting
a reveal inside a reveal — and `.exp__dot` is a child of `.exp__row`, which is itself a reveal.
Giving the dot its own `data-reveal` would multiply opacities and make it "appear" with no motion.
**Resolution:** the dot is driven by a **row-state descendant rule**
(`.exp__row[data-rev-state='…'] .exp__dot`) rather than its own reveal. This keeps the pop, honours
P-1, satisfies D-34 (`data-rev-state` is JS-created), and avoids wrapping the dot's `box-shadow`
glow in an `overflow: hidden` frame (L-2). **The next plan must not "fix" this back into a nested
`snap` reveal.**

### The two named deviations from D-35 (both inside CONTEXT.md's Claude's-Discretion grant)

- **DEV-1 — IntersectionObserver trigger.** V4's `updateReveals()` wrote styles then read
  `getBoundingClientRect()` per element per scroll event (≈20 forced reflows/scroll on a page also
  running a canvas rAF loop). `initReveals()` uses one IntersectionObserver, resolving geometry in
  the browser's own layout phase — no scroll-handler reads at all. The `getBoundingClientRect` count
  in `main.js` stays at the pre-task baseline of 3; `loop()`/`onScroll()` untouched (gate G-5).
- **DEV-2 — animated `filter: blur()` dropped.** V4 animated `blur(10px)→blur(0)` on every reveal.
  Chrome's own guidance warns against animating blur, and this page already spends GPU on two
  canvases plus a `backdrop-filter` glass disc. Dropping it also removed the need for V4's
  `setTimeout` blur-cleanup. The omission is commented in the reveal block so nobody "restores" it.

### The Experience descender

`line-height: 1.2` **was applied** to the `assemble` inner child
(`[data-reveal-kind='assemble'] > *`) as a preemptive descender guard. The visual human render
check (whether the `p` in "Experience" is clipped by `overflow: hidden`) could not be run in this
headless execution environment, so the plan's named fix was applied defensively on the inner child
(never on the shared `.section h2` token). If a browser check later shows it unneeded it is safe to
remove, but it costs nothing and removes the risk of a clipped descender.

## Deviations from Plan

### Auto-fixed Issues

None affecting the implementation. Two planned, sanctioned deviations from D-35 (DEV-1, DEV-2) are
documented above — both were prescribed by the plan and CONTEXT.md's Claude's-Discretion grant, not
discovered bugs.

### Verification note

The plan's automated gate uses `node --check site/main.js`. On this environment `node --check`
defaults to CommonJS for `.js` files with no `package.json` (correctly — gate G-6 forbids a
`package.json`), so it rejects the ES-module `import`. Syntax was instead validated with
`node --check --input-type=module < site/main.js`, which returned clean. This is a harness quirk,
not a code issue; the module is valid ES.

## Known Stubs

None. This plan added behaviour to existing markup; it introduced no placeholder data, empty
values, or unwired components.

## Verification Gates

- **G-1 (JS disabled):** structural — no CSS rule hides a reveal element except by `data-rev-state`
  (a JS-created attribute), so JS-off renders every word. Human browser check deferred to
  end-of-phase verification.
- **G-2 (styles.css clean):** `grep -c '\[data-reveal\]' site/styles.css` → 0; `grep -rn 'body\.js' site/` → 0. PASS.
- **G-3 (reduced motion):** `initReveals()` presents everything and never observes under `REDUCED`;
  the existing `@media (prefers-reduced-motion: reduce)` block flattens transitions. Human check deferred.
- **G-5 (no loop reads):** `getBoundingClientRect` count in `main.js` = 3 (unchanged); `loop()` and
  `onScroll()` byte-identical. PASS.
- **G-6 (zero dependencies):** no `site/package.json`; `<script` count in `index.html` = 1. PASS.

Not reachable this plan (no new sections/links/content yet): G-4, G-7, G-8, G-9, G-10.

## Self-Check: PASSED

- FOUND: site/main.js, site/styles.css, site/index.html
- FOUND commits: 213a1d8, 97e170d, 6409e5b
