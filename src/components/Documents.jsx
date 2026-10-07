import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Search, BadgeCheck } from 'lucide-react';
import { Reveal, SectionHeader, Spinner, formatDate, PositionTag, catLabel } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { documentCategories } from '../data/documents';
import { useLang } from '../i18n/LanguageContext';

export default function Documents({ compact = false }) {
  const { t, tr, lang } = useLang();
  const { data, loading } = useFetch(api.getDocuments);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data || []).filter((d) => {
      if (cat !== 'all' && d.categoryId !== cat) return false;
      if (!term) return true;
      const hay = `${d.title.en} ${d.title.te} ${d.description.en} ${d.description.te} ${tr(catLabel(documentCategories, d.categoryId))}`.toLowerCase();
      return hay.includes(term);
    });
  }, [data, q, cat, tr]);

  return (
    <section id="documents" className={`section ${compact ? 'bg-white' : 'bg-brand-cream'}`}>
      <div className="container-x">
        <SectionHeader eyebrow={t('documents.eyebrow')} title={t('documents.title')} subtitle={t('documents.subtitle')} />

        <Reveal delay={1} className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">{t('common.search')}</span>
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" aria-hidden="true" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('common.search')} className="input !pl-12" />
          </label>
          <label className="md:w-72">
            <span className="sr-only">{t('common.filterCategory')}</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="input">
              <option value="all">{t('common.all')}</option>
              {documentCategories.map((c) => <option key={c.id} value={c.id}>{tr(c)}</option>)}
            </select>
          </label>
        </Reveal>

        {loading ? <Spinner /> : (
          <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
            <AnimatePresence>
              {items.map((d, i) => (
                <motion.li key={d.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3, delay: i * 0.03 }} className="card group flex gap-4 p-5 transition hover:ring-brand-orange/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red"><FileText size={22} aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge bg-navy/5 text-navy/70">{tr(catLabel(documentCategories, d.categoryId))}</span>
                      {d.official ? <span className="badge bg-brand-green/10 text-brand-green"><BadgeCheck size={12} className="mr-1" /> {t('tags.official')}</span> : d.categoryId === 'apgea' ? <PositionTag kind="apgea" /> : <PositionTag kind="campaign" />}
                    </div>
                    <h3 className="mt-2 font-display text-base font-extrabold leading-snug text-navy">{tr(d.title)}</h3>
                    <p className="mt-1 text-xs text-navy/50">{formatDate(d.date, lang)} · PDF · {d.size}</p>
                    <p className="mt-2 text-sm leading-relaxed text-navy/65">{tr(d.description)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={d.url} target={d.url === '#' ? undefined : '_blank'} rel="noreferrer" className="btn-outline !px-4 !py-2 !text-[11px]"><ExternalLink size={13} /> {t('common.viewPdf')}</a>
                      <a href={d.url} download={d.url !== '#' ? '' : undefined} className="btn !border !border-navy/15 !px-4 !py-2 !text-[11px] text-navy hover:bg-navy-50"><Download size={13} /> {t('common.download')}</a>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
            {!items.length && <li className="col-span-full py-10 text-center text-navy/50">{t('common.noDocs')}</li>}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
