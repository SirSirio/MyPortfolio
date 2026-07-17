# Phase 2: The Story - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-17
**Phase:** 2-The Story
**Areas discussed:** Todo cross-reference, Media (user-raised), Scroll order & sector numbering, About section — voice & depth, "How I Work With AI" — the claim, Contact close — which links

**Session note:** Sirio paused mid-discussion after the Media area ("I have to go now"), and the session
resumed from `02-DISCUSS-CHECKPOINT.json`. The two unanswered Media questions were re-asked verbatim on
resume, as he requested.

---

## Todo Cross-Reference

| Option | Description | Selected |
|--------|-------------|----------|
| Neither — close the typewriter one (Recommended) | Typewriter already built in Phase 1; media todo tagged Phase 4 | ✓ (partial) |
| Fold typewriter — needs rework | Revisit the word list | |
| Fold project media | Pull the Phase 4 media todo into Phase 2 | |

**User's choice:** Free-text — *"I would like actually to have some pictures already in this phase, so then I
can have the website in a sharable format after this phase. For the things that will be there for this phase,
there should be the media."*
**Notes:** Neither todo folded as written. Instead this opened the Media area below. Sirio separately
confirmed *"Typewriter done and ready to be closed"* — closed to `.planning/todos/completed/` with an
as-built record (commit `eae6bbe`).

---

## Media (user-raised)

### Scope check — is media in Phase 2 scope creep?

Not asked as a question; resolved by evidence. `ROADMAP.md:5` and `:104` pre-authorize media landing before
Phase 4 ("can be dropped in *before* this phase at any time", "not a gate on Sirio"), and
`site/assets/media/README.md` guarantees fill = "drop-in plus one line. No CSS change, no JS change, no build
step." **Accepted as in-scope without a scope-creep redirect.**

### Render treatment on the dark page

| Option | Description | Selected |
|--------|-------------|----------|
| Blueprint plate treatment (Recommended) | Dark plate, faint grid, accent glow per section | ✓ |
| Contain on dark, no plate | `object-fit: contain`, render floats on the deep field | |
| Raw drop-in, white and all | Paste as-is per MEDIA-01 | |

**User's choice:** Blueprint plate treatment
**Notes:** ⚠ **The question's premise was wrong.** It was framed as "your CAD renders are
white-background" — Sirio pushed back: *"the PNG images I shared… are png but with transparent background,
you should not have issues inserting them as they are… They were in a presentation with dark background and
worked fine."* Alpha-channel verification proved him right (four renders, 32–51% fully transparent, all
corners `a=0`). Claude's error came from viewing the images — viewers composite alpha onto white, making
transparent and white-backed PNGs indistinguishable. **The decision survived the correction** because its
real justification is aspect ratio (renders are 1.13:1–1.68:1 vs the 16:9 slot), not background.
Two files *are* genuinely opaque white (`Opentrons Slots allocation.png` 99.8% opaque; `UI protocol
runner.png`) — neither is used in Phase 2.

### The 1-of-3 slot gap

| Option | Description | Selected |
|--------|-------------|----------|
| Fill what I have, placeholders stay | One real card, two placeholders | |
| I'll supply the other two now | All three cards land real | ✓ |
| Show only the card that has media | Drop the media-less slots entirely | |

**User's choice:** I'll supply the other two now
**Notes:** Fallback recorded: placeholders stay if the media doesn't arrive. Does not block the phase.

### Gel Electrophoresis card slot *(re-asked on resume)*

| Option | Description | Selected |
|--------|-------------|----------|
| Composed plate of the 4 custom parts (Recommended) | 4 renders on one blueprint plate | |
| Single hero part render | One part, simplest | |
| Deck slots allocation diagram | Systems/protocol thinking | |
| Your protocol runner UI screenshot | Proof he shipped an app | |
| **Composite: timelapse + parts plate** *(revised option set)* | 9:16 video + 4 renders side by side | ✓ |

