import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site';
import { socialIcons } from './SocialMedia';
import { useLang } from '../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

const quick = [
  { key: 'home', to: '/' }, { key: 'about', to: '/about' }, { key: 'issue', to: '/issue', ns: 'footer' },
  { key: 'events', to: '/events' }, { key: 'updates', to: '/updates' }, { key: 'documents', to: '/documents' }, { key: 'contact', to: '/contact' },
];

export default function Footer() {
  const { t, logo, isTe } = useLang();
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <span aria-hidden="true" className="block h-1 w-full bg-gradient-to-r from-brand-orange via-white to-brand-green" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <Link to="/" className="inline-flex items-center gap-4" aria-label={`${t('brand.name')} — ${t('nav.home')}`}>
            <img src={logo} alt={t('hero.logoAlt')} width="72" height="72" className="h-[72px] w-[72px] rounded-full bg-white" loading="lazy" />
            <span>
              <span className={`block font-display text-2xl font-black leading-none ${isTe ? 'font-telugu' : ''}`}>{t('brand.nameTop')} <span className="text-brand-orange">{t('brand.nameBottom')}</span></span>
              <span className={`mt-1 block text-xs text-white/60 ${isTe ? 'font-telugu' : ''}`}>{t('brand.tagline')}</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">{t('footer.about')}</p>
          <div className="mt-6"><LanguageToggle tone="light" /></div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">{t('footer.quickLinks')}</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {quick.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-white/75 transition hover:text-white hover:underline">{t(`${l.ns || 'nav'}.${l.key}`)}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">{t('social.followUs')}</h3>
          <ul className="mt-5 flex gap-3">
            {siteConfig.social.map((s) => {
              const I = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-brand-orange hover:bg-brand-orange hover:text-white"><I size={18} /></a>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-white/55">{siteConfig.contact.email}</p>
          <p className="text-sm text-white/55">{siteConfig.contact.phone}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p>{t('footer.rights')}</p>
          <ul className="flex gap-5">
            <li><Link to="/privacy" className="hover:text-white">{t('footer.privacy')}</Link></li>
            <li><Link to="/terms" className="hover:text-white">{t('footer.terms')}</Link></li>
            <li><Link to="/disclaimer" className="hover:text-white">{t('footer.disclaimer')}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
