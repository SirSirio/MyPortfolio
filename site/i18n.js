/* Sirio Feltrin — i18n engine + bilingual dictionary (leaf ES module).

   Owns the EN/IT language switch for the whole portfolio. 100% client-side,
   dependency-free: no build step, no npm, no CDN, no i18n library. Imports NOTHING
   (a leaf) so it can be pulled in by main.js and method.js without a cycle.

   Trust model (threat T-p2u-01): every value in STRINGS / TERMS is an
   author-controlled literal. No user input, URL param or network data ever reaches
   this dictionary or applyLang. `data-i18n` (textContent) carries all plain text;
   `data-i18n-rich` (innerHTML) is reserved for the handful of strings that already
   contain author-written inline markup (a <span class="grad">, an <em>, a <b>, an
   &nbsp;/&amp; entity). That is the SAME trust model as the literal strings set in
   method.js and star-engine.js.

   The wordmark ("Sirio") and the hero star engine are NOT translated and carry no
   data-i18n attribute — they are byte-for-byte behaviourally unchanged. */

export const LANGS = ['en', 'it'];

/* Keys are short, semantic and dot-namespaced. STRINGS.en mirrors the shipped
   English exactly (so EN renders unchanged); STRINGS.it is a faithful, honest
   translation that MIRRORS the English punctuation (em-dashes, ·, &amp;) so the two
   languages lay out identically. Proper nouns follow the locked policy: brands,
   products, acronyms, citations and the Double Diamond phase names stay as-is;
   Copenhagen -> Copenaghen; descriptive project titles are translated. */
