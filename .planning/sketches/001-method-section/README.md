---
sketch: 001
name: method-section
question: "What UI/animation treatment makes the 'How I Work With AI' (METHOD) section land?"
winner: "D"
tags: [method, cont-03, motion, d-20, d-38]
phase: 2
---

# Sketch 001: METHOD Section — "How I Work With AI"

## Design Question

**What treatment makes CONT-03 land?** D-20 deliberately left this section's UI/animation open —
Sirio: *"for the ui and animation, for this section you can surprise me. I think I would like to have
some /gsd-sketch versions of it to see how they might look."* This is the one part of Phase 2 that is
**explicitly not Claude's discretion**.

Secondary question it also probes: **D-38** — `PROJECT.md:28` asks motion to convey *"automation"*
("things assemble, lines draw themselves, particles flow"). The V4 baseline is a generic fade-up and
does not do that. Each variant proposes a different answer.

## How to View

```
open .planning/sketches/001-method-section/index.html
```

Use the tab bar to switch variants. Each variant has a **▸ REPLAY** button (the whole point is motion —
watch it more than once). The toolbar (bottom-right) has viewport clamps and a
**reduced-motion toggle** — use it, MOTION-02 is a success criterion.

## Variants

- **A: Type-on manifesto** — the manifesto types itself in, line by line, caret blinking. Reuses the
  typewriter mechanism that already ships at `star-engine.js:70-96`. The D-17 content sits below as a
  quiet evidence strip.
- **B: GSD pipeline** — the manifesto reveals as prose, then a **Discuss → Plan → Execute** pipeline
  draws itself: nodes light in sequence, connector wires `scaleX(0)→1`. The two verified deck quotes
  hang off it as cards.
- **C: Calculator** — the calculator story made literal. Keys mash, the display fills with the numbers
  he typed "until they matched the answers in the back of the book", lands on an answer that means
  nothing, then resolves to **MAP → STRATEGY → EXECUTE** and finally *"THE DIRECTION IS MINE"*.
- **D: Synthesis ★** — Sirio's cherry-pick (round 2). Calculator base, **much slower**, plus the
  digital/physical split. See below.

## Round 2 — Variant D (Sirio's cherry-pick)

Sirio picked C's calculator but asked for B's rigour around it, a big slow-down, and — the real
insight — **a distinction he supplied: GSD is for digital products; documentation + pressure-testing
is for physical things.**

**The organising idea: DIGITAL is a LINE. PHYSICAL is a LOOP.** That contrast is the difference,
rather than two lists of text. The digital track runs straight through and ships; the physical track
arcs back on itself because the bench answers back. Each track owns its own accent
(`--star-rigel` cyan / `--star-zuben` green), so they read as different *kinds of work* at a glance.

**DOCUMENT is a rail, not a step.** Sirio: *"documentation and pressure testing should be inverted,
and connected somehow. Documentation happens while testing."* Slide 7 already says
**"Document — captured continuously"** — so it isn't a node in the chain at all. It's rendered as a
rail spanning beneath the loop, with ticks aligned to phase 03 (Test) and 04 (Analyze Data). The
alignment *is* the argument.

**Timing.** All calculator timings live in one `D = {...}` object at the top of the script — tweak
those numbers alone to re-pace it. Total ≈ 21s (was ~7s). The order sentences now **stack and stay**
so there is time to read them, with a 3.4s hold on the meaningless answer.

**Scroll.** The two tracks light on their own scroll position via a second IntersectionObserver, per
Sirio's *"if you animate them on scroll, that would be good."*

## What to Look For

1. **Does it surprise you?** That was the brief. A is the safe one; C is the bold one; B is the one
   where the concept, the content and the motion are the same object.
2. **Gimmick check (C).** D-07 says Sirio rejects clichés. The calculator has the highest concept-fit
   *and* the highest gimmick risk — this sketch exists to find out which side it lands on.
3. **Does the motion read as "automation"** (D-38) rather than decoration?
4. **Hit the reduced-motion toggle.** Everything must still read with nothing lost (MOTION-02).
5. **Tone.** D-11 wants a short manifesto in a terse voice; D-10 wants the site-as-evidence claim
   plain but *late and understated* — check the "IN PRACTICE" strip isn't shouting.
6. **375px.** Phase 3 is the mobile pass; B's 3-column pipeline is the one at risk.

## Content Provenance

All copy is grounded — nothing invented:

- **Manifesto** — D-15's approved draft, verbatim. No Latin (D-13) ✓, no "ego-free" (D-07) ✓
- **The two deck quotes and the Discuss/Plan/Execute sub-lines** — **verified verbatim** against
  `https://sirsirio.github.io/thesis-tools/decks/lab-meeting-2026-06/` during this sketch session.
  This closed 02-RESEARCH.md's Open Question 1 (the deck had never been opened; D-17's quotes were
  unverified and therefore at risk of being fabrication). They are real.
- **Deck link** — D-18, new tab + `rel="noopener"`

### Variant D copy — provenance, line by line

**Verbatim from deck slide 7** (fetched and quoted this session — `index.html#/7`):
- "Working with AI is one continuous loop" · "Spec-driven development, run by GSD"
- "DISCUSS & DESIGN — talk through the next move; AI proposes it"
- "ANALYZE DATA — AI processes results & runs the stats" · "Document — captured continuously"
- "Because the discussion happens in text, the results arrive already analysed and presentation-ready."
- Discuss/Plan/Execute sub-lines; "keeping AI context lean as a project grows"

