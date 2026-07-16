# Roadmap: Sirio Feltrin Portfolio Site ("Engineered Bioluminescence")

## Overview

**Strategy: ship small, then expand.** Get a real, striking, *deliberately small* site live fast — the approved Claude Design, a few curated entries per section, and labelled empty slots where media will go. Then grow it. Nothing in the early phases waits on assets Sirio doesn't have yet: media slots are built **swappable** (MEDIA-01) so a photo or clip can be dropped in at any moment without a re-build or a phase.

The visual theme is settled — it was decided in Claude Design ("Sirio Star" hero + "Sirio V4 - Deep Field × Hyperlight" page) — and Phase 1 implements that approved design directly. The order after that reflects **what can be built now vs. what needs something Sirio doesn't have yet**: the Story is text (profile.md already has it, no media needed) so it comes early; mobile, the full project deep-dives with real media, and the AI concierge come later.

Each phase is a meaningful chunk a visitor actually feels, not a technical layer. Build/deploy/performance plumbing is folded into the relevant phase rather than standing alone as a dry milestone. Real content is settled at the start of each phase (`00_Profile/profile.md` is the source); there is no single blocking "write all copy" phase. Sections are allowed to carry only a couple of entries — tight beats exhaustive.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: The Design Build** - The minimal real site: approved cosmic design + gold Sirio Star hero + a few curated entries per section + empty labelled media slots, live on GitHub Pages
- [ ] **Phase 2: The Story** - Who Sirio is, in words: the biotech → design/automation pivot, how he works with AI, and a Contact close. All from profile.md — needs no media
- [ ] **Phase 3: The Pocket Build** - Make it genuinely great on a smartphone: layout, touch, and a star that stays smooth on real phones
- [ ] **Phase 4: The Showcase** - Go deep: full project case-study pages, the real images/videos, and the fuller profile
- [ ] **Phase 5: Ready to Share** - Lazy-loading, accessibility, SEO/Open Graph, launch
- [ ] **Phase 6: The AI Concierge** - "Ask AI about me" bar: self-demoing, portfolio-grounded, favourable-but-truthful answers

## Phase Details

### Phase 1: The Design Build

**Goal**: Implement the approved Claude Design as the real site — the "Sirio V4 - Deep Field × Hyperlight" long-scroll page (cosmic dark theme, star-spectrum sections, nav, glass cards) with the real "Sirio Star" hero (**gold variant** preferred) integrated in place of the mockup — filled with curated content from Sirio's portfolio (profile is the source; most important projects/experience first, page stays tight, not exhaustive) and live on GitHub Pages. **Deliberately minimal**: a couple of entries per section is fine; media slots stay empty but swappable.
**Mode:** mvp
**Depends on**: Nothing (first phase). **Design sources of truth** (fetch via DesignSync at plan/execute time):

  - Hero: `Sirio Star.dc.html` in Claude Design project `4328e41c-9f30-4c64-98f9-2445eb57d486` ("Sirio Feltrin Portfolio Design") — user prefers the **gold** tweak
  - Full page: `Sirio V4 - Deep Field × Hyperlight.dc.html` + `star-engine.js` in project `42d7cdbc-c6e1-47dd-aaef-a49e89035dce`
  - The V4 file contains only a mockup star — the real Sirio Star must replace it
  - Local snapshots of all three files live in `.planning/phases/01-the-design-build/design/`
  - `_Archive/` (old `site/` mockup + the Fable Brief) is git-ignored and off-limits — not a design, content, or context source