export const STRINGS = {
  en: {
    /* head */
    'meta.title': `Sirio Feltrin`,

    /* hero */
    'hero.intro': `Hello, I am`,
    'hero.type.lead': `I am a`,
    'hero.corner': `COPENHAGEN · 2026`,
    'hero.scroll': `SCROLL`,

    /* mission (#index) */
    'mission.label': `what I do`,
    'mission.line': `Biotechnology MSc at DTU Copenhagen. I design and build the <span class="grad">hardware, software and automation</span> that free scientists from repetitive lab work.`,
    'nav.pill.work': `01&nbsp;WORK&nbsp;&#8600;`,
    'nav.pill.experience': `02&nbsp;EXPERIENCE&nbsp;&#8600;`,
    'nav.pill.publications': `03&nbsp;PUBLICATIONS&nbsp;&#8600;`,
    'nav.pill.contact': `04&nbsp;CONTACT&nbsp;&#8600;`,

    /* origin (About) */
    'origin.label': `// ORIGIN`,
    'origin.h2': `How I got here`,
    'origin.beat1': `For five years my hands were in the lab — mammalian cells, microbiology, fermentation, cell-free systems — and I led the wet lab for EndoSense, DTU's iGEM cell-free biosensor. Biotechnology is where I learned how good science actually gets made at the bench, one careful experiment at a time.`,
    'origin.beat2': `What drains me isn't physical work — it's repetition: running the same protocol dozens of times with no room to think. Between that and countless late nights fixing broken lab equipment, one thing became impossible to ignore — repetitive manual work is the real bottleneck in the lab. What energizes me is the opposite: the design layer, conceiving the tools, fixtures and workflows that make the bench work better.`,
    'origin.beat3': `So I crossed into the design layer — Fusion360 CAD, 3D-printed parts, custom automation, an MSc thesis on a portable precision liquid dispenser. My years at the bench aren't behind me; they're the edge, and I build these tools for the people who have to use them. Product design is the constant, the domain stays flexible, and the logic never changes: repetitive work is the bottleneck in the lab, so I automate it.`,

    /* selected work (#work) */
    'work.label': `things I've designed and built`,
    'work.h2': `Selected Work`,
    'work.plate1.meta': `MSc thesis · 2026`,
    'work.plate1.title': `Portable Precision Liquid Dispenser`,
    'work.plate1.body': `A self-designed MSc thesis: a modular, field-deployable device for accurate liquid dispensing in point-of-care diagnostics, pandemic monitoring and field research. Fusion360 CAD tool for the mechanics, Arduino with electronics and motors, 3D printing, and a custom AI-assisted testing app that runs automated sample analysis using Design of Experiments.`,
    'work.plate1.label': `[ device animation / video ]`,
    'work.plate1.aria': `Peristaltic pump-head animation and the proto-02 dispensing clip — opens Sirio's thesis-tools site`,
    'work.plate1.videoAria': `Proto-02 peristaltic pump head dispensing a 5 µL droplet, filmed on Sirio's thesis prototype`,
    'work.plate2.meta': `Lab automation · 2025`,
    'work.plate2.title': `Automated Gel Electrophoresis`,
    'work.plate2.body': `Gel electrophoresis is one of the most common techniques in a molecular biology lab — and loading a gel means pipetting sample after sample by hand, slow and easy to get wrong. I interviewed the lab's students and researchers and mapped the workflow, which confirmed the manual loading was the real bottleneck. So I automated it: five 3D-printed components designed in the Fusion360 CAD tool, driven by a custom protocol on the Opentrons OT-2 liquid-handling robot. Built solo at DALSA (DTU Arena for Life Science Automation), the prototype handles up to 144 samples per run at ~10 minutes per gel. Graded 12/12.`,
    'work.plate2.label': `[ project video / image ]`,
    'work.plate2.aria': `Open the Automated Gel Electrophoresis case study`,
    'work.plate2.videoAria': `Timelapse of the Opentrons OT-2 liquid-handling robot running Sirio's gel-electrophoresis protocol in the DTU lab, handling his green 3D-printed racks, pink PCR strip racks and a blue gel tray`,
    'work.blueprint.adapter': `CAD render of the 3D-printed adapter Sirio designed for the OT-2 deck`,
    'work.blueprint.pcr': `CAD render of Sirio's 3D-printed PCR strip racks`,
    'work.blueprint.buffer': `CAD render of Sirio's 3D-printed rack for loading buffer and molecular-weight ladders`,
    'work.blueprint.holder': `CAD render of the 3D-printed rack holder Sirio designed`,
    'work.plate3.meta': `iGEM · 2024`,
    'work.plate3.title': `EndoSense`,
    'work.plate3.body': `A cell-free biosensor for detecting endocrine-disrupting compounds in drinking water, built as Wet Lab Lead of the DTU iGEM team. Allosteric transcription factors act as the sensing elements, with a Broccoli RNA aptamer reporter and a light-based readout. Awarded an iGEM Gold Medal at the 2024 Paris Jamboree.`,
    'work.plate3.label': `[ project image ]`,
    'work.plate3.imgAlt': `EndoSense cell-free biosensor in action — DTU iGEM 2024; opens the project wiki`,
    'work.plate3.link': `IGEM WIKI&nbsp;&#8599;`,

    /* experience (#experience) */
    'exp.label': `where I've worked and studied`,
    'exp.h2': `Experience`,
    'exp.row1.period': `2024 — Present`,
    'exp.row1.role': `Student Assistant — PM Team`,
    'exp.row1.at': `AGC Biologics, Copenhagen`,
    'exp.row2.period': `2024 — 2026`,
    'exp.row2.role': `MSc Biotechnology`,
    'exp.row2.at': `DTU Copenhagen`,
    'exp.row3.period': `2024`,
    'exp.row3.role': `iGEM Wet Lab Lead — EndoSense Biosensor`,
    'exp.row3.at': `iGEM Gold Medal`,
    'exp.row4.period': `2023`,
    'exp.row4.role': `Research Intern — CIBIO, UniTrento`,
    'exp.row4.at': `EMBO publication`,

    /* publications (#publications) */
    'pub.label': `research I've contributed to`,
    'pub.h2': `Publications`,
    'pub.role': `— Contributing author`,

    /* method (#method) */
    'method.label': `// METHOD`,
    'method.h2': `How I work with AI`,
    'method.m1': `I was ten, and I hated long division. The calculator could just do it.`,
    'method.m2': `My teacher said I could use it — but only if I already knew what I was asking it. Otherwise it wouldn't help me.`,
    'method.m3': `I ignored her, and spent a year typing numbers until they matched the answers in the back of the book. I understood nothing.`,
    'method.m4': `So I learned the order: map the problem, choose the strategy, then let the tool execute. Never the reverse.`,
    'method.m5': `Same bottleneck, one layer up. AI is the biggest calculator I've been handed. <em class="ph__em">The direction is still mine.</em>`,

    'track.digital.kind': `DIGITAL`,
    'track.digital.for': `websites, apps, tooling — like this page`,
    'track.digital.title': `Spec-driven development, run by GSD`,
    'track.digital.ph1.name': `Discuss`,
    'track.digital.ph1.desc': `Lock decisions before planning.`,
    'track.digital.ph2.name': `Plan`,
    'track.digital.ph2.desc': `Research first, then atomic tasks.`,
    'track.digital.ph3.name': `Execute`,
    'track.digital.ph3.desc': `Parallel waves, atomic commits.`,
    'track.digital.foot': `Lock decisions before plans, plans before code. It runs <b>straight through and ships</b> &mdash; research, verification and atomic commits, keeping the AI's context lean as the project grows.`,
    'track.digital.deck': `GSD is open source&nbsp;&#8599;`,

    'track.physical.kind': `PHYSICAL`,
    'track.physical.for': `the dispenser, the bench, the thesis hardware`,
    'track.physical.title': `Working with AI is one continuous loop`,
    'track.physical.ph1.name': `Discuss&nbsp;&amp;&nbsp;Design`,
    'track.physical.ph1.desc': `Talk through the next move; AI proposes it — then argues each design decision and models the physics.`,
    'track.physical.ph2.name': `Build&nbsp;&amp;&nbsp;Iterate`,
    'track.physical.ph2.desc': `Custom tools and artifacts get built along the way &mdash; often to <em class="ph__em">make</em> the decisions, not just to carry them out.`,
    'track.physical.ph3.name': `Test`,
    'track.physical.ph3.desc': `The design meets the real thing, and the real thing decides. Reality is the pressure test.`,
    'track.physical.ph4.name': `Analyze&nbsp;Data`,
    'track.physical.ph4.desc': `AI processes the results and runs the stats.`,
    'track.physical.ph4.note': `↳ I give the direction — it writes the custom Python. It does not run itself.`,
    'track.physical.docTag': `DOCUMENT`,
    'track.physical.docTxt': `Captured continuously &mdash; not a step at the end. Because the discussion happens in text, the results arrive already analysed and presentation-ready. <b>The documentation is written while the test is running.</b>`,
    'track.physical.foot': `Nothing here ships and stops — the real thing answers back, and the loop comes round again.`,

    'method.ev.label': `IN PRACTICE`,
    'method.ev1': `The same method built my thesis tooling — and this page.`,
    'method.ev2': `AI shortens the gap between an idea and a finished thing. It does not choose the idea.`,

    /* contact (#contact) */
    'contact.label': `get in touch`,
    'contact.h2': `Let's build something.`,

    /* method calculator — dynamic strings injected by method.js at play time */
    'calc.ghost.q': `873 ÷ 41 = ?`,
    'calc.mash': `ANSWER MATCHED. UNDERSTOOD NOTHING.`,
    'calc.order.head': `THEN I LEARNED THE ORDER`,
    'calc.line1': `MAP THE PROBLEM`,
    'calc.line2': `CHOOSE THE STRATEGY`,
    'calc.line3': `LET THE TOOL EXECUTE`,
    'calc.reverse': `NEVER THE REVERSE`,
    'calc.direction': `THE DIRECTION IS MINE`,
    'calc.reduced.ghost': `MAP → STRATEGY → EXECUTE`
  },

  it: {
    /* head */
    'meta.title': `Sirio Feltrin`,

    /* hero */
    'hero.intro': `Ciao, sono`,
    'hero.type.lead': `Sono`,
    'hero.corner': `COPENAGHEN · 2026`,
    'hero.scroll': `SCORRI`,

    /* mission (#index) */
    'mission.label': `cosa faccio`,
    'mission.line': `MSc in Biotecnologie al DTU di Copenaghen. Progetto e costruisco l'<span class="grad">hardware, il software e l'automazione</span> che liberano gli scienziati dal lavoro ripetitivo in laboratorio.`,
    'nav.pill.work': `01&nbsp;LAVORI&nbsp;&#8600;`,
    'nav.pill.experience': `02&nbsp;ESPERIENZA&nbsp;&#8600;`,
    'nav.pill.publications': `03&nbsp;PUBBLICAZIONI&nbsp;&#8600;`,
    'nav.pill.contact': `04&nbsp;CONTATTI&nbsp;&#8600;`,

    /* origin (About) */
    'origin.label': `// ORIGINI`,
    'origin.h2': `Come sono arrivato qui`,
    'origin.beat1': `Per cinque anni ho avuto le mani in laboratorio — cellule di mammifero, microbiologia, fermentazione, sistemi cell-free — e ho guidato il wet lab di EndoSense, il biosensore cell-free del team iGEM del DTU. La biotecnologia è dove ho imparato come si fa davvero la buona scienza al bancone, un esperimento accurato alla volta.`,
    'origin.beat2': `Ciò che mi svuota non è il lavoro fisico — è la ripetizione: eseguire lo stesso protocollo decine di volte senza spazio per pensare. Tra questo e infinite nottate passate a riparare strumenti di laboratorio guasti, una cosa è diventata impossibile da ignorare — il lavoro manuale ripetitivo è il vero collo di bottiglia del laboratorio. Ciò che mi dà energia è l'opposto: il livello progettuale, ideare gli strumenti, i supporti e i flussi di lavoro che fanno funzionare meglio il bancone.`,
    'origin.beat3': `Così sono passato al livello progettuale — CAD in Fusion360, parti stampate in 3D, automazione su misura, una tesi magistrale su un dispenser portatile di precisione per liquidi. I miei anni al bancone non sono alle mie spalle; sono il mio vantaggio, e costruisco questi strumenti per le persone che devono usarli. Il product design è la costante, il dominio resta flessibile, e la logica non cambia mai: il lavoro ripetitivo è il collo di bottiglia del laboratorio, quindi lo automatizzo.`,

    /* selected work (#work) */
    'work.label': `cose che ho progettato e costruito`,
    'work.h2': `Lavori selezionati`,
    'work.plate1.meta': `Tesi magistrale · 2026`,
    'work.plate1.title': `Dispenser Portatile di Precisione per Liquidi`,
    'work.plate1.body': `Una tesi magistrale progettata in autonomia: un dispositivo modulare e utilizzabile sul campo per il dosaggio accurato di liquidi nella diagnostica point-of-care, nel monitoraggio delle pandemie e nella ricerca sul campo. Fusion360 come strumento CAD per la meccanica, Arduino con elettronica e motori, stampa 3D, e un'app di test personalizzata e assistita dall'IA che esegue l'analisi automatizzata dei campioni tramite Design of Experiments.`,
    'work.plate1.label': `[ animazione dispositivo / video ]`,
    'work.plate1.aria': `Animazione della testa della pompa peristaltica e la clip di dosaggio del proto-02 — apre il sito thesis-tools di Sirio`,
    'work.plate1.videoAria': `La testa della pompa peristaltica del proto-02 mentre dosa una goccia da 5 µL, ripresa sul prototipo di tesi di Sirio`,
    'work.plate2.meta': `Automazione di laboratorio · 2025`,
    'work.plate2.title': `Elettroforesi su Gel Automatizzata`,
    'work.plate2.body': `L'elettroforesi su gel è una delle tecniche più comuni in un laboratorio di biologia molecolare — e caricare un gel significa pipettare campione dopo campione a mano, un processo lento e facile da sbagliare. Ho intervistato gli studenti e i ricercatori del laboratorio e mappato il flusso di lavoro, il che ha confermato che il caricamento manuale era il vero collo di bottiglia. Così l'ho automatizzato: cinque componenti stampati in 3D progettati con lo strumento CAD Fusion360, guidati da un protocollo personalizzato sul robot per la gestione dei liquidi Opentrons OT-2. Realizzato in autonomia al DALSA (DTU Arena for Life Science Automation), il prototipo gestisce fino a 144 campioni per ciclo a ~10 minuti per gel. Valutato 12/12.`,
    'work.plate2.label': `[ video / immagine del progetto ]`,
    'work.plate2.aria': `Apri il caso studio dell'Elettroforesi su Gel Automatizzata`,
    'work.plate2.videoAria': `Timelapse del robot Opentrons OT-2 per la gestione dei liquidi mentre esegue il protocollo di elettroforesi su gel di Sirio nel laboratorio del DTU, maneggiando i suoi rack verdi stampati in 3D, i rack rosa per strip PCR e un vassoio per gel blu`,
    'work.blueprint.adapter': `Render CAD dell'adattatore stampato in 3D progettato da Sirio per il deck dell'OT-2`,
    'work.blueprint.pcr': `Render CAD dei rack per strip PCR stampati in 3D di Sirio`,
    'work.blueprint.buffer': `Render CAD del rack stampato in 3D di Sirio per il caricamento di buffer e marcatori di peso molecolare`,
    'work.blueprint.holder': `Render CAD del porta-rack stampato in 3D progettato da Sirio`,
    'work.plate3.meta': `iGEM · 2024`,
    'work.plate3.title': `EndoSense`,
    'work.plate3.body': `Un biosensore cell-free per rilevare gli interferenti endocrini nell'acqua potabile, realizzato come Wet Lab Lead del team iGEM del DTU. Fattori di trascrizione allosterici fungono da elementi sensibili, con un reporter ad aptamero a RNA Broccoli e una lettura basata sulla luce. Premiato con una Medaglia d'Oro iGEM al Jamboree di Parigi 2024.`,
    'work.plate3.label': `[ immagine del progetto ]`,
    'work.plate3.imgAlt': `Il biosensore cell-free EndoSense in azione — DTU iGEM 2024; apre il wiki del progetto`,
    'work.plate3.link': `WIKI IGEM&nbsp;&#8599;`,

    /* experience (#experience) */
    'exp.label': `dove ho lavorato e studiato`,
    'exp.h2': `Esperienza`,
    'exp.row1.period': `2024 — Presente`,
    'exp.row1.role': `Assistente Studente — Team PM`,
    'exp.row1.at': `AGC Biologics, Copenaghen`,
    'exp.row2.period': `2024 — 2026`,
    'exp.row2.role': `MSc in Biotecnologie`,
    'exp.row2.at': `DTU Copenaghen`,
    'exp.row3.period': `2024`,
    'exp.row3.role': `iGEM Wet Lab Lead — Biosensore EndoSense`,
    'exp.row3.at': `Medaglia d'Oro iGEM`,
    'exp.row4.period': `2023`,
    'exp.row4.role': `Tirocinante di Ricerca — CIBIO, UniTrento`,
    'exp.row4.at': `Pubblicazione EMBO`,

    /* publications (#publications) */
    'pub.label': `ricerca a cui ho contribuito`,
    'pub.h2': `Pubblicazioni`,
    'pub.role': `— Autore contributore`,

    /* method (#method) */
    'method.label': `// METODO`,
    'method.h2': `Come lavoro con l'IA`,
    'method.m1': `Avevo dieci anni e odiavo le divisioni in colonna. La calcolatrice poteva semplicemente farle.`,
    'method.m2': `La mia insegnante disse che potevo usarla — ma solo se sapevo già cosa le stavo chiedendo. Altrimenti non mi avrebbe aiutato.`,
    'method.m3': `La ignorai, e passai un anno a digitare numeri finché non coincidevano con le risposte in fondo al libro. Non capii nulla.`,
    'method.m4': `Così imparai l'ordine: mappa il problema, scegli la strategia, poi lascia che lo strumento esegua. Mai il contrario.`,
    'method.m5': `Stesso collo di bottiglia, un livello più su. L'IA è la calcolatrice più grande che mi sia stata data. <em class="ph__em">La direzione resta la mia.</em>`,

    'track.digital.kind': `DIGITALE`,
    'track.digital.for': `siti web, app, strumenti — come questa pagina`,
    'track.digital.title': `Sviluppo guidato da specifiche, orchestrato da GSD`,
    'track.digital.ph1.name': `Discuti`,
    'track.digital.ph1.desc': `Fissa le decisioni prima di pianificare.`,
    'track.digital.ph2.name': `Pianifica`,
    'track.digital.ph2.desc': `Prima la ricerca, poi task atomici.`,
    'track.digital.ph3.name': `Esegui`,
    'track.digital.ph3.desc': `Ondate parallele, commit atomici.`,
    'track.digital.foot': `Fissa le decisioni prima dei piani, i piani prima del codice. Procede <b>dritto fino al rilascio</b> &mdash; ricerca, verifica e commit atomici, mantenendo snello il contesto dell'IA man mano che il progetto cresce.`,
    'track.digital.deck': `GSD è open source&nbsp;&#8599;`,

    'track.physical.kind': `FISICO`,
    'track.physical.for': `il dispenser, il bancone, l'hardware della tesi`,
    'track.physical.title': `Lavorare con l'IA è un unico ciclo continuo`,
    'track.physical.ph1.name': `Discuti&nbsp;&amp;&nbsp;Progetta`,
    'track.physical.ph1.desc': `Discutiamo la mossa successiva; l'IA la propone — poi argomenta ogni decisione progettuale e modella la fisica.`,
    'track.physical.ph2.name': `Costruisci&nbsp;&amp;&nbsp;Itera`,
    'track.physical.ph2.desc': `Strumenti e artefatti su misura vengono costruiti lungo il percorso &mdash; spesso per <em class="ph__em">prendere</em> le decisioni, non solo per eseguirle.`,
    'track.physical.ph3.name': `Test`,
    'track.physical.ph3.desc': `Il progetto incontra la realtà, e la realtà decide. La realtà è il banco di prova.`,
    'track.physical.ph4.name': `Analizza&nbsp;i&nbsp;Dati`,
    'track.physical.ph4.desc': `L'IA elabora i risultati ed esegue le statistiche.`,
    'track.physical.ph4.note': `↳ Io do la direzione — lui scrive il Python su misura. Non si esegue da solo.`,
    'track.physical.docTag': `DOCUMENTA`,
    'track.physical.docTxt': `Catturata di continuo &mdash; non un passaggio finale. Poiché la discussione avviene in testo, i risultati arrivano già analizzati e pronti da presentare. <b>La documentazione viene scritta mentre il test è in corso.</b>`,
    'track.physical.foot': `Qui nulla si rilascia e si ferma — la realtà risponde, e il ciclo ricomincia.`,

    'method.ev.label': `IN PRATICA`,
    'method.ev1': `Lo stesso metodo ha costruito gli strumenti della mia tesi — e questa pagina.`,
    'method.ev2': `L'IA accorcia la distanza tra un'idea e una cosa finita. Non sceglie l'idea.`,

    /* contact (#contact) */
    'contact.label': `mettiti in contatto`,
    'contact.h2': `Costruiamo qualcosa.`,

    /* method calculator — dynamic strings injected by method.js at play time */
    'calc.ghost.q': `873 ÷ 41 = ?`,
    'calc.mash': `RISPOSTA TROVATA. NIENTE CAPITO.`,
    'calc.order.head': `POI HO IMPARATO L'ORDINE`,
    'calc.line1': `MAPPA IL PROBLEMA`,
    'calc.line2': `SCEGLI LA STRATEGIA`,
    'calc.line3': `LASCIA ESEGUIRE LO STRUMENTO`,
    'calc.reverse': `MAI IL CONTRARIO`,
    'calc.direction': `LA DIREZIONE È MIA`,
    'calc.reduced.ghost': `MAPPA → STRATEGIA → ESEGUI`
  }
};

