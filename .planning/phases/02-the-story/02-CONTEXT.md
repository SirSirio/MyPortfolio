# Phase 2: The Story - Context

**Gathered:** 2026-07-17
**Status:** Ready for planning

<domain>
## Phase Boundary

**Delivers:** the narrative half of the home page — who Sirio is, in words — plus the motion
that makes the whole single-scroll page feel authored.

Three things ship:

1. An **About/journey** section narrating the biotech → design/automation pivot (CONT-01)
2. A **"How I Work With AI"** section carrying the *grano salis* philosophy (CONT-03)
3. A **Contact close** with working email + social links (CONT-04)

Plus, across the whole page: **scroll-triggered motion** (MOTION-01) that honours
`prefers-reduced-motion` (MOTION-02), and **distinct full-height sections** (NAV-01).

**Requirements:** NAV-01, CONT-01, CONT-03, CONT-04, MOTION-01, MOTION-02

⚠ **NAV-03 is being REMOVED from this phase** — see `<deferred>`. It is stranded here
(no deeper pages exist yet) and moves to the new deep-dive phase.

**Not in this phase:** project case-study pages, the page template, warp/home↔page
transitions (all → the new deep-dive phase); the AI Concierge bar (Phase 6 — do not
confuse ASKAI-* with CONT-03, they are different things); mobile tuning (Phase 3);
formal media encoding/lazy-loading (MEDIA-02, Phase 4).

**Media exception — explicitly in scope, not scope creep.** Sirio asked for real media so
the site is shareable right after this phase. `ROADMAP.md:5` and `ROADMAP.md:104`
pre-authorize exactly this ("media can be dropped in *before* this phase at any time",
"not a gate on Sirio"), and MEDIA-01 built the slots to accept it. Phase 2 fills existing
slots; Phase 4 still owns the formal encoding pass.
</domain>

<decisions>
## Implementation Decisions

### Scroll Order & Section Identity

- **D-01:** Final order is **Hero → Mission → About → Work → Experience → Publications → AI → Contact**.
  Not re-litigable: `PROJECT.md:24` already locked "Hero → Story/About → Featured Projects →
  How I Work With AI → Contact" at project level. Phase 1 added Mission/Experience/Publications;
  this is the merge.
- **D-02:** **Existing `01–04` numbering is untouched.** `01 WORK`, `02 EXPERIENCE`,
  `03 PUBLICATIONS`, `04 TRANSMISSION` keep their numbers and sector labels. About and AI ship as
  **unnumbered interludes** — quieter in hierarchy, deliberately not competing with the work.
  Consequence accepted: the Mission pill index does not jump to them; visitors meet them by scrolling.
- **D-03:** **Add two new star-spectrum stops** — a **bio-green** for the About/ORIGIN section (the
  biotech root; it is the "bioluminescence" the project is named for and is currently unused on the
  page) and an **indigo/cyan** for the AI/METHOD section. Exact values are Claude's call; they must sit
  natively in the existing spectrum (`--star-sirius` 150,196,255 · `--star-antares` 244,182,89 ·
  `--star-aldebaran` 255,122,89 · `--star-vega` 171,140,255).
  Net effect: unnumbered in hierarchy, but each owns its own light.

### About / ORIGIN Section (CONT-01)

- **D-04:** **Three-beat journey**, each beat one tight paragraph, revealed on scroll:
  1. *The lab years* — 5 years hands-on (mammalian cells, microbiology, fermentation, cell-free), iGEM Wet Lab Lead
  2. *The realisation* — repetition is the bottleneck; the broken kit; the late nights
  3. *The pivot* — CAD, printed parts, automation; the thesis dispenser
  Rationale: gives MOTION-01 something real to reveal, and earns the conclusion instead of asserting it.
- **D-05:** **Threads to include:** repetition-is-the-bottleneck (the spine); domain-flexible /
  biotech-as-edge; and the people/collaboration thread.
- **D-06:** **Threads to EXCLUDE:** the martial-arts / Viet Vo Dao precision angle. Sirio did not select it.
  (Also excluded by omission: the Best Athlete + 4 gold medals awards.)
