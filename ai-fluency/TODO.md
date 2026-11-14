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

- [ ] Choose a direction: a full sub-page with the star-engine background, or a calmer reading page that keeps the site's nav and type
- [ ] Decide how the "on my wall" proof shows: a real photo of the sheets by the desk is best
- [ ] Decide who comes first: recruiter (proof up top) or peer (downloads up top)
- [ ] Decide how the skills appear: download cards only, or with a short sample run
- [ ] Section mockups (one image per section) to react to before any code

## 2. Downloads

- [ ] Export the 5 sheets to `downloads/ai-fluency-cheat-sheet.pdf` (A4) and the one-pager to `downloads/ai-fluency-one-page.pdf`
- [ ] Check the boxes print white, not dark
- [ ] PNG previews of each sheet for the page's thumbnail cards
- [ ] Add the short AI statement and the licence line to each PDF footer and to the end of each `SKILL.md` (wording in brief.md, *Where it goes*)
- [ ] Decide between "eliminates" and "100%" on the Diligence line, and apply it to both sets
- [ ] Optional: copy the new Prompt coach line 1 to the one-pager
- [ ] Write the install notes for the skills (Claude chat, Claude Code, Antigravity); check the current instructions first
- [ ] Optional: the full 8-sheet poster as a "long version"

## 3. Proof that I use it

- [ ] Test both skills on a real task. Until then, the page says *built*, not *I use*
- [ ] Save one real example (task, batch, finished prompt) for the *How I use it* section
- [ ] Photo of the sheets on the wall
- [ ] Download the course certificate from Anthropic Academy and save it in `00_Profile/Certificates/03_Courses_and_Training/`

## 4. Build the page

- [ ] Build through GSD (`/gsd-quick` or a new phase), per the portfolio's CLAUDE.md
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
