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

    /* Plate 004 — the software plate (quick 260824-fms, D-07). Its OWN namespace
       (work.plateSw.*) rather than a renumber, so plate2/plate3 stay byte-identical
       and no other file has to change. Facts: profile.md:58 (the thesis testing app),
       :196-199 (the AGC shift app), :336-361 (the search engine), plus the four
       first-party Pump Validator screenshots. */
    'work.plateSw.meta': `Software · 2024 — 2026`,
    'work.plateSw.title': `Digital Solutions for the Lab`,
    'work.plateSw.body': `Repetitive digital work is the same bottleneck as repetitive bench work — it just happens behind a screen. To eliminate it, I design and build custom software tools that automate manual overhead and capture clean data at the source. Pump Validator automates randomised test campaigns for hardware validation, logging measurements straight into structured records. A literature search engine aggregates and ranks results from seven scientific APIs into one unified feed. And an operations and shift web app, built for AGC Biologics, solves scheduling constraints off-the-shelf platforms could not handle. Hardware control, workflow automation or data pipelines — the philosophy is the same: structure data at the point of capture and remove friction from the process.`,
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
    'dd.s4.p2': `As a prototype, it closes on where it goes next: operator feedback after repeated runs; magnetic or V-groove mating features for faster, more repeatable assembly; a modified comb with a dedicated ladder lane; support for multiple gel sizes; automated covering-buffer dispensing; and short calibration and dry-run checks so the robot verifies its own alignment before a run.`,

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
    'sw.lede': `Three tools built for the reason I build the hardware — the repetitive part of the work should not need a person. One runs my thesis' test campaign, one reads the literature, one runs a department's shifts.`,
    'sw.meta': `three tools &middot; Python, REST APIs, relational databases &middot; built solo`,
    'sw.heroCap': `three tools, one instinct — structure the data at the moment it is captured.`,
    'sw.hero.aria': `A data-flow diagram: three source nodes on the left — the testing app, the search engine and the shift app — each curving into a single horizontal spine on the right that ends in one node labelled structured data.`,

    'sw.s1.label': `the problem`,
    'sw.s1.h2': `The same bottleneck, one layer up.`,
    'sw.s1.p1': `Five years at the bench taught me what actually drains a scientist. Not the physical work — the repetition: running the same protocol dozens of times with no room left to think. Everything else on this site exists because of that.`,
    'sw.s1.p2': `The desk has a twin of it. Transcribing a run into a spreadsheet by hand. Chasing one query across a dozen databases that each index and rank differently. Running a department's shifts out of a file somebody has to remember to update. None of it is science, and all of it stands between a person and the science.`,
    'sw.s1.p3': `So the fix is the same fix, one layer up — find the step that repeats, and hand it to something that does not mind repeating. These three tools are that instinct applied to software instead of hardware.`,

    'sw.s2.label': `chapter one — the testing app`,
    'sw.s2.h2': `A test campaign that writes itself down.`,
    'sw.s2.problem': `A Design of Experiments campaign means running the same measurement many times over, in an order deliberately randomised so that drift cannot pass itself off as an effect. Done by hand it is slow, easy to run out of order and easy to mis-key — and every one of those mistakes only surfaces later, in the analysis, when the run is long over.`,
    'sw.s2.build': `So the thesis got its own instrument. Pump Validator sets a campaign up, runs it, and analyses it, and I use it to test the dispenser I am building.`,
    'sw.s2.li1': `<span class="dd-list__k">Data Collection</span> &mdash; the experiment is defined before anything is measured: operator, hardware configuration, and a Design of Experiments table of target volumes, flow rates and replicates that pastes straight in from a spreadsheet. It generates the randomised run order and lays out the data folders.`,
    'sw.s2.li2': `<span class="dd-list__k">Analysis &amp; Dashboard</span> &mdash; loads an experiment folder and scores a pump on accuracy and precision across volume and flow-rate categories, with interactive charts.`,
    'sw.s2.li3': `<span class="dd-list__k">Run Campaign</span> &mdash; the automated route: the runner drives the pump through the campaign and logs the flow unattended.`,
    'sw.s2.li4': `<span class="dd-list__k">Gravimetric Analysis</span> &mdash; a sensor-free campaign measured by mass instead: per-stroke volume, calibration slopes, precision and evaporation.`,
    'sw.s2.outcome': `The charts are not really the point. The point is that the data arrives structured at the moment it is captured — a run order, a folder layout, one record per measurement — so the analysis is a parse and not a retype.`,
    'sw.s2.cap1': `four modules — set up a campaign, run it, analyse it, or weigh it.`,
    'sw.s2.alt1': `The Pump Validator landing screen: the app name and the subtitle "Precision flow measurement & analysis pipeline" under a hexagonal mark, above four module cards — Data Collection, Analysis & Dashboard, Run Campaign and Gravimetric Analysis`,
    'sw.s2.cap2': `the run order is decided before a single measurement is taken — and pastes straight in from a spreadsheet.`,
    'sw.s2.alt2': `The Data Collection setup screen: an experiment-info panel with base folder, operator, experiment title, configuration and description fields, above a Design of Experiments table with columns for row index, target volume in microlitres, target flow rate in microlitres per minute, and replicates`,
    'sw.s2.cap3': `accuracy and precision, condition by condition — the two questions a dispenser has to answer. Shown with demonstration data.`,
    'sw.s2.alt3': `The analysis dashboard: a volume-accuracy bar chart and a CV-percent precision bar chart across volume and flow-rate conditions, plus an accuracy-versus-precision scatter plot, comparing two series labelled Demo Experiments and Lab Syringe Pump`,
    'sw.s2.cap4': `one score per volume and flow-rate band, so a weak corner is visible at a glance. Shown with demonstration data.`,
    'sw.s2.alt4': `The category score breakdown: a matrix scoring each pump by volume category (small, medium, large) against flow-rate category (slow, medium, fast), with an overall score per pump, for two series labelled Demo Experiments and Lab Syringe Pump`,

    'sw.s3.label': `chapter two — the search engine`,
    'sw.s3.h2': `Seven databases, one ranked list.`,
    'sw.s3.problem': `Literature discovery means running the same query across databases that each index differently and each rank differently, reading past the overlap between them, and then retyping whatever survives into a bibliography. It is the mechanical half of a thesis, and it eats the time meant for the reading.`,
    'sw.s3.build': `So it became a pipeline. A Python toolchain queries every source at once, fuses their disagreeing rankings into a single list, and writes the papers I approve straight into the LaTeX bibliography.`,
    'sw.s3.li1': `<span class="dd-list__k">Seven scientific APIs under one interface</span> &mdash; PubMed (NCBI), Semantic Scholar, OpenAlex, Scopus (Elsevier), IEEE Xplore, arXiv and bioRxiv via Europe PMC, each with its own authentication and key management, rate-limit handling, institutional-IP entitlement for Scopus, and graceful self-skipping when a source is down.`,
    'sw.s3.li2': `<span class="dd-list__k">Reciprocal Rank Fusion</span> &mdash; the sources disagree, so their ranked lists get fused rather than concatenated, scoring each paper on recency, citation count and how well its title and abstract match the query.`,
    'sw.s3.li3': `<span class="dd-list__k">Citation snowballing</span> &mdash; forward and backward traversal from a seed paper, deliberately fusing two indices that disagree: OpenAlex returns the most cited, Semantic Scholar the newest, and both halves survive the merge.`,
    'sw.s3.li4': `<span class="dd-list__k">A BibTeX pipeline</span> &mdash; claim extraction from abstracts, deterministic citation keys, append-with-diff-confirmation, and deduplication by key, by DOI and by near-duplicate title.`,
    'sw.s3.outcome': `Human-in-the-loop by design: nothing is written to disk without explicit approval. The pipeline does the fetching, the merging and the formatting. The judgement about what belongs in the thesis stays mine.`,
    'sw.s3.link': `the thesis tools&nbsp;&#8599;`,
    'sw.s3.figCap': `seven sources that rank differently — fused into one list, not stacked end to end.`,
    'sw.s3.figAria': `A ranking diagram: seven labelled source ticks on the left — PubMed, Semantic Scholar, OpenAlex, Scopus, IEEE Xplore, arXiv and bioRxiv — each curving to the right into a single fused, ranked column of results.`,

    'sw.s4.label': `chapter three — the shift app`,
    'sw.s4.h2': `The first decision was whether to build it at all.`,
    'sw.s4.problem': `My department at AGC Biologics needed shift management, and nothing off the shelf fitted the way the team actually works. So the real first question was not how to build it — it was whether to. That is a decision you make by looking at what already exists before you write anything, and here the answer came back build.`,
    'sw.s4.build': `I am designing and developing it end to end, on my own initiative.`,
    'sw.s4.li1': `<span class="dd-list__k">Full infrastructure design</span> &mdash; the system architecture, the relational data model and the user flow.`,
    'sw.s4.li2': `<span class="dd-list__k">Azure-hosted, Python back end</span> &mdash; database-driven and mobile-friendly, because a shift app gets opened on a phone, not at a desk.`,
    'sw.s4.li3': `<span class="dd-list__k">An API between the layers</span> &mdash; I designed the request and response flow between the front end and the back end.`,
    'sw.s4.li4': `<span class="dd-list__k">Through corporate IT, independently</span> &mdash; I approached the IT department to map what infrastructure and services already existed internally, learned their intake and approval process for new applications, and took the project through that dialogue. Getting a solution accepted inside a regulated pharma IT landscape is its own piece of engineering.`,
    'sw.s4.note': `The app lives inside AGC Biologics, so what is on this page is the shape of the work rather than the tool — the decisions, the architecture, the process. No screenshot, no internal detail. Knowing where that line sits is part of the job.`,

    'sw.s5.label': `the thread`,
    'sw.s5.h2': `Three tools, one instinct.`,
    'sw.s5.p1': `They share three habits. Structure the data at the moment it is captured, never afterwards. Put one interface over many sources, so the mess stays on my side of it and not the user's. And decide honestly what to build and what to buy, because the wrong answer to that costs more than any of the code.`,
    'sw.s5.p2': `It is the same instinct as the hardware elsewhere on this site, in a different medium. Find the step that repeats, and take it off a person's hands.`
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
    'origin.beat1': `Per cinque anni ho avuto le mani in laboratorio — cellule di mammifero, microbiologia, fermentazione, sistemi cell-free — e ho guidato il wet lab di EndoSense, il biosensore cell-free del team iGEM della DTU. La biotecnologia è dove ho imparato come si fa davvero la buona scienza al bancone, un esperimento accurato alla volta.`,
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
    'work.plate2.videoAria': `Timelapse del robot Opentrons OT-2 per la gestione dei liquidi mentre esegue il protocollo di elettroforesi su gel di Sirio nel laboratorio della DTU, maneggiando i suoi rack verdi stampati in 3D, i rack rosa per strip PCR e un vassoio per gel blu`,
    'work.blueprint.adapter': `Render CAD dell'adattatore stampato in 3D progettato da Sirio per il deck dell'OT-2`,
    'work.blueprint.pcr': `Render CAD dei rack per strip PCR stampati in 3D di Sirio`,
    'work.blueprint.buffer': `Render CAD del rack stampato in 3D di Sirio per il caricamento di buffer e marcatori di peso molecolare`,
    'work.blueprint.holder': `Render CAD del porta-rack stampato in 3D progettato da Sirio`,
    'work.plate3.meta': `iGEM · 2024`,
    'work.plate3.title': `EndoSense`,
    'work.plate3.body': `Un biosensore cell-free per rilevare gli interferenti endocrini nell'acqua potabile, realizzato come Wet Lab Lead del team iGEM della DTU. Fattori di trascrizione allosterici fungono da elementi sensibili, con un reporter ad aptamero a RNA Broccoli e una lettura basata sulla luce. Premiato con una Medaglia d'Oro iGEM al Jamboree di Parigi 2024.`,
    'work.plate3.label': `[ immagine del progetto ]`,
    'work.plate3.imgAlt': `Il biosensore cell-free EndoSense in azione — DTU iGEM 2024; apre il wiki del progetto`,
    'work.plate3.link': `WIKI IGEM&nbsp;&#8599;`,

    /* Plate 004 — la scheda software (quick 260824-fms, D-07). */
    'work.plateSw.meta': `Software · 2024 — 2026`,
    'work.plateSw.title': `Soluzioni Digitali per il Laboratorio`,
    'work.plateSw.body': `Il lavoro digitale ripetitivo è lo stesso collo di bottiglia del lavoro ripetitivo al bancone — solo che avviene dietro uno schermo. Per eliminarlo, progetto e costruisco strumenti software su misura che automatizzano il lavoro manuale e catturano dati puliti alla fonte. Pump Validator automatizza campagne di test randomizzate per la validazione dell'hardware, registrando ogni misura direttamente in record strutturati. Un motore di ricerca aggrega e classifica i risultati di sette API di letteratura scientifica in un unico elenco. E una web app per turni e operazioni, costruita per AGC Biologics, risolve vincoli di pianificazione che nessuna piattaforma pronta all'uso riusciva a gestire. Controllo hardware, automazione dei flussi di lavoro o pipeline di dati — la filosofia è la stessa: strutturare i dati nel punto in cui vengono catturati ed eliminare l'attrito dal processo.`,
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
    'dd.mastheadCap': `il prototipo che esegue il protocollo reale alla DTU — nessuna mano sulla pipetta.`,

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
    'dd.s2.brief': `Quella sintesi è diventata un innovation brief con una sola direzione: automatizzare selettivamente i passaggi più ripetitivi e soggetti a errore &mdash; la gestione dei campioni e il caricamento del gel &mdash; mantenendo intatto il flusso di lavoro flessibile e a basso costo del gel a lastra. Realizzato in autonomia al <a class="dd-link" href="https://dalsa.dtu.dk/" target="_blank" rel="noopener">DALSA&nbsp;&#8599;</a>, l'Arena della DTU per l'automazione delle scienze della vita.`,
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
    'dd.s4.p2': `Come prototipo, si chiude su dove andrà poi: feedback degli operatori dopo esecuzioni ripetute; incastri magnetici o a V per un assemblaggio più rapido e ripetibile; un pettine modificato con una corsia dedicata al ladder; supporto per più dimensioni di gel; dosaggio automatizzato del buffer di copertura; e brevi controlli di calibrazione e prova a vuoto così che il robot verifichi il proprio allineamento prima di un'esecuzione.`,

    /* Approfondimento soluzioni digitali (data-proj="soft") — quick 260824-fms.
       ⚠ In IT valgono gli STESSI vincoli della versione EN: nessun valore dei
       grafici presentato come risultato di tesi (sono dati dimostrativi), e il
       capitolo tre resta solo testo, senza alcun dettaglio interno (D-04). */
    'sw.eyebrow': `software · strumenti per la tesi magistrale e AGC Biologics · 2024 — 2026`,
    'sw.lede': `Tre strumenti costruiti per la stessa ragione per cui costruisco l'hardware — la parte ripetitiva del lavoro non dovrebbe richiedere una persona. Uno esegue la campagna di test della mia tesi, uno legge la letteratura, uno gestisce i turni di un reparto.`,
    'sw.meta': `tre strumenti &middot; Python, API REST, database relazionali &middot; realizzati in autonomia`,
    'sw.heroCap': `tre strumenti, un solo istinto — strutturare i dati nel momento in cui vengono raccolti.`,
    'sw.hero.aria': `Un diagramma di flusso dati: tre nodi sorgente a sinistra — l'app di test, il motore di ricerca e l'app dei turni — ciascuno che curva verso un'unica dorsale orizzontale a destra, che termina in un nodo etichettato dati strutturati.`,

    'sw.s1.label': `il problema`,
    'sw.s1.h2': `Stesso collo di bottiglia, un livello più su.`,
    'sw.s1.p1': `Cinque anni al bancone mi hanno insegnato cosa svuota davvero uno scienziato. Non il lavoro fisico — la ripetizione: eseguire lo stesso protocollo decine di volte senza più spazio per pensare. Tutto il resto di questo sito esiste per questo.`,
    'sw.s1.p2': `La scrivania ne ha un gemello. Trascrivere a mano un'esecuzione in un foglio di calcolo. Inseguire la stessa query su una dozzina di database che indicizzano e ordinano ciascuno a modo suo. Gestire i turni di un reparto in un file che qualcuno deve ricordarsi di aggiornare. Nulla di tutto ciò è scienza, e tutto si frappone tra una persona e la scienza.`,
    'sw.s1.p3': `Quindi la soluzione è la stessa, un livello più su — trovare il passaggio che si ripete, e affidarlo a qualcosa a cui ripetere non pesa. Questi tre strumenti sono quell'istinto applicato al software invece che all'hardware.`,

    'sw.s2.label': `capitolo uno — l'app di test`,
    'sw.s2.h2': `Una campagna di test che si trascrive da sola.`,
    'sw.s2.problem': `Una campagna Design of Experiments significa ripetere la stessa misura molte volte, in un ordine deliberatamente randomizzato perché la deriva non possa spacciarsi per un effetto. Fatta a mano è lenta, è facile sbagliare l'ordine ed è facile digitare male un numero — ed è solo dopo, nell'analisi, che ognuno di quegli errori viene a galla, quando l'esecuzione è finita da un pezzo.`,
    'sw.s2.build': `Così la tesi si è fatta il suo strumento. Pump Validator imposta una campagna, la esegue e la analizza, e lo uso per testare il dispenser che sto costruendo.`,
    'sw.s2.li1': `<span class="dd-list__k">Data Collection</span> &mdash; l'esperimento è definito prima che si misuri qualsiasi cosa: operatore, configurazione hardware, e una tabella Design of Experiments con volumi target, portate e repliche che si incolla direttamente da un foglio di calcolo. Genera l'ordine di esecuzione randomizzato e predispone le cartelle dei dati.`,
    'sw.s2.li2': `<span class="dd-list__k">Analysis &amp; Dashboard</span> &mdash; carica la cartella di un esperimento e valuta una pompa su accuratezza e precisione per categorie di volume e portata, con grafici interattivi.`,
    'sw.s2.li3': `<span class="dd-list__k">Run Campaign</span> &mdash; la via automatizzata: il runner guida la pompa lungo tutta la campagna e registra il flusso senza supervisione.`,
    'sw.s2.li4': `<span class="dd-list__k">Gravimetric Analysis</span> &mdash; una campagna senza sensore, misurata invece per massa: volume per singola corsa, rette di calibrazione, precisione ed evaporazione.`,
    'sw.s2.outcome': `I grafici non sono davvero il punto. Il punto è che i dati arrivano già strutturati nel momento in cui vengono raccolti — un ordine di esecuzione, una struttura di cartelle, un record per misura — così l'analisi è una lettura e non una ridigitazione.`,
    'sw.s2.cap1': `quattro moduli — imposta una campagna, eseguila, analizzala, o pesala.`,
    'sw.s2.alt1': `La schermata iniziale di Pump Validator: il nome dell'app e il sottotitolo "Precision flow measurement & analysis pipeline" sotto un marchio esagonale, sopra quattro schede di modulo — Data Collection, Analysis & Dashboard, Run Campaign e Gravimetric Analysis`,
    'sw.s2.cap2': `l'ordine di esecuzione si decide prima di prendere una sola misura — e si incolla direttamente da un foglio di calcolo.`,
    'sw.s2.alt2': `La schermata di configurazione Data Collection: un pannello con le informazioni dell'esperimento — cartella base, operatore, titolo dell'esperimento, configurazione e descrizione — sopra una tabella Design of Experiments con le colonne indice di riga, volume target in microlitri, portata target in microlitri al minuto, e repliche`,
    'sw.s2.cap3': `accuratezza e precisione, condizione per condizione — le due domande a cui un dispenser deve rispondere. Mostrato con dati dimostrativi.`,
    'sw.s2.alt3': `La dashboard di analisi: un grafico a barre dell'accuratezza di volume e uno della precisione in CV percentuale lungo le condizioni di volume e portata, più un grafico a dispersione accuratezza contro precisione, che confrontano due serie etichettate Demo Experiments e Lab Syringe Pump`,
    'sw.s2.cap4': `un punteggio per ogni fascia di volume e portata, così un angolo debole si vede a colpo d'occhio. Mostrato con dati dimostrativi.`,
    'sw.s2.alt4': `La ripartizione dei punteggi per categoria: una matrice che valuta ogni pompa per categoria di volume (piccolo, medio, grande) contro categoria di portata (lenta, media, veloce), con un punteggio complessivo per pompa, per due serie etichettate Demo Experiments e Lab Syringe Pump`,

    'sw.s3.label': `capitolo due — il motore di ricerca`,
    'sw.s3.h2': `Sette database, una sola lista ordinata.`,
    'sw.s3.problem': `Cercare in letteratura significa eseguire la stessa query su database che indicizzano ciascuno a modo suo e ordinano ciascuno a modo suo, leggere oltre la sovrapposizione tra loro, e poi ridigitare in bibliografia ciò che sopravvive. È la metà meccanica di una tesi, e si mangia il tempo destinato alla lettura.`,
    'sw.s3.build': `Così è diventato una pipeline. Una toolchain Python interroga tutte le fonti insieme, fonde i loro ordinamenti discordanti in un'unica lista, e scrive gli articoli che approvo direttamente nella bibliografia LaTeX.`,
    'sw.s3.li1': `<span class="dd-list__k">Sette API scientifiche sotto un'unica interfaccia</span> &mdash; PubMed (NCBI), Semantic Scholar, OpenAlex, Scopus (Elsevier), IEEE Xplore, arXiv e bioRxiv tramite Europe PMC, ciascuna con la propria autenticazione e gestione delle chiavi, gestione dei rate limit, accesso per IP istituzionale per Scopus, e auto-esclusione controllata quando una fonte non risponde.`,
    'sw.s3.li2': `<span class="dd-list__k">Reciprocal Rank Fusion</span> &mdash; le fonti non concordano, quindi le loro liste ordinate vengono fuse anziché concatenate, valutando ogni articolo su attualità, numero di citazioni e quanto titolo e abstract corrispondono alla query.`,
    'sw.s3.li3': `<span class="dd-list__k">Citation snowballing</span> &mdash; percorso in avanti e all'indietro a partire da un articolo seme, fondendo deliberatamente due indici che non concordano: OpenAlex restituisce i più citati, Semantic Scholar i più recenti, ed entrambe le metà sopravvivono alla fusione.`,
    'sw.s3.li4': `<span class="dd-list__k">Una pipeline BibTeX</span> &mdash; estrazione delle affermazioni dagli abstract, chiavi di citazione deterministiche, aggiunta con conferma delle differenze, e deduplicazione per chiave, per DOI e per titolo quasi duplicato.`,
    'sw.s3.outcome': `Human-in-the-loop per scelta progettuale: nulla viene scritto su disco senza un'approvazione esplicita. La pipeline si occupa del recupero, della fusione e della formattazione. Il giudizio su cosa meriti di stare nella tesi resta mio.`,
    'sw.s3.link': `gli strumenti della tesi&nbsp;&#8599;`,
    'sw.s3.figCap': `sette fonti che ordinano diversamente — fuse in una lista, non messe una in coda all'altra.`,
    'sw.s3.figAria': `Un diagramma di ordinamento: sette sorgenti etichettate a sinistra — PubMed, Semantic Scholar, OpenAlex, Scopus, IEEE Xplore, arXiv e bioRxiv — ciascuna che curva verso destra in un'unica colonna di risultati fusa e ordinata.`,

    'sw.s4.label': `capitolo tre — l'app dei turni`,
    'sw.s4.h2': `La prima decisione era se costruirla o no.`,
    'sw.s4.problem': `Il mio reparto ad AGC Biologics aveva bisogno di gestire i turni, e nessuna soluzione pronta si adattava al modo in cui il team lavora davvero. Quindi la vera prima domanda non era come costruirla — era se costruirla. È una decisione che si prende guardando cosa esiste già prima di scrivere qualsiasi cosa, e qui la risposta è stata costruire.`,
    'sw.s4.build': `La sto progettando e sviluppando dall'inizio alla fine, di mia iniziativa.`,
    'sw.s4.li1': `<span class="dd-list__k">Progettazione completa dell'infrastruttura</span> &mdash; l'architettura di sistema, il modello dati relazionale e il flusso utente.`,
    'sw.s4.li2': `<span class="dd-list__k">Hosting su Azure, back end in Python</span> &mdash; basata su database e pensata per il mobile, perché un'app dei turni si apre dal telefono, non da una scrivania.`,
    'sw.s4.li3': `<span class="dd-list__k">Un'API tra i due livelli</span> &mdash; ho progettato il flusso di richiesta e risposta tra il front end e il back end.`,
    'sw.s4.li4': `<span class="dd-list__k">Attraverso l'IT aziendale, in autonomia</span> &mdash; mi sono rivolto al reparto IT per mappare quali infrastrutture e servizi esistessero già internamente, ho imparato il loro processo di richiesta e approvazione per le nuove applicazioni, e ho portato il progetto attraverso quel dialogo. Far accettare una soluzione dentro un panorama IT farmaceutico regolamentato è a sua volta un lavoro di ingegneria.`,
    'sw.s4.note': `L'app vive dentro AGC Biologics, quindi ciò che sta su questa pagina è la forma del lavoro e non lo strumento — le decisioni, l'architettura, il processo. Nessuno screenshot, nessun dettaglio interno. Sapere dove passa quel confine fa parte del mestiere.`,

    'sw.s5.label': `il filo conduttore`,
    'sw.s5.h2': `Tre strumenti, un solo istinto.`,
    'sw.s5.p1': `Condividono tre abitudini. Strutturare i dati nel momento in cui vengono raccolti, mai dopo. Mettere un'unica interfaccia sopra molte fonti, così che il disordine resti dalla mia parte e non da quella di chi usa lo strumento. E decidere onestamente cosa costruire e cosa comprare, perché la risposta sbagliata a quella domanda costa più di tutto il codice.`,
    'sw.s5.p2': `È lo stesso istinto dell'hardware che sta altrove su questo sito, in un altro mezzo. Trovare il passaggio che si ripete, e toglierlo dalle mani di una persona.`
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
