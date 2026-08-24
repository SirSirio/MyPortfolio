---
phase: quick-260824-fms
plan: 01
subsystem: portfolio-site
tags: [portfolio, deep-dive, i18n, gsap, svg, cv, accessibility]
status: awaiting-render-check
requires:
  - site/index.html (work plates + OT-2 overlay as structural template)
  - site/i18n.js (dd.* namespace as the mirror)
  - site/main.js (openProj/closeProj/applyTrans warp system)
provides:
  - "A second [data-proj] deep-dive overlay, proving the warp system generalises"
  - "work.plateSw.* + sw.* bilingual namespaces (57 keys x 2 languages)"
  - "PROJ_MOTION dispatch: a third deep-dive is one table entry, not a new branch"
  - "A self-hosted CV at /cv/ on Sirio's own domain"
  - "check-fms.mjs: 715 source assertions covering i18n, structure, assets, motion, CV"
affects:
  - site/index.html
  - site/styles.css
  - site/main.js
  - site/i18n.js
  - site/assets/media/
tech-stack:
  added: []
  patterns:
    - "gsap.context(fn, scroller) scoping to disambiguate a diagram authored twice"
    - "data: URL import to load a browser ESM file under Node without a package.json"
    - "screen-scoped media query so a mobile fit cannot reach the print stylesheet"
key-files:
  created:
    - site/cv/index.html
    - site/assets/media/pv-landing.png
    - site/assets/media/pv-data-collection.png
    - site/assets/media/pv-analysis-charts.png
    - site/assets/media/pv-analysis-scores.png
    - .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs
  modified:
    - site/index.html
    - site/i18n.js
    - site/styles.css
    - site/main.js
    - site/assets/media/README.md
decisions:
  - "Accent --star-vega (171,140,255) at data-pos 0.72 for the new overlay (D-09)"
  - "[data-sw-doe] cancelled: real captures made a hand-drawn run matrix redundant (D-10)"
  - "Gate asserts 2 requestAnimationFrame(loop) call sites, not the plan's 1"
metrics:
  tasks: 4
  commits: 5
  assertions: 715
  duration: ~1h
  completed: 2026-08-24
---

# Quick 260824-fms: Digital Solutions Umbrella Deep-Dive + Self-Hosted CV Summary

A fourth Selected Work card that warps into a second full-screen deep-dive covering three
software projects as chapters, plus Sirio's CV moved off Canva and onto his own domain at
`/cv/`.

## Status: BLOCKING RENDER CHECK NOT PERFORMED

**Four tasks are complete and committed. The plan's 21-point render check is unresolved.**

