---
created: 2026-06-16T20:47:46.904Z
title: Add AI "ask me about Sirio" chat feature
area: ui
files:
  - .planning/ROADMAP.md
  - .planning/REQUIREMENTS.md
  - .planning/PROJECT.md
---

## Problem

Sirio wants a signature interactive feature: an **"Ask AI about me"** prompt bar — a chat-app-style input placed high on the page (candidate: new section #2 or #3 in the main scroll, so it's clearly visible) where a visitor can ask questions about Sirio and get answers grounded in his portfolio.

Desired behaviour:
- **Self-demoing:** on its own, the bar auto-types an example question (e.g. *"What is the most relevant project you've done so far?"*) and shows the AI answering — to instruct/invite the visitor to try it themselves.
- **Several example/suggested questions** the visitor can click or that cycle.
- **Answer style:** short, well-structured, with some **bold** phrases for scannability. Define/scope what it's allowed to talk about.
- **Grounding:** real questions answered by an LLM/API grounded on Sirio's portfolio content (profile.md and site content), tuned to represent him **favourably** ("make him look good") **without fabricating** — must stay truthful.

This is a strong differentiator and reinforces the project's core theme ("show what I can build with AI"). But it has implications that must be resolved before it lands in a phase:

- **Architectural conflict:** an LLM call needs a secret API key. This conflicts with the current PROJECT.md decision *"static site / GitHub Pages / no backend."* It CANNOT ship with the key exposed client-side. Options:
  1. Serverless function (Vercel / Netlify Functions / Cloudflare Worker) that proxies the LLM call and hides the key — would mean hosting (or at least the API route) moves off pure GitHub Pages, or a hybrid: static site on Pages + API on a Worker/Vercel.
  2. A pre-generated, fully client-side "fake AI" (curated Q&A + fuzzy matching / embeddings shipped as static JSON) — no real LLM, no key, fully static-safe, but limited to anticipated questions.
- **Cost / abuse:** a public LLM endpoint can be hit repeatedly → rate limiting, spend caps, and a curated system prompt needed.
- **Model choice:** default to a current Claude model (e.g. Claude Haiku 4.5 for cheap/fast, or Sonnet) via the Anthropic API if going the real-LLM route.

## Solution

TBD — decision needed on real-LLM-via-serverless vs static-curated-Q&A. Likely a **new requirement group (e.g. ASKAI-*)** and either:
- a **new dedicated phase** (e.g. between Story and Showcase, or as a later enhancement), or
- promotion to the **backlog** (`/gsd-capture --backlog`) if treated as a post-v1 enhancement.

Recommend discussing during/after the theme decision, since placement (section 2/3) and the hosting decision (static-only vs hybrid) interact with Phase 1 (The Look / foundation & deploy) and Phase 2 (First Impression). If real-LLM is chosen, revisit the "no backend / GitHub Pages only" decision in PROJECT.md and consider Vercel/Cloudflare for the API route.
