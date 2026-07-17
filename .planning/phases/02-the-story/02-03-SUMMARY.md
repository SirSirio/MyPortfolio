---
phase: 02-the-story
plan: 03
subsystem: content
tags: [content, method, motion, calculator, css, accessibility, module]
requires:
  - "site/index.html #publications + #contact shells and #origin interlude (Phase 1 + Plan 02-02)"
  - "initReveals() + data-rev-state / data-reveal-kind (draw/snap/assemble) vocabulary (Plan 02-01)"
  - ".section--full floor + .narr / .narr--land narrative type + #origin/#method 220ms stagger (Plan 02-02)"
  - "REDUCED export from site/star-engine.js (Phase 1) — the single reduced-motion source of truth"
provides:
  - "#method — the unnumbered indigo/cyan METHOD interlude (CONT-03 Act 1): manifesto + calculator"
  - "--star-rigel indigo/cyan accent token + #method accent map entry"
  - "site/method.js — initMethod() + playCalc(), the timer-driven calculator choreography"
  - "the D timing object (locked calculator pacing) as one editable constant"
  - ".method__act / .calc-wrap layout; .calc / .calc__screen / .calc__ghost / .calc__out(+--resolved); .key / .key--op / .key--press; .ph__em"
affects:
  - "site/index.html (#method inserted between Publications and Contact)"
  - "site/styles.css (:root token, accent map, blob modifier, METHOD layout + calculator CSS)"
  - "site/main.js (one import + one guarded initMethod() call in boot())"
  - "Plan 02-04 extends site/method.js (Act 2 tracks) and MUST reuse this module, the BEM key classes, and #calc-keys styling"
tech-stack:
  added: []
  patterns:
    - "section choreography lives in its OWN ES module (method.js) imported by main.js — never a second <script src> (only one module tag ships) and never inside main.js (which owns the cosmic engine + the single rAF loop)"
    - "timer-driven reveal: setTimeout choreography + IntersectionObserver trigger, no rAF loop, no forced layout reads"
    - "all animation timings in one top-of-module constant (D) so re-pacing is a numbers-only edit"
    - "sketch bare state classes converted to BEM modifiers to match the live site (.key--press / .key--op / .calc__out--resolved)"
key-files:
  created:
    - "site/method.js — initMethod(), playCalc(), the locked D timing object"
  modified:
    - "site/index.html — #method section (manifesto + calculator)"
    - "site/styles.css — --star-rigel, #method accent, .section__blob--method, METHOD layout + calculator CSS"
    - "site/main.js — import { initMethod }; initMethod() in boot() after initReveals()"
decisions:
  - "method.js is a first-party ES module imported by main.js (not a second script tag, not folded into main.js) — the open planner decision, now closed for plan 04"
  - "the 4x4 keypad grid is styled off #calc-keys (its required id), not a .keys class, because any class beginning 'key' inflates the grep -c 'class=\"key' = 16 gate"
  - "four operator keys carry .key--op (÷ × − +); '=' is a plain .key (the sketch marked it .op too — dropped to hold the gate's count of 4)"
  - "REDUCED branch resolves the calculator to MAP → STRATEGY → EXECUTE / THE DIRECTION IS MINE and never attaches an observer (C-5)"
metrics:
  duration: "~45 min"
  completed: "2026-07-17"
  tasks: 3
  files_changed: 4
---

# Phase 2 Plan 03: METHOD — Manifesto + Calculator Summary

Shipped the first act of CONT-03: a full-height, indigo/cyan **METHOD** interlude
that opens on Sirio's childhood-calculator story, carries D-15's five-stanza
manifesto verbatim, and stands a themed calculator beside it that mashes
meaningless numbers before resolving to *map → strategy → execute* and *the
direction is still mine* — driven by a new `site/method.js` module on one
editable timing object, imported by `main.js` with no second script tag, no
second rAF loop, and no Latin anywhere on the page.

## What Shipped

