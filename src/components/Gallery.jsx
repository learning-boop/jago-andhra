import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Reveal, SectionHeader, Spinner, FilterPills, catLabel } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { galleryCategories } from '../data/gallery';
import { useLang } from '../i18n/LanguageContext';

/** limit: show only the first N photos (home page) with a link to the full gallery. */
export default function Gallery({ limit, header = true }) {
  const { t, tr } = useLang();
  const { data, loading } = useFetch(api.getGallery);
  const [cat, setCat] = useState('all');
  const [index, setIndex] = useState(-1);
  const filtered = (data || []).filter((g) => cat === 'all' || g.categoryId === cat);
  const items = limit ? filtered.slice(0, limit) : filtered;
  const open = index >= 0;
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setIndex(-1); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, prev, next]);

  return (
    <section id="gallery" className="section bg-brand-cream">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {header ? <SectionHeader eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} subtitle={t('gallery.subtitle')} /> : <span />}
          <Reveal delay={1}><FilterPills items={galleryCategories} value={cat} onChange={(c) => { setCat(c); setIndex(-1); }} /></Reveal>
        </div>

        {loading ? <Spinner /> : (
          <motion.div layout className="masonry mt-12">
            <AnimatePresence>
              {items.map((g, i) => (
                <motion.figure key={g.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: i * 0.04 }} className="group relative overflow-hidden rounded-2xl bg-navy-50">
                  <button type="button" onClick={() => setIndex(i)} className="block w-full" aria-label={`${t('gallery.open')}: ${tr(g.caption)}`}>
                    <div className="overflow-hidden" style={{ aspectRatio: g.w && g.h ? `${g.w} / ${g.h}` : '1 / 1' }}><img src={g.thumb || g.src} alt={g.alt} loading="lazy" width={g.w} height={g.h} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-900/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex w-full items-center justify-between text-left text-white">
                        <span><span className="badge bg-white/20 backdrop-blur">{tr(catLabel(galleryCategories, g.categoryId))}</span><span className="mt-1 block text-sm font-semibold">{tr(g.caption)}</span></span>
                        <ZoomIn size={20} />
                      </span>
                    </span>
                  </button>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {limit && filtered.length > limit && (
          <Reveal className="mt-10 flex justify-center">
            <Link to="/gallery" className="btn-outline">{t('gallery.viewAll')(filtered.length)} <ArrowRight size={16} /></Link>
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {open && items[index] && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIndex(-1)} role="dialog" aria-modal="true" aria-label={t('gallery.viewer')}>
            <button type="button" aria-label={t('common.close')} onClick={() => setIndex(-1)} className="absolute right-4 top-4 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"><X size={26} /></button>
            <button type="button" aria-label={t('common.previous')} onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-brand-orange sm:left-6"><ChevronLeft size={24} /></button>
            <button type="button" aria-label={t('common.next')} onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-brand-orange sm:right-6"><ChevronRight size={24} /></button>
            <AnimatePresence mode="wait">
              <motion.figure key={items[index].id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
                <img src={items[index].src} alt={items[index].alt} className="max-h-[78vh] w-auto rounded-xl object-contain shadow-2xl" />
                <figcaption className="mt-4 text-center text-sm text-white/80">
                  <span className="badge mr-2 bg-brand-orange text-white">{tr(catLabel(galleryCategories, items[index].categoryId))}</span>{tr(items[index].caption)}
                  <span className="ml-3 text-white/40">{index + 1} / {items.length}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
