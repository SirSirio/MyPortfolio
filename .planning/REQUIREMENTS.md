# Requirements — Sirio Feltrin Portfolio Site

Derived from `.planning/PROJECT.md`. Visual/theme specifics are intentionally deferred (design on hold); these requirements describe *capabilities and structure*, which are theme-independent. REQ-IDs are mapped to phases in the Traceability section (filled by roadmap).

## v1 Requirements

### Foundation & Deploy
- [ ] **FOUND-01**: Project builds to a static bundle deployable to GitHub Pages
- [ ] **FOUND-02**: Site is live at a public URL early (skeleton deploy), with repeatable deploys thereafter
- [ ] **FOUND-03**: Dark-themed design-token system (colors, type scale, spacing) applied site-wide
- [ ] **FOUND-04**: Multi-page architecture with persistent navigation + a single immersive scroll home page

### Hero & Magic Engine
- [ ] **HERO-01**: Landing hero presents a WebGL/3D animated "wow" centerpiece on load
- [ ] **HERO-02**: Hero motion reacts to cursor and/or scroll
- [ ] **HERO-03**: Hero states the identity in one line (design & engineering, biotech hint, automation thread)
- [ ] **HERO-04**: Hero exposes primary actions: View CV and LinkedIn

### Navigation & Structure
- [ ] **NAV-01**: Immersive single-scroll home with distinct, full-height sections
- [ ] **NAV-02**: Smooth scrolling with section anchors and a persistent/access nav
- [ ] **NAV-03**: Tasteful transitions when moving between home and deeper pages

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
- [ ] **LINK-01**: CV is viewable and/or downloadable (PDF and/or Canva link)
- [ ] **LINK-02**: LinkedIn link present and correct
- [ ] **LINK-03**: External project links open in new tab and are verified

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

<!-- Filled by roadmap: maps each REQ-ID to its phase. -->

(Pending roadmap generation)
