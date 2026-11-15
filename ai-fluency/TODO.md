# AI Fluency: to do

Sub-page *How I work with AI* on the portfolio, plus a LinkedIn post about the course.
Content and copy: [brief.md](brief.md). Last updated 14 Nov 2026.

## Folder

```
ai-fluency/
  TODO.md        this list
  brief.md       content brief: page structure, copy, downloads, credits, diligence statement
  source/        the canvas exports (self-unpacking HTML; open in a browser)
  downloads/     what visitors get; copied into site/ when the page is built
    skills/      fluency-levels, prompt-4d-review (SKILL.md each)
    *.pdf        the sheets, once exported
```

The skills are also installed globally in `~/.claude/skills/`. Edit `downloads/skills/`, then copy to the global folder, so the two copies match.

## 1. Decide the page style (next)

Decided 15 Nov 2026:

- **Direction: A · Prompt as page.** Dark site with a warm accent. The hero is a prompt that types itself (`/fluency-levels 3 …`); the page then answers section by section like a structured AI reply. The sheets appear as lit paper objects in the downloads. Evokes Claude's feel, never Anthropic's logo or spark mark.
- **Placement: its own page** (e.g. `site/ai.html`), with its own link to share, linked from the main page and nav.
- **Skill demo: playable.** Pick Level 1/2/3 and a sample task, then see the question batches and the finished prompt. Pre-written, runs in the browser, no AI calls.
- **Wall photo: not now.** Use sheet renders; leave a slot for a photo later.

