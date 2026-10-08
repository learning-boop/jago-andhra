/**
 * Data access layer.
 *
 * All components read data through these functions, never from the mock files
 * directly. To go live, set VITE_API_BASE_URL in .env — every function will
 * then call the PHP API (expected to return JSON in the same shapes as src/data/*).
 *
 * PHP endpoints (implemented in /backend — see backend/README.md):
 *   GET  /events.php            → Event[]
 *   GET  /updates.php           → Update[]
 *   GET  /documents.php         → Document[]
 *   GET  /gallery.php           → GalleryItem[]
 *   POST /members.php           → { ok: true, id }
 *   POST /contact.php           → { ok: true, id }
 *   GET  /votes.php             → { up, down }
 *   POST /votes.php  { vote }   → { up, down }   (vote: 'up' | 'down'; count one vote per visitor/IP)
 *   GET  /comments.php          → approved Comment[]
 *   POST /comments.php          → { ok: true, pending: true }   (shown only after admin approval)
 */
import { events } from '../data/events';
import { updates } from '../data/updates';
import { documents } from '../data/documents';
import { gallery } from '../data/gallery';
import { media } from '../data/media';
import { districts } from '../data/districts';

export const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export const USE_API = Boolean(BASE_URL);

/** Content managed through the backend admin; media and districts stay in src/data. */
const FROM_API = ['events', 'updates', 'documents', 'gallery'];

const endpoints = {
  events: '/events.php',
  updates: '/updates.php',
  documents: '/documents.php',
  gallery: '/gallery.php',
  members: '/members.php',
  contact: '/contact.php',
  votes: '/votes.php',
  comments: '/comments.php',
};

const mock = { events, updates, documents, gallery, media, districts };

export async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    // Content-Type only when sending JSON, so simple GETs skip the CORS preflight
    headers: { Accept: 'application/json', ...(typeof options.body === 'string' && { 'Content-Type': 'application/json' }), ...options.headers },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const err = new Error(data?.error || `API ${res.status}: ${res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/* Mock-mode vote tally, kept in this browser only until the PHP API is connected. */
const VOTES_KEY = 'jago-andhra-mock-votes';
function mockVotes() {
  try { return { up: 0, down: 0, ...JSON.parse(localStorage.getItem(VOTES_KEY) || '{}') }; } catch { return { up: 0, down: 0 }; }
}

const simulate = (data, ms = 120) => new Promise((r) => setTimeout(() => r(structuredClone(data)), ms));

function list(key) {
  return USE_API && FROM_API.includes(key) ? request(endpoints[key]) : simulate(mock[key]);
}

export const api = {
  getEvents: () => list('events'),
  getUpdates: () => list('updates'),
  getDocuments: () => list('documents'),
  getGallery: () => list('gallery'),
  getMedia: () => list('media'),
  getDistricts: () => list('districts'),

  /** @param {{fullName:string, mobile:string, email:string, age:number, profession:string, district:string, address:string, message?:string, consent:boolean}} member */
  joinMovement: (member) =>
    USE_API
      ? request(endpoints.members, { method: 'POST', body: JSON.stringify(member) })
      : simulate({ ok: true, id: Date.now() }, 600),

  /** @param {{name:string, email:string, phone?:string, message:string}} msg */
  sendContactMessage: (msg) =>
    USE_API
      ? request(endpoints.contact, { method: 'POST', body: JSON.stringify(msg) })
      : simulate({ ok: true, id: Date.now() }, 600),

  /** Approved comments on the Points of Discussion (none without the backend). */
  getComments: () => (USE_API ? request(endpoints.comments) : simulate([])),

  /** @param {{name:string, district?:string, question?:number, message:string, website?:string}} comment */
  postComment: (comment) =>
    USE_API
      ? request(endpoints.comments, { method: 'POST', body: JSON.stringify(comment) })
      : simulate({ ok: true, pending: true }, 500),

  getVotes: () => (USE_API ? request(endpoints.votes) : simulate(mockVotes())),

  /** @param {'up'|'down'} vote */
  castVote: (vote) => {
    if (USE_API) return request(endpoints.votes, { method: 'POST', body: JSON.stringify({ vote }) });
    const tally = mockVotes();
    tally[vote] += 1;
    try { localStorage.setItem(VOTES_KEY, JSON.stringify(tally)); } catch { /* storage unavailable */ }
    return simulate(tally, 400);
  },
};

/**
 * Record shapes (for the PHP/MySQL team). `L` = bilingual object { en: string, te: string }.
 * Event        { id, slug, date(YYYY-MM-DD), time, districtId, typeId, title:L, venue:L, address:L, mapsQuery, description:L, status }
 * Update       { id, slug, categoryId, date, title:L, excerpt:L, image, imageAlt, body:L }
 * Document     { id, categoryId, title:L, date, description:L, url, size, official }
 * GalleryItem  { id, categoryId('meetings'|'press'|'history'), src, thumb, w, h, alt, caption:L }
 * MediaItem    { id, categoryId, title:L, duration, youtubeId, thumbnail, description:L }
 * District     { id, name:L, region('north'|'godavari'|'central'|'south'|'rayalaseema'), contact{name,phone,email} }
 *               (map shapes/coords are static in src/data/apMap.js, keyed by the same id)
 * Member       { fullName, mobile, email, age, profession, district, address, message, consent }
 * ContactMsg   { name, email, phone, message }
 * Votes        { up: number, down: number }
 * Comment      { id, name, district, question(1-15|null), message, date }
 */
