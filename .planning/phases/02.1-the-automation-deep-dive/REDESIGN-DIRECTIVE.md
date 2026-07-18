# OT-2 deep-dive — redesign directive (Sirio steer, 2026-07-18)

**Origin:** At the Wave-2 render checkpoint, Sirio's verdict on the OT-2 deep-dive was
*not approved*: "a different theme vs the landing I can tolerate, but too plain... make it
less plain, some more animations, more dynamic, but not too far from the actual UI style of
the landing page." He is away and explicitly said: **do NOT ask questions — use the design
skills + best judgement.** This directive resolves 02.1-02 Task 3 (the render steer) AND
supersedes/absorbs 02.1-03 (the GSAP motion plan) into one coherent redesign pass.

This is a **REDESIGN-PRESERVE** (design-taste-frontend §11): keep all copy and all media,
keep the engineering-room cyan identity (D-27), but lift the overlay to the landing page's
richness and add motivated motion. **Do not rewrite the case-study prose** — it is fact-
checked against profile.md + the DALSA report. This is a visual + motion overhaul.

Design read: *project deep-dive for recruiters, in the site's "engineered bioluminescence"
cosmic-dark language, native CSS + Canvas engine + GSAP. Dials VARIANCE 8 / MOTION 7 /
DENSITY 4 (match landing, +1 motion).*

---

## ROOT CAUSE (why it reads plain / off-theme)

The overlay **reinvented weaker chrome** (`.dd-sec__n` tiny numbers, `.dd-sec__kicker`,
flat uniform cyan grid) instead of reusing the landing page's OWN rich section system.
The landing's primitives already exist in `site/styles.css` and are the whole fix:

- `.section__numeral` (+ `--left`/`--right`) — the giant ghost outline sector numeral
  (`-webkit-text-stroke: 1px rgba(var(--accent),0.22)`, `clamp(170px,27vw,400px)`), styles.css:669.
- `.section__blob` (+ positional modifiers) — big soft radial `--accent` glow, styles.css:689.
- `.section__head` / `.section__label` / `.section__label--intro` / `.section__rule` — the mono
  accent label + draw-on gradient rule, styles.css:708-743.
- `.section h2` — 300-weight `clamp(40px,6vw,86px)` display headline, styles.css:745.
- Section owns `--accent`; the overlay already sets `--accent: var(--star-rigel)` cyan (styles.css:637).

**The overlay must adopt these components** (scoped under `[data-proj="ot2"]`) so it reads as
the same site, just in the cyan engineering-room register instead of a per-section star colour.

---

## WHAT TO BUILD

### A. Atmosphere / depth (kills the "flat grid" feeling) — CSS
Replace the flat uniform blueprint grid with LANDING-STYLE layered depth on the overlay ground:
1. A large soft **cyan radial glow** (reuse `.section__blob` treatment, `rgba(var(--accent),0.10-0.12)`)
   positioned asymmetrically per section (alternate left/right down the page, like the landing).
2. Keep a **faint blueprint grid** as *texture only* — mask it with a radial/edge vignette so it
   fades out at the edges and behind text (never a full-bleed even wallpaper). Low opacity.
3. A subtle top-of-overlay vignette so the masthead sits on depth, not a flat plane.
   Net effect: the same "deep field with an accent nebula" atmosphere as the landing, in cyan.

### B. Section chrome — reuse landing components — HTML + CSS
Rebuild each section's head to use `.section__head > .section__label(+--intro) + .section__rule`
and add a big `.section__numeral` (`--left`/`--right`, alternating) per section. Retire the bespoke
`.dd-sec__n` / `.dd-sec__kicker`. Keep `.section h2` scale for the section headlines. The five
sections keep their content and order:
1. `01` THE PROBLEM  2. `02` THE APPROACH (spotlight)  3. `03` THE BUILD  4. `04` THE RUN  5. `05` THE OUTCOME.

### C. Hero / masthead — give it a visual anchor (skill §4.8: a hero needs a real visual)
Make the masthead an **asymmetric split** (design-taste VARIANCE 8, anti-center): title +
eyebrow + lede + meta on one side; on the other, a **signature engineering visual**. Use a small
**inline SVG "gel-loading" motif** — a row of gel wells with a pipette tip descending and a
fluid/lane trace — that **draws on** and loops subtly (echoes the landing's hand-built pump-anim
SVG, so it is on-brand; transform/opacity + `stroke-dashoffset` only, positive offset for Safari).
This is the ONE sanctioned hand-rolled SVG (justified: the site already ships a signature hand-built
SVG animation; matching it is brand consistency, not slop). Reduced-motion: it renders in its final
drawn state, static. Do NOT relocate any section's photo into the hero — the timelapse stays the
RUN payoff, the deck-map stays in APPROACH, the UI-runner stays in BUILD.

### D. Layout diversification (skill §4.3 / §4.7 zigzag cap)
Currently every block is the same left-offset text stack. Vary it:
- APPROACH spotlight: keep asymmetric (reasoning + deck-map aside) but alternate the aside side.
- BUILD: the CAD blueprint plate becomes a distinct full-width "assembly" figure; the UI-runner
  portrait sits offset opposite the text (not stacked centred).
- RUN: the timelapse becomes a **cinematic near-full-bleed band** (its wow moment, D-11), framed
  with the engineering glow — the single biggest visual beat.
