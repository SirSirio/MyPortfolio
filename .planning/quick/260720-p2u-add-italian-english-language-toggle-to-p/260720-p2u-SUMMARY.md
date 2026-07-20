---
quick_id: 260720-p2u
type: execute
subsystem: site (portfolio front-end)
status: awaiting-checkpoint          # Tasks 1-2 done; Task 3 = human-verify (Sirio approves Italian)
branch: worktree-agent-ab949affba7fb4a56   # per-agent worktree branch (base feat/i18n-language-toggle intent)
tags: [i18n, l10n, italian, accessibility, static-site, vanilla-js]
requires:
  - site/index.html (the single page, all copy)
  - site/star-engine.js (typewriter terms)
  - site/method.js (calculator strings)
provides:
  - site/i18n.js (STRINGS.{en,it}, TERMS.{en,it}, applyLang/getInitialLang/getLang/t/onLangChange)
  - nav EN/IT control + language-aware re-rendering of the two dynamic surfaces
affects:
  - every user-visible string on the landing page and the OT-2 deep-dive
tech-stack:
  added: []                          # zero dependencies — hand-rolled leaf ES module
  patterns:
    - "leaf i18n module: author-controlled literal dictionary, data-i18n / -rich / -attr annotations"
    - "textContent for plain text; innerHTML only for author-written inline markup; attr-map for aria/alt/data-label"
    - "subscriber registry (onLangChange) re-renders the typewriter + calculator live on switch"
key-files:
  created:
    - site/i18n.js
  modified:
    - site/index.html
    - site/styles.css
    - site/main.js
    - site/star-engine.js
    - site/method.js
decisions:
  - "Dictionary keys are dot-namespaced and semantic; STRINGS.en mirrors shipped English exactly so EN renders byte-identical."
  - "Italian mirrors English punctuation (em-dashes, ·, &amp;) so both languages lay out identically (no em-dash 'fix')."
  - "Article prefix uses U+00A0 (non-breaking space) for both languages, matching the engine's original English treatment."
  - "aria-labels and content-bearing alt texts are translated too (fuller than the plan's minimum) for a genuinely bilingual site."
metrics:
  tasks_completed: 2                  # of 3 (Task 3 is a human-verify checkpoint)
  files_changed: 6
  i18n_keys: 153                      # en/it parity, identical key sets
  terms: 8                            # typewriter roles per language
  completed: 2026-07-20
---

# Quick 260720-p2u: Italian / English Language Toggle Summary

A dependency-free EN/IT language toggle: a hand-rolled `site/i18n.js` dictionary (153 keys, en/it parity) drives a nav control that switches the entire portfolio — landing page, OT-2 deep-dive, SVG labels, corner mark, scroll hint and title — with `localStorage` persistence, a browser-language default, and live re-rendering of the hero typewriter and the method calculator. The wordmark and the hero star engine are behaviourally unchanged.

## What was built

**Task 1 — engine, control, wiring, full landing-page translation** (commit `1ab46ac`)
- `site/i18n.js` (NEW, leaf ES module, imports nothing): `LANGS`, `STRINGS.{en,it}`, `TERMS.{en,it}`, `getLang`, `getInitialLang`, `t`, `onLangChange`, `applyLang`. `applyLang` handles the textContent / innerHTML / attribute-map branches, sets `document.documentElement.lang`, retitles the document, persists to `localStorage` (clamped to `LANGS`), and notifies subscribers. `getInitialLang` = stored choice → `navigator.language` (`it*` → Italian) → English.
- Nav EN/IT control (`<button>`s with `aria-pressed`) inside `.nav__links`; `styles.css` `.nav__lang` / `.nav__lang-btn` reuse the mono nav tokens (Space Mono 12px, 0.1em, dark-only, one line, hairline divider).
- The whole landing page annotated with `data-i18n` / `data-i18n-rich` / `data-i18n-attr`: hero intro + type lead, mission label + line + the four pills, origin (label/h2/three beats), the three work plates (meta/title/body + media labels + aria/alt), experience (four rows, `Present → Presente`), publications role, the method manifesto (five stanzas) + both tracks (kinds/for/titles/phase names + descs/notes/doc-rail/feet/deck link) + evidence, contact, footer, corner mark, scroll hint.
- `star-engine.js`: `HeroStar.setLang(list)` rebuilds `this.terms` from the dictionary (text-only, article prefix preserved as U+00A0) and re-seeds the type cycle — **no** change to `periodMs`, `t0`, breath math, or the `b < 0.30` / `b >= 0.45` planet thresholds.
- `main.js boot()`: registers the typewriter subscriber, wires the toggle (with `syncLangButtons`), then `applyLang(getInitialLang())` once — placed before the reduced-motion return so Italian ships under reduced motion too.
- `method.js`: the calculator's dynamic strings are now `t('calc.*')`; an `onLangChange` subscriber re-labels the resolved calc end-state live without restarting the ~20s sequence.

