# Roadmap: Sirio Feltrin Portfolio Site ("Engineered Bioluminescence")

## Overview

This roadmap is shaped around the **content and experience** of the site, not technical layers — each phase is a meaningful chunk a visitor actually feels. The visual theme is no longer deferred — it was settled in Claude Design ("Sirio Star" hero + "Sirio V4 - Deep Field × Hyperlight" page), and Phase 1 implements that approved design directly (look + hero + curated content, live on Pages). Then the AI concierge, the story, the showcase, and launch-readiness follow. Technical plumbing (build, deploy, performance) is folded invisibly into the relevant phase rather than standing alone as a dry milestone. Real content for each chunk is settled at the start of that phase (profile is the source); there is no single blocking "write all copy" phase.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: The Design Build** - Implement the approved Claude Design (Sirio V4 Deep Field × Hyperlight page + real Sirio Star gold hero) with curated portfolio content, live on GitHub Pages
- [ ] **Phase 2: The AI Concierge** - "Ask AI about me" bar high on the page: self-demoing, portfolio-grounded, favourable-but-truthful answers
- [ ] **Phase 3: The Story** - Immersive single-scroll narrative: About/journey, How-I-Work-With-AI, Contact, with scroll motion
- [ ] **Phase 4: The Showcase** - Featured projects on the home page + dedicated case-study pages for flagship work
- [ ] **Phase 5: Ready to Share** - Responsive/3D performance, accessibility, SEO/Open Graph, launch

## Phase Details

### Phase 1: The Design Build

**Goal**: Implement the approved Claude Design as the real site — the "Sirio V4 - Deep Field × Hyperlight" long-scroll page (cosmic dark theme, star-spectrum sections, nav, glass cards) with the real "Sirio Star" hero (**gold variant** preferred) integrated in place of the mockup — filled with curated content from Sirio's portfolio (profile is the source; most important projects/experience first, page stays tight, not exhaustive) and live on GitHub Pages.
**Mode:** mvp
**Depends on**: Nothing (first phase). **Design sources of truth** (fetch via DesignSync at plan/execute time):

  - Hero: `Sirio Star.dc.html` in Claude Design project `4328e41c-9f30-4c64-98f9-2445eb57d486` ("Sirio Feltrin Portfolio Design") — user prefers the **gold** tweak
  - Full page: `Sirio V4 - Deep Field × Hyperlight.dc.html` + `star-engine.js` in project `42d7cdbc-c6e1-47dd-aaef-a49e89035dce`
  - The V4 file contains only a mockup star — the real Sirio Star must replace it
  - The untracked `site/` folder is an old discarded mockup — do not build on it

**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, HERO-01, HERO-02, HERO-03, HERO-04, NAV-02, LINK-01, LINK-02
**Success Criteria** (what must be TRUE):

  1. A visitor can open a public GitHub Pages URL and see the implemented Deep Field × Hyperlight design: dark cosmic single-scroll page matching the approved Claude Design
  2. The hero is the real animated Sirio Star (gold variant) — running on load and reacting to cursor/scroll — not the V4 mockup
  3. Sections (work, experience, publications, contact) are filled with real, curated portfolio content — the most important items first, page deliberately not exhaustive
  4. A persistent nav exposes working "View CV" and "LinkedIn" actions, and a one-line identity statement is readable in the hero
  5. Pushing a change redeploys the live site through a repeatable build/deploy step

**Plans**: 3 plans
**Wave 1**

  - [x] 01-01-PLAN.md — Walking Skeleton: app/ scaffold + GitHub Actions Pages pipeline, live at a public URL

**Wave 2** *(blocked on Wave 1 completion)*

  - [ ] 01-02-PLAN.md — Living GOLD Sirio Star hero + deep-field parallax + persistent nav (CV/LinkedIn) + design tokens

**Wave 3** *(blocked on Wave 2 completion)*

  - [ ] 01-03-PLAN.md — Curated content sections: Mission, Selected Work, Experience, Publications, Contact

**UI hint**: yes

### Phase 2: The AI Concierge

