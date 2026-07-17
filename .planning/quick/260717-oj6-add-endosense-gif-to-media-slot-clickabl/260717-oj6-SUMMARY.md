---
quick_id: 260717-oj6
slug: add-endosense-gif-to-media-slot-clickabl
description: Add EndoSense gif to media slot, clickable to iGEM wiki
date: 2026-07-17
status: complete
commit: 2ee8a3e
---

# Quick Task 260717-oj6 — Summary

## What was done

The EndoSense plate's media slot (was the striped `[ project image ]` placeholder)
now shows `EndoSense.gif`, and the image links to the DTU iGEM 2024 wiki, opening
in a new tab.

1. **Asset added** — `Media/EndoSense.gif` copied to
   `site/assets/media/endosense.gif` (first-party, committed, slug-named,
   relative-path — per `site/assets/media/README.md`; no hot-linking). The gif is
   1920×1080, i.e. exact 16:9, matching the slot's aspect ratio.

2. **Slot filled, clickable** — `site/index.html:251`, the EndoSense `<figure>` now
   contains
   `<a href="https://2024.igem.wiki/DTU-Denmark/" target="_blank" rel="noopener"><img src="./assets/media/endosense.gif" alt="…"></a>`.
   `data-label` left in place so the placeholder returns automatically if the asset
   is ever removed.

3. **CSS generalized for a clickable asset** — `site/styles.css`. The slot's
   placeholder auto-hide (`.media-slot:not(:has(> img, > video))`) and fill rule
   (`.media-slot > img, > video`) keyed on a **direct-child** image/video. Wrapping
   the `<img>` in an `<a>` makes it a grandchild, so both selectors stopped
   matching — the placeholder would have stayed and the image would not have
   filled. Added `> a > img` to the filled-test (both the base rule and the
   `::after` label) and to the fill rule, and made `.media-slot > a` a block that
   fills the 16:9 box so the whole area is the link hit-target.

## Verification

- Static/structural (deterministic — the `:has()` filled-test is exact):
  - EndoSense figure has `> a > img` → placeholder rules no longer match → stripes,
    dashed border and label are off; the gif fills the box; the whole box is the link.
  - The still-empty `[ device render / gif ]` slot (no children) → placeholder still
    shows. The composite slot (has `> video`) → still counts as filled. No regression.
  - Link attributes confirmed: `href=https://2024.igem.wiki/DTU-Denmark/`,
    `target=_blank`, `rel=noopener`; `src` is the relative repo path.
  - Served locally: `index.html` → 200, `assets/media/endosense.gif` → 200.
- **Not** visually driven in a browser: the Playwright MCP browser profile was
  locked by another session this run, so a live pixel/click check was not possible.
  Open `site/index.html` for a final eyeball.

## Files changed

- `site/assets/media/endosense.gif` (new)
- `site/index.html`
- `site/styles.css`

## Out of scope (unchanged)

- Compression / `srcset` / lazy-loading — Phase 4 (MEDIA-02), per the README.

Commit: `2ee8a3e`
