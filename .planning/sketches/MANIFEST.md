# Sketch Manifest

## Design Direction

The visual language is **already settled** and is not what sketching is for here — the approved Claude
Design ("Sirio V4 — Deep Field × Hyperlight") ships live in `site/`: cosmic dark, star-spectrum section
accents, glass cards, engineering-blueprint × bio-glow. Sketches inherit those tokens verbatim via
`themes/default.css` rather than inventing a look.

What *is* open is **motion and treatment**. Two threads drive it:

- **D-38 / MOTION-01** — `PROJECT.md:28` asks motion to convey **"automation"**: *things assemble,
  lines draw themselves, particles flow*. The V4 baseline reveal is a generic fade-up and does not do
  that. Closing that gap is Phase 2's real design problem.
- **D-20** — the METHOD section's UI/animation is **explicitly not Claude's discretion**. Sirio:
  *"for the ui and animation, for this section you can surprise me."*

Constraints every sketch respects: **no motion library** (D-35) · **one reduced-motion source** (D-36) ·
**single rAF loop** (D-37) · **never hide `[data-reveal]` in CSS before the JS runs** (D-34, the
invisible-page landmine) · content facts only from `00_Profile/profile.md` and Sirio's own deck.

## Reference Points

- The live site itself — `site/index.html`, `styles.css`, `star-engine.js` (Phase 1)
- The V4 design snapshot — `.planning/phases/01-the-design-build/design/`
- Sirio's GSD deck — `sirsirio.github.io/thesis-tools/decks/lab-meeting-2026-06/` (source of the
  verified METHOD copy)
- Pattern survey P-1…P-6 in `.planning/phases/02-the-story/02-RESEARCH.md`

## Sketches

| # | Name | Design Question | Winner | Tags |
|---|------|----------------|--------|------|
| 001 | method-section | What UI/animation treatment makes "How I Work With AI" land? (D-20, D-38) | **D — Synthesis** ✓ | method, cont-03, motion, d-20, d-38 |

## Decisions emerging from sketch 001

- **DIGITAL is a line; PHYSICAL is a loop.** Sirio's distinction (GSD = digital products;
  documentation + pressure-testing = physical things), rendered as a structural contrast rather than
  two lists. Each track owns an accent stop.
- **DOCUMENT is a rail, not a step** — deck slide 7 says "captured continuously", so it spans the
  loop and ties to Test/Analyze rather than sitting in the chain.
- **Motion pacing must be slow.** The first cut was unreadable; the rebuild roughly tripled every
  hold. Lesson for the whole phase: reveal timings tuned by eye run far too fast.
- **Type runs bigger than the V4 baseline** across the section.
- ⚠ **The METHOD "skills" line is Claude-drafted and unconfirmed** — see sketch 001 README.

## Palette Proposals Awaiting Approval

D-03 asks for two new star-spectrum stops; exact values are Claude's call. Sketch 001 proposes:

| Token | Value | Section | Status |
|-------|-------|---------|--------|
| `--star-rigel` | `96, 214, 255` — indigo/cyan | AI / METHOD | shown in sketch 001 |
| `--star-zuben` | `126, 240, 174` — bio-green | About / ORIGIN | reserved, not yet sketched |
