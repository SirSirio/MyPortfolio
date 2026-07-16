<!-- GSD:project-start source:PROJECT.md -->

## Project

**Sirio Feltrin — Portfolio Site ("Engineered Bioluminescence")**

A personal portfolio website for **Sirio Vittorio Feltrin** — a Biotechnology MSc student at DTU transitioning into **product design, physical-systems engineering, and lab automation**. It is a modern, dark-themed, animated landing experience that showcases who he is and what he has built, links out to his CV and LinkedIn, and — by virtue of being striking and AI-built — is itself a demonstration of his ability to direct AI to create something polished and "magical." The primary audience is recruiters, hiring managers, and potential collaborators in design/engineering/biotech-adjacent roles.

**Core Value:** When someone opens the page, they should immediately think **"wow — this person can build something genuinely impressive,"** and within 30 seconds understand that Sirio sits at the intersection of **biology, engineering/design, and automation**. The wow-moment and that clear identity are the one thing that must work; everything else supports it.

### Constraints

- **Hosting**: Static site on **GitHub Pages** — no server-side runtime; everything client-side. *Why:* free, clean shareable link, fits a portfolio; matches the inspiration reference's setup.
- **Tech stack**: **Canvas-2D "cosmic engine"** (`star-engine.js` — starfields, galaxies, the living Sirio Star) plus modern HTML/CSS/JS, per the approved Claude Design ("Sirio V4 - Deep Field × Hyperlight"). Supersedes the earlier WebGL/Three.js intent — the approved design achieves the wow-moment with Canvas 2D and stays lighter on mobile. Builds to a static bundle deployable to GitHub Pages.
- **Theme**: **Dark** only. *Why:* explicit user preference; suits the bioluminescent-glow aesthetic.
- **Performance**: Must stay smooth and load reasonably on mobile despite 3D. *Why:* recruiters open links on phones; a janky "wow" effect backfires.
- **Design ownership**: Claude leads design, Sirio approves/steers each step. *Why:* user explicitly delegated design direction while wanting to react and refine.
- **Identity balance**: Engineering/design is the primary visual identity; biotech is a *hint* (the glow), automation is the *motion*. *Why:* reflects where Sirio is heading professionally, not just where he came from.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->

## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
