---
phase: 02-the-story
reviewed: 2026-07-17T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - site/index.html
  - site/styles.css
  - site/main.js
  - site/method.js
  - site/star-engine.js
findings:
  critical: 0
  warning: 5
  info: 4
  total: 9
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-07-17T00:00:00Z
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Reviewed the full Phase 2 source set: `index.html` (content + markup contract), `styles.css`
(tokens, section system, reveal vocabulary), and the three JS modules that share the single
rAF loop (`main.js`), the timer-driven METHOD choreography (`method.js`), and the hero engine
(`star-engine.js`).

No security issues were found: all outbound `target="_blank"` anchors correctly pair
`rel="noopener"` (nav, plate link, publication link, deck link, contact links), there is no
`innerHTML`/`eval`/dynamic markup injection anywhere — every dynamic text write in
`method.js` and `star-engine.js` goes through `textContent`, and no secrets or hardcoded
credentials are present. The `data-rev-state` / `data-ph-state` / `data-arc-state` /
`data-rail-state` "hiding is only ever keyed on a JS-created attribute" invariant that the
codebase repeatedly documents holds up under inspection — no CSS rule in `styles.css` hides a
reveal element by any other selector.

The defects found are concentrated in two places: (1) the reduced-motion story is *inconsistently*
applied — the hero engine, typewriter and pointer-drift are all correctly gated behind `REDUCED`,
but scroll-driven parallax and the autoplaying background video are not; and (2) a couple of
latent edge-case bugs in the hand-tuned orbit/timer machinery that don't currently manifest
under normal use but contradict the code's own stated invariants. No critical/blocker-severity
issues were found.

## Warnings

### WR-01: Scroll-driven parallax is not gated behind `REDUCED`

**File:** `site/main.js:104-119, 210-214, 227-236`
**Issue:** Every other continuous-motion system in this codebase explicitly checks `REDUCED`
before running (the hero rAF loop is replaced by a single `renderStatic()` call, the typewriter
skips straight to a static term, and pointer drift is gated by `POINTER_OK = !REDUCED && ...`).
`applyPara()`, however, is wired to the `'scroll'` listener unconditionally in `boot()`
(`window.addEventListener('scroll', onScroll, ...)` is registered before the `if (REDUCED)`
branch), so `[data-para]` elements (section blobs, sector numerals, plate media) keep
translating continuously with scroll position for reduced-motion users. This is inconsistent
with the rest of the file's careful `REDUCED` handling and is exactly the kind of scroll-linked
positional motion `prefers-reduced-motion` users expect suppressed.
**Fix:** Gate the transform write, not the listener registration (keep listening so `syncNav()`
still works):
```js
function applyPara() {
  if (REDUCED) return;
  const vh = window.innerHeight;
  for (const el of paraEls) { /* ... */ }
}
```

### WR-02: Autoplaying/looping video has no reduced-motion or pause affordance

**File:** `site/index.html:222-225`
**Issue:** `<video src="./assets/media/ot2-timelapse.mp4" ... muted loop playsinline autoplay>`
has no `controls` attribute, and neither `main.js` nor `method.js` ever pauses it for
`REDUCED` users (confirmed: no selector in either script targets this element). The clip loops
indefinitely with no way for a visitor to stop it, which is inconsistent with the rest of the
page's motion handling and risks failing WCAG 2.2.2 (Pause, Stop, Hide) for auto-playing content
that runs longer than 5 seconds.
**Fix:**
```js
// in main.js boot(), or a small dedicated init:
const ot2Video = document.querySelector('.media-slot--composite video');
if (ot2Video && REDUCED) {
  ot2Video.removeAttribute('autoplay');
  ot2Video.pause();
  ot2Video.currentTime = 0;
}
```

### WR-03: `nearIdx` is recomputed every frame independent of the orbit's captured assignment

**File:** `site/star-engine.js:250-313` (specifically lines 256, 274-275, 281)
**Issue:** `nearIdx` is derived fresh on every `_draw()` call from the current home-to-center
distances (`dn[0] <= dn[1] ? 0 : 1`). But `this.planets[i]`'s eccentricity/tilt parameters are
fixed once, at orbit launch (`this.planets[nearIdx] = mk(nearIdx, 0.34, -1, ...)`), using
whichever `nearIdx` was current at that instant. The per-frame render loop then picks the DOM
element via the **current** `nearIdx` (`const el = (i === nearIdx) ? this.planetNear :
this.planetFar;`) while `pl = this.planets[i]` still holds parameters computed for the
**launch-time** `nearIdx`. If a window resize flips which i-dot is nearer to the star mid-orbit
(plausible across the 860px breakpoint, where the wordmark's font-size and letter-spacing
change), the tilted-ellipse parameters (`k=0.34`, depth-based scale/opacity/z-index) can be
applied to the visually-far dot instead of the near one until the orbit completes.
**Fix:** Snapshot `nearIdx` into the orbit state at launch and use that snapshot for element
assignment during the run, e.g. store `orbitNearIdx` alongside `orbitStart` and use it (not the
per-frame `nearIdx`) inside the render loop while `this.orbiting` is true.

