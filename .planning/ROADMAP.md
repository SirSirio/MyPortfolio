# Roadmap: Sirio Feltrin Portfolio Site ("Engineered Bioluminescence")

## Overview

This roadmap is shaped around the **content and experience** of the site, not technical layers — each phase is a meaningful chunk a visitor actually feels. We first lock the look (and quietly get it live), then land the first impression, then tell the story, then show the work, then make it launch-ready. Technical plumbing (build, deploy, performance) is folded invisibly into the relevant phase rather than standing alone as a dry milestone. The visual theme is intentionally deferred — the style system in Phase 1 and the magic engine in Phase 2 are built so the chosen aesthetic plugs in without restructuring. Real content for each chunk is settled at the start of that phase (profile is the source); there is no single blocking "write all copy" phase.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: The Look** - Visual style & layout system, dark theme, responsive base, page/scroll scaffold — quietly live on GitHub Pages
- [ ] **Phase 2: The First Impression** - WebGL "wow" hero, one-line identity, persistent nav, CV/LinkedIn actions
- [ ] **Phase 3: The Story** - Immersive single-scroll narrative: About/journey, How-I-Work-With-AI, Contact, with scroll motion
- [ ] **Phase 4: The Showcase** - Featured projects on the home page + dedicated case-study pages for flagship work
- [ ] **Phase 5: Ready to Share** - Responsive/3D performance, accessibility, SEO/Open Graph, launch

## Phase Details

### Phase 1: The Look
**Goal**: Lock how the site *feels* before any words — a dark visual style and layout system (design tokens for color, type, spacing) applied across a multi-page + single-scroll scaffold — and quietly get it live on GitHub Pages so every later phase builds into a real, deployable, styled shell.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. A visitor can open a public GitHub Pages URL and see a styled, dark-themed site
  2. Pushing a change redeploys the live site through a repeatable build/deploy step
  3. The home is a single scrollable page and at least one separate route/page exists and is reachable
  4. Colors, type scale, and spacing come from a shared design-token system applied site-wide (no ad-hoc styling)
**Plans**: TBD
**UI hint**: yes

### Phase 2: The First Impression
**Goal**: Land the 5-second "woah, who is this?" hook — a WebGL/3D animated centerpiece that reacts to cursor/scroll, a one-line identity statement, a persistent nav, and always-reachable CV and LinkedIn actions. This is where the chosen visual theme plugs in.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, NAV-02, LINK-01, LINK-02
**Success Criteria** (what must be TRUE):
  1. On opening the page, a visitor sees an animated WebGL/3D centerpiece running on load
  2. The hero centerpiece visibly reacts to cursor movement and/or scroll
  3. A one-line identity statement (design & engineering, biotech hint, automation thread) is readable in the hero
  4. A persistent nav exposes always-reachable "View CV" and "LinkedIn" actions, and both open the correct destinations
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
| 1. The Look | 0/TBD | Not started | - |
| 2. The First Impression | 0/TBD | Not started | - |
| 3. The Story | 0/TBD | Not started | - |
| 4. The Showcase | 0/TBD | Not started | - |
| 5. Ready to Share | 0/TBD | Not started | - |
