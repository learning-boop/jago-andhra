import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Reveal, SectionHeader } from './ui';
import { api } from '../services/api';
import { siteConfig } from '../data/site';
import { useLang } from '../i18n/LanguageContext';

const initial = { name: '', email: '', phone: '', message: '' };

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand-red" role="alert">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const { t, tr } = useLang();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const c = siteConfig.contact;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = t('contact.errName');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = t('contact.errEmail');
    if (form.message.trim().length < 10) er.message = t('contact.errMessage');
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try { await api.sendContactMessage(form); setStatus('done'); setForm(initial); } catch { setStatus('error'); }
  };

  const info = [[MapPin, t('contact.address'), tr(c.address)], [Phone, t('contact.phone'), c.phone], [Mail, t('contact.email'), c.email], [Clock, t('contact.hours'), tr(c.hours)]];

  return (
    <section id="contact" className="section bg-brand-cream">
      <div className="container-x">
        <SectionHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Reveal className="card p-7">
              <ul className="space-y-5">
                {info.map(([I, k, v]) => (
                  <li key={k} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-brand-orange"><I size={18} aria-hidden="true" /></span>
                    <div><span className="block text-[11px] font-bold uppercase tracking-wider text-navy/50">{k}</span><span className="mt-0.5 block whitespace-pre-line break-words text-sm font-medium text-navy">{v}</span></div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={1} className="card overflow-hidden">
              <iframe title={t('contact.mapTitle')} src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapsEmbedQuery)}&output=embed`} className="h-64 w-full border-0 grayscale-[30%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </Reveal>
          </div>

          <Reveal delay={1}>
            <form onSubmit={submit} noValidate className="card p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {status === 'done' ? (
                  <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
                    <CheckCircle2 size={48} className="mx-auto text-brand-green" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-navy">{t('contact.doneTitle')}</h3>
                    <p className="mt-2 text-navy/65">{t('contact.doneText')}</p>
                    <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-6">{t('contact.another')}</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="grid gap-5 sm:grid-cols-2">
                    <Field id="c-name" label={t('contact.name')} error={errors.name}><input id="c-name" className="input" autoComplete="name" value={form.name} onChange={set('name')} placeholder={t('join.namePh')} required /></Field>
                    <Field id="c-email" label={t('contact.email')} error={errors.email}><input id="c-email" className="input" type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder={t('join.emailPh')} required /></Field>
                    <div className="sm:col-span-2"><Field id="c-phone" label={t('contact.phoneOpt')}><input id="c-phone" className="input" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} placeholder="+91" /></Field></div>
                    <div className="sm:col-span-2"><Field id="c-message" label={t('contact.message')} error={errors.message}><textarea id="c-message" className="input min-h-[140px]" value={form.message} onChange={set('message')} placeholder={t('contact.messagePh')} required /></Field></div>
                    {status === 'error' && <p className="flex items-center gap-2 text-sm text-brand-red sm:col-span-2" role="alert"><AlertTriangle size={16} /> {t('contact.error')}</p>}
                    <button type="submit" disabled={status === 'sending'} className="btn-primary sm:col-span-2 disabled:opacity-60">{status === 'sending' ? t('contact.sending') : t('contact.submit')}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
