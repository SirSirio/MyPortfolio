---
phase: 01-the-design-build
plan: 03
status: COMPLETE
subsystem: ui
tags: [css-has, content-curation, design-tokens, css-custom-properties, static-html, github-pages, accessibility]

# Dependency graph
requires:
  - phase: 01-01
    provides: "site/ shell and the proven GitHub Actions Pages deploy"
  - phase: 01-02
    provides: "FOUND-03 tokens on :root, the gold Sirio Star hero, the fixed deep field, applyPara(), the docking nav, .hero overflow:clip + the 620px floor"
provides:
  - "The complete Phase 1 single-scroll page: hero -> Mission -> Selected Work -> Experience -> Publications -> Contact (FOUND-04's Phase-1 clause)"
  - "One .section class + per-section --accent (the PAL spectrum) — the reason plate reordering is free"
  - "The MEDIA-01 swappable media slot: pure-CSS :has() swap, zero JS, plus site/assets/media/README.md"
  - "The verbatim locked identity one-liner with its PAL-spectrum .grad span"
  - "All five in-page anchors resolving, incl. the #index the hero pointed at since 01-02 (NAV-02)"
affects: [phase-02-the-story, phase-04-projects]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Still zero dependencies — no package.json, no bundler; the media slot is deliberately CSS, not a JS loader"
    - "Section-driven accent: children read rgba(var(--accent), a); never hard-code a stop"
    - ":has() over :empty for presence detection — :empty is a whitespace trap"
    - "The design's style-hover attribute is inert and is always translated into a real :hover rule"
    - "Verification gates grep the whole file, comments included — never quote a forbidden string in a comment"

key-files:
  created:
    - "site/assets/media/README.md — the MEDIA-01 drop-in contract"
  modified:
    - "site/index.html — Mission, Work (3 plates), Experience (4 rows), Publications (1 row), Contact, footer"
    - "site/styles.css — the .section system, plates, media slot, exp/pub/contact/footer"
    - ".planning/REQUIREMENTS.md — FOUND-04, NAV-02, MEDIA-01 marked complete"

key-decisions:
  - "Media slot ratio is 16/9 per V4:82,94 — STATE.md's '16:10' is drift D-2, confirmed: a 16/10 ratio appears in NO design file"
  - "Plates run in importance order (2026 -> 2025 -> 2024), inverting the design's chronology, so engineering leads and biotech is the hint"
  - "Contact heading ships as h2 (the design used a bare h3 with no h2 in-section) for a correct document outline; size override keeps it pixel-identical"
  - "The design's second publication is NOT ported and NOT replaced — profile.md supports exactly one, and inventing a filler would be fabrication"
  - "Corrections are recorded in this SUMMARY rather than quoted in code comments, because the gates grep the whole file for the forbidden strings"

patterns-established:
  - "One .section class; only --accent changes per section"
  - "Placeholder chrome is styled on :not(:has(> img, > video)), so filling a slot needs no CSS/JS edit"

requirements-completed: [FOUND-04, NAV-02, MEDIA-01]
requirements-deferred: []

# Metrics
duration: ~50min
completed: 2026-07-16
---

# Phase 01 Plan 03: The Curated Content Sections Summary

**The Phase 1 page is complete: the verbatim identity one-liner, 3 work plates in importance order, 4 experience rows, 1 correctly-cited publication and Contact — every claim traced to `profile.md` — plus a pure-CSS `:has()` media slot that swaps a placeholder for a real asset with no re-engineering.**

## The headline: the design's content was largely wrong, and none of it shipped

This was not a port. The approved V4 design is the source of truth for *structure*; `../00_Profile/profile.md` is the source of truth for *truth*. Where they disagreed, the profile won — every time. What the design asserted and what actually shipped:

| Design said | Reality (`profile.md`) | Action |
|---|---|---|
| `Research Assistant / 2022 — 2024 / Lab automation` | **No such role exists.** | **Deleted.** Replaced with the real Research Intern — CIBIO, UniTrento, 2023 (`:208`) |
| AGC Biologics — *absent entirely* | The **current job** since Jun 2024 (`:155`) | **Added, and it leads the list** |
| `Hardware Lead — iGEM` | `iGEM Wet Lab Lead — EndoSense Biosensor` (`:16`, mandated verbatim) | **Retitled** |
| `Gold medal` (hedged as "type TBC" at `:195`) | **Gold** (`:339` Awards table + `:31` CV guidelines) | **Gold** — A7; the "TBC" is outvoted two-to-one |
| Publication: `Cell-free diagnostics — co-author` | *Mapping cryptic phosphorylation sites in the human proteome*, **Contributing author** (`:328`) | **Both fields corrected** |
| A **second** publication (`Part collection contribution — iGEM Registry · 2024`) | **Zero support in `profile.md`.** | **Deleted, and deliberately not replaced** |
| `Descriptio od endosese` | — | Obvious lorem. **Deleted** |
| `PLATE 002 · 2025` = "Liquid Handler" | The dispenser is the **2026** MSc thesis | **2026** — A8 |

