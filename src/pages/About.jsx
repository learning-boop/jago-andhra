import PageHeader from '../components/PageHeader';
import WhyJago from '../components/WhyJago';
import Demands from '../components/Demands';
import SocialMedia from '../components/SocialMedia';
import { Reveal, PositionTag, ScalesLine } from '../components/ui';
import { useLang } from '../i18n/LanguageContext';

export default function About() {
  const { t, logo } = useLang();
  return (
    <>
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.subtitle')} />
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex justify-center">
            <div className="relative">
              <span aria-hidden="true" className="absolute inset-0 -m-8 rounded-full border border-navy/10" />
              <ScalesLine className="absolute -left-20 top-1/2 hidden w-40 -translate-y-1/2 text-navy/10 lg:block" />
              <img src={logo} alt={t('hero.logoAlt')} className="relative h-64 w-64 rounded-full bg-white shadow-card sm:h-80 sm:w-80" />
            </div>
          </Reveal>
          <Reveal delay={1} className="space-y-5 text-navy/75">
            <h2 className="h-display text-3xl text-navy sm:text-4xl">{t('about.who')}</h2>
            <p className="leading-relaxed">{t('about.p1')}</p>
            <p className="leading-relaxed">{t('about.p2')}</p>
            <div className="flex flex-wrap gap-2"><PositionTag kind="fact" /><PositionTag kind="apgea" /><PositionTag kind="position" /></div>
            <div className="rounded-xl border border-navy/10 bg-brand-cream p-5 text-sm"><PositionTag kind="placeholder" /><p className="mt-2">{t('about.ph')}</p></div>
          </Reveal>
        </div>
      </section>
      <WhyJago />
      <Demands />
      <SocialMedia />
    </>
  );
}
