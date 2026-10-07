import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

/**
 * EN / తెలుగు segmented toggle. `tone="light"` for dark backgrounds (navbar), "dark" for light ones.
 */
export default function LanguageToggle({ tone = 'light', className = '' }) {
  const { lang, setLang, t } = useLang();
  const opts = [
    { id: 'en', label: 'EN', full: 'English' },
    { id: 'te', label: 'తెలుగు', full: 'తెలుగు' },
  ];
  const base = tone === 'light' ? 'border-white/20 bg-white/5' : 'border-navy/15 bg-white';
  const text = tone === 'light' ? 'text-white/70' : 'text-navy/60';

  return (
    <div role="group" aria-label={t('nav.language')} className={`relative inline-flex items-center rounded-full border p-0.5 text-[12px] font-bold ${base} ${className}`}>
      {opts.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            type="button"
            lang={o.id}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLang(o.id)}
            className={`relative z-10 rounded-full px-3 py-1.5 leading-none transition-colors ${active ? 'text-white' : text} ${o.id === 'te' ? 'font-telugu' : ''}`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${tone}`}
                className="absolute inset-0 -z-10 rounded-full bg-brand-orange"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
