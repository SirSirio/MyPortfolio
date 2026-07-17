# Requirements — Sirio Feltrin Portfolio Site

Derived from `.planning/PROJECT.md`. Visual/theme specifics are intentionally deferred (design on hold); these requirements describe *capabilities and structure*, which are theme-independent. REQ-IDs are mapped to phases in the Traceability section (filled by roadmap).

## v1 Requirements

### Foundation & Deploy

- [x] **FOUND-01**: Project builds to a static bundle deployable to GitHub Pages
- [x] **FOUND-02**: Site is live at a public URL early (skeleton deploy), with repeatable deploys thereafter
- [x] **FOUND-03**: Dark-themed design-token system (colors, type scale, spacing) applied site-wide
- [x] **FOUND-04**: Multi-page architecture with persistent navigation + a single immersive scroll home page

### Hero & Magic Engine

- [x] **HERO-01**: Landing hero presents a WebGL/3D animated "wow" centerpiece on load
- [x] **HERO-02**: Hero motion reacts to cursor and/or scroll
- [x] **HERO-03**: Hero states the identity in one line (design & engineering, biotech hint, automation thread)
- [x] **HERO-04**: Hero exposes primary actions: View CV and LinkedIn

### Navigation & Structure

- [ ] **NAV-01**: Immersive single-scroll home with distinct, full-height sections
- [x] **NAV-02**: Smooth scrolling with section anchors and a persistent/access nav
- [ ] **NAV-03**: Tasteful transitions when moving between home and deeper pages

### AI Concierge ("Ask AI about me")

- [ ] **ASKAI-01**: An "Ask AI about me" prompt bar is present high on the page (≈ section 2–3), visible without deep scrolling
- [ ] **ASKAI-02**: The bar self-demos — on load/idle it auto-types an example question and shows an answer, inviting the visitor to try
- [ ] **ASKAI-03**: Several example/suggested questions are offered (clickable or cycling)
- [ ] **ASKAI-04**: A visitor can submit their own question and receive an answer grounded in Sirio's portfolio
- [ ] **ASKAI-05**: Answers are concise and well-structured with selective **bold** emphasis; truthful (no fabrication) while representing Sirio favourably
- [ ] **ASKAI-06**: The answer backend exposes no secret API key in the shipped site (serverless proxy OR static curated-Q&A, decided at plan time); basic abuse/rate protection if a live LLM is used

### Main-Scroll Content

- [ ] **CONT-01**: About/Story section narrating the biotech → design/automation pivot
- [ ] **CONT-02**: Featured Projects section (3–5 highlight cards linking to detail pages)
- [ ] **CONT-03**: "How I Work With AI" section conveying the *grano salis* philosophy
- [ ] **CONT-04**: Contact section with email and social links

### Project Deep-Dives

- [ ] **PROJ-01**: Reusable project case-study page template
- [ ] **PROJ-02**: Individual deep-dive pages for flagship projects (thesis dispenser, DALSA OT-2, iGEM EndoSense, EMBO publication, AGC dashboards/app)
- [ ] **PROJ-03**: Case-study pages support media (images, CAD renders, embeds) and external links (iGEM wiki, EMBO DOI)

### Motion & Experience

- [ ] **MOTION-01**: Scroll-triggered animations across sections (reveal / assemble / draw-on)
- [ ] **MOTION-02**: Animations honor `prefers-reduced-motion`

### Links & Assets

- [x] **LINK-01**: CV is viewable and/or downloadable (PDF and/or Canva link)
- [x] **LINK-02**: LinkedIn link present and correct
- [ ] **LINK-03**: External project links open in new tab and are verified

### Media

- [x] **MEDIA-01**: Media slots are swappable — assets live in a documented folder and filling a slot with a real image/video is a drop-in plus a one-line reference, requiring no re-engineering. Slots ship as labeled striped placeholders until assets exist.
- [ ] **MEDIA-02**: Sirio's real project images/videos fill the home-card and case-study media slots, correctly sized and encoded for web
  - *Blocked on Sirio supplying assets — none exist yet; profile.md carries no media.*

