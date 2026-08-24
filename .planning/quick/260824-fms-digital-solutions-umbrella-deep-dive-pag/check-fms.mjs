/* Verification gate for quick task 260824-fms.

   Plain Node ESM (Node 24), no dependencies, run from the REPO ROOT:
     node .planning/quick/260824-fms-digital-solutions-umbrella-deep-dive-pag/check-fms.mjs

   Covers, in order: i18n key parity (Task 1), the markup / asset / regression
   structure (Task 2), the motion-layer source (Task 3), and the hosted CV
   (Task 4). Every check pushes onto `fails`; the script exits 1 with a readable
   report if any fired. Tasks add checks by calling ok()/has()/absent() — the
   helpers below are the whole extension surface, so new gates slot in cleanly.

   ⚠ This script asserts SOURCE facts only. It is not a substitute for the
   blocking render check: nothing here can see a layout, a colour or a reveal. */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Resolve the repo root from THIS file's location, so the script works from any
   cwd rather than silently checking nothing when run from the wrong folder. */
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');

const fails = [];
const notes = [];
let checks = 0;

function ok(cond, msg) {
  checks++;
  if (!cond) fails.push(msg);
  return !!cond;
}
/* Substring / regex presence in a body of text. */
function has(text, needle, msg) {
  const found = needle instanceof RegExp ? needle.test(text) : text.includes(needle);
  return ok(found, msg);
}
function absent(text, needle, msg) {
  const found = needle instanceof RegExp ? needle.test(text) : text.includes(needle);
  return ok(!found, msg);
}
function countOf(text, re) {
  return (text.match(re) || []).length;
}
function readSite(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) { fails.push(`MISSING FILE: ${rel}`); return ''; }
  return readFileSync(p, 'utf8');
}

/* ============================================================
   TASK 1 — i18n key parity + non-empty values
   ============================================================ */

/* site/i18n.js is an ES module served to the browser via <script type="module">,
   but the repo has no package.json "type": "module", so Node would parse a
   file:// import of a .js file as CommonJS and choke on `export`. Importing the
   SOURCE through a data: URL keeps real module semantics without adding a stray
   package.json to site/ (which would ship to GitHub Pages for no reason).
   Safe because i18n.js is a leaf: it imports nothing, and every DOM/global
   reference (localStorage, navigator, document) sits inside a function body,
   never at module top level. */
const i18nPath = join(ROOT, 'site/i18n.js');
if (!existsSync(i18nPath)) {
  fails.push('MISSING FILE: site/i18n.js');
}
const i18nSrc = readFileSync(i18nPath, 'utf8');
const { STRINGS } = await import(
  'data:text/javascript;base64,' + Buffer.from(i18nSrc, 'utf8').toString('base64')
);

const enKeys = Object.keys(STRINGS.en);
const itKeys = Object.keys(STRINGS.it);
const missingInIt = enKeys.filter((k) => !(k in STRINGS.it));
const missingInEn = itKeys.filter((k) => !(k in STRINGS.en));

ok(missingInIt.length === 0, `Keys present in EN but missing in IT: ${missingInIt.join(', ')}`);
ok(missingInEn.length === 0, `Keys present in IT but missing in EN: ${missingInEn.join(', ')}`);

/* No new-namespace value may be an empty string in either language. */
for (const lang of ['en', 'it']) {
  for (const [k, v] of Object.entries(STRINGS[lang])) {
    if (!/^(sw\.|work\.plateSw\.)/.test(k)) continue;
    ok(typeof v === 'string' && v.trim().length > 0, `Empty ${lang} value for key: ${k}`);
  }
}

/* The two new namespaces must actually exist and be complete enough to matter. */
const swKeys = enKeys.filter((k) => k.startsWith('sw.'));
const plateSwKeys = enKeys.filter((k) => k.startsWith('work.plateSw.'));
ok(plateSwKeys.length === 5, `work.plateSw.* should have 5 keys, found ${plateSwKeys.length}`);
ok(swKeys.length >= 45, `sw.* should carry the full deep-dive (>=45 keys), found ${swKeys.length}`);
for (const k of ['work.plateSw.title', 'work.plateSw.aria', 'sw.eyebrow', 'sw.lede',
                 'sw.s1.h2', 'sw.s2.cap1', 'sw.s2.alt1', 'sw.s2.cap4', 'sw.s2.alt4',
                 'sw.s3.figCap', 'sw.s4.note', 'sw.s5.h2']) {
  ok(k in STRINGS.en && k in STRINGS.it, `Required key missing from a dictionary: ${k}`);
}

/* The shipped OT-2 / plate keys must not have been renamed or dropped. */
for (const k of ['dd.back', 'dd.eyebrow', 'dd.s4.p2', 'work.plate2.title', 'work.plate3.title']) {
  ok(k in STRINGS.en && k in STRINGS.it, `Pre-existing key was renamed or removed: ${k}`);
}

