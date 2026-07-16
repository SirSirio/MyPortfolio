---
phase: 01
slug: the-design-build
status: verified
threats_open: 0
asvs_level: 1
created: 2026-07-16
---

# Phase 01 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

**Scope:** the three Phase 1 plans (01-01 walking skeleton + Pages pipeline, 01-02 the gold
star hero, 01-03 the curated content sections). Site is **live** at
<https://sirsirio.github.io/MyPortfolio/> — this attack surface is public now, not theoretical.

**Threat ID collision — read before using this file.** Plans 01-01 and 01-02 each independently
number their registers from `T-01-01`. `T-01-01`, `T-01-02` and `T-01-03` therefore denote
**different threats** depending on source plan, and `T-01-SC` appears in all three. Every row
below is qualified by its source plan. Do not merge rows by ID — that would let one threat
inherit another's evidence.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| developer laptop → GitHub | `git push` + repo/Pages configuration crosses into a third-party host | Source code, planning docs. No secrets. |
| repo → GitHub Actions → Pages CDN | Build/deploy pipeline; runner publishes an artifact to the public web | Static files from `site/` only |
| visitor browser ← Pages CDN | Static, read-only, public by intent. No server runtime, no auth, no data store, **no user input** in Phase 1. | Public portfolio content |
| page → third-party CDN (Google Fonts) | `fonts.googleapis.com` / `fonts.gstatic.com` — a runtime dependency | Font files. No secrets, no user data. |
| page → external link targets | Canva (CV), LinkedIn, iGEM wiki, EMBO DOI — all `target="_blank"` | Outbound navigation only |
| page → `mailto:` | Contact address exposed in markup by intent | Public email address |
| repo → `site/assets/media/` | First-party asset drop-in surface (MEDIA-01) | Committed media files, relative paths only |

**ASVS L1 applicability.** V2 (auth), V3 (session), V4 (access control), V5 (input validation)
and V6 (cryptography) are **structurally N/A** — a read-only static page with zero user input,
zero forms, zero network calls and zero storage. Independently confirmed: a scan for
`location.*`, `URLSearchParams`, `localStorage`, `sessionStorage`, `postMessage`,
`document.cookie`, `document.referrer`, `fetch`, `XMLHttpRequest`, `WebSocket`, `<form>` and
`<input>` across `site/` returns **zero hits**. V14 (configuration) is the live category and is
owned by `.github/workflows/deploy.yml`.

---

## Threat Register

| Threat ID | Source | Category | Component | Disposition | Mitigation | Status |
|-----------|--------|----------|-----------|-------------|------------|--------|
| T-01-01 | 01-01 | Tampering | CI supply chain (`deploy.yml` actions) | mitigate | Only pinned first-party `actions/*`; no third-party marketplace actions | closed |
| T-01-02 | 01-01 | Elevation of Privilege | Workflow token scope | mitigate | `permissions` minimum: `contents: read`, `pages: write`, `id-token: write` | closed |
| T-01-03 | 01-01 | Information Disclosure | Repo contents published to public Pages | accept | Only `site/` uploaded; planning docs + `profile.md` out of artifact path | closed |
| T-01-SC | 01-01 | Tampering | Package installs | accept | No packages installed | closed |
| T-01-01 | 01-02 | Tampering | Nav CV + LinkedIn anchors (`target="_blank"`) | mitigate | `rel="noopener"` on both; `_blank` count == `noopener` count | closed |
| T-01-02 | 01-02 | Tampering | Google Fonts CDN | accept | Third-party runtime dep; self-hosting/SRI/CSP deferred to Phase 5 | closed |
| T-01-03 | 01-02 | Tampering | Typewriter DOM sink (`star-engine.js`) | mitigate | `textContent`, never `innerHTML` | closed |
| T-01-04 | 01-02 | Elevation of Privilege | `.github/workflows/deploy.yml` | accept | Pinned first-party actions at least privilege; owned by 01-01 | closed |
| T-01-05 | 01-02 | Information Disclosure | Repo contents | accept | No secrets exist and none ship | closed |
| T-01-06 | 01-02 | Denial of Service | Hero rAF loop / canvas | accept | Self-limiting: engine culls at `hero.bottom < -80`; DPR capped at 2 | closed |
| T-01-SC | 01-02 | Tampering | npm/pip/cargo installs | mitigate | No packages; no `package.json`, no bundler | closed |
| T-01-07 | 01-03 | Tampering | iGEM wiki + EMBO DOI anchors (`target="_blank"`) | mitigate | `rel="noopener"` on both | closed |
| T-01-08 | 01-03 | Information Disclosure | `mailto:` harvesting | accept | Address intentionally public — locked user decision 2026-07-16 | closed |
| T-01-09 | 01-03 | Tampering | `site/assets/media/` drop-in surface | mitigate | First-party committed files only; relative `./assets/media/...`; no remote src | closed |
| T-01-10 | 01-03 | Tampering | Content injection / XSS | mitigate | No `innerHTML`, no user input anywhere in Phase 1 | closed |
| T-01-11 | 01-03 | Tampering | `[data-reveal]` styling | mitigate | Shipping-integrity gate: zero `[data-reveal]` selectors in `styles.css` | closed |
| T-01-SC | 01-03 | Tampering | npm/pip/cargo installs | mitigate | No packages; media slot is pure CSS `:has()`, not a JS media loader | closed |

