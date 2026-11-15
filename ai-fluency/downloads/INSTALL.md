# Installing the two skills

Checked against the official docs on 15 November 2026. The steps are the same for `fluency-levels.zip` and `prompt-4d-review.zip`. Each zip holds one folder with a `SKILL.md` file inside.

## Claude apps (claude.ai and Claude desktop)

1. First turn on code execution: **Settings > Capabilities**. The toggle is called "Code execution and file creation" ("Create and edit files" in newer layouts).
2. Open **Customize > Skills**, click **+**, then **+ Create skill**, and upload the .zip as it is. Then switch the skill on.
3. Plans: Free, Pro, Max, Ultra, Team and Enterprise, according to the help article. On Team and Enterprise an owner can turn off skill creation, so ask your admin if the button is missing.
4. Use it by asking for it in a chat, e.g. "use fluency-levels, level 2: …".

Sources: [Using Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude) · [How to create custom Skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

## Claude Code

1. Unzip. Then move the folder to `~/.claude/skills/` for all your projects, or to `.claude/skills/` inside one project. The path should end in `fluency-levels/SKILL.md`.
2. You don't need to restart. Claude Code picks up new skills while it's running. The one exception: if the `skills` folder didn't exist when you started the session, run `/reload-skills`.
3. Type `/fluency-levels` or `/prompt-4d-review`. Claude also uses a skill on its own when your request matches it.

Source: [Claude Code docs: Skills](https://code.claude.com/docs/en/skills)

## Google Antigravity

1. Antigravity supports skills in this same format. Unzip, then move the folder to `.agents/skills/` in your workspace for one project. For all projects, use `~/.gemini/config/skills/`.
2. The agent uses a skill when your request matches it. You can also type `/fluency-levels` in the message box.
3. If you use the Antigravity CLI and it's already running, run `/skills reload` or start a new conversation. Whether the app needs a reload: unverified.

Source: [Antigravity docs: Skills](https://antigravity.google/docs/skills)

---
Made with Claude and Gemini; content chosen and reviewed by Sirio Feltrin. Full AI statement: https://sirsirio.github.io/MyPortfolio/ai.html. Based on the AI Fluency Framework (Dakan & Feller) and the Anthropic Academy course, CC BY-NC-SA 4.0.
