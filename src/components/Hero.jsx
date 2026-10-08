import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { apOutlinePath, AP_VIEWBOX } from '../data/apMap';
import { useLang } from '../i18n/LanguageContext';
import HeroLogo from './HeroLogo';
import { useJoin } from './JoinModal';

const textReveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  const { t, isTe, lang } = useLang();
  const { openJoin } = useJoin();
  const particles = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      id: i, left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, size: 2 + (i % 3), dur: 10 + (i % 6) * 2, delay: (i % 7) * -1.5,
      color: i % 5 === 0 ? '#FF5A00' : i % 7 === 0 ? '#008C3A' : '#ffffff',
    })),
    []
  );

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-900 text-white">
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 18, ease: 'linear' }}
        style={{ backgroundImage: 'radial-gradient(1200px 600px at 80% 10%, rgba(255,90,0,0.22), transparent 60%), radial-gradient(900px 500px at 10% 90%, rgba(0,140,58,0.18), transparent 60%), linear-gradient(180deg, #031533 0%, #062B63 55%, #051F4A 100%)' }} />

      {/* Real Andhra Pradesh outline, slowly drawn */}
      <svg aria-hidden="true" viewBox={AP_VIEWBOX} className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-[78vh] w-auto -translate-y-1/2 opacity-[0.2] md:right-[4%] lg:right-[8%]">
        <defs>
          <linearGradient id="hero-map" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF5A00" /><stop offset="100%" stopColor="#ffffff" /></linearGradient>
        </defs>
        <motion.path d={apOutlinePath} fill="rgba(255,255,255,0.03)" stroke="url(#hero-map)" strokeWidth="2.5" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 3.2, ease: 'easeInOut', delay: 0.4 }} />
      </svg>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((p) => (
          <span key={p.id} className="absolute rounded-full animate-float" style={{ left: p.left, top: p.top, width: p.size, height: p.size, backgroundColor: p.color, opacity: 0.35, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/70 via-transparent to-navy-900/90" />

      <div className="container-x relative grid items-center gap-12 pb-24 pt-32 md:pt-36 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="order-2 lg:order-1" key={lang}>
          <motion.p variants={textReveal} custom={0} initial="hidden" animate="show" className="eyebrow text-brand-orange">{t('hero.eyebrow')}</motion.p>

          <motion.h1 variants={textReveal} custom={1} initial="hidden" animate="show"
            className={`mt-6 font-display font-black tracking-tight ${isTe ? 'font-telugu text-[clamp(2.75rem,9vw,6.25rem)] leading-[1.1]' : 'text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.9]'}`}>
            <span className="block text-white">{t('brand.nameTop')}</span>
            <span className="block bg-gradient-to-r from-brand-orange via-[#ff7a2e] to-brand-red bg-clip-text text-transparent">{t('brand.nameBottom')}</span>
          </motion.h1>

          <motion.p variants={textReveal} custom={2} initial="hidden" animate="show" className={`mt-6 text-xl font-semibold text-white/90 sm:text-2xl ${isTe ? 'font-telugu' : ''}`}>{t('brand.tagline')}</motion.p>
          <motion.p variants={textReveal} custom={3} initial="hidden" animate="show" className={`mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg ${isTe ? 'font-telugu' : ''}`}>{t('hero.quote')}</motion.p>

          <motion.div variants={textReveal} custom={4} initial="hidden" animate="show" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/issue" className="btn-orange">{t('hero.know')}</Link>
            <button type="button" onClick={openJoin} className="btn-outline-light">{t('hero.join')}</button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <span aria-hidden="true" className="absolute inset-0 -m-6 rounded-full border border-white/10" />
            <span aria-hidden="true" className="absolute inset-0 -m-12 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite]" />
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-brand-orange/30 blur-3xl" />
            <HeroLogo className="h-44 w-44 shadow-2xl shadow-black/40 sm:h-56 sm:w-56 lg:h-80 lg:w-80" />
          </div>
        </motion.div>
      </div>

      <motion.a href="#why" aria-label={t('common.scroll')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50 hover:text-white">
        {t('common.scroll')}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ChevronDown size={18} /></motion.span>
      </motion.a>
    </section>
  );
}