**Goal**: A signature interactive feature that *is* a demonstration of Sirio's "build with AI" skill — an "Ask AI about me" prompt bar placed high on the page (around section 2–3, clearly visible). It self-demos by auto-typing an example question and answering, then lets visitors ask their own questions and get concise, **bold**-highlighted, truthful answers grounded in Sirio's portfolio and tuned to represent him favourably.
**Mode:** mvp
**Depends on**: Phase 1. **Architecture decision required at plan time:** real-LLM-via-serverless-proxy (hides the API key; static site stays on GitHub Pages with an API route on e.g. Cloudflare Worker / Vercel — a hybrid) **vs** fully static curated-Q&A (no key, no backend, limited to anticipated questions). No secret key may ship client-side.
**Requirements**: ASKAI-01, ASKAI-02, ASKAI-03, ASKAI-04, ASKAI-05, ASKAI-06
**Success Criteria** (what must be TRUE):

  1. A visitor sees an "Ask AI about me" bar high on the page without hunting for it
  2. When idle/on load, the bar auto-types an example question and shows a structured answer, inviting interaction
  3. Several example/suggested questions are available to click or cycle through
  4. A visitor can submit their own question and receive a concise, well-structured answer (with selective **bold**) drawn from Sirio's portfolio
  5. Answers stay truthful (no fabrication) while representing Sirio favourably, and the shipped site exposes no secret API key

**Plans**: TBD
**UI hint**: yes

### Phase 3: The Story

**Goal**: Turn "impressive" into "I want to talk to this person" — the home becomes an immersive single-scroll narrative of who Sirio is: the biotech → design/automation pivot (About/journey), the "how I work with AI" philosophy, and a Contact close, with scroll-triggered motion that conveys "automation." Built with profile-sourced content settled at phase start.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-03, CONT-01, CONT-03, CONT-04, MOTION-01, MOTION-02
**Success Criteria** (what must be TRUE):

  1. A visitor can scroll through distinct full-height sections (About/journey, How I Work With AI, Contact) on one page
  2. The About section narrates the biotech to design/automation pivot in Sirio's voice
  3. Sections reveal/assemble with scroll-triggered animations, and home↔page transitions feel intentional
  4. Animations are suppressed/reduced when the visitor has `prefers-reduced-motion` enabled
  5. A Contact section presents email and social links that work

**Plans**: TBD
**UI hint**: yes

### Phase 4: The Showcase

**Goal**: Show the work that makes recruiters lean in — a Featured Projects section on the home scroll plus a reusable case-study template filled into dedicated deep-dive pages for the flagship projects, with media and verified external links.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: CONT-02, PROJ-01, PROJ-02, PROJ-03, LINK-03
**Success Criteria** (what must be TRUE):

  1. A Featured Projects section presents 3–5 project cards on the home page, each linking to a detail page
  2. Each flagship project (thesis dispenser, DALSA OT-2, iGEM EndoSense, EMBO publication, AGC dashboards/app) has its own page built from one shared template
  3. Case-study pages display media (images, CAD renders, embeds) and link out to external sources (e.g. iGEM wiki, EMBO DOI)
  4. External project links open in a new tab and resolve correctly

**Plans**: TBD
**UI hint**: yes

### Phase 5: Ready to Share

**Goal**: The final 10% that makes it feel professional — responsive across devices, smooth on mobile with graceful 3D degradation, baseline accessible, and shareable with a clean link-preview card when pasted to a recruiter.
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: RESP-01, PERF-01, PERF-02, SEO-01, A11Y-01
**Success Criteria** (what must be TRUE):

  1. The site is fully usable and presentable on mobile, tablet, and desktop
  2. 3D/animations stay smooth on mobile and degrade gracefully on weaker devices instead of janking
  3. Heavy assets are lazy-loaded and the initial load is reasonable
  4. Sharing the URL produces a clean preview card (meta tags + Open Graph/Twitter)
  5. The site meets baseline accessibility (semantic HTML, keyboard navigation, sufficient contrast)

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. The Design Build | 1/3 | In Progress|  |
| 2. The AI Concierge | 0/TBD | Not started | - |
| 3. The Story | 0/TBD | Not started | - |
| 4. The Showcase | 0/TBD | Not started | - |
| 5. Ready to Share | 0/TBD | Not started | - |
