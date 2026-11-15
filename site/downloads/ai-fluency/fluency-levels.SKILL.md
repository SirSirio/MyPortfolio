---
name: fluency-levels
description: Turns a task into a well-described prompt at 3 effort levels (Quick, Standard, Deep) using the AI Fluency 4Ds, then does it. Use with a level and a task, e.g. /fluency-levels 2 <task>.
---

# Fluency levels

Turn a task into well-described work before doing it, using the 4D framework: **Delegation, Description, Discernment, Diligence**. The level decides how many questions get asked, how much planning happens, and how much of the deciding stays with the user. A higher level means more thinking from the user.

## 1. Start

The skill is called with a level and a task, for example `/fluency-levels 3 design a test rig for the dispenser`.

- **Level given:** use it.
- **No level given:** recommend one in one line, with the reason, and wait for a yes or another number. Use this rule of thumb:
  - **Level 1:** a single output, cheap to redo, a familiar field.
  - **Level 2:** several parts, a specific audience, or a moderate cost if it goes wrong.
  - **Level 3:** 3+ steps, costly to redo, an unfamiliar field, or the result will be shared or signed.

Then restate the task in one line, so a misunderstanding shows up before any question gets asked.

## 2. Ask in batches

- Every batch opens with a progress line: `Batch 2 of 3 · 4 questions`. Give the total number of batches up front.
- Number the questions. Keep each one short and specific, and offer options or an example answer where that helps.
- The user may answer "you decide" or "skip" to any question. Choose a sensible default and list it under **Assumptions** in the final prompt.
- Ask the questions that fit the task. Drop any that clearly don't apply, or that the user's message already answers, but keep the batch structure and the counter.
- Stop asking once goal, constraints and success criteria are clear. Fewer batches is fine if the counter is updated.
- Do not start the work until the last batch is answered and any plan gate is passed.

### Level 1 · Quick: 1 batch, 3 questions. The AI makes most decisions.

1. **Goal:** what is this for, and what does "success" look like?
2. **Output:** format, length, audience.
3. **Limits:** anything it must never do, or must include?

### Level 2 · Standard: 2 batches, about 7 questions. Shared decisions.

**Batch 1, Delegation + Product**

1. Goal and why it matters: what does "success" look like?
2. Which parts stay with the user, and which go to the AI?
3. Context and sources: what should be attached or known?
4. Output: format, length, audience and their level.

**Batch 2, Process + Performance**

5. Method or steps: any approach, order or data to use?
6. What it must never do.
7. Thinking partner: narrow or explore · challenge or follow · detailed or concise.

**Plan gate:** propose a short plan of 3–6 bullets, and wait for approval or edits.

### Level 3 · Deep: 3–4 batches, about 12–15 questions. The user makes the key decisions.

**Batch 1, Delegation (Plan before I prompt)**

1. Vision: what does "success" look like, and why does it matter?
2. Constraints: deadline, budget, tools, data available.
3. Which parts need human judgment and must stay with the user?
4. Is this a familiar field? If not, add the Prompt coach batch below.

**Batch 1b, Prompt coach (only for an unfamiliar field)**

Before asking more, briefly explain:

- the key decisions or trade-offs an expert would define here,
- the standard tools, conventions and common pitfalls,
- what a good prompt for this task must specify.

Then ask the user to choose on the main trade-offs.

**Batch 2, Product + Process**

5. Context and sources to attach.
6. Exact output: format, length, structure, audience and level.
7. Examples of good output, or of what to avoid.
8. Method, steps and order. Which data to draw on.
9. What it must never do.

**Batch 3, Performance + Diligence**

10. Thinking partner: narrow or explore · challenge or follow · detailed or concise · explain why or just answer.
11. Should the AI ask before each step, or run to the next checkpoint?
12. Data: whose data goes in, and is this tool allowed for it?
13. Who will see the result, and do they need to know AI helped?

**Challenge (before the plan):** in 3 bullets, give the simplest version that would still meet the goal, the weakest assumption in the answers, and one thing an expert would do differently. The user can adopt or ignore each.

**Plan gate:** a full plan with the major tasks. Mark each one **Human · Together · AI · Agent**, and define checkpoints. Wait for approval. At each checkpoint, show the result and wait.

## 3. Show the finished prompt

After the last batch, show the prompt the answers add up to, in one block the user can copy and reuse elsewhere:

```
## Task
## Goal and what success looks like
## Context and sources
## Output: format, length, audience
## Process: method, steps, data
## Must never
## Thinking partner (how to behave)
## Assumptions (where the user said "you decide" or "skip")
```

Leave out sections that are empty at the current level. Then say "Starting now" and do the task. At Level 2 and 3, the plan gate comes before the work.

## 4. Do the task

Follow the finished prompt. For anything long, think before answering, not after. At Level 3, stop at each checkpoint.

## 5. Discernment after the output

**Level 1:** end with 2–3 short "Verify" flags: specific claims, numbers or assumptions most likely to be wrong.

**Level 2:** end with a short check, plus red flags where they apply:

- **Product:** accurate? fits the goal? adds value?
- **Process:** does the logic hold? stuck on one idea? rejected ideas back?
- **Performance:** right depth?
- **Red flags to scan for:** names, numbers, dates and citations · recent or niche topics · absolute words (always, never, 100%) · claims without a reason or source · answering a nearby question · caveats dropped between drafts.

**Level 3:** the user judges, and the AI supports that judgment:

1. Tag the key claims as fact / inference / guess.
2. List the facts the result rests on, and say how to check each one.
3. Give the strongest argument against the result.
4. Ask the user to decide: keep / change / discard, and what to fix. Use the feedback steps: problem → why → a fix → revise. If it's still off after two rounds, suggest rethinking Delegation: a different tool, approach or split of the work.
5. **Diligence check:** is it ready to sign? Does anyone need to be told AI helped? Offer a one-line diligence statement if it will be shared.
6. **4D self-grade**, one line each: Delegation / Description / Discernment / Diligence, each Strong · Adequate · Weak, with what would raise a Weak grade.

At every level, end with **Confidence** (high, medium or low, and why) and any **Open questions**.

## Rules

- Questions come before work, in batches, with the progress line. No surprise extra batches: if one is needed, say why and update the count.
- Never invent the user's preferences. A missing answer becomes a stated assumption.
- Keep the user's own words in the finished prompt where possible.
- If the user switches level mid-way ("go to 1", "make it 3"), adjust the remaining batches and say what changes.

---
Made with Claude and Gemini; content chosen and reviewed by Sirio Feltrin. Full AI statement: https://sirsirio.github.io/MyPortfolio/ai.html. Based on the AI Fluency Framework (Dakan & Feller) and the Anthropic Academy course, CC BY-NC-SA 4.0.
