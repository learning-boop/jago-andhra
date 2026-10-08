import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Reveal, SectionHeader, Spinner, formatDate, catLabel } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { hasArticle, updateCategories } from '../data/updates';
import { useLang } from '../i18n/LanguageContext';

const catColor = { press: 'bg-brand-red text-white', news: 'bg-navy text-white', campaign: 'bg-brand-orange text-white', event: 'bg-brand-green text-white' };

export function UpdateCard({ u, index = 0 }) {
  const { t, tr, lang } = useLang();
  return (
    <Reveal delay={index + 1}>
      <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="card group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-50">
          <img src={u.image} alt={u.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className={`badge absolute left-4 top-4 ${catColor[u.categoryId] || 'bg-navy text-white'}`}>{tr(catLabel(updateCategories, u.categoryId))}</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="flex items-center gap-2 text-xs font-semibold text-navy/50"><CalendarDays size={13} aria-hidden="true" /> {formatDate(u.date, lang)}</span>
          <h3 className="mt-3 font-display text-lg font-extrabold leading-snug text-navy">{tr(u.title)}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy/65">{tr(u.excerpt)}</p>
          {hasArticle(u) && <Link to={`/updates/${u.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red">{t('common.readMore')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>}
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Updates({ limit = 4 }) {
  const { t } = useLang();
  const { data, loading } = useFetch(api.getUpdates);
  const items = (data || []).slice(0, limit);
  return (
    <section id="updates" className="section bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={t('updates.eyebrow')} title={t('updates.title')} subtitle={t('updates.subtitle')} />
          <Reveal delay={1} className="shrink-0"><Link to="/updates" className="btn-outline">{t('common.viewAll')}</Link></Reveal>
        </div>
        {loading ? <Spinner /> : <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{items.map((u, i) => <UpdateCard key={u.id} u={u} index={i} />)}</div>}
      </div>
    </section>
  );
}