**User's choice:** Composite — timelapse + parts plate
**Notes:** Sirio's own idea, and it superseded the original option set: *"I would like to have shown the
video of the pipetting robot (timelapseOT2). This is vertical, so I believe there will be space for the
composed plate of the 4 custom parts. But I am open to your suggestions."* He had added
`TimelapseOT2.mp4` and renamed the folder to `Opentrons-OT2 DALSA media/` between turns. Geometry confirmed
(~32% video / ~68% plate). Flagged as a deliberate MEDIA-01 deviation (needs CSS) and a perf risk (6.66MB).

### Vendor images *(re-asked on resume)*

| Option | Description | Selected |
|--------|-------------|----------|
| Agree — don't use them (Recommended) | Manufacturer product renders; MEDIA-01 first-party rule | |
| Use OT-2 shot as context, clearly framed | Caption as the platform he programmed | |

**User's choice:** Neither — **unresolved**, deferred to the deep-dive phase.
**Notes:** Sirio made a real argument for keeping them: *"These two are important to show what I started
with. I had the RunOne and the OT2 as starting materials, and I managed to integrate them, using the OT2 for
the most time consuming and painful point (I knew that because of the interviews I ran)…"* He asked:
*"Maybe a reference and rights to use should be done? I am not sure if I can just take some picture online
and use them in my website, maybe just an acknowledgement?"*
**Claude corrected the premise:** acknowledgement does **not** grant a licence — attribution and permission
are separate. Practical risk on a personal portfolio is very low, but low risk ≠ permitted. Noted that his
own timelapse shows the real OT-2, making the vendor render largely redundant *and* better storytelling.
Alternatives recorded (his own photos / his own line-art / a timelapse frame / check press-kit terms).
Not needed for Phase 2's composite.

### ⚠ Scope creep — the automation deep-dive page

| Option | Description | Selected |
|--------|-------------|----------|
| New phase right after Phase 2 (Recommended) | Deep-dive as a vertical slice proving the template | ✓ |
| Keep roadmap as-is, deep-dive in Phase 4 | Zero rework, slowest | |
| Mobile first, then deep-dive | Honours the mobile-baseline reasoning exactly | |
| Build it into Phase 2 anyway | Everything at once | |

**User's choice:** New phase right after Phase 2
**Notes:** Sirio asked for the case-study page in this phase: *"I would like this phase to actually build
the page for the automation part, like clicking it, having the hyperlight animation, and landing in the page
describing the automation project more in details, with all the explanations, the story, and all the media.
In my mind, should be something dynamic with some moving parts."*
Redirected per the scope guardrail: it is four Phase 4 requirements (PROJ-01/02/03 + CONT-02), would roughly
triple the phase, re-introduce the media dependency Phase 2 exists to dodge, and be rebuilt by the Phase 3
mobile pass (`ROADMAP.md:87`). **Sirio's instinct was not wrong, though** — it exposed a genuine roadmap
flaw: NAV-03 is stranded in Phase 2 with no deeper pages to transition to. Both changes require `/gsd-phase`.

---

## Scroll Order & Sector Numbering

**Not asked (already decided):** the section order itself. `PROJECT.md:24` locked
"Hero → Story/About → Featured Projects → How I Work With AI → Contact" at project level. Presented as
carried-forward rather than re-litigated.

### Numbering scheme

| Option | Description | Selected |
|--------|-------------|----------|
| Renumber — six numbered sectors (Recommended) | 01 ORIGIN · 02 WORK · … · 06 TRANSMISSION | |
| Keep 01–04, new sections unnumbered | About + AI as unnumbered interludes | ✓ |
| Number only About, AI stays an interlude | Middle path | |

**User's choice:** Keep 01–04, new sections unnumbered
**Notes:** Chose against the recommendation. Accepted consequence: the Mission pill index won't jump to
About/AI; they read as quieter interludes rather than peers of the work.

### Accent colours

