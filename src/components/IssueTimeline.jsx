import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { Icon, SectionHeader, PositionTag, Reveal } from './ui';
import { timeline } from '../data/site';
import { apOutlinePath, AP_VIEWBOX } from '../data/apMap';
import { useLang } from '../i18n/LanguageContext';

export default function IssueTimeline() {
  const { t, tr } = useLang();
  const [active, setActive] = useState(timeline[0].id);
  const current = timeline.find((x) => x.id === active);

  return (
    <section id="issue" className="section relative overflow-hidden bg-white">
      <svg aria-hidden="true" viewBox={AP_VIEWBOX} className="pointer-events-none absolute -left-24 top-0 h-[520px] w-auto text-navy/[0.04]"><path d={apOutlinePath} fill="currentColor" /></svg>

      <div className="container-x relative">
        <SectionHeader eyebrow={t('issue.eyebrow')} title={t('issue.title')} subtitle={t('issue.subtitle')} />

        <Reveal className="mt-14">
          <div className="scroll-thin md:overflow-x-auto md:pb-4">
            <ol className="relative flex flex-col gap-5 md:min-w-[720px] md:flex-row md:items-start md:justify-between md:gap-4" role="tablist" aria-label={t('issue.timelineLabel')}>
              <motion.span aria-hidden="true" className="absolute left-0 top-6 hidden h-0.5 bg-navy/10 md:block" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeOut' }} />
              <motion.span aria-hidden="true" className="absolute left-6 top-0 w-0.5 -translate-x-1/2 bg-navy/10 md:hidden" initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeOut' }} />
              {timeline.map((x, i) => {
                const isActive = x.id === active;
                return (
                  <li key={x.id} className="relative flex md:flex-1 md:flex-col md:items-center md:text-center">
                    <button type="button" role="tab" aria-selected={isActive} aria-controls="timeline-panel" id={`timeline-tab-${x.id}`} onClick={() => setActive(x.id)} className="group flex items-center gap-4 text-left focus-visible:outline-none md:flex-col md:gap-0 md:text-center">
                      <motion.span initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive ? 'border-brand-orange bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'border-navy/15 bg-white text-navy group-hover:border-navy'}`}>
                        <Icon name={x.icon} size={20} />
                        {isActive && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand-orange/50 animate-pulseRing" />}
                      </motion.span>
                      <span className="flex flex-col md:items-center">
                        <span className={`font-display text-lg font-extrabold md:mt-4 ${isActive ? 'text-brand-orange' : 'text-navy'}`}>{tr(x.year)}</span>
                        <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-navy/60 md:mt-1 md:max-w-[150px]">{tr(x.label)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div id="timeline-panel" role="tabpanel" aria-labelledby={`timeline-tab-${current.id}`} className="card relative overflow-hidden p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex flex-wrap items-center gap-3"><PositionTag kind={current.kind} /><span className="text-xs font-semibold uppercase tracking-widest text-navy/50">{tr(current.year)}</span></div>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-navy sm:text-3xl">{tr(current.label)}</h3>
                <p className="mt-3 text-base font-medium text-navy/80">{tr(current.summary)}</p>
                <p className="mt-4 text-sm leading-relaxed text-navy/65 sm:text-base">{tr(current.detail)}</p>
                {current.link && (
                  <a href={current.link.url} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline" target={current.link.url === '#' ? undefined : '_blank'} rel="noreferrer">
                    {tr(current.link.label)} <ExternalLink size={14} />
                    {current.link.url === '#' && <span className="ml-1 text-xs font-normal text-navy/50">{t('common.linkPending')}</span>}
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-brand-orange via-brand-red to-brand-green" />
          </div>

          <Reveal delay={2} className="flex flex-col justify-between gap-6 rounded-2xl bg-navy p-6 text-white sm:p-10">
            <div>
              <span className="eyebrow text-brand-orange">{t('issue.sourceEyebrow')}</span>
              <h3 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">{t('issue.sourceTitle')}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{t('issue.sourceText')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/documents" className="btn-orange"><FileText size={16} /> {t('issue.readDoc')}</Link>
              <Link to="/issue" className="btn-outline-light">{t('issue.explainer')}</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
