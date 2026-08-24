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
