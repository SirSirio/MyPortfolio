---
quick_id: 260718-cnw
type: quick
slug: rewrite-automated-gel-electrophoresis-ca
created: 2026-07-18
files_modified:
  - site/index.html
---

<objective>
Rewrite the plate 002 "Automated Gel Electrophoresis" description on the #work
section so it reads problem-first, in Sirio's voice, per his steer: lead with the
problem, say briefly how he tackled it, then the results. Drop the irrelevant
"~785-line Python" detail. Every fact sourced from `../00_Profile/profile.md`.
</objective>

<task>
Replace the single `<p>` under `<h3>Automated Gel Electrophoresis</h3>` in
`site/index.html`. Structure:
1. **Problem** — gel electrophoresis is one of the most common molecular-biology
   techniques, and loading a gel is manual, sample-by-sample pipetting: slow and
   error-prone.
2. **Approach (brief)** — the Double Diamond process: interviewing the lab's
   students and researchers and mapping the workflow confirmed the manual loading
   is the real bottleneck. (profile.md:91-96, 301-309)
3. **Solution + results** — five 3D-printed components (Fusion360 CAD tool) run by
   a custom protocol on the Opentrons OT-2 liquid-handling robot; working prototype
   handles up to 144 samples per run at ~10 min per gel; built solo at DALSA (DTU
   Arena for Life Science Automation); graded 12/12. (profile.md:100-103, 87)

Constraints:
- Drop the "~785-line" script detail entirely (Sirio: irrelevant).
- Keep the profile's naming conventions: "Fusion360 CAD tool", "Opentrons OT-2
  liquid-handling robot", "DALSA (DTU Arena for Life Science Automation)".
- Invent no facts; do not touch the `<h3>` heading or the `plate__meta` tag.
- Only plate 002 changes; plates 001/003 untouched.

verify: `grep` the new copy contains "bottleneck" and the 144/10-min results, and
does NOT contain "785"; confirm no forbidden strings ("ego", "grano", "salis").
done: the description reads problem → approach → results and renders in-browser.
</task>