/* ============================================================
   TASK 2 — markup structure, assets, regression surface
   ============================================================ */

const htmlRaw = readSite('site/index.html');
/* Strip HTML comments before any structural count. index.html is heavily
   commented and several comments legitimately NAME the things being counted
   ("it warps to [data-proj=soft]", "carries NO <img>"), which would otherwise
   inflate every count and trip the D-04 gate on prose. Same reasoning as the
   block-comment strip applied to main.js below. */
const html = htmlRaw.replace(/<!--[\s\S]*?-->/g, '');

/* Every key referenced by the markup must resolve in BOTH dictionaries. */
const referenced = new Set();
for (const m of html.matchAll(/data-i18n(?:-rich)?="([^"]+)"/g)) referenced.add(m[1]);
for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
  for (const pair of m[1].split(';')) {
    const idx = pair.indexOf(':');
    if (idx > 0) referenced.add(pair.slice(idx + 1).trim());
  }
}
for (const key of referenced) {
  ok(key in STRINGS.en, `index.html references a key missing from STRINGS.en: ${key}`);
  ok(key in STRINGS.it, `index.html references a key missing from STRINGS.it: ${key}`);
}
notes.push(`${referenced.size} i18n keys referenced by index.html`);

/* The plate + the overlay exist exactly once each. */
ok(countOf(html, /data-open="soft"/g) === 1, 'Expected exactly one [data-open="soft"]');
ok(countOf(html, /data-proj="soft"/g) === 1, 'Expected exactly one [data-proj="soft"]');

/* Source order: plate1 < plateSw < plate2 (D-07 — the new card is SECOND). */
const iP1 = html.indexOf('work.plate1.title');
const iSw = html.indexOf('work.plateSw.title');
const iP2 = html.indexOf('work.plate2.title');
ok(iP1 > -1 && iSw > -1 && iP2 > -1, 'Could not locate all three plate titles in index.html');
ok(iP1 < iSw && iSw < iP2, 'Plate order must be plate1 < plateSw < plate2 (D-07)');

/* Zig-zag: the four plates in #work alternate no-flip / flip / no-flip / flip. */
const workStart = html.indexOf('<section id="work"');
const workEnd = html.indexOf('</section>', html.indexOf('work.plate3.body'));
const workHtml = html.slice(workStart, workEnd);
const plateSeq = [...workHtml.matchAll(/class="plate( plate--flip)?"/g)].map((m) => !!m[1]);
ok(plateSeq.length === 4, `Expected 4 .plate articles in #work, found ${plateSeq.length}`);
ok(JSON.stringify(plateSeq) === JSON.stringify([false, true, false, true]),
   `Plate flip sequence must be [no-flip, flip, no-flip, flip], got ${JSON.stringify(plateSeq)}`);

/* The four Pump Validator captures live under site/assets/media, and NOWHERE else. */
for (const f of ['pv-landing.png', 'pv-data-collection.png', 'pv-analysis-charts.png', 'pv-analysis-scores.png']) {
  const p = join(ROOT, 'site/assets/media', f);
  const there = existsSync(p);
  ok(there, `Missing asset: site/assets/media/${f}`);
  if (there) ok(statSync(p).size > 0, `Empty asset: site/assets/media/${f}`);
}
for (const f of ['AppLandingPage.png', 'DataCollectionPage.png', 'DataAnalysisEx1.png', 'DataAnalysisEx2.png']) {
  ok(!existsSync(join(ROOT, f)), `Screenshot still left at the repo root (must be moved): ${f}`);
}

/* Isolate the soft overlay for the media + D-04 assertions. */
const softStart = html.indexOf('<div data-proj="soft"');
const softHtml = softStart > -1 ? html.slice(softStart) : '';
ok(softHtml.length > 0, 'Could not locate the [data-proj="soft"] overlay');

