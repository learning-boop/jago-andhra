import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { Reveal, Spinner, formatDate } from './ui';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import { districts } from '../data/districts';
import { discussionPoints } from '../data/discussion';
import { useLang } from '../i18n/LanguageContext';

const MAX = 1000;
const PAGE = 8;
const initial = { name: '', district: '', question: '', message: '', website: '' };
const districtName = Object.fromEntries(districts.map((d) => [d.id, d.name]));

/** Public comments on the Points of Discussion. New comments appear only after admin approval. */
export default function DiscussionComments() {
  const { t, tr, lang, isTe } = useLang();
  const { data: comments, loading } = useFetch(api.getComments);
  const [shown, setShown] = useState(PAGE);
  const list = comments || [];

  return (
    <section id="comments" className="section bg-brand-cream">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <span className="eyebrow text-brand-red">{t('comments.eyebrow')}</span>
          <h2 className={`h-display mt-4 text-3xl text-navy sm:text-4xl ${isTe ? 'font-telugu' : ''}`}>{t('comments.title')}</h2>
          <p className="mt-3 text-navy/65">{t('comments.subtitle')}</p>
          <CommentForm />
        </Reveal>

        <Reveal delay={1}>
          <h3 className="flex items-center gap-2 font-display text-xl font-extrabold text-navy">
            <MessageSquare size={20} className="text-brand-orange" aria-hidden="true" /> {t('comments.listTitle')}
            {list.length > 0 && <span className="text-base font-semibold text-navy/45">({list.length})</span>}
          </h3>
          {loading ? <Spinner /> : !list.length ? (
            <p className="mt-6 rounded-2xl border border-dashed border-navy/15 bg-white/60 p-8 text-center text-sm text-navy/55">{t('comments.empty')}</p>
          ) : (
            <>
              <ul className="mt-6 space-y-4">
                {list.slice(0, shown).map((c) => (
                  <li key={c.id} className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display text-sm font-extrabold uppercase text-white" aria-hidden="true">{c.name.trim().charAt(0)}</span>
                      <span className="font-bold text-navy">{c.name}</span>
                      {c.district && districtName[c.district] && <span className="text-sm text-navy/50">· {tr(districtName[c.district])}</span>}
                      <span className="ml-auto text-xs text-navy/45">{formatDate(String(c.date).slice(0, 10), lang)}</span>
                    </div>
                    {c.question && <span className="badge mt-3 bg-brand-orange/10 text-[#b84000]">{t('comments.onQuestion')(c.question)}</span>}
                    <p className={`mt-3 whitespace-pre-wrap break-words leading-relaxed text-navy/80 ${isTe ? 'font-telugu' : ''}`}>{c.message}</p>
                  </li>
                ))}
              </ul>
              {list.length > shown && (
                <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn-outline mt-6 w-full">{t('comments.more')}</button>
              )}
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function CommentForm() {
  const { t, tr } = useLang();
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError(t('comments.errName'));
    if (form.message.trim().length < 5) return setError(t('comments.errMessage'));
    setError('');
    setStatus('sending');
    try {
      await api.postComment({ ...form, question: form.question ? Number(form.question) : null });
      setForm(initial);
      setStatus('done');
    } catch (err) {
      setError(err.message && !err.message.startsWith('API') ? err.message : t('comments.errSend'));
      setStatus('error');
    }
  };

  const label = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60';

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center" role="status">
            <CheckCircle2 size={44} className="mx-auto text-brand-green" aria-hidden="true" />
            <p className="mt-4 font-display text-xl font-extrabold text-navy">{t('comments.doneTitle')}</p>
            <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-6">{t('comments.another')}</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={id('name')} className={label}>{t('comments.name')}</label>
                <input id={id('name')} className="input" autoComplete="name" maxLength={120} value={form.name} onChange={set('name')} placeholder={t('join.namePh')} required />
              </div>
              <div>
                <label htmlFor={id('district')} className={label}>{t('comments.district')}</label>
                <select id={id('district')} className="input" value={form.district} onChange={set('district')}>
                  <option value="">{t('comments.optional')}</option>
                  {districts.map((d) => <option key={d.id} value={d.id}>{tr(d.name)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={id('question')} className={label}>{t('comments.question')}</label>
              <select id={id('question')} className="input" value={form.question} onChange={set('question')}>
                <option value="">{t('comments.general')}</option>
                {discussionPoints.map((q, i) => {
                  const text = tr(q);
                  return <option key={i} value={i + 1}>{`${i + 1}. ${text.length > 70 ? `${text.slice(0, 70)}…` : text}`}</option>;
                })}
              </select>
            </div>
            <div>
              <label htmlFor={id('message')} className={label}>{t('comments.message')}</label>
              <textarea id={id('message')} className="input min-h-[130px]" maxLength={MAX} value={form.message} onChange={set('message')} placeholder={t('comments.messagePh')} required />
              <p className="mt-1 text-right text-[11px] text-navy/40">{form.message.length} / {MAX}</p>
            </div>
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <input type="text" name="website" value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
            {error && <p className="text-sm text-brand-red" role="alert">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60"><Send size={16} /> {status === 'sending' ? t('comments.sending') : t('comments.submit')}</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
