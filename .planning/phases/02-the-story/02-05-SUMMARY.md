---
phase: 02-the-story
plan: 05
subsystem: media
tags: [media, video, ffmpeg, composite, blueprint, css, alpha, first-party, work]
requires:
  - "The #work section + plate 002 (Automated Gel Electrophoresis) media-slot (Phase 1 / MEDIA-01)"
  - "The .media-slot placeholder idiom + :has() empty-state contract (Phase 1)"
  - "The section accent map — #work resolves --accent to --star-antares gold (styles.css section system)"
provides:
  - "site/assets/media/ot2-timelapse.mp4 — the re-encoded first-party OT-2 timelapse, < 2MB with +faststart"
  - "site/assets/media/ot2-timelapse-poster.jpg — the MEDIA-01-mandated poster frame"
  - "site/assets/media/ot2-part-*.png — the four first-party CAD renders with genuine alpha (colour type 6)"
  - ".media-slot--composite + .media-slot--composite > video — the named MEDIA-01 deviation (D-29)"
  - ".blueprint + .blueprint__part — the accent-driven engineering-drawing plate with object-fit:contain (D-28)"
  - "README documentation of the composite as a geometry-only exception that does not weaken the first-party rule"
affects:
  - "site/index.html (plate 002 figure gains media-slot--composite, a video, and the blueprint plate)"
  - "site/styles.css (composite + blueprint CSS; the shipped .media-slot rules untouched)"
  - "site/assets/media/README.md (the composite exception section)"
tech-stack:
  added: []
  patterns:
    - "A composite media slot (.media-slot--composite) laying a height-driven 9:16 video beside a 1fr blueprint plate — a named, bounded deviation from the drop-in MEDIA-01 contract, defended by aspect ratio not background"
    - "(0,2,1) child override of the shipped (0,1,1) .media-slot>video rule — the shipped rule is left byte-identical; other slots depend on it"
    - "object-fit: contain on .blueprint__part (grandchildren of .media-slot, so the shipped > img rule never matches them) so sub-2:1 renders are never cropped"
    - "genuine PNG alpha verified by PARSING the channel (colour type + per-pixel alpha), never by eyeballing a viewer that composites onto white (D-25)"
key-files:
  created:
    - "site/assets/media/ot2-timelapse.mp4"
    - "site/assets/media/ot2-timelapse-poster.jpg"
    - "site/assets/media/ot2-part-adapter.png"
    - "site/assets/media/ot2-part-pcr-strip-racks.png"
    - "site/assets/media/ot2-part-buffer-ladder-rack.png"
    - "site/assets/media/ot2-part-rack-holder.png"
  modified:
    - "site/index.html — plate 002 composite figure (video + blueprint plate)"
    - "site/styles.css — .media-slot--composite, .media-slot--composite > video, .blueprint, .blueprint__part, 860px collapse"
    - "site/assets/media/README.md — the named composite exception"
decisions:
  - "D-29 is a NAMED, ACCEPTED MEDIA-01 deviation defended by ASPECT RATIO not background — recorded in plan, SUMMARY and README"
  - "CRF 28 missed the 2MB target (2.66MB); CRF 31 held at 2,054,229 bytes (1.96MB) with acceptable quality"
  - "D-27 resolved on a render: the baked-in blue-grey shadows read as an on-theme glow on the dark plate, not a dirty edge — nothing adjusted"
  - "D-26's two opaque files and D-33's two vendor renders remain untouched — Phase 2.1's"
metrics:
  duration: "~6 min"
  completed: "2026-07-17"
  tasks: 2
  files_changed: 9
---

# Phase 2 Plan 05: The Real OT-2 on the Card — Composite Media Summary

Filled the Automated Gel Electrophoresis card (plate 002) with Sirio's real,
first-party OT-2 media: a re-encoded timelapse of the actual robot running in the
actual DTU lab, beside a blueprint plate of the four CAD renders of the green parts
it is handling. The card now says "I designed the parts **and** automated the run"
in one glance — the render → real-thing pairing is the strongest asset in the set.
The clip ships under 2MB with a poster and `+faststart`; the four renders have
verified genuine alpha; the shipped `.media-slot` rules are untouched; the other two
Work cards keep their honest labelled placeholders; no vendor image was used.

## What Shipped

- **`site/assets/media/ot2-timelapse.mp4`** — the OT-2 DALSA source
  (`TimelapseOT2.mp4`, 6,656,975 bytes, 720×1280, H.264, 16.9s, already silent)
  re-encoded with `libx264 -crf 31 -preset slow -pix_fmt yuv420p -an
  -movflags +faststart` to **2,054,229 bytes (1.96MB)** — under the 2MB (D-31)
  gate. Zero audio streams (`-an`, free bytes on a silent timelapse).
