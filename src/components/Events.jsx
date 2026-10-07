import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Navigation, X, Tag } from 'lucide-react';
import { Reveal, SectionHeader, Spinner, PositionTag, catLabel } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { eventTypes } from '../data/events';
import { districts, regions } from '../data/districts';
import { useLang } from '../i18n/LanguageContext';

const districtOf = (id) => districts.find((d) => d.id === id);

function monthDay(iso, lang) {
  const d = new Date(iso + 'T00:00:00');
  return { mon: d.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { month: 'short' }).toUpperCase(), day: d.getDate() };
}

export function EventCard({ ev, onView, index = 0 }) {
  const { t, tr, lang } = useLang();
  const { mon, day } = monthDay(ev.date, lang);
  const dist = districtOf(ev.districtId);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapsQuery)}`;
  return (
    <Reveal delay={index + 1}>
      <motion.article whileHover={{ y: -4 }} className="card flex h-full flex-col overflow-hidden sm:flex-row">
        <div className="flex shrink-0 items-center justify-center gap-3 bg-navy px-6 py-5 text-white sm:w-32 sm:flex-col sm:gap-0 sm:py-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">{mon}</span>
          <span className="font-display text-4xl font-black leading-none sm:mt-1 sm:text-5xl">{day}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            {dist && <span className="badge bg-brand-orange/10 text-[#b84000]">{tr(regions[dist.region])}</span>}
            <span className="badge bg-navy/5 text-navy/70">{tr(catLabel(eventTypes, ev.typeId))}</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-extrabold text-navy">{tr(ev.title)}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-navy/65">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-brand-red" aria-hidden="true" /> {dist ? tr(dist.name) : ''} {t('events.districtSuffix')} · {tr(ev.venue)}</li>
            <li className="flex items-center gap-2"><Clock size={14} className="text-brand-red" aria-hidden="true" /> {ev.time}</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2 pt-1">
            <button type="button" onClick={() => onView(ev)} className="btn-outline !px-4 !py-2 !text-[11px]">{t('common.viewDetails')}</button>
            <a href={directions} target="_blank" rel="noreferrer" className="btn !border !border-navy/15 !px-4 !py-2 !text-[11px] text-navy hover:bg-navy-50"><Navigation size={13} /> {t('common.getDirections')}</a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function EventModal({ ev, onClose }) {
  const { t, tr, lang } = useLang();
  const dist = ev ? districtOf(ev.districtId) : null;
  return (
    <AnimatePresence>
      {ev && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy-900/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="relative w-full max-w-lg rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-3xl sm:p-9">
            <button type="button" onClick={onClose} aria-label={t('common.close')} className="absolute right-4 top-4 rounded-full p-2 text-navy/50 hover:bg-navy-50 hover:text-navy"><X size={20} /></button>
            <div className="flex flex-wrap items-center gap-2">
              {dist && <span className="badge bg-brand-orange/10 text-[#b84000]">{tr(regions[dist.region])}</span>}
              <PositionTag kind="placeholder" />
            </div>
            <h3 id="event-modal-title" className="mt-4 font-display text-2xl font-extrabold text-navy">{tr(ev.title)}</h3>
            <dl className="mt-5 grid gap-3 text-sm">
              {[
                [CalendarDays, t('events.date'), new Date(ev.date + 'T00:00:00').toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })],
                [Clock, t('events.time'), ev.time],
                [Tag, t('events.programme'), tr(catLabel(eventTypes, ev.typeId))],
                [MapPin, t('events.district'), dist ? tr(dist.name) : ''],
                [Navigation, t('events.venue'), `${tr(ev.venue)} — ${tr(ev.address)}`],
              ].map(([I, k, v]) => (
                <div key={k} className="flex gap-3">
                  <I size={16} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-navy/50">{k}</dt><dd className="text-navy/80">{v}</dd></div>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-navy/65">{tr(ev.description)}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapsQuery)}`} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full"><Navigation size={14} /> {t('common.getDirections')}</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Events({ limit = 4, showMore = true }) {
  const { t } = useLang();
  const { data, loading } = useFetch(api.getEvents);
  const [selected, setSelected] = useState(null);
  const items = (data || []).slice(0, limit);
  return (
    <section id="events" className="section bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={t('events.eyebrow')} title={t('events.title')} subtitle={t('events.subtitle')} />
          {showMore && <Reveal delay={1} className="shrink-0"><Link to="/events" className="btn-outline">{t('events.allProgrammes')}</Link></Reveal>}
        </div>
        {loading ? <Spinner /> : <div className="mt-12 grid gap-5 lg:grid-cols-2">{items.map((ev, i) => <EventCard key={ev.id} ev={ev} index={i} onView={setSelected} />)}</div>}
      </div>
      <EventModal ev={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
