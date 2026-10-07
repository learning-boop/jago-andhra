import { motion } from 'framer-motion';
import { Icon, Reveal, PositionTag, ScalesLine } from './ui';
import { whyFeatures } from '../data/site';
import { useLang } from '../i18n/LanguageContext';

export default function WhyJago() {
  const { t, tr, isTe } = useLang();
  return (
    <section id="why" className="section relative overflow-hidden bg-brand-cream">
      <ScalesLine className="pointer-events-none absolute -right-8 top-10 hidden w-72 text-navy/5 lg:block" />
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-brand-red">{t('why.eyebrow')}</span>
            <h2 className={`h-display mt-5 text-navy ${isTe ? 'font-telugu text-4xl leading-tight sm:text-5xl lg:text-6xl' : 'text-5xl sm:text-6xl lg:text-7xl'}`}>
              {t('why.title1')}<br />{t('why.title2')}<br /><span className="text-brand-red">{t('why.title3')}</span>
            </h2>
            <span className="accent-line mt-6" />
          </Reveal>

          <Reveal delay={1} className="space-y-6 text-navy/75">
            <p className="text-lg leading-relaxed sm:text-xl">
              {t('why.intro1')} <strong className="text-navy">{t('why.intro2')}</strong>.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[['fact', 'why.factDesc'], ['apgea', 'why.apgeaDesc'], ['position', 'why.positionDesc']].map(([k, d]) => (
                <div key={k} className="rounded-xl border border-navy/10 bg-white p-4">
                  <PositionTag kind={k} />
                  <p className="mt-3 text-sm leading-relaxed">{t(d)}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-navy/55">{t('why.note')}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {whyFeatures.map((f, i) => (
            <Reveal key={f.id} delay={i + 1}>
              <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="card group relative h-full overflow-hidden p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-black text-navy/10 transition-colors group-hover:text-brand-orange/40">{f.id}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white"><Icon name={f.icon} size={22} /></span>
                </div>
                <h3 className={`mt-8 text-lg font-extrabold uppercase tracking-wide text-navy ${isTe ? 'font-telugu tracking-normal' : ''}`}>{tr(f.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/65">{tr(f.text)}</p>
                <motion.span aria-hidden="true" className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-orange to-brand-red" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: 'easeOut' }} />
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