**Task 2 — OT-2 deep-dive translation** (commit `cb8f1d4`)
- 49 deep-dive keys added (parity 104 → 153): both back links, masthead (eyebrow/lede/meta/caption; title reuses `work.plate2.title`, video aria reuses `work.plate2.videoAria`), sections 01–04 prose and headings, the Double Diamond SVG (`aria-label`, the two frames, the four diverge/converge cues, the four phase descriptors, the figcaption), the build lists, the three stat labels (numbers kept), and the content-bearing image alts.
- SVG `<text>` nodes translate via `textContent` like any other `data-i18n` element.

## Verification

- **Key parity gate** (Task 1 & 2): `STRINGS.en` and `STRINGS.it` key sets identical — 153 keys.
- **Markup-scan gate** (Task 2): every `data-i18n` / `-rich` / `-attr` key present in `index.html` resolves in both languages (153 annotated attributes).
- **Wordmark + engine gate**: exactly two `&#305;` dotless i's, `class="wordmark"` present with NO `data-i18n*` on it; `periodSec: 5` (main.js) and `b < 0.30` / `b >= 0.45` (star-engine.js) unchanged.
- **Syntax**: `node --check` passes for all four modules.
- **`applyLang` simulation** (stubbed DOM): `getInitialLang()` returns `it` for an `it-IT` browser; `applyLang('it')` flips `<html lang>`, the title, textContent, innerHTML (span.grad preserved) and the video `aria-label`, and persists `sirio-lang=it`; `applyLang('en')` reverts; a tampered stored value clamps to the browser default; the Italian article prefix is a real U+00A0 (charcode 160).

## Proper-nouns policy applied

Kept: Sirio, DTU, AGC Biologics, iGEM, EndoSense, Opentrons OT-2, DALSA, Fusion360, Arduino, GSD, RunOne™ MultiCaster, The EMBO Journal citation, the Double Diamond phase names (Discover/Define/Develop/Deliver), all URLs/email, and the numbers 144 / ~10 min / 12/12. Translated: Copenhagen → Copenaghen; the descriptive project titles; diverge/converge → divergi/convergi; Present → Presente.

## Deviations from Plan

Executed essentially as written. Two judgment calls, both additive and within the plan's discretion:

1. **[Rule 2 — completeness] Translated aria-labels and content-bearing alt texts.** The plan's minimum listed the visible strings + a couple of aria/alt attributes; I annotated all content-bearing aria-labels (article, videos, SVG diagram) and image alts so an Italian screen-reader user hears Italian throughout. Adds keys in parity; no gate impact. Files: `site/index.html`, `site/i18n.js`.
2. **[Rule 3 — blocking] CRLF + U+00A0 handling.** The repo's `site/*.js` use CRLF line endings, and the typewriter article prefix is a non-breaking space (U+00A0), not a regular space. The `star-engine.js` refactor and the `i18n.js` normalisation were applied via a small Python pass so the nbsp prefix is preserved byte-for-byte (EN stays identical) and `i18n.js` was normalised to CRLF to match the repo. No behaviour change.

No architectural changes; no auth gates; no package installs.

## Task 3 — CHECKPOINT (human-verify) — NOT satisfied by the executor

Per the task constraints, Task 3 is a `checkpoint:human-verify` and was **intentionally left for the orchestrator / Sirio**. It requires a human to render the live site in both languages and approve the Italian wording + the control's look. Suggested verification (from the plan):

1. Serve the site (`preview.bat`, or `python -m http.server` / `npx serve site`) and open it.
2. Confirm the EN/IT control sits on one line in the nav, styled like CV / LinkedIn, active state legible. Click **IT** — the whole page (nav pills, hero intro + "Sono …" typewriter with correct Italian articles, every landing section, and the OT-2 deep-dive incl. the Double Diamond labels) switches to Italian. Click **EN** — everything returns.
3. Watch one hero-star breath and one calculator play-through: star tempo/breath/planet motion identical to before; the calculator's final line reads in the selected language.
4. Reload — the last-chosen language persists. With browser language set to Italian and no stored choice, it defaults to Italian; any other language defaults to English.
5. **Read the Italian copy for accuracy and tone** — especially the typewriter role words, the "Come sono arrivato qui" beats, the project descriptions, and the OT-2 deep-dive. Flag anything to reword.
6. Confirm the wordmark still reads "Sirio" with its two orbiting i-dots.

Resume signal: Sirio types "approved", or lists the Italian strings / control tweaks to fix.

## Known Stubs

None. Every annotated key has both an English and an Italian value (153/153 parity); no placeholder or empty translation ships.

## Self-Check: PASSED

- `site/i18n.js` exists (created) — FOUND.
- Modified files present: `site/index.html`, `site/styles.css`, `site/main.js`, `site/star-engine.js`, `site/method.js` — FOUND.
- Commit `1ab46ac` (Task 1) — FOUND in git log.
- Commit `cb8f1d4` (Task 2) — FOUND in git log.
- en/it key parity (153) and markup-key resolution — PASS.
- Wordmark (two U+0131, no data-i18n) + engine thresholds — INTACT.
