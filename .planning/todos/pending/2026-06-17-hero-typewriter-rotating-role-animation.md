---
created: 2026-06-17T06:17:06.578Z
title: Hero typewriter rotating-role animation
area: ui
files:
  - .planning/ROADMAP.md
---

## Problem

Sirio wants a typewriter / rotating-role animation for the hero identity line (relates to **HERO-03**, the one-line identity statement — belongs in **Phase 2: The First Impression**).

Behaviour:
- Static, non-animating prefix: **"I'm a "**
- After it, a single word is typed out letter-by-letter, held briefly, then deleted letter-by-letter, then the next word is typed — cycling continuously.
- Words to cycle: **Engineer, Biotechnologist, Product Designer, Developer** (extendable — order/list to confirm).
- **Each term has a different color.**

This is the classic "typed.js / typewriter" effect. Reinforces the multi-disciplinary identity (design & engineering primary, biotech hint) right in the hero.

## Solution

TBD at Phase 2 plan time. Notes:
- Pure CSS/JS, no library strictly needed (a small custom typewriter loop), or a tiny lib (e.g. Typed.js) if convenient — keep it lightweight per the static-site / performance constraints.
- Respect `prefers-reduced-motion` (MOTION-02 spirit): when reduced motion is on, show a static role (or a simple fade) instead of the typing loop.
- Per-term color: map each role to a design-token accent color (defined in Phase 1's token system) so it stays on-theme with the chosen palette.
- Confirm final word list + ordering + each word's color with Sirio during Phase 2.
- Ensure the line doesn't cause layout shift as word length changes (reserve width / center).
