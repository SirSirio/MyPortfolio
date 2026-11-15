# The real run: fluency-levels, Level 3, on this page

Recorded as it happened, from 15 Nov 2026. The page's *Try it* demo is built from this file,
so keep the questions and answers as they were asked and given. Edit for length only.

## The request

Typed command: `/fluency-levels 3 build my How I work with AI page`

Plain words, as the hero will show it (decided after Sirio's note that the command alone
is unreadable to visitors):

> Build my "How I work with AI" page. It matters, so ask me the important questions first.
>
> using my fluency-levels skill · deep mode

**Restated task:** design and build a separate *How I work with AI* page on the portfolio that
shows I practise the AI Fluency framework (4Ds, playable skill demo, how I made it and use it)
and lets anyone download the 5-page sheet, the one-pager and both skills. Dark site,
warm-clay accent, EN + IT.

## Decided before the run

Direction *Prompt as page* · its own page · playable demo · no wall photo yet (renders,
photo slot) · warm-clay accent · EN + IT at launch · order: hero, 4Ds, try it, toolkit,
how I made it, how I use it, diligence, footer. Details: [../TODO.md](../TODO.md).

## Batch 1 of 3 · 4 questions · Delegation

| # | Question | Answer |
|---|---|---|
| 1 | What does success look like? Proposed: (a) a recruiter gets what AI Fluency is and that I practise it in 30 s; (b) a friend downloads and installs a skill in under 2 min; (c) I'm proud to put the link on LinkedIn and my CV. | "ok I agree!" |
| 2 | Constraints: is there a deadline? | "It doesn't really matter." No fixed date. |
| 3 | Which parts stay with me? Proposed: I decide mockups, final wording, demo tasks, go-live; copy drafts together; AI builds. | "My role should be review and decision making, the rest is yours." |
| 4 | Is web design a familiar field? Add the Prompt coach batch? | "Yes, that would be nice to learn." Batch 1b added. |

## Batch 1b · Prompt coach · 4 choices

Explained first: the trade-offs (motion vs speed, show vs link, demo honesty, download
formats), the standard tools and pitfalls (plain HTML/CSS/JS like the site; social preview
card for LinkedIn; AI-page tells), and what a good prompt for this must specify.

| # | Trade-off | Choice |
|---|---|---|
| 1 | Motion: calm / medium / rich | **Medium.** Reply streams in section by section, the demo animates, sheets tilt slightly on hover. |
| 2 | Sheets: previews that open full size / small previews + download / full sheets inline | **Small previews + download.** |
| 3 | Demo: one task × three levels / three levels × three tasks | **One task, three levels**, all real runs (Levels 1 and 2 to be run on the same task). |
| 4 | Skills: .zip + read on page + install steps / raw .md | **.zip ready for Claude, readable on the page, short install steps per app.** |

## Batch 2 of 3 · 5 questions · Product + Process

| # | Question | Answer |
|---|---|---|
| 5 | Extra sources: 8-sheet poster as long version / link to the course / both / neither | **Link to the course** only. No 8-sheet poster. |
| 6 | Voice: practical and plain / warm and personal / precise and technical (all first person) | "I prefer impersonal for this type of things." |
| 7 | Pages you like or dislike? | "I don't really know." → Claude decides, from the design read. |
| 8 | Method: mockups → EN copy → Gemini humanize + fact check → IT → build → checks. Keep humanize? Who writes the Italian? | "I will review the text only after the humanization by Gemini and on the page itself." Wants **a few sketches, medium effort**, picks the best, then Claude builds the whole thing. |
| 9 | Must never: Anthropic logo / endorsement · "I use this daily" before testing · live AI calls · invented numbers or quotes · AI-page clichés | "All good!" |

## Batch 3 of 3 · 5 questions · Performance + Diligence

One question added (10) to resolve the voice answer; count updated from 4 to 5.

| # | Question | Answer |
|---|---|---|
| 10 | Impersonal voice: body impersonal, title + diligence statement first person / fully impersonal with a new title | **a.** Body impersonal; title and statement stay first person. |
| 11 | Thinking partner: concise, push back only where it hurts clarity, honesty or speed; explain on request | "y" |
| 12 | Checkpoints: (1) sketches, (2) finished page with humanized EN + IT, then go-live | "y" |
| 13 | Show this run's questions and answers publicly in the demo? | "Yes, but how do you have in mind to show this? Is this the demo? I think it is not necessary and it would be too long." → clarified below. |
| 14 | Add a sentence to the diligence statement saying the page was built with Claude through the same process? | "Yes, add it." |

**On 13, clarified:** the demo is one panel with a Quick / Standard / Deep switch showing, per
level, how much it asks, 2-3 of the real questions, and a prompt excerpt. No personal
answers on the page; this file stays in the project folder as the record. Sirio then chose
the full page, read as a yes to this panel.

## Challenge

| Bullet | Choice |
|---|---|
| Simplest version: hero + 4Ds + downloads + statement, no demo, no streaming | **Ignored.** "Go for the final page." |
| Weakest assumption: recruiters scroll. The first screen + main-page link card must carry the whole message | **Adopted.** |
| Expert move: test with two real people before launch | **Ignored.** Sirio tests it himself. |

## For the demo: the same task at Levels 1 and 2

The demo compares what each level *asks* for this one task. These are the questions the
skill's Level 1 and Level 2 rules produce for "build my How I work with AI page"; Level 3
is the real run above. No answers are shown on the page.

**Level 1 · Quick** · 1 round · 3 questions · the AI makes most decisions

