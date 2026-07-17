---
status: testing
phase: 02-the-story
source: [02-VERIFICATION.md]
started: 2026-07-17T15:49:00Z
updated: 2026-07-17T15:49:00Z
---

## Current Test

number: 1
name: Contact section full-height judgement
expected: |
  #contact has no `.section--full` floor (unlike #origin and #method, which do) —
  UI-SPEC OI-3, left open by Plan 02-02. Decide whether its shorter, padding-only
  closing treatment still reads as a "full-height section" for success criterion 1,
  or whether it should get the full-height floor too.
awaiting: user response

## Tests

### 1. Contact section full-height judgement
expected: A judgement call — #contact currently has no `.section--full` floor (unlike #origin and #method). Confirm the shorter closing treatment is acceptable, or ask for the full-height floor.
result: [pending]

### 2. New accent colours read as distinct on a real render
expected: --star-zuben (ORIGIN, bio-green) and --star-rigel (METHOD, indigo/cyan) each visibly "own their own light" and read as distinct from each other and from neighbours — especially the rigel→sirius (METHOD→Contact) adjacency, the closest colour pairing on the page. Sirio has not yet seen either accent rendered.
result: [pending]

### 3. GitHub profile supports the Contact link (D-23)
expected: Review github.com/SirSirio as a stranger would. Either the profile is strong enough to support the Contact section's GitHub link, or the link should be reconsidered.
result: [pending]

### 4. The cut METHOD "skills" line (OI-2)
expected: In METHOD's Discuss & Design phase, the Claude-invented "skills" line was deliberately cut rather than shipped as a guess. Either supply a one-line replacement in Sirio's own words, or confirm the loop reads fine without it.
result: [pending]

### 5. Motion pacing feels readable, not rushed
expected: Scroll end-to-end and time the calculator (~19-21s) and the two tracks (DIGITAL ~2.4s, PHYSICAL ~5.2s). Each beat/phase/line should be legible before the next arrives — nothing needs re-reading. (Values are the plan's floor; expect Sirio may want them slower.)
result: [pending]

### 6. Reduced-motion fix confirmed on a real OS setting
expected: With the OS "reduce motion" setting ON, the OT-2 clip shows as a paused poster frame with visible native `controls` (not playing), and scrolling produces no residual translate/parallax on any element. (Already confirmed under DevTools emulation; this is the real-OS confirmation of the just-closed MOTION-02 fix.)
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps
