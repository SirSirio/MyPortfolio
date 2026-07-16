# Phase 1: The Design Build - Context

> ## ⚠ INVALID — DO NOT USE
> This CONTEXT.md was generated from `Sirio Portfolio - Fable Brief.md`, which is an
> **outdated** document now archived to `_Archive/` (see `_Archive/README.md`). Its
> content decisions, "canonical refs", and specifics are therefore untrustworthy.
> It is retained only until Phase 1 is re-planned properly (research → fresh context).
> **Do not read this file as user decisions.** Sources of truth: CLAUDE.md → "Sources of Truth".
> — flagged 2026-07-16

**Gathered:** 2026-07-16
**Status:** INVALID — superseded, awaiting re-plan
**Source:** PRD Express Path (`_Archive/Sirio Portfolio - Fable Brief.md` — OUTDATED)

<domain>
## Phase Boundary

Implement the approved Claude Design as the real, live site: the "Sirio V4 - Deep Field × Hyperlight" long-scroll page (cosmic dark theme, star-spectrum sections, persistent nav, glass cards) with the real animated "Sirio Star" hero (gold variant) integrated in place of the V4 mockup star. Sections are filled with real, curated content from Sirio's master profile (most important projects/experience first; the page stays tight, not exhaustive). The site builds to a static bundle and is live on GitHub Pages with a repeatable deploy step.

In scope: page structure + nav, hero with living star, Work / Experience / Publications / Contact sections, design-token system, responsive stacking, working CV/LinkedIn/email links, GitHub Pages deploy.

Out of scope (later phases): AI concierge (Phase 3), project deep-dive pages (Phase 5), scroll-triggered reveal animations beyond the ambient motion already in the design (Phase 4), SEO/OG cards and full a11y/perf audit (Phase 6).

</domain>

<decisions>
## Implementation Decisions

### Design sources & precedence
- The visual source of truth is the approved Claude Design: `Sirio V4 - Deep Field × Hyperlight.dc.html` + `star-engine.js` (Claude Design project `42d7cdbc-c6e1-47dd-aaef-a49e89035dce`) for the full page, and `Sirio Star.dc.html` (project `4328e41c-9f30-4c64-98f9-2445eb57d486`) for the hero. Local snapshots of these files are saved under the phase directory for the executor — reproduce them faithfully, do not reinvent.
- The hero star uses the **gold variant** of the Sirio Star.
- The V4 page contains only a mockup star — the real Sirio Star (breathing cycle, i-dot orbital orbs, star-as-"o" wordmark, canvas starfield/rings) MUST replace it.
- The untracked `site/` folder is an old discarded mockup — do not build on it or reuse its code.
- Where the Fable Brief's inline reference code and the V4 Claude Design files conflict, the V4 files win for visuals; the brief remains authoritative for content (§1) and build requests (§6).

### Visual language (locked by the brief §2)
- Cosmic dark theme on near-black (`#04050c`/`#05060d`); long-page vertical gradient drifting through section colors; light used as glow, not fill.
- Four-star color spectrum owns the sections: Sirius blue-white `rgb(150,196,255)` (hero & contact), Antares gold `rgb(244,182,89)` (Work 01), Aldebaran orange `rgb(255,122,89)` (Experience 02), Vega violet `rgb(171,140,255)` (Publications 03); 5px left spectrum-spine runs the full page height.
- Font trio: Space Grotesk (display), Hanken Grotesk (body), Space Mono (labels/numbers/eyebrows) with the weights/tracking specified in the brief.
- Frosted-glass cards (rgba white 0.04 bg, 1px rgba white 0.1 border, backdrop blur 22–24px, soft shadow, ~22px radius); pill buttons (primary = star-color gradient with dark text; secondary = frosted glass).
- Motion is slow and ambient (twinkling starfields, drifting galaxies, rotating dashed rings, 7s float, blinking caret); nothing fast or bouncy; `prefers-reduced-motion` respected; canvases pause off-screen.
- Signature identity: in the wordmark "Sirio" the i-dots are glowing orbs and the "o" is the living star — keep it.