- **`#method` in `site/index.html`** — a new `.section.section--full` inserted
  between `#publications` and `#contact` (D-01's locked order). Unnumbered
  interlude (D-02): no sector numeral, no Mission-pill entry, a `// METHOD`
  interlude label. `.section__head` (label + drawn rule), an `assemble` h2
  ("How I work with AI", the sketch's text verbatim, no size override), then one
  `.method__act--story` holding a `.calc-wrap` of the calculator + the
  `.manifesto`. Five `<p>` stanzas, `data-reveal` 1–5, each `assemble` with a
  `<span>`; stanzas 4–5 carry `narr--land`; the closing emphasis is
  `<em class="ph__em">`, never an inline style.
- **`site/method.js` (new)** — `initMethod()` (the single export) + `playCalc()`.
  The `D` timing object sits at the top as one constant. `initMethod()` early-
  returns without `#method`; under `REDUCED` it calls `playCalc()` immediately and
  attaches **no** observer; otherwise it observes `.calc` at `{ threshold: 0.18 }`
  and plays once (guard + `io.disconnect()`). `playCalc()` clears tracked timers,
  runs the reduced branch first, then Beat 1 (key mash) → Beat 2 (the meaningless
  `21.29268`, held `mashPause`) → Beat 3 (the order stacks one line per
  `lineHold`) → the final line. `textContent` throughout.
- **`--star-rigel: 96, 214, 255`** (indigo/cyan) added to the `:root` stops beside
  `--star-zuben`, with a comment that — like Zuben — it is a section accent only
  and must never join `PAL`. `#method { --accent: var(--star-rigel) }` added to
  the accent map (gate G-4). `star-engine.js` untouched (`git diff --quiet` clean).
- **CSS** — `.section__blob--method` (right/mid glow), `.method__act` (macro
  clamp rhythm), `.calc-wrap` (2-col grid, collapses to 1-col at 860px),
  `.manifesto` (24px stanza gap, reuses `.narr`/`.narr--land`), `.ph__em`, and the
  calculator: `.calc` (glass surface from live tokens, size-variant folded in),
  `.calc__screen/__ghost/__out`, `.calc__out--resolved` (sketch bug 3 fix),
  `#calc-keys` grid, `.key/.key--op/.key--press` with enumerated transitions.
- **`site/main.js`** — `import { initMethod } from './method.js';` beside the
  star-engine import, and a guarded `initMethod()` call in `boot()` after
  `initReveals()`. `loop()` and `onScroll()` byte-identical; `getBoundingClientRect`
  count still 3 (gate G-5).

## Tasks

| Task | Name | Commit |
| ---- | ---- | ------ |
| 1 | #method interlude + five-stanza manifesto (token, accent, layout) | c34523e |
| 2 | The calculator object — markup + CSS | 3006aef |
| 3 | The calculator plays — method.js, locked timings, reduced branch | 99080aa |

## Required Records (from plan `<output>`)

### The module-placement decision (the open planner call, now closed)

`site/method.js` is a **first-party ES module imported by `main.js`** — not folded
into `main.js`, not given its own `<script src>`. Rationale, recorded so plan 04
does not re-litigate it:
- `main.js`'s own header contract says it owns the cosmic engine, palette, tempo,
  deep field and the **one** rAF loop. METHOD's calculator is section
  choreography, not engine work, so it earns its own module.
- `index.html` ships **exactly one** `<script type="module">` and gate G-6 forbids
  a second `<script src>` — so the module is reached by an `import`, never a tag.
- `method.js` imports `REDUCED` **directly from `./star-engine.js`** (the single
  source of truth, D-36), not re-exported through `main.js`.
- **Plan 04 extends this same module** (`playTrack()` / `initArc()` for Act 2) and
  must add to `method.js`, not create a new module or script tag.

### The manifesto, word-for-word against D-15

All five stanzas match D-15's approved draft verbatim (the only typographic
substitution is `&mdash;` for the em dash in stanza 2, matching the ORIGIN
convention):

| # | Stanza (shipped) | D-15 | Match |
| - | ---------------- | ---- | ----- |
| 1 | "I was ten, and I hated long division. The calculator could just do it." | same | ✓ |
| 2 | "My teacher said I could use it — but only if I already knew what I was asking it. Otherwise it wouldn't help me." | same | ✓ |
| 3 | "I ignored her, and spent a year typing numbers until they matched the answers in the back of the book. I understood nothing." | same | ✓ |
| 4 | "So I learned the order: map the problem, choose the strategy, then let the tool execute. Never the reverse." | same | ✓ |
| 5 | "Same bottleneck, one layer up. AI is the biggest calculator I've been handed. The direction is still mine." | same | ✓ |

No deviation. **D-14** holds: stanza 2 is the *rephrased* teacher's line (the
method — map/strategise/execute), not `profile.md:373`'s original virtue framing.
**D-13** holds: the Latin phrase in `profile.md:373` appears **nowhere**
(`grep -ciE '\bego\b|grano|salis'` = 0), despite `profile.md:373`, `PROJECT.md:48`
and `CLAUDE.md` all still naming it — its absence is deliberate.