1. What is this page for, and what does success look like?
2. Format, length, and who will read it?
3. Anything it must never do, or must include?

Prompt excerpt: `## Task` Build a "How I work with AI" page · `## Output` one page,
short, for recruiters · `## Must never` overclaim. Ends with 2-3 "Verify" flags.

**Level 2 · Standard** · 2 rounds · 7 questions · shared decisions · short plan to approve

1. What is the goal, and why does it matter?
2. Which parts stay with you, and which go to the AI?
3. What should be attached or known (sources, existing site)?
4. Format, length, audience and their level?
5. Any method, order or data to use?
6. What must it never do?
7. Narrow or explore · challenge or follow · detailed or concise?

Prompt excerpt adds `## Context and sources` · `## Process` · `## Thinking partner`,
then a 3-6 bullet plan to approve before any building.

**Level 3 · Deep** · 3 rounds · 13 questions here (+ a coaching round) · the user makes
the key decisions · challenge, full plan with checkpoints. Sample questions for the demo:
"Which parts need human judgment and must stay with you?" · "Is this a familiar field?"
(→ coaching round) · "Who will see the result, and do they need to know AI helped?"

## The finished prompt

```
## Task
Design and build "How I work with AI", a separate page on the portfolio
(site/ai.html), showing the AI Fluency framework in practice and offering
the toolkit as free downloads.

## Goal and what success looks like
(a) A recruiter gets what AI Fluency is, and that I practise it, within 30 s.
    The first screen plus the link card on the main page carry the whole
    message on their own.
(b) A friend downloads the files and installs a skill in under 2 minutes.
(c) I'm proud to put the link on LinkedIn and on my CV.

## Context and sources
ai-fluency/brief.md (structure, copy, credits, diligence statement) ·
the 5-page sheet and one-pager (source/) · both skills (downloads/skills/) ·
the existing site (dark, Space Grotesk / Hanken Grotesk / Space Mono) ·
this run (process/fluency-levels-run.md) · link to the Anthropic Academy course.

## Output: format, length, audience
One static page, EN + IT, for recruiters and curious peers.
Concept "Prompt as page": the hero shows a plain request ("Build my 'How I
work with AI' page. It matters, so ask me the important questions first.",
small label: using my fluency-levels skill · deep mode); the page answers
like a structured reply.
Order: hero (+ Download the toolkit jump) · the 4Ds · Try it (one panel,
Quick / Standard / Deep switch: question count, 2-3 real questions, prompt
excerpt; no personal answers) · Toolkit (small sheet previews + download;
skills as .zip, readable on the page, install steps per app) · How I made it
(steps tagged Human / Together / AI) · How I use it (photo slot) ·
Diligence statement (+ sentence: page built with Claude through the same
process) · footer (credits, CC BY-NC-SA 4.0).
Dark, warm-clay accent; 4D colours only on 4D content. Medium motion:
the reply streams in, the demo animates, sheets tilt on hover.
Body copy impersonal; title and statement first person. Every term
explained the first time it appears. Social preview card for LinkedIn.

## Process: method, steps, data
A few sketches (medium effort) → I pick one → EN copy + IT translation →
Gemini humanize → fact check against the brief and course → build →
checks (phone, motion off, print, speed, both languages) →
I review on the page → go-live.

## Must never
Anthropic logo or spark mark, or any hint of endorsement · "I use this
daily" before the skills are tested on a real task · live AI calls ·
invented numbers, results or quotes · AI-page clichés (fake screenshots,
filler words, em-dashes).

## Thinking partner (how to behave)
Concise. Push back only where clarity, honesty or speed would suffer.
Explain reasons only when asked. Stop at two checkpoints only.

## Assumptions (where I said "you decide" or "skip")
No deadline · visual references chosen by Claude from the design read ·
the demo is the short single panel · Claude writes the Italian, reviewed
on the page after the humanize pass · no 8-sheet poster.
```

## The plan (approved 15 Nov 2026)

Sirio approved it with one change: **no GSD workflow** ("too heavy for a simple website");
the page is built directly in the main chat. This is his explicit bypass of the portfolio
CLAUDE.md's GSD rule, for this page.

| # | Task | Who | Where |
|---|---|---|---|
| 1 | Export downloads: 5-page PDF, one-pager PDF, PNG previews, a .zip per skill; add the short AI statement + licence line to each | AI | subagent |
| 2 | Capture the real Level 1 and 2 questions on the same task for the demo | AI | main chat |
| 3 | 3 quick sketches of hero + toolkit (rough HTML, screenshotted) | AI | main chat |
| ⏸ 1 | Sirio picks a sketch (or mixes parts) | Human | |
| 4 | EN copy from the brief + IT translation, one humanize handoff file | AI | main chat |
| 5 | Run `/humanize` in Antigravity | Human | |
| 6 | Fact-check every block against the brief and course | AI | main chat |
| 7 | Build `site/ai.html`: page, demo, motion, social card, link from main page + nav | AI | main chat (no GSD) |
| 8 | Checks: 375 px, motion off, print, speed, EN + IT, mobile downloads, contrast, dash scan | AI | main chat |
| ⏸ 2 | Sirio reviews on the page; fixes; go-live approval | Human + AI | |
| 9 | Commit and push (site redeploys) | AI | main chat |

Agent briefs point to: `../TODO.md`, `../brief.md`, this file, `05_Portfolio/CLAUDE.md`,
`site/styles.css`, and the skills `design-taste-frontend` + `ui-ux-pro-max` to load first.
