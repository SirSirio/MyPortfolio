---
phase: quick-260824-fms
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - site/i18n.js
  - site/index.html
  - site/styles.css
  - site/main.js
  - site/assets/media/README.md
  - site/assets/media/pv-landing.png
  - site/assets/media/pv-data-collection.png
  - site/assets/media/pv-analysis-charts.png
  - site/assets/media/pv-analysis-scores.png
  - site/cv/index.html
  - .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs
autonomous: false
requirements: [QUICK-260824-fms]

must_haves:
  truths:
    - "A visitor sees FOUR cards in Selected Work, and the new software card sits between the Portable Precision Liquid Dispenser and the Automated Gel Electrophoresis cards"
    - "Clicking (or pressing Enter/Space on) the new card warps into a full-screen deep-dive, exactly like the OT-2 card does"
    - "The deep-dive opens problem-first and then covers three chapters: the thesis testing app, the multi-API literature search engine, and the AGC shift app"
    - "The thesis-app chapter shows FOUR real screenshots of Sirio's Pump Validator app — no placeholder, no abstract stand-in"
    - "The AGC chapter carries NO image, NO screenshot, NO UI mockup and NO internal detail — only a description of what it does, the stack, and the build-vs-buy decision"
    - "Switching the site to Italian re-renders every word of the new card and the new deep-dive in Italian"
    - "'back to work' returns the visitor to the landing page, and the OT-2 deep-dive still opens, animates and closes exactly as before"
    - "The four screenshots live only under site/assets/media/ with relative paths — no copies left at the repo root"
    - "The nav CV link opens Sirio's CV hosted on his own domain at /cv/, and neither the URL nor the page mentions ALK"
    - "The hosted CV is readable on a phone without horizontal scrolling, and still prints as A4"
  artifacts:
    - path: "site/i18n.js"
      provides: "EN + IT strings for the new plate (work.plateSw.*) and the deep-dive (sw.*)"
      contains: "work.plateSw.title"
    - path: "site/index.html"
      provides: "The fourth work plate + the [data-proj=\"soft\"] deep-dive overlay + two authored SVG diagrams + four real screenshots + the repointed CV link"
      contains: "data-proj=\"soft\""
    - path: "site/assets/media/pv-landing.png"
      provides: "The Pump Validator landing screen — the chapter-one identity shot"
    - path: "site/assets/media/pv-data-collection.png"
      provides: "The Design of Experiments table — the artefact that proves D-02"
    - path: "site/cv/index.html"
      provides: "The self-hosted CV subpage served at /cv/"
      contains: "Sirio Vittorio Feltrin"
    - path: "site/styles.css"
      provides: "[data-proj=\"soft\"] accent/ground rules + .sw-* diagram vocabulary + .sw-pair + [data-open] affordance"
      contains: "[data-proj=\"soft\"]"
    - path: "site/main.js"
      provides: "initSoftMotion / killProjMotion + the per-overlay motion dispatch"
      contains: "initSoftMotion"
    - path: ".planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs"
      provides: "Automated i18n-parity + structure + asset + CV + OT-2 regression gate"
  key_links:
    - from: "site/index.html [data-open=\"soft\"]"
      to: "site/index.html [data-proj=\"soft\"]"
      via: "openProj() id lookup in main.js"
      pattern: "data-open=\"soft\""
    - from: "site/index.html [data-i18n] keys in the new markup"
      to: "site/i18n.js STRINGS.en + STRINGS.it"
      via: "applyLang() attribute sweep"
      pattern: "sw\\.s[1-5]\\."
    - from: "site/index.html chapter-one figures"
      to: "site/assets/media/pv-*.png"
      via: "relative <img src> — never a remote src"
      pattern: "\\./assets/media/pv-"
    - from: "site/index.html nav"
      to: "site/cv/index.html"
      via: "relative href=\"./cv/\" replacing the Canva link"
      pattern: "href=\"\\./cv/\""
    - from: "site/main.js applyTrans() arrival branch"
      to: "initSoftMotion()"
      via: "PROJ_MOTION dispatch keyed on the arriving overlay id"
      pattern: "PROJ_MOTION"
---

<objective>
Two independent pieces of work, both aimed at the same gap — the portfolio shows hardware
and no software, and its CV link points off-site to Canva.

1. **The digital-solutions deep-dive (Tasks 1–3).** A fourth Selected Work card — an umbrella
   "digital solutions" item — that warps into its own full-screen deep-dive covering three
   software projects as chapters (the Pump Validator thesis testing app, the multi-API
   literature search and ranking engine, and the AGC shift app).
2. **The self-hosted CV (Task 4).** Copy Sirio's current CV in as `site/cv/index.html` and
   repoint the nav link at it, so the CV lives on his own domain under a neutral URL.

Purpose: the site currently shows two robots and a biosensor and no software, which
undercuts the claim that Sirio works on both the physical and the digital side. Both pieces
are evergreen — they outlive the application that prompted them and carry no employer
references.

Output: a new work plate, a second `[data-proj]` deep-dive overlay built on the OT-2
structural template, four real Pump Validator screenshots, two hand-authored abstract SVG
diagrams, full EN + IT copy, the JS wiring that gives the second overlay its own
scroll-telling, and a hosted CV subpage.
</objective>

<execution_context>
@D:/06. Job & Applications/05_Portfolio/.claude/gsd-core/workflows/execute-plan.md
@D:/06. Job & Applications/05_Portfolio/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/260824-fms-CONTEXT.md
@CLAUDE.md
@ALK_Application_Context.md

**Read before writing ANY markup or CSS. Sirio has now asked for this twice — it is not
optional, and it is not a skim:**
@.claude/skills/design-taste-frontend/SKILL.md

Source of truth for every factual claim (read the cited lines, do not skim the whole file):
@../00_Profile/profile.md   — lines 58, 196–199, 336–361, 430–465, 477–483

Second factual source, new as of 2026-08-24 — the four Pump Validator screenshots Sirio
dropped in the repo root. LOOK AT THEM (they are readable images) before writing chapter-one
copy; they are the only record of the app's name and module set:
@AppLandingPage.png
@DataCollectionPage.png
@DataAnalysisEx1.png
@DataAnalysisEx2.png

The structural template and the code being extended:
@site/index.html            — nav CV link at 33; work plates at 195–306; warp overlay + OT-2 deep-dive at 660–934
@site/i18n.js               — the whole dictionary; `dd.*` is the namespace to mirror
@site/main.js               — openProj/closeProj/applyTrans at 206–290 and 364–420; initOt2Motion at 288–362; boot wiring at 536–599
@site/styles.css            — .plate 1565–1604; .media-slot 1666–1728; .device-frame 2698–2760; the OT-2 overlay block 2349–3008
@site/assets/media/README.md — asset rules (no stock, no AI imagery, relative paths, committed files)
</context>

<locked_decisions>
Every decision below comes from `260824-fms-CONTEXT.md` unless marked otherwise, and is
NON-NEGOTIABLE. IDs are assigned here for traceability; cite them in commit messages and in
the SUMMARY.