### Responsive & Performance

- [ ] **RESP-01**: Fully responsive across mobile, tablet, desktop
- [ ] **PERF-01**: 3D/animations stay smooth on mobile with graceful degradation
- [ ] **PERF-02**: Heavy assets are lazy-loaded; reasonable initial load

### Discoverability

- [ ] **SEO-01**: Meta tags + Open Graph/Twitter cards for clean link previews when shared
- [ ] **A11Y-01**: Baseline accessibility (semantic HTML, keyboard navigation, sufficient contrast)

## v2 / Later

- [ ] **DEPLOY-V2-01**: Custom domain (e.g. siriofeltrin.com) pointed at the host
- [ ] **CONT-V2-01**: Dedicated full CV page (rather than only linking the PDF/Canva)
- [ ] **PROJ-V2-01**: Additional/secondary project pages beyond the flagships
- [ ] **CONT-V2-02**: Light/contact form via a serverless form service

## Out of Scope

- Backend / server-side runtime — site is static (GitHub Pages); none needed
- CMS / blog engine — content is curated and hand-built for v1
- Auth / accounts / e-commerce — irrelevant to a portfolio
- Light theme — user chose dark
- Final written copy & exact project selection — deferred to the content phase by user request (skeleton/structure first)

## Traceability

Maps each v1 REQ-ID to its phase. v2/Later and Out-of-Scope items are not mapped.

**Coverage: 36/36 v1 requirements mapped (100%). No orphans, no duplicates.**

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 — The Design Build | Complete |
| FOUND-02 | Phase 1 — The Design Build | Complete |
| FOUND-03 | Phase 1 — The Design Build | Complete |
| FOUND-04 | Phase 1 — The Design Build | Complete |
| HERO-01 | Phase 1 — The Design Build | Complete |
| HERO-02 | Phase 1 — The Design Build | Complete |
| HERO-03 | Phase 1 — The Design Build | Complete |
| HERO-04 | Phase 1 — The Design Build | Complete |
| NAV-02 | Phase 1 — The Design Build | Complete |
| LINK-01 | Phase 1 — The Design Build | Complete |
| LINK-02 | Phase 1 — The Design Build | Complete |
| MEDIA-01 | Phase 1 — The Design Build | Complete |
| NAV-01 | Phase 2 — The Story | Pending |
| CONT-01 | Phase 2 — The Story | Pending |
| CONT-03 | Phase 2 — The Story | Pending |
| CONT-04 | Phase 2 — The Story | Pending |
| MOTION-01 | Phase 2 — The Story | Pending |
| MOTION-02 | Phase 2 — The Story | Pending |
| NAV-03 | Phase 2.1 — The Automation Deep-Dive | Pending |
| RESP-01 | Phase 3 — The Pocket Build | Pending |
| PERF-01 | Phase 3 — The Pocket Build | Pending |
| CONT-02 | Phase 4 — The Showcase | Pending |
| PROJ-01 | Phase 4 — The Showcase | Pending |
| PROJ-02 | Phase 4 — The Showcase | Pending |
| PROJ-03 | Phase 4 — The Showcase | Pending |
| LINK-03 | Phase 4 — The Showcase | Pending |
| MEDIA-02 | Phase 4 — The Showcase | Pending |
| PERF-02 | Phase 5 — Ready to Share | Pending |
| SEO-01 | Phase 5 — Ready to Share | Pending |
| A11Y-01 | Phase 5 — Ready to Share | Pending |
| ASKAI-01 | Phase 6 — The AI Concierge | Pending |
| ASKAI-02 | Phase 6 — The AI Concierge | Pending |
| ASKAI-03 | Phase 6 — The AI Concierge | Pending |
| ASKAI-04 | Phase 6 — The AI Concierge | Pending |
| ASKAI-05 | Phase 6 — The AI Concierge | Pending |
| ASKAI-06 | Phase 6 — The AI Concierge | Pending |