### WR-04: Untracked nested `setTimeout` violates the module's own timer-hygiene contract

**File:** `site/method.js:87-95`
**Issue:** The file's own comment states the invariant plainly: "every setTimeout handle is
tracked so a run can clear the lot before it starts" (method.js:48-50), and `playCalc()`
dutifully pushes every scheduled callback into `timers` — except the inner un-press timeout:
```js
timers.push(setTimeout(() => {
  const k = keys.find((x) => x.textContent === d);
  if (k) {
    k.classList.add('key--press');
    setTimeout(() => k.classList.remove('key--press'), 130); // <- not tracked
  }
  ...
}, 900 + i * D.keyStep));
```
This is harmless today only because the external `played` guard in `initMethod()` prevents
`playCalc()` from ever being invoked twice. If that guard is ever relaxed or removed, a second
run's `timers.forEach(clearTimeout)` at the top of `playCalc()` would not clear these inner
timers, leaving stray `key--press` class removals from a prior run firing mid-way through a new
sequence.
**Fix:** Push the inner timeout into `timers` too:
```js
if (k) {
  k.classList.add('key--press');
  timers.push(setTimeout(() => k.classList.remove('key--press'), 130));
}
```

### WR-05: No resilience around the `boot()` promise chain / `initReveals()`

**File:** `site/main.js:227-259` (see also `initReveals()` at 137-156)
**Issue:** `document.fonts.ready.then(boot)` has no `.catch()`, and nothing wraps the
per-element loop in `initReveals()`. The codebase's own documented guarantee is "if this module
fails to load nothing is ever hidden" (main.js:132-133) — but that guarantee only holds for a
failure *before* any element is marked hidden. `initReveals()`'s loop (main.js:151-155) sets
`el.dataset.revState = 'hidden'` and then calls `io.observe(el)` for each element in the same
pass; if a future edit causes an exception partway through that loop (e.g. a selector that no
longer resolves, a null dereference elsewhere in `boot()` invoked earlier in the same function),
elements already marked `hidden` before the throw would never get their observer attached and
would remain permanently invisible — precisely the failure mode the surrounding comments say the
design defends against.
**Fix:** At minimum, add a `.catch()` that force-shows all reveal elements as a fail-safe:
```js
document.fonts.ready.then(boot).catch(() => {
  for (const el of revealEls) el.dataset.revState = 'shown';
});
```

## Info

### IN-01: Empty catch block with no comment on what it guards

**File:** `site/star-engine.js:150`
**Issue:** `catch (e) {}` silently swallows any error from the font-metrics measurement path.
It's a reasonable feature-detection fallback (older browsers lacking
`TextMetrics.fontBoundingBoxAscent/Descent`), but the empty block gives the next contributor no
signal about what's expected to throw versus what might be a real bug being masked.
**Fix:** `catch (e) { /* fontBoundingBox* unsupported — fall back to the estimates above */ }`

### IN-02: `data-jump` / `data-scrollhint` attributes have no JS consumer

**File:** `site/index.html:110, 134-137`
**Issue:** Neither `main.js` nor `method.js` reads `[data-jump]` or `[data-scrollhint]`
anywhere (confirmed via search). They appear to be reserved hooks for the design's "warp burst"
sector-jump animation, which the section comment at index.html:138-140 says is deliberately
deferred to a later phase. Not a defect, but worth flagging so an unused attribute isn't later
mistaken for a wiring bug.
**Fix:** None required now; consider a one-line comment near the attributes noting they're
inert until the warp-burst phase lands (mirrors the pattern already used elsewhere in this file).

### IN-03: Decorative canvases have no explicit `aria-hidden`

**File:** `site/index.html:19, 40`
**Issue:** `.deep` and `.hero__canvas` carry only visual content with no text alternative.
Default canvas accessibility semantics generally exclude them from the accessibility tree when
they have no fallback content, but explicitly marking them `aria-hidden="true"` removes any
ambiguity rather than relying on that default.
**Fix:** `<canvas data-deep class="deep" aria-hidden="true"></canvas>` and
`<canvas class="hero__canvas" aria-hidden="true"></canvas>`.

### IN-04: Equal-specificity CSS rules rely on source order, not an explicit override

**File:** `site/styles.css:863-869`
**Issue:** `.narr > span { line-height: 1.62; }` and `.narr--land > span { line-height: 1.45; }`
both resolve to specificity (0,1,1). `.narr--land > span` only wins today because it is declared
later in the file. Correct as shipped, but if these two rules are ever reordered (e.g. during a
future refactor of the narrative-type section), the landing beats would silently revert to the
1.62 leading with no build error or warning to catch it.
**Fix:** Bump `.narr--land > span` to an unambiguous higher specificity, e.g.
`.narr--land > span, p.narr--land > span { line-height: 1.45; }`, or add a comment pinning the
order requirement directly above both rules.

---

_Reviewed: 2026-07-17T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
