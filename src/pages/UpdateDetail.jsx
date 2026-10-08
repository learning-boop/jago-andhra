import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ExternalLink, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { Reveal, Spinner, formatDate, catLabel } from '../components/ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { updateCategories } from '../data/updates';
import { useLang } from '../i18n/LanguageContext';
import NotFound from './NotFound';

/** Body is a string (blank-line separated) or an array of blocks; "## " = heading, "- " lines = list. */
function Body({ body }) {
  const blocks = Array.isArray(body) ? body : String(body || '').split(/\n\s*\n/);
  return blocks.map((b, i) => {
    if (b.startsWith('## ')) return <h2 key={i} className="mt-10 font-display text-2xl font-extrabold text-navy">{b.slice(3)}</h2>;
    const lines = b.split('\n');
    if (lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={i} className="mt-4 space-y-2 pl-1">
          {lines.map((l, j) => (
            <li key={j} className="flex gap-3 leading-relaxed text-navy/75"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />{l.slice(2)}</li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="mt-4 leading-relaxed text-navy/75">{b}</p>;
  });
}

export default function UpdateDetail() {
  const { slug } = useParams();
  const { t, tr, lang } = useLang();
  const { data, loading } = useFetch(api.getUpdates);
  const post = (data || []).find((u) => u.slug === slug);

  useEffect(() => {
    if (post) document.title = `${tr(post.title)} | ${t('brand.name')}`;
  }, [post, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <><PageHeader eyebrow={t('updates.eyebrow')} title={t('updates.title')} /><Spinner /></>;
  if (!post) return <NotFound />;

  return (
    <>
      <PageHeader eyebrow={tr(catLabel(updateCategories, post.categoryId))} title={tr(post.title)} />
      <article className="section bg-white">
        <div className="container-x max-w-3xl">
          <Reveal className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/updates" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red"><ArrowLeft size={14} /> {t('updates.back')}</Link>
            <span className="flex items-center gap-2 text-sm font-semibold text-navy/50"><CalendarDays size={14} aria-hidden="true" /> {formatDate(post.date, lang)}</span>
          </Reveal>
          {post.image && <img src={post.image} alt={post.imageAlt} className="mt-8 aspect-[16/8] w-full rounded-2xl object-cover" />}
          <p className="mt-8 text-lg font-medium leading-relaxed text-navy">{tr(post.excerpt)}</p>
          <Body body={tr(post.body)} />

          {post.sources?.length > 0 && (
            <div className="mt-12 rounded-2xl bg-navy-50 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy"><FileText size={18} aria-hidden="true" /> {t('updates.sources')}</h2>
              <ul className="mt-4 space-y-3">
                {post.sources.map((s) => (
                  <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline">{tr(s.label)} <ExternalLink size={13} /></a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
