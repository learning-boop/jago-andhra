import { FileText, MessageCircleQuestion } from 'lucide-react';
import { Reveal, SectionHeader, PositionTag } from './ui';
import { discussionGroups, discussionPoints, discussionSources } from '../data/discussion';
import { useLang } from '../i18n/LanguageContext';

/** APGEA's 15 "Points of Discussion" on the new zonal system, grouped by topic. */
export default function DiscussionPoints() {
  const { t, tr, lang, isTe } = useLang();

  return (
    <section id="discussion" className="section bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={t('discussion.eyebrow')} title={t('discussion.title')} subtitle={t('discussion.subtitle')} />
          <Reveal delay={1} className="shrink-0"><PositionTag kind="apgea" /></Reveal>
        </div>

        <Reveal className="mt-6 max-w-3xl text-base leading-relaxed text-navy/70">{t('discussion.intro')}</Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
          {discussionGroups.map((g) => (
            <Reveal key={g.from} className={g.from === 15 ? 'lg:col-span-2' : ''}>
              <h3 className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-red ${isTe ? 'font-telugu tracking-normal' : ''}`}>
                <MessageCircleQuestion size={18} aria-hidden="true" /> {tr(g.title)}
              </h3>
              <ol start={g.from} className="mt-4 space-y-3">
                {discussionPoints.slice(g.from - 1, g.to).map((q, i) => (
                  <li key={g.from + i} className="flex gap-4 rounded-2xl border border-navy/10 bg-brand-cream/60 p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-extrabold text-white" aria-hidden="true">{g.from + i}</span>
                    <p lang={lang} className={`leading-relaxed text-navy/85 ${isTe ? 'font-telugu' : ''}`}>{tr(q)}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy p-6 text-white sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className={`font-display text-2xl font-extrabold sm:text-3xl ${isTe ? 'font-telugu' : ''}`}>
              {t('discussion.slogan').split(' – ').map((part, i, all) => (
                <span key={part} className={i === all.length - 1 ? 'text-brand-orange' : ''}>{part}{i < all.length - 1 && <span className="mx-2 text-white/40">–</span>}</span>
              ))}
            </p>
            <p className="mt-2 text-sm text-white/60">{t('discussion.byline')}</p>
          </div>
          <ul className="flex flex-col gap-2">
            {discussionSources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-orange">
                  <FileText size={15} aria-hidden="true" /> {tr(s.label)}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
