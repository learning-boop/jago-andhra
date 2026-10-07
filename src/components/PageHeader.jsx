import { motion } from 'framer-motion';
import { apOutlinePath, AP_VIEWBOX } from '../data/apMap';

/** Shared hero band for inner pages. */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-32 text-white md:pb-24 md:pt-44">
      <svg aria-hidden="true" viewBox={AP_VIEWBOX} className="pointer-events-none absolute -right-16 top-1/2 h-[140%] w-auto -translate-y-1/2 text-white/[0.05]">
        <path d={apOutlinePath} fill="currentColor" />
      </svg>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(700px_300px_at_10%_100%,rgba(255,90,0,0.2),transparent_70%)]" />
      <div className="container-x relative">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow text-brand-orange">{eyebrow}</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="h-display mt-4 text-4xl sm:text-5xl lg:text-7xl">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg">{subtitle}</motion.p>}
        <span className="accent-line mt-6" />
      </div>
    </section>
  );
}
