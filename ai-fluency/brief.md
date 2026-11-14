# AI Fluency portfolio page: content brief

Nov 14, 2026 · @Sirio

## Purpose and audience

One portfolio page that shows how I work with AI: what I learned from Anthropic's AI Fluency course, the tools I built from it, and the files to download and use.

- **Message in one line:** I learned the AI Fluency framework, turned it into tools I use, and share them here.
- **Audience:** recruiters and hiring managers (hardware, product design, biotech), possible PhD supervisors, and peers who want the resources. A guide for building the page only; it stays out of the statement.
- **What a visitor should leave with:** (1) what AI Fluency is in 30 seconds, (2) proof of how I apply it, (3) downloadable files, (4) a clear statement of what AI did and what I did.

## Page structure and draft copy

Seven sections, top to bottom. The copy is a first draft to edit; it is written in your voice.

1. **Hero**
   - Title: *How I work with AI*
   - Line: *An AI Fluency toolkit I built while taking Anthropic's course, and use every day.*
   - Button: *Download the toolkit* (jumps to Resources)
2. **What AI Fluency is**
   - *AI Fluency is the ability to work with AI in ways that are effective, efficient, ethical and safe. The framework, by Rick Dakan and Joseph Feller with Anthropic, rests on four competencies, the 4Ds:*
   - Four cards, one per D, in the sheet colours: **Delegation** (what AI does, what I do) · **Description** (how I say what I want) · **Discernment** (is what came back any good?) · **Diligence** (am I using it responsibly?)
3. **What I made**
   - Thumbnail cards for the 5-page cheat sheet, the one-pager and the two skills, each with a one-line purpose and a download button (details under Downloads).
4. **How I made it**
   1. Took the course lesson by lesson and noted what struck me.
   2. Claude read each lesson and kept structured notes; I decided what mattered.
   3. Claude proposed content and layouts; I set the design rules and judged every sheet.
   4. Gemini paraphrased the text; Claude checked every line against the course for meaning.
   5. I edited wording and layout by hand until each sheet worked on my wall.
5. **How I use it**
   - The cheat sheets hang next to my desk while I work with AI.
   - *fluency-levels* runs before important tasks: Level 1 for quick ones, Level 3 when the work is costly to redo.
   - *prompt-4d-review* checks a prompt I already wrote.
   - Add one real example once you have tested the skills (see Checklist).
6. **Diligence statement** (from the section below)
7. **Credits and licence** (from Credits below), in the footer.

## Downloads

Four files, all under CC BY-NC-SA 4.0 because they build on the course. The PDFs are exported from the Claude canvases; the skills are plain markdown that works in Claude and in Antigravity.

| Resource | File | What it is for | Source |
| --- | --- | --- | --- |
| Cheat sheet, 5 pages | `ai-fluency-cheat-sheet.pdf` (A4) | Wall reference: Map, Delegation, Description, Discernment, Diligence | [canvas](https://claude.ai/artifact/2fSMKV7cedZygQPNgLymQe) |
| One page | `ai-fluency-one-page.pdf` (A4) | The whole process on one sheet | [canvas](https://claude.ai/artifact/GvYFPB8uSFxbTUUVQt9h34) |
| Skill: fluency-levels | `fluency-levels/SKILL.md` | Turns a task into a well-described prompt at 3 effort levels, then does it | [downloads/skills/fluency-levels/](downloads/skills/fluency-levels/SKILL.md) |
| Skill: prompt-4d-review | `prompt-4d-review/SKILL.md` | Grades an existing prompt on the 4Ds and returns an improved one | [downloads/skills/prompt-4d-review/](downloads/skills/prompt-4d-review/SKILL.md) |

Optional: the full 8-sheet poster ([canvas](https://claude.ai/artifact/UtyhddeM4SY3NDUnA7zfc5)) as a "long version". Each skill download needs two lines on how to install it in Claude and in Antigravity; check the current instructions when publishing.

## Credits and citations

No third-party code or text was copied into the skills. Their structure borrows ideas from the skills below, credited as inspiration. The sheets adapt the course, so the course licence applies to them.

| What | Credit | Licence | How it is used |
| --- | --- | --- | --- |
| Course and framework | [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations), Rick Dakan, Joseph Feller and Anthropic; AI Fluency Framework by Dakan and Feller | CC BY-NC-SA 4.0 | Source of all content; the sheets and skills are adaptations |
| prompt-4d-review | Idea inspired by [4d-analyzer](https://www.agensi.io/skills/4d-analyzer) (agensi.io): grading a prompt per D on a Strong / Adequate / Weak scale | Paid skill; its content was not seen | Concept only; own wording and steps |
| fluency-levels | Inspired by [deep-interview](https://github.com/Yeachan-Heo/oh-my-claudecode) (oh-my-claudecode): interview, then approval gate and challenger roles | MIT | Ideas: ambiguity-based stopping, challenge before the plan |
| fluency-levels | Inspired by [Lyra prompt optimizer](https://gist.github.com/xthezealot/c873effd9e74225ef3fcfbb9c3a341da): pick a mode from task complexity, allow override | Not stated | Idea: recommend a level when none is given |
| fluency-levels | Inspired by [brainstorming](https://github.com/obra/superpowers) (obra/superpowers): no build before approval | MIT | Idea: plan gate |
| Icons | [Phosphor](https://github.com/phosphor-icons/core) · [Lucide](https://github.com/lucide-icons/lucide) · [Tabler](https://github.com/tabler/tabler-icons) | MIT · ISC · MIT | Section and tile icons on the sheets |
| Fonts | Inter · Space Grotesk (Google Fonts) | SIL OFL 1.1 | Sheet typography |

Footer line for the page: *Based on the AI Fluency Framework by Rick Dakan and Joseph Feller and the Anthropic Academy course, CC BY-NC-SA 4.0. These resources are shared under the same licence.*

## Diligence statement

Final text, used as written.

> I made these cheat sheets and skills while taking Anthropic Academy's *AI Fluency: Framework and foundations* course, working with two AI tools:
>
> - **Claude** (Anthropic): read the course pages and transcripts, kept structured notes, proposed the content, and built the layouts and the two skills.
> - **Gemini** (Google, in Antigravity): paraphrased the sheet text so it reads naturally.
>
> Icons come from open-source sets (Phosphor, Lucide, Tabler).
>
> I chose what goes on each sheet, set the design rules, and wrote or rewrote key phrases. I reviewed every sheet and every line by hand. Claude checked each paraphrased line against the course material for meaning. The final result reflects my understanding of the framework and my own choices, and I take full responsibility for its content, accuracy and presentation.
>
> I'm sharing this disclosure because transparency about AI's role is one of the principles the course teaches.
>
> Based on the AI Fluency Framework by Rick Dakan and Joseph Feller, and the course by Dakan, Feller and Anthropic, licensed CC BY-NC-SA 4.0. This work is shared under the same license.

### Where it goes

- **Page:** the full statement as its own section, after the downloads.
- **PDFs and SKILL.md files:** a one-line footer pointing to it: *Made with Claude and Gemini; content chosen and reviewed by me. Full AI statement: \[page link\]. Based on the AI Fluency Framework (Dakan & Feller), CC BY-NC-SA 4.0.*

## Before publishing

The checklist lives in [TODO.md](TODO.md).