- **Accent: warm clay** (soft terracotta) on the prompt cursor, buttons and links only. The 4D colours appear only on 4D content.
- **Hero prompt: `/fluency-levels 3 build my How I work with AI page`.** To keep it true, the build actually runs through the skill at Level 3, and the demo shows those real batches.
- **Language: EN + IT at launch** (the site's toggle; the copy gets a humanize pass per language).
- **Order:** 1 Hero (prompt + *Download the toolkit* jump) · 2 The 4Ds · 3 Try it (demo) · 4 Toolkit (downloads) · 5 How I made it (steps tagged Human / Together / AI) · 6 How I use it (photo slot) · 7 Diligence statement · footer (credits + licence).

Still open:

- [x] Run `/fluency-levels 3` on this build; real batches, finished prompt and approved plan in [process/fluency-levels-run.md](process/fluency-levels-run.md)
- [x] Checkpoint 1: **Sketch 2 · The Composer** chosen (15 Nov 2026): big title with "AI" in clay, the request typing into a wide message box with a send button, toolkit as a tile grid (big stacked-sheets tile, wide one-pager tile, two skill tiles showing SKILL.md's opening lines). Sketch files: scratchpad `sketches/s2-composer.html`, to be rebuilt properly in `site/`.

## 2. Downloads

- [x] Export the 5 sheets to `downloads/ai-fluency-cheat-sheet.pdf` (A4) and the one-pager to `downloads/ai-fluency-one-page.pdf` (vector; content scaled to 97% for a bigger bottom margin, same layout). Re-export: [export/README.md](export/README.md)
- [x] Check the boxes print white, not dark (light boxes stay light)
- [x] PNG/WebP previews of each sheet in `downloads/previews/`
- [x] One-line footer on every PDF page: *Made with Claude & Gemini, reviewed by Sirio Feltrin · Based on the AI Fluency Framework (Dakan & Feller), CC BY-NC-SA 4.0 · sirsirio.github.io/MyPortfolio/ai.html*; AI/licence line at the end of each download `SKILL.md`
- [x] Skill descriptions shortened under claude.ai's 200-character limit; zips rebuilt
- [ ] After the skills are final: copy `downloads/skills/*` to `~/.claude/skills/` (Sirio: "finish work on them first")
- [x] Install notes: [downloads/INSTALL.md](downloads/INSTALL.md) (Claude apps, Claude Code, Antigravity; checked 15 Nov 2026)
- [ ] Decide between "eliminates" and "100%" on the Diligence line, and apply it to both sets
- [ ] Optional: copy the new Prompt coach line 1 to the one-pager
- [ ] Optional: the full 8-sheet poster as a "long version"

## 3. Proof that I use it

- [ ] Test both skills on a real task. Until then, the page says *built*, not *I use*
- [ ] Save one real example (task, batch, finished prompt) for the *How I use it* section
- [ ] Photo of the sheets on the wall
- [ ] Download the course certificate from Anthropic Academy and save it in `00_Profile/Certificates/03_Courses_and_Training/`

## 4. Build the page

Decided 15 Nov 2026, after the run:

- **The main page's *How I work with AI* section gets a new band** between the calculator story and the two workflow cards: *The everyday layer: AI Fluency*, the 4Ds as chips, and a link to the new page. A one-line intro then frames GSD and the physical loop as "for bigger builds, two workflows on top". Sirio's framing: GSD is for complex tasks; the fluency framework is general and for everyday use. The existing text stays.
- **The new page needs its own title** (not *How I work with AI*, which the main section keeps). Working title *AI Fluency, in practice*. **In the humanize handoff, explicitly ask Gemini for 5 title proposals; Sirio picks one.** The hero request follows the title ("Build my AI Fluency page…").
- **Toolkit order: present *prompt-4d-review* before *fluency-levels*.**
- **Copy flow for the site:** build with draft strings in `site/i18n.js` → `site_i18n.py extract` (EN + `--lang=it`) → `/humanize` → fact check → apply → Sirio reviews on the page.

Built 15 Nov 2026 (draft copy, not yet humanized, not committed):

- [x] `site/ai.html`, `site/ai.css`, `site/ai.js`; strings `ai.*` + `method.fl.*` in `site/i18n.js` (EN + IT); `i18n.js` now honours `<html data-title-key>`
- [x] Main page: AI Fluency band in `#method` (index.html + styles.css, end of file)
- [x] Downloads copied to `site/downloads/ai-fluency/`, previews to `site/assets/ai/` (source of truth stays `ai-fluency/downloads/`)
- [x] Social preview card `site/assets/ai/og-ai-fluency.png` (**regenerate after the title is chosen**)
- [x] Checks: no console errors; no horizontal scroll at 1440 / 390 px; tabs (click + arrow keys), SKILL.md reader, install notes, all 4 downloads (200); IT version; zero em/en dashes
- [x] Humanize drafts: `05_Portfolio/Humanize/Humanize_AIPage_v1.draft.md` (EN, + T0 block: Gemini proposes 5 titles) and `Humanize_AIPage_IT_v1.draft.md`; keys in `Humanize/keys_ai.txt`
- [x] **Sirio:** ran `/humanize` on both drafts in Antigravity
- [x] Claude: checked, 6 fixes per language (FIX lines in the `.final.md` files), applied EN + IT, synced the band fallbacks in `index.html`; review files `Humanize_AIPage_v1.review.md` and `Humanize_AIPage_IT_v1.review.md`
- [x] **Title chosen: "Practical tools for AI Fluency"** (Gemini proposal 4; IT *Strumenti pratici per AI Fluency*); hero subtitle drops "practical" to avoid the repeat; OG card regenerated
- [x] **View ↗** buttons: the PDFs open in a new tab (sheet images clickable too)
- [x] Main-page band made prominent (`/fluency-levels 1`): clay box contrasting with the section's blue, bigger title, glowing 4D chips that light up in sequence on scroll, a clay button, the real sheets beside the text
- [x] Checkpoint 2: Sirio approved → **live 15 Nov 2026** at https://sirsirio.github.io/MyPortfolio/ai.html (Italian preview links checked too)
- [x] Cache: CSS/JS carry `?v=20261115`. **On the next change to styles.css, main.js, i18n.js, ai.css or ai.js, bump the tag**, and keep the `i18n.js?v=…` import identical in main.js, method.js and ai.js (two different tags = two copies of the language engine = broken EN/IT toggle)

## Still to do

- [x] Test both skills on a real task (Sirio, 15 Nov 2026); page now says they *run* / *step in* (`ai.use.p2`, `ai.use.p3`, EN + IT)
- [ ] Wall photo → replace the renders in *Where it lives* (Sirio: in a few days)
- [x] Course certificate: `00_Profile/Certificates/claude-academy-badge-ai-fluency-framework-foundations.pdf`
- [x] Cache tags now set in one go: `python ai-fluency/export/bump-cache.py <tag>` (current `20261115-2`)
- [ ] Copy the final `downloads/skills/*` to `~/.claude/skills/` (Sirio: once the skills are final)
- [ ] LinkedIn post (section 5)

- [ ] Build directly in the main chat. **No GSD** for this page (Sirio's call, 15 Nov 2026: too heavy for a simple page). Plan and checkpoints: [process/fluency-levels-run.md](process/fluency-levels-run.md)
- [ ] Link it from the main page and the nav; add the IT copy to `site/i18n.js` if the page is bilingual
- [ ] Optional: add one sentence to the statement saying the skills borrow ideas from other published skills (the Credits table already covers it)
- [ ] Replace every placeholder (name, links, file sizes, dates)
- [ ] Check CC BY-NC-SA fit: the portfolio is non-commercial, and the downloads keep the same licence
- [ ] Re-check the credit links (agensi.io 4d-analyzer, oh-my-claudecode, Lyra gist, superpowers) still resolve
- [ ] Test on a phone and in print preview

## 5. LinkedIn post

- [ ] Draft in `07_LinkedIn/2026-11_AI_Fluency/post.md` per [07_LinkedIn/README.md](../../07_LinkedIn/README.md); type: certificate + project
- [ ] Angle: not just a course, I turned it into tools I use (sheets on the wall, two skills), free to download
- [ ] Media: wall photo first, then a sheet preview; link to the page in the post or first comment
- [ ] Post after the page is live, so the link works
- [ ] Add it to [07_LinkedIn/posts.md](../../07_LinkedIn/posts.md)

## Housekeeping

- [ ] The skills now appear twice (global `~/.claude/skills/` and claude.ai `anthropic-skills:`); keep one