- **`site/assets/media/ot2-timelapse-poster.jpg`** — poster extracted at
  `00:00:02` (56KB); confirmed on a rendered frame to show the OT-2 gantry with
  the pink PCR strip racks, green printed parts and blue gel tray — not an empty
  deck.
- **`site/assets/media/ot2-part-*.png`** — the four first-party CAD renders copied
  and renamed per the README convention (`ot2-part-adapter`,
  `ot2-part-pcr-strip-racks`, `ot2-part-buffer-ladder-rack`, `ot2-part-rack-holder`).
- **`site/index.html`** — plate 002's `<figure>` gains `media-slot--composite`
  (keeping `data-para="0.05"` and its `data-label`), a relative-`src` `<video>`
  (`muted loop playsinline autoplay` + a descriptive `aria-label`), and a
  `.blueprint` plate holding four `<img class="blueprint__part">`, each with a
  specific part-naming `alt`.
- **`site/styles.css`** — `.media-slot--composite` (grid `auto 1fr`,
  `var(--bg-0)` ground), `.media-slot--composite > video` (height-driven 9:16 at
  specificity (0,2,1)), `.blueprint` (accent-driven dark grid plate with inner
  glow), `.blueprint__part` (`object-fit: contain`), and an
  `@media (max-width: 860px)` single-column collapse that caps the portrait clip.
  The shipped `.media-slot > img, .media-slot > video` and
  `.media-slot:not(:has(> img, > video))` rules are byte-identical (both commits
  are pure additions after `.media-slot:hover`).
- **`site/assets/media/README.md`** — a new "one named exception" section
  documenting `.media-slot--composite`, its aspect-ratio (not background) reason,
  and that the plain drop-in contract still governs every other slot — without
  weakening the first-party or no-stock/no-AI rule.

## Tasks

| Task | Name | Commit |
| ---- | ---- | ------ |
| 1 | Re-encode the timelapse + fill the slot's video column | a403ab5 |
| 2 | The blueprint plate — the four CAD renders | f2be739 |

## Required Records (from plan `<output>`)

### D-29 — the MEDIA-01 deviation, named and accepted

`.media-slot--composite` is a **deliberate, acknowledged** deviation from MEDIA-01's
"drop-in plus one line, no CSS change" contract. Its **surviving reason is aspect
ratio, not background** (the background reason D-25 disproved): the slots are 16:9
with `object-fit: cover`, the timelapse is 9:16 and the four renders are 1.13:1 /
1.68:1 / 1.26:1 / 1.48:1 — a raw cover-crop would show only a narrow band of the
clip and would cut the renders. The composite lays a height-driven portrait video
beside a `contain`-fitted blueprint plate so both are legible. Recorded in the plan,
here, and in the README the next contributor will read. Only plate 002 uses it; the
plain contract still governs every other slot.

### The encode settings and byte size — CRF 28 did NOT hold

`-crf 28 -preset slow` produced **2,786,147 bytes (2.66MB)** — over the 2MB gate.
Raised to **`-crf 31`**, which held at **2,054,229 bytes (1.96MB)**, ~43KB under the
2,097,152-byte limit. A mid-clip frame and the poster were rendered and eyeballed:
clean, no visible blocking. Full settings: `libx264 -crf 31 -preset slow
-pix_fmt yuv420p -an -movflags +faststart`. Phase 4 owns the formal MEDIA-02 pass
(compression targets, responsive `srcset`, lazy-loading) — this plan filled one slot
and did not build that pipeline (D-31: do not over-engineer here).

### D-25 — genuine alpha, verified by parsing the channel (not eyeballed)

All four renders are PNG **colour type 6 (RGBA), 8-bit**. Verified by decompressing
the IDAT stream, reversing the PNG filters, and reading per-pixel alpha directly —
**not** by looking at a viewer (which composites alpha onto white and lies). Measured
fully-transparent-pixel share: Adapter **50.9%**, PCR Strip Racks **42.3%**,
Buffer/Ladder Rack **32.2%**, Rack Holder **49.9%**; **all four corners `a=0`** on
every file. These match the plan's recorded figures exactly. Kept as `.png` — the
alpha is load-bearing on the dark plate; none was converted to `.jpg`.

### D-27 — the one call research could not make, resolved on a render

The renders carry baked-in soft shadows in light blue-grey (~`167,196,225` at ~24%
alpha), authored for a light background. Composited onto the dark blueprint ground
(`#080a12`, standing in for `--bg-0` under the faint gold grid) and rendered, the
shadow lands as a **soft glow around each green part — it reads as an on-theme
bioluminescent halo lit from within, not a dirty edge.** This matches Sirio's report
that they looked fine on a dark presentation background. **Nothing was adjusted.**
The formal human sign-off is collected at end-of-phase (config `human_verify_mode:
end-of-phase`); the render-based judgement is on-theme.