### `--star-rigel` shipped value + the unseen-on-render caveat (OI-1)

Shipped `--star-rigel: 96, 214, 255` (the sketch's D-03 proposal, Claude's call
per D-03). **Sirio has NOT yet seen either new stop (`--star-zuben` from plan 02,
`--star-rigel` here) on a render.** UI-SPEC **OI-1** specifically flags the
**rigel → sirius adjacency at Contact** (Contact re-uses `--star-sirius`
150,196,255, immediately below METHOD's rigel) as the closest colour pairing on
the page. Rigel is markedly more cyan and saturated, so it *should* read as a
distinct colour — but this is the one pairing to confirm on a browser render.

### The BEM conversion of the sketch's state classes

For plan 04 to follow the same convention: the sketch's bare state classes became
BEM modifiers matching the live site's idiom (`.nav--docked`, `.plate--flip`,
`.section__numeral--right`):
- sketch `press` → **`.key--press`**
- sketch `op` → **`.key--op`**
- sketch `resolved` → **`.calc__out--resolved`**

### Measured calculator-sequence duration + Sirio's pacing steer

Computed from the locked `D` object, the final line (`THE DIRECTION IS MINE`)
lands **~19.3 s** after `playCalc()` begins (mash last key ~3.5s; meaningless
answer held 3.4s from ~4.1s; order lines at ~8.7 / 11.3 / 13.9s; final ~19.3s).
This matches the sketch's ~21s design intent (the sketch's figure folds in the
~1.5–2s reveal lead-in). **Sirio's steer is documented, not resolved:** he could
not read the first cut (~7s), which was roughly tripled to this pacing; the
`--rev-stagger` and `D` comments both say to **treat the current values as a
floor** and expect him to want it slower still, not faster. Re-pacing stays a
numbers-only edit on the `D` object — confirm on a render.

## Deviations from Plan

### Adjustments (to satisfy the plan's own verification gates)

**1. [Rule 3 — Blocking] Keypad grid styled off `#calc-keys`, not a `.keys` class**
- **Found during:** Task 2.
- **Issue:** the plan prose names "the `.keys` grid", but the plan's own gate
  `grep -c 'class="key' site/index.html` = 16 counts every line whose `class`
  attribute starts with `key` — a `class="keys"` container line would match too,
  pushing the count to 17 with the 16 keys each on their own line.
- **Fix:** the container keeps its **required** `id="calc-keys"` and carries no
  colliding class; the grid rule is `#calc-keys { display:grid; … }`. All Task 2
  acceptance criteria (the id exists, 16 `.key` children, 4 `.key--op`) still hold.
- **Files:** `site/index.html`, `site/styles.css`. **Commit:** 3006aef.

**2. [Rule 3 — Blocking] `=` left a plain `.key` (4 operator keys, not 5)**
- **Found during:** Task 2.
- **Issue:** the sketch marked `=` with `.op` as well (5 op keys); the plan's
  action says "the **four** operator keys" and the gate requires `key--op` = 4.
