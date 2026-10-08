// Writes backend/seed.json from the site's current content so setup.php can import it.
// Run: npm run export-seed
import { writeFileSync } from 'node:fs';
import { updates } from '../src/data/updates.js';
import { events } from '../src/data/events.js';
import { documents } from '../src/data/documents.js';
import { gallery } from '../src/data/gallery.js';

const strip = (list) => list.map(({ id, ...rest }) => rest);
// Photos get a fixed date so later uploads (dated on upload) appear before them.
const photos = strip(gallery).map((p) => ({ ...p, date: '2026-10-01' }));
const seed = { updates: strip(updates), events: strip(events), documents: strip(documents), photos };
writeFileSync(new URL('../backend/seed.json', import.meta.url), JSON.stringify(seed, null, 2) + '\n');
console.log(`backend/seed.json: ${seed.updates.length} updates, ${seed.events.length} events, ${seed.documents.length} documents, ${seed.photos.length} photos`);
