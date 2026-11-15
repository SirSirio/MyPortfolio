/* AI Fluency, in practice (ai.html): page behaviour.
   - language: the site's own i18n engine (shared EN/IT choice with the main page)
   - hero: the request types itself once, then the caret blinks
   - "the reply streams in": [data-stream] blocks rise in as they enter the viewport
   - demo: Quick / Standard / Deep tabs (WAI-ARIA tabs pattern, arrow keys)
   - reader: SKILL.md files shown in a <dialog> via fetch + textContent
   No scroll listeners: IntersectionObserver only. Reduced motion = no typing,
   no streaming, no blinking (CSS gates the rest). */
import { applyLang, getInitialLang, onLangChange, t } from './i18n.js?v=20261115-2';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.__aiReady = true;

/* ---------- language ---------- */
function syncLangButtons(lang) {
  document.querySelectorAll('.ai-lang__btn').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', t('ai.meta.desc'));
}

/* ---------- hero typewriter ---------- */
const typed = document.querySelector('[data-typed]');
const caret = document.querySelector('.ai-caret');
let typingTimer = null;

function finishTyping() {
  clearTimeout(typingTimer);
  typingTimer = null;
  if (typed) typed.textContent = t('ai.hero.ask');
  if (caret && !REDUCED) caret.classList.add('is-blink');
}

function startTyping(delay) {
  if (!typed || REDUCED) { finishTyping(); return; }
  const full = t('ai.hero.ask');
  let i = 0;
  typed.textContent = '';
  const step = () => {
    i += 1;
    typed.textContent = full.slice(0, i);
    if (i < full.length) {
      const ch = full[i - 1];
      typingTimer = setTimeout(step, /[.,?]/.test(ch) ? 180 : 16 + Math.random() * 22);
    } else {
      finishTyping();
    }
  };
  typingTimer = setTimeout(step, delay);
}

/* ---------- streaming reveal ---------- */
function initStream() {
  const items = [...document.querySelectorAll('[data-stream]')];
  if (REDUCED || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  /* --k = order inside its section, so blocks arriving together cascade */
  const bySection = new Map();
  items.forEach((el) => {
    const sec = el.closest('section') || document.body;
    const n = bySection.get(sec) || 0;
    el.style.setProperty('--k', String(Math.min(n, 6)));
    bySection.set(sec, n + 1);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
}

/* ---------- nav border once the hero scrolls away ---------- */
function initNav() {
  const nav = document.querySelector('.ai-nav');
  const hero = document.querySelector('.ai-hero');
  if (!nav || !hero || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e]) => {
    nav.classList.toggle('is-scrolled', e.intersectionRatio < 0.85);
  }, { threshold: [0.85] }).observe(hero);
}

/* ---------- demo tabs ---------- */
function initDemo() {
  const root = document.querySelector('[data-demo]');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const ink = root.querySelector('.ai-tab__ink');

  function select(idx, focus) {
    tabs.forEach((tab, i) => {
      const on = i === idx;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (!panel) return;
      panel.hidden = !on;
      if (on) {
        panel.classList.remove('is-swap');
        void panel.offsetWidth;            /* restart the rise animation */
        panel.classList.add('is-swap');
      }
    });
    if (ink) ink.style.setProperty('--i', String(idx));
    if (focus) tabs[idx].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i, false));
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      let next = null;
      if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
      else if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = last;
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
  });
  const start = tabs.findIndex((tb) => tb.getAttribute('aria-selected') === 'true');
  if (ink) ink.style.setProperty('--i', String(start < 0 ? 2 : start));
}

/* ---------- SKILL.md reader ---------- */
function initReader() {
  const dlg = document.querySelector('[data-reader]');
  const body = document.querySelector('[data-reader-body]');
  const title = document.getElementById('ai-reader-title');
  const close = document.querySelector('[data-reader-close]');
  const supported = dlg && typeof dlg.showModal === 'function';

  document.querySelectorAll('[data-read]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.read;
      if (!supported) { window.open(url, '_blank', 'noopener'); return; }
      title.textContent = btn.dataset.readTitle || '';
      body.textContent = t('ai.tk.loading');
      dlg.showModal();
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(String(res.status));
        body.textContent = await res.text();
      } catch (err) {
        body.textContent = t('ai.tk.loadFail');
      }
      body.scrollTop = 0;
    });
  });
  if (!supported) return;
  close.addEventListener('click', () => dlg.close());
  /* click on the backdrop (outside the box) closes */
  dlg.addEventListener('click', (e) => {
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dlg.close();
  });
}

/* ---------- boot ---------- */
function boot() {
  onLangChange(() => finishTyping());
  document.querySelectorAll('.ai-lang__btn').forEach((b) => {
    b.addEventListener('click', () => { applyLang(b.dataset.lang); syncLangButtons(b.dataset.lang); });
  });
  const lang = getInitialLang();
  applyLang(lang);
  syncLangButtons(lang);

  initNav();
  initDemo();
  initReader();
  initStream();
  startTyping(650);
}

boot();