/* Every <img> inside the soft overlay: relative pv-* src, non-empty alt, i18n alt key. */
const softImgs = [...softHtml.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
ok(softImgs.length === 4, `Expected 4 <img> in the soft overlay, found ${softImgs.length}`);
for (const img of softImgs) {
  has(img, /src="\.\/assets\/media\/pv-/, `soft overlay <img> must use a relative ./assets/media/pv- src: ${img.slice(0, 90)}`);
  has(img, /alt="[^"]+"/, `soft overlay <img> must carry a non-empty alt: ${img.slice(0, 90)}`);
  has(img, /data-i18n-attr="alt:sw\.s2\.alt\d"/, `soft overlay <img> must carry a data-i18n-attr alt key: ${img.slice(0, 90)}`);
  has(img, /loading="lazy"/, `soft overlay <img> must be lazy-loaded (T-fms-08): ${img.slice(0, 90)}`);
}

/* No remote media anywhere on the landing page (T-fms-03). */
absent(html, /src="http/, 'index.html must never reference a remote src');

/* D-04 hard gate — section 04 of the soft overlay carries NO visual element. */
const s4Start = softHtml.indexOf('sw.s4.label');
const s5Start = softHtml.indexOf('sw.s5.label');
ok(s4Start > -1 && s5Start > s4Start, 'Could not isolate section 04 of the soft overlay');
if (s4Start > -1 && s5Start > s4Start) {
  const s4 = softHtml.slice(s4Start, s5Start);
  for (const banned of ['<img', '<svg', '<figure', 'media-slot', 'device-frame', 'blueprint']) {
    absent(s4, banned, `D-04 VIOLATION: chapter three (section 04) must contain no "${banned}"`);
  }
}

/* Evergreen: nothing anywhere under site/ may name the application that prompted this. */
const siteFiles = ['site/index.html', 'site/i18n.js', 'site/main.js', 'site/styles.css',
                   'site/assets/media/README.md', 'site/cv/index.html'];
for (const rel of siteFiles) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) continue;
  absent(readFileSync(p, 'utf8'), /\bALK\b/, `"ALK" must not appear in ${rel} (D-08 / D-11)`);
}

/* The two authored diagrams ship, and the cancelled one does NOT (D-10). */
ok(countOf(html, /data-sw-spine/g) === 2, 'The spine diagram must be authored twice (card + masthead)');
has(html, 'data-sw-fusion', 'The chapter-two fusion diagram [data-sw-fusion] is missing');
has(html, 'data-sw-shots', 'The chapter-one capture group [data-sw-shots] is missing');
absent(html, 'data-sw-doe', 'The [data-sw-doe] run-matrix SVG was CANCELLED by D-10 and must not ship');

/* OT-2 regression markers — the shipped deep-dive must be structurally untouched. */
for (const marker of ['data-open="ot2"', 'data-proj="ot2"', 'data-ot2-diamond', 'data-ot2-assembly',
                      'data-ot2-outcome', 'dd-edge', 'media-slot--composite', 'media-slot--pump']) {
  has(html, marker, `OT-2 REGRESSION: marker "${marker}" disappeared from index.html`);
}

/* CSS — the new overlay resolves an accent, and the OT-2 keeps its own. */
const css = readSite('site/styles.css');
has(css, /\[data-proj="soft"\]\s*\{\s*--accent:\s*var\(--star-vega\)/,
    '[data-proj="soft"] must resolve --accent to var(--star-vega) (D-09)');
has(css, /\[data-proj="ot2"\]\s*\{\s*--accent:\s*var\(--star-rigel\)/,
    '[data-proj="ot2"] must still resolve --accent to var(--star-rigel)');
has(css, '.sw-pair', '.sw-pair (the beat-C grid) is missing from styles.css');
has(css, /\[data-open\]\s*\{[^}]*cursor:\s*pointer/, '[data-open] must get cursor:pointer');
has(css, '[data-open]:focus-visible', '[data-open]:focus-visible ring is missing');
/* .device-frame's border is the ONLY edge definition these dark captures have. */
has(css, /\.device-frame\s*\{[^}]*border:\s*1px solid rgba\(var\(--accent\)/,
    '.device-frame must keep its accent hairline border (see <asset_findings>)');
/* The media-slot filled/empty test must accept an inline <svg> (the card diagram). */
ok(countOf(css, /:not\(:has\(> img, > video, > a > img, > a > video, > svg, > a > svg\)\)/g) === 2,
   '.media-slot empty-state selectors must both accept > svg and > a > svg');
/* The overlay chrome must cover BOTH overlays, or the new one loses its ground. */
for (const sel of ['[data-proj="soft"]::before', '[data-proj="soft"]::after',
                   '[data-proj="soft"] .proj-sec > h2']) {
  has(css, sel, `The shared overlay chrome does not extend to ${sel}`);
}
/* No hard-coded hue in the new .sw-* vocabulary — every colour derives from --accent. */
const swCssStart = css.indexOf('SOFT DEEP-DIVE DIAGRAMS');
ok(swCssStart > -1, 'The .sw-* diagram block is missing from styles.css');
if (swCssStart > -1) {
  const swCss = css.slice(swCssStart, css.indexOf('BUILD layout diversification', swCssStart));
  /* Leading (?<![-\w]) so `background-color` does not match the `color` alternative. */
  for (const m of swCss.matchAll(/(?<![-\w])(fill|stroke|color)\s*:\s*([^;]+);/g)) {
    const val = m[2].trim();
    ok(!/^#[0-9a-fA-F]{3,8}$/.test(val),
       `.sw-* block must derive colour from --accent, found a hard-coded hue: ${m[0].trim()}`);
  }
}

/* ============================================================
   REPORT
   ============================================================ */

console.log(`\ncheck-fms — ${checks} assertions\n`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) {
  console.error(`\n✗ ${fails.length} FAILED:\n`);
  for (const f of fails) console.error(`  - ${f}`);
  console.error('');
  process.exit(1);
}
console.log('\n✓ all checks passed\n');
