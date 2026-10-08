import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Play, X } from 'lucide-react';
import { Reveal, SectionHeader, Spinner, PositionTag, FilterPills, catLabel } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { mediaCategories } from '../data/media';
import { useLang } from '../i18n/LanguageContext';

export default function Media() {
  const { t, tr } = useLang();
  const { data, loading } = useFetch(api.getMedia);
  const [cat, setCat] = useState('all');
  const [playing, setPlaying] = useState(null);
  const items = (data || []).filter((m) => cat === 'all' || m.categoryId === cat);

  return (
    <section id="media" className="section relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,rgba(255,90,0,0.15),transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeader light align="center" eyebrow={t('media.eyebrow')} title={t('media.title')} subtitle={t('media.subtitle')} />
        <Reveal delay={1} className="mt-10 flex justify-center"><FilterPills dark items={mediaCategories} value={cat} onChange={setCat} className="justify-center" /></Reveal>

        {loading ? <Spinner light /> : (
          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence>
              {items.map((m, i) => (
                <motion.article key={m.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-navy ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                  <button type="button" onClick={() => (m.embed === false ? window.open(`https://www.youtube.com/watch?v=${m.youtubeId}`, '_blank', 'noopener') : setPlaying(m))} className="block w-full text-left" aria-label={`${t('common.play')}: ${tr(m.title)}${m.embed === false ? ` (${t('media.watchOnYoutube')})` : ''}`}>
                    <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-[420px]' : 'aspect-video'}`}>
                      <img src={m.youtubeId ? `https://i.ytimg.com/vi/${m.youtubeId}/hqdefault.jpg` : m.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-xl transition group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white"><Play size={22} className="ml-1" fill="currentColor" /></span>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="badge bg-white/15 text-white backdrop-blur">{tr(catLabel(mediaCategories, m.categoryId))}</span>
                        <h3 className={`mt-2 font-display font-extrabold leading-snug ${i === 0 ? 'text-xl sm:text-2xl' : 'text-base'}`}>{tr(m.title)}</h3>
                        {m.embed === false
                          ? <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white/70">{t('media.watchOnYoutube')} <ExternalLink size={12} /></span>
                          : m.duration && <span className="mt-1 block text-xs text-white/60">{m.duration}</span>}
                      </div>
                    </div>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {playing && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)} role="dialog" aria-modal="true" aria-label={tr(playing.title)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
              <button type="button" onClick={() => setPlaying(null)} aria-label={t('media.closeVideo')} className="absolute -top-12 right-0 rounded-full p-2 text-white/70 hover:text-white"><X size={26} /></button>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black">
                {playing.youtubeId ? (
                  <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${playing.youtubeId}?autoplay=1&rel=0`} title={tr(playing.title)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center"><PositionTag kind="placeholder" /><p className="text-white/70">{t('media.noVideo')} “{tr(playing.title)}”.</p></div>
                )}
              </div>
              {playing.youtubeId && (
                // Fallback for videos whose owner has disabled playback on other websites
                <a href={`https://www.youtube.com/watch?v=${playing.youtubeId}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
                  <ExternalLink size={15} /> {t('media.watchOnYoutube')}
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