Nothing was invented to fill the space left behind. Publications is a one-row list because Sirio has one publication, and that is the honest answer.

## Requirements

**Completed (3):** `FOUND-04`, `NAV-02`, `MEDIA-01`. Marked in `.planning/REQUIREMENTS.md` (checkbox + traceability row). **All Phase 1 requirements are now Complete.**

| Req | Why it is genuinely met |
|-----|-------------------------|
| MEDIA-01 | Slots ship as labelled striped 16/9 placeholders; filling one is a drop-in + one line with **no CSS/JS change** — verified live by real insertion, then reverted. Documented in `site/assets/media/README.md`. |
| NAV-02 | All three clauses now true: `scroll-behavior: smooth` (01-02), **section anchors all resolve**, and the **persistent nav docks** — both verified in Chrome (below). |
| FOUND-04 | The single immersive scroll home is complete. **See the flag below — this one needs reconciling.** |

### ⚠ FOUND-04 is marked Complete, but its wording overstates what Phase 1 built — please reconcile

FOUND-04 reads *"**Multi-page architecture** with persistent navigation + a single immersive scroll home page."* Phase 1 ships the persistent nav and the single-scroll home. It **does not ship a multi-page architecture** — that is deliberate and recorded (RESEARCH Open Question 1; this plan's constraints forbid building detail pages now, as it contradicts both "ship small" and the Phase 4 boundary).

I marked it Complete anyway for one specific reason: **ROADMAP maps FOUND-04 to Phase 1 only.** Its multi-page clause actually lands in **Phase 4 (PROJ-01)**, which tracks under its own id. Left Pending, FOUND-04 would dangle forever with no phase able to close it. So the mark reflects "Phase 1 delivered everything Phase 1 was scoped to deliver", not "multi-page exists".

**Recommended fix at phase close:** reword FOUND-04 to drop the multi-page clause (PROJ-01 owns it), or remap it to span Phases 1+4. This is the same class of written-record defect as 01-02's `HERO-01` WebGL-vs-Canvas flag — flagged, not silently edited, because REQUIREMENTS.md wording is not this plan's to rewrite.

## The two items 01-02 handed me — both verified, neither broken

01-02 could not test these (its page had no scroll). Both were mine to close, and both pass in real Chrome (headless, 1280x800, served over HTTP):

**D-01 — nav docking.** Verified **bidirectionally**, which the deferral notes did not ask for but which matters (a nav that docks but never undocks is a real bug):

| scrollY | hero.bottom | docked | position |
|---|---|---|---|
| 0 (rest) | 705 | false | absolute — the in-hero bar |
| 600 | 105 | false | absolute (correctly holds above the 70 threshold) |
| 680 | 25 | **true** | **fixed**, navTop=0 |
| 2000 / 4400 | −1295 / −3695 | true | fixed, navTop=0 |
| back to 0 | 705 | **false** | absolute — **undocks cleanly** |

The docked bar's glass is correct: `background rgba(255,255,255,0.04)`, `backdrop-filter blur(14px)`, `border-bottom rgba(255,255,255,0.1)`, height 70px. It stays `navTop=0` throughout, confirming the nav still escapes the hero's `overflow: clip` now that real content scrolls.

**D-04 — deep-field continuity.** Structurally guaranteed, not eyeballed: `[data-deep]` computes `position: fixed` and is **not** a descendant of `.hero` (so the hero's clip cannot touch it), and **all five sections compute `background-color: rgba(0, 0, 0, 0)`** — nothing occludes the starfield and nothing introduces a band at the hero boundary. `.hero` keeps `overflow: clip`; `.page` keeps `overflow-y: visible`, so the real scroll is intact.

**The 620px-floor trap: not triggered.** I did not touch the floor, the hero's clip, or the D-05 constants (`STAR_DRIFT` 10 / `CANVAS_DRIFT` 6 / `DRIFT_EASE` 0.06). Nothing in this plan needed them changed.

**Still open for Sirio (aesthetic, not mechanical):** 01-02 noted the docked nav *pops* rather than fades, because `position` is not animatable — only the glass fades over 0.45s. That is now observable for the first time. It behaves exactly as prescribed; whether it *reads* well is Sirio's call at the end-of-phase gate. The fix, if wanted, is small (drive opacity from the dock class).

## MEDIA-01 — verified, including the trap the plan warned about

Tested in real Chrome against the real `styles.css`, then again by pasting the README's exact one-liner into the real plate-001 slot in `index.html` and reverting:

| slot | filled | striped | border | label | ratio |
|---|---|---|---|---|---|
| empty (inline tags) | false | true | dashed | rendered | 16 / 9 |
| **empty + whitespace/newline** | false | **true** | **dashed** | **rendered** | 16 / 9 |
| filled with `<img>` | true | false | none | none | 16 / 9 |
| filled + whitespace | true | false | none | none | 16 / 9 |

The whitespace row is the one that matters: that element reports **`:empty` = false** (whitespace is a text node) while `:has()` correctly keeps the placeholder on. Had the slot used `:empty` as the design's shape implies, **that placeholder would have silently vanished** — exactly the failure the plan predicted. Confirmed empirically rather than trusted.

Live insertion into the real file: stripes, dashed border and label all disappeared; the other two slots were unaffected; **no CSS or JS edit was required**. Reverted, with no trace left (`grep` for the test asset returns nothing).

## Curation — what I left out, and why

Per the autonomy brief, `profile.md` (~41KB) offers far more than the design's structure holds. Reporting the cuts so Sirio can steer:

**Selected Work — 3 plates (dispenser, gel electrophoresis, EndoSense).** Ordered by importance, not chronology. Not shown: the Strain Engineering/CFB project (`:105-120`) and the 50L/100L fermentation practicum — both strong wet-lab work, but both push the identity toward the bench and away from the design/automation centre PROJECT.md defines.

**Experience — 4 rows.** Cut: **SBE DTU Board Member** (`:183`), **Linguistic Mediator** (`:219`) and the **VUB Biotech Summer School** (`:145`). The mediator role has a genuinely relevant detail (he built an animated explainer video — design instinct), but four rows keeps the section tight per the locked "ship small" decision, and the current job + degree + iGEM + the publication's provenance are the four that carry the story.

**Publications — 1 row**, because there is exactly one. **No category was silently dropped.**

**Awards** (`:333-342`) have **no section at all** in the design — so the iGEM Gold Medal rides on its Experience row, and the BSc 110/110 cum laude, the DALSA 12/12 (visible instead as the plate's "Graded 12/12") and the martial-arts cups are **not on the page**. Flagging rather than inventing a section: if Sirio wants awards surfaced, that is a deliberate design addition, not something to improvise here.

## Task Commits

1. **Task 1: Mission + the `--accent` section system** — `23bc87d` (feat)
2. **Task 2: Selected Work — 3 curated plates + the MEDIA-01 media slot** — `70710c2` (feat)
3. **Task 3: Experience + Publications + Contact — every row traced** — `d0165f7` (feat)

## Files Created/Modified

- `site/index.html` — Mission, Work (3 plates), Experience (4 rows), Publications (1 row), Contact, footer. 322 lines, **zero inline styles**, zero `style-hover`.
- `site/styles.css` — the `.section` system + accent map, Mission/`.grad`/pills, plates, the media slot, exp/pub/contact/footer. **Zero reveal-attribute selectors.**
- `site/assets/media/README.md` — the MEDIA-01 contract: the exact one-line form for `<img>` and `<video>`, naming, formats, the 16/9 + `object-fit: cover` consequence, first-party/relative-path rule, and the locked **no stock or AI-generated imagery, ever** rule stated prominently. MEDIA-02 (encoding/sizing) explicitly left to Phase 4.
- `.planning/REQUIREMENTS.md` — 3 checkboxes + 3 traceability rows.

## Decisions Made

- **Contact's heading is an `h2`, not the design's `h3`.** The design puts a bare `h3` in a section with no `h2`, which is a heading-order defect for screen readers. Shipped as `h2.contact__title` with a size override — visually identical, outline correct. (Rule 2.)
- **`.contact__email:hover` and `.pill:hover` restate `color`.** The global `a:hover { color: #bcd9ff }` outranks a single class selector, so without restating it the accent-coloured links would repaint to blue on hover regardless of their section. Caught by reasoning about specificity, not by a gate.
- **Media-slot `transition` sits on the base rule, not the empty-state rule.** The plan placed it in `:not(:has(...))`; putting it in the base means a *filled* asset also eases on hover instead of snapping. Cosmetic, no gate affected.
- **`.plate + .plate` carries the wider margin** rather than the flip modifier — the design ties the larger gap to plate order, not to which side the media is on, and this keeps the two concerns separate.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocking] Four verification gates were self-invalidating: they grep the whole file, comments included**

- **Found during:** Tasks 1, 2 and 3 (four separate gate failures across three tasks).
- **Issue:** The gates assert forbidden strings are absent from `site/index.html` / `site/styles.css`. I had documented *why* each item was omitted by **quoting the forbidden string in a code comment** — so the gates fired on correct implementations. Specifically: `SECTOR JUMPS` and `[data-reveal]` (Task 1); `PLATE 00` (Task 2 — `grep -c` counts *lines*, and my three comments each contained it, giving 6 not 3) and `16/10` (a comment explaining that 16/10 is wrong); `Hardware Lead`, `Research Assistant`, `2022 — 2024` and `Part collection contribution` (Task 3 — a comment table documenting the design's fabrications).
- **Fix:** Reworded every comment to describe the omitted item without quoting it, and moved the verbatim corrections into this SUMMARY, which is where they belong. No code behaviour changed in any of the four cases.
- **Verification:** All three task gates exit 0.
- **Committed in:** `23bc87d`, `70710c2`, `d0165f7`
- **Lesson (this is the third plan running to hit this):** 01-02 hit the identical class twice (dotless-i `grep -c`, and `rel="noopener"` inside a comment). **A gate that greps a whole file cannot distinguish code from commentary** — so rationale that must name a forbidden string belongs in the SUMMARY, never in the file the gate scans.

---

**Total deviations:** 1 class, 4 instances — all Rule 3 (blocking gate defects, not implementation defects). No scope creep, no security impact, no behaviour change.

## Issues Encountered

- **Two false alarms during verification, both my test harness, not the code.** Worth recording so nobody re-chases them:
  1. **"The nav never docks."** Headless Chrome **does not fire native scroll events for programmatic `scrollTo`** (instrumented: `scrollEventsSeen = 0`). The handler must be driven explicitly. Also, `scroll-behavior: smooth` animates `scrollTo`, so short waits sample mid-flight — use `behavior: 'instant'`.
  2. **"The docked nav has no glass."** Under `--virtual-time-budget` the animation clock does not advance, so **transitioned** properties freeze at t=0 (the tell: `backdrop-filter: blur(0px)` — `.nav` declares no backdrop-filter at all, so `blur(0px)` can only be the start of an interpolation, never a resting value). Untransitioned properties from the same rule (`height: 70px`, `position: fixed`) applied instantly. Neutralising the transition produced the exact expected end state. **Nothing was changed to "fix" either.**
- No package installs, no dependencies added — `T-01-SC` stays empty by design.
- `favicon.ico` 404 persists (inherited from 01-02, out of scope).

## Corrections to the Written Record (for reconciliation at phase close)

These are **flagged, not edited** — STATE.md and `profile.md` are not this plan's to write.

- **D-2 — the media slot is `16/9`**, not STATE.md's "16:10". Verified by direct inspection: `V4:82` and `V4:94` both say `aspect-ratio:16/9`, and **a 16/10 ratio appears in no design file at all** (the `16/8` and `4/3` values in V4 belong to the deferred project-overlay pages, not the Work plates). The *decision* STATE.md records (one box serving image OR video; page structure independent of assets) is unaffected — only the ratio literal was wrong.
- **A7 — the iGEM medal is Gold.** `profile.md:339` (Awards table) and `:31` (CV guidelines) both say Gold; the "type TBC" at `profile.md:195` is a stale contradiction and **`profile.md:195` should be corrected**.
- **A8 — the liquid dispenser is 2026**, not the design's 2025 (thesis deadline Aug 2026; MSc runs to Sep 2026).
- **FOUND-04's wording vs the Phase 1/4 boundary** — see the flag above.
- **The pending todo `2026-06-17-hero-typewriter-rotating-role-animation` can be closed** — satisfied by the approved design and shipped in 01-02 (8 terms, per-term gradients, article logic, reduced-motion fallback, all already in the engine).

## Threat Flags

None. No new network endpoint, auth path, file access or schema.
- **T-01-07 (reverse tabnabbing):** upheld — `target="_blank"` count **4** equals `rel="noopener"` count **4**, non-zero, asserted by gate. The two links added here (iGEM wiki, EMBO DOI) both carry it.
- **T-01-09 (asset surface):** upheld — the README mandates first-party, committed files via relative `./assets/media/...` paths and explicitly forbids remote/hot-linked `src`.
- **T-01-10 (XSS):** upheld — all content is hand-authored static HTML; no `innerHTML`, no user input, engine untouched.
- **T-01-11 (shipping integrity):** upheld — `site/styles.css` contains **zero** reveal-attribute selectors, verified in-browser: all five sections compute `opacity: 1`, `visibility: visible`, `offsetHeight > 0`. The page is visible.
- **T-01-08 (`mailto:` harvesting):** accepted, as decided — the address is intentionally public.

## Known Stubs

**None that block the plan's goal.** The three media slots are *intentionally* empty — that is MEDIA-01's specified behaviour, not a stub: they render as labelled striped placeholders by design until Sirio has real assets, and the page is complete without them. Filling them requires no further engineering. No hardcoded empty values flow to the UI; no placeholder text ships.

## User Setup Required

None. To fill a media slot when assets exist, follow `site/assets/media/README.md` — drop the file in and paste one line.

## Next Phase Readiness

- **Phase 2 (MOTION-01)** inherits `data-reveal` attributes already in place on every section (`0`/`1`/`2` ordering ported as authored) and **no CSS consuming them** — implement `updateReveals()` and they light up. **Do not add a hiding rule before the JS exists.**
- **`applyPara()` now has real work:** 15 `[data-para]` elements ship (numerals `-0.07`, blobs `0.13`/`0.16`/`0.1`, media slots `0.05`). Its ±400px cull is the perf guard; it runs on scroll, not per frame.
- **Phase 4 (PROJ-01)** — recorded so it is not re-litigated: the V4 design *does* answer FOUND-04's multi-page question, with `position: fixed` `[data-proj]` overlay divs revealed by a warp transition (`openProj`/`applyTrans`/`drawWarp`, ~200 lines at `V4:181+` and `:394+`), **not** separate `.html` files. Phase 1 shipped persistent nav + single-scroll home only; the mechanism decision is Phase 4's to make with this precedent in hand. Plate 003's iGEM link is the only outbound on a plate.
- **Adding a section is now ~6 lines:** an `id`, `--accent`, and the `.section` furniture. Nothing else needs touching.

## Self-Check: PASSED

- All 3 modified/created files present on disk; all 3 commits resolve (`23bc87d`, `70710c2`, `d0165f7`).
- **All three task gates exit 0**, re-run after the comment rewordings (no regression).
- `min_lines`: index.html **322**/180. `contains`: `Contributing author` ✓, `:has(> img` ✓, `media-slot` in README ✓.
- `key_links`: `:not(:has(> img, > video))` ✓ (fixed-string), `2024.igem.wiki/DTU-Denmark` ✓, `10.1038/s44318-025-00567-1` ✓, `--accent` ✓.
- Counts: plates **3**, media slots **3**, exp rows **4**, pub rows **1**, `style-hover` **0**, reveal selectors in CSS **0**.
- **All 5 in-page anchors resolve** (`#index` `#work` `#experience` `#publications` `#contact`) — the inherited `#index` dangling anchor is closed. Every section lands at exactly **top = 70px**, clear of the nav.
- `grep -rn "app/" site/` → nothing. No `_Archive` reference. Zero inline `style="` in index.html.
- `--gold-glow` appears in the section CSS **only as comment prose** — never as a used value (`var(--gold-glow` count in section rules: 0).
- Live browser: page scrolls (docHeight 5119 > viewport), **no horizontal overflow**, `.hero` still `overflow: clip`, `.page` still `overflow-y: visible`.
- No test artifacts left behind; MEDIA-01 insertion fully reverted.
- `STATE.md` and `ROADMAP.md` deliberately **untouched** — the orchestrator owns those after merge.

*Not self-certified, by design:* the content **curation judgement** (what to include/cut) and the docked nav's **pop-vs-fade** feel. Both are Sirio's at the end-of-phase gate; the cuts are listed above so he can steer rather than having to discover them.

---
*Phase: 01-the-design-build*
*Status: COMPLETE — 3/3 tasks; FOUND-04 + NAV-02 + MEDIA-01 complete (all Phase 1 requirements now Complete); D-04 + D-01 inherited from 01-02 and both verified; 4 gate defects auto-fixed; FOUND-04 wording flagged for reconciliation*
