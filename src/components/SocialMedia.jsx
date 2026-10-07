import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHeader } from './ui';
import { siteConfig } from '../data/site';
import { useLang } from '../i18n/LanguageContext';

/** Lucide has no X/Twitter glyph in recent versions; a minimal inline one keeps the set consistent. */
export function XIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.9l-5.4-7.06L4 22H.744l8.02-9.17L.5 2h7.08l4.88 6.45L18.244 2Zm-1.21 18h1.9L7.05 3.9H5.01L17.034 20Z" />
    </svg>
  );
}
export const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, x: XIcon };
const tone = { instagram: 'hover:bg-[#E1306C]', facebook: 'hover:bg-[#1877F2]', youtube: 'hover:bg-[#FF0000]', x: 'hover:bg-black' };

export default function SocialMedia() {
  const { t } = useLang();
  return (
    <section id="social" className="section bg-white">
      <div className="container-x">
        <SectionHeader align="center" eyebrow={t('social.eyebrow')} title={t('social.title')} subtitle={t('social.subtitle')} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.social.map((s, i) => {
            const I = socialIcons[s.id];
            return (
              <Reveal key={s.id} delay={i + 1}>
                <motion.a href={s.url} target="_blank" rel="noreferrer" whileHover={{ y: -5 }} className={`card group flex items-center gap-4 p-5 text-navy transition-colors duration-300 hover:text-white ${tone[s.id]}`} aria-label={`${s.label} — ${s.handle}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy transition group-hover:bg-white/20 group-hover:text-white"><I size={22} /></span>
                  <span className="flex-1"><span className="block text-sm font-extrabold uppercase tracking-wider">{s.label}</span><span className="block text-xs opacity-60">{s.handle}</span></span>
                  <ArrowUpRight size={18} className="opacity-40 transition group-hover:opacity-100" />
                </motion.a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