| ID | Decision |
|----|----------|
| D-01 | ONE umbrella page covering all three software projects as chapters — not three cards, not three pages |
| D-02 | Chapter one = the thesis testing app: guides randomised experimental data collection, logs to JSON, runs automated sample analysis with Design of Experiments methodology (profile.md:58) |
| D-03 | Chapter two = the Multi-API Literature Search & Ranking Engine: Python pipeline, 7 scientific APIs, Reciprocal Rank Fusion ranking, BibTeX pipeline (profile.md:336–361); public at https://sirsirio.github.io/thesis-tools/ |
| D-04 | Chapter three = the AGC shift app: DESCRIBE, NO VISUALS. Name what it does, the stack (database-driven, Azure-hosted, Python backend, mobile-friendly), the corporate-IT process, and the build-vs-buy angle. NO screenshots, NO internal details, NO data, NO UI mockups that imply its real UI, NO architecture diagram of its internals |
| D-05 | Media = hand-authored abstract animated SVG in the site's existing cosmic/technical language (the Double Diamond SVG is the reference). No remote embeds — first-party committed assets only. **⚠ SUPERSEDED IN PART by D-10 — see below** |
| D-06 | Problem-first narrative mirroring the OT-2 deep-dive: numbered `proj-sec` sections with `section__numeral`, an overall framing first, then per-chapter, each chapter problem-first |
| D-07 | The new plate is inserted BETWEEN plate 1 (Portable Precision Liquid Dispenser) and plate 2 (Automated Gel Electrophoresis), and becomes the SECOND clickable plate — `data-open`, `role="button"`, `tabindex="0"`, `aria-label`, following plate 2's pattern exactly |
| D-08 | ALL copy goes through `site/i18n.js` in BOTH `en` and `it`. No sci-fi flavour labels — plain honest lowercase copy for labels and eyebrows. Every factual claim traces to profile.md, to CONTEXT.md, or to the four screenshots. Evergreen: no ALK, no employer-application references anywhere in `site/` |
| D-09 | Extend the warp system for a second `data-proj` overlay. Claude's discretion resolved here: the new overlay uses `--star-vega` violet (`171,140,255`) with `data-pos="0.72"` — the palette's violet stop, distinct from the OT-2's Rigel cyan and reading as "data/software" |
| D-10 | **NEW, 2026-08-24, supersedes the placeholder half of D-05.** Sirio supplied four real screenshots of the thesis testing app. Chapter one uses REAL CAPTURES from day one — no abstract placeholder, no "swappable later" slot. The abstract-SVG treatment survives ONLY for the work-plate card diagram and the chapter-two search-engine diagram. The `.media-slot` `> svg` contract extension still ships, because the card diagram needs it |
| D-11 | **NEW, 2026-08-24.** Host Sirio's current CV as a portfolio subpage at `site/cv/index.html` (public URL `/MyPortfolio/cv/`) and repoint the nav CV link at it, replacing the Canva link. **Neither the URL nor the filename may contain "ALK"** — Sirio's explicit requirement. Copy the source file, never move it: the application folder keeps its original. Explicitly TEMPORARY — a general CV replaces it later via a single file swap |
| D-12 | **NEW, 2026-08-24.** The contact section deliberately has NO CV link (the shipped D-22 decision). Do not add one there. The CV stays in the persistent nav only |

**What D-10 changes concretely, so nothing is half-migrated:**
- The `[data-sw-doe]` run-matrix SVG is **CANCELLED**. A hand-drawn diagram of a randomised
  run order sitting next to a real screenshot of the actual Design of Experiments table is
  redundant and makes the page look like it is padding. Two SVGs ship, not three.
- Chapter one's media is four real PNGs in three distinct layout beats (see Task 2c).
- The `sw.s2.slotLabel` / `sw.s2.figAria` keys are replaced by four caption + four alt keys.
</locked_decisions>

<house_rules>
Non-negotiable rules inherited from the project. Violating any of these is a failed task.

1. **`_Archive/` is off-limits.** Never read it, never cite it, never lift copy from it.
2. **The design snapshots' CONTENT is fabricated.** Take structure and visual language from
   the shipped page; take every FACT from `profile.md` or the screenshots.
3. **No invented metrics.** If a number is not in `profile.md`, CONTEXT.md, or legible in a
   screenshot, it does not go on the page. Do not estimate or round your way to a figure.
4. **No stock imagery and no AI-generated imagery, ever** (`site/assets/media/README.md`).
   The four Pump Validator screenshots are first-party captures of Sirio's own app and are
   exactly what that rule asks for. Hand-authored schematic SVG is a diagram, not imagery,
   and is also allowed.
5. **Never add CSS that hides a `[data-reveal]` element or an SVG part before JS runs.**
   The reveal contract: `initReveals()` is the ONLY writer of `data-rev-state`. Every new
   SVG must render COMPLETE and static by default; GSAP `.from()` sets its own start state
   at runtime, so a no-JS / reduced-motion visitor sees the finished diagram.
6. **`--accent` is required, not polish.** An overlay or section without a resolved
   `--accent` renders every accent surface transparent with no console error.
7. **Italian is reviewed by Sirio.** Write it faithfully, mirror the English punctuation
   (em-dashes, `·`, `&amp;`) so both languages lay out identically, use "la DTU" (feminine),
   keep brands/acronyms/product names untranslated — then flag it for his review.
8. **Motion vocabulary is transform / opacity / stroke-dashoffset only**, positive
   `stroke-dashoffset` (Safari-safe), every tween scrub-linked to the overlay scroll.
9. **Atomic commits, one per task**, message prefix `feat(quick-260824-fms):`.

> **Task count:** this plan carries FOUR tasks, one over the quick-mode norm of three. Task 4
> (the CV subpage) was added mid-flight at Sirio's request and is fully independent of Tasks
> 1–3 — it touches no shared file except one nav line in `site/index.html`. It may be
> executed first, last, or in isolation.
</house_rules>

<asset_findings>
The four PNGs were inspected programmatically before planning (not eyeballed — a viewer
composites alpha onto white and lies about PNG backgrounds). Verified facts, which drive the
layout decisions in Task 2:

| File (root) | Dimensions | Bytes | Mode | Alpha | Background |
|-------------|-----------|-------|------|-------|------------|
| `AppLandingPage.png` | 1918×1022 (1.88:1) | 596,282 | RGBA | **constant 255** | `rgb(11,13,18)` |
| `DataCollectionPage.png` | 1919×1028 (1.87:1) | 95,587 | RGBA | **constant 255** | `rgb(11,13,18)` |
| `DataAnalysisEx1.png` | 1197×812 (1.47:1) | 78,518 | RGBA | **constant 255** | `rgb(11,13,18)` |
| `DataAnalysisEx2.png` | 1179×794 (1.48:1) | 41,989 | RGBA | **constant 255** | `rgb(11,13,18)` |

Total: 812,376 bytes (≈793 KB).

Two consequences the executor must not rediscover the hard way:

1. **The alpha channel is entirely opaque and therefore dead weight.** Re-saving as RGB is a
   visually lossless size win (Task 2b).
2. **The screenshot background `#0B0D12` is nearly identical to the overlay ground `#05070e`
   and to `.device-frame`'s `#08090f`.** These will *melt into the page* — the opposite of
   the problem `.device-frame` was originally written for (its comment at `styles.css:2700`
   describes containing "opaque-white PNGs" that "punch a white hole"). `.device-frame` is
   still the correct container, but for the inverse reason: its accent hairline border and
   inner glow are the ONLY things that will give these screenshots a visible edge. Do not
   remove the border thinking the frame is unnecessary — without it the captures bleed into
   the background and read as broken layout.

Two shapes: two wide ~1.88:1 captures (need full width to stay legible — they carry a module
grid and a data table) and two ~1.47:1 captures (readable at half width, and they are a
natural pair). Task 2c's arrangement follows from that, not from taste alone.
</asset_findings>

<cv_findings>
The CV source was inspected before planning. Confirmed as described by the orchestrator, plus
one thing that was NOT flagged and changes the task:

Source: `D:\06. Job & Applications\02_Applications\Jobs\2026-08_ALK-Abello_Lab_Automation_Digitalization_Engineer\CV\CV_ALK_LabAuto_v3.html`
(24,443 bytes).

Verified clean:
- `<title>Sirio Vittorio Feltrin — CV</title>` — no employer name.
- **Zero** case-sensitive `\bALK\b` matches. The only case-insensitive "alk" is inside the
  word "talks". The site-wide ALK gate in `check-fms.mjs` therefore stays green once this
  file is copied into `site/`.
- Genuinely self-contained: one `<style>` block, **zero** `<script>` tags, **zero** `<img>`
  tags, and no relative asset references at all (the only non-http hrefs are `mailto:` and
  `tel:`). A plain file copy is sufficient — there is nothing else to bring along.
- External refs are Google Fonts + cdnjs Font Awesome (fine on Pages, leave as-is), plus
  outbound links to the iGEM wiki, thesis-tools, LinkedIn, and back to the portfolio itself.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present.

