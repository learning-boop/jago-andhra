import { motion } from 'framer-motion';
import { Icon, Reveal, SectionHeader, PositionTag } from './ui';
import { demands } from '../data/site';
import { apOutlinePath, AP_VIEWBOX } from '../data/apMap';
import { useLang } from '../i18n/LanguageContext';

export default function Demands() {
  const { t, tr, isTe } = useLang();
  return (
    <section id="demands" className="section relative overflow-hidden bg-navy text-white">
      <svg aria-hidden="true" viewBox={AP_VIEWBOX} className="pointer-events-none absolute -bottom-20 -right-10 h-[600px] w-auto text-white/[0.04]"><path d={apOutlinePath} fill="none" stroke="currentColor" strokeWidth="3" /></svg>
      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader light eyebrow={t('demands.eyebrow')} title={t('demands.title')} subtitle={t('demands.subtitle')} />
          <Reveal delay={1} className="shrink-0"><PositionTag kind="position" className="!bg-brand-orange !text-white" /></Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demands.map((d, i) => (
            <Reveal key={d.id} delay={i + 1}>
              <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]">
                <span aria-hidden="true" className={`absolute left-0 top-0 h-full w-1 ${i % 2 === 0 ? 'bg-brand-orange' : 'bg-brand-red'}`} />
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-black text-white/15 transition-colors group-hover:text-brand-orange/60">{String(d.id).padStart(2, '0')}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-brand-orange"><Icon name={d.icon} size={20} /></span>
                </div>
                <h3 className={`mt-6 text-base font-extrabold uppercase tracking-wide ${isTe ? 'font-telugu tracking-normal' : ''}`}>{tr(d.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{tr(d.text)}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
