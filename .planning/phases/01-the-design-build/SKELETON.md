# Walking Skeleton — Sirio Feltrin Portfolio ("Engineered Bioluminescence")

**Phase:** 1
**Generated:** 2026-07-16

## Capability Proven End-to-End

> One sentence: the smallest user-visible capability that exercises the full stack.

"A visitor can open a public github.io URL and see the deployed dark cosmic page, and pushing a commit to the default branch redeploys it automatically." (There is no database or API in this static project — the deploy loop IS the stack; the DB/API slice elements are interpreted as "static content rendered + repeatable deploy working.")

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | None — plain static HTML/CSS/ES-modules | Design source is static HTML/CSS/JS; `star-engine.js` is already a clean ES module. Avoids a build step, a bundler, and any npm/pip/cargo install (no package legitimacy gate needed). Fits GitHub Pages' no-runtime constraint. |
| "Data layer" | Static curated content hand-authored in `app/index.html` | No backend allowed (Pages). Content is curated from `../00_Profile/profile.md`. |
| Rendering engine | Canvas-2D via `star-engine.js` (`HeroStar`, deep-field parallax) | The approved Claude Design implements the "wow" hero as an animated Canvas-2D star. This supersedes the earlier "WebGL/Three.js" aspiration in REQUIREMENTS/CLAUDE.md — the later-approved design is the source of truth. |
| Deployment target | GitHub Pages via GitHub Actions workflow (`.github/workflows/deploy.yml`) uploading `app/` | Repeatable "push -> redeploy" (FOUND-02); keeps site source in a clean subfolder separate from planning docs; no Jekyll surprises; `gh` CLI is absent so repo/Pages creation is a one-time human checkpoint. |
| Directory layout | Site source under `app/`; CI under `.github/workflows/`; planning under `.planning/` | `app/` is the Pages artifact root. Superseded material lives in the git-ignored `_Archive/` and is never built on, reused, or read as context. |
| Fonts | Google Fonts CDN: Space Grotesk (display), Hanken Grotesk (body), Space Mono (labels) | Mandated by the design/brief §2. |
| Hero palette | GOLD variant — glow `rgb(255,196,110)`, core `rgb(255,236,200)` | Locked by CONTEXT/ROADMAP (user prefers the gold Sirio Star tweak). |

## Stack Touched in Phase 1

- [x] Project scaffold — `app/` static source (index.html, styles.css, main.js, star-engine.js, .nojekyll, README.md)
- [x] Routing — single-page long scroll with in-page section anchors (`#index`, `#work`, `#experience`, `#publications`, `#contact`)
- [x] "Database" (static content) — real curated Work/Experience/Publications/Contact content rendered from profile.md
- [x] UI wired to the engine — the gold `HeroStar` + deep-field parallax driven by `main.js` importing `star-engine.js`
- [x] Deployment — live github.io URL via the Actions Pages workflow, redeploying on every push

## Out of Scope (Deferred to Later Slices)

> Explicit list so future phases do not re-litigate Phase 1's minimalism.

- AI "Ask about me" concierge bar — Phase 2 (ASKAI-01..06)
- Scroll-triggered reveal/assemble choreography (`data-reveal`), section parallax (`data-para`) — Phase 4 (MOTION-01/02). Sections render visible/static in Phase 1; only the ambient deep-field starfield + breathing star + i-orb orbits + rotating rings ship now.
- Project deep-dive case-study pages + warp-jump transitions (`data-open`/`data-close`/`data-jump`, `data-warpov`, the `[data-proj]` pages) — Phase 5 (PROJ-01..03). Work cards are display-only in Phase 1.
- Verified external project/publication links (`target=_blank` out to iGEM wiki / EMBO DOI) — Phase 5 (LINK-03). The `↗` glyphs are visual only in Phase 1.
- SEO/Open-Graph meta cards, full accessibility + performance audit, cursor-parallax — Phase 5 (SEO-01, A11Y-01, RESP-01, PERF-01/02). Baseline responsiveness + prefers-reduced-motion are still honored now.
- Real project imagery/video — the user supplies later; media slots stay as labeled striped placeholders.

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions (static `app/`, Actions deploy, Canva-2D engine):

- Phase 2 — The AI Concierge: an "Ask AI about me" bar high on the page (architecture decision at plan time: serverless proxy vs. static curated-Q&A; no key ships client-side — may add a serverless origin OUTSIDE the Pages static bundle).
- Phase 3 — The Story: immersive About/journey + "How I Work With AI" + Contact narrative with scroll motion.
- Phase 4 — The Showcase: Featured Projects + reusable case-study deep-dive pages (activates the deferred `[data-proj]` pages + warp jumps).
- Phase 5 — Ready to Share: responsive/perf hardening, accessibility, SEO/OG cards, launch.