**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, HERO-01, HERO-02, HERO-03, HERO-04, NAV-02, LINK-01, LINK-02, MEDIA-01
**Success Criteria** (what must be TRUE):

  1. A visitor can open a public GitHub Pages URL and see the implemented Deep Field × Hyperlight design: dark cosmic single-scroll page matching the approved Claude Design
  2. The hero is the real animated Sirio Star (gold variant) — running on load and reacting to cursor/scroll — not the V4 mockup
  3. Sections (work, experience, publications, contact) are filled with real, curated portfolio content — the most important items first, page deliberately not exhaustive (a couple of entries per section is acceptable)
  4. A persistent nav exposes working "View CV" and "LinkedIn" actions, and the identity one-liner — *"Biotechnology MSc at DTU Copenhagen. I design and build the hardware, software and automation that free scientists from repetitive lab work."* (verbatim, as in the approved design) — introduces the page
  5. Pushing a change redeploys the live site through a repeatable build/deploy step
  6. Media slots stay empty labeled placeholders, but are **swappable**: assets live in a documented folder and adding a real image/video is a drop-in + one-line reference, with no re-engineering (MEDIA-01)

**Plans**: 3 plans
**Wave 1**

  - [x] 01-01-PLAN.md — Walking Skeleton: site/ scaffold + GitHub Actions Pages pipeline, live at a public URL

**Wave 2** *(blocked on Wave 1 completion)*

  - [ ] 01-02-PLAN.md — Living GOLD Sirio Star hero + deep-field parallax + persistent nav (CV/LinkedIn) + design tokens

**Wave 3** *(blocked on Wave 2 completion)*

  - [ ] 01-03-PLAN.md — Curated content sections: Mission, Selected Work, Experience, Publications, Contact

**UI hint**: yes

### Phase 2: The Story

**Goal**: Turn "impressive" into "I want to talk to this person" — the home gains the narrative of who Sirio is: the biotech → design/automation pivot (About/journey), the "how I work with AI" *grano salis* philosophy, and a Contact close, with scroll-triggered motion that conveys "automation". Placed early **because it needs no media** — profile.md already holds the raw material, so it's pure writing + motion and can ship while Sirio is still hunting for images.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-03, CONT-01, CONT-03, CONT-04, MOTION-01, MOTION-02
**Success Criteria** (what must be TRUE):

  1. A visitor can scroll through distinct full-height sections (About/journey, How I Work With AI, Contact) on one page
  2. The About section narrates the biotech to design/automation pivot in Sirio's voice
  3. Sections reveal/assemble with scroll-triggered animations, and home↔page transitions feel intentional
  4. Animations are suppressed/reduced when the visitor has `prefers-reduced-motion` enabled
  5. A Contact section presents email and social links that work

**Plans**: TBD
**UI hint**: yes

### Phase 3: The Pocket Build

**Goal**: Recruiters open links on their phone — take the site from "stacks acceptably" to "genuinely great in the hand": the gold star hero reads and performs on a real mid-range phone, the long scroll feels right under a thumb, type and spacing are tuned for small screens, and the canvas degrades gracefully instead of janking or draining battery.
**Mode:** mvp
**Depends on**: Phase 2. Placed after the Story so it can tune the hero *and* the narrative sections in one pass, and before the Showcase so project cards get built against a mobile-correct baseline.
**Requirements**: RESP-01, PERF-01
**Success Criteria** (what must be TRUE):

  1. On a real smartphone the hero is legible and striking — the wordmark, the star, and the typewriter all read without zooming, and nothing overflows horizontally
  2. The star animation holds a smooth frame rate on a mid-range phone, and degrades gracefully (fewer particles / simpler effects) on weak devices instead of janking
  3. Every section (Work cards, Experience timeline, Publications, Story, Contact) stacks into a comfortable single column with touch-sized tap targets
  4. The page is usable and presentable across phone, tablet, and desktop widths
  5. Scrolling and the deep-field parallax stay smooth under touch, and battery/CPU cost is reasonable

**Plans**: TBD
**UI hint**: yes

### Phase 4: The Showcase