- **D-07:** The people/collaboration thread uses the **"Built for people, sharpened by people"** framing,
  max 1–2 sentences. **Do NOT use the word "ego"** or the phrase "ego-free" — Sirio explicitly rejected
  it as unprofessional and clichéd. Approved draft (react-to, not final):
  > "I build things for people to use, and the best moment is always someone else using them.
  > I work sharper with a team than alone — ideas survive better once someone has argued with them."
  Grounded in `profile.md:244` ("their feedback is my primary motivator", "motivated by accountability…
  when a team is counting on me").
- **D-08:** About must go **deeper**, not restate — the Mission section already carries the LOCKED
  verbatim identity one-liner. Do not paraphrase or echo that line here.
- **D-09:** ⚠ **Fact check needed.** The "countless late nights fixing broken lab equipment" origin
  comes from `PROJECT.md:46`, **not** from `profile.md`. Sirio was asked and did not correct it, so
  treat as true — but it is the one story beat with no profile.md backing. Everything else must trace
  to `profile.md`.

### "How I Work With AI" / METHOD Section (CONT-03)

- **D-10:** **The claim sits BETWEEN "explicit" and "philosophy-first."** Sirio's exact words:
  *"In between the explicit and the philosophy first option."* Lead with the philosophy; own the site
  as evidence plainly but late and understated. Do **not** headline "this site was built with AI",
  and do **not** bury it as a footnote either.
- **D-11:** **Form: short manifesto** — a few sharp declarative lines in the site's terse mono-label
  voice. Not named principles, not flowing prose.
- **D-12:** **Open with the calculator story** (`profile.md:373`). This is the origin of the whole
  philosophy and is unmistakably Sirio's: aged ten, hated long division, teacher warned him about the
  calculator, he ignored her and typed numbers until they matched the back of the book understanding
  nothing, then learned the order — map the problem, choose the strategy, *then* let the tool execute.
- **D-13:** ⚠ **DROP the Latin. "Cum grano salis" must NOT appear on the page.** Sirio: *"I am afraid
  the 'cum grano salis' will not be understood by most, so rephrase it."* This is stronger than a
  readability call: in English, "take it with a grain of salt" means *be sceptical of it*, which is
  **not** what Sirio means — he means *use it with your judgment engaged*. The idiom would actively
  mislead. **The philosophy stays; the phrase goes.** (CONT-03 asks the section to convey the
  philosophy, not the phrase. Note this supersedes the wording in `PROJECT.md:48` and `CLAUDE.md`,
  which both name the phrase.)
- **D-14:** **The teacher's line is rephrased to:** *"I could use it — but only if I already knew what
  I was asking it. Otherwise it wouldn't help me."* Chosen because it states the **method** (map →
  strategise → execute) rather than a virtue, so the AI parallel lands with no explaining: knowing
  what to ask *is* the job.
- **D-15:** **Approved manifesto draft** (react-to, not final — Sirio picked this direction over the
  alternative "Direction is the job"):
  > I was ten, and I hated long division. The calculator could just do it.
  >
  > My teacher said I could use it — but only if I already knew what I was asking it.
  > Otherwise it wouldn't help me.
  >
  > I ignored her, and spent a year typing numbers until they matched the answers in
  > the back of the book. I understood nothing.
  >
  > So I learned the order: map the problem, choose the strategy, then let the tool
  > execute. Never the reverse.
  >
  > Same bottleneck, one layer up. AI is the biggest calculator I've been handed.
  > The direction is still mine.
- **D-16:** **The structural bridge is load-bearing — preserve it.** About ends on *repetition in the
  lab is the bottleneck → so I automate it*. METHOD is the same insight one layer up: *repetition in
  thinking is a bottleneck too → so I point AI at it, with judgment*. This is what makes CONT-03 the
  second half of one argument rather than a bolt-on topic.
- **D-17:** **Content that must appear** (Sirio's explicit asks):
  - **AI is very good for documentation** — grounded in his own deck: *"Turns concepts into live tools
    and captures the whole process as presentable text — as it happens."*
  - **The GSD framework** — Discuss → Plan → Execute. He already applies it to his thesis tooling.
  - **AI pressure-tests the design** — Sirio asked to convey "reasoning with AI is actually good…
    focusing on possible weak points" and said *"make smth up idk"*. **Do NOT invent anything.** His
    own deck already says it better: AI *"[d]iscusses each design decision, models the physics, and
    processes the experimental results."* Use that. (See `<specifics>` — fabrication is a standing
    project landmine.)
  - **He decides the direction; AI turns it into reality.** Sirio emphasised "I DO!" — the direction
    is his, always. AI **shortens the gap between idea and finished product**, especially for digital work.
