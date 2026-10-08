import { CheckCircle2 } from 'lucide-react';
import { Reveal } from './ui';
import { apOutlinePath, AP_VIEWBOX } from '../data/apMap';
import { useLang } from '../i18n/LanguageContext';
import JoinForm from './JoinForm';

export default function JoinMovement() {
  const { t, isTe } = useLang();

  return (
    <section id="join" className="section relative overflow-hidden bg-navy-900 text-white">
      <svg aria-hidden="true" viewBox={AP_VIEWBOX} className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 text-white/[0.035]"><path d={apOutlinePath} fill="none" stroke="currentColor" strokeWidth="2" /></svg>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(700px_400px_at_20%_30%,rgba(255,90,0,0.18),transparent_70%)]" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col justify-center">
          <span className="eyebrow text-brand-orange">{t('join.eyebrow')}</span>
          <h2 className={`h-display mt-5 ${isTe ? 'font-telugu text-4xl leading-tight sm:text-5xl lg:text-6xl' : 'text-5xl sm:text-6xl lg:text-7xl'}`}>{t('join.title1')}<br /><span className="text-brand-orange">{t('join.title2')}</span></h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">{t('join.text')}</p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            {['join.b1', 'join.b2', 'join.b3'].map((k) => <li key={k} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-green" aria-hidden="true" /> {t(k)}</li>)}
          </ul>
        </Reveal>

        <Reveal delay={1}>
          <JoinForm className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md sm:p-9" />
        </Reveal>
      </div>
    </section>
  );
}