/* Hero typewriter terms — ordered, mapped POSITIONALLY to the star engine's 8
   gradients (the palette is design, not language, so it stays in the engine). EN
   supplies `text` only; the engine's vowel rule computes the article (a/an). IT
   supplies `text` AND an explicit `prefix` (the correct Italian article incl.
   trailing space) so gendered articles are exact, never guessed. Sirio is the
   subject, so every Italian article is masculine. */
export const TERMS = {
  en: [
    { text: 'Engineer' },
    { text: 'Designer' },
    { text: 'Developer' },
    { text: 'Biotechnologist' },
    { text: 'Product Maker' },
    { text: 'Lab Automator' },
    { text: 'Data Analyst' },
    { text: 'AI enthusiast' }
  ],
  it: [
    { text: 'Ingegnere', prefix: 'un ' },
    { text: 'Designer', prefix: 'un ' },
    { text: 'Sviluppatore', prefix: 'uno ' },
    { text: 'Biotecnologo', prefix: 'un ' },
    { text: 'Creatore di prodotti', prefix: 'un ' },
    { text: 'Automatore di laboratorio', prefix: 'un ' },
    { text: 'Analista di dati', prefix: 'un ' },
    { text: 'Appassionato di IA', prefix: 'un ' }
  ]
};

/* ---------- engine ---------- */

