---
phase: 02-the-story
plan: 02
subsystem: content
tags: [content, narrative, contact, css, tokens, motion, accessibility]
requires:
  - "site/index.html #index + #work section shells (Phase 1)"
  - "initReveals() + data-rev-state / data-reveal-kind / --rev-stagger vocabulary (Plan 02-01)"
  - "site/styles.css SECTION SYSTEM accent map + .section min-height cascade (Phase 1)"
provides:
  - "#origin — the unnumbered bio-green About interlude (three narr beats)"
  - "--star-zuben bio-green accent token + #origin accent map entry"
  - ".section--full full-height floor (reuses hero svh cascade)"
  - ".narr / .narr--land / .section__label--interlude narrative type scale"
  - "#origin, #method { --rev-stagger: 220ms } slow narrative pacing"
  - "extended #contact link set — LinkedIn, GitHub, iGEM wiki (rel=noopener)"
affects:
  - "site/index.html (#origin inserted between Mission and Work; #contact extended)"
  - "site/styles.css (:root token + comment, accent map, section--full, blob, narrative type, contact links)"
  - "Plan 02-03 (#method) reuses .narr, .section--full and the 220ms stagger"
tech-stack:
  added: []
  patterns:
    - "unnumbered interlude: no .section__numeral, '//' label prefix marks quieter hierarchy (D-02)"
    - "section accent palette is a SEPARATE set from star-engine PAL — overlaps by coincidence, never merged (L-3)"
    - "min-height floor via svh cascade (two declarations, not @supports); dynamic-viewport unit and scroll snapping deliberately avoided on a live-canvas page"
    - "narrative leading restored on assemble child span at higher specificity than the frame's 1.2 descender guard"
key-files:
  created: []
  modified:
    - "site/index.html — #origin section (3 beats) + 3 outbound #contact links"
    - "site/styles.css — --star-zuben token + rewritten :root comment, #origin accent, #origin/#method 220ms stagger, .section--full, .section__blob--origin, .narr/.narr--land/.section__label--interlude/.origin__beats, .contact__links/.contact__link"
decisions:
  - "Narrative prose leading restored to 1.62/1.45 on .narr>span / .narr--land>span (0,1,1) to beat the assemble frame's 1.2 heading-descender guard (0,1,0) — T-3 correctness"
  - "OI-3 (section--full on #index/#publications/#contact) left open — decide on a render"
  - "OI-4 (#origin h2 'How I got here') is a react-to proposal, not final"
metrics:
  duration: "~25 min"
  completed: "2026-07-17"
  tasks: 3
  files_changed: 2
---

# Phase 2 Plan 02: ORIGIN Interlude + Contact Close Summary

Shipped the half of the page that turns "impressive" into "I want to talk to this
person": a full-height, bio-green **ORIGIN** interlude narrating the biotech →
design/automation pivot as three scroll-assembled beats in Sirio's voice, and an
extended **Contact** close giving a recruiter working LinkedIn, GitHub and iGEM-wiki
links alongside the email — every fact traced to `profile.md` bar the one flagged
D-09 strand, no "ego" anywhere, the accent resolving to a real green triplet.

## What Shipped