- **D-18:** **Link out to the GSD deck** — `https://sirsirio.github.io/thesis-tools/decks/lab-meeting-2026-06/`
  as a quiet "see the method ↗". Makes the claim checkable and shows the method applied to real thesis
  engineering, not just a portfolio. New tab + `rel="noopener"` per the Phase 1 nav pattern.
- **D-19:** **Available true claim, worth using:** the same method built *this page* and *his thesis
  tooling*. Stronger and more specific than "I used AI."
- **D-20:** ⚠ **UI/animation for this section is deliberately OPEN.** Sirio: *"for the ui and animation,
  for this section you can surprise me. I think I would like to have some /gsd-sketch versions of it to
  see how they might look."* → **Run `/gsd-sketch` for the METHOD section before or during planning and
  let Sirio choose.** Do not silently pick a treatment.

### Contact Close (CONT-04)

- **D-21:** Contact carries **email + LinkedIn + GitHub + iGEM wiki**:
  - `sirio.feltrin@gmail.com` — already live at `site/index.html:307`. This is the profile address and
    deliberately **not** the account address (`airsiriomax@gmail.com`).
  - LinkedIn `https://www.linkedin.com/in/sirio-vittorio-feltrin/` — **repeated from the nav on purpose**;
    it is where a recruiter looks once they have decided to act.
  - GitHub `https://github.com/SirSirio` — he is a builder and this repo is public.
  - iGEM wiki `https://2024.igem.wiki/DTU-Denmark/` — `profile.md:11` calls it "a public, verifiable
    record" that strengthens any entry.
- **D-22:** **CV link NOT repeated** at Contact — not selected. It stays in the persistent nav only.
- **D-23:** ⚠ **Pre-launch check on GitHub.** Flagged to Sirio and accepted: a sparse or empty-looking
  profile undercuts rather than supports the "I build things" claim. Someone should look at
  `github.com/SirSirio` before this ships.
- **D-24:** Keep the existing `"Let's build something."` title and the `04 — TRANSMISSION · SIRIUS SECTOR`
  label. Phase 2 adds links to the existing section; it does not rebuild it.

### Media (user-raised — in scope, see `<domain>`)

