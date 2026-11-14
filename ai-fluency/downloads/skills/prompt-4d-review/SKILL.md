---
name: prompt-4d-review
description: Review and improve an existing prompt against the AI Fluency 4D framework (Delegation, Description, Discernment, Diligence). Use when given a prompt to check, grade, critique or improve before sending it to an AI.
---

# Prompt 4D review

Take a prompt the user already wrote, grade it against the 4Ds, close the gaps with a few questions, and return an improved version. The point is to show what was missing, not only to rewrite the prompt.

## 1. Read it

- Restate in one line what the prompt is trying to get done.
- If the purpose is unclear, ask that one question first.

## 2. Grade it

Grade each item **Strong · Adequate · Weak · n/a**. Each grade gets one short reason that points to words in the prompt, or to what's missing.

| D | What to check |
| --- | --- |
| Delegation | Is the task right for AI? Is the human's part clear (decisions, final judgment)? Is the task too big for one prompt, so that it should be split? |
| Description · Product | Context and sources · the exact task · what success looks like · format and length · audience and level |
| Description · Process | Method, steps and order · data to use · what it must never do · plan before building, when the task is big |
| Description · Performance | Thinking partner: narrow or explore · challenge or follow · detailed or concise · explain or just answer |
| Discernment | Does it ask for anything checkable: sources, confidence, assumptions, fact vs guess? Is there a way to judge the result? |
| Diligence | Is any sensitive data being pasted in? Will the output be shared, and does disclosure matter? |

Also flag prompt mistakes from the course where they appear:

- assuming the AI can read your mind,
- several unrelated tasks in one prompt,
- vague success criteria,
- no examples where the style is easier to show than to describe.

## 3. Fill the gaps

- Ask one batch of up to 5 questions, only about the Weak items, most important first. The batch opens with `Gaps · N questions`. The user can answer "you decide" or "skip": that point becomes a stated assumption.
- If everything is Strong or Adequate, say so and go straight to step 4 with small polish only.

## 4. Return the improved prompt

- One copy-ready block. Keep the user's own words and structure wherever they work.
- Add only what the answers or clear defaults justify. No padding.
- Below it, a short **What changed** list: 3–6 bullets, each tied to a D.
- If the task is big enough (3+ steps, costly to redo, unfamiliar field), suggest running it through `fluency-levels` at level 2 or 3 instead of a single prompt.

## Rules

- Grade the prompt, not the person.
- Never invent the user's goals, data or constraints. Unknown means a question, or a labelled assumption.
- Keep the review short: the grades table, the questions, and the improved prompt.
