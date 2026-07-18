---
created: 2026-07-18
type: content-dependency
resolves_phase: 4
blocks: none
area: media / licensing
---

# Replace the OT-2 "before" visual placeholder (uncleared vendor render)

The OT-2 deep-dive (`site/index.html`, BUILD section) currently ships a **temporary,
uncleared** before-visual: `site/assets/media/ot2-platform-stock.png` — a manufacturer
render of the Opentrons OT-2 platform.

## Why this is here
At the Phase 2.1 before-visual decision checkpoint, Sirio made an **informed** call to ship
the vendor render as a stop-gap "what I started with" beat, consciously **waiving R-02**
(the plan rule against shipping uncleared vendor renders). The research found neither
Opentrons nor Embi Tec (RunOne) publishes an image-use grant, so the render is *not cleared*
for editorial reproduction. Naming the products in text is fine (nominative); reproducing the
render is the copyright issue.

## What to do (Sirio's stated intent)
Replace `ot2-platform-stock.png` with a **cleared** image — one of:
- a first-party bench photo of the manual/stock starting point (preferred), OR
- a licensed image / written permission from the manufacturer, OR
- drop the before-visual entirely (the section stands on the CAD renders + timelapse).

## How to swap (MEDIA-01, one-line)
Drop the new file over `site/assets/media/ot2-platform-stock.png` (same name) — the markup +
`.device-frame--before` treatment already reference it. Then remove the "TEMPORARY / UNCLEARED
PLACEHOLDER" flags: the HTML comment above the `<figure class="device-frame device-frame--before">`
in `site/index.html`, and the placeholder note in `site/assets/media/README.md`. If dropping
instead, delete the `<figure>` and the file.

Provenance + full context: `site/assets/media/README.md` and Phase 2.1
`02.1-02-SUMMARY.md` (R-02 owner-waiver deviation).