*Status: open · closed*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

**Totals:** 17 threats — 10 `mitigate`, 7 `accept`, 0 `transfer`. **17 closed, 0 open.**

---

## Mitigation Evidence

Each `mitigate` row below was verified by locating the mitigation in the shipped file. No row is
closed on documentation, plan intent, or the code review's say-so.

### T-01-01 (01-01) — CI supply chain · Tampering

`.github/workflows/deploy.yml` — a `uses:` enumeration across the whole `.github/` tree returns
**exactly four** entries, all first-party `actions/*`:

| Line | Action |
|------|--------|
| `deploy.yml:31` | `actions/checkout@v4` |
| `deploy.yml:34` | `actions/configure-pages@v5` |
| `deploy.yml:41` | `actions/upload-pages-artifact@v3` |
| `deploy.yml:47` | `actions/deploy-pages@v4` |

Zero third-party marketplace actions. `.github/workflows/` contains only this one file, so the
enumeration is complete — the mitigation applies to **all** CI entry points, not just the
inspected step. **CLOSED.**

*Residual note (not a gap against the declared mitigation):* actions are pinned to **mutable
major-version tags**, not commit SHAs. The plan declared tag-pinning explicitly ("Pin each action
to the major version tag shown"), so the mitigation is met as written. SHA-pinning would harden
further against upstream tag movement; recorded as a Phase 5 hardening candidate, not a Phase 1
gap.

### T-01-02 (01-01) — Workflow token scope · Elevation of Privilege

`deploy.yml:13-16`:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Verified this is the **only** `permissions` block in the file — there is no job-level override
re-broadening scope, and no `contents: write`. Least privilege confirmed as declared. **CLOSED.**

### T-01-01 (01-02) — Nav CV + LinkedIn anchors · Tampering (reverse tabnabbing)

| Line | Anchor | `rel` |
|------|--------|-------|
| `site/index.html:33` | `https://canva.link/5a5yj5bdg78axhv` (CV) | `rel="noopener"` |
| `site/index.html:34` | `https://www.linkedin.com/in/sirio-vittorio-feltrin/` | `rel="noopener"` |

**All-entry-point check (not just a count match):** counting is insufficient evidence — equal
counts can hide an unpaired anchor. Extracting every `<a …target="_blank"…>` tag and filtering
for those *lacking* `rel="noopener"` returns **zero**. Additionally `window.open`, dynamic
`createElement('a')` and `<base target>` are all absent from `site/`, so no `_blank` context can
be opened outside the four audited anchors. **CLOSED.**

### T-01-03 (01-02) — Typewriter DOM sink · Tampering

`site/star-engine.js` writes role text exclusively via `textContent`:

| Line | Write |
|------|-------|
| `:89` | `this._artEl.textContent = this.terms[0].prefix` (reduced-motion path) |
| `:90` | `this._typeEl.textContent = this.terms[0].text` (reduced-motion path) |
| `:104` | `this._artEl.textContent = t.prefix.slice(...)` (animated path) |
| `:105` | `el.textContent = ... t.text.slice(...)` (animated path) |

Both the reduced-motion and animated code paths were checked — the sink is safe in each. A
repo-wide scan of `site/` for `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`,
`eval(`, `new Function` and `setHTML` returns **zero hits**. The adjacent
`_typeEl.style.backgroundImage` write draws from the engine-local literal `terms` array
(`star-engine.js:71-82`), not from any external source. **CLOSED.**

### T-01-SC (01-02) & T-01-SC (01-03) — Package installs · Tampering

No dependency manifest exists under `site/` or the repo root: no `package.json`,
`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `requirements.txt` or `Cargo.toml`. `site/`
contains exactly seven first-party files (`.nojekyll`, `README.md`, `index.html`, `main.js`,
`star-engine.js`, `styles.css`, `assets/media/README.md`). The entire module graph is one
relative first-party import — `main.js:11`:
`import { HeroStar, REDUCED, DPR, tintAt, rgba } from './star-engine.js'`. The only `<script>`
in `index.html` is `:320` `src="./main.js"`. **CLOSED.**

T-01-03's specific clause — *"the media slot is pure CSS `:has()` precisely to avoid a JS media
loader"* — verified: `styles.css:901,911` carry `.media-slot:not(:has(> img, > video))` and
`content: attr(data-label)`, and a grep for `media-slot`/`data-label` across `main.js` and
`star-engine.js` returns **zero**. The mechanism is CSS-only; no JS loader was introduced.

*Observation, not a gap:* one `package.json` exists in the repo at `.claude/package.json`, whose
entire content is `{"type":"commonjs"}` — a CommonJS module-type marker for GSD's own hook
scripts. It declares **zero dependencies**, has no lockfile, is untracked, and sits outside the
Pages artifact path (`./site`). It installs nothing and ships nothing. T-01-SC's claim holds in
substance; recorded here so a future auditor greping for `package.json` does not read it as a
contradiction.

### T-01-07 (01-03) — iGEM wiki + EMBO DOI anchors · Tampering

| Line | Anchor | `rel` |
|------|--------|-------|
| `site/index.html:204` | `https://2024.igem.wiki/DTU-Denmark/` | `rel="noopener"` |
| `site/index.html:288` | `https://doi.org/10.1038/s44318-025-00567-1` | `rel="noopener"` |

Covered by the same all-entry-point check as T-01-01 (01-02): 4 `target="_blank"`, 4
`rel="noopener"`, zero unpaired. **CLOSED.**

### T-01-09 (01-03) — `site/assets/media/` drop-in surface · Tampering

Two-part mitigation, both parts present:

1. **Code state.** The only `src=` attribute in the entire `index.html` is `:320`
   `src="./main.js"` — relative and first-party. Zero `<img>`, `<video>`, `<iframe>`, `<embed>`,
   `<object>` or `<source>` tags exist; all three media slots (`:169`, `:183`, `:198`) are empty
   `<figure>` elements by design. **No remote or hot-linked `src` ships.**
2. **Documented contract.** `site/assets/media/README.md:22-24`: *"Files must also be **committed
   to this repo** and referenced with a **relative path**. Never hot-link a remote `src` — that
   hands a third party the ability to change what your portfolio shows."* The locked no-stock/AI
   rule is at `:14`, and the worked examples at `:42` and `:51-52` both use relative
   `./assets/media/...` paths.

**CLOSED.**

### T-01-10 (01-03) — Content injection / XSS · Tampering

Two independent conditions, both verified:

- **No HTML sink.** Zero `innerHTML` / `outerHTML` / `insertAdjacentHTML` / `document.write` /
  `eval` / `new Function` across `site/`.
- **No user input.** Zero hits for `location.*`, `URLSearchParams`, `searchParams`,
  `localStorage`, `sessionStorage`, `postMessage`, `addEventListener('message'`,
  `document.cookie`, `document.referrer`, `fetch(`, `XMLHttpRequest`, `WebSocket`, `.value`,
  `<form`, `<input`, `contenteditable`. The four listeners registered in `main.js` are `scroll`
  (`:184`), `resize` (`:185`, `:193`) and `pointermove` (`:197`) — none carries an
  attacker-controlled string into the DOM.

Every `style` write traced: `main.js:106-107` and `:143-150` compose `translate3d(...)` from
`toFixed()`-formatted numbers; `main.js:105` reads `dataset.para` from first-party markup and
coerces via `parseFloat` to a number. No string concatenation reaches an HTML parser. **CLOSED.**

### T-01-11 (01-03) — `[data-reveal]` styling · Shipping-integrity gate

`site/styles.css` contains **zero** occurrences of `data-reveal` in any form — selector or
otherwise. The 19 `data-reveal` attributes in `index.html` ship inert, as intended (their driver
`updateReveals()` is Phase 2 / MOTION-01).

The three `opacity: 0` declarations in `styles.css` were each inspected and none can hide a
section: `:92` is inside `@keyframes blink` (the typewriter caret), `:99` and `:109` are inside
`@keyframes scrollDot` (the scroll-hint dot). No `visibility: hidden` or `display: none` rule
exists that could blank content. The in-browser confirmation (all five sections compute
`opacity: 1`) corroborates the static finding. **CLOSED.**

---

## Accepted Risks Log

Each `accept` disposition below is recorded with its stated rationale. Per this project's
audit contract, an accepted risk is CLOSED only once documented here. Where an acceptance
rests on a factual claim about the code, that claim was **re-verified** rather than assumed —
an acceptance resting on a false premise is not an acceptance.

| Risk ID | Threat Ref | Rationale | Premise re-verified | Accepted By | Date |
|---------|------------|-----------|---------------------|-------------|------|
| AR-01 | T-01-03 (01-01) | Repo contents published to public Pages. Only the `site/` dir is uploaded as the artifact; planning docs and `profile.md` stay out of the artifact path. No secrets exist in this static project. | ✅ `deploy.yml:43` `path: ./site`. `site/` holds only 7 first-party site files — no `.planning/`, no `profile.md` (which lives outside the repo entirely, at `../00_Profile/`). | Plan 01-01 | 2026-07-16 |
| AR-02 | T-01-SC (01-01) | Package installs. This plan installs NO packages (plain static files, no bundler, no `package.json`) — the package legitimacy gate is not applicable. | ✅ Zero manifests under `site/` or repo root. See T-01-SC evidence above for the `.claude/package.json` tooling-marker note. | Plan 01-01 | 2026-07-16 |
| AR-03 | T-01-02 (01-02) | Google Fonts CDN is a third-party runtime dep shipped by 01-01. No secrets and no user data cross this boundary; worst case is degraded typography. Self-hosting / SRI / CSP **explicitly deferred to Phase 5** — do not expand scope here. | ✅ `index.html:7-10` — preconnect to `fonts.googleapis.com`/`fonts.gstatic.com` + the stylesheet link. No `integrity=` and no `Content-Security-Policy` present, exactly as the acceptance describes. | Plan 01-02 | 2026-07-16 |
| AR-04 | T-01-04 (01-02) | `.github/workflows/deploy.yml` — only pinned first-party `actions/*` at least privilege. Shipped and verified by 01-01; out of scope for 01-02, not to be modified. | ✅ Same evidence as T-01-01 / T-01-02 (01-01) above: 4 first-party actions, least-privilege permissions block. | Plan 01-02 | 2026-07-16 |
| AR-05 | T-01-05 (01-02) | Repo contents — no secrets exist and none ship. The site is static with no API key until Phase 6, which explicitly forbids a client-side key (ASKAI-06). | ✅ Secret scan across `site/` for `api[_-]?key`, `secret`, `password`, `token`, `bearer`, `private[_-]key`, `BEGIN RSA`, `AKIA`, `ghp_`, `sk-` returns only false positives (the phrase "design tokens" in CSS comments). No credential material. | Plan 01-02 | 2026-07-16 |
| AR-06 | T-01-06 (01-02) | Hero rAF loop / canvas DoS. Self-limiting: the engine culls when `hero.bottom < -80` and caps DPR at 2. Per-frame and per-event `getBoundingClientRect` forbidden. Formal mobile perf work is Phase 3 (PERF-01). | ✅ **Both premises hold.** `star-engine.js:66` `if (hr.bottom < -80) return;` (cull). `star-engine.js:13` `export const DPR = Math.min(window.devicePixelRatio || 1, 2);` (cap). `main.js` runs exactly one rAF loop (`:156-161`) and caches the hero rect on scroll/resize (`:30-32`). | Plan 01-02 | 2026-07-16 |
| AR-07 | T-01-08 (01-03) | `mailto:sirio.feltrin@gmail.com` harvesting. The address is intentionally public — a locked user decision (STATE.md, confirmed by the user 2026-07-16). A contact form is explicitly v2 (`CONT-V2-02`). | ✅ `index.html:306` `href="mailto:sirio.feltrin@gmail.com"` — the locked public address, not the account address. Exposure is by design; no obfuscation was promised. | Sirio (locked decision) | 2026-07-16 |

*Accepted risks do not resurface in future audit runs.*

---

## Unregistered Flags

Non-blocking warnings: attack surface or process gaps that appeared during implementation with
no threat mapping. `block_on: none`, so these do not gate the phase.

### UF-01 (WARNING) — `01-01-SUMMARY.md` has no `## Threat Flags` section at all

`01-02-SUMMARY.md` and `01-03-SUMMARY.md` both carry a `## Threat Flags` section (both report
"None", and both map their surface to existing IDs — T-01-01/T-01-03 for 01-02; T-01-07/08/09/10/11
for 01-03 — so both are **informational**, no unregistered surface).

`01-01-SUMMARY.md` carries **no such section** and the word "threat" does not appear in it. This
is the plan that shipped the entire CI/CD pipeline — the phase's only genuinely privileged
component. Its threat surface was therefore never self-declared by the executor.

**Impact contained:** all four 01-01 threats were verified directly against `deploy.yml` in this
audit (see evidence above) and all four are CLOSED. The gap is in the *process record*, not the
implementation. Recorded so no future audit assumes 01-01's silence meant "no flags".

### UF-02 (WARNING) — `enablement: true` on `configure-pages` is unmapped CI surface

`deploy.yml:38` carries `enablement: true` on the `actions/configure-pages@v5` step. This was
**not in plan 01-01's Task 2 specification**; it was added during execution (commit `5b3405f`,
recorded in `01-01-SUMMARY.md:95-98` as a Rule 3 auto-fix) so the workflow can auto-enable Pages
without a manual Settings step.