### Content (locked)
- Identity content from brief §1 is used verbatim: name, SF monogram, one-liner, discipline chips, rotating roles list, email `sirio.feltrin@gmail.com`, LinkedIn URL, CV link `https://canva.link/5a5yj5bdg78axhv`, `COPENHAGEN · 2026` tag.
- Section content (Work, Experience, Publications) is real, curated from the master profile (`../00_Profile/profile.md`) — most important items first, deliberately not exhaustive. The brief's sample project text (e.g. "Descriptio od endosese") is placeholder shape only — replace with real curated content.
- Every project card keeps one empty 16:10 media slot with the striped-placeholder treatment and a Space Mono caption — no stock or AI-generated imagery.
- Avoid: stock-photo heroes, emoji, heavy background gradients, generic SaaS card styles.

### Structure & deploy (locked)
- Single immersive long-scroll home: nav → hero → Work (01) → Experience (02) → Publications (03) → Contact, each section with its own tinted galaxy canvas and alternating editorial alignment.
- Persistent nav: SF monogram + name left; LinkedIn (glass pill) + View CV (primary pill) right; smooth-scroll section anchors.
- Fully static site deployed to GitHub Pages; pushing a change redeploys through a repeatable build/deploy step; site live at a public URL.
- Responsive: desktop reference frames adapt with sensible mobile stacking (single-column cards, collapsing nav, type scales down but stays large).

### Claude's Discretion
- Build tooling (plain static files vs. a bundler like Vite) — pick the simplest setup that gives a repeatable GitHub Pages deploy.
- Repo/source layout, CSS/JS modularization, and how the star engine + galaxy engine are factored.
- GitHub Pages mechanism (Actions workflow vs. branch deploy).
- Exact curation choice of projects/experience/publications from profile.md (respecting "most important first, tight").
- Typewriter implementation details and role gradient colors.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design (visual source of truth)
- `.planning/phases/01-the-design-build/design/Sirio Star.dc.html` — approved hero: breathing star, i-dot orbital mechanics, typewriter (gold variant preferred)
- `.planning/phases/01-the-design-build/design/Sirio V4 - Deep Field x Hyperlight.dc.html` — approved full page layout/sections (contains mockup star to be replaced)
- `.planning/phases/01-the-design-build/design/star-engine.js` — star/galaxy engine accompanying the V4 page

### Brief & content
- `Sirio Portfolio - Fable Brief.md` — creative direction, visual rules (§2–3), verbatim identity content (§1), build requests (§6)
- `../00_Profile/profile.md` — master profile: source of truth for curated Work/Experience/Publications content

### Planning
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, design-source pointers
- `.planning/REQUIREMENTS.md` — FOUND-01..04, HERO-01..04, NAV-02, LINK-01, LINK-02 definitions

</canonical_refs>

<specifics>
## Specific Ideas

- Exact CSS values for glass cards, striped placeholders, spectrum spine, and background gradient are given in brief §2 and §4–5 reference code — copy them, don't approximate.
- Star behavior to reproduce (brief §4): ~20s breathing sine cycle driving CSS vars; palettes per color; star pinned to the optical centre of the "o" glyph; ~130 twinkling canvas stars + three rotating dashed rings + expanding color rings every ~2.1s; i-orbs run one eased orbit on each ignition (brightness crossing ~0.45); typewriter cycles the roles list with per-role gradients and blinking caret.
- Galaxy engine behavior (brief §5): global starfield tinted along the vertical spectrum; per-section procedural galaxies (spiral/barred/pinwheel/ring/nebula) of ~800–1200 particles drawn additively with props for motion intensity and density.
- Nav pills and hero eyebrow/tag styling per brief §3 layout notes.

</specifics>

<deferred>
## Deferred Ideas

- AI "Ask about me" concierge bar — Phase 3 (ASKAI-01..06)
- Project deep-dive case-study pages — Phase 5 (PROJ-01..03)
- Scroll-triggered reveal/assemble animations — Phase 4 (MOTION-01)
- SEO/OG meta cards, full accessibility and performance audit — Phase 6 (SEO-01, A11Y-01, RESP-01, PERF-01/02 as formal gates; baseline responsiveness and reduced-motion are still honored in this phase per the brief)
- Real project imagery/video — user will supply later; slots stay as labeled placeholders

</deferred>

---

*Phase: 01-the-design-build*
*Context gathered: 2026-07-16 via PRD Express Path*
