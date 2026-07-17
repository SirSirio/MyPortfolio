---
created: 2026-06-17T06:17:06.578Z
completed: 2026-07-16
title: Hero typewriter rotating-role animation
area: ui
resolved_by: Phase 1 (01-02-PLAN.md — hero star engine)
files:
  - site/star-engine.js
  - site/index.html
---

## Problem

Sirio wants a typewriter / rotating-role animation for the hero identity line (relates to **HERO-03**, the one-line identity statement — belongs in **Phase 2: The First Impression**).

Behaviour:
- Static, non-animating prefix: **"I'm a "**
- After it, a single word is typed out letter-by-letter, held briefly, then deleted letter-by-letter, then the next word is typed — cycling continuously.
- Words to cycle: **Engineer, Biotechnologist, Product Designer, Developer** (extendable — order/list to confirm).
- **Each term has a different color.**

This is the classic "typed.js / typewriter" effect. Reinforces the multi-disciplinary identity (design & engineering primary, biotech hint) right in the hero.

## Resolution — shipped in Phase 1, closed 2026-07-16

Delivered by the hero star engine, not deferred to Phase 2. Confirmed during
Phase 2 discussion; Sirio approved closing it as-is.

**Where it lives:** `site/star-engine.js:70-96` (`_startType()` / `_tick()`),
markup at `site/index.html:98-105` (`[data-art]` + `[data-typer]` + `.caret`).

Every point in the original request is met, and the roadmap's own phase framing
("Phase 2: The First Impression") is obsolete — the roadmap was reshaped and
Phase 2 is now "The Story".

| Asked for | Shipped |
|---|---|
| Static prefix | `<span>I am a</span>` — outside the animated span (`index.html:100`) |
| Type → hold → delete → next, cycling | `_tick()` loop with `deleting` state |
| Per-term colour | Each term carries its own `grad` linear-gradient, applied via `backgroundImage` |
| Lightweight, no library | Custom loop inside the existing engine; no dependency added |
| Respect `prefers-reduced-motion` | `if (this.reduced)` renders term 0 statically and never starts the loop |
| No layout shift | Handled by the `.typer` span + `[data-art]` article slot |

**Word list shipped (8, superset of the 4 requested):** Engineer · Designer ·
Developer · Biotechnologist · Product Maker · Lab Automator · Data Analyst ·
AI enthusiast.

A nicety beyond the request: `[data-art]` auto-selects the indefinite article
per term (`/^[aeiou]/i` → "an"), so it reads "I am **an** Engineer" but "I am
**a** Designer".

**Left open (not blocking):** the word list, its order, and each term's colour
were never explicitly confirmed with Sirio — the engine chose them. Revisit only
if he wants them changed; the list is a plain array at `star-engine.js:72-81`
and is trivial to edit.