| Option | Description | Selected |
|--------|-------------|----------|
| Add two new stops (Recommended) | Bio-green for ORIGIN, indigo/cyan for METHOD | ✓ |
| Reuse existing stops | No palette change | |
| One new stop, one reused | Middle path | |

**User's choice:** Add two new stops
**Notes:** Combined with the unnumbered choice, this yields a coherent position — the new sections are
quieter in hierarchy but own their own light. The bio-green finally puts the "bioluminescence" the project
is named for on the page.

---

## About Section — Voice & Depth

### Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Three-beat journey (Recommended) | Lab years → realisation → pivot | ✓ |
| One tight paragraph | Fast, respects 30 seconds | |
| Longer, scene-driven | Most personality, risks essay | |

**User's choice:** Three-beat journey

### Threads

| Option | Description | Selected |
|--------|-------------|----------|
| Repetition is the bottleneck | The spine of the pivot | ✓ |
| Martial arts → precision | Viet Vo Dao, broken prototypes as data | |
| Domain-flexible, biotech as edge | Product design is the constant | ✓ |
| Ego-free collaboration | Feedback about the product, not the ego | ✓ *(reframed)* |

**User's choice:** Repetition, domain-flexible, collaboration. **Martial arts rejected.**
**Notes:** Sirio rejected the framing while keeping the substance: *"Ego-free: do not mention the ego, this
should be professional. Frame it like I like working with people, and that boosts me, and that I find joy in
other people enjoying what I create… And that working in teams also boosts me. Other suggestions on how to
frame it properly? Anyway, this should be a small part of the thing, maybe one/2 sentence max."*

### Collaboration framing

| Option | Description | Selected |
|--------|-------------|----------|
| The handover moment (Recommended) | "watching someone pick the thing up and use it" | |
| Built for people, sharpened by people | Two clean clauses, fast scan | ✓ |
| Feedback is the instrument | Collaboration as engineering method | |

**User's choice:** Built for people, sharpened by people
**Notes:** Chose against the recommendation. Drafts were grounded in `profile.md:244`, not invented.

---

## "How I Work With AI" — The Claim

**Framing offered first:** the section is the About story's insight one layer up — repetition in the lab →
automate it; repetition in thinking → point AI at it. Accepted and now load-bearing (D-16).

### The claim

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit — the site is exhibit A (Recommended) | State plainly the page was AI-built under his direction | |
| Philosophy first, site as a quiet footnote | Mention the site only briefly | |
| Philosophy only — no meta claim | Never claim the site | |

**User's choice:** Free-text — *"In between the explicit and the philosophy first option."*

### Form

| Option | Description | Selected |
|--------|-------------|----------|
| A short manifesto — few sharp lines | Terse, declarative | ✓ |
| Named principles (Recommended) | "The tool is not in charge" etc. | |
| Flowing prose | Like the About section | |

**User's choice:** Short manifesto
**Notes:** Sirio added substantial content requirements: *"Also include that AI is very good for
documentation. I would like to mention the GSD framework (I did this one already: [deck link])… I would like
to pass the message that AI is used to enhance the design process by focusing on possible weak points (make
smth up idk — just a way to enhance that reasoning with AI is actually good) and that the direction that I
(I DO!) decide to make about the design, are turned into reality by AI. So AI works by shortening the gap
between idea and final product (especially when digital)."*
⚠ **"Make smth up" was declined.** His own deck already says it better — *"Discusses each design decision,
models the physics, and processes the experimental results"* — so the claim was grounded in a real source
rather than fabricated. He also asked to be surprised on UI/animation and wants `/gsd-sketch` versions.

### Manifesto direction

| Option | Description | Selected |
|--------|-------------|----------|
| "Same bottleneck, one layer up" (Recommended) | Opens on the bridge from About | ✓ |
| "Direction is the job" | Leads with the human-in-charge claim | |

**User's choice:** "Same bottleneck, one layer up"

### Deck link

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — link it (Recommended) | Quiet "see the method ↗" | ✓ |
| No link — self-contained | Don't send visitors off-site | |
| Link, but save it for the deep-dive page | Keep the home section clean | |

