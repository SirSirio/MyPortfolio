---
quick_id: 260718-cnw
type: quick
status: complete
created: 2026-07-18
completed: 2026-07-18
commit: ea7a091
files_modified:
  - site/index.html
---

# Quick Task 260718-cnw — Gel Electrophoresis card, problem-first rewrite

## What changed
Rewrote the single `<p>` under `<h3>Automated Gel Electrophoresis</h3>` on the
#work section (plate 002) so it tells a problem → approach → results story in
Sirio's voice, replacing the previous spec-list phrasing.

**New copy:** opens on the problem (gel electrophoresis is one of the most common
molecular-biology techniques; loading a gel is manual, sample-by-sample pipetting,
slow and error-prone) → the approach (Double Diamond: interviewed the lab's
students and researchers, mapped the workflow, confirmed manual loading is the
real bottleneck) → the solution and results (five 3D-printed Fusion360 components
+ a custom Opentrons OT-2 protocol; working prototype, up to 144 samples/run at
~10 min/gel; built solo at DALSA; graded 12/12).

## Decisions
- **Dropped the "~785-line Python protocol" detail** per Sirio — irrelevant to the
  story. Kept "a custom protocol on the Opentrons OT-2" without the line count.
- Kept the profile's naming conventions ("Fusion360 CAD tool", "Opentrons OT-2
  liquid-handling robot", "DALSA (DTU Arena for Life Science Automation)").
- `<h3>` heading and the `plate__meta` "Lab automation · 2025" tag untouched;
  plates 001/003 untouched.

## Verification
- Copy contains "bottleneck", "144 samples per run", "10 minutes per gel", "12/12".
- No "785" substring remains; no forbidden strings ("ego"/"grano"/"salis").
- Rendered in-browser (reduced-motion, reveals forced shown): reads cleanly in the
  card's left column beside the composite media, no overflow.
- Every claim traced to `../00_Profile/profile.md` (lines 87, 91-103, 301-309).

## Self-Check: PASSED
