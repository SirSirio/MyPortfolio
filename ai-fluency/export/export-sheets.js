// v2 export: content scaled to 97% from the top (bigger bottom margin, same layout),
// one-line centred footer on every page. Usage: node build2.js
const { chromium } = require('playwright-core');
const exe = process.env.USERPROFILE + '/AppData/Local/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-win64/chrome-headless-shell.exe';
const SCALE = Number(process.env.SCALE || 0.97);
const FOOT = 'Made with Claude &amp; Gemini, reviewed by Sirio Feltrin · Based on the AI Fluency Framework (Dakan &amp; Feller), CC BY-NC-SA 4.0 · sirsirio.github.io/MyPortfolio/ai.html';
const NAMES = ['1-map', '2-delegation', '3-description', '4-discernment', '5-diligence'];
const inject = (page) => page.evaluate(({ FOOT, SCALE }) => {
  const st = document.createElement('style');
  st.textContent = `@page{size:210mm 297mm;margin:0 !important}
  html{background:#fff !important}
  @media print{html,body{margin:0 !important;width:794px;height:1122px;overflow:hidden}}
  body{transform:scale(${SCALE});transform-origin:50% 0}
  #ai-credit{position:absolute;left:0;right:0;bottom:14px;margin:0;font:400 6pt/1 Inter,system-ui,sans-serif;color:#8a8580;text-align:center;letter-spacing:0;white-space:nowrap;z-index:10}`;
  document.head.appendChild(st);
  document.documentElement.style.setProperty("background", getComputedStyle(document.body).backgroundColor, "important");
  const d = document.createElement('p'); d.id = 'ai-credit'; d.innerHTML = FOOT;
  document.documentElement.appendChild(d);
  // report: footer width, lowest content bottom (after scale), gap to footer
  const fr = d.getBoundingClientRect();
  let low = 0;
  for (const e of document.body.querySelectorAll('*')) { const r = e.getBoundingClientRect(); if (r.height > 0 && r.width > 0) low = Math.max(low, r.bottom); }
  return { footW: Math.round(fr.width), footTop: Math.round(fr.top), contentBottom: Math.round(low), gap: Math.round(fr.top - low), bottomMargin: Math.round(1123 - low) };
}, { FOOT, SCALE });
(async () => {
  const b = await chromium.launch({ executablePath: exe });
  const ctx = await b.newContext({ viewport: { width: 794, height: 1123 } });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8765/cheat-sheet-5-pages.html'); await p.waitForTimeout(4000);
  const srcs = await p.evaluate(() => [...document.querySelectorAll('iframe')].map(i => i.src));
  const report = {};
  for (let i = 0; i < srcs.length; i++) {
    const q = await ctx.newPage(); await q.goto(srcs[i]); await q.evaluate(() => document.fonts.ready); await q.waitForTimeout(800);
    report[NAMES[i]] = await inject(q); await q.waitForTimeout(200);
    await q.screenshot({ path: `out/v2-check-${NAMES[i]}.png` });
    await q.pdf({ path: `out/v2-sheet-${i + 1}.pdf`, width: '210mm', height: '297mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await q.close();
  }
  const o = await ctx.newPage(); await o.goto('http://127.0.0.1:8765/one-page.html'); await o.waitForTimeout(4000); await o.evaluate(() => document.fonts.ready);
  report['one-page'] = await inject(o); await o.waitForTimeout(200);
  await o.screenshot({ path: 'out/v2-check-one-page.png' });
  await o.pdf({ path: 'out/v2-one-page.pdf', width: '210mm', height: '297mm', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await b.close();
  console.log(JSON.stringify(report, null, 1));
})();