let _lang = 'en';                 /* current language; 'en' until the first applyLang */
const subs = new Set();           /* dynamic modules re-render on switch via these */

export function getLang() { return _lang; }

/* Stored choice wins; otherwise follow the browser (it* -> Italian), else English.
   The stored value is clamped to LANGS, so a tampered localStorage entry (threat
   T-p2u-02) degrades to English rather than a broken state. */
export function getInitialLang() {
  try {
    const stored = localStorage.getItem('sirio-lang');
    if (stored && LANGS.indexOf(stored) !== -1) return stored;
  } catch (e) { /* localStorage can throw in private modes — fall through */ }
  const nav = (navigator.language || '').toLowerCase();
  return nav.startsWith('it') ? 'it' : 'en';
}

/* EN fallback so a missing IT key degrades to English, never a blank node
   (threat T-p2u-03). */
export function t(key) {
  const L = STRINGS[_lang] || STRINGS.en;
  if (L[key] != null) return L[key];
  if (STRINGS.en[key] != null) return STRINGS.en[key];
  return key;
}

export function onLangChange(cb) { subs.add(cb); }

/* The one mutation point. Clamps the language, flips <html lang>, retitles the
   document, rewrites every annotated node (textContent / innerHTML / attributes),
   persists the choice, then notifies subscribers so the dynamic surfaces (hero
   typewriter, method calculator) re-render live. */
export function applyLang(lang) {
  _lang = LANGS.indexOf(lang) !== -1 ? lang : 'en';
  document.documentElement.lang = _lang;
  try { document.title = t('meta.title'); } catch (e) {}

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-rich]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nRich);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const idx = pair.indexOf(':');
      if (idx < 0) return;
      const attr = pair.slice(0, idx).trim();
      const key = pair.slice(idx + 1).trim();
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  try { localStorage.setItem('sirio-lang', _lang); } catch (e) {}
  subs.forEach((cb) => { try { cb(_lang); } catch (e) {} });
}
