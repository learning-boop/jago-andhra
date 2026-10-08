import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import JoinForm from './JoinForm';
import { JoinContext } from './joinContext';

/** Provides openJoin() to every "Join the Movement" button and renders the popup form. */
export function JoinProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openJoin = useCallback(() => setOpen(true), []);
  const closeJoin = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openJoin }), [openJoin]);
  return (
    <JoinContext.Provider value={value}>
      {children}
      <JoinModal open={open} onClose={closeJoin} />
    </JoinContext.Provider>
  );
}

function JoinModal({ open, onClose }) {
  const { t, logo, isTe } = useLang();
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => cardRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-900/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="join-title" tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-navy-900 text-white shadow-2xl outline-none ring-1 ring-white/10 focus-visible:!ring-white/10 sm:rounded-3xl">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-orange via-white to-brand-green" />

            <div className="flex items-center gap-4 border-b border-white/10 px-6 pb-4 pt-6 sm:px-8">
              <img src={logo} alt="" className="h-12 w-12 shrink-0 rounded-full bg-white" width="48" height="48" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange">{t('join.eyebrow')}</span>
                <h2 id="join-title" className={`mt-0.5 font-display text-xl font-extrabold leading-tight sm:text-2xl ${isTe ? 'font-telugu' : ''}`}>
                  {t('join.title1')} <span className="text-brand-orange">{t('join.title2')}</span>
                </h2>
              </div>
              <button type="button" onClick={onClose} aria-label={t('join.close')}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-7">
              <JoinForm onClose={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
