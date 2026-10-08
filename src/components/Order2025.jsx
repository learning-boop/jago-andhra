import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Icon, Reveal, SectionHeader, PositionTag } from './ui';
import { orderCards } from '../data/site';
import { districts, multiZoneOf, romanZone } from '../data/districts';
import { useLang } from '../i18n/LanguageContext';

// Schedule to the Presidential Order 2025, grouped Multi-Zone → Zone → districts.
const schedule = [1, 2].map((mz) => ({
  mz,
  zones: [1, 2, 3, 4, 5, 6].filter((z) => multiZoneOf(z) === mz).map((z) => ({ z, districts: districts.filter((d) => d.zone === z) })),
}));

export default function Order2025() {
  const { t, tr } = useLang();
  return (
    <section id="order-2025" className="section bg-brand-cream">
      <div className="container-x">
        <SectionHeader eyebrow={t('order.eyebrow')} title={t('order.title')} subtitle={t('order.subtitle')} />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-5">
            <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{t('order.whatChanged')}</h3><PositionTag kind="fact" /></div>
            <p className="leading-relaxed text-navy/70">{t('order.changed1')}</p>
            <p className="leading-relaxed text-navy/70">{t('order.changed2')}</p>
          </Reveal>
          <Reveal delay={1} className="space-y-5">
            <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{t('order.whyDebated')}</h3><PositionTag kind="apgea" /></div>
            <p className="leading-relaxed text-navy/70">{t('order.debated1')}</p>
            <p className="leading-relaxed text-navy/70">{t('order.debated2')}</p>
            <Link to="/issue#discussion" className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline">{t('order.readQuestions')} <ArrowRight size={15} /></Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderCards.map((c, i) => (
            <Reveal key={c.id} delay={i + 1}>
              <motion.article whileHover={{ y: -5 }} className="card h-full border-t-4 border-navy p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy"><Icon name={c.icon} size={20} /></span>
                <h4 className="mt-5 font-display text-lg font-extrabold text-navy">{tr(c.title)}</h4>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{tr(c.text)}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">{t('order.scheduleTitle')}</h3><PositionTag kind="fact" /></div>
          <p className="mt-2 text-sm text-navy/60">{t('order.scheduleText')}</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {schedule.map(({ mz, zones }) => (
              <div key={mz} className="card overflow-hidden">
                <div className="bg-navy px-6 py-3 font-display text-sm font-extrabold uppercase tracking-widest text-white">{t('order.multiZone')} {romanZone(mz)}</div>
                <ul className="divide-y divide-navy/10">
                  {zones.map(({ z, districts: ds }) => (
                    <li key={z} className="grid gap-2 px-6 py-4 sm:grid-cols-[110px_1fr] sm:gap-4">
                      <div>
                        <span className="font-display text-base font-extrabold text-brand-orange">{t('order.zone')} {romanZone(z)}</span>
                        <span className="block text-[11px] text-navy/50">{t('order.districtsCount')(ds.length)}</span>
                      </div>
                      <ul className="flex flex-wrap gap-1.5">
                        {ds.map((d) => <li key={d.id} className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy">{tr(d.name)}</li>)}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={2} className="mt-10 flex items-start gap-3 rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-5 text-sm text-navy/75">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-brand-orange" aria-hidden="true" />
          <p><strong className="text-navy">{t('order.disclaimer')}</strong> {t('order.disclaimerText')}</p>
        </Reveal>
      </div>
    </section>
  );
}