**Round 3 — deliberately DE-specified at Sirio's request.** The loop is meant to read as *how he
works*, not as a thesis changelog. The deck's concrete nouns were pulled back out:
- ~~"Calculators, solvers and the campaign app"~~ → **"Custom tools and artifacts get built along the
  way — often to *make* the decisions, not just to carry them out."** Sirio: *"just say that custom
  tools and artifacts are built also to make decisions."* The point is that tooling is an instrument
  of judgement, not just output.
- ~~"Gravimetric campaigns on the real machine"~~ → **"The design meets the real thing, and the real
  thing decides. Reality is the pressure test."** Sirio: *"gravimetric testing is specific, this part
  is meant to be generic."*
- ~~"the bench answers back"~~ → "the real thing answers back" (consistency with the above).

**GSD link (D-18 sibling):** `https://github.com/open-gsd/gsd-core` — **verified live this session**:
`open-gsd/gsd-core`, "Git. Ship. Done.", MIT, v1.7.0, 6.8k stars. This is the newer official repo
(npm package `@opengsd/gsd-core`), *not* an older mirror. Rendered as "GSD is open source ↗",
new tab + `rel="noopener"`, matching the Phase 1 nav pattern.

**Sirio's own corrections, applied:**
- *"analyze data is helped by AI (I give the direction there), not autonomously run (e.g. custom
  python scripts)"* → rendered as the note **"I give the direction — it writes the custom Python.
  It does not run itself."** This deliberately **narrows** the deck's blunter "AI processes results &
  runs the stats", which overstates the autonomy.
- GSD → digital; documentation + pressure-testing → physical.

**⚠ DRAFTED BY CLAUDE — NOT SIRIO'S WORDS, NOT IN THE DECK. Needs his confirmation:**
- **"skills carry my design rules in, so it reasons from my constraints"** — he said only that the
  design part *"should mention the use of skills"*. He never said what his skills actually do or
  contain. **This line is my guess and must be confirmed or replaced before it ships.** Fabrication is
  a standing project landmine (see `<specifics>` in CONTEXT.md, and D-17's "make smth up idk" refusal).
- "the dispenser, the bench, the thesis hardware" / "websites, apps, tooling — like this page" —
  framing labels, mine. (Not flagged by Sirio; the *loop steps* were the thing he wanted generic.)
- "Nothing here ships and stops — the real thing answers back…" — mine.
- "The design meets the real thing, and the real thing decides. Reality is the pressure test." — mine,
  carrying D-17's pressure-test idea onto the Test phase.

## Notes for the Planner

- **`--star-rigel: 96, 214, 255`** (indigo/cyan) is this sketch's **D-03 proposal** for the METHOD
  accent, with `--star-zuben: 126, 240, 174` (bio-green) reserved for ORIGIN. Values are Claude's call
  per D-03 — these sit natively in the existing spectrum. Not yet approved by Sirio.
- **⚠ D-34 is modelled deliberately.** Every hiding rule (`opacity:0`, `scaleX(0)`) is scoped under
  `body.js`, a class the script adds at runtime. No JS → nothing hidden → the section still reads.
  **Copy this pattern into the real build.** A bare `[data-reveal] { opacity: 0 }` ships an invisible page.
- **`scaleX` on a 1px gradient rule** is the cheap draw-on primitive the research recommends — the page
  already has the lines (`.section__rule`, `.exp__spine`). Variant B's wires are the same trick.
- **IntersectionObserver**, not scroll + `getBoundingClientRect()` (research Pitfall 2). No `filter: blur()`
  (Pitfall 3). No library (D-35). One reduced-motion source (D-36).
- Section is an **unnumbered interlude** (D-02) — label + rule, no giant sector numeral.
- `min-height: max(100svh, 620px)` — the NAV-01 floor-not-cage pattern lifted from `styles.css:164-165`.

## Verification Status

Rendered and inspected in **headless Chrome** (Playwright is not installed; Chrome was already on the
machine).

**Verified:**
- All three variants render, with the theme loaded, and their motion runs.
- Reveal logic: every `[data-rise]` / `[data-draw]` receives its `.in` class, `body.js` is applied.
- Specificity: reveal `(0,4,1)` out-specifies hide `(0,3,1)` for both `data-rise` and `data-draw`.
- No horizontal overflow at **485 / 737 / 1249** CSS px (`scrollWidth == clientWidth`, 0 overflowing
  elements).
- JS syntax clean (`node --check`).

**Bugs found and fixed during verification** (all three shipped in the first cut and were caught by
Sirio, then by rendering):
1. **The dark page.** Scoping the hiding rules under `body.js` made them *more specific* than the
   `.in` rules that reveal them — the class was added and the CSS ignored it. This was D-34 reproduced
   by the very "fix" meant to prevent it. Now both sides carry `body.js`.
2. **Animations appeared to stall.** The `load` handler and the IntersectionObserver both fired the
   same variant; the second run cleared the first's timers mid-sequence. Added a play-once guard.
3. **`THE DIRECTION IS M / INE`.** `word-break: break-all` (needed while digits mash) also split the
   resolved words. Now scoped off `.resolved`.

**⚠ NOT verified — do not claim otherwise:**
- **True phone widths (375/390px).** Headless Chrome clamps its window to a minimum ≈485 CSS px, so
  the narrowest real test was 485. The vertical-pipeline media query (`max-width:760px`) is therefore
  *rendered* but not *validated at phone width*. **Phase 3 must check on a real device.**
- Whether the motion **reads as "automation"** rather than decoration, and whether C reads as concept
  or gimmick. Those are aesthetic calls and are Sirio's, on a render — which is the whole point of D-20.