⚠ **Not flagged, and it matters: the CV is not responsive.** `.page` is `width: 210mm;
min-height: 297mm` (line ~36) and the ONLY media query in the file is `@media print`
(lines 267–273). 210mm ≈ 794 CSS px, so on a 390px phone the page overflows horizontally and
the visitor gets a tiny, side-scrolling CV. That directly contradicts CLAUDE.md's standing
constraint ("recruiters open links on phones") and the whole premise in
`ALK_Application_Context.md` — the likely path is *LinkedIn on a phone → profile → portfolio*.
Shipping a CV subpage that side-scrolls on mobile would undercut the exact competence the
portfolio exists to demonstrate.

The fix is one additive, print-safe block (Task 4c). The `@media print` rule re-asserts
210mm/297mm independently, so a `@media screen and (max-width: …)` override cannot affect
the A4 print/PDF output.
</cv_findings>

<tasks>

<task type="auto">
  <name>Task 1: Write the EN + IT copy for the new plate and the umbrella deep-dive</name>
  <files>site/i18n.js, .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</files>
  <action>
Author the complete bilingual copy FIRST — the dictionary keys are the contract Task 2's
markup consumes, so nothing is invented at markup time (D-08).

Read `profile.md` lines 58, 196–199, 336–361, 430–465, 477–483 AND look at the four
screenshots before writing a word. Then add two new key namespaces to BOTH `STRINGS.en` and
`STRINGS.it` in `site/i18n.js`, placed after the `work.plate3.*` block and after the
`dd.s4.*` block respectively, each under a short `/* ... */` banner comment matching the
file's existing style.

DO NOT renumber the existing `work.plate2.*` / `work.plate3.*` keys. The new plate gets its
own namespace, `work.plateSw.*`, so the OT-2 and EndoSense keys stay byte-identical and no
other file has to change.

**Namespace A — the new work plate (`work.plateSw.*`), 5 keys:**
- `work.plateSw.meta` — the domain tag, natural case, mirroring "MSc thesis · 2026" /
  "Lab automation · 2025". Use `Software · 2024 — 2026` (AGC app from 2024, thesis tooling
  2026 — both supported by profile.md:196 and :336).
- `work.plateSw.title` — plain and honest, no sci-fi. Use `Digital Solutions for the Lab`
  (IT: `Soluzioni Digitali per il Laboratorio`).
- `work.plateSw.body` — problem-first, one paragraph, same register and length as
  `work.plate2.body`. The argument: repetitive digital work is the same bottleneck as
  repetitive bench work, so he builds the tools that remove it — Pump Validator, which runs
  his thesis' randomised test campaign and writes it straight to a structured record; a
  search engine that fuses seven scientific literature APIs into one ranked result; and a
  shift app for his department at AGC that nothing off the shelf could do. Per D-02/03/04.
- `work.plateSw.label` — the media-slot label, lowercase bracketed like its siblings:
  `[ data-flow diagram ]`.
- `work.plateSw.aria` — `Open the digital solutions case study` (mirrors `work.plate2.aria`).

**Namespace B — the deep-dive (`sw.*`).** Mirror the `dd.*` structure exactly. REUSE the
existing `dd.back` key for both back links — the string is identical and already bilingual.

