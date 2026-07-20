# OT-2 deep-dive — redesign directive v2 (Sirio review, 2026-07-18)

Sirio reviewed the v1 redesign render and gave 6 specific corrections. This is still a
**redesign-PRESERVE** (keep facts + the em-dash mono voice), applying design-taste-frontend
principles. Do NOT re-litigate the parts he did not mention (section chrome reuse, cyan
`--accent`, GSAP lifecycle scoped to the overlay scroller, reduced-motion single-REDUCED
gate — all keep working). The whole overlay lives in `site/index.html` (~lines 694-918),
`site/styles.css` (overlay block ~2329+), `site/main.js` (initOt2Motion / GSAP context).

Read `.claude/skills/design-taste-frontend/SKILL.md` for the style principles (§4 bias
correction, §4.8 real visuals not hand-rolled decoration, §5 motion motivated, §6 reduced
motion, §9 no AI tells). This is a VANILLA site — apply principles, not the React stack.

## The 6 changes

### 1. Remove the "empty blue rectangles" (the abstract deck-plan SVG)
In BUILD's assembly figure there is a `<svg class="ot2-deck" data-ot2-deck>` (index.html
~834-842) — an empty slotted deck outline that reads as meaningless empty rectangles.
**Delete that SVG entirely** (and its `.ot2-deck*` CSS + its GSAP draw-on trigger in
main.js). See change 3 for what replaces it.

### 2. Move the real timelapse VIDEO to the hero (top); DELETE the RUN section
- **Delete the masthead gel-loading SVG** (`<figure class="proj__masthead-visual">` +
  the whole `.gel-motif` SVG, index.html ~701-739, and all `.gel-motif*` CSS, and its GSAP
  lane-draw + pipette-loop timelines in main.js). Sirio dislikes it.
- **Put the OT-2 timelapse in the hero**, in the masthead's right column where the SVG was.
  Use the SAME asset + `.media-slot` video contract as the old RUN block so main.js autoplays
  it muted/looping only when motion is allowed (poster + `controls` under reduced motion):
  `./assets/media/ot2-timelapse.mp4`, poster `./assets/media/ot2-timelapse-poster.jpg`,
  `muted loop playsinline`, no `autoplay`, keep the descriptive `aria-label`. It is the
  signature automation motion, now leading the page (D-11). Give it a short caption trimmed
  from the old RUN copy (e.g. "the prototype running the real protocol at DTU — no hand on a
  pipette").
- **Delete the entire RUN section** (index.html ~867-889, `data-ot2-run`) — its only unique
  asset was the video, now in the hero. Remove its `.proj-sec--run` / `.proj-run__figure`
  CSS and its GSAP run-figure trigger.
- **Renumber the ghost numerals** so sections read 01 PROBLEM, 02 APPROACH, 03 BUILD,
  04 OUTCOME. Keep the `.section__numeral` left/right alternation consistent (01 right, 02
  left, 03 right, 04 left → OUTCOME becomes `--left`, was `05 --right`).

### 3. APPROACH (02): replace the deck PNG with a Double Diamond SVG; move the deck PNG to BUILD
- In APPROACH, the `ot2-slots-allocation.png` device-frame aside "makes no sense there"
  (Sirio). **Replace it with a hand-built Double Diamond SVG** — the design-thinking process
  is exactly what this section is about, so a schematic is the right visual (design-taste
  §4.8 allows a hand-rolled SVG when the brief calls for a simple diagrammatic mark). Draw the
  classic two-diamond shape (diverge/converge, diverge/converge). Label the four phases with a
  few words each, sourced from the real project:
    - **Discover** — interviews + a 19-system market survey
    - **Define** — the innovation brief: automate the repetitive steps
    - **Develop** — prototype the parts + the parameterised protocol
    - **Deliver** — a working OT-2 build, graded 12/12
  Cyan line-art on the dark ground, on-brand; draws on with `stroke-dashoffset` (positive
  offset), static final state under reduced motion. Give it an accessible `aria-label`/title.
- **Move `ot2-slots-allocation.png` (device-framed) into BUILD**, into the assembly figure
  where the empty SVG was — it is the REAL deck plan the parts seat into. Caption it as the
  deck layout (e.g. "the deck plan — where each rack and reagent sits"). So BUILD's assembly
  figure = the real deck-allocation map (device-framed) + the four CAD parts that still
  stagger-assemble on scroll.

### 4. Reduce paragraph/list copy by ~20% (titles/headlines UNCHANGED)
Trim every `.dd-p` paragraph, `.dd-list` item, `.proj__lede`, captions, and the OUTCOME
future-list by roughly 20%. Keep EVERY fact (Double Diamond, 19 systems = 12+7, cassette→
RunOne MultiCaster pivot, the 5 parts, air-gap/split-strip/slow-lift, 144 samples = 3×48,
~10 min, 12/12, the future items) and the em-dash mono voice — cut filler, redundancy, and
throat-clearing. The report/profile facts are the only source; do not invent. The OUTCOME
"future perspectives" run-on sentence should get the biggest trim.

### 5. Make it feel like a galaxy, not a dry engineering room (design-taste style)
The overlay currently feels sterile because the deep-field star engine is PAUSED behind it
(D-20) and the ground is a flat dark + faint blueprint grid. Bring the cosmic feeling in:
- **Add a starfield layer** to the overlay ground — a performant CSS starfield (layered
  small radial-gradient star dots at varied size/opacity, a few clustered densities), fixed
  behind the content, subtle (never competes with text). A very slow drift is OK but must be
  transform/opacity only and disabled under `prefers-reduced-motion`. (Do NOT unpause or
  re-enable the main canvas engine — keep the D-20 loop guard; this is a separate cheap CSS
  layer that costs ~nothing.)
- **Keep + enrich the nebula glows** (the cyan `--accent` radial glows) and add depth so the
  overlay reads as the SAME galaxy as the landing page, in the cyan sector. A hint of the
  landing's blue/violet in one deep glow is fine for richness — but the section `--accent`
  stays cyan `--star-rigel` and is NEVER added to `PAL`.
- **Reduce the blueprint grid to a whisper** (much fainter, or drop it) so the stars/nebula
  carry the mood, not the grid. Engineering texture can remain as a faint accent, but the
  dominant feeling is "cosmic," matching the landing.
- Follow design-taste: dark cosmic depth, off-black (not pure #000), motion motivated,
  no neon-slop, accent locked. Modern and good, clearly kin to the landing hero.

## Constraints (unchanged, still hard)
- `node --check site/main.js` exits 0. GSAP triggers stay scoped to `[data-proj="ot2"]`;
  built on warp completion, reverted in `closeProj`; single `REDUCED` gate, no `matchMedia`
  added. Only transform/opacity/stroke-dashoffset animated.
- Cyan `--accent` section-scoped; never in `PAL`. `--accent` always resolved.
- Keep the temporary before-visual placeholder `ot2-platform-stock.png` + its README/HTML
  flags as-is. The string `785` appears nowhere. No new remote deps. Don't touch the hero
  Sirio Star, other landing sections, or `_Archive/`.
- Commit atomically (conventional messages referencing 02.1-02 for structure/visual/copy,
  02.1-03 for the motion changes). Do NOT write SUMMARY or mark plans complete — the
  orchestrator render-verifies first.

## Return
A concise report: what changed per the 6 points, the new GSAP trigger set, the approx %
copy reduction, and anything to check on render.