**User's choice:** Yes — link it

### The calculator story

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — open the section with it (Recommended) | Lead on the teacher's line | ✓ *(with rewrite)* |
| Yes — but keep it to one line | A single compressed nod | |
| No — keep the manifesto as drafted | Leave the childhood story out | |

**User's choice:** Open with it, **but rephrase away from the Latin**
**Notes:** Surfaced by Claude from `profile.md:373` during the Contact research — not previously in play.
Sirio: *"Use the calculator part, but I am afraid the 'cum grano salis' will not be understood by the most,
so rephrase it. You can open the section with it yes."* Claude noted his instinct was underselling the
problem: in English "take it with a grain of salt" means *be sceptical*, which is **not** his meaning — the
idiom would actively mislead, not merely puzzle. Latin dropped; philosophy retained. This supersedes the
phrase's use in `PROJECT.md:48` and `CLAUDE.md`.

### The teacher's line

| Option | Description | Selected |
|--------|-------------|----------|
| "…only if you already know what you're asking it" (Recommended) | States the method | ✓ |
| "…with your head switched on" | Warmer, more conversational | |
| "…as long as you're the one doing the thinking" | Most direct to the AI argument | |

**User's choice:** "…only if you already know what you're asking it"

---

## Contact Close — Which Links

| Option | Description | Selected |
|--------|-------------|----------|
| LinkedIn (repeat from nav) | Where a recruiter looks once decided | ✓ |
| GitHub (github.com/SirSirio) | He's a builder; the repo is public | ✓ |
| iGEM wiki — EndoSense | "public, verifiable record" per profile.md:11 | ✓ |
| CV (repeat from nav) | Last thing on the page | |

**User's choice:** LinkedIn + GitHub + iGEM wiki (email is a given). **CV not repeated.**
**Notes:** The GitHub caveat was flagged and accepted — a sparse profile can undercut the claim; worth a
look before launch.

---

## Claude's Discretion

Per the established pattern (Sirio delegates mechanism and steers by reacting to rendered results), these
were explicitly *not* asked:

- How the reveal is wired (porting `updateReveals()`, thresholds, stagger, re-arm)
- How NAV-01's "full-height sections" is interpreted (currently padding-sized, not `100vh`)
- Whether the warp burst ships (resolved anyway — it left with NAV-03)
- Exact values for the two new palette stops
- Video encoding/compression approach
- Blueprint plate construction and the composite's CSS

**Explicitly NOT discretionary:** the METHOD section's UI/animation → `/gsd-sketch`, Sirio chooses.

---

## Deferred Ideas

- **NEW PHASE — automation deep-dive**, immediately after Phase 2 (agreed). Requires `/gsd-phase`.
- **MOVE NAV-03** out of Phase 2 into that phase — it is stranded here. Requires `/gsd-phase` +
  `REQUIREMENTS.md:113`.
- **Vendor-image decision** (D-33) — deferred to the deep-dive phase; researcher to check Opentrons /
  Embi Tec press-kit terms.
- **The slots-allocation diagram + protocol-runner UI screenshot** — deep-dive page candidates (both need
  white knocked out).
- **MEDIA-02 formal encoding pass** — Phase 4/5.
- **Martial arts thread + athletic awards** — not selected; available if the story ever needs more personality.
- **Hero typewriter word list/order/colours** — never confirmed with Sirio; trivially editable.
- **AI Concierge (ASKAI-01..06)** — Phase 6. Distinct from CONT-03.

---

## Research Directive (Sirio's explicit ask)

*"I would like you to do some research on good dynamic content for the page, so you can be inspired by what
people are doing for good websites."* → Recorded as **R-01** in CONTEXT.md. The researcher must survey real
high-quality sites for motion/dynamic-content patterns rather than invent, biased toward motion that reads as
"automation" (`PROJECT.md:28`) and toward what stays cheap on mobile.