Masthead: `sw.eyebrow` (plain lowercase, e.g. `software · MSc thesis tooling &amp; AGC Biologics · 2024 — 2026`),
`sw.lede`, `sw.meta` (e.g. `three tools · Python, REST APIs, relational databases · built solo`),
`sw.heroCap`, `sw.hero.aria` (the masthead SVG's accessible description).

Section 01 — the framing (D-06). `sw.s1.label` = `the problem`; `sw.s1.h2` = the umbrella
thesis, e.g. "The same bottleneck, one layer up."; `sw.s1.p1`–`sw.s1.p3`: bench repetition
has a desk twin — transcribing runs by hand, chasing the same query across a dozen
databases, running a department's shifts out of a spreadsheet; it is low-value work standing
between a scientist and the science; the fix is the same fix, one layer up. Anchor the claim
in the origin story the site already tells (profile.md:60) — do not contradict it.

**Section 02 — chapter one, Pump Validator (D-02, D-10).** This chapter changed: it now has
four real screenshots, so the copy must earn them and name what the reader is looking at.

Facts the screenshots license (they are the only source for the name and module set):
- The app is called **Pump Validator**, subtitled "Precision flow measurement & analysis
  pipeline".
- Four modules: **Data Collection** (randomised run order, data folders), **Analysis &
  Dashboard** (interactive charts, pump scoring), **Run Campaign** (automated DoE campaign;
  the runner drives the pump and logs flow unattended), **Gravimetric Analysis** (sensor-free
  gravimetric campaign: per-stroke volume, calibration slopes, precision, evaporation).
- The Data Collection screen is a setup form — experiment info, operator, configuration —
  plus a Design of Experiments table with columns Row Index, Target Volume µL, Target Flow
  Rate µL/min, Replicates, and paste-from-Excel entry.
- The dashboard shows Volume Accuracy and CV% Precision bar charts plus an
  Accuracy-vs-Precision scatter, comparing two pumps; the second analysis screen is a
  Category Score Breakdown — a scored matrix across volume × flow-rate categories.

⚠ **Do NOT present any value visible in those charts as a thesis result.** The compared
series are labelled "Demo Experiments" and "Lab Syringe Pump" — that is demonstration data,
not a finding. Describe what the dashboard DOES (scores a pump on accuracy and precision
across volume and flow-rate categories); never state how Sirio's pump performed, never quote
a number off a bar, never imply a conclusion. This is the single easiest way to make the page
dishonest, and it would be caught.

⚠ Also do not claim the app is public, released, packaged, or used by anyone else.

Keys: `sw.s2.label` = `chapter one — the testing app`; `sw.s2.h2`; `sw.s2.problem` (a Design
of Experiments campaign means running the same measurement many times in a randomised order
and writing the numbers down — slow, easy to mis-order, easy to mis-key); `sw.s2.build`
(introduce Pump Validator by name); `sw.s2.li1`–`sw.s2.li4` (rich, using
`<span class="dd-list__k">…</span>` exactly like `dd.s3.li*`) — one per module, in the
screenshot's order: Data Collection, Analysis & Dashboard, Run Campaign, Gravimetric
Analysis; `sw.s2.outcome` — data arrives structured at capture time, so analysis is a parse,
not a retype (reconciles the screenshots with CONTEXT's JSON-logging claim and profile.md:58).

Then the media keys, four captions and four alts:
- `sw.s2.cap1` / `sw.s2.alt1` — the landing screen and its four modules.
- `sw.s2.cap2` / `sw.s2.alt2` — the Design of Experiments table. This is the most on-brief
  artefact on the whole page; the caption should say what the table is for (a randomised run
  order defined up front, pasteable straight from Excel).
- `sw.s2.cap3` / `sw.s2.alt3` — the accuracy / precision dashboard.
- `sw.s2.cap4` / `sw.s2.alt4` — the category score breakdown.
Alt text follows the site's existing convention (see `dd.s3.uiAlt`, `work.blueprint.*`):
long, specific, factual, describing what is in the frame for someone who cannot see it.

Section 03 — chapter two, the literature search engine (D-03).
`sw.s3.label` = `chapter two — the search engine`; `sw.s3.h2`; `sw.s3.problem` (literature
discovery means running the same query across databases that each rank differently, then
retyping the survivors into a bibliography); `sw.s3.build`; `sw.s3.li1`–`sw.s3.li4` (rich,
`dd-list__k` keys): **Seven scientific APIs under one interface** — PubMed (NCBI), Semantic
Scholar, OpenAlex, Scopus (Elsevier), IEEE Xplore, arXiv, bioRxiv via Europe PMC, with
per-source authentication and key management, rate-limit handling, institutional-IP
entitlement for Scopus, and graceful self-skipping when a source is down;
**Reciprocal Rank Fusion** — fuses the ranked lists, scoring on recency, citation count and
title/abstract match; **Citation snowballing** — forward and backward traversal from a seed
paper, deliberately fusing two indices that disagree; **A BibTeX pipeline** — claim
extraction, deterministic citation keys, append-with-diff-confirmation, deduplication by
key, DOI and near-duplicate title. `sw.s3.outcome` — human-in-the-loop by design: nothing is
written to disk without explicit approval. `sw.s3.link` — the public link text,
`the thesis tools&nbsp;&#8599;` / IT equivalent. Plus `sw.s3.figCap`, `sw.s3.figAria` for the
one surviving abstract diagram.
You MAY cite "~2,200 lines across the toolchain" only if you keep profile.md's exact
framing; prefer describing what it does (the OT-2 page's D-10 lesson: no line-count
framing). Default: omit the line count.

Section 04 — chapter three, the AGC shift app (D-04, the confidentiality-sensitive one;
UNCHANGED by the new screenshots).
`sw.s4.label` = `chapter three — the shift app`; `sw.s4.h2`; `sw.s4.problem` — a department
that needed shift management and nothing off the shelf that fitted, so the real first
decision was build versus buy; `sw.s4.build`; `sw.s4.li1`–`sw.s4.li4` (rich, `dd-list__k`):
**Full infrastructure design** — system architecture, relational data model, user flow;
**Azure-hosted, Python backend, mobile-friendly, database-driven**; **An API between the
layers** — he designed the request/response flow between front end and back end;
**Through corporate IT, independently** — mapped what infrastructure and services existed
internally, learned the intake and approval process, and took the project through that
dialogue. `sw.s4.note` — the confidentiality line, written as a design statement not an
apology: the app lives inside AGC, so what is shown here is the shape of the work, not the
tool. Every one of these traces to profile.md:196–199.
⚠ The app is IN PROGRESS ("Designing and developing", profile.md:196). Use
present-progressive. Do NOT claim it shipped, is deployed, is in production, has users, or
saves time. Do not name a team size, a headcount, or any internal process detail.

Section 05 — the thread (the umbrella's closing beat).
`sw.s5.label` = `the thread`; `sw.s5.h2`; `sw.s5.p1`–`sw.s5.p2`: what the three share —
structure the data at the moment it is captured; put one interface over many sources; and
decide honestly what to build versus what to buy. Tie back to the physical work: same
instinct, different medium.

Register rules for all copy: match the existing `dd.*` voice — declarative, concrete,
first-person where the site already uses it, em-dashes not parentheses. Lowercase section
labels. No marketing adjectives ("powerful", "seamless", "cutting-edge"), no sci-fi
codenames, no ALK/employer-application framing (D-08).

Rich vs plain: use `sw.*` keys destined for `data-i18n-rich` ONLY where the string contains
author-written inline markup (`<span class="dd-list__k">`, `<a class="dd-link">`, `&nbsp;`,
`&amp;`). Everything else is plain `data-i18n`. This preserves the file's stated trust model
(author-controlled literals only).

Italian: faithful translation mirroring the English punctuation exactly. "la DTU". Keep
untranslated: Pump Validator, PubMed, Semantic Scholar, OpenAlex, Scopus, IEEE Xplore, arXiv,
bioRxiv, Europe PMC, BibTeX, JSON, Python, Azure, API, Design of Experiments, Reciprocal Rank
Fusion, AGC Biologics, and the four module names as they appear in the UI. Translate
descriptive titles and all prose.

Finally, write the verification gate script to
`.planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs`. It is a
plain Node ESM script (Node 24 is available) run from the repo root that:
1. dynamically imports `site/i18n.js` via a `file://` URL and asserts EN/IT key-set parity
   (every key in `en` exists in `it` and vice versa; report the diff on failure);
2. reads `site/index.html`, extracts every key referenced by `data-i18n="…"`,
   `data-i18n-rich="…"` and each `attr:key` pair inside `data-i18n-attr="…"`, and asserts
   each key exists in BOTH dictionaries;
3. asserts no `sw.*` or `work.plateSw.*` value is an empty string;
4. exits non-zero with a readable report on any failure.
Tasks 2, 3 and 4 extend this same script — write it so extra checks slot in cleanly.
  </action>
  <verify>
    <automated>cd "D:/06. Job & Applications/05_Portfolio" && node .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</automated>
  </verify>
  <done>
`site/i18n.js` contains a complete `work.plateSw.*` (5 keys) and `sw.*` (≈50 keys) namespace
in BOTH `en` and `it`, including four caption + four alt keys for the Pump Validator
screenshots; the gate script passes with zero key-parity failures; no existing key was
renamed, reworded or removed; no number appears that is not in profile.md, CONTEXT.md or
legible in a screenshot; no chart value is quoted as a result; the AGC section names no
internal detail beyond profile.md:196–199.
  </done>
</task>

<task type="auto">
  <name>Task 2: Move the screenshots in, then build the plate, the overlay, the diagrams and their CSS</name>
  <files>site/index.html, site/styles.css, site/assets/media/*.png, site/assets/media/README.md, .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</files>
  <action>
**Read `.claude/skills/design-taste-frontend/SKILL.md` in full before writing any markup or
CSS.** Sirio has now asked for this twice. The new page must read as premium and
indistinguishable in quality from the OT-2 deep-dive, not as a bolted-on section. Apply its
anti-centre / variance guidance the way the OT-2 page already does — asymmetric splits,
alternating sides, one dominant element per beat, no two adjacent beats sharing a layout
family.

**2a — the new work plate (D-07).** In `site/index.html`, insert a fourth `<article>` in
`#work` BETWEEN the plate-1 article (ends line ~242) and the plate-2 article (starts ~251).
Copy plate 2's clickable pattern exactly: `data-open="soft" role="button" tabindex="0"
data-i18n-attr="aria-label:work.plateSw.aria"` plus a literal English `aria-label` fallback
(every `data-i18n-attr` element on this page ships its English value inline). Body uses
`work.plateSw.meta` / `.title` / `.body`.

Card media: a `figure.media-slot` with `data-label` + `data-i18n-attr="data-label:work.plateSw.label"`
containing the `[data-sw-spine]` diagram (2e) at card scale. Authoring the same inline SVG
twice (card + masthead) is acceptable; do NOT introduce a build step or JS templating.

Preserve the zig-zag alternation (`.plate--flip` mirrors every even plate). After insertion
the order is plate1 / NEW / OT-2 / EndoSense, so: give the NEW plate `plate--flip`, REMOVE
`plate--flip` from the OT-2 plate, and ADD `plate--flip` to the EndoSense plate. Nothing else
about those two articles changes. Add a short HTML comment above the new plate in the file's
existing voice, recording that it is the second clickable plate and citing D-07.

**2b — move the four screenshots into the site (D-10).** They are currently loose in the
repo root, which is not a served location and is not where the site's asset contract puts
things.

Move and rename (kebab-case, matching `ot2-part-adapter.png` etc.):
- `AppLandingPage.png`     → `site/assets/media/pv-landing.png`
- `DataCollectionPage.png` → `site/assets/media/pv-data-collection.png`
- `DataAnalysisEx1.png`    → `site/assets/media/pv-analysis-charts.png`
- `DataAnalysisEx2.png`    → `site/assets/media/pv-analysis-scores.png`

Move, do not copy — no duplicates may remain at the repo root when you are done, and the four
files must be `git add`ed at their new paths.

Trivial, bounded size win (and only this one — no recompression project): every file is RGBA
with a verified constant-255 alpha channel, so the alpha is dead weight. Re-save each as RGB
with `optimize=True` (Pillow is available: `Image.open(p).convert('RGB').save(p, optimize=True)`).
Then assert, per file, that pixel dimensions are unchanged and the byte size did not grow — if
any file gets larger, keep the original for that file and move on. Do not resize, do not crop,
do not touch quality settings, do not convert format. Record the before/after totals in the
SUMMARY. Current total is 812,376 bytes.

⚠ **Privacy check, needs Sirio's eyes, not yours.** `pv-data-collection.png` shows a personal
local folder path in the base-folder field: `D:/Il mio Drive/Pilastri di Vita/C - DTU/05. Sp`.
It is harmless technically, but it is a personal Drive path going onto a public portfolio.
Sirio said "feel free to use them", so ship it as-is — but surface it as an explicit go/no-go
point in the Task 3 render check (he can see it in context and decide there) AND record it in
the SUMMARY. Do not edit, blur or crop the image on your own initiative; a visibly retouched
screenshot is worse than the path.

**2c — the `.media-slot` accepts an authored SVG (D-05, still required).** `styles.css:1688`
and `:1698` decide "filled vs striped placeholder" with
`:not(:has(> img, > video, > a > img, > a > video))`. An inline `<svg>` is none of those, so
the stripes and the label would show THROUGH the card diagram. Extend both selector lists
additively with `> svg` (and `> a > svg` for symmetry), and add `.media-slot > svg` to the
FILLED-STATE sizing group at `:1710` with `width:100%; height:100%; display:block` (no
`object-fit` — it does not apply to inline SVG; use `preserveAspectRatio` on the SVG instead).
Update the comment above each rule to say why.

**2d — the `[data-proj="soft"]` overlay (D-01, D-06, D-09).** Add a second overlay in
`site/index.html` immediately AFTER the closing `</div>` of the OT-2 overlay (line ~920) and
before the closing `</div>` of the page wrapper — a sibling of `[data-field]`, same overlay
band. Copy the OT-2 overlay's skeleton verbatim in structure:

```
<div data-proj="soft" data-accent="171,140,255" data-pos="0.72" class="proj"
     style="position:fixed; inset:0; z-index:30; overflow-x:hidden; overflow-y:auto; visibility:hidden; opacity:0;">
  <div data-proj-inner class="proj__inner" style="min-height:100%; will-change:transform,opacity,filter; transform-origin:50% 42%;">
```

with the same `.proj__atmos` block (stars + three `.proj__glow` a/b/c), the same
`<a data-close href="#work" class="proj__back" data-i18n-rich="dd.back">` at the top and a
`.proj__back--foot` copy at the bottom, and a `.proj__masthead` split (text left, the
`[data-sw-spine]` umbrella diagram right).

Five `<section class="proj-sec" data-proj-sec>` blocks numbered 01–05, each with its
`.section__numeral` (alternate `--right` / `--left` down the page, starting `--right`), its
`.section__blob .proj-sec__blob--right|--left`, the `.section__head` label + draw-on rule, an
`h2` with `data-reveal-kind="assemble"`, then `.dd-p` paragraphs and `.dd-list` lists —
identical class vocabulary to the OT-2 page (D-06). Sections map 1:1 onto the Task-1 copy:
01 the framing, 02 chapter one, 03 chapter two, 04 chapter three, 05 the thread.

Every text node carries its `data-i18n` / `data-i18n-rich` key AND its English value inline,
exactly as the OT-2 markup does. Stagger `data-reveal="0..5"` per section the same way.

**Chapter 02 media layout — three distinct beats, driven by the verified aspect ratios
(see `<asset_findings>`), not by taste alone:**

- **Beat A — asymmetric two-column** (`.proj-build__intro` pattern: text left, figure offset
  right): `pv-landing.png` in a `.device-frame`, caption `sw.s2.cap1`. The identity shot —
  the name, the hexagonal mark, the four module cards.
- **Beat B — full-width single** `.device-frame`: `pv-data-collection.png`, caption
  `sw.s2.cap2`. This one MUST be full width: it carries the Design of Experiments table, its
  text is the smallest on the page, and it is the artefact that proves D-02. Do not put it in
  a column.
- **Beat C — full-width two-up pair**: `pv-analysis-charts.png` + `pv-analysis-scores.png`
  side by side, each in its own `.device-frame`, captions `sw.s2.cap3` / `sw.s2.cap4`. Author
  a small new `.sw-pair` grid for this (2 columns, collapsing to 1 below 860px). Do NOT bend
  `.media-slot--composite` — that class is tuned for the OT-2's portrait video + blueprint
  pairing and reusing it would drag its aspect rules in.

Wrap the three beats in a `[data-sw-shots]` container so Task 3 can attach one restrained
reveal to them.

All four `<img>` elements: relative `./assets/media/pv-*.png` src (NEVER a remote src), a
`data-i18n-attr="alt:sw.s2.altN"` plus the English alt inline, and `loading="lazy"
decoding="async"` (the overlay ships in the initial HTML, so this is the cheap hedge against
793 KB landing on the critical path — verify the real cost in the Task 3 render check).

Other sections' layout variance: section 03 uses the full-width figure pattern like
`.dd-diamond-fig` for `[data-sw-fusion]`; section 04 has NO figure at all (D-04) and instead
carries a wider reading measure + the `.dd-list`, closing on the `sw.s4.note` line styled as a
quiet aside (`.sw-note`); section 05 is short. Across the whole overlay, no two adjacent beats
may share a layout family.

⚠ D-04 hard gate for section 04: no `<img>`, no `<figure>`, no `<svg>`, no `.media-slot`, no
`.device-frame`, no `.blueprint` anywhere inside section 04.

**2e — two hand-authored SVG diagrams (D-05 as narrowed by D-10).** The `[data-sw-doe]`
run-matrix diagram is CANCELLED — chapter one has real captures now. Two SVGs ship:

All colour derives from `rgba(var(--accent), …)`; hard-code no hue. Both render COMPLETE and
static by default — GSAP (Task 3) only adds the draw-on. One continuous stroke per drawn path,
POSITIVE `stroke-dashoffset` seeded at runtime. Each SVG gets `role="img"` and an `aria-label`
fed by `data-i18n-attr`.

1. `[data-sw-spine]` — the masthead + card diagram, `viewBox="0 0 740 260"`. Three labelled
   source nodes on the left (rounded rects, `.sw-node`) — the testing app / the search engine
   / the shift app — with three curved edges (`.sw-edge`) converging into a single horizontal
   spine on the right ending in one node labelled "structured data". This is the umbrella made
   visible, and it is the one diagram that appears twice (card + masthead).
2. `[data-sw-fusion]` — section 03, full width, `viewBox="0 0 740 300"`. Seven labelled source
   ticks on the left, seven curves (`.sw-edge`) fanning into one ranked column of five rows
   (`.sw-rank`) on the right. The seven labels are the real source names.

SVG text sizing: follow the OT-2 lesson recorded at `index.html:769-774` — SVG `<text>` scales
down and becomes unreadable in narrow columns. Keep every `<text>` at ≥16px in its viewBox
units and add a `@media (max-width: 620px)` bump mirroring the existing `.dd-name` / `.dd-cue`
block at `styles.css:2885`. If a label cannot survive that, promote it to an HTML overlay the
way `.dd-diamond__phases` does.

**2f — CSS (`site/styles.css`).**
- Split the accent out of the shared overlay rule at `:2365`: change `[data-proj="ot2"] {` to
  `[data-proj="ot2"], [data-proj="soft"] {`, delete the `--accent: var(--star-rigel);` line
  from that shared block, and add two one-line rules immediately above it:
  `[data-proj="ot2"] { --accent: var(--star-rigel); }` and
  `[data-proj="soft"] { --accent: var(--star-vega); }` (D-09). Keep and extend the existing
  ⚠ comment explaining that `--accent` is required, not polish.
- Extend the same way — selector list only, no property changes — for
  `[data-proj="ot2"]::before` (:2384), `[data-proj="ot2"]::after` (:2407),
  `[data-proj="ot2"] .proj-sec > h2` (:2618) and `[data-proj="ot2"] .blueprint__part` (:2948,
  harmless if unused).
- Add `.sw-pair` (the beat-C grid) and a `.sw-*` diagram block after the OT-2 diagram block,
  in the file's commented house style: `.sw-fig`, `.sw-node`, `.sw-edge`, `.sw-name`,
  `.sw-rank`, `.sw-note`. Mirror `.dd-edge` / `.dd-tri` / `.dd-name` conventions
  (`vector-effect: non-scaling-stroke` where the OT-2 rules use it, `--font-mono` for labels,
  accent-derived fills at the same alpha ladder 0.09 / 0.15 / 0.21).
- Do NOT weaken `.device-frame`'s border. Per `<asset_findings>`, these screenshots are
  `#0B0D12` against a `#08090f` frame — the accent hairline is the only edge definition they
  have. If anything the frame is doing MORE work here than it does for the OT-2's white
  diagrams. Add a comment recording that inversion so the next reader does not "clean it up".
- Add the missing affordance for BOTH clickable plates: `[data-open] { cursor: pointer; }` and
  a `[data-open]:focus-visible` ring using `rgba(var(--accent), …)`, matching the
  `.plate__link:focus-visible` treatment. This also fixes the shipped OT-2 card, which
  currently has neither — call it out in the SUMMARY.
- Responsive: verify the new sections at 360px, 620px and 860px against the existing
  breakpoints (`:2528`, `:2782`, `:2885`, `:2922`, `:2986`); add breakpoints only where the new
  markup genuinely needs them.

**2g — document the assets.** Update `site/assets/media/README.md`: add the four `pv-*.png`
files with provenance (first-party screenshots of Sirio's own Pump Validator thesis app,
captured Aug 2026), note that they are dark-themed at `#0B0D12` and therefore depend on
`.device-frame`'s border for edge definition, and record the RGBA→RGB strip. Keep the file's
existing tone and the no-stock/no-AI rule intact.

**2h — extend `check-fms.mjs`** with structural + asset assertions: exactly one
`[data-open="soft"]` and exactly one `[data-proj="soft"]`; source-order of `work.plate1.title`
< `work.plateSw.title` < `work.plate2.title`; the `.plate` class sequence in `#work` is
[no-flip, flip, no-flip, flip]; all four `site/assets/media/pv-*.png` exist and are non-empty;
NONE of `AppLandingPage.png`, `DataCollectionPage.png`, `DataAnalysisEx1.png`,
`DataAnalysisEx2.png` remains at the repo root; every `<img>` inside the `soft` overlay has a
non-empty `alt` and a `data-i18n-attr` alt key; no `src="http` anywhere in `site/index.html`;
section 04 of the `soft` overlay contains no `<img`, `<svg`, `<figure`, `media-slot`,
`device-frame` or `blueprint`; `/\bALK\b/` does not appear anywhere in `site/`; and the OT-2
regression markers are all still present (`data-open="ot2"`, `data-proj="ot2"`,
`data-ot2-diamond`, `data-ot2-assembly`, `data-ot2-outcome`, `dd-edge`,
`media-slot--composite`, `media-slot--pump`).
  </action>
  <verify>
    <automated>cd "D:/06. Job & Applications/05_Portfolio" && node .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</automated>
  </verify>
  <done>
The four screenshots live at `site/assets/media/pv-*.png` with no root copies left;
`site/index.html` has a fourth work plate between plates 1 and 2 wired with `data-open="soft"`,
and a `[data-proj="soft"]` overlay with five numbered `proj-sec` sections, four real captures
in three distinct layout beats, and two authored SVG diagrams; section 04 carries zero visual
elements; `site/styles.css` resolves `--accent` for the new overlay, styles `.sw-pair` and the
`.sw-*` vocabulary with no hard-coded hue, and keeps `.device-frame`'s border intact; both
clickable plates now have a pointer cursor and a focus ring; `site/assets/media/README.md`
documents the four new assets; the gate script passes every structural, asset and regression
assertion.
  </done>
</task>

<task type="auto">
  <name>Task 3: Wire the second overlay's scroll-telling, then serve and render-check</name>
  <files>site/main.js, .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</files>
  <action>
The warp itself already works for any overlay — `openProj(id)` resolves `[data-proj=id]`, the
`[data-open]` / `[data-close]` boot wiring is generic, and `data-pos` is read from the target
element. What is NOT generic is the motion layer: `applyTrans()` hard-codes
`if (intoId === 'ot2') initOt2Motion();` and `closeProj()` hard-codes `killOt2Motion()`.
Generalise exactly those two seams and nothing else (D-09).

1. **Hoist `seedDraw`** out of the `initOt2Motion` context to module scope as
   `seedDraw(gsap, sel)` (or a closure that reads `window.gsap`) so both overlays share one
   implementation. Its behaviour must be byte-for-byte equivalent: measure `getTotalLength()`,
   set `strokeDasharray` and `strokeDashoffset` to that length. Positive offset only.
2. **Add `initSoftMotion()`**, structurally a twin of `initOt2Motion()`:
   `if (REDUCED) return;` → resolve `window.gsap` / `window.ScrollTrigger`, bail if absent →
   `const scroller = document.querySelector('[data-proj="soft"]')` (NEVER the window — it is
   frozen while an overlay is open) → `softCtx = gsap.context(() => { … }, scroller)` →
   `ScrollTrigger.refresh()`. Three scrub-linked triggers, all `scrub: 0.6`, all with
   `scroller` set:
   - `[data-sw-spine]` — `.sw-edge` draw on (`strokeDashoffset: 0`), then `.sw-node` and
     `.sw-name` fade/rise in with a stagger.
   - `[data-sw-shots]` — a restrained `gsap.from('[data-sw-shots] .device-frame', { y: 24,
     opacity: 0, stagger: 0.1 })`. The captures are the content, not the effect; keep it
     subtle and do not add scale, blur or rotation.
   - `[data-sw-fusion]` — the seven `.sw-edge` curves draw left-to-right, then the `.sw-rank`
     rows fade in top-down with a stagger.
   Vocabulary is transform / opacity / stroke-dashoffset only. No autonomous loops, no new rAF
   loop, no second IntersectionObserver.
   ⚠ Scope the spine tween to the OVERLAY's copy of `[data-sw-spine]`, not the card's copy on
   the landing page — the same diagram is authored twice (Task 2a). `gsap.context(fn, scroller)`
   already scopes selector text to `scroller`, so use plain selector strings inside the context
   and do NOT pass pre-queried global elements in.
3. **Add `killSoftMotion()`** (`softCtx.revert()`; null it) and a `killProjMotion()` that calls
   both killers; replace the single `killOt2Motion()` call in `closeProj()` with
   `killProjMotion()`. Both killers must no-op when their context was never built.
4. **Replace the arrival dispatch** in `applyTrans()` with a small map declared after both init
   functions: `const PROJ_MOTION = { ot2: initOt2Motion, soft: initSoftMotion };` and
   `if (intoId && PROJ_MOTION[intoId]) PROJ_MOTION[intoId]();`. Build only at `t >= 1`, AFTER
   `trans = null`, so ScrollTrigger never measures the scaled/blurred inner.
5. **Do not change** `initOt2Motion`'s timelines, selectors, triggers, start/end values or
   ordering. Do not touch `loop()`, `boot()`, `initReveals()`, the D-20 engine-pause guard, or
   the `.media-slot video` boot sweep. Add a comment block above `initSoftMotion` in the file's
   existing voice recording that it mirrors `initOt2Motion` and why the scroller must be the
   overlay.
6. **Extend `check-fms.mjs`** with source assertions on `site/main.js`: `initSoftMotion`,
   `killSoftMotion`, `killProjMotion` and `PROJ_MOTION` all exist; `killOt2Motion` is still
   defined; `initOt2Motion` still contains its three original trigger selectors
   (`[data-ot2-diamond]`, `[data-ot2-assembly] .blueprint`, `[data-ot2-outcome] .ot2-stats`);
   there is exactly ONE `requestAnimationFrame(loop)` call; and every `scrollTrigger:` object
   literal in the file sets `scroller`. Strip `/* … */` comment blocks before counting so a
   comment mentioning a token cannot satisfy or break a gate.

Then serve the site and render-check it. Run
`python -m http.server -d site 8137 --bind 127.0.0.1` (or double-click `preview.bat`) and open
`http://127.0.0.1:8137/`. Walk the checklist below at a desktop width and at a 390px-wide
mobile viewport before declaring the task done, and capture the result in the SUMMARY.

If Task 4 is already done, fold its three checks (marked CV) into the same pass rather than
serving twice.
  </action>
  <verify>
    <automated>cd "D:/06. Job & Applications/05_Portfolio" && node .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</automated>
    <human-check>
BLOCKING. Serve locally (`python -m http.server -d site 8137 --bind 127.0.0.1`, or
`preview.bat`) and open http://127.0.0.1:8137/ — then confirm, at a desktop width AND at a
390px mobile viewport:

Desktop
1. Selected Work shows FOUR cards, and the new "Digital Solutions for the Lab" card is the
   SECOND one — between the dispenser and the gel-electrophoresis cards.
2. The zig-zag still alternates cleanly down all four cards; nothing is stranded or
   double-flipped.
3. The new card shows a pointer cursor on hover; tabbing to it shows a visible focus ring.
   (The OT-2 card now does too — that is intentional.)
4. Clicking it warps into the deep-dive; the violet accent reads as clearly distinct from the
   OT-2's cyan.
5. Chapter one shows the four Pump Validator screenshots in three beats: landing offset beside
   the text, the Design of Experiments table full width, then the two analysis screens side by
   side. Each has a visible framed edge — they must NOT bleed invisibly into the dark
   background.
6. The Design of Experiments table is actually READABLE at full width. If it is not, that beat
   has failed its whole purpose — say so.
7. Scrolling: the masthead diagram draws on and the seven-source fan draws into the ranked
   column. Nothing flickers, nothing is invisible before it animates.
8. Chapter three (the shift app) has NO image, NO diagram, NO mockup — text only.
9. "back to work" returns to the landing page at the Work section.
10. Re-open the OT-2 card: the Double Diamond still draws, the CAD parts still assemble, the
    stats still rise. Close it. Then open the new one again — the motion rebuilds, it does not
    double up or freeze.

Mobile (390px)
11. All four cards stack with the media above the text; the new card's diagram is legible.
12. The two analysis screenshots collapse to one column; nothing overflows horizontally.
13. Every label inside the two SVGs is readable — no shrunken, unreadable text.
14. Open DevTools → Network, hard-reload, and note the total transferred bytes. The four PNGs
    add ~793 KB (less after the alpha strip). If first load feels heavy on a throttled mobile
    profile, say so — the fix is a follow-up todo, not a scope change now.

CV subpage (Task 4 — check here if Task 4 is done)
15. The nav "CV ↗" opens `/cv/` on this same local server, NOT the Canva link. The URL bar
    shows no "ALK".
16. At 390px the CV fits the screen with NO horizontal scrolling and is readable without
    pinch-zoom.
17. Ctrl+P on the CV page: the print preview is still a clean A4 page, unchanged by the mobile
    rule.

Sirio's decisions — need your eyes
18. **`pv-data-collection.png` shows a personal folder path** — `D:/Il mio Drive/Pilastri di
    Vita/C - DTU/05. Sp` — in the base-folder field. It is on a public page. Confirm you are
    happy to ship it, or say the word and it gets swapped for a re-capture with a neutral path.
    (Nothing was retouched: a visibly edited screenshot would be worse.)
19. **The hosted CV puts your phone number and email on a public, crawlable page** as
    `tel:` and `mailto:` links. That is a step beyond emailing a PDF — scrapers read public
    pages. Confirm you are happy, or say the word and the phone number gets removed from the
    hosted copy only (the application-folder original and the PDF keep it).

Language
20. Switch to IT: the new card and every section of the new deep-dive render in Italian, with
    no English left behind and no blank nodes. Switch back to EN. (The CV page is English-only
    by design — it is a document, not part of the i18n system.)
21. **Flag the Italian copy for Sirio's own review** — he reviews IT wording himself.

Reply "approved" or list what is wrong.
    </human-check>
  </verify>
  <done>
`site/main.js` builds and tears down the second overlay's scroll-telling through a shared
dispatch, with `initOt2Motion`'s behaviour unchanged; the gate script passes all JS assertions;
the served site passes all 21 render-check points at both widths; the personal folder path and
the public phone number have both been put to Sirio explicitly; Italian copy is flagged for his
review.
  </done>
</task>

<task type="auto">
  <name>Task 4: Host the CV at /cv/ and repoint the nav link</name>
  <files>site/cv/index.html, site/index.html, .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</files>
  <action>
Independent of Tasks 1–3 — it touches exactly one shared line (the nav) and can run in any
order. Give it its own commit.

**4a — copy the CV in (D-11).** Copy, do NOT move:

```
FROM: D:\06. Job & Applications\02_Applications\Jobs\2026-08_ALK-Abello_Lab_Automation_Digitalization_Engineer\CV\CV_ALK_LabAuto_v3.html
TO:   site/cv/index.html
```

The application folder keeps its original untouched — it is the submitted artefact for that
application and must not be disturbed.

`site/cv/index.html` (not `cv.html`) so GitHub Pages serves it at the clean directory URL
`https://sirsirio.github.io/MyPortfolio/cv/`. Neither the URL, the folder name nor the filename
may contain "ALK" (D-11). The site already ships `.nojekyll`, so a new subfolder serves
verbatim with no extra configuration.

**No content edits beyond 4c.** Verified in `<cv_findings>`: the `<title>` is already
`Sirio Vittorio Feltrin — CV`, there are zero case-sensitive `\bALK\b` matches (the only "alk"
is inside "talks"), there are no `<script>` tags, no `<img>` tags and no relative asset
references — so the single file is genuinely self-sufficient. Leave the Google Fonts and cdnjs
Font Awesome `<link>`s exactly as they are; they work on Pages and swapping them out is not
this task.

**4b — repoint the nav link (D-11, D-12).** In `site/index.html` line 33, replace ONLY the
href:

```
FROM: <a class="nav__link" href="https://canva.link/5a5yj5bdg78axhv" target="_blank" rel="noopener">CV&nbsp;&#8599;</a>
TO:   <a class="nav__link" href="./cv/" target="_blank" rel="noopener">CV&nbsp;&#8599;</a>
```

Keep `target="_blank"`, keep `rel="noopener"`, keep the `↗` glyph — a new tab is deliberate
here, so a visitor reading the CV does not lose the animated landing page. Add a short HTML
comment in the file's voice recording that the CV is now self-hosted at `/cv/` and citing
D-11.

This is the ONLY CV href on the site — verified: no other `cv` reference exists in
`site/index.html` or in any `site/*.js`. ⚠ Do NOT add a CV link to the contact section; its
absence is the shipped D-22 decision (D-12).

**4c — make the hosted copy readable on a phone.** This is the one content change, and it is
required, not polish.

The CV is NOT responsive: `.page` is `width: 210mm; min-height: 297mm` (≈794 CSS px) and the
only media query in the file is `@media print`. On a 390px phone it overflows horizontally and
the visitor gets a tiny, side-scrolling CV. CLAUDE.md's standing constraint is that recruiters
open links on phones, and `ALK_Application_Context.md` describes the likely path as LinkedIn on
a phone → profile → portfolio. A side-scrolling CV subpage would undercut the exact competence
this portfolio exists to demonstrate.

Append ONE additive block at the very end of the existing `<style>`, immediately before
`</style>`:

```css
/* Screen-only mobile fit — the A4 page shell is fixed at 210mm, which side-scrolls
   on a phone. Scoped to `screen` so the @media print A4 output above is untouched. */
@media screen and (max-width: 820px) {
  body { padding: 0; }
  .page { width: 100%; min-height: 0; }
}
```

Rules for this edit: **screen-scoped only** (`@media screen and (max-width: …)` — a bare
`max-width` query also matches print on narrow paper); do NOT touch the `@media print` block at
lines ~267–273; do NOT restyle typography, colours, spacing or layout; do NOT reflow the
two-column sections beyond what the width change does on its own. If the page still overflows
at 390px after this, add the minimum further overrides needed (most likely a `min-width` on a
table or a flex row) and record each one in the SUMMARY — but keep it to fitting the viewport,
not redesigning the CV.

Apply this to `site/cv/index.html` ONLY. The application-folder original stays byte-identical.

**4d — extend `check-fms.mjs`**: `site/cv/index.html` exists and is non-empty; its `<title>`
contains "Sirio" and does not match `/ALK/i`; `site/index.html` no longer contains
`canva.link`; it contains exactly one `href="./cv/"`, and that anchor carries both
`target="_blank"` and `rel="noopener"`; the contact section contains no `cv` href (D-12); and
`site/cv/index.html` contains `@media screen and (max-width` (the mobile fit) AND still
contains `@media print` (the A4 output). The existing site-wide `/\bALK\b/` gate now covers
`site/cv/index.html` automatically — confirm it still passes.
  </action>
  <verify>
    <automated>cd "D:/06. Job & Applications/05_Portfolio" && node .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs</automated>
    <human-check>
Covered by points 15–17 and 19 of the Task 3 render check. If Task 4 runs on its own, serve
with `python -m http.server -d site 8137 --bind 127.0.0.1` and confirm those four points
before declaring done.
    </human-check>
  </verify>
  <done>
`site/cv/index.html` exists, serves at `/cv/`, carries no "ALK" in its URL, filename or
content, and fits a 390px viewport without horizontal scrolling while still printing as A4;
`site/index.html`'s nav CV link points at `./cv/` with `target="_blank" rel="noopener"` and the
Canva URL is gone; the contact section still has no CV link; the application-folder original is
byte-identical; the gate script passes every CV assertion.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| author → DOM (`data-i18n-rich`) | `applyLang()` writes dictionary strings via `innerHTML` |
| site → third-party origin | outbound links, and the CV page's Google Fonts + cdnjs stylesheets |
| employer-confidential → public page | the AGC chapter describes an internal tool |
| Sirio's local machine → public page | the screenshots capture a real desktop environment |
| Sirio's PII → public crawlable page | the hosted CV exposes phone + email as live links |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-fms-01 | Tampering | `site/i18n.js` `data-i18n-rich` sink | mitigate | Every new `sw.*` value is an author-controlled literal; no user input, URL param or network data reaches the dictionary. `data-i18n-rich` used ONLY for strings carrying author-written inline markup — everything else is plain-text `data-i18n` |
| T-fms-02 | Tampering | outbound links (thesis-tools, CV links) | mitigate | `target="_blank" rel="noopener"` on every new external anchor, including the repointed nav CV link, matching the shipped `.dd-link` pattern |
| T-fms-03 | Tampering | media references | mitigate | No remote `src` anywhere in the landing page; the four PNGs are committed first-party files referenced by relative path. Gate asserts no `src="http` in `index.html` |
| T-fms-04 | Information disclosure | AGC chapter (D-04) | mitigate | Text-only chapter; content restricted to profile.md:196–199; no screenshot, no UI mockup, no internal architecture, no data, no headcount. Automated gate asserts section 04 contains no visual element |
| T-fms-05 | Information disclosure | `pv-data-collection.png` local folder path | transfer | Personal Drive path `D:/Il mio Drive/Pilastri di Vita/…` is legible in the capture. Low sensitivity, but it is Sirio's call, not the executor's: surfaced as an explicit go/no-go in the blocking render check (point 18) and recorded in the SUMMARY. Not retouched — an edited screenshot reads worse than the path |
| T-fms-06 | Repudiation | chart values in the analysis captures | mitigate | The dashboard compares "Demo Experiments" vs "Lab Syringe Pump" — demonstration data. Copy describes what the dashboard DOES and never quotes a value or implies a thesis result (Task 1 gate) |
| T-fms-07 | Denial of service | overlay motion layer | mitigate | `gsap.context()` + `revert()` on close so reopening cannot leak or duplicate ScrollTriggers; scroller is the overlay, never the frozen window; no new rAF loop (gate asserts exactly one `requestAnimationFrame(loop)`) |
| T-fms-08 | Denial of service | +793 KB of PNGs on first load | accept | Overlay images get `loading="lazy" decoding="async"`; alpha strip trims the total; actual transferred bytes measured in the render check. Deeper optimisation (WebP, responsive `srcset`) is a follow-up todo, not this task |
| T-fms-09 | Information disclosure | hosted CV PII (`tel:+45…`, `mailto:`) | transfer | The CV moves from "PDF sent to named employers" to "public, crawlable page". Genuinely different exposure. Surfaced as an explicit decision in the render check (point 19); if Sirio objects, the phone number is removed from the hosted copy only. Default is ship, per his existing choice to publish the CV |
| T-fms-10 | Tampering | CV page third-party CSS (Google Fonts, cdnjs) | accept | Two remote stylesheets on a static document page with no scripts, no forms and no secrets. Sirio's existing file, explicitly left as-is; the blast radius of a compromised font/icon CSS on a script-free page is cosmetic. Revisit if the CV ever gains interactivity |
| T-fms-SC | Tampering | package installs | n/a | No npm/pip/cargo install in this plan — GSAP is already vendored and pinned, Pillow is already present. No new dependency is added |
</threat_model>

<verification>
Run from the repo root after all four tasks:

```bash
node .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs
python -m http.server -d site 8137 --bind 127.0.0.1
```

Then walk the 21-point render checklist in Task 3's `<human-check>` at desktop width and at
390px. The render check is BLOCKING — do not declare the work done without it.

Regression surface to re-confirm by eye: the OT-2 deep-dive (open, scroll, close, reopen), the
dispenser card's pump animation and clip, the EndoSense card, the EN/IT toggle across the whole
page, and the nav (CV link now internal, everything else unchanged).
</verification>

<success_criteria>
- Selected Work shows four cards; the new software card is second, clickable by mouse and
  keyboard, and warps into `[data-proj="soft"]` (D-01, D-07)
- The deep-dive is problem-first, five numbered sections, three chapters, built from the OT-2
  class vocabulary (D-06)
- Chapter one shows the four real Pump Validator captures in three distinct layout beats, each
  framed so its edge is visible against the dark ground (D-10)
- No chart value is presented as a thesis result; no claim that the app is public or released
- The AGC chapter is text-only and reveals nothing beyond profile.md:196–199 (D-04)
- Two hand-authored abstract SVG diagrams animate on scroll and render complete and static
  without JS or under reduced motion (D-05 as narrowed by D-10)
- The four PNGs live only under `site/assets/media/`, kebab-cased, committed, referenced
  relatively; no root copies remain (D-10)
- The CV is served at `/cv/`, the nav points at it, the Canva link is gone, and no "ALK" appears
  in the URL, the filename or the page (D-11)
- The hosted CV fits a 390px viewport without horizontal scrolling and still prints as A4 (D-11)
- The contact section still has no CV link (D-12)
- Every new string exists in both `en` and `it`; no hard-coded copy in the markup beyond the
  English inline fallbacks (D-08)
- Nothing in `site/` mentions ALK or the application that prompted the page (D-08)
- No sci-fi flavour labels; no invented metric; every fact traceable to profile.md, CONTEXT.md
  or a screenshot (D-08)
- The OT-2 deep-dive, the pump animation, the EndoSense card and the language toggle are all
  unchanged in behaviour
- Four atomic commits, `feat(quick-260824-fms): …`
</success_criteria>

<output>
Create `.planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/260824-fms-SUMMARY.md` when done.

Record in it: the resolved accent/`data-pos` choice and why; the plate-flip reshuffle; the
`.media-slot` `> svg` extension; the `[data-open]` affordance fix that also touches the OT-2
card; the four screenshots' old→new paths and the before/after byte totals from the alpha strip;
the cancellation of `[data-sw-doe]` under D-10; the exact profile.md lines and screenshot facts
each factual claim came from; **the personal folder path visible in `pv-data-collection.png` and
Sirio's decision on it**; the measured first-load transferred bytes; and an explicit note that
the Italian copy is pending Sirio's own review.

For the CV (Task 4) additionally record: that the hosted CV is the **ALK-tailored v3 under a
neutral URL**, explicitly TEMPORARY, and that swapping in a general CV later is a **single file
replacement at `site/cv/index.html`** with no other change anywhere; the exact mobile-fit CSS
added and confirmation that `@media print` was untouched; that the application-folder original
is byte-identical; and **Sirio's decision on the public phone number**.
</output>