### D-26 and D-33 — the opaque and vendor files remain Phase 2.1's

Untouched and never referenced: `Opentrons Slots allocation.png` (99.8% opaque) and
`UI protocol runner.png` (opaque, 371×888 portrait) — D-26's two opaque files; and
`Opentrons-OT2.png` and `RunOne Gel Electrophoresis System.png` — D-33's two vendor
marketing renders. R-02's finding stands: **neither Opentrons nor Embi Tec publishes
an editorial-use licence or press-kit grant**, so absent explicit permission both
vendor renders are all-rights-reserved by default. Phase 2.1 should take D-33's
option (b) Sirio's own line-art or (c) a frame from his own timelapse — or email both
vendors for written permission. Enforced here by grep gates (0 references).

### D-32 — the other two Work cards keep their honest placeholders

Plate 001 (Portable Precision Liquid Dispenser) and plate 003 (EndoSense) were **not
filled** and were **not faked**. `grep -c 'media-slot' site/index.html` = 3. A
`Media/EndoSense.gif` exists at the repo root but was deliberately not used — the
orchestrator noted the case-study slots remain Phase 4's.

### Note for the orchestrator — MEDIA-02 partial advance

**This plan partially advances MEDIA-02.** It fills only the OT-2 home-card slot on
plate 002. `REQUIREMENTS.md:126` traces MEDIA-02 to Phase 4, which remains true for
the case-study slots (plates 001/003) and the formal encoding pass (compression
targets, responsive `srcset`, lazy-loading). **The traceability table should record
Phase 2 as partially advancing MEDIA-02, or MEDIA-02 should be split.** Requirement
was not marked complete by this executor for that reason — left for the orchestrator.

## Deviations from Plan

None affecting scope. CRF was adjusted from 28 to 31 to meet the byte gate — the plan
explicitly instructed this ("If CRF 28 misses, adjust CRF — do not build a pipeline").
Not a discovered bug; the intended tuning path.

**Concurrent-actor note (not a deviation of this plan):** an unrelated commit
`d9f54b6` ("fix(site): restore synchronized star breath at 5s") landed on `master`
by another actor **between** this plan's Task 1 and Task 2 commits. It touches
`site/main.js` / `site/star-engine.js`, not any file this plan owns. Both of this
plan's commits (`a403ab5`, `f2be739`) are intact and correct; the concurrent commit
was left untouched.

## Known Stubs

None. All six media assets are real first-party files wired to real markup; the
composite renders with no JS at all (the poster and the four renders show under G-1,
JS disabled). Plates 001/003 keep their labelled placeholders by design (D-32) — an
honest "not shot yet", not an unwired stub.

## Threat Flags

None beyond the plan's `<threat_model>`. No remote `src` was introduced
(`grep -qE 'src="https?://' site/index.html` finds nothing — every asset is committed
and relative, closing T-02-21). The clip is < 2MB with `+faststart` and a poster
(T-02-22). No vendor image was used (T-02-23, avoid). No new inputs, endpoints, JS,
or packages — `site/` still has no `package.json` (T-02-26 / T-02-SC).

## Verification Gates

- **Byte gate (D-31):** `ot2-timelapse.mp4` = 2,054,229 bytes < 2,097,152. PASS.
- **Alpha gate (D-25):** all four `ot2-part-*.png` are PNG colour type 6, channel
  parsed. PASS.
- **No-hot-link gate (T-02-21):** no `src="http…"` in `site/index.html`. PASS.
- **Vendor-image gate (D-26/D-33):** 0 references to the two vendor renders or the
  two opaque files. PASS.
- **Honest-placeholder gate (D-32):** `grep -c 'media-slot' site/index.html` = 3. PASS.
- **Shipped-rule integrity:** `.media-slot > img, .media-slot > video` and
  `.media-slot:not(:has(> img, > video))` byte-identical (both commits pure
  additions). PASS.
- **G-1 (JS disabled):** composite is pure HTML/CSS; poster + renders show with no
  JS. Structural PASS; browser check at end-of-phase.
- **G-6 (zero dependencies):** no `site/package.json`; no JS added. PASS.

Both Task 1 and Task 2 automated gate blocks printed `GATES-PASS`.

## Self-Check: PASSED

- FOUND: site/assets/media/ot2-timelapse.mp4
- FOUND: site/assets/media/ot2-timelapse-poster.jpg
- FOUND: site/assets/media/ot2-part-adapter.png
- FOUND: site/assets/media/ot2-part-pcr-strip-racks.png
- FOUND: site/assets/media/ot2-part-buffer-ladder-rack.png
- FOUND: site/assets/media/ot2-part-rack-holder.png
- FOUND commit: a403ab5 (Task 1)
- FOUND commit: f2be739 (Task 2)
