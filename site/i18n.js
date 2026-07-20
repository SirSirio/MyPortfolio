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
    'calc.reduced.ghost': `MAP → STRATEGY → EXECUTE`,

    /* OT-2 deep-dive (data-proj="ot2") */
    'dd.back': `&#8592;&nbsp;back to work`,
    'dd.eyebrow': `lab automation · DALSA (DTU Arena for Life Science Automation) · 2025`,
    'dd.lede': `A design-thinking project that hands the lab's most repetitive step — loading a gel by hand — to an Opentrons OT-2 robot, without giving up the slab gel's flexibility and low cost.`,
    'dd.meta': `6-month solo project &middot; DTU Bioengineering &middot; graded&nbsp;12/12`,
    'dd.mastheadCap': `the prototype running the real protocol at DTU — no hand on a pipette.`,

    'dd.s1.label': `the problem`,
    'dd.s1.h2': `A verification step almost every experiment passes through — still loaded by hand.`,
    'dd.s1.p1': `Gel electrophoresis is one of molecular biology's most established techniques — rarely the endpoint, almost always the quality-control gate: confirming a PCR worked, checking a digest, sizing fragments off a run.`,
    'dd.s1.p2': `But loading one means pipetting sample after sample into a row of tiny wells, by hand — repetitive, slow, fatiguing, easy to get wrong, and worse the more samples you run. It is low-value manual work standing between a researcher and the science itself.`,
    'dd.s1.p3': `The friction bites hardest where budgets are tightest — academic labs, start-ups, small biotech teams. Closed cartridge systems can automate it but are expensive and rigid; manual slab gels stay cheap and flexible. This project lives in the gap between them.`,

    'dd.s2.label': `the approach`,
    'dd.s2.h2': `Understand the real problem before designing anything.`,
    'dd.s2.body': `The whole project ran on the <strong>Double Diamond</strong> process &mdash; Discover, Define, Develop, Deliver &mdash; exploring the problem before converging on a solution, so the design answered a real need, not a guessed one.`,
    'dd.s2.li1': `<span class="dd-list__k">Stakeholder analysis</span> &mdash; a Power &times; Interest map putting the lab workforce &mdash; researchers, PhDs, students &mdash; at the centre, as the people who feel the friction daily.`,
    'dd.s2.li2': `<span class="dd-list__k">Semi-structured interviews</span> that surfaced a clear split: people who run a few gels occasionally (manual is fine for them), and people running them daily at twenty to a hundred-plus samples &mdash; for whom loading is a real bottleneck.`,
    'dd.s2.li3': `<span class="dd-list__k">A market survey of 19 systems</span> &mdash; 12 general lab-automation platforms and 7 dedicated electrophoresis systems &mdash; pinpointing the gap between manual slab gels and expensive closed cartridge machines.`,
    'dd.s2.brief': `That synthesis became an innovation brief with one direction: selectively automate the most repetitive, error-prone steps &mdash; sample handling and gel loading &mdash; while keeping the slab gel's low-cost, flexible workflow intact. Carried out solo at <a class="dd-link" href="https://dalsa.dtu.dk/" target="_blank" rel="noopener">DALSA&nbsp;&#8599;</a>, DTU's Arena for Life Science Automation.`,
    'dd.diamond.aria': `The Double Diamond design process: two diamonds, each expanding then narrowing. Diamond one is the problem space (Discover diverges to explore, Define converges to a brief); diamond two is the solution space (Develop diverges to prototype, Deliver converges to the shipped build).`,
    'dd.diamond.problem': `the problem`,
    'dd.diamond.solution': `the solution`,
    'dd.cue.diverge': `diverge`,
    'dd.cue.converge': `converge`,
    'dd.phase.d1': `explore the problem widely`,
    'dd.phase.d2': `narrow to a clear brief`,
    'dd.phase.d3': `prototype the parts + protocol`,
    'dd.phase.d4': `test + ship the working OT-2`,
    'dd.diamond.cap': `the Double Diamond — explore wide (diverge), then narrow down (converge); once on the problem, once on the solution.`,

    'dd.s3.label': `the build`,
    'dd.s3.h2': `Five 3D-printed parts and a custom protocol on the OT-2.`,
    'dd.s3.intro': `The first prototype was a fully custom gel-casting cassette designed in Fusion360 with 3D-printed combs. It hit a manufacturability wall &mdash; the comb spacing couldn't meet standard PCR-strip geometry &mdash; so it gave way to a more robust route: mounting the existing <a class="dd-link" href="https://embitec.com/runone-electrophoresis-system/" target="_blank" rel="noopener">RunOne&#8482; MultiCaster&nbsp;&#8599;</a> casting system directly onto the robot's deck.`,
    'dd.s3.beforeCap': `the starting point — a stock, general-purpose OT-2 liquid handler.`,
    'dd.s3.beforeAlt': `An off-the-shelf Opentrons OT-2 liquid-handling robot — the general-purpose platform this build starts from`,
    'dd.s3.listIntro': `Five parts followed in Fusion360, each with interlocking cubic mating features so they seat repeatably on the deck:`,
    'dd.s3.li1': `<span class="dd-list__k">OT-2 deck adapter</span> &mdash; the mechanical interface between MultiCaster and deck.`,
    'dd.s3.li2': `<span class="dd-list__k">Three PCR strip racks</span> &mdash; positions 1&ndash;48, permanently labelled.`,
    'dd.s3.li3': `<span class="dd-list__k">Loading-buffer &amp; ladder rack</span> &mdash; reagents where the protocol expects them.`,
    'dd.s3.li4': `<span class="dd-list__k">Rack holder</span> &mdash; locating the racks precisely.`,
    'dd.s3.deckCap': `the deck plan — where each rack and reagent sits.`,
    'dd.s3.deckAlt': `Sirio's OT-2 deck allocation map for the gel-electrophoresis protocol — the plan for where each rack, reagent and gel tray sits on the robot deck`,
    'dd.s3.protocol': `A custom Opentrons OT-2 protocol drives the run. Rather than a fixed script it is parameterised — the operator sets how many strips, what volume, whether loading buffer and a molecular-weight ladder are included. Under the hood it loads a split strip across half a column at a time, uses air-gap dispensing to protect small volumes, and lifts the tip slowly from each well so the sample settles cleanly into its lane.`,
    'dd.s3.uiCap': `the parameterised run — strips, volume, buffer and ladder, set before the robot starts.`,
    'dd.s3.uiAlt': `The parameterised-run interface of Sirio's OT-2 protocol — the operator sets the number of strips, the volume, and whether a loading buffer and a molecular-weight ladder are included before the run`,

    'dd.s4.label': `the outcome`,
    'dd.s4.h2': `A working prototype — and a clear next iteration.`,
    'dd.s4.stat1': `samples per run — 3 gels × 48`,
    'dd.s4.stat2': `per gel, tested and functional`,
    'dd.s4.stat3': `final grade`,
    'dd.s4.p1': `Tested and confirmed working: up to 144 samples per run across three gels, about ten minutes per gel — keeping the slab gel's low cost and flexibility while lifting the repetitive pipetting off a person's hands.`,
    'dd.s4.p2': `As a prototype, it closes on where it goes next: operator feedback after repeated runs; magnetic or V-groove mating features for faster, more repeatable assembly; a modified comb with a dedicated ladder lane; support for multiple gel sizes; automated covering-buffer dispensing; and short calibration and dry-run checks so the robot verifies its own alignment before a run.`
  },

  it: {
    /* head */
    'meta.title': `Sirio Feltrin`,

    /* hero */
    'hero.intro': `Ciao, sono`,
    /* Trailing U+00A0 is load-bearing: unlike English (where the "a" article-stub
       lives in the lead and the engine glues "a"+"n" -> "an"), the Italian article
       is a whole separate word carried in each term's `prefix` ("un ", "uno ").
       Without this separator the line renders "Sonoun Designer". */
    'hero.type.lead': `Sono\u00A0`,
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
    'calc.reduced.ghost': `MAPPA → STRATEGIA → ESEGUI`,

    /* OT-2 deep-dive (data-proj="ot2") */
    'dd.back': `&#8592;&nbsp;torna ai lavori`,
    'dd.eyebrow': `automazione di laboratorio · DALSA (DTU Arena for Life Science Automation) · 2025`,
    'dd.lede': `Un progetto di design thinking che affida il passaggio più ripetitivo del laboratorio — caricare un gel a mano — a un robot Opentrons OT-2, senza rinunciare alla flessibilità e al basso costo del gel a lastra.`,
    'dd.meta': `progetto individuale di 6 mesi &middot; DTU Bioengineering &middot; valutato&nbsp;12/12`,
    'dd.mastheadCap': `il prototipo che esegue il protocollo reale al DTU — nessuna mano sulla pipetta.`,

    'dd.s1.label': `il problema`,
    'dd.s1.h2': `Un passaggio di verifica attraverso cui passa quasi ogni esperimento — ancora caricato a mano.`,
    'dd.s1.p1': `L'elettroforesi su gel è una delle tecniche più consolidate della biologia molecolare — raramente il punto d'arrivo, quasi sempre il controllo di qualità: confermare che una PCR ha funzionato, verificare una digestione, misurare i frammenti di una corsa.`,
    'dd.s1.p2': `Ma caricarne uno significa pipettare campione dopo campione in una fila di minuscoli pozzetti, a mano — ripetitivo, lento, faticoso, facile da sbagliare, e peggiore quanti più campioni si eseguono. È lavoro manuale di scarso valore che si frappone tra un ricercatore e la scienza stessa.`,
    'dd.s1.p3': `L'attrito morde più forte dove i budget sono più stretti — laboratori accademici, start-up, piccoli team di biotech. I sistemi a cartuccia chiusa possono automatizzarlo ma sono costosi e rigidi; i gel a lastra manuali restano economici e flessibili. Questo progetto vive nel divario tra i due.`,

    'dd.s2.label': `l'approccio`,
    'dd.s2.h2': `Capire il problema reale prima di progettare qualsiasi cosa.`,
    'dd.s2.body': `L'intero progetto si è basato sul processo <strong>Double Diamond</strong> &mdash; Discover, Define, Develop, Deliver &mdash; esplorando il problema prima di convergere su una soluzione, così che il design rispondesse a un bisogno reale, non a uno ipotizzato.`,
    'dd.s2.li1': `<span class="dd-list__k">Analisi degli stakeholder</span> &mdash; una mappa Potere &times; Interesse che mette la forza lavoro del laboratorio &mdash; ricercatori, dottorandi, studenti &mdash; al centro, come le persone che vivono l'attrito ogni giorno.`,
    'dd.s2.li2': `<span class="dd-list__k">Interviste semi-strutturate</span> che hanno fatto emergere una netta divisione: chi esegue pochi gel occasionalmente (per loro il manuale va bene), e chi li esegue ogni giorno da venti a oltre cento campioni &mdash; per cui il caricamento è un vero collo di bottiglia.`,
    'dd.s2.li3': `<span class="dd-list__k">Un'indagine di mercato su 19 sistemi</span> &mdash; 12 piattaforme generiche di automazione da laboratorio e 7 sistemi dedicati all'elettroforesi &mdash; individuando il divario tra i gel a lastra manuali e le costose macchine a cartuccia chiusa.`,
    'dd.s2.brief': `Quella sintesi è diventata un innovation brief con una sola direzione: automatizzare selettivamente i passaggi più ripetitivi e soggetti a errore &mdash; la gestione dei campioni e il caricamento del gel &mdash; mantenendo intatto il flusso di lavoro flessibile e a basso costo del gel a lastra. Realizzato in autonomia al <a class="dd-link" href="https://dalsa.dtu.dk/" target="_blank" rel="noopener">DALSA&nbsp;&#8599;</a>, l'Arena del DTU per l'automazione delle scienze della vita.`,
    'dd.diamond.aria': `Il processo di design Double Diamond: due diamanti, ciascuno che si espande poi si restringe. Il primo diamante è lo spazio del problema (Discover diverge per esplorare, Define converge in un brief); il secondo diamante è lo spazio della soluzione (Develop diverge per prototipare, Deliver converge nella build rilasciata).`,
    'dd.diamond.problem': `il problema`,
    'dd.diamond.solution': `la soluzione`,
    'dd.cue.diverge': `divergi`,
    'dd.cue.converge': `convergi`,
    'dd.phase.d1': `esplora ampiamente il problema`,
    'dd.phase.d2': `restringi a un brief chiaro`,
    'dd.phase.d3': `prototipa le parti + il protocollo`,
    'dd.phase.d4': `testa + rilascia l'OT-2 funzionante`,
    'dd.diamond.cap': `il Double Diamond — esplora in ampiezza (divergi), poi restringi (convergi); una volta sul problema, una volta sulla soluzione.`,

    'dd.s3.label': `la realizzazione`,
    'dd.s3.h2': `Cinque parti stampate in 3D e un protocollo personalizzato sull'OT-2.`,
    'dd.s3.intro': `Il primo prototipo era una cassetta per la colata del gel completamente su misura, progettata in Fusion360 con pettini stampati in 3D. Ha incontrato un muro di producibilità &mdash; la spaziatura dei pettini non riusciva a rispettare la geometria standard delle strip PCR &mdash; così ha lasciato spazio a una via più robusta: montare il sistema di colata <a class="dd-link" href="https://embitec.com/runone-electrophoresis-system/" target="_blank" rel="noopener">RunOne&#8482; MultiCaster&nbsp;&#8599;</a> esistente direttamente sul deck del robot.`,
    'dd.s3.beforeCap': `il punto di partenza — un OT-2 di serie, per la gestione dei liquidi generica.`,
    'dd.s3.beforeAlt': `Un robot Opentrons OT-2 per la gestione dei liquidi pronto all'uso — la piattaforma generica da cui parte questa realizzazione`,
    'dd.s3.listIntro': `Sono seguite cinque parti in Fusion360, ciascuna con incastri cubici interbloccanti così da posizionarsi in modo ripetibile sul deck:`,
    'dd.s3.li1': `<span class="dd-list__k">Adattatore per il deck dell'OT-2</span> &mdash; l'interfaccia meccanica tra il MultiCaster e il deck.`,
    'dd.s3.li2': `<span class="dd-list__k">Tre rack per strip PCR</span> &mdash; posizioni 1&ndash;48, etichettate in modo permanente.`,
    'dd.s3.li3': `<span class="dd-list__k">Rack per loading buffer &amp; ladder</span> &mdash; i reagenti dove il protocollo se li aspetta.`,
    'dd.s3.li4': `<span class="dd-list__k">Porta-rack</span> &mdash; posiziona i rack con precisione.`,
    'dd.s3.deckCap': `il piano del deck — dove si trova ogni rack e reagente.`,
    'dd.s3.deckAlt': `La mappa di allocazione del deck OT-2 di Sirio per il protocollo di elettroforesi su gel — il piano di dove ogni rack, reagente e vassoio per gel si trova sul deck del robot`,
    'dd.s3.protocol': `Un protocollo Opentrons OT-2 personalizzato guida l'esecuzione. Anziché uno script fisso è parametrizzato — l'operatore imposta quante strip, quale volume, se includere il loading buffer e un marcatore di peso molecolare. Sotto il cofano carica una strip divisa su metà colonna alla volta, usa il dosaggio con air-gap per proteggere i piccoli volumi, e solleva lentamente il puntale da ogni pozzetto così che il campione si depositi in modo pulito nella sua corsia.`,
    'dd.s3.uiCap': `l'esecuzione parametrizzata — strip, volume, buffer e ladder, impostati prima che il robot parta.`,
    'dd.s3.uiAlt': `L'interfaccia di esecuzione parametrizzata del protocollo OT-2 di Sirio — l'operatore imposta il numero di strip, il volume, e se includere un loading buffer e un marcatore di peso molecolare prima dell'esecuzione`,

    'dd.s4.label': `il risultato`,
    'dd.s4.h2': `Un prototipo funzionante — e una chiara iterazione successiva.`,
    'dd.s4.stat1': `campioni per ciclo — 3 gel × 48`,
    'dd.s4.stat2': `per gel, testato e funzionante`,
    'dd.s4.stat3': `voto finale`,
    'dd.s4.p1': `Testato e confermato funzionante: fino a 144 campioni per ciclo su tre gel, circa dieci minuti per gel — mantenendo il basso costo e la flessibilità del gel a lastra mentre solleva il pipettaggio ripetitivo dalle mani di una persona.`,
    'dd.s4.p2': `Come prototipo, si chiude su dove andrà poi: feedback degli operatori dopo esecuzioni ripetute; incastri magnetici o a V per un assemblaggio più rapido e ripetibile; un pettine modificato con una corsia dedicata al ladder; supporto per più dimensioni di gel; dosaggio automatizzato del buffer di copertura; e brevi controlli di calibrazione e prova a vuoto così che il robot verifichi il proprio allineamento prima di un'esecuzione.`
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
