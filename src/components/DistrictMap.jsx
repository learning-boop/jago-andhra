import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Mail, MapPin, Phone, User } from 'lucide-react';
import { Reveal, SectionHeader, Spinner, formatDate, PositionTag } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { regions } from '../data/districts';
import { apDistrictShapes, apOutlinePath, AP_VIEWBOX } from '../data/apMap';
import { useLang } from '../i18n/LanguageContext';

export default function DistrictMap() {
  const { t, tr, lang } = useLang();
  const { data: districts, loading: l1 } = useFetch(api.getDistricts);
  const { data: events, loading: l2 } = useFetch(api.getEvents);
  const [activeId, setActiveId] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const counts = useMemo(() => {
    const m = {};
    (events || []).forEach((e) => (m[e.districtId] = (m[e.districtId] || 0) + 1));
    return m;
  }, [events]);

  const byId = useMemo(() => Object.fromEntries((districts || []).map((d) => [d.id, d])), [districts]);
  const active = activeId ? byId[activeId] : null;
  const activeEvents = (events || []).filter((e) => e.districtId === activeId);
  const hovered = hoverId ? byId[hoverId] : null;

  return (
    <section id="map" className="section bg-brand-cream">
      <div className="container-x">
        <SectionHeader eyebrow={t('map.eyebrow')} title={t('map.title')} subtitle={t('map.subtitle')} />

        {l1 || l2 ? <Spinner /> : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal className="card relative overflow-hidden p-4 sm:p-8">
              <svg viewBox={AP_VIEWBOX} className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-label={t('map.ariaMap')}>
                <defs>
                  <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#062B63" floodOpacity="0.25" /></filter>
                </defs>
                {/* Outer silhouette for shadow */}
                <path d={apOutlinePath} fill="#062B63" filter="url(#map-shadow)" />
                {apDistrictShapes.map((s, i) => {
                  const n = counts[s.id] || 0;
                  const isActive = s.id === activeId;
                  const isHover = s.id === hoverId;
                  const d = byId[s.id];
                  const fill = isActive ? '#FF5A00' : n > 0 ? '#F28A4A' : isHover ? '#1E4D9B' : '#0B3A82';
                  return (
                    <motion.path
                      key={s.id}
                      d={s.d}
                      fill={fill}
                      stroke="#FFF9ED"
                      strokeWidth={isActive ? 2 : 1}
                      strokeLinejoin="round"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.03 * i }}
                      className="cursor-pointer outline-none transition-[fill] duration-200"
                      tabIndex={0}
                      role="button"
                      aria-label={`${d ? tr(d.name) : s.id}: ${t('map.programmeCount')(n)}`}
                      onClick={() => setActiveId(s.id)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActiveId(s.id))}
                      onMouseEnter={() => setHoverId(s.id)}
                      onMouseLeave={() => setHoverId(null)}
                      onFocus={() => setHoverId(s.id)}
                      onBlur={() => setHoverId(null)}
                    />
                  );
                })}
                {/* Pulsing markers for districts with programmes */}
                {apDistrictShapes.filter((s) => counts[s.id]).map((s, i) => (
                  <g key={`m-${s.id}`} transform={`translate(${s.x} ${s.y})`} className="pointer-events-none">
                    <motion.circle r="8" fill="#E7191F" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: [1, 2.6], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                    <circle r="6" fill="#E7191F" stroke="#fff" strokeWidth="2" />
                  </g>
                ))}
                {/* Label for hovered / active district */}
                {(hovered || active) && (() => {
                  const s = apDistrictShapes.find((x) => x.id === (hoverId || activeId));
                  const d = hovered || active;
                  if (!s) return null;
                  const label = tr(d.name);
                  const w = Math.max(70, label.length * 7.2 + 20);
                  const flip = s.y < 70;
                  return (
                    <g transform={`translate(${Math.min(Math.max(s.x, w / 2 + 4), 600 - w / 2 - 4)} ${flip ? s.y + 36 : s.y - 22})`} className="pointer-events-none">
                      <rect x={-w / 2} y="-13" width={w} height="26" rx="13" fill="#062B63" />
                      <text textAnchor="middle" y="4.5" fontSize="12" fontWeight="700" fill="#fff" className={lang === 'te' ? 'font-telugu' : ''}>{label}</text>
                    </g>
                  );
                })()}
              </svg>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-navy/60">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#F28A4A]" /> {t('map.legendUpcoming')}</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#0B3A82]" /> {t('map.legendNone')}</span>
              </div>
              <p className="mt-2 text-center text-[11px] text-navy/40">{t('map.note')}</p>
            </Reveal>

            <Reveal delay={1} className="rounded-2xl bg-navy p-7 text-white sm:p-9">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                    <span className="eyebrow text-brand-orange">{tr(regions[active.region])}</span>
                    <h3 className="mt-3 font-display text-3xl font-extrabold">{tr(active.name)}</h3>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">{t('map.programmes')}</span>
                        <span className="mt-1 block font-display text-3xl font-black text-brand-orange">{activeEvents.length}</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">{t('map.nextEvent')}</span>
                        <span className="mt-1 block text-sm font-bold">{activeEvents[0] ? formatDate(activeEvents[0].date, lang) : '—'}</span>
                      </div>
                    </div>
                    <h4 className="mt-7 text-xs font-bold uppercase tracking-widest text-white/50">{t('map.upcoming')}</h4>
                    {activeEvents.length ? (
                      <ul className="mt-3 space-y-2">
                        {activeEvents.map((e) => (
                          <li key={e.id} className="flex items-start gap-3 rounded-lg border border-white/10 p-3 text-sm">
                            <CalendarDays size={16} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden="true" />
                            <div><span className="font-bold">{tr(e.title)}</span><span className="block text-white/60">{formatDate(e.date, lang)} · {e.time}</span></div>
                          </li>
                        ))}
                      </ul>
                    ) : <p className="mt-3 text-sm text-white/60">{t('map.noneYet')}</p>}
                    <h4 className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50">{t('map.contact')} <PositionTag kind="placeholder" className="!bg-white/10 !text-white/60" /></h4>
                    <ul className="mt-3 space-y-2 text-sm text-white/80">
                      <li className="flex items-center gap-2"><User size={14} className="text-brand-orange" aria-hidden="true" /> {active.contact.name}</li>
                      <li className="flex items-center gap-2"><Phone size={14} className="text-brand-orange" aria-hidden="true" /> {active.contact.phone}</li>
                      <li className="flex items-center gap-2"><Mail size={14} className="shrink-0 text-brand-orange" aria-hidden="true" /> <span className="min-w-0 break-all">{active.contact.email}</span></li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col justify-center">
                    <MapPin size={40} className="text-brand-orange" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-2xl font-extrabold">{t('map.selectTitle')}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{t('map.selectText')}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {districts.filter((d) => counts[d.id]).map((d) => (
                        <li key={d.id}><button type="button" onClick={() => setActiveId(d.id)} className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-brand-orange hover:text-brand-orange">{tr(d.name)}</button></li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
