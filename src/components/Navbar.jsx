import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../data/site';
import { useLang } from '../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { t, logo, isTe } = useLang();
  const onHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const solid = scrolled || !onHome || open;
  const isActive = (to) => (to.includes('#') ? `${pathname}${hash}` === to : pathname === to);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-navy/95 shadow-glow backdrop-blur-md' : 'bg-transparent'}`}>
      <div className={`container-x flex items-center justify-between gap-3 transition-all 2xl:max-w-[1440px] duration-500 ${solid ? 'h-[70px]' : 'h-[88px]'}`}>
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={`${t('brand.name')} — ${t('nav.home')}`}>
          <img src={logo} alt={t('hero.logoAlt')} className={`rounded-full bg-white transition-all duration-500 ${solid ? 'h-11 w-11' : 'h-14 w-14'}`} width="56" height="56" />
          <span className="hidden sm:block lg:hidden 2xl:block">
            <span className={`block font-display text-lg font-extrabold leading-none tracking-tight text-white ${isTe ? 'font-telugu' : ''}`}>
              {t('brand.nameTop')} <span className="text-brand-orange">{t('brand.nameBottom')}</span>
            </span>
            <span className={`mt-0.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 ${isTe ? 'font-telugu tracking-normal' : ''}`}>{t('brand.sub')}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={`relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-semibold tracking-wide transition-colors xl:px-3 ${isActive(l.to) ? 'text-brand-orange' : 'text-white/85 hover:text-white'}`}>
                  {t(`nav.${l.key}`)}
                  {isActive(l.to) && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-orange" />}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle tone="light" />
          <Link to="/#join" className="btn-primary hidden whitespace-nowrap !px-5 !py-2.5 !text-xs xl:inline-flex">{t('nav.join')}</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white lg:hidden">
            <span className="relative block h-4 w-5">
              <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 block h-0.5 w-5 bg-current" />
              <motion.span animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="absolute left-0 top-[7px] block h-0.5 w-5 bg-current" />
              <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="absolute left-0 top-[14px] block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden">
            <nav aria-label="Mobile" className="container-x max-h-[calc(100vh-70px)] overflow-y-auto py-4">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                    <NavLink to={l.to} className={`flex items-center justify-between border-b border-white/5 py-3.5 text-base font-semibold ${isActive(l.to) ? 'text-brand-orange' : 'text-white'}`}>
                      {t(`nav.${l.key}`)}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Link to="/#join" className="btn-primary mt-5 w-full">{t('nav.join')}</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