**Assessed, not merely noted:** this does not weaken either declared CI mitigation. It adds no
action (still four first-party `actions/*` → T-01-01 holds) and no permission (it operates
within the already-declared `pages: write` scope → T-01-02 holds). It does mean the workflow can
turn Pages on, which is a config-write capability that the phase's threat model never explicitly
reasoned about.

Flagged rather than closed silently: it is exactly the kind of implementation-time CI change that
UF-01's missing Threat Flags section exists to surface. Suggested disposition at Phase 5 (the
CSP/SRI hardening phase): register it explicitly, or drop it now that Pages is enabled and live.

---

## Corroborating Review — independently re-verified

`01-REVIEW.md` (commit `739ce31`) reported four security-relevant items as CLEAN. Per the audit
contract these were treated as corroborating, not authoritative, and each was re-checked from
the files:

| Review claim | Independent finding |
|---|---|
| `deploy.yml` `path: ./site` correct; zero `app/` hits repo-wide | **Confirmed.** `path: ./site` at `:43`; grep for `app/` across `--include=*.yml,*.html,*.js,*.css,*.json` over `.github` + `site` returns zero. |
| Token scope genuinely least-privilege | **Confirmed.** `:13-16`, single block, no job-level override. |
| No `innerHTML`/`eval`; typewriter uses `textContent`; style writes are numeric literals or engine-local constants | **Confirmed.** Zero sink hits across `site/`; `textContent` at `star-engine.js:89,90,104,105`; all traced style writes are `toFixed()` numerics or the engine-local `terms` gradient literals. |
| `rel="noopener"` complete on all four `target="_blank"` links | **Confirmed, and strengthened.** The review's count-equality is necessary but not sufficient; a per-tag filter for `_blank` anchors *lacking* `noopener` returns zero, which is the stronger claim. |

**The review was not found wrong on any security point.**

Two review defects were correctly excluded from this register rather than imported as threats, as
instructed: **CR-01** (`.deep` canvas sized from `innerHeight` vs CSS `100vh`) is a mobile
rendering defect, and **WR-01** (parallax runs under `prefers-reduced-motion`) is an
accessibility defect mapping to MOTION-02 / Phase 2. Neither is a Phase 1 threat. Likewise the
known-accepted `favicon.ico` 404 and the inert-but-present `[data-reveal]` attributes are not
reported as threats.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-07-16 | 17 | 17 | 0 | gsd-security-auditor |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer) — 10 mitigate, 7 accept, 0 transfer
- [x] Every `mitigate` threat closed on concrete `file:line` evidence located in the shipped code
- [x] Accepted risks documented in Accepted Risks Log (AR-01 … AR-07), each with its premise re-verified
- [x] Unregistered flags recorded (UF-01, UF-02) — both WARNING, non-blocking under `block_on: none`
- [x] Implementation files unmodified by this audit (read-only on `site/` and `.github/`)
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-07-16