I have no browser tooling, so I ran every automated gate available and stopped at the
checkpoint. See [Unresolved Checkpoint](#unresolved-checkpoint-blocking) at the end. Two of
those points are **Sirio's decisions, not verification items**, and both need his answer
before this ships publicly.

## What shipped

### The deep-dive (Tasks 1-3)

- **A fourth work plate**, second in the list, between the Portable Precision Liquid
  Dispenser and the Automated Gel Electrophoresis cards (D-07). It is the second clickable
  plate: `data-open="soft"`, `role="button"`, `tabindex="0"`, i18n'd `aria-label`, and the
  boot Enter/Space handler already covers it generically.
- **The `[data-proj="soft"]` overlay**: five numbered `proj-sec` sections built from the
  OT-2 class vocabulary (D-06) - one framing section, then chapter one (the Pump Validator
  thesis app), chapter two (the multi-API literature search engine), chapter three (the AGC
  shift app), then a closing "the thread".
- **Four real Pump Validator captures** in three distinct layout beats (D-10).
- **Two hand-authored SVG diagrams**, both rendering complete and static without JS.
- **Full EN + IT copy** for all of it: 57 new keys in each language.
- **Scroll-telling** for the second overlay, sharing one dispatch with the first.

### The CV (Task 4)

Self-hosted at `site/cv/index.html`, served at `/MyPortfolio/cv/`. Nav repointed from the
Canva link. No employer name in the URL, folder, filename or page content.

## Plate order and the flip reshuffle

Inserting a plate in the middle broke the zig-zag, since `.plate--flip` is authored per
article rather than computed. Resolved by shifting the flips one place:

| Position | Plate | Before | After |
|---|---|---|---|
| 1 | Portable Precision Liquid Dispenser | no flip | no flip |
| 2 | **Digital Solutions for the Lab** (new) | - | **flip** |
| 3 | Automated Gel Electrophoresis (OT-2) | flip | **no flip** |
| 4 | EndoSense | no flip | **flip** |

Nothing else about the OT-2 or EndoSense articles changed. The gate asserts the sequence is
`[no-flip, flip, no-flip, flip]` so this cannot silently regress.

## Accent choice (D-09)

`--star-vega` (171,140,255) at `data-pos="0.72"`. Chosen because it is already a palette
token (so it is brand material, not a reached-for AI violet), it is far from the OT-2's
Rigel cyan so the two deep-dives cannot be confused mid-warp, and violet reads as
"data/software" against cyan's "engineering room".

The shared overlay rule previously hard-set `--accent: var(--star-rigel)` for
`[data-proj="ot2"]`. That is now split: the ground rules are a selector list covering both
overlays, and each overlay resolves its own accent in a one-line rule above them. This
matters more than it looks - an overlay without a resolved `--accent` renders every accent
surface fully transparent with **no console error**.

## The `.device-frame` inversion (recorded so nobody "cleans it up")

`.device-frame` was originally written to stop opaque-**white** PNGs punching a hole in the
dark ground. The four Pump Validator captures are the inverse case: their background is
`#0B0D12`, within a few units of the frame's `#08090f` and the overlay's `#05070e`. Dropped
raw they do not punch a hole, they **vanish**. The accent hairline border and inner glow are
the only things giving them a visible edge.

Both `styles.css` and `assets/media/README.md` now carry that note. Removing the border
"because the frame looks unnecessary here" would make three beats read as broken layout.

## Screenshots: paths and the alpha strip

All four verified programmatically before and after (the alpha channel was **parsed**, not
eyeballed - a viewer composites alpha onto white and lies about PNG backgrounds).

| From (repo root) | To (`site/assets/media/`) | Before | After |
|---|---|---|---|
| `AppLandingPage.png` | `pv-landing.png` | 596,282 | 425,424 |
| `DataCollectionPage.png` | `pv-data-collection.png` | 95,587 | 78,167 |
| `DataAnalysisEx1.png` | `pv-analysis-charts.png` | 78,518 | 65,099 |
| `DataAnalysisEx2.png` | `pv-analysis-scores.png` | 41,989 | 33,385 |
| | **Total** | **812,376** | **602,075** |

**210,301 bytes saved (25.9%).** Every file was RGBA with a verified constant-255 (fully
opaque) alpha, i.e. dead weight; re-saved as RGB with `optimize=True`. Dimensions unchanged,
no resize, no crop, no format or quality change. Each file was guarded individually: keep
the original if dimensions changed or the result grew. None did.

All four carry `loading="lazy" decoding="async"` and sit inside a hidden overlay, so they do
not land on the critical path.

## `[data-sw-doe]` cancelled (D-10)

The planned run-matrix SVG does not ship. A hand-drawn diagram of a randomised run order
sitting beside a real screenshot of the actual Design of Experiments table would have been
redundant and made the page look like it was padding. Two SVGs ship, not three.

## The `[data-open]` affordance fix (also fixes the shipped OT-2 card)

Both warp cards are `role="button" tabindex="0"`, but neither had a pointer cursor or a
focus ring. A keyboard visitor tabbing through Selected Work had **no visible indication of
where they were** - a pre-existing accessibility gap on the shipped OT-2 card.

Fixed against `[data-open]` rather than a plate class, so it covers both cards and any
future one. The focus ring reuses the `.plate__link:focus-visible` accent treatment.

## Where every factual claim comes from

| Claim | Source |
|---|---|
| Thesis app: randomised collection, JSON logging, DoE methodology | `profile.md:58` |
| App name "Pump Validator", subtitle, four module names and their descriptions | `AppLandingPage.png` |
| DoE table columns; paste-from-Excel; the setup fields | `DataCollectionPage.png` |
| Dashboard scores accuracy + CV% precision across volume/flow categories | `DataAnalysisEx1.png` |
| Category score breakdown across volume x flow-rate bands | `DataAnalysisEx2.png` |
| Seven APIs, RRF, snowballing, BibTeX pipeline, human-in-the-loop | `profile.md:336-361` |
| Shift app: Azure, Python, mobile-friendly, DB-driven, API, corporate IT | `profile.md:196-199` |
| "Five years at the bench", repetition as the bottleneck | `profile.md:60`, `origin.beat2` |

**No invented metrics.** An audit of the new copy found only two number families in the
entire 114 new strings: the year range `2024 - 2026` (AGC from 2024 per `profile.md:196`,
thesis tooling 2026 per `:336`) and the HTML entity `&#8599;` for the arrow glyph. The
`~2,200 lines` figure was deliberately **omitted** per the OT-2 page's D-10 lesson.

**No chart value is quoted as a result.** The dashboards compare series labelled "Demo
Experiments" and "Lab Syringe Pump" - demonstration data. The copy describes what the
dashboard *does*, and captions 3 and 4 state "Shown with demonstration data" outright in
both languages, so a reader cannot mistake the numbers for thesis findings.

**Chapter three reveals nothing beyond `profile.md:196-199`**, uses present-progressive
throughout ("I am designing and developing"), and claims no deployment, no users, no time
saved and no headcount. A gate asserts section 04 contains no `<img>`, `<svg>`, `<figure>`,
`.media-slot`, `.device-frame` or `.blueprint`.

## Design-skill application and where it was deliberately overridden

Read in full before any markup, per Sirio's twice-stated request.

**Design read:** an *extension* of a shipped dark-tech portfolio deep-dive - redesign mode
**preserve** - for recruiters scanning on desktop and phone, cosmic/technical language,
native CSS + GSAP ScrollTrigger. Dials per section 11.C ("match existing"):
**VARIANCE 8 / MOTION 6 / DENSITY 3**.

Applied: anti-centre asymmetric splits; no two adjacent beats sharing a layout family; one
dominant element per beat; real images over div-based fake screenshots (the four captures
are exactly what section 4.8 asks for); every tween justified in one sentence; reduced-motion
collapse; explicit mobile collapse per multi-column block; no scroll cues; no decorative
status dots; no fake-precise numbers; WCAG-contrast focus ring.

**Deliberately overridden, under section 11.C ("preserve copy voice", "extract brand tokens
first") and the skill's own "every rule is contextual" preamble:**

| Skill rule | Why overridden |
|---|---|
| 9.G zero em-dashes | The shipped site uses em-dashes throughout `dd.*` and `origin.*`; the plan mandates them. Matching the page beats matching the skill - a mid-page voice change would be visible. |
| 9.F ration the middle dot | `dd.meta` and `dd.eyebrow` already use `·` as the meta separator. Consistency wins. |
| 9.F no section-number eyebrows | `section__numeral` is the shipped chrome on both the landing sections and the OT-2 overlay. |
| 4.8 hand-rolled SVG discouraged | Locked by D-05, and these are *diagrams*, not decorative illustration. |
| 4.2 the LILA rule (AI purple) | Override path applies: `--star-vega` is a pre-existing palette token, i.e. brand material. |

## Deviations from Plan

### Auto-fixed issues

**1. [Rule 3 - Blocking] `site/i18n.js` cannot be imported by a Node gate script**

- **Found during:** Task 1, first run of `check-fms.mjs`
- **Issue:** `site/i18n.js` is an ES module served via `<script type="module">`, but the repo
  has no `package.json` with `"type": "module"`. Node parses a `file://` import of a `.js`
  file as CommonJS and dies on `export`.
- **Fix:** The gate reads the source and imports it through a `data:text/javascript` URL,
  which keeps real module semantics. Chosen over adding a `package.json` to `site/`, which
  would ship a pointless file to GitHub Pages. Safe because `i18n.js` is a leaf module and
  every DOM/global reference sits inside a function body, never at top level.
- **Commit:** `62a875a`

**2. [Rule 1 - Bug] Gate counted HTML comments as markup**

- **Found during:** Task 2
- **Issue:** `index.html` is heavily commented and several comments legitimately *name* the
  things being counted ("it warps to `[data-proj=soft]`", "carries NO `<img>`"). Structural
  counts were inflated and the D-04 no-visuals gate would have fired on prose.
- **Fix:** Strip HTML comments before any structural count, mirroring the block-comment strip
  the plan already specifies for `main.js`. Also tightened a CSS colour regex that was
  matching `background-color` via its `color` alternative.
- **Commit:** `d7fffe5`

**3. [Rule 1 - Bug] The plan's `requestAnimationFrame` assertion contradicted shipped code**

- **Found during:** Task 3
- **Issue:** The plan specifies asserting "exactly ONE `requestAnimationFrame(loop)` call".
  The shipped code has **two** call sites, and always has: `loop()` reschedules itself, and
  `boot()` kicks it off once. Verified against base commit `4163656` - both predate this task.
- **Fix:** The real invariant is one *loop*, not one *call*. The gate asserts 2 call sites
  plus exactly one `loop()` definition, which still catches a genuinely added loop (T-fms-07)
  without failing on correct pre-existing code.
- **Commit:** `2b080d1`

**4. [Rule 2 - Missing critical] CV mobile fit needed more than the plan's base block**

- **Found during:** Task 4
- **Issue:** The plan's block (`body{padding:0}`, `.page{width:100%;min-height:0}`) removes
  the fixed A4 shell, but three further overflow sources survive it. `.cv-header` and
  `.p2-bar` are flex rows containing `white-space: nowrap` children, which **cannot** shrink
  below their content width. Separately, `.cv-body` has `overflow: hidden` - with the fixed
  `297mm` height removed, that would silently **clip** reflowed content rather than let the
  page grow.
- **Fix:** Added the minimum overrides, all inside the same screen-scoped query: wrap both
  header rows and align their contact blocks left, `overflow: visible` on `.cv-body`, and
  trim the 38px side padding to 18px so the nowrap contact strings have room.
- **Commit:** `5882077`

**5. [Rule 2 - Missing critical] Inline English fallbacks were unverified**

- **Found during:** final verification
- **Issue:** Every new element ships both a `data-i18n` key and its English value inline. If
  the two drift, the visitor sees stale text before `applyLang()` runs, and permanently if JS
  never runs. Nothing checked this.
- **Fix:** Promoted an ad-hoc probe into a permanent gate that normalises entities (the markup
  writes `&mdash;` where the dictionary writes a literal em-dash) and compares all 50
  fallbacks. All match.
- **Commit:** `df2e1e2`

### Not a deviation, but worth recording

The plan's `<cv_findings>` states the CV source is 24,443 bytes; it is actually **24,380**.
Everything else in that audit was exact (zero `\bALK\b`, clean `<title>`, no scripts, no
`<img>`, only `@media print`). The original was only ever read, never written - confirmed
unchanged at 24,380 bytes after the copy.

## Verification performed

| Gate | Result |
|---|---|
| `check-fms.mjs` | **715 assertions, all pass** |
| `node --check` on all 4 site ES modules | pass |
| Local server, landing + `/cv/` | HTTP 200 |
| All 20 referenced local assets fetched | all HTTP 200 |
| HTML tag balance (17 element types) | all open/close counts match |
| Number audit of 114 new strings | only the year range + one entity |
| `canva.link` / `\bALK\b` anywhere in `site/` | zero matches |
| Inline English fallbacks vs dictionary | 50/50 match |
| Post-commit deletion check, all 5 commits | zero deletions |

The gate covers: EN/IT key parity across all 200 referenced keys; no empty new values; no
shipped key renamed; plate source order and flip sequence; asset presence; every overlay
`<img>` relative + alt + i18n key + lazy; no remote `src`; the D-04 no-visuals gate; the
site-wide ALK gate; both authored diagrams present and the cancelled one absent; eight OT-2
regression markers; per-overlay accent resolution; `.media-slot > svg`; the `[data-open]`
affordance; `.device-frame`'s border; no hard-coded hue in `.sw-*`; all seven motion symbols;
the OT-2's three original trigger selectors; every `scrollTrigger` setting a `scroller`;
`PROJ_MOTION` dispatch; and every CV assertion.

## Unresolved checkpoint (BLOCKING)

**The 21-point render check has not been performed.** It requires a browser at desktop width
and at 390px; I have no browser tooling. Everything automatable was automated instead.

A server is running for it:

```
python -m http.server -d site 8138 --bind 127.0.0.1
```

**Use port 8138, not 8137.** A stale server already occupies **8137** and serves the
**pre-change** build - I confirmed it still returns `canva.link` and only two `data-open`
cards. Render-checking on 8137 would silently verify the wrong page and pass.

Points most worth attention, since they are the ones automation genuinely cannot reach:

- **Point 6** - is the Design of Experiments table actually *readable* at full width? That
  beat exists to prove D-02; if it is not legible it has failed its purpose.
- **Point 13** - are the SVG labels readable at 390px? Sized at 20/17/16 viewBox units with a
  bump under 620px, but only a render confirms it.
- **Point 5** - do the dark captures show a visible framed edge, or do they bleed into the
  background? This is the `.device-frame` inversion in practice.
- **Point 10** - open OT-2, close, open the new one: motion must rebuild, not double up.
- **Point 14** - measured first-load transferred bytes.

### Two items need Sirio's decision, not verification

1. **A personal folder path is visible in `pv-data-collection.png`** - the base-folder field
   reads `D:/Il mio Drive/Pilastri di Vita/C - DTU/05. Sp`. It is harmless technically, but it
   is a personal Drive path going onto a public page. Shipped as-is per his "feel free to use
   them", and **deliberately not retouched** - a visibly edited screenshot reads worse than
   the path. He can swap in a re-capture with a neutral path if he prefers.

2. **The hosted CV puts his phone number and email on a public, crawlable page** as `tel:`
   and `mailto:` links. That is a genuine step beyond emailing a PDF; scrapers read public
   pages. If he objects, removing the phone number from the hosted copy only is a one-line
   change that leaves the application-folder original and the PDF untouched.

### Italian copy is pending Sirio's own review

All 57 new keys were translated faithfully, mirroring the English punctuation exactly so both
languages lay out identically. Brands, acronyms, product names and the four Pump Validator
module names are untranslated as specified. "la DTU" convention observed (the phrase does not
in fact occur in the new copy - the closest, `sw.s1.p1`, was written without needing it).

**Sirio reviews Italian wording himself.** Nothing here has had his eyes on it.

## Notes for whoever picks this up next

- **The spine diagram is authored twice** - once in the work card, once in the overlay
  masthead. That is deliberate (no build step, no JS templating). `initSoftMotion` scopes its
  selectors through `gsap.context(fn, scroller)` so it only ever animates the overlay's copy.
  If you ever pre-query those elements globally instead of using selector strings, the card's
  diagram will start animating on the landing page.
- **A third deep-dive is now cheap**: one `PROJ_MOTION` entry, one `[data-proj]` accent line,
  one selector added to the shared chrome lists. No new branch in `applyTrans`.
- **The hosted CV is explicitly temporary.** Swapping in a general CV later is a single file
  replacement at `site/cv/index.html` - no other change anywhere. Keep the mobile-fit block.

## Self-Check: PASSED

All six created files verified present on disk; all five commit hashes verified in
`git log`; working tree clean; zero deletions across the branch.
