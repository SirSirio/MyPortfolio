# Quick Task 260824-fms: Digital solutions umbrella deep-dive page - Context

**Gathered:** 2026-08-24
**Status:** Ready for planning

<domain>
## Task Boundary

Add a "digital solutions" software item to the portfolio: a new card in Selected Work
positioned BETWEEN plate 1 (Portable Precision Liquid Dispenser / thesis) and plate 2
(Automated Gel Electrophoresis / OT-2), which warps into its own full-screen deep-dive
overlay built on the same pattern as the existing OT-2 deep-dive
(`site/index.html` `[data-proj="ot2"]`, opened via `data-open` + warp in `main.js`).

Motivation (ALK-Abelló application context, `ALK_Application_Context.md`): the site
currently shows two robots and a biosensor and **no software** — a digitalisation
hiring manager may read it within days. The page must fix that gap, but it outlives
this application; keep it evergreen, no ALK references.

</domain>

<decisions>
## Implementation Decisions

### Page scope (user-decided)
- **Umbrella page covering all 3 software projects**, as chapters:
  1. **Thesis testing app** — the Python tool that guides randomised experimental data
     collection, logs to JSON, and runs automated sample analysis with Design of
     Experiments methodology (part of the MSc thesis toolchain, profile.md:58).
  2. **Multi-API Literature Search & Ranking Engine** — thesis tooling, ~2,200-line
     Python pipeline, 7 scientific APIs, Reciprocal Rank Fusion ranking, BibTeX
     pipeline (profile.md:336-361). Public at https://sirsirio.github.io/thesis-tools/
  3. **AGC shift app** — shift management web app for the PM department at AGC
     Biologics: Azure-hosted, Python backend, mobile-friendly, database-driven,
     taken through corporate IT (profile.md:196).

### AGC app confidentiality (user-decided)
- **Describe, no visuals.** Name what it does, the stack (database, Azure, corporate
  IT process) and the build-vs-buy angle (nothing off-the-shelf fitted, so he built).
  NO screenshots, NO internal details, NO data, NO UI mockups that imply its real UI.

### Media (user-decided)
- **Abstract animated SVG visuals** in the site's existing cosmic/technical language
  (like the OT-2 page's Double Diamond SVG) — data-flow diagrams, pipeline schematics.
- **Thesis testing app**: Sirio will provide real screenshots/recordings LATER. Build
  its media slot as a designed abstract placeholder that can be swapped for real
  captures without layout surgery (use the existing `.media-slot` contract).
- No remote embeds — first-party committed assets only (site README rule).

### Narrative structure (user-decided)
- **Problem-first, mirroring the OT-2 deep-dive structure**: numbered `proj-sec`
  sections (the problem → the approach/build → outcome) — adapted to an umbrella
  page: an overall framing (repetitive digital work is the same bottleneck as
  repetitive bench work) then per-project chapters, each problem-first.

### Claude's Discretion
- New deep-dive accent colour + `data-pos` palette destination (distinct from OT-2's
  Rigel cyan; pick something that reads "data/software" in the existing palette system).
- Card media for the new Selected Work plate (abstract SVG animation).
- Exact section count, copy, and SVG design of the deep-dive.
- Work-plate visual order handling (plates have no visible numbering conflict to fix).

</decisions>

<specifics>
## Specific Ideas

- Existing OT-2 deep-dive is the structural template: masthead (eyebrow/title/lede/meta
  + media), `proj-sec` sections with `section__numeral`, `data-reveal` GSAP reveals,
  `data-close` back link, atmosphere layer, own accent.
- ALL copy goes through `site/i18n.js` (`data-i18n` / `data-i18n-rich` /
  `data-i18n-attr`) with BOTH `en` and `it` entries. Italian conventions: "la DTU"
  (feminine); Sirio reviews Italian wording himself — flag IT copy for his review.
- No sci-fi flavour labels (memory: no-scifi-flavor-labels) — plain honest lowercase
  copy for labels/eyebrows.
- Every factual claim must trace to `../00_Profile/profile.md`. Do NOT invent metrics.
- Card becomes the SECOND clickable plate (`data-open`, role="button", tabindex,
  aria-label) — follow plate 2's accessibility pattern exactly.
- The warp system (`openProj`/`main.js`) currently serves one project; extend it for a
  second `data-proj` overlay.
</specifics>

<canonical_refs>
## Canonical References

- `ALK_Application_Context.md` — why this page exists, what it must convey
- `../00_Profile/profile.md` — source of truth for all facts (esp. lines 58, 196,
  336-361, 438-465, 477-483)
- `site/index.html` lines 195-306 (work plates), 660-934 (warp overlay + OT-2 deep-dive)
- `site/i18n.js` — copy dictionary structure (en/it)
- `.claude/skills/design-taste-frontend/` — user asked for this skill to be applied so
  the page looks premium and fits the current standard
</canonical_refs>
