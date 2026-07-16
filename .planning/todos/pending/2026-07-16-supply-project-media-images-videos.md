---
created: 2026-07-16
type: content-dependency
resolves_phase: 5
blocks: MEDIA-02
---

# Supply project media (images + videos)

Sirio needs to provide real images/videos to showcase the work. **These do not exist yet** —
`00_Profile/profile.md` carries no media, and the approved design ships every media slot as an
empty labeled striped placeholder.

## What's needed

One 16:10 image or video per Selected Work card, plus richer media for the Phase 5 case-study
pages. Candidates from profile.md:

- Portable liquid dispenser (thesis) — CAD renders, device photos, a dispensing clip
- Automated gel electrophoresis / DALSA OT-2 — rig photos, a run video
- iGEM EndoSense — team/lab photos, wiki figures
- AGC Biologics dashboards/app — screenshots (**check what's shareable / non-confidential**)

## Where they go

Phase 1 (MEDIA-01) builds the swappable pipeline: assets land in a documented folder under
`site/` and filling a slot is a drop-in + a one-line reference. So Sirio can add media at any
time without waiting for a phase — Phase 5 (MEDIA-02) is just the formal fill + web encoding pass.

## Notes

- Design rule: **no stock or AI-generated imagery** — placeholders stay until real assets exist.
- Check AGC material for confidentiality before publishing.
- Heavy assets get lazy-loaded in Phase 6 (PERF-02).
