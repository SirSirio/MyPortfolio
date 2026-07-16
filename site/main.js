/* Sirio Feltrin — portfolio entry module (Plan 01-01 Walking Skeleton).
   This is intentionally tiny: it imports one symbol from the shared cosmic
   engine to prove the ES-module graph loads verbatim over GitHub Pages.
   The real HeroStar wiring + galaxy sections land in Plan 01-03. */

import { tintAt } from './star-engine.js';

// Boot marker — confirms the module executed and the engine import resolved.
console.log('[sirio] boot ok — engine tint sample:', tintAt(0.18));
