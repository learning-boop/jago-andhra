import PageHeader from '../components/PageHeader';
import IssueTimeline from '../components/IssueTimeline';
import Order2025 from '../components/Order2025';
import Documents from '../components/Documents';
import { Reveal, PositionTag } from '../components/ui';
import { faqs } from '../data/site';
import { useLang } from '../i18n/LanguageContext';

export default function Issue() {
  const { t, tr } = useLang();
  return (
    <>
      <PageHeader eyebrow={t('issue.eyebrow')} title={t('issue.title')} subtitle={t('issuePage.subtitle')} />
      <IssueTimeline />
      <Order2025 />
      <section className="section bg-white">
        <div className="container-x max-w-4xl">
          <Reveal><span className="eyebrow text-brand-red">{t('issuePage.faqEyebrow')}</span><h2 className="h-display mt-4 text-3xl text-navy sm:text-4xl">{t('issuePage.faqTitle')}</h2></Reveal>
          <div className="mt-10 divide-y divide-navy/10">
            {faqs.map((f, i) => (
              <Reveal key={f.q.en} delay={i + 1} className="py-7">
                <div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-xl font-extrabold text-navy">{tr(f.q)}</h3><PositionTag kind={f.kind} /></div>
                <p className="mt-3 leading-relaxed text-navy/70">{tr(f.a)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Documents />
    </>
  );
}
