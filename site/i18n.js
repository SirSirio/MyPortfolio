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
    'origin.beat1': `For five years I worked at the bench across mammalian cells, microbiology, fermentation and cell-free systems, and led the wet lab for EndoSense, DTU's iGEM cell-free biosensor. Biotechnology taught me how good science actually gets made at the bench, one careful experiment at a time.`,
    'origin.beat2': `What drains me is not physical work, but repetition. Running the same protocol dozens of times leaves no room to think. Between that and countless late nights fixing broken lab equipment, one thing became clear: repetitive manual work is the real bottleneck in the lab. What energises me is the design layer, conceiving the tools, fixtures and workflows that make bench work better.`,
    'origin.beat3': `So I moved into the design layer, working with Fusion360 CAD, 3D-printed parts, custom automation, and an MSc thesis on a portable precision liquid dispenser. My years at the bench are not behind me; they are my advantage, helping me build tools for the people who actually use them. Product design is the constant, the domain stays flexible, and the logic never changes: repetitive work is the bottleneck in the lab, so I automate it.`,

    /* selected work (#work) */
    'work.label': `things I've designed and built`,
    'work.h2': `Selected Work`,
    'work.plate1.meta': `MSc thesis · 2026`,
    'work.plate1.title': `Portable Precision Liquid Dispenser`,
    'work.plate1.body': `A self-designed MSc thesis developing a modular, field-deployable device for accurate liquid dispensing in point-of-care diagnostics, pandemic monitoring and field research. Built with the Fusion360 CAD tool for the mechanics, Arduino electronics and motors, 3D printing, and an AI-assisted testing app running automated sample analysis using Design of Experiments. Graded 12/12.`,
    'work.plate1.label': `[ device animation / video ]`,
    'work.plate1.aria': `Peristaltic pump-head animation and the proto-02 dispensing clip — opens Sirio's thesis-tools site`,
    'work.plate1.videoAria': `Proto-02 peristaltic pump head dispensing a 5 µL droplet, filmed on Sirio's thesis prototype`,
    'work.plate2.meta': `Lab automation · 2025`,
    'work.plate2.title': `Automated Gel Electrophoresis`,
    'work.plate2.body': `Gel electrophoresis is a core technique in molecular biology, but loading a gel means pipetting sample after sample by hand. It is slow and prone to error. I interviewed students and researchers across the lab and mapped the workflow, confirming that manual loading was the real bottleneck. To solve it, I designed five 3D-printed components in the Fusion360 CAD tool, driven by a custom protocol on the Opentrons OT-2 liquid-handling robot. Built solo at DALSA (DTU Arena for Life Science Automation), the working prototype handles up to 144 samples per run at ~10 minutes per gel. Graded 12/12.`,
    'work.plate2.label': `[ project video / image ]`,
    'work.plate2.aria': `Open the Automated Gel Electrophoresis case study`,
    'work.plate2.videoAria': `Timelapse of the Opentrons OT-2 liquid-handling robot running Sirio's gel-electrophoresis protocol in the DTU lab, handling his green 3D-printed racks, pink PCR strip racks and a blue gel tray`,
    'work.blueprint.adapter': `CAD render of the 3D-printed adapter Sirio designed for the OT-2 deck`,
    'work.blueprint.pcr': `CAD render of Sirio's 3D-printed PCR strip racks`,
    'work.blueprint.buffer': `CAD render of Sirio's 3D-printed rack for loading buffer and molecular-weight ladders`,
    'work.blueprint.holder': `CAD render of the 3D-printed rack holder Sirio designed`,
    'work.plate3.meta': `iGEM · 2024`,
    'work.plate3.title': `EndoSense`,
    'work.plate3.body': `A cell-free biosensor designed to detect endocrine-disrupting compounds in drinking water, developed while serving as Wet Lab Lead of the DTU iGEM team. Allosteric transcription factors serve as sensing elements, paired with a Broccoli RNA aptamer reporter and optical readout. The project earned an iGEM Gold Medal at the 2024 Paris Jamboree.`,
    'work.plate3.label': `[ project image ]`,
    'work.plate3.imgAlt': `EndoSense cell-free biosensor in action — DTU iGEM 2024; opens the project wiki`,
    'work.plate3.link': `IGEM WIKI&nbsp;&#8599;`,

    /* Plate 004 — the software plate (quick 260824-fms, D-07). Its OWN namespace
       (work.plateSw.*) rather than a renumber, so plate2/plate3 stay byte-identical
       and no other file has to change. Facts: profile.md:58 (the thesis testing app),
       :196-199 (the AGC shift app), :336-361 (the search engine), plus the four
       first-party Pump Validator screenshots. */
    'work.plateSw.meta': `Software · 2024 — 2026`,
    'work.plateSw.title': `Digital Solutions for the Lab`,
    'work.plateSw.intro': `Repetitive digital work is the same bottleneck as repetitive bench work, only it happens behind a screen. I design and build custom software tools that eliminate it:`,
    'work.plateSw.li1': `<span class="dd-list__k">Pump Validator</span> &mdash; runs randomised test campaigns and logs every measurement as a structured record.`,
    'work.plateSw.li2': `<span class="dd-list__k">Literature search engine</span> &mdash; fuses seven scientific APIs into one ranked feed.`,
    'work.plateSw.li3': `<span class="dd-list__k">Shift &amp; operations web app</span> &mdash; built for AGC Biologics, handling scheduling that off-the-shelf tools could not.`,
    'work.plateSw.outro': `These are examples of an approach, not its limits: structure data at capture, and remove friction from the process.`,
    'sw.zoom.aria': `View this screenshot at full size`,
    'sw.zoom.hint': `[ click to enlarge ]`,
    'lb.close': `Close the enlarged view`,
    'work.plateSw.label': `[ live data animation ]`,
    'work.plateSw.aria': `Open the digital solutions case study`,

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
    'track.digital.foot': `Lock decisions before plans, and plans before code. The workflow runs <b>straight through and ships</b>, combining research, verification and atomic commits while keeping the AI's context window lean.`,
    'track.digital.deck': `GSD is open source&nbsp;&#8599;`,

    'track.physical.kind': `PHYSICAL`,
    'track.physical.for': `the dispenser, the bench, the thesis hardware`,
    'track.physical.title': `Working with AI is one continuous loop`,
    'track.physical.ph1.name': `Discuss&nbsp;&amp;&nbsp;Design`,
    'track.physical.ph1.desc': `Talk through the next move. The AI proposes solutions, questions design decisions, and helps model the physics.`,
    'track.physical.ph2.name': `Build&nbsp;&amp;&nbsp;Iterate`,
    'track.physical.ph2.desc': `Custom tools and artifacts are built along the way, often to <em class="ph__em">make</em> decisions rather than simply execute them.`,
    'track.physical.ph3.name': `Test`,
    'track.physical.ph3.desc': `The design meets physical reality, and physical reality decides. Testing is the filter.`,
    'track.physical.ph4.name': `Analyze&nbsp;Data`,
    'track.physical.ph4.desc': `AI processes the results and runs the stats.`,
    'track.physical.ph4.note': `↳ I set the direction; the AI writes the custom Python. It does not run itself.`,
    'track.physical.docTag': `DOCUMENT`,
    'track.physical.docTxt': `Documentation is captured continuously rather than left for the end. Because work happens in text, results arrive structured and analysed. <b>The documentation is written while the test is running.</b>`,
    'track.physical.foot': `Nothing ships and stops. Real-world testing provides feedback, and the iteration loop begins again.`,

    'method.ev.label': `IN PRACTICE`,
    'method.ev1': `This same approach built my thesis tooling and this website.`,
    'method.ev2': `AI shortens the distance between an idea and a working solution. It never chooses the direction.`,

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
    'dd.lede': `A design-led project transferring the lab's most tedious step, manual gel loading, to an Opentrons OT-2 robot while keeping the slab gel's flexibility and low cost intact.`,
    'dd.meta': `6-month solo project &middot; DTU Bioengineering &middot; graded&nbsp;12/12`,
    'dd.mastheadCap': `the prototype running the full protocol at DTU without manual pipetting.`,

    'dd.s1.label': `the problem`,
    'dd.s1.h2': `A standard verification step in molecular biology, still loaded by hand.`,
    'dd.s1.p1': `Gel electrophoresis is a staple in molecular biology, rarely the final goal but almost always the quality-control gate: verifying a PCR reaction, inspecting a digest, or sizing DNA fragments.`,
    'dd.s1.p2': `Loading a gel requires pipetting samples into tiny wells by hand. The process is slow, repetitive, fatiguing, and increasingly error-prone as sample counts grow. It is low-value manual labour standing between scientists and actual discovery.`,
    'dd.s1.p3': `This bottleneck hits hardest where resources are constrained: academic groups, start-ups, and small biotechs. Closed cartridge systems automate the process but remain rigid and costly, while manual slab gels remain affordable and adaptable. This project bridges that gap.`,

    'dd.s2.label': `the approach`,
    'dd.s2.h2': `Understand the problem before designing anything.`,
    'dd.s2.body': `The project followed the <strong>Double Diamond</strong> framework (Discover, Define, Develop, Deliver), exploring user needs broadly before focusing on an implementation, so the design answered a real need, not a guessed one.`,
    'dd.s2.li1': `<span class="dd-list__k">Stakeholder analysis</span> &mdash; a Power × Interest map placing the lab workforce (researchers, PhDs, students) at the centre as primary users facing daily friction.`,
    'dd.s2.li2': `<span class="dd-list__k">Semi-structured interviews</span> that revealed a clear contrast: researchers running occasional gels are satisfied with manual pipetting, while daily users handling twenty to over a hundred samples find loading a real bottleneck.`,
    'dd.s2.li3': `<span class="dd-list__k">A market survey of 19 systems</span> &mdash; 12 general lab-automation platforms and 7 dedicated electrophoresis systems, highlighting the opportunity between manual slab gels and expensive closed cartridge instruments.`,
    'dd.s2.brief': `This research defined an innovation brief: automate the most tedious steps, sample handling and gel loading, while preserving the low-cost slab-gel format. The project was carried out solo at <a class="dd-link" href="https://dalsa.dtu.dk/" target="_blank" rel="noopener">DALSA&nbsp;&#8599;</a>, DTU's Arena for Life Science Automation.`,
    'dd.diamond.aria': `The Double Diamond design process: two diamonds, each expanding then narrowing. Diamond one is the problem space (Discover diverges to explore, Define converges to a brief); diamond two is the solution space (Develop diverges to prototype, Deliver converges to the shipped build).`,
    'dd.diamond.problem': `the problem`,
    'dd.diamond.solution': `the solution`,
    'dd.cue.diverge': `diverge`,
    'dd.cue.converge': `converge`,
    'dd.phase.d1': `explore the problem widely`,
    'dd.phase.d2': `narrow to a clear brief`,
    'dd.phase.d3': `prototype the parts + protocol`,
    'dd.phase.d4': `test + ship the working OT-2`,
    'dd.diamond.cap': `the Double Diamond framework: explore wide (diverge) then focus (converge), first on problem definition, then on solution design.`,

    'dd.s3.label': `the build`,
    'dd.s3.h2': `Five 3D-printed components and a custom protocol on the OT-2.`,
    'dd.s3.intro': `The initial prototype was a custom casting cassette designed in Fusion360 with 3D-printed combs. When comb spacing conflicted with standard PCR-strip geometry, I pivoted to a more reliable solution: adapting the commercial <a class="dd-link" href="https://embitec.com/runone-electrophoresis-system/" target="_blank" rel="noopener">RunOne&#8482; MultiCaster&nbsp;&#8599;</a> casting system directly onto the robot deck.`,
    'dd.s3.beforeCap': `the baseline: a standard, general-purpose OT-2 liquid handler.`,
    'dd.s3.beforeAlt': `An off-the-shelf Opentrons OT-2 liquid-handling robot — the general-purpose platform this build starts from`,
    'dd.s3.listIntro': `Five parts followed, designed in Fusion360 with interlocking features so they seat repeatably on the deck:`,
    'dd.s3.li1': `<span class="dd-list__k">OT-2 deck adapter</span> &mdash; the mechanical interface between MultiCaster and deck.`,
    'dd.s3.li2': `<span class="dd-list__k">Three PCR strip racks</span> &mdash; positions 1&ndash;48, permanently labelled.`,
    'dd.s3.li3': `<span class="dd-list__k">Loading-buffer &amp; ladder rack</span> &mdash; reagents where the protocol expects them.`,
    'dd.s3.li4': `<span class="dd-list__k">Rack holder</span> &mdash; locating the racks precisely.`,
    'dd.s3.deckCap': `the deck layout showing rack and reagent positions.`,
    'dd.s3.deckAlt': `Sirio's OT-2 deck allocation map for the gel-electrophoresis protocol — the plan for where each rack, reagent and gel tray sits on the robot deck`,
    'dd.s3.protocol': `A custom Opentrons OT-2 protocol controls the run. Instead of a rigid script, it is parameterised: operators configure strip numbers, volumes, loading buffer, and molecular-weight ladder. The protocol handles split strips half a column at a time, employs air-gap dispensing to protect low volumes, and lifts tips slowly from wells to ensure samples settle cleanly.`,
    'dd.s3.uiCap': `the parameterised configuration for strips, volume, buffer, and ladder before starting.`,
    'dd.s3.uiAlt': `The parameterised-run interface of Sirio's OT-2 protocol — the operator sets the number of strips, the volume, and whether a loading buffer and a molecular-weight ladder are included before the run`,

    'dd.s4.label': `the outcome`,
    'dd.s4.h2': `A functional prototype and its next iteration.`,
    'dd.s4.stat1': `samples per run — 3 gels × 48`,
    'dd.s4.stat2': `per gel, tested and functional`,
    'dd.s4.stat3': `final grade`,
    'dd.s4.p1': `Tested and confirmed functional: up to 144 samples per run across three gels, taking about ten minutes per gel. The system preserves slab-gel flexibility while removing manual pipetting from researchers.`,
    'dd.s4.p2': `Next planned improvements include gathering routine operator feedback, adding magnetic or V-groove alignment for faster assembly, modifying combs with a dedicated ladder lane, supporting diverse gel sizes, automating buffer dispensing, and adding pre-run calibration routines so the robot verifies its own positioning.`,

    /* Digital-solutions deep-dive (data-proj="soft") — quick 260824-fms.
       An UMBRELLA case study (D-01): one overall framing, then three chapters.
       Mirrors the dd.* structure exactly and REUSES dd.back for both back links.
       ⚠ Chapter one's four captures show DEMONSTRATION data ("Demo Experiments"
       vs "Lab Syringe Pump") — the copy describes what the dashboard DOES and
       never quotes a value or implies a thesis result (T-fms-06).
       ⚠ Chapter three is text-only and says nothing beyond profile.md:196-199
       (D-04): no screenshot, no internal detail, no headcount, no deployment
       claim. The app is IN PROGRESS, so it stays present-progressive. */
    'sw.eyebrow': `software · MSc thesis tooling and AGC Biologics · 2024 — 2026`,
    'sw.lede': `I built three software tools for the same reason I build hardware: routine tasks should not require manual labour. One managed my thesis testing campaign, one searches scientific literature, and one is built to coordinate shift scheduling.`,
    'sw.meta': `three tools &middot; Python, REST APIs, relational databases &middot; built solo`,
    'sw.heroCap': `three tools with one goal: structuring data at the moment of capture.`,
    'sw.hero.aria': `A data-flow diagram: three source nodes on the left — the testing app, the search engine and the shift app — each curving into a single horizontal spine on the right that ends in one node labelled structured data.`,

    'sw.s1.label': `the problem`,
    'sw.s1.h2': `The same bottleneck, one layer up.`,
    'sw.s1.p1': `Five years at the bench showed me what actually exhausts scientists. It is rarely physical effort, but repetitive execution: running identical protocols with no mental space left for analysis. The projects on this site were built to eliminate that friction.`,
    'sw.s1.p2': `Desk work shares the exact same problem: manually typing run data into spreadsheets, querying multiple databases that rank results inconsistently, or coordinating department shifts in static files that people forget to update. None of this is genuine science, yet it consumes the hours meant for research.`,
    'sw.s1.p3': `The solution remains identical across domains: isolate the repetitive step and delegate it to automation. These three tools apply that principle to software rather than physical mechanisms.`,

    'sw.s2.label': `chapter one — the testing app`,
    'sw.s2.h2': `A test campaign that documents itself.`,
    'sw.s2.problem': `A Design of Experiments campaign requires running repeated measurements in a randomised sequence, so that drift cannot pass itself off as a real effect. Executing this manually is slow and prone to sequencing or logging errors, which typically remain hidden until analysis long after testing concludes.`,
    'sw.s2.build': `My MSc thesis required a dedicated software tool. Pump Validator configured, executed, and analysed test campaigns, providing the validation data for my custom liquid dispenser.`,
    'sw.s2.li1': `<span class="dd-list__k">Data Collection</span> &mdash; experimental parameters are established prior to measurement: operator details, hardware setup, and a Design of Experiments table of target volumes, flow rates and replicates imported from a spreadsheet, automatically generating randomised run sequences and directory structures.`,
    'sw.s2.li2': `<span class="dd-list__k">Analysis &amp; Dashboard</span> &mdash; processes experiment folders to evaluate pump accuracy and precision across target volume and flow-rate ranges using interactive charts.`,
    'sw.s2.li3': `<span class="dd-list__k">Run Campaign</span> &mdash; automated execution: the runner drives the pump through test sequences, recording data unattended.`,
    'sw.s2.li4': `<span class="dd-list__k">Gravimetric Analysis</span> &mdash; sensor-free validation based on mass measurements, calculating stroke volumes, calibration curves, precision and evaporation.`,
    'sw.s2.outcome': `The dashboards are useful, but the real point is capturing structured data immediately: organised directories, clean run logs, and standardised records. Analysis becomes an automated script rather than manual transcription.`,
    'sw.s2.cap1': `four integrated modules to configure, execute, analyse, and gravimetrically evaluate campaigns.`,
    'sw.s2.alt1': `The Pump Validator landing screen: the app name and the subtitle "Precision flow measurement & analysis pipeline" under a hexagonal mark, above four module cards — Data Collection, Analysis & Dashboard, Run Campaign and Gravimetric Analysis`,
    'sw.s2.cap2': `the run order is randomised before testing begins, and the design table is imported straight from a spreadsheet.`,
    'sw.s2.alt2': `The Data Collection setup screen: an experiment-info panel with base folder, operator, experiment title, configuration and description fields, above a Design of Experiments table with columns for row index, target volume in microlitres, target flow rate in microlitres per minute, and replicates`,
    'sw.s2.cap3': `evaluating accuracy and precision across conditions to characterise dispenser performance. Shown with demonstration data.`,
    'sw.s2.alt3': `The analysis dashboard: a volume-accuracy bar chart and a CV-percent precision bar chart across volume and flow-rate conditions, plus an accuracy-versus-precision scatter plot, comparing two series labelled Demo Experiments and Lab Syringe Pump`,
    'sw.s2.cap4': `performance metrics across volume and rate bands to quickly spot edge conditions. Shown with demonstration data.`,
    'sw.s2.alt4': `The category score breakdown: a matrix scoring each pump by volume category (small, medium, large) against flow-rate category (slow, medium, fast), with an overall score per pump, for two series labelled Demo Experiments and Lab Syringe Pump`,

    'sw.s3.label': `chapter two — the search engine`,
    'sw.s3.h2': `Seven databases, one ranked list.`,
    'sw.s3.problem': `Literature review usually requires repeating queries across multiple databases, manually filtering duplicate papers, and reformatting references into a bibliography. This mechanical sorting consumes valuable time that should be spent actually understanding the science.`,
    'sw.s3.build': `To solve this, I built a Python pipeline that queries sources simultaneously, merges ranking discrepancies into a unified feed, and exports approved references directly to my LaTeX bibliography.`,
    'sw.s3.li1': `<span class="dd-list__k">Seven scientific APIs under one interface</span> &mdash; unifying PubMed (NCBI), Semantic Scholar, OpenAlex, Scopus (Elsevier), IEEE Xplore, arXiv and bioRxiv via Europe PMC, with per-source key handling, rate-limiting, institutional IP access for Scopus, and a source skipped cleanly if it goes down.`,
    'sw.s3.li2': `<span class="dd-list__k">Reciprocal Rank Fusion</span> &mdash; reconciling disparate ranking models by fusing results, scoring entries based on publication recency, total citation count, and keyword relevance in titles and abstracts.`,
    'sw.s3.li3': `<span class="dd-list__k">Citation snowballing</span> &mdash; bi-directional citation mapping from seed papers, combining OpenAlex for highly cited classic references with Semantic Scholar for recent work, preserving insights from both.`,
    'sw.s3.li4': `<span class="dd-list__k">A BibTeX pipeline</span> &mdash; abstract claim summaries, deterministic keys, diff-confirmed additions, and deduplication across citation keys, DOI, and titles.`,
    'sw.s3.outcome': `Human-in-the-loop by design: no paper enters the bibliography without review. The pipeline handles aggregation, ranking, and citation formatting, while critical evaluation of relevant literature remains mine.`,
    'sw.s3.link': `the thesis tools&nbsp;&#8599;`,
    'sw.s3.figCap': `seven distinct academic databases merged into a unified, balanced ranking.`,
    'sw.s3.figAria': `A ranking diagram: seven labelled source ticks on the left — PubMed, Semantic Scholar, OpenAlex, Scopus, IEEE Xplore, arXiv and bioRxiv — each curving to the right into a single fused, ranked column of results.`,

    'sw.s4.label': `chapter three — the shift app`,
    'sw.s4.h2': `The first question was whether to build it.`,
    'sw.s4.problem': `My team at AGC Biologics required shift management, and commercial off-the-shelf software did not match our operational workflow. The primary decision was evaluating existing platforms thoroughly before writing any code. Once existing tools proved inadequate, the clear choice was to build an internal solution.`,
    'sw.s4.build': `I designed and developed the entire application end to end, on my own initiative.`,
    'sw.s4.li1': `<span class="dd-list__k">Full infrastructure design</span> &mdash; system architecture, relational data schemas, and user workflows.`,
    'sw.s4.li2': `<span class="dd-list__k">Python back end, Microsoft cloud</span> &mdash; database-driven and responsive, so it works on a phone rather than only at a desk. I hosted it on Azure App Service to test it, and I am now preparing it for Microsoft Fabric, the platform IT asked for.`,
    'sw.s4.li3': `<span class="dd-list__k">An API between the layers</span> &mdash; designed structured request and response pipelines linking the user interface to the back end.`,
    'sw.s4.li4': `<span class="dd-list__k">Through corporate IT, independently</span> &mdash; I approached the IT department directly, mapped the infrastructure that already existed, learned their approval process for new applications and took the project through it. Getting software accepted inside a regulated biopharma environment is its own piece of engineering.`,
    'sw.s4.note': `Because this software is proprietary to AGC Biologics, this case study shows the decisions, the architecture and the process. No internal data or proprietary interfaces are shown, respecting the confidentiality required in biopharma.`,

    'sw.s5.label': `the thread`,
    'sw.s5.h2': `Three tools, one philosophy.`,
    'sw.s5.p1': `These solutions share three core principles: structure data at capture rather than during post-processing, unify fragmented sources under a clean interface, and evaluate build-versus-buy decisions pragmatically before writing code.`,
    'sw.s5.p2': `The mindset mirrors the hardware projects featured across this portfolio: isolate repetitive manual tasks, and build reliable tools to handle them.`,

    /* ---------- AI Fluency page (ai.html) + main-page band ---------- */
    'method.fl.h': `The everyday layer: AI Fluency`,
    'method.fl.p': `Behind every AI task I take on, from quick questions to full projects, sits one framework: the four competencies from Anthropic's AI Fluency course.`,
    'method.fl.link': `The AI Fluency toolkit&nbsp;&#8594;`,
    'method.fl.tracks': `For larger builds, two practical workflows sit on top:`,

    'ai.meta.title': `Practical tools for AI Fluency · Sirio Feltrin`,
    'ai.meta.desc': `A practical AI Fluency toolkit built from Anthropic's course: five printable cheat sheets, a one-page summary and two Claude skills, free to download.`,
    'ai.nav.back': `&#8592;&nbsp;Portfolio`,
    'ai.hero.h1': `Practical tools for <span class="ai-em">AI Fluency</span>`,
    'ai.hero.sub': `A toolkit drawn from Anthropic's AI Fluency course: printable sheets and two skills, free to download.`,
    'ai.hero.ask': `Build my AI Fluency page. This work matters, so ask me the key questions first.`,
    'ai.hero.chip': `using my fluency-levels skill · deep mode`,
    'ai.hero.send': `Show the answer`,
    'ai.hero.cta': `Download the toolkit&nbsp;&#8595;`,

    'ai.fw.h2': `Four competencies, one loop`,
    'ai.fw.p': `AI Fluency means working with AI effectively, efficiently, ethically and safely. Developed by Rick Dakan and Joseph Feller with Anthropic, the framework rests on four core competencies.`,
    'ai.fw.del.q': `What the AI handles, and what stays human`,
    'ai.fw.del.d': `Plan the work, then divide it.`,
    'ai.fw.del.when': `<b>Plan first</b> whenever a task has 3+ steps, or if redoing it carries high cost.`,
    'ai.fw.des.q': `Stating clearly what is needed`,
    'ai.fw.des.d': `Define the output, the method and the behaviour.`,
    'ai.fw.dis.q': `Is the generated output any good?`,
    'ai.fw.dis.d': `Check the result, the reasoning and the exchange.`,
    'ai.fw.dil.q': `Is it being used responsibly?`,
    'ai.fw.dil.d': `Protect data, disclose the AI's role, own the result.`,
    'ai.fw.loop': `Describe&nbsp;&#8594; Discern&nbsp;&#8594; Refine&nbsp;&#8594; Decide`,
    'ai.fw.loopNote': `Description and Discernment iterate until the output is right.`,
    'ai.fw.course': `The course on Anthropic Academy&nbsp;&#8599;`,

    'ai.try.h2': `The same request, three depths`,
    'ai.try.p': `The fluency-levels skill clarifies more upfront when the stakes are higher. Toggle the depth to compare.`,
    'ai.try.tabs': `Depth`,
    'ai.try.t1': `Quick`,
    'ai.try.t2': `Standard`,
    'ai.try.t3': `Deep`,
    'ai.try.asks': `It asks, for example`,
    'ai.try.l1.meta': `1 round · 3 questions`,
    'ai.try.l1.who': `The AI makes most decisions.`,
    'ai.try.l1.q1': `What is this page for, and what does success look like?`,
    'ai.try.l1.q2': `Format, length, and who will read it?`,
    'ai.try.l1.q3': `Anything it must never do, or must include?`,
    'ai.try.l1.end': `Concludes with two or three "Verify" flags on points most prone to error.`,
    'ai.try.l2.meta': `2 rounds · 7 questions`,
    'ai.try.l2.who': `Decisions are shared, requiring an initial outline to be approved.`,
    'ai.try.l2.q1': `Which parts stay with you, and which go to the AI?`,
    'ai.try.l2.q2': `What should be attached or known before starting?`,
    'ai.try.l2.q3': `Narrow or explore? Challenge or follow? Detailed or concise?`,
    'ai.try.l2.end': `Closes with a red-flag check on names, numbers, dates and absolute claims.`,
    'ai.try.l3.meta': `3 rounds · 13 questions`,
    'ai.try.l3.who': `The human makes the key decisions, while the AI challenges the plan.`,
    'ai.try.l3.q1': `Which parts need human judgment and must stay with you?`,
    'ai.try.l3.q2': `Is this a familiar field? If not, a short coaching round comes first.`,
    'ai.try.l3.q3': `Who will see the result, and do they need to know AI helped?`,
    'ai.try.l3.end': `Ends with a critical challenge, a staged plan with checkpoints, and a 4D self-grade.`,
    'ai.try.promptLabel': `What the answers add up to`,
    'ai.try.l1.prompt': `## Task<br>Build an AI Fluency page.<br>## Output<br>One page, short, for recruiters.<br>## Must never<br>Overclaim.`,
    'ai.try.l2.prompt': `## Task · ## Output · ## Must never<br>## Context and sources<br>The brief, the sheets, the existing site.<br>## Process<br>Sketch first; plan before building.<br>## Thinking partner<br>Concise; challenge where it matters.`,
    'ai.try.l3.prompt': `## Goal<br>A recruiter gets it in 30 seconds; a friend installs a skill in 2 minutes.<br>## Must never<br>Use Anthropic's logo · call an AI live · invent numbers.<br>## Checkpoints<br>Sketches · the finished page.`,
    'ai.try.note': `Captured from the session that built this page. Nothing here calls an AI.`,

    'ai.tk.h2': `The toolkit`,
    'ai.tk.p': `Printable wall sheets alongside two skills that bring the framework into a chat. Free to use and share under CC BY-NC-SA 4.0.`,
    'ai.tk.sheet.h': `Cheat sheet · 5 pages`,
    'ai.tk.sheet.p': `Map, Delegation, Description, Discernment, Diligence. One A4 sheet each.`,
    'ai.tk.sheet.dl': `PDF · 5 pages&nbsp;&#8595;`,
    'ai.tk.one.h': `One page`,
    'ai.tk.one.p': `The complete process on a single A4 sheet.`,
    'ai.tk.one.dl': `PDF · 1 page&nbsp;&#8595;`,
    'ai.tk.view': `View&nbsp;&#8599;`,
    'ai.tk.rev.h': `Prompt 4D review`,
    'ai.tk.rev.p': `Evaluates an existing prompt against the 4Ds, clarifies any gaps, and returns a refined version.`,
    'ai.tk.lev.h': `Fluency levels`,
    'ai.tk.lev.p': `Shapes a task into a structured prompt across three depths, then executes it.`,
    'ai.tk.zip': `.zip for Claude&nbsp;&#8595;`,
    'ai.tk.read': `Read it`,
    'ai.tk.install': `How to install`,
    'ai.tk.close': `Close`,
    'ai.tk.loading': `Loading…`,
    'ai.tk.loadFail': `This file could not be loaded here. Download the .zip to read it.`,
    'ai.inst.h': `Installing a skill`,
    'ai.inst.claude.h': `Claude apps`,
    'ai.inst.claude.p': `Turn on code execution in Settings &gt; Capabilities. Then open Customize &gt; Skills, choose + and Create skill, upload the .zip and switch it on.`,
    'ai.inst.code.h': `Claude Code`,
    'ai.inst.code.p': `Unzip into ~/.claude/skills/ for every project, or into .claude/skills/ for one. Then type /prompt-4d-review or /fluency-levels.`,
    'ai.inst.ag.h': `Antigravity`,
    'ai.inst.ag.p': `Unzip into .agents/skills/ in the workspace, or into ~/.gemini/config/skills/ for every project. Then type /fluency-levels, or simply ask.`,
    'ai.inst.note': `Checked against the official documentation in November 2026.`,

    'ai.made.h2': `How it was made`,
    'ai.made.p': `Two AI tools and one human directing decisions. Each step below shows who did the work.`,
    'ai.made.human': `Human`,
    'ai.made.together': `Together`,
    'ai.made.ai': `AI`,
    'ai.made.s1': `Working through the course lesson by lesson, noting key insights along the way.`,
    'ai.made.s2': `Claude parsed each lesson into structured notes, while choosing what mattered remained human.`,
    'ai.made.s3': `Claude drafted the content and layouts. Final design rules and the sign-off on each sheet remained human.`,
    'ai.made.s4': `Gemini rewrote the copy, while Claude verified every line against the course material for meaning.`,
    'ai.made.s5': `Copy and formatting adjusted by hand until every sheet read cleanly on the wall.`,

    'ai.use.h2': `Where it lives`,
    'ai.use.p1': `Printed sheets pinned beside the desk, ready for a quick glance while working with AI.`,
    'ai.use.p2': `fluency-levels is built for important tasks: Quick handles smaller jobs, while Deep serves work that is costly to redo.`,
    'ai.use.p3': `prompt-4d-review is built for a single moment: verifying a prompt before hitting send.`,
    'ai.use.cap': `the five sheets and the one-pager, rendered`,

    'ai.dil.h2': `How AI was used`,
    'ai.dil.p1': `I made these cheat sheets and skills while taking Anthropic Academy's <em>AI Fluency: Framework and foundations</em> course, working with two AI tools:`,
    'ai.dil.li1': `<b>Claude</b> (Anthropic): read the course pages and transcripts, kept structured notes, proposed the content, and built the layouts and the two skills.`,
    'ai.dil.li2': `<b>Gemini</b> (Google, in Antigravity): paraphrased the sheet text so it reads naturally.`,
    'ai.dil.p2': `Icons come from open-source sets (Phosphor, Lucide, Tabler).`,
    'ai.dil.p3': `I chose what goes on each sheet, set the design rules, and wrote or rewrote key phrases. I reviewed every sheet and every line by hand. Claude checked each paraphrased line against the course material for meaning. The final result reflects my understanding of the framework and my own choices, and I take full responsibility for its content, accuracy and presentation.`,
    'ai.dil.p4': `This page was designed and created with Claude using this exact process; I made the decisions and reviewed the result.`,
    'ai.dil.p5': `I'm sharing this disclosure because transparency about AI's role is one of the principles the course teaches.`,

    'ai.foot.lic': `Based on the AI Fluency Framework by Rick Dakan and Joseph Feller and the Anthropic Academy course, CC BY-NC-SA 4.0. These resources are shared under the same licence.`,
    'ai.foot.credits': `Credits`,
    'ai.foot.c1': `Course and framework: <a href="https://academy.claude.com/courses/ai-fluency-framework-foundations" target="_blank" rel="noopener">AI Fluency: Framework and foundations</a>, by Rick Dakan, Joseph Feller and Anthropic (CC BY-NC-SA 4.0).`,
    'ai.foot.c2': `prompt-4d-review: the idea of grading each D as Strong, Adequate or Weak comes from <a href="https://www.agensi.io/skills/4d-analyzer" target="_blank" rel="noopener">4d-analyzer</a> (agensi.io). Concept only; its content was not seen.`,
    'ai.foot.c3': `fluency-levels: ideas from <a href="https://github.com/Yeachan-Heo/oh-my-claudecode" target="_blank" rel="noopener">deep-interview</a> (oh-my-claudecode, MIT), the <a href="https://gist.github.com/xthezealot/c873effd9e74225ef3fcfbb9c3a341da" target="_blank" rel="noopener">Lyra prompt optimizer</a> and <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener">brainstorming</a> (obra/superpowers, MIT). Ideas only, in its own words.`,
    'ai.foot.c4': `Sheet icons: Phosphor, Lucide, Tabler (MIT, ISC). Fonts: Inter, Space Grotesk (SIL OFL 1.1).`,
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
    'mission.line': `MSc in Biotecnologie alla DTU di Copenaghen. Progetto e costruisco l'<span class="grad">hardware, il software e l'automazione</span> che liberano gli scienziati dal lavoro ripetitivo in laboratorio.`,
    'nav.pill.work': `01&nbsp;LAVORI&nbsp;&#8600;`,
    'nav.pill.experience': `02&nbsp;ESPERIENZA&nbsp;&#8600;`,
    'nav.pill.publications': `03&nbsp;PUBBLICAZIONI&nbsp;&#8600;`,
    'nav.pill.contact': `04&nbsp;CONTATTI&nbsp;&#8600;`,

    /* origin (About) */
    'origin.label': `// ORIGINI`,
    'origin.h2': `Come sono arrivato qui`,
    'origin.beat1': `Per cinque anni ho lavorato al bancone tra colture cellulari di mammifero, microbiologia, fermentazione e sistemi cell-free, guidando il wet lab di EndoSense, il biosensore cell-free del team iGEM della DTU. È in laboratorio che ho imparato come si costruisce la ricerca scientifica al bancone, un esperimento accurato alla volta.`,
    'origin.beat2': `A stancarmi non è la fatica fisica, ma la pura ripetizione: eseguire lo stesso protocollo decine di volte senza spazio per ragionare. Tra routine manuali e nottate a riparare strumenti guasti, una cosa è risultata evidente: il lavoro ripetitivo è il vero collo di bottiglia della ricerca. Ciò che invece mi stimola è la progettazione: ideare strumenti, componenti e flussi di lavoro che rendono il lavoro al bancone più rapido ed efficiente.`,
    'origin.beat3': `Così sono passato alla progettazione: CAD con Fusion360, componenti stampati in 3D, automazione su misura e una tesi magistrale su un dispenser di precisione per liquidi. Gli anni trascorsi al bancone non sono un capitolo chiuso, ma un punto di forza per sviluppare strumenti pensati per chi li usa ogni giorno. Il product design è la costante, l'ambito applicativo si adatta, e il principio guida resta lo stesso: il lavoro ripetitivo è il collo di bottiglia del laboratorio, quindi lo automatizzo.`,

    /* selected work (#work) */
    'work.label': `cose che ho progettato e costruito`,
    'work.h2': `Lavori selezionati`,
    'work.plate1.meta': `Tesi magistrale · 2026`,
    'work.plate1.title': `Dispenser Portatile di Precisione per Liquidi`,
    'work.plate1.body': `Una tesi magistrale sviluppata in autonomia: un dispositivo modulare e portatile per il dosaggio accurato di liquidi in contesti point-of-care e monitoraggio sul campo. Progettato con Fusion360 per la parte meccanica, integra Arduino per elettronica e motori, parti in stampa 3D e un'applicazione di collaudo assistita da intelligenza artificiale per l'analisi automatizzata dei campioni tramite Design of Experiments. Valutata 12/12.`,
    'work.plate1.label': `[ animazione dispositivo / video ]`,
    'work.plate1.aria': `Animazione della testa della pompa peristaltica e la clip di dosaggio del proto-02 — apre il sito thesis-tools di Sirio`,
    'work.plate1.videoAria': `La testa della pompa peristaltica del proto-02 mentre dosa una goccia da 5 µL, ripresa sul prototipo di tesi di Sirio`,
    'work.plate2.meta': `Automazione di laboratorio · 2025`,
    'work.plate2.title': `Elettroforesi su Gel Automatizzata`,
    'work.plate2.body': `L'elettroforesi su gel è una tecnica fondamentale in biologia molecolare, ma il caricamento manuale dei pozzetti richiede un pipettaggio continuo, lento e incline a errori. Attraverso interviste a studenti e ricercatori ho mappato l'intero flusso di lavoro, confermando che il caricamento manuale rappresentava il collo di bottiglia principale. Per automatizzarlo ho sviluppato cinque componenti stampati in 3D in Fusion360, gestiti da un protocollo personalizzato sul liquid handler Opentrons OT-2. Realizzato in autonomia presso DALSA (DTU Arena for Life Science Automation), il prototipo gestisce fino a 144 campioni per ciclo a ~10 minuti per gel. Valutato 12/12.`,
    'work.plate2.label': `[ video / immagine del progetto ]`,
    'work.plate2.aria': `Apri il caso studio dell'Elettroforesi su Gel Automatizzata`,
    'work.plate2.videoAria': `Timelapse del robot Opentrons OT-2 per la gestione dei liquidi mentre esegue il protocollo di elettroforesi su gel di Sirio nel laboratorio della DTU, maneggiando i suoi rack verdi stampati in 3D, i rack rosa per strip PCR e un vassoio per gel blu`,
    'work.blueprint.adapter': `Render CAD dell'adattatore stampato in 3D progettato da Sirio per il deck dell'OT-2`,
    'work.blueprint.pcr': `Render CAD dei rack per strip PCR stampati in 3D di Sirio`,
    'work.blueprint.buffer': `Render CAD del rack stampato in 3D di Sirio per il caricamento di buffer e marcatori di peso molecolare`,
    'work.blueprint.holder': `Render CAD del porta-rack stampato in 3D progettato da Sirio`,
    'work.plate3.meta': `iGEM · 2024`,
    'work.plate3.title': `EndoSense`,
    'work.plate3.body': `Un biosensore cell-free per individuare interferenti endocrini nell'acqua potabile, sviluppato nel ruolo di Wet Lab Lead del team iGEM di DTU. Fattori di trascrizione allosterici agiscono come elementi sensibili, accoppiati a un reporter ad aptamero a RNA Broccoli con lettura ottica. Il progetto ha ottenuto una Medaglia d'Oro iGEM al Jamboree di Parigi 2024.`,
    'work.plate3.label': `[ immagine del progetto ]`,
    'work.plate3.imgAlt': `Il biosensore cell-free EndoSense in azione — DTU iGEM 2024; apre il wiki del progetto`,
    'work.plate3.link': `WIKI IGEM&nbsp;&#8599;`,

    /* Plate 004 — la scheda software (quick 260824-fms, D-07). */
    'work.plateSw.meta': `Software · 2024 — 2026`,
    'work.plateSw.title': `Soluzioni Digitali per il Laboratorio`,
    'work.plateSw.intro': `Il lavoro digitale ripetitivo presenta lo stesso collo di bottiglia delle operazioni manuali al bancone, semplicemente dietro uno schermo. Per questo progetto e realizzo strumenti software dedicati per risolverlo:`,
    'work.plateSw.li1': `<span class="dd-list__k">Pump Validator</span> &mdash; gestisce campagne di test randomizzate e registra ogni misurazione in formato strutturato.`,
    'work.plateSw.li2': `<span class="dd-list__k">Motore di ricerca bibliografica</span> &mdash; aggrega sette API scientifiche in un unico elenco ordinato per rilevanza.`,
    'work.plateSw.li3': `<span class="dd-list__k">Web app per turni e operazioni</span> &mdash; sviluppata per AGC Biologics, gestisce esigenze di pianificazione non coperte da piattaforme commerciali.`,
    'work.plateSw.outro': `Esempi di una metodologia più ampia: strutturare i dati fin dalla fase di acquisizione e rimuovere passaggi superflui dai processi.`,
    'sw.zoom.aria': `Vedi questa schermata a grandezza reale`,
    'sw.zoom.hint': `[ clicca per ingrandire ]`,
    'lb.close': `Chiudi la vista ingrandita`,
    'work.plateSw.label': `[ animazione di dati in tempo reale ]`,
    'work.plateSw.aria': `Apri il caso studio delle soluzioni digitali`,

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
    'track.digital.foot': `Definisci le decisioni prima dei piani, e i piani prima del codice. Il flusso procede <b>dritto fino al rilascio</b>, unendo ricerca, verifica e commit atomici per mantenere snello il contesto dell'IA durante lo sviluppo.`,
    'track.digital.deck': `GSD è open source&nbsp;&#8599;`,

    'track.physical.kind': `FISICO`,
    'track.physical.for': `il dispenser, il bancone, l'hardware della tesi`,
    'track.physical.title': `Lavorare con l'IA è un unico ciclo continuo`,
    'track.physical.ph1.name': `Discuti&nbsp;&amp;&nbsp;Progetta`,
    'track.physical.ph1.desc': `Definiamo i passaggi successivi: l'IA suggerisce opzioni, analizza scelte progettuali e supporta la modellazione fisica.`,
    'track.physical.ph2.name': `Costruisci&nbsp;&amp;&nbsp;Itera`,
    'track.physical.ph2.desc': `Strumenti e artefatti dedicati nascono lungo il percorso, spesso per <em class="ph__em">prendere</em> decisioni progettuali anziché limitarsi a eseguirle.`,
    'track.physical.ph3.name': `Test`,
    'track.physical.ph3.desc': `Il design si confronta con la realtà fisica, che determina i risultati. La sperimentazione pratica guida ogni scelta.`,
    'track.physical.ph4.name': `Analizza&nbsp;i&nbsp;Dati`,
    'track.physical.ph4.desc': `L'IA elabora i risultati ed esegue le statistiche.`,
    'track.physical.ph4.note': `↳ Io imposto la direzione, l'IA genera il codice Python personalizzato. Non agisce in autonomia.`,
    'track.physical.docTag': `DOCUMENTA`,
    'track.physical.docTxt': `La documentazione è integrata nel flusso di lavoro, non posticipata alla fine. Comunicando in forma scritta, i dati risultano già strutturati e analizzati. <b>La documentazione viene scritta mentre il test è in corso.</b>`,
    'track.physical.foot': `Nessuna soluzione è statica: i risultati sperimentali guidano direttamente l'iterazione successiva.`,

    'method.ev.label': `IN PRATICA`,
    'method.ev1': `Questo stesso metodo ha sviluppato gli strumenti della mia tesi e questa pagina.`,
    'method.ev2': `L'IA riduce la distanza tra idea e soluzione pratica, ma non determina l'idea.`,

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
    'dd.lede': `Un progetto basato sul design thinking che delega il caricamento manuale a un robot Opentrons OT-2, mantenendo inalterati i vantaggi di flessibilità e accessibilità economica del classico gel a lastra.`,
    'dd.meta': `progetto individuale di 6 mesi &middot; DTU Bioengineering &middot; valutato&nbsp;12/12`,
    'dd.mastheadCap': `il prototipo durante l'esecuzione del protocollo completo alla DTU, senza intervento manuale.`,

    'dd.s1.label': `il problema`,
    'dd.s1.h2': `Un passaggio analitico comune a quasi ogni esperimento, ancora eseguito a mano.`,
    'dd.s1.p1': `L'elettroforesi su gel è uno standard della biologia molecolare, raramente fine a se stessa e quasi sempre utilizzata per controlli di qualità: confermare la riuscita di una PCR, monitorare digestioni enzimatiche o valutare le dimensioni dei frammenti.`,
    'dd.s1.p2': `Caricare un gel comporta il pipettaggio manuale in pozzetti minuscoli: un processo noioso, lento e incline a errori, soprattutto all'aumentare dei campioni. Si tratta di lavoro manuale a basso valore aggiunto che toglie tempo prezioso all'attività scientifica vera e propria.`,
    'dd.s1.p3': `Questo collo di bottiglia pesa soprattutto nei laboratori accademici, nelle startup e nei piccoli gruppi di ricerca. I sistemi a cartuccia chiusa automatizzano il processo ma risultano rigidi e costosi, mentre i gel su lastra restano economici e versatili. Questo progetto nasce per colmare questo divario.`,

    'dd.s2.label': `l'approccio`,
    'dd.s2.h2': `Comprendere il problema prima di progettare.`,
    'dd.s2.body': `Lo sviluppo ha seguito il framework <strong>Double Diamond</strong> (Discover, Define, Develop, Deliver), analizzando a fondo i bisogni degli utenti prima di convergere su una soluzione concreta che rispondesse a esigenze operative reali.`,
    'dd.s2.li1': `<span class="dd-list__k">Analisi degli stakeholder</span> &mdash; una matrice Potere × Interesse che colloca ricercatori, dottorandi e studenti al centro come principali utenti soggetti a inefficienze quotidiane.`,
    'dd.s2.li2': `<span class="dd-list__k">Interviste semi-strutturate</span> hanno evidenziato una netta distinzione: gli operatori occasionali gestiscono bene il lavoro manuale, mentre chi analizza quotidianamente da venti a oltre cento campioni individua nel caricamento il collo di bottiglia principale.`,
    'dd.s2.li3': `<span class="dd-list__k">Un'indagine di mercato su 19 sistemi</span> &mdash; 12 piattaforme di automazione generale e 7 strumenti dedicati all'elettroforesi, evidenziando lo spazio di mercato tra gel tradizionali e costosi sistemi proprietari a cartuccia.`,
    'dd.s2.brief': `L'analisi ha definito le specifiche progettuali: automatizzare in modo mirato i passaggi più critici e ripetitivi, come la gestione dei campioni e il caricamento del gel, preservando la flessibilità e l'economicità del gel a lastra. Il lavoro è stato svolto in autonomia presso <a class="dd-link" href="https://dalsa.dtu.dk/" target="_blank" rel="noopener">DALSA&nbsp;&#8599;</a>, l'Arena della DTU per l'automazione nelle scienze della vita.`,
    'dd.diamond.aria': `Il processo di design Double Diamond: due diamanti, ciascuno che si espande poi si restringe. Il primo diamante è lo spazio del problema (Discover diverge per esplorare, Define converge in un brief); il secondo diamante è lo spazio della soluzione (Develop diverge per prototipare, Deliver converge nella build rilasciata).`,
    'dd.diamond.problem': `il problema`,
    'dd.diamond.solution': `la soluzione`,
    'dd.cue.diverge': `divergi`,
    'dd.cue.converge': `convergi`,
    'dd.phase.d1': `esplora ampiamente il problema`,
    'dd.phase.d2': `restringi a un brief chiaro`,
    'dd.phase.d3': `prototipa le parti + il protocollo`,
    'dd.phase.d4': `testa + rilascia l'OT-2 funzionante`,
    'dd.diamond.cap': `il modello Double Diamond: esplorazione ampia (divergenza) e sintesi (convergenza), prima sul problema, poi sulla soluzione.`,

    'dd.s3.label': `la realizzazione`,
    'dd.s3.h2': `Cinque componenti stampati in 3D e un protocollo dedicato sull'OT-2.`,
    'dd.s3.intro': `Il primo prototipo prevedeva una cassetta di colata custom modellata in Fusion360 con pettini stampati in 3D. Quando la spaziatura dei pozzetti è risultata incompatibile con la geometria standard delle strip PCR, ho adottato una soluzione più solida: integrare il sistema commerciale di colata <a class="dd-link" href="https://embitec.com/runone-electrophoresis-system/" target="_blank" rel="noopener">RunOne&#8482; MultiCaster&nbsp;&#8599;</a> direttamente sul piano del robot.`,
    'dd.s3.beforeCap': `il punto di partenza: un liquid handler OT-2 standard per usi generali.`,
    'dd.s3.beforeAlt': `Un robot Opentrons OT-2 per la gestione dei liquidi pronto all'uso — la piattaforma generica da cui parte questa realizzazione`,
    'dd.s3.listIntro': `Cinque supporti progettati in Fusion360, dotati di incastri geometrici per un posizionamento stabile e ripetibile sul piano:`,
    'dd.s3.li1': `<span class="dd-list__k">Adattatore per il deck dell'OT-2</span> &mdash; l'interfaccia meccanica tra il MultiCaster e il deck.`,
    'dd.s3.li2': `<span class="dd-list__k">Tre rack per strip PCR</span> &mdash; posizioni 1&ndash;48, etichettate in modo permanente.`,
    'dd.s3.li3': `<span class="dd-list__k">Rack per loading buffer &amp; ladder</span> &mdash; i reagenti dove il protocollo se li aspetta.`,
    'dd.s3.li4': `<span class="dd-list__k">Porta-rack</span> &mdash; posiziona i rack con precisione.`,
    'dd.s3.deckCap': `il layout del deck con la disposizione di rack e reagenti.`,
    'dd.s3.deckAlt': `La mappa di allocazione del deck OT-2 di Sirio per il protocollo di elettroforesi su gel — il piano di dove ogni rack, reagente e vassoio per gel si trova sul deck del robot`,
    'dd.s3.protocol': `Un protocollo personalizzato per Opentrons OT-2 controlla il flusso di lavoro. Anziché uno script rigido, la procedura è parametrizzata: l'operatore definisce numero di strip, volumi, loading buffer e ladder molecolare. Il sistema carica mezza colonna per volta, sfrutta la tecnica dell'air-gap per preservare microvolumi ed estrae i puntali lentamente per garantire una deposizione uniforme nei pozzetti.`,
    'dd.s3.uiCap': `parametri operativi impostati a monte dell'esecuzione: strip, volumi, buffer e ladder.`,
    'dd.s3.uiAlt': `L'interfaccia di esecuzione parametrizzata del protocollo OT-2 di Sirio — l'operatore imposta il numero di strip, il volume, e se includere un loading buffer e un marcatore di peso molecolare prima dell'esecuzione`,

    'dd.s4.label': `il risultato`,
    'dd.s4.h2': `Un prototipo funzionale pronto per ulteriori sviluppi.`,
    'dd.s4.stat1': `campioni per ciclo — 3 gel × 48`,
    'dd.s4.stat2': `per gel, testato e funzionante`,
    'dd.s4.stat3': `voto finale`,
    'dd.s4.p1': `Collaudato con successo: gestisce fino a 144 campioni per ciclo su tre gel, con tempi di circa dieci minuti per gel. La soluzione conserva l'economicità del gel tradizionale eliminando la fatica del pipettaggio manuale.`,
    'dd.s4.p2': `I prossimi sviluppi includono: raccolta sistematica dei feedback dagli operatori, incastri magnetici o con scanalatura a V per un montaggio più rapido, un pettine con corsia dedicata al ladder, supporto per diversi formati di gel, dispensazione automatica del tampone di corsa e routine di calibrazione rapida per l'allineamento del robot prima dell'avvio.`,

    /* Approfondimento soluzioni digitali (data-proj="soft") — quick 260824-fms.
       ⚠ In IT valgono gli STESSI vincoli della versione EN: nessun valore dei
       grafici presentato come risultato di tesi (sono dati dimostrativi), e il
       capitolo tre resta solo testo, senza alcun dettaglio interno (D-04). */
    'sw.eyebrow': `software · strumenti per la tesi magistrale e AGC Biologics · 2024 — 2026`,
    'sw.lede': `Ho sviluppato tre strumenti software con la stessa filosofia dell'hardware: le mansioni ripetitive non dovrebbero gravare sul ricercatore. Il primo ha gestito i test per la mia tesi, il secondo analizza la letteratura scientifica, mentre il terzo è strutturato per gestire i turni di reparto.`,
    'sw.meta': `tre strumenti &middot; Python, API REST, database relazionali &middot; realizzati in autonomia`,
    'sw.heroCap': `tre strumenti, un obiettivo comune: strutturare i dati fin dalla fase di acquisizione.`,
    'sw.hero.aria': `Un diagramma di flusso dati: tre nodi sorgente a sinistra — l'app di test, il motore di ricerca e l'app dei turni — ciascuno che curva verso un'unica dorsale orizzontale a destra, che termina in un nodo etichettato dati strutturati.`,

    'sw.s1.label': `il problema`,
    'sw.s1.h2': `Stesso collo di bottiglia, un livello più su.`,
    'sw.s1.p1': `Cinque anni di bancone mi hanno mostrato cosa logora davvero i ricercatori. Non la fatica pratica, ma la monotonia di ripetere protocolli identici senza spazio per l'analisi critica. I progetti su questo sito nascono per superare questo limite.`,
    'sw.s1.p2': `Il lavoro alla scrivania soffre della stessa inefficienza: copiare manualmente dati nei fogli di calcolo, ripetere interrogazioni su molteplici database con criteri disomogenei, o organizzare turni di lavoro su file soggetti a dimenticanze. Nulla di tutto questo è vera ricerca, eppure sottrae tempo prezioso alla scienza.`,
    'sw.s1.p3': `La risposta rimane la medesima: individuare l'azione ripetitiva e delegarla all'automazione. Questi tre applicativi trasferiscono questo principio dal piano fisico a quello digitale.`,

    'sw.s2.label': `capitolo uno — l'app di test`,
    'sw.s2.h2': `Una campagna di test che si documenta autonomamente.`,
    'sw.s2.problem': `Condurre una campagna Design of Experiments richiede numerose misurazioni replicate in sequenza randomizzata, evitando che derive strumentali vengano scambiate per effetti reali. Eseguire questa procedura a mano è lento e soggetto a errori di trascrizione, che tipicamente emergono solo a distanza di tempo durante l'analisi dati.`,
    'sw.s2.build': `Per la tesi magistrale ho sviluppato uno strumento ad hoc: Pump Validator ha configurato, eseguito e analizzato l'intera campagna sperimentale, validando le prestazioni del dispenser da me realizzato.`,
    'sw.s2.li1': `<span class="dd-list__k">Data Collection</span> &mdash; i parametri vengono configurati a monte: dettagli operatore, setup hardware e una tabella Design of Experiments con volumi target, portate e repliche importata da un foglio di calcolo, generando automaticamente sequenze randomizzate e percorsi di archiviazione.`,
    'sw.s2.li2': `<span class="dd-list__k">Analysis &amp; Dashboard</span> &mdash; elabora i dati acquisiti valutando accuratezza e precisione per intervalli di volume e portata tramite dashboard interattive.`,
    'sw.s2.li3': `<span class="dd-list__k">Run Campaign</span> &mdash; gestione automatica: il runner comanda la pompa e registra le misure in continuo senza presidio.`,
    'sw.s2.li4': `<span class="dd-list__k">Gravimetric Analysis</span> &mdash; validazione gravimetrica basata sulla massa, con calcolo dei volumi di corsa, curve di calibrazione, precisione ed evaporazione.`,
    'sw.s2.outcome': `I grafici sono utili, ma il vero valore risiede nell'acquisire dati già formattati: file organizzati, registri puliti e schemi uniformi. L'elaborazione diventa una semplice lettura automatizzata anziché una riscrittura manuale.`,
    'sw.s2.cap1': `quattro moduli integrati: impostazione, esecuzione, analisi e verifica gravimetrica.`,
    'sw.s2.alt1': `La schermata iniziale di Pump Validator: il nome dell'app e il sottotitolo "Precision flow measurement & analysis pipeline" sotto un marchio esagonale, sopra quattro schede di modulo — Data Collection, Analysis & Dashboard, Run Campaign e Gravimetric Analysis`,
    'sw.s2.cap2': `sequenza di run definita prima delle misure e importata direttamente dai fogli di calcolo.`,
    'sw.s2.alt2': `La schermata di configurazione Data Collection: un pannello con le informazioni dell'esperimento — cartella base, operatore, titolo dell'esperimento, configurazione e descrizione — sopra una tabella Design of Experiments con le colonne indice di riga, volume target in microlitri, portata target in microlitri al minuto, e repliche`,
    'sw.s2.cap3': `accuratezza e precisione valutate condizione per condizione per validare il dispenser. Mostrato con dati dimostrativi.`,
    'sw.s2.alt3': `La dashboard di analisi: un grafico a barre dell'accuratezza di volume e uno della precisione in CV percentuale lungo le condizioni di volume e portata, più un grafico a dispersione accuratezza contro precisione, che confrontano due serie etichettate Demo Experiments e Lab Syringe Pump`,
    'sw.s2.cap4': `punteggi prestazionali per intervalli di portata e volume per individuare subito aree critiche. Mostrato con dati dimostrativi.`,
    'sw.s2.alt4': `La ripartizione dei punteggi per categoria: una matrice che valuta ogni pompa per categoria di volume (piccolo, medio, grande) contro categoria di portata (lenta, media, veloce), con un punteggio complessivo per pompa, per due serie etichettate Demo Experiments e Lab Syringe Pump`,

    'sw.s3.label': `capitolo due — il motore di ricerca`,
    'sw.s3.h2': `Sette database, un'unica lista ordinata.`,
    'sw.s3.problem': `La revisione della letteratura comporta spesso l'interrogazione ripetuta di banche dati disomogenee, la rimozione manuale dei duplicati e la riformattazione dei riferimenti in bibliografia. Un'attività meccanica che sottrae tempo prezioso alla comprensione dei contenuti.`,
    'sw.s3.build': `Per risolvere il problema ho sviluppato una pipeline in Python: interroga simultaneamente tutte le fonti, riconcilia i diversi criteri di ranking in un indice unitario e inserisce gli articoli selezionati direttamente nella bibliografia LaTeX.`,
    'sw.s3.li1': `<span class="dd-list__k">Sette API scientifiche sotto un'unica interfaccia</span> &mdash; integrazione di PubMed (NCBI), Semantic Scholar, OpenAlex, Scopus (Elsevier), IEEE Xplore, arXiv e bioRxiv tramite Europe PMC, con autenticazione e chiavi per ogni fonte, gestione dei rate limit, accesso per IP istituzionale per Scopus ed esclusione automatica delle fonti non disponibili.`,
    'sw.s3.li2': `<span class="dd-list__k">Reciprocal Rank Fusion</span> &mdash; armonizzazione di ranking divergenti tramite fusione dei risultati, pesati in base a data di pubblicazione, citazioni totali e corrispondenza di titoli e abstract con la query.`,
    'sw.s3.li3': `<span class="dd-list__k">Citation snowballing</span> &mdash; esplorazione citazionale bidirezionale a partire da pubblicazioni chiave, combinando OpenAlex per i riferimenti cardine e Semantic Scholar per la letteratura recente, valorizzando entrambi gli approcci.`,
    'sw.s3.li4': `<span class="dd-list__k">Una pipeline BibTeX</span> &mdash; estrazione sintetica delle evidenze, chiavi univoche, aggiornamenti con verifica dei diff e deduplicazione avanzata per chiave, DOI e titoli simili.`,
    'sw.s3.outcome': `Human-in-the-loop per impostazione architetturale: nessun riferimento viene registrato senza previa verifica. Il sistema gestisce acquisizione, ranking e formattazione, mentre il giudizio sui contenuti rilevanti rimane esclusivamente mio.`,
    'sw.s3.link': `gli strumenti della tesi&nbsp;&#8599;`,
    'sw.s3.figCap': `sette archivi scientifici aggregati in una classificazione ponderata, senza semplici accodamenti.`,
    'sw.s3.figAria': `Un diagramma di ordinamento: sette sorgenti etichettate a sinistra — PubMed, Semantic Scholar, OpenAlex, Scopus, IEEE Xplore, arXiv e bioRxiv — ciascuna che curva verso destra in un'unica colonna di risultati fusa e ordinata.`,

    'sw.s4.label': `capitolo tre — l'app dei turni`,
    'sw.s4.h2': `La prima scelta è stata se svilupparla.`,
    'sw.s4.problem': `Il mio dipartimento in AGC Biologics necessitava di un sistema per la gestione dei turni, e i software commerciali non rispondevano ai nostri flussi operativi. La prima decisione ha riguardato l'analisi delle alternative esistenti prima di iniziare a programmare. Appurata l'inadeguatezza delle soluzioni sul mercato, lo sviluppo interno si è rivelato la scelta giusta.`,
    'sw.s4.build': `Ho progettato e sviluppato l'intera applicazione dall'inizio alla fine, di mia iniziativa.`,
    'sw.s4.li1': `<span class="dd-list__k">Progettazione completa dell'infrastruttura</span> &mdash; architettura applicativa, modello relazionale dei dati e percorsi utente.`,
    'sw.s4.li2': `<span class="dd-list__k">Back end in Python, cloud Microsoft</span> &mdash; architettura su database e responsive per smartphone. Distribuita inizialmente su Azure App Service per i test, è ora in preparazione per Microsoft Fabric, la piattaforma indicata dal dipartimento IT.`,
    'sw.s4.li3': `<span class="dd-list__k">Un'API tra i due livelli</span> &mdash; progettazione della logica di richiesta e risposta tra interfaccia utente e servizi di back end.`,
    'sw.s4.li4': `<span class="dd-list__k">Attraverso l'IT aziendale, in autonomia</span> &mdash; mi sono rivolto direttamente all'IT aziendale per mappare i servizi esistenti, ho imparato il loro processo di approvazione per le nuove applicazioni e ho guidato il software al suo interno. Far accettare un software in un ambiente farmaceutico regolamentato è a sua volta un lavoro di ingegneria.`,
    'sw.s4.note': `Essendo un software proprietario sviluppato per AGC Biologics, questa sezione descrive architettura, scelte metodologiche e processi di integrazione, omettendo schermate e dettagli confidenziali nel pieno rispetto della riservatezza aziendale.`,

    'sw.s5.label': `il filo conduttore`,
    'sw.s5.h2': `Tre strumenti, un'unica visione.`,
    'sw.s5.p1': `Tre principi accomunano queste soluzioni: strutturare i dati all'origine evitando rielaborazioni successive, unificare fonti eterogenee sotto interfacce pulite, e valutare con trasparenza scelte di sviluppo interno rispetto a strumenti commerciali.`,
    'sw.s5.p2': `È la medesima filosofia applicata ai progetti hardware del portfolio: identificare le fasi ripetitive e automatizzarle con strumenti affidabili.`,

    /* ---------- AI Fluency page (ai.html) + main-page band ---------- */
    'method.fl.h': `Il livello di tutti i giorni: AI Fluency`,
    'method.fl.p': `Dietro ogni attività svolta con l'IA, da una rapida domanda a un intero progetto, applico lo stesso metodo: le quattro competenze del corso AI Fluency di Anthropic.`,
    'method.fl.link': `Il kit AI Fluency&nbsp;&#8594;`,
    'method.fl.tracks': `Per i progetti più complessi si innestano due flussi operativi:`,

    'ai.meta.title': `Strumenti pratici per AI Fluency · Sirio Feltrin`,
    'ai.meta.desc': `Un kit pratico di AI Fluency nato dal corso di Anthropic: cinque schede da stampare, un riassunto in una pagina e due skill per Claude, da scaricare gratis.`,
    'ai.nav.back': `&#8592;&nbsp;Portfolio`,
    'ai.hero.h1': `Strumenti pratici per <span class="ai-em">AI Fluency</span>`,
    'ai.hero.sub': `Un kit operativo sviluppato dal corso AI Fluency di Anthropic: schede da stampare e due skill, scaricabili gratuitamente.`,
    'ai.hero.ask': `Crea la mia pagina su AI Fluency. È un lavoro importante, quindi fammi prima le domande decisive.`,
    'ai.hero.chip': `con la mia skill fluency-levels · modalità approfondita`,
    'ai.hero.send': `Mostra la risposta`,
    'ai.hero.cta': `Scarica il kit&nbsp;&#8595;`,

    'ai.fw.h2': `Quattro competenze, un ciclo`,
    'ai.fw.p': `AI Fluency significa collaborare con l'IA in modo efficace, efficiente, etico e sicuro. Il framework, ideato da Rick Dakan e Joseph Feller con Anthropic, poggia su quattro competenze cardine.`,
    'ai.fw.del.q': `Cosa si delega all'IA, cosa resta umano`,
    'ai.fw.del.d': `Pianifica il lavoro, poi dividilo.`,
    'ai.fw.del.when': `<b>Prima il piano</b> se un compito richiede 3 o più passaggi, o se rifarlo costa caro.`,
    'ai.fw.des.q': `Definire chiaramente cosa serve ottenere`,
    'ai.fw.des.d': `Stabilisci il risultato, il metodo e il comportamento.`,
    'ai.fw.dis.q': `Il risultato ottenuto è davvero valido?`,
    'ai.fw.dis.d': `Verifica il risultato, il ragionamento e lo scambio.`,
    'ai.fw.dil.q': `L'utilizzo è davvero responsabile?`,
    'ai.fw.dil.d': `Proteggi i dati, dichiara il ruolo dell'IA, assumiti il risultato.`,
    'ai.fw.loop': `Descrivi&nbsp;&#8594; Valuta&nbsp;&#8594; Affina&nbsp;&#8594; Decidi`,
    'ai.fw.loopNote': `Description e Discernment iterano fino a ottenere il risultato corretto.`,
    'ai.fw.course': `Il corso su Anthropic Academy&nbsp;&#8599;`,

    'ai.try.h2': `La stessa richiesta, tre profondità`,
    'ai.try.p': `La skill fluency-levels pone più domande prima di procedere quando la posta in gioco sale. Seleziona la profondità per confrontare.`,
    'ai.try.tabs': `Profondità`,
    'ai.try.t1': `Rapida`,
    'ai.try.t2': `Standard`,
    'ai.try.t3': `Approfondita`,
    'ai.try.asks': `Chiede, per esempio`,
    'ai.try.l1.meta': `1 giro · 3 domande`,
    'ai.try.l1.who': `L'IA gestisce la maggior parte delle decisioni.`,
    'ai.try.l1.q1': `A cosa serve questa pagina, e com'è il successo?`,
    'ai.try.l1.q2': `Formato, lunghezza, e chi la leggerà?`,
    'ai.try.l1.q3': `C'è qualcosa che non deve mai fare, o che deve includere?`,
    'ai.try.l1.end': `Si conclude evidenziando due o tre punti "Verifica" sui passaggi più soggetti a imprecisioni.`,
    'ai.try.l2.meta': `2 giri · 7 domande`,
    'ai.try.l2.who': `Decisioni condivise, con una breve bozza preliminare da approvare.`,
    'ai.try.l2.q1': `Quali parti restano a te, e quali passano all'IA?`,
    'ai.try.l2.q2': `Cosa va allegato o saputo prima di iniziare?`,
    'ai.try.l2.q3': `Restringere o esplorare? Sfidare o seguire? Dettagliato o conciso?`,
    'ai.try.l2.end': `Termina con un controllo mirato su nomi, numeri, date e affermazioni assolute.`,
    'ai.try.l3.meta': `3 giri · 13 domande`,
    'ai.try.l3.who': `Le decisioni chiave le prende la persona, mentre l'IA sfida apertamente il piano.`,
    'ai.try.l3.q1': `Quali parti richiedono giudizio umano e devono restare a te?`,
    'ai.try.l3.q2': `È un campo che conosci? Se no, prima c'è un breve giro di coaching.`,
    'ai.try.l3.q3': `Chi vedrà il risultato, e deve sapere che l'IA ha aiutato?`,
    'ai.try.l3.end': `Si conclude con una sfida critica, un piano strutturato a checkpoint e un'autovalutazione 4D.`,
    'ai.try.promptLabel': `A cosa portano le risposte`,
    'ai.try.l1.prompt': `## Compito<br>Creare una pagina su AI Fluency.<br>## Risultato<br>Una pagina, breve, per i recruiter.<br>## Mai<br>Esagerare.`,
    'ai.try.l2.prompt': `## Compito · ## Risultato · ## Mai<br>## Contesto e fonti<br>Il brief, le schede, il sito esistente.<br>## Processo<br>Prima gli schizzi; il piano prima di costruire.<br>## Come comportarsi<br>Conciso; sfidare dove conta.`,
    'ai.try.l3.prompt': `## Obiettivo<br>Un recruiter capisce in 30 secondi; un amico installa una skill in 2 minuti.<br>## Mai<br>Usare il logo di Anthropic · chiamare un'IA dal vivo · inventare numeri.<br>## Checkpoint<br>Gli schizzi · la pagina finita.`,
    'ai.try.note': `Registrazione reale della sessione di sviluppo di questa pagina. Qui nulla chiama un'IA.`,

    'ai.tk.h2': `Il kit`,
    'ai.tk.p': `Schede operative da stampare e due skill per integrare il metodo nella chat. Risorse liberamente utilizzabili e condivisibili sotto licenza CC BY-NC-SA 4.0.`,
    'ai.tk.sheet.h': `Schede · 5 pagine`,
    'ai.tk.sheet.p': `Mappa, Delegation, Description, Discernment, Diligence. Una pagina A4 ciascuna.`,
    'ai.tk.sheet.dl': `PDF · 5 pagine&nbsp;&#8595;`,
    'ai.tk.one.h': `Una pagina`,
    'ai.tk.one.p': `L'intero processo racchiuso su un singolo foglio A4.`,
    'ai.tk.one.dl': `PDF · 1 pagina&nbsp;&#8595;`,
    'ai.tk.view': `Apri&nbsp;&#8599;`,
    'ai.tk.rev.h': `Prompt 4D review`,
    'ai.tk.rev.p': `Esamina un prompt esistente in base alle 4D, evidenzia le lacune e restituisce una versione ottimizzata.`,
    'ai.tk.lev.h': `Fluency levels`,
    'ai.tk.lev.p': `Struttura qualsiasi attività in un prompt dettagliato a tre livelli di profondità, per poi eseguirlo.`,
    'ai.tk.zip': `.zip per Claude&nbsp;&#8595;`,
    'ai.tk.read': `Leggila`,
    'ai.tk.install': `Come installarla`,
    'ai.tk.close': `Chiudi`,
    'ai.tk.loading': `Caricamento…`,
    'ai.tk.loadFail': `Non è stato possibile caricare il file qui. Scarica lo .zip per leggerlo.`,
    'ai.inst.h': `Installare una skill`,
    'ai.inst.claude.h': `App di Claude`,
    'ai.inst.claude.p': `Attiva l'esecuzione del codice in Impostazioni &gt; Funzionalità. Poi apri Personalizza &gt; Skill, scegli + e Crea skill, carica lo .zip e attivala.`,
    'ai.inst.code.h': `Claude Code`,
    'ai.inst.code.p': `Estrai in ~/.claude/skills/ per tutti i progetti, oppure in .claude/skills/ per uno solo. Poi scrivi /prompt-4d-review o /fluency-levels.`,
    'ai.inst.ag.h': `Antigravity`,
    'ai.inst.ag.p': `Estrai in .agents/skills/ nel workspace, oppure in ~/.gemini/config/skills/ per tutti i progetti. Poi scrivi /fluency-levels, o chiedi e basta.`,
    'ai.inst.note': `Verificato sulla documentazione ufficiale a novembre 2026.`,

    'ai.made.h2': `Come è stato fatto`,
    'ai.made.p': `Due strumenti di IA guidati da decisioni umane. Ogni passaggio riporta chiaramente chi ha svolto il lavoro.`,
    'ai.made.human': `Persona`,
    'ai.made.together': `Insieme`,
    'ai.made.ai': `IA`,
    'ai.made.s1': `Studio del corso lezione per lezione, raccogliendo riflessioni e punti chiave.`,
    'ai.made.s2': `Claude ha sintetizzato le lezioni in note strutturate; stabilire cosa fosse prioritario è rimasto compito umano.`,
    'ai.made.s3': `Claude ha elaborato proposte di testo e impaginazione. Linee guida visive e approvazione finale di ogni scheda sono rimaste umane.`,
    'ai.made.s4': `Gemini ha riformulato i testi, mentre Claude ha verificato la fedeltà concettuale riga per riga rispetto al corso.`,
    'ai.made.s5': `Rifinitura manuale di testi e impaginazione finché ogni scheda funzionava a parete.`,

    'ai.use.h2': `Dove vive`,
    'ai.use.p1': `Le schede sono affisse accanto alla scrivania, pronte per una rapida consultazione mentre si lavora con l'IA.`,
    'ai.use.p2': `fluency-levels è pensata per compiti critici: Rapida per attività brevi, Approfondita quando rifare il lavoro costa caro.`,
    'ai.use.p3': `prompt-4d-review è pensata per un passaggio chiave: revisionare accuratamente un prompt prima dell'invio.`,
    'ai.use.cap': `le cinque schede e la sintesi in pagina singola`,

    'ai.dil.h2': `Come è stata usata l'IA`,
    'ai.dil.p1': `Ho creato queste schede e queste skill mentre seguivo il corso <em>AI Fluency: Framework and foundations</em> di Anthropic Academy, lavorando con due strumenti di IA:`,
    'ai.dil.li1': `<b>Claude</b> (Anthropic): ha letto le pagine e le trascrizioni del corso, preso appunti strutturati, proposto i contenuti, e costruito i layout e le due skill.`,
    'ai.dil.li2': `<b>Gemini</b> (Google, in Antigravity): ha parafrasato il testo delle schede perché si legga in modo naturale.`,
    'ai.dil.p2': `Le icone vengono da set open source (Phosphor, Lucide, Tabler).`,
    'ai.dil.p3': `Ho scelto cosa mettere in ogni scheda, fissato le regole di design, e scritto o riscritto le frasi chiave. Ho rivisto a mano ogni scheda e ogni riga. Claude ha controllato ogni riga parafrasata sul materiale del corso per il significato. Il risultato finale riflette la mia comprensione del framework e le mie scelte, e mi assumo piena responsabilità del contenuto, dell'accuratezza e della presentazione.`,
    'ai.dil.p4': `Questa pagina è stata ideata e sviluppata con Claude applicando esattamente questo processo; le decisioni e la revisione finale sono mie.`,
    'ai.dil.p5': `Condivido questa dichiarazione perché la trasparenza sul ruolo dell'IA è uno dei principi che il corso insegna.`,

    'ai.foot.lic': `Basato sull'AI Fluency Framework di Rick Dakan e Joseph Feller e sul corso di Anthropic Academy, CC BY-NC-SA 4.0. Questi materiali sono condivisi con la stessa licenza.`,
    'ai.foot.credits': `Crediti`,
    'ai.foot.c1': `Corso e framework: <a href="https://academy.claude.com/courses/ai-fluency-framework-foundations" target="_blank" rel="noopener">AI Fluency: Framework and foundations</a>, di Rick Dakan, Joseph Feller e Anthropic (CC BY-NC-SA 4.0).`,
    'ai.foot.c2': `prompt-4d-review: l'idea di valutare ogni D come Forte, Adeguata o Debole viene da <a href="https://www.agensi.io/skills/4d-analyzer" target="_blank" rel="noopener">4d-analyzer</a> (agensi.io). Solo il concetto; il suo contenuto non è stato visto.`,
    'ai.foot.c3': `fluency-levels: idee da <a href="https://github.com/Yeachan-Heo/oh-my-claudecode" target="_blank" rel="noopener">deep-interview</a> (oh-my-claudecode, MIT), dal <a href="https://gist.github.com/xthezealot/c873effd9e74225ef3fcfbb9c3a341da" target="_blank" rel="noopener">Lyra prompt optimizer</a> e da <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener">brainstorming</a> (obra/superpowers, MIT). Solo idee, con parole proprie.`,
    'ai.foot.c4': `Icone delle schede: Phosphor, Lucide, Tabler (MIT, ISC). Font: Inter, Space Grotesk (SIL OFL 1.1).`,
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
  /* A page may name its own title key on <html data-title-key> (ai.html does);
     the main page has none and keeps 'meta.title'. */
  try { document.title = t(document.documentElement.dataset.titleKey || 'meta.title'); } catch (e) {}

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