- **`#origin` in `site/index.html`** — a new `.section.section--full` inserted between
  `#index` (Mission) and `#work`, honouring D-01's locked order. Unnumbered interlude
  (D-02): no sector numeral, no Mission-pill entry, a `// ORIGIN` interlude label. Three
  `<p class="narr">` beats (`data-reveal` 1/2/3, `data-reveal-kind="assemble"`, each text
  wrapped in a `<span>`), the third carrying `narr--land`. The `h2` ("How I got here")
  inherits the shared `.section h2` unchanged. Ends on *repetition in the lab is the
  bottleneck → so I automate it* (D-16 bridge into Plan 02-03's METHOD).
- **`--star-zuben: 126, 240, 174;`** — bio-green section accent (β Librae "Zubeneschamali",
  the green star; the bioluminescence the project is named for). The stale `:root` comment
  that claimed the stops "mirror PAL" was rewritten in place to state that PAL is the
  deep-field star spectrum, these are the section accent palette, they overlap by coincidence
  not contract, and `--star-zuben` must never join PAL (adding it would re-tint all 484
  background stars — L-3 / Pitfall 7). `#origin { --accent: var(--star-zuben); }` added to the
  accent map (gate G-4).
- **`.section--full`** — NAV-01 full-height *floor*, reusing the hero's shipped cascade
  verbatim (`min-height: max(100vh, 620px)` then `max(100svh, 620px)`, `display:flex; align-items:center`,
  `> .section__inner { width:100% }`). svh not the dynamic-viewport unit, no `--vh` JS hack,
  no scroll snapping. Applied to `#origin` only this plan.
- **Narrative type scale** — `.narr` (300, `clamp(20px,1.7vw,25px)/1.62`, `max-width:66ch`),
  `.narr--land` (`clamp(24px,2.3vw,33px)`, `1.45`), `.section__label--interlude` (13px),
  `.origin__beats` (4-multiple rhythm). No shipped token modified (`.section h2` /
  `.section__label` byte-identical). Weights stay {300,400}.
- **`#origin, #method { --rev-stagger: 220ms }`** — narrative beats read, not scanned; the
  `:root` 130ms furniture default is unchanged. Custom-property inheritance carries the slower
  interval to every reveal inside the two interludes with no JS change.
- **Extended `#contact`** — kept the shipped `Let's build something.` title, `04 — TRANSMISSION ·
  SIRIUS SECTOR` label and `mailto:` email untouched; added a `.contact__links` row (`data-reveal="3"`,
  sibling of the email's reveal, P-1) with three `.contact__link` anchors — LinkedIn, GitHub, iGEM
  wiki — each `target="_blank" rel="noopener"`, styled secondary to the email, `color` restated on
  `:hover`/`:focus-visible`. No CV link (D-22); account address never on the page.

## Tasks

| Task | Name | Commit |
| ---- | ---- | ------ |
| 1 | #origin — bio-green three-beat interlude (token, accent, section--full, blob) | 232552f |
| 2 | Narrative type scale + 220ms interlude stagger | 762f8ee |
| 3 | Contact close — LinkedIn, GitHub, iGEM wiki | c440d1a |

## Content Provenance (beat-by-beat)

The standing landmine is fabrication; every factual claim is mapped to its source.

| Beat | Claim | Source |
| ---- | ----- | ------ |
| 1 | "five years … mammalian cells, microbiology, fermentation, cell-free systems" | `profile.md:242` (verbatim spine) |
| 1 | "led the wet lab for EndoSense, DTU's iGEM cell-free biosensor" | `profile.md:11`, `:193-204`; already on page at `index.html:255` |
| 1 | "Biotechnology is where I learned how good science actually gets made" | `profile.md:242` ("Biotechnology gave me this clarity") |
| 2 | "What drains me isn't physical work — it's repetition: running the same protocol dozens of times" | `profile.md:242` (verbatim spine, D-05) |
| 2 | **"countless late nights fixing broken lab equipment"** | ⚠ **D-09 — `PROJECT.md:46` ONLY.** No `profile.md` backing. Treated as true (Sirio did not correct it); the only unbacked strand on the page. Not embellished further. |
| 2 | "repetitive manual work is the real bottleneck in the lab" | `profile.md:242` + `PROJECT.md:46` (the pivot thesis) |
| 2 | "the design layer, conceiving the tools, fixtures and workflows that make the bench work better" | `profile.md:242` (verbatim) |
| 3 | "Fusion360 CAD, 3D-printed parts, custom automation, an MSc thesis on a portable precision liquid dispenser" | `profile.md:240`, `:378`; dispenser already on page at `index.html:173-174` |
| 3 | "My years at the bench aren't behind me; they're the edge — I know exactly what a lab needs" | `profile.md:242` ("my deep understanding of laboratory needs … is a genuine competitive advantage") |
| 3 | "Product design is the constant, the domain stays flexible" | `profile.md:242` (verbatim), `:387` |
| 3 | "I build these tools for the people who have to use them" | D-07 people thread, approved draft; `profile.md:240` ("real people … their immediate reactions") |
| 3 | "repetitive work is the bottleneck in the lab, so I automate it" | D-16 bridge; `profile.md:375` makes the lab↔AI bridge explicit |

Threads left out per D-06: martial-arts / Viet Vo Dao precision (`profile.md:247-248`) and athletic awards — not selected.

## Required Records (from plan `<output>`)

- **`--star-zuben` shipped value:** `126, 240, 174` (bio-green). **OI-1: Sirio has NOT yet seen it on a
  render** — the green accent, its distinctness from Mission-blue and Work-gold, and the overall balance
  are unconfirmed visually.
- **OI-3 still open:** whether `#index`, `#publications` and `#contact` also get `.section--full`. The class
  exists and `#origin` uses it; the other three are one line each, deliberately deferred to a render.
- **OI-4 still open:** the `#origin` h2 text (`How I got here`) is a react-to proposal, not final.
- **D-23 (GitHub review):** NOT actioned in this plan. `workflow.human_verify_mode` is `end-of-phase`, so
  the `github.com/SirSirio` "is this profile strong enough to link?" gate is carried to end-of-phase
  verification, not resolved here. GitHub URL returns HTTP 200 (reachable); its *content strength* is the
  open reputational question.

## Deviations from Plan

### Auto-fixed / correctness

**1. [Rule 1 — Correctness] Narrative leading restored over the assemble frame's descender guard**
- **Found during:** Task 2.
- **Issue:** Plan 02-01 ships `[data-reveal-kind='assemble'] > *  { line-height: 1.2 }` (specificity 0,1,0)
  as a heading descender guard. The three beats are `assemble` frames whose text lives in the inner
  `<span>` — so that rule would force **1.2** leading on narrative prose, directly contradicting T-3
  (narrative prose 1.62 / landing 1.45) and re-creating exactly the cramped leading Sirio rejected.
- **Fix:** added `.narr > span { line-height: 1.62 }` and `.narr--land > span { line-height: 1.45 }`
  (specificity 0,1,1, which beats the frame rule). `.narr` itself still declares `1.62` via the `font:`
  shorthand and `.narr--land` declares `1.45`, satisfying the acceptance criteria; the span overrides make
  the *rendered* text match. No shared token touched.
- **Files modified:** `site/styles.css`. **Commit:** 762f8ee.

### Verification-gate notes (no code change warranted)

- **Task 1 gates** (`section__numeral`=3, `dvh`=0, `scroll-snap`=0) initially tripped on my **own comment
  prose**, which the strict literal greps match. Reworded the comments (`giant outlined sector numeral`,
  `the dynamic-viewport unit`, `scroll snapping`) — no functional change; gates then passed.
- **Task 3 gate** (`target="_blank"` count = 7) initially read **8/8** because my explanatory comment
  contained the literal `target="_blank" rel="noopener"`. Reworded the comment to avoid the literals;
  count is now 7/7 with parity intact (gate G-7 satisfied).
- **Task 2 weight gate** (`grep -cE 'font(-weight)?:\s*(500|600|700)' <= 1`) reads **2**, not because this
  task introduced a heavy weight (it introduced **zero** — all new work is {300,400}), but because the
  **base commit already had two** pre-existing non-{300,400} weights: `.typer__word { font-weight: 600 }`
  (Phase 1 hero typewriter, `styles.css:296`) and `.section__numeral { font: 500 }` (`:659`). The plan's
  criterion assumed only the numeral. The `.typer__word` 600 is **pre-existing, out of scope** (SCOPE
  BOUNDARY — engine-adjacent hero code, not caused by this task) and was left untouched. The criterion's
  true intent — *every weight this task introduces is 300 or 400* — is satisfied.

## Known Stubs

None. The section is fully authored static content wired to the shipped reveal vocabulary; the contact
links point at real, reachable destinations. No placeholder data, empty values or unwired components.

## Threat Flags

None beyond the plan's `<threat_model>`. The three new `target="_blank"` anchors are the only new trust-
boundary surface and are mitigated by `rel="noopener"` on every one (T-02-05, gate G-7, 7/7 parity). No new
endpoints, auth paths, input sinks, file access or schema surface introduced.

## Verification Gates

- **G-1 (JS disabled):** structural — every `#origin`/`#contact` element is visible unless
  `data-rev-state` (a JS-created attribute) hides it; no CSS rule hides them otherwise. JS-off renders
  every word. Human browser check deferred to end-of-phase.
- **G-2 (styles.css clean):** `grep -c '\[data-reveal\]' site/styles.css` → 0; `grep -rn 'body\.js' site/` → 0. PASS.
- **G-3 (reduced motion):** `#origin` uses only the shipped reveal vocabulary, which the existing
  `prefers-reduced-motion` block flattens; structurally complete with zero animation. Human check deferred.
- **G-4 (accent resolves):** `#origin { --accent: var(--star-zuben) }` present in the accent map;
  `--star-zuben` defined in `:root`. Computed-style check deferred to a render but the CSS chain resolves.
- **G-6 (zero dependencies):** no `site/package.json`; `<script` count in `index.html` = 1. PASS.
- **G-7 (rel=noopener):** all 3 new outbound links carry `rel="noopener"`; `target="_blank"` == `rel="noopener"` == 7. PASS.
- **G-8 (no banned phrasing):** `grep -ciE '\bego\b|grano|salis' site/index.html` → 0. PASS.
- **G-9 (github.com/SirSirio reviewed):** raised as a `<human-check>`; `human_verify_mode: end-of-phase`, so collected there. URL reachable (HTTP 200); content-strength decision pending.

Not reachable this plan: G-5 (main.js untouched — confirmed byte-identical), G-10 (METHOD skills line, Plan 02-04).

## Self-Check: PASSED

- FOUND: site/index.html, site/styles.css (both modified, committed)
- FOUND commits: 232552f, 762f8ee, c440d1a (git log 5ee6aad..HEAD)
- star-engine.js + main.js byte-identical to base 5ee6aad