**Goal**: Go deep on the work — upgrade the home project cards into links to real case-study pages built from one shared template, fill the media slots with Sirio's actual images/videos, and expand the site from "a few curated entries" to the fuller profile. This is the "expand" half of ship-small-then-expand.
**Mode:** mvp
**Depends on**: Phase 3. **Content dependency:** MEDIA-02 needs Sirio to supply project images/videos (see `.planning/todos/pending/`). Thanks to MEDIA-01 the slots are swappable, so media can be dropped in *before* this phase at any time — this phase is the formal fill + web-encoding pass, not a gate on Sirio.
**Requirements**: CONT-02, PROJ-01, PROJ-02, PROJ-03, LINK-03, MEDIA-02
**Success Criteria** (what must be TRUE):

  1. A Featured Projects section presents 3–5 project cards on the home page, each linking to a detail page
  2. Each flagship project (thesis dispenser, DALSA OT-2, iGEM EndoSense, EMBO publication, AGC dashboards/app) has its own page built from one shared template
  3. Case-study pages display media (images, CAD renders, embeds) and link out to external sources (e.g. iGEM wiki, EMBO DOI)
  4. External project links open in a new tab and resolve correctly
  5. Sirio's real images/videos fill the home-card and case-study media slots, correctly sized and encoded for web (MEDIA-02)

**Plans**: TBD
**UI hint**: yes

### Phase 5: Ready to Share

**Goal**: The final 10% that makes it feel professional — heavy media lazy-loaded for a fast first paint, baseline accessible, and shareable with a clean link-preview card when pasted to a recruiter. (Responsive/mobile performance is not parked here — it ships in Phase 3 and later phases inherit it.)
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: PERF-02, SEO-01, A11Y-01
**Success Criteria** (what must be TRUE):

  1. Heavy assets (project images/videos) are lazy-loaded and the initial load is reasonable
  2. Sharing the URL produces a clean preview card (meta tags + Open Graph/Twitter)
  3. The site meets baseline accessibility (semantic HTML, keyboard navigation, sufficient contrast)
  4. The mobile quality bar set in Phase 3 still holds after all later phases' additions (no regression)

**Plans**: TBD
**UI hint**: yes

### Phase 6: The AI Concierge

**Goal**: A signature interactive feature that *is* a demonstration of Sirio's "build with AI" skill — an "Ask AI about me" prompt bar placed high on the page (around section 2–3, clearly visible). It self-demos by auto-typing an example question and answering, then lets visitors ask their own questions and get concise, **bold**-highlighted, truthful answers grounded in Sirio's portfolio and tuned to represent him favourably. Deliberately **last**: it is the most complex and most optional feature, and the site must be excellent without it.
**Mode:** mvp
**Depends on**: Phase 5. **Architecture decision required at plan time:** real-LLM-via-serverless-proxy (hides the API key; static site stays on GitHub Pages with an API route on e.g. Cloudflare Worker / Vercel — a hybrid) **vs** fully static curated-Q&A (no key, no backend, limited to anticipated questions). No secret key may ship client-side.
**Requirements**: ASKAI-01, ASKAI-02, ASKAI-03, ASKAI-04, ASKAI-05, ASKAI-06
**Success Criteria** (what must be TRUE):

  1. A visitor sees an "Ask AI about me" bar high on the page without hunting for it
  2. When idle/on load, the bar auto-types an example question and shows a structured answer, inviting interaction
  3. Several example/suggested questions are available to click or cycle through
  4. A visitor can submit their own question and receive a concise, well-structured answer (with selective **bold**) drawn from Sirio's portfolio
  5. Answers stay truthful (no fabrication) while representing Sirio favourably, and the shipped site exposes no secret API key

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. The Design Build | 1/3 | In Progress|  |
| 2. The Story | 0/TBD | Not started | - |
| 3. The Pocket Build | 0/TBD | Not started | - |
| 4. The Showcase | 0/TBD | Not started | - |
| 5. Ready to Share | 0/TBD | Not started | - |
| 6. The AI Concierge | 0/TBD | Not started | - |
