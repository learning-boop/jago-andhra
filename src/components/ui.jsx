import { motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';
import {
  Scale, BookOpen, Layers, ScrollText, Map, Megaphone, MapPin, Grid3X3, Users,
  Shield, TrendingUp, Briefcase, FileText,
} from 'lucide-react';

/** Map icon keys from data files to Lucide components. */
const ICONS = {
  scale: Scale, book: BookOpen, layers: Layers, scroll: ScrollText, map: Map,
  megaphone: Megaphone, 'map-pin': MapPin, grid: Grid3X3, users: Users,
  shield: Shield, 'trending-up': TrendingUp, briefcase: Briefcase, file: FileText,
};
export function Icon({ name, ...props }) {
  const C = ICONS[name] || FileText;
  return <C aria-hidden="true" {...props} />;
}

/** Scroll-reveal wrapper. */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export function Reveal({ children, className = '', delay = 0, as = 'div', once = true }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </M>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, light = false, align = 'left', className = '' }) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : '';
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className={`eyebrow ${light ? 'text-brand-orange' : 'text-brand-red'}`}>{eyebrow}</span>}
      <h2 className={`h-display text-3xl sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {subtitle && <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-white/70' : 'text-navy/70'}`}>{subtitle}</p>}
      <span className="accent-line" />
    </Reveal>
  );
}

/** Labelled note used wherever we show the organisers' viewpoint. */
export function PositionTag({ kind = 'position', className = '' }) {
  const { t } = useLang();
  const cls = {
    fact: 'bg-navy/10 text-navy',
    position: 'bg-brand-orange/15 text-[#b84000]',
    apgea: 'bg-brand-green/15 text-brand-green',
    campaign: 'bg-brand-red/10 text-brand-red',
    placeholder: 'bg-navy/10 text-navy/60',
  };
  return <span className={`badge ${cls[kind] || cls.position} ${className}`}>{t(`tags.${kind in cls ? kind : 'position'}`)}</span>;
}

/** Category/filter pill row. items: [{id, en, te}], value: id | 'all'. */
export function FilterPills({ items, value, onChange, dark = false, className = '' }) {
  const { t, tr } = useLang();
  const all = [{ id: 'all', en: t('common.all'), te: t('common.all') }, ...items];
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {all.map((c) => {
        const active = value === c.id;
        const cls = dark
          ? active ? 'bg-brand-orange text-white' : 'border border-white/15 text-white/70 hover:border-white/40 hover:text-white'
          : active ? 'bg-navy text-white' : 'border border-navy/15 text-navy/70 hover:border-navy';
        return (
          <button key={c.id} type="button" onClick={() => onChange(c.id)} aria-pressed={active} className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${cls}`}>
            {tr(c)}
          </button>
        );
      })}
    </div>
  );
}

/** Look up a bilingual category label by id. */
export function catLabel(list, id) {
  return list.find((c) => c.id === id) || { en: id, te: id };
}

/** Thin scales-of-justice line illustration (decorative). */
export function ScalesLine({ className = '' }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <line x1="60" y1="8" x2="60" y2="70" />
      <line x1="40" y1="70" x2="80" y2="70" />
      <line x1="14" y1="22" x2="106" y2="22" />
      <circle cx="60" cy="8" r="3" />
      <path d="M14 22 L4 48 H24 Z" />
      <path d="M106 22 L96 48 H116 Z" />
      <path d="M4 48 Q14 56 24 48" />
      <path d="M96 48 Q106 56 116 48" />
    </svg>
  );
}

export function formatDate(iso, lang = 'en', opts = { day: '2-digit', month: 'short', year: 'numeric' }) {
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', opts);
  } catch {
    return iso;
  }
}

export function Spinner({ light = false }) {
  const { t } = useLang();
  return (
    <div className="flex justify-center py-12" role="status" aria-label={t('common.loading')}>
      <span className={`h-8 w-8 animate-spin rounded-full border-2 ${light ? 'border-white/30 border-t-white' : 'border-navy/20 border-t-navy'}`} />
    </div>
  );
}