- **D-25:** ⚠ **The four CAD renders have GENUINE ALPHA — they are not white-background.** Claude
  initially claimed white backgrounds and **was wrong**; Sirio corrected it and verification confirmed
  him. (Cause: image viewers composite alpha onto white, so the two are indistinguishable when viewed.
  **Parse the alpha channel, don't eyeball it.**) Verified fully-transparent pixel share:
  `1 - Adapter.png` 50.9% · `2 - PCR Strip Racks.png` 42.3% ·
  `3 - Rack for Loading Buffer & Molecular Weight Ladders.png` 32.2% · `4 - Rack Holder.png` 49.9%.
  All four corners `a=0`. **No knock-out needed — they drop onto the dark page clean.**
- **D-26:** **Two files ARE genuinely opaque white** and would need work if ever used:
  `Opentrons Slots allocation.png` (99.8% opaque; only its rounded corners are cut out) and
  `UI protocol runner.png` (centre = `255,255,255,255`; also 371×888 portrait). Neither is selected for
  Phase 2 — both are deep-dive-page candidates.
- **D-27:** ⚠ **The renders carry baked-in soft shadows in LIGHT BLUE-GREY** (~`167,196,225` @ ~24%
  alpha — sampled at `1 - Adapter.png` centre). Those shadows were authored for light backgrounds; on
  dark they render as a faint **halo**, not a shadow. Sirio reports they looked fine on a dark
  presentation background. **Verify visually once rendered** — this may read as an on-theme glow, or as
  a dirty edge.
- **D-28:** **Blueprint plate treatment** for the renders: dark plate, faint grid, accent glow driven by
  the section's `--accent`. Reads as an engineering drawing lit from within — on-identity for the
  engineering-blueprint × bio-glow language.
  **The surviving reason is aspect ratio, not background.** Slots are 16:9 (1.78:1) with
  `object-fit: cover`; the renders are 1.13:1 (408×361), 1.68:1 (569×338), 1.26:1 (338×269), 1.48:1
  (438×295). Raw cover-crop would cut them. The plate lets them `contain` on a sized dark ground.
- **D-29:** **The Gel Electrophoresis card slot is a COMPOSITE** — Sirio's own idea:
  the 9:16 timelapse at full height + the 4 renders on a blueprint plate beside it.
  Geometry: a 9:16 video at full height in a 16:9 box occupies `81/256 ≈ 31.6%` of the width, leaving
  ~68% for the parts plate. Tells "I designed the parts **and** automated the run" in one card.
  ⚠ **This is a deliberate MEDIA-01 deviation** — MEDIA-01's contract is "drop-in + one line, no CSS
  change"; a composite needs new CSS. Accepted knowingly; **name it in the plan.**
- **D-30:** **`TimelapseOT2.mp4` is first-party and verified.** 720×1280 (9:16), H.264, 16.9s, 30fps,
  6.66MB, at `Opentrons-OT2 DALSA media/`. Frames confirm: the **real OT-2 running in the real DTU lab
  with Sirio's actual green 3D-printed parts** (the same parts as the CAD renders), pink PCR strip racks,
  blue gel tray. The render → real-thing pairing is the strongest asset in the set.
  *(Note: Sirio renamed the folder from `Opentrons-OT2 DALSA pictures/` mid-discussion and added the video.)*
- **D-31:** ⚠ **PERF — 6.66MB autoplay on the home card is too heavy.** Planner's call, but do not ship it
  as-is: recruiters open this on phones (a core project constraint). A re-encode should reach <2MB with no
  visible loss. Touches Phase 3 (mobile perf) and Phase 5 (PERF-02 lazy-loading). The formal encoding pass
  is MEDIA-02/Phase 4 — **do not over-engineer here, but do not ship 6.66MB autoplaying either.**
  Always pair the video with a `poster` per `site/assets/media/README.md`.
- **D-32:** **Sirio will supply media for the other two Work cards** (Portable Precision Liquid Dispenser
  `index.html:169`, EndoSense `index.html:198`). **Fallback: labelled placeholders stay.** This does
  **not** block the phase — MEDIA-01 guarantees no re-engineering either way, and the README argues
  placeholders ("not shot yet") beat fakes.
- **D-33:** ⚠ **UNRESOLVED — vendor images.** `Opentrons-OT2.png` and `RunOne Gel Electrophoresis System.png`
  are the **manufacturers' copyrighted marketing renders**, not Sirio's work. Sirio wants to keep the
  "what I started with → what I built" narrative and asked whether an acknowledgement grants rights.
  **It does not** — attribution and licence are separate; crediting Opentrons creates no permission.
  Practical risk on a personal portfolio is very low, but low risk ≠ permitted.
  **Key point: Sirio's own timelapse shows the real OT-2 he programmed, making the vendor render largely
  redundant *and* better storytelling.** The narrative is worth preserving by other means:
  (a) Sirio's own photos of the actual RunOne + OT-2 on the DTU bench; (b) his own line-art/schematic of
  both — would suit the blueprint aesthetic; (c) a frame from his own timelapse;
  (d) **RESEARCHER TASK — check Opentrons and Embi Tec press-kit / media-resource terms for editorial use.**
  Neither vendor image is needed for Phase 2's composite; **this decision can wait for the deep-dive phase.**

### Motion (MOTION-01 / MOTION-02)

- **D-34:** ⚠ **THE INVISIBLE-PAGE LANDMINE.** Phase 1 ported `[data-reveal]` attributes onto every
  section **inert**, and deliberately shipped **zero `[data-reveal]` rules in `styles.css`** — because
  `updateReveals()` is what sets `opacity:0` in the first place. **Adding any CSS rule that hides or
  fades `[data-reveal]` before/without the JS ships an invisible page.** See `01-03-SUMMARY.md:221`
  and `01-PATTERNS.md:348`. Phase 2 lights them up by adding the function — not by adding CSS.
- **D-35:** The V4 design's `updateReveals()` (`Sirio V4 …dc.html:560-597`) is a **complete, working,
  reduced-motion-aware vanilla implementation** — fade + `translateY(30px)` + `blur(10px)`, `130ms`
  stagger via the `data-reveal` index, and it re-arms when elements leave the viewport so reveals replay
  on scroll-back. Port it as the baseline. **No motion library** — `01-RESEARCH.md:119`: the engine owns
  its own rAF loop and a library would duplicate it.
- **D-36:** MOTION-02 is **largely inherited, not built**: `REDUCED` already exists at
  `star-engine.js:12` and a `prefers-reduced-motion` block at `styles.css:1156`. Reuse `REDUCED`; do not
  add a second media-query source of truth.
- **D-37:** **Single rAF loop is non-negotiable.** `main.js:9` states it explicitly — the engine plus
  deep field share one loop. Reveal work is scroll-driven (like `applyPara()`), not per-frame. Never add
  a second loop, and never add a `getBoundingClientRect` to the pointer handler or the loop
  (`main.js:26-28`).
- **D-38:** ⚠ **`PROJECT.md:28` asks motion to convey "automation" — "things assemble, lines draw
  themselves, particles flow."** The V4 baseline fade-up does *not* do that. Closing that gap is
  **MOTION-01's real design problem** and the main reason for the research directive below.

### Claude's Discretion

Sirio delegates mechanism and reacts to rendered results. These are Claude's call — decide, build, then
show him:

- How the reveal is wired (port `updateReveals()`, thresholds, stagger, re-arm behaviour)
- How **NAV-01's "full-height sections"** is interpreted — sections are currently padding-sized, not
  `100vh`. Decide whether full-height is literal (`min-height:100vh` / scroll-snap) or means "distinct
  and immersive". **Whatever is chosen must survive the Phase 3 mobile pass** — `100vh` is a known
  mobile-viewport trap (URL-bar resize); prefer `svh`/`dvh` if going literal.
- Exact values for the two new palette stops (D-03)
- Video encoding/compression approach (D-31)
- The blueprint plate's construction (D-28) and the composite's CSS (D-29)

**Not discretionary:** the METHOD section's UI/animation → **`/gsd-sketch`, Sirio chooses** (D-20).

### Research Directive

- **R-01:** ⚠ **Sirio explicitly asked for this** — *"I would like you to do some research on good
  dynamic content for the page, so you can be inspired by what people are doing for good websites."*
  The researcher **must** survey current motion/dynamic-content practice on high-quality portfolio and
  product sites and bring back concrete, referenced patterns — **not** invent in a vacuum. Bias the
  survey toward motion that reads as **"automation"** (assemble / draw-on / flow — D-38), toward
  scroll-narrative sections like About/METHOD, and toward what stays cheap on mobile (Phase 3 is next).
- **R-02:** Check Opentrons and Embi Tec press-kit / media-resource licensing terms (D-33).

### Reviewed Todos

Neither matched todo was folded:

- **`2026-06-17-hero-typewriter-rotating-role-animation.md`** — **CLOSED, not folded.** Already fully
  implemented by Phase 1 (`star-engine.js:70-96`): 8 terms each with its own colour gradient, article
  auto-selection, reduced-motion static fallback. Its own text ("belongs in Phase 2: The First
  Impression") was stale — the roadmap was reshaped and Phase 2 is now "The Story". Sirio confirmed:
  *"Typewriter done and ready to be closed."* Moved to `.planning/todos/completed/` with an as-built
  record (commit `eae6bbe`). The word list/order/colours were never explicitly confirmed with him and
  remain open to revision — a plain array at `star-engine.js:72-81`.
- **`2026-07-16-supply-project-media-images-videos.md`** — **stays pending, tagged `resolves_phase: 4`.**
  Partially superseded in spirit: its premise ("these do not exist yet") is now false for the OT-2
  project. Sirio has supplied OT-2 media and will supply Dispenser + EndoSense media (D-32). The todo
  still holds for the remaining projects and the Phase 4 case-study pages.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope & Requirements
- `.planning/ROADMAP.md` § Phase 2 — the phase goal + 5 success criteria
- `.planning/ROADMAP.md:5`, `:104` — **media pre-authorization** (the basis for the media scope call)
- `.planning/ROADMAP.md:87` — Phase 3 sits before the Showcase "so project cards get built against a
  mobile-correct baseline" (the reason the deep-dive was deferred)
- `.planning/REQUIREMENTS.md` — NAV-01, CONT-01, CONT-03, CONT-04, MOTION-01, MOTION-02 (and NAV-03, moving out)
- `.planning/PROJECT.md:24` — **locked scroll order** · `:28` — motion must convey "automation" ·
  `:46` — the pivot story · `:48` — the AI philosophy

### Content (the ONLY source for facts)
- `../00_Profile/profile.md` — **master profile; every factual claim must trace here**
  - `:373` — **the calculator story** (origin of the philosophy; opens the METHOD section)
  - `:237-251` — Professional Philosophy: the repetition insight, domain-flexibility, collaboration
  - `:11`, `:195-204` — iGEM EndoSense + the wiki URL guideline
  - `:40-44` — contact details · `:384-395` — what he's looking for
- `https://sirsirio.github.io/thesis-tools/decks/lab-meeting-2026-06/` — **Sirio's own GSD/AI deck**
  (user-referenced during discussion). Source for the AI-as-thinking-partner and
  AI-as-documentation-engine language, and the Discuss→Plan→Execute framing. **Linked from the page (D-18).**

### Design (visual language — style guide, NOT a blueprint for this phase)
- `.planning/phases/01-the-design-build/design/Sirio V4 - Deep Field x Hyperlight.dc.html`
  - `:560-597` — **`updateReveals()`**, the reveal implementation to port (D-35)
  - ⚠ **Contains NO About and NO AI section** — only `top`/`index`/`work`/`experience`/`publications`/`contact`.
    Phase 2's two headline sections must be **invented** in this design's language, not ported.
- `.planning/phases/01-the-design-build/design/star-engine.js`, `Sirio Star.dc.html`

### Phase 1 Handover (read before touching motion)
- `.planning/phases/01-the-design-build/01-03-SUMMARY.md:221` — **the inert-`data-reveal` handover**
- `.planning/phases/01-the-design-build/01-PATTERNS.md:348`, `:185`, `:298` — reveal landmine + do-not-port list
- `.planning/phases/01-the-design-build/01-RESEARCH.md:119` — no motion library · `:42-43` — Phase 2/4 split
- `.planning/phases/01-the-design-build/01-03-PLAN.md:94`, `:98` — do-not-port list; the invisible-page warning

### Live Site (⚠ `site/`, NOT `app/`)
- `site/index.html` · `site/main.js` · `site/styles.css` · `site/star-engine.js`
- `site/assets/media/README.md` — **the MEDIA-01 contract**: drop-in + one line; no stock, no AI-generated
  imagery, first-party only; commit assets and use relative paths; 16:9 `object-fit:cover`; always poster a video
- `CLAUDE.md` § Sources of Truth — fixed this session (`app/` → `site/`, commit `eae6bbe`)
- ⚠ `_Archive/` is **off-limits** — git-ignored, predates the approved design, stale placeholder content
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`[data-reveal]` attributes** — already on every section with `0`/`1`/`2` ordering, ported inert.
  MOTION-01 lights them up by adding `updateReveals()`. No markup change needed for existing sections.
- **`REDUCED`** (`star-engine.js:12`, exported) — the single reduced-motion source of truth. MOTION-02 reuses it.
- **`applyPara()`** (`main.js:98-109`) — the scroll-driven, ±400px-culled parallax pattern. The model
  for how reveal work should be wired (scroll-driven, not per-frame).
- **`--accent` section system** (`styles.css:573-589`) — each section sets `--accent` to the star stop it
  owns; labels, rules, numerals and blobs all derive from it. New sections get their accent free by
  setting one variable (D-03).
- **`.media-slot`** + `data-label` — `styles.css` uses `:not(:has(> img, > video))` so the striped
  placeholder switches off automatically when an asset is added. (`:has()` not `:empty` — whitespace text
  nodes would break `:empty`.)
- **`[data-para]`** — consumed by `applyPara()`; available on new sections for depth.
- **`.nav__link` pattern** (`index.html:33-34`) — outbound links use `target="_blank" rel="noopener"`;
  **the `noopener` is what blocks reverse tabnabbing.** Contact's new links must match.

### Established Patterns
- **One rAF loop, forever** (`main.js:9`, `:156-161`). Reveal work is scroll-driven. No second loop.
- **No layout reads in the loop or pointer handler** (`main.js:26-28`) — `heroRect` is cached on
  scroll/resize.
- **Section accent is section-driven, never plate-driven** (`styles.css:557`).
- **Sections honour `scroll-margin-top: 70px`** — matches the docked nav height so anchors land clear.
- **Content is written from `profile.md`**; the design's placeholder copy is never ported
  (`index.html:155-160`).
- **Work plates run in IMPORTANCE order, inverting the design's chronology** — leading with the wet-lab
  biosensor would invert the intended identity (engineering first, biotech as the hint).

### Integration Points
- **New sections** insert into `[data-field]` in `index.html` between `#index` and `#work` (About), and
  between `#publications` and `#contact` (AI). Each needs: an `id`, `--accent`, a `section__label`,
  `[data-reveal]` indices, optional `[data-para]` blob.
- **`updateReveals()`** hangs off the existing `onScroll()` in `main.js:163-167`, beside `applyPara()`.
- **Contact links** extend the existing `#contact` block at `index.html:300-310`.
- **The composite media slot** modifies the Gel plate's `<figure>` at `index.html:183` + new CSS.
- **Two new palette stops** are added at `styles.css:14-17`.
</code_context>

<specifics>
## Specific Ideas

- **Sirio's composite idea (D-29)** — his own, unprompted: the vertical timelapse *next to* the parts
  plate, because the video's 9:16 leaves room. Geometry confirms it works (~32% / ~68%).
- **"Same bottleneck, one layer up"** — the accepted spine of the METHOD section (D-16).
- **The calculator story** (D-12) — Sirio's own childhood story, and the reason the philosophy is his
  rather than a take on a trend.
- **The GSD deck** — the source for the AI language, in his own words.
- ⚠ **STANDING LANDMINE — do not fabricate.** The design snapshots invent roles and publications and
  omit AGC entirely. Take **structure** from the design and **every fact** from `profile.md`.
  This bit twice in this discussion: Sirio said *"make smth up idk"* for the AI weak-points claim
  (D-17 — grounded it in his deck instead), and Claude asserted white backgrounds without checking
  (D-25 — Sirio was right). **When tempted to invent or assume: check the source.**
- **Sirio's voice** — first person, plain, concrete. He rejects corporate register ("ego-free" → out)
  and worries about anything a reader might not follow (the Latin → out). Prefer the specific, checkable
  claim over the flattering abstraction.
- **Sirio steers by reacting to rendered results**, not by specifying mechanism. Where he asked to be
  surprised (D-20), sketch it and let him choose.
</specifics>

<deferred>
## Deferred Ideas

### ⚠ ROADMAP CHANGES REQUIRED — apply via `/gsd-phase` before planning Phase 3

1. **NEW PHASE — the automation deep-dive, inserted immediately after Phase 2.**
   Sirio asked for the OT-2 case-study page (click through, hyperlight/warp transition, the full story,
   all the media, "something dynamic with some moving parts") **in this phase**. Redirected and agreed:
   it is Phase 4 work (PROJ-01 template + PROJ-02 page + PROJ-03 media/links + CONT-02) and would roughly
   triple Phase 2, re-introduce the media dependency the phase exists to dodge, and be rebuilt by the
   Phase 3 mobile pass (`ROADMAP.md:87`).
   **Shape:** one real OT-2 deep-dive page as a **vertical slice that proves the template**; Phase 4 then
   reuses it for the dispenser, EndoSense, EMBO and AGC.
   **Carries:** NAV-03 (below), the vendor-image decision (D-33), the slots-allocation diagram and the
   protocol-runner UI screenshot (D-26), the full media set, and the "moving parts" design discussion.
   **Sirio's words:** *"I would like this phase to actually build the page for the automation part, like
   clicking it, having the hyperlight animation, and landing in the page describing the automation project
   more in details, with all the explanations, the story, and all the media."*

2. **MOVE NAV-03 out of Phase 2 → into the new deep-dive phase.**
   NAV-03 ("tasteful transitions when moving between home and deeper pages") is **stranded**: no deeper
   pages exist until the deep-dive phase, so it is unbuildable and unverifiable as currently scoped.
   Sirio's request exposed a genuine roadmap flaw. Also update `REQUIREMENTS.md:113`.
   The V4 design already answers it — `startBurst` / `applyTrans` / `drawWarp` / `[data-warpov]`,
   deliberately not ported in Phase 1. **Phase 4 must not re-litigate the architecture**
   (fixed overlays + warp transition, not separate `.html` files) — `01-03-PLAN.md:94`.

### Other Deferred
- **MEDIA-02 formal pass** (compression targets, responsive `srcset`, lazy-loading) — Phase 4/5. Phase 2
  only drops assets into existing slots. But see D-31: do not ship 6.66MB autoplaying.
- **Martial arts / Viet Vo Dao precision thread** + the athletic awards — not selected for About (D-06).
  Available if the story ever needs more personality.
- **Hero typewriter word list/order/colours** — never explicitly confirmed with Sirio; trivially editable
  at `star-engine.js:72-81`.
- **AI Concierge (ASKAI-01..06)** — Phase 6. Distinct from CONT-03; do not conflate.
</deferred>

---

*Phase: 2-The Story*
*Context gathered: 2026-07-17*
