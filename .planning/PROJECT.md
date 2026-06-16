# Sirio Feltrin — Portfolio Site ("Engineered Bioluminescence")

## What This Is

A personal portfolio website for **Sirio Vittorio Feltrin** — a Biotechnology MSc student at DTU transitioning into **product design, physical-systems engineering, and lab automation**. It is a modern, dark-themed, animated landing experience that showcases who he is and what he has built, links out to his CV and LinkedIn, and — by virtue of being striking and AI-built — is itself a demonstration of his ability to direct AI to create something polished and "magical." The primary audience is recruiters, hiring managers, and potential collaborators in design/engineering/biotech-adjacent roles.

## Core Value

When someone opens the page, they should immediately think **"wow — this person can build something genuinely impressive,"** and within 30 seconds understand that Sirio sits at the intersection of **biology, engineering/design, and automation**. The wow-moment and that clear identity are the one thing that must work; everything else supports it.

## Requirements

### Validated

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. v1 hypotheses until shipped. -->

- [ ] Immersive dark-themed landing/hero with a WebGL "magic" moment (3D + particles) that lands the "wow" on open
- [ ] Clear one-line identity statement: design & engineering, with a biotech hint and an automation thread
- [ ] Prominent, always-reachable links to **CV** (downloadable/viewable) and **LinkedIn**
- [ ] An immersive single-scroll main page holding the most relevant info (Hero → Story/About → Featured Projects → How I Work With AI → Contact)
- [ ] Separate deeper page(s) for individual project case studies (multi-page architecture, not just one scroll)
- [ ] A dedicated "How I Work With AI" angle that showcases AI-assisted building (the *grano salis* philosophy)
- [ ] Scroll-triggered / cursor-reactive animations conveying "automation" (things assemble, lines draw themselves, particles flow)
- [ ] Responsive and presentable on mobile (recruiters open links on phones)
- [ ] Deployable as a static site to **GitHub Pages**
- [ ] Design led by Claude with Sirio approving/steering at each step (glassmorphic + engineering-blueprint + bio-glow fusion)

### Out of Scope

<!-- Explicit boundaries with reasoning. -->

- Backend / server-side logic — site is static (GitHub Pages constraint, and a portfolio needs none) — revisit only if a contact form needs a backend (can use a serverless form service instead)
- CMS / blog engine — not needed for v1; content is curated and hand-built
- Final written copy and exact project selection — deferred; content discussion happens *after* the visual/structural skeleton exists (user's explicit request)
- E-commerce, auth, user accounts — irrelevant to a portfolio
- Light theme — user explicitly chose dark

## Context

- **Source of truth for content:** `D:/06. Job & Applications/00_Profile/profile.md` (full master profile) plus other MD files one folder up (`02_Applications/`, `03_Research/`, `04_Tracking/`). Read these before writing any site copy.
- **Sirio's story / differentiator:** Biotech MSc who, through being iGEM Wet Lab Lead (EndoSense cell-free biosensor) and countless late nights fixing broken lab equipment, realized repetitive manual lab work bottlenecks science — and pivoted toward the design/automation/hardware layer. Culminated in an MSc thesis on a portable precision liquid-dispensing device (Fusion360 CAD + Arduino + 3D printing + a custom AI-assisted testing app).
- **Flagship projects to potentially feature:** (1) MSc thesis — portable precision liquid dispenser; (2) DALSA lab-automation course — Opentrons OT-2 automated gel electrophoresis (~785-line Python protocol + 5 custom 3D-printed parts, 12/12 grade); (3) iGEM EndoSense cell-free biosensor (Gold Medal, public wiki: https://2024.igem.wiki/DTU-Denmark/); (4) EMBO Journal 2025 publication (SMAD2 cryptic phosphorylation, MD simulations + Python); (5) AGC Biologics — Power BI dashboards + self-initiated Azure/Python shift-management web app.
- **AI philosophy (a deliberate site theme):** *cum grano salis* — AI as a powerful tool that eliminates repetitive cognitive friction but is entirely dependent on conscious human direction and critical judgment. The site itself is proof-of-concept of that philosophy.
- **Reference (inspiration, NOT to copy):** A friend's site — https://leoitaly.github.io/my-website/ — sparked the idea. Sirio wants something original, not a lookalike.
- **Links:** LinkedIn https://www.linkedin.com/in/sirio-vittorio-feltrin/ ; existing Canva CV https://canva.link/5a5yj5bdg78axhv ; email sirio.feltrin@gmail.com (profile) / airsiriomax@gmail.com (account).
- **Assets needed:** Will require images/renders (CAD screenshots, device photos, iGEM visuals, headshot). To be gathered/produced during the content phase.

## Constraints

- **Hosting**: Static site on **GitHub Pages** — no server-side runtime; everything client-side. *Why:* free, clean shareable link, fits a portfolio; matches the inspiration reference's setup.
- **Tech stack**: Full **WebGL / Three.js** (or shader-based) for the 3D "magic engine," plus modern HTML/CSS/JS. *Why:* user chose maximum wow ceiling; must still build to a static bundle deployable to GitHub Pages.
- **Theme**: **Dark** only. *Why:* explicit user preference; suits the bioluminescent-glow aesthetic.
- **Performance**: Must stay smooth and load reasonably on mobile despite 3D. *Why:* recruiters open links on phones; a janky "wow" effect backfires.
- **Design ownership**: Claude leads design, Sirio approves/steers each step. *Why:* user explicitly delegated design direction while wanting to react and refine.
- **Identity balance**: Engineering/design is the primary visual identity; biotech is a *hint* (the glow), automation is the *motion*. *Why:* reflects where Sirio is heading professionally, not just where he came from.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark, WebGL-driven "Engineered Bioluminescence" aesthetic (blueprint/engineering structure + bioluminescent bio-glow + automation motion) | User wants it to represent design+engineering with a biotech hint and automation, dark, "feels like magic," and original (not a template) | — Pending |
| Hybrid structure: immersive single-scroll main page + separate deeper project pages | User wanted "a mix" — most relevant info in the main scroll, with room for depth on dedicated pages | — Pending |
| Full 3D / WebGL magic engine (Three.js / shaders) | User selected maximum wow ceiling; aligns with goal of showcasing AI-built impressiveness | — Pending |
| GitHub Pages hosting (static build) | User selected; free, clean link, matches inspiration; custom domain can be added later | — Pending |
| Claude leads design with per-step user approval | User explicitly asked Claude to design it while staying in the loop to react/refine | — Pending |
| Defer final content/copy and project selection until skeleton exists | User asked to settle look & structure first, discuss content later | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-16 after initialization*