- OUTCOME: the three stats (`144`, `~10 min`, `12/12`) become a bold display-number row with
  `--accent` treatment (reuse the landing's big-number energy), not small text.
No more than 2 consecutive sections share a layout family.

### E. Motion — motivated, reduced-motion-safe (absorbs plan 02.1-03)
Two layers:
1. **Scroll reveals** — reuse the EXISTING `[data-reveal]` IntersectionObserver system (main.js:20,
   127-160, `--rev-i` stagger, `data-rev-state`). Add `data-reveal` + stagger indices to the overlay's
   section heads, paragraphs, list items, figures, and stat tiles so they rise/fade in as the visitor
   scrolls the overlay — the SAME reveal language as the landing. It already no-ops under REDUCED.
   Note the overlay is its own scroll container; if IO reveals do not fire cleanly for overlay content
   (root is the viewport, overlay opens later), drive those specific reveals from the GSAP context
   instead (below) — the visible result (rise + fade on enter) must match the landing's reveal feel.
2. **GSAP scroll-telling** (the "assembling machine" wow, D-13 / MOTION-01) — per plan 02.1-03:
   - **Vendor** `gsap@3.15.0` ScrollTrigger into `site/assets/vendor/ScrollTrigger.min.js` (download
     `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js`, commit it, NO CDN hot-link).
     GSAP core is ALREADY vendored (`site/assets/vendor/gsap.min.js`) + tagged (index.html:816). Add
     ONLY a classic `<script src="./assets/vendor/ScrollTrigger.min.js">` after gsap.min.js and before
     the `main.js` module tag. Do NOT add a second gsap-core tag.
   - `initOt2Motion()` / `killOt2Motion()` lifecycle in main.js: return early if `REDUCED`; else
     `gsap.registerPlugin(ScrollTrigger)`, `ot2Ctx = gsap.context(fn, scroller)` where
     `scroller = document.querySelector('[data-proj="ot2"]')` (NEVER the window — Pitfall 1). End with
     `ScrollTrigger.refresh()`. `killOt2Motion()` → `ot2Ctx.revert()`; null it. Every trigger sets
     `scroller: <the overlay element>`.
   - Hook: in `applyTrans` at the `t>=1` completion branch (AFTER `[data-proj-inner]` transform/filter
     are cleared), call `initOt2Motion()` when `tr.into.id === 'ot2'`. In `closeProj` call `killOt2Motion()`
     (both reduced and animated branches). Build AFTER the warp completes, never during (Pitfall/R-03).
   - Choreography (motivated — "the machine assembles itself"):
     * BUILD: the CAD parts **stagger-assemble** (transform + opacity) as they enter — reads as parts
       coming together on the deck.
     * A **blueprint draw-on**: SVG stroke-dashoffset → 0, positive offset only, scrub-linked to the
       overlay scroll — the hero motif and/or a section rule "drawing" like a schematic.
     * The RUN band and OUTCOME numbers reveal with a scrubbed/entered emphasis.
   - Vocabulary limits (R-01, mobile-cheap): animate ONLY transform / opacity / stroke-dashoffset.
     No top/left/width/height/box-shadow/filter tweens. Prefer `scrub` over long autonomous timelines.
     `will-change:transform` only on the few animated elements. Pinning sparingly, if at all.
   - Single reduced-motion source: gate on the `REDUCED` import only — NO `matchMedia`, no
     `gsap.matchMedia()`. Under reduced motion nothing animates and every section is fully readable
     (the default rendered state is complete; JS is the only thing that animates).
   - The **optional animated OT-2 deck (D-12)** is Claude's call now (Sirio delegated): only PROMOTE it
     if it is clearly a clean win off the deck-allocation map, isolated + REDUCED-gated + torn down with
     the overlay; otherwise DROP it (the timelapse stands alone). Do not risk the page for it.

### F. Consistency locks (design-taste pre-flight)
- **Accent lock:** cyan `--star-rigel` only, section-scoped `--accent`; NEVER add it to `PAL` in
  star-engine.js. `--accent` must stay set (never unset → transparent, Pitfall 6).
- **Voice:** PRESERVE the site's established em-dash mono-label voice (D-28) — the landing uses it, so
  matching it is the goal. (The design-skill's blanket em-dash ban is overridden here by the explicit
  "stay close to the landing page" instruction + §11.C preserve-copy-voice. Do not de-em-dash.)
- **Theme lock:** one dark cosmic theme throughout; the overlay is the cyan register of the same theme.
- **Shape/type:** reuse the site's existing radii, `--font-display`, `--font-mono`, spacing tokens.
- Keep the temporary vendor before-visual placeholder (`ot2-platform-stock.png`) and its README/HTML
  flags exactly as-is (owner override, pending replacement) — device-frame it consistently.

---

## VERIFY (the executor's own gates)
- `node --check site/main.js` exits 0.
- ScrollTrigger vendored locally + one relative `<script>`, exactly one gsap-core tag.
- `grep`: `initOt2Motion`, `killOt2Motion`, `gsap.context`, `scroller` present in main.js; no `matchMedia` in main.js.
- Overlay sections use `.section__numeral` / `.section__label` / `.section__rule`; `785` absent.
- Commit atomically (conventional commits referencing the plan). Do NOT write SUMMARY or mark plans
  complete — the orchestrator render-verifies first and handles completion.

## Out of scope (leave alone)
- The hero Sirio Star tempo/breath (Sirio tunes it himself).
- The landing page sections other than the OT-2 card wiring (already correct).
- Any content/fact change; any new remote dependency; `_Archive/`.
