# Media drop-in folder

This is where project images and clips live. Every media slot on the page is
**empty by design** — it renders a striped, labelled placeholder until you drop
a file here and paste one line of HTML.

Filling a slot is a **drop-in plus one line. No CSS change, no JS change, no
build step.**

---

## The one rule that is not negotiable

> **No stock imagery and no AI-generated imagery, ever.**

Only real, first-party material: photos of the actual device, real renders of
the actual CAD, real screenshots, real footage of the real robot. A portfolio
that says "I build things" and shows a stock photo of somebody else's pipette
undoes itself. An empty labelled placeholder is strictly better than a fake —
placeholders read as "not shot yet", fakes read as "not real".

Files must also be **committed to this repo** and referenced with a **relative
path**. Never hot-link a remote `src` — that hands a third party the ability to
change what your portfolio shows.

---

## How to fill a slot

Each slot in `site/index.html` looks like this:

```html
<figure data-para="0.05" class="media-slot" data-label="[ device render / gif ]"></figure>
```

Paste your asset **inside** the `<figure>`. That is the entire operation.

**A still:**

```html
<figure data-para="0.05" class="media-slot" data-label="[ device render / gif ]">
  <img src="./assets/media/liquid-dispenser.jpg" alt="The portable liquid dispenser on a bench">
</figure>
```

**A clip** (always give it a `poster` — it is what shows before the video
decodes, and on any connection that never gets there):

```html
<figure data-para="0.05" class="media-slot" data-label="[ project video / image ]">
  <video src="./assets/media/gel-electrophoresis.mp4"
         poster="./assets/media/gel-electrophoresis.jpg"
         muted loop playsinline autoplay></video>
</figure>
```

The striped placeholder and its label disappear on their own. Leave the
`data-label` attribute in place — it costs nothing and comes back automatically
if the asset is ever removed.

### Why it just works

`styles.css` styles the placeholder with
`.media-slot:not(:has(> img, > video))`. The moment the slot has an `<img>` or
`<video>` child, that selector stops matching and the stripes, dashed border and
label all switch off. The `<img>`/`<video>` rule then fills the box.

This uses `:has()` rather than `:empty` on purpose: `:empty` matches only
elements with *no child nodes at all*, and **whitespace counts as a text node** —
so a normally formatted `<figure>` with its closing tag on the next line would
never be `:empty`, and the placeholder would silently never appear.

---

## The one named exception: `.media-slot--composite`

The drop-in contract above ("drop-in plus one line, no CSS change") governs
**every slot but one**. The Automated Gel Electrophoresis slot on plate 002 is a
**composite** and carries the extra class `media-slot--composite`, which does add
CSS. This exception is **deliberate and accepted** — it exists for one reason:
**aspect ratio, not background.**

The slots are 16:9 with `object-fit: cover`. That plate had to show two things at
once: a **9:16 portrait** timelapse of the OT-2 running, and four CAD renders of
the printed parts at sub-2:1 ratios. A raw cover-crop of a portrait clip in a 16:9
box shows only a narrow horizontal band of it, and the same crop would cut the
renders. So `.media-slot--composite` lays the slot out as two columns — a
height-driven portrait `<video>` beside a `.blueprint` plate whose `.blueprint__part`
renders use `object-fit: contain` so nothing is cropped.

This changes nothing else. **The plain drop-in contract still governs every other
slot**, and the two rules that make a filled slot "just work"
(`.media-slot:not(:has(> img, > video))` and `.media-slot > img, .media-slot > video`)
are untouched. The exception is about geometry only — it does **not** weaken the
first-party rule or the no-stock/no-AI rule below, which are non-negotiable.

---

## Naming

- Lowercase, hyphenated, matching the project slug: `liquid-dispenser.jpg`,
  `gel-electrophoresis.mp4`, `endosense.jpg`
- One name per project; add a suffix for variants: `liquid-dispenser-detail.jpg`

## Formats

| Kind | Use | Notes |
|------|-----|-------|
| Stills | `.jpg` or `.webp` | `.webp` preferred when it wins on size |
| Clips | `.mp4` (H.264) | Widest support; **always pair with a `poster` still** |

Slots are **16 / 9**. Anything you drop in is `object-fit: cover`, so it will
fill the box and crop rather than distort — frame accordingly, and keep the
subject away from the edges.

## Sizing and encoding

Formally **Phase 4 (MEDIA-02)**. Phase 1 guarantees only that the slot accepts
the file and renders it correctly. Compression targets, responsive `srcset` and
lazy-loading are that phase's job — don't over-engineer it here. Just keep files
sensible in the meantime; recruiters open this on phones.