- **Fix:** `.key--op` on ÷ × − + only; `=` is a plain `.key`. Matches the gate and
  the plan's explicit "four operator keys" wording.
- **Files:** `site/index.html`. **Commit:** 3006aef.

**3. [Rule 1 — Correctness] Reworded comments that tripped literal-string gates**
- **Found during:** Tasks 1–3.
- **Issue:** several gates are literal greps (`How I work with AI`, `transition: all`,
  `innerHTML`, `getBoundingClientRect`, `requestAnimationFrame`, `matchMedia`,
  bare `.press`/`.op`/`.resolved`). My explanatory comments quoted those exact
  tokens, inflating the counts.
- **Fix:** reworded the comments to describe the constraint without the banned
  literal (e.g. "never the `all` keyword", "write raw markup into the DOM", "no
  forced layout read"). No functional change; the code obeys every rule.
- **Files:** `site/index.html`, `site/styles.css`, `site/method.js`.

### Verification-harness note (no code change)

The plan's automated gate runs `node --check site/method.js`. As Plan 02-01
recorded, `node --check` defaults to **CommonJS** for a `.js` file with no
`package.json` (gate G-6 forbids a `package.json`), so it rejects the ES-module
`import`. Syntax was instead validated with `node --check --input-type=module <
site/method.js` (and `main.js`), both clean. Harness quirk, not a code issue.

## Known Stubs

None. The manifesto is fully authored static content; the calculator is a real
themed object wired to a working timer sequence. The calculator ships
**intentionally static in the DOM** (`0` / `&nbsp;`) and is animated at runtime by
`method.js` — that is the designed initial state (and the JS-off / reduced end
state), not an unwired stub.

## Threat Flags

None beyond the plan's `<threat_model>`. `method.js` writes only `textContent`
(T-02-10 mitigated, `grep -c 'innerHTML'` = 0); no inline handler or inline style
reached the page (T-02-11, `onclick` = 0, `style="` = 0); zero packages / one
script tag (T-02-12, `<script>` = 1); no rAF loop / no rect reads / `loop()` and
`onScroll()` untouched (T-02-13); the forbidden runtime-class reveal pattern is
absent (T-02-14, the `body.js` grep = 0). No new endpoints, inputs, or
trust-boundary surface.

## Verification Gates

- **G-1 (JS disabled):** structural — every `#method` element renders unless
  `data-rev-state` (JS-created) hides it; the calculator ships static showing `0`.
  All five stanzas readable. Human browser check deferred to end-of-phase.
- **G-2 (greps clean):** `grep -c '\[data-reveal\]' site/styles.css` = 0;
  `grep -rn 'body\.js' site/` = 0. PASS.
- **G-3 (reduced motion):** `playCalc()`'s `REDUCED` branch (first, before any
  timer) resolves to `MAP → STRATEGY → EXECUTE` / `THE DIRECTION IS MINE` and
  `initMethod()` attaches no observer. Human check deferred.
- **G-4 (accent resolves):** `#method { --accent: var(--star-rigel) }` present;
  `--star-rigel` defined in `:root`. Computed-style check deferred to a render.
- **G-5 (no loop reads):** `getBoundingClientRect` in `main.js` = 3 (unchanged),
  in `method.js` = 0; `loop()` / `onScroll()` byte-identical. PASS.
- **G-6 (zero dependencies):** no `site/package.json`; `<script` in `index.html` = 1. PASS.
- **G-8 (no banned phrasing):** `grep -ciE '\bego\b|grano|salis' site/index.html` = 0. PASS.

Not reachable this plan: G-7 (no new outbound links here — plan 04), G-9/G-10 (plan 04).

## Self-Check: PASSED

- FOUND: site/method.js (created), site/index.html / site/styles.css / site/main.js (modified)
- FOUND commits: c34523e, 3006aef, 99080aa
- star-engine.js byte-identical to base (git diff --quiet clean)
