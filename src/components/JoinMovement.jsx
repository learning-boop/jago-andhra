import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, AlertTriangle } from 'lucide-react';
import { Reveal } from './ui';
import { api } from '../services/api';
import { districts } from '../data/districts';
import { apOutlinePath, AP_VIEWBOX } from '../data/apMap';
import { useLang } from '../i18n/LanguageContext';

const initial = { fullName: '', mobile: '', email: '', district: '', message: '', consent: false };

// Defined outside the component so inputs keep focus across re-renders.
function Field({ id, label, children, error }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-white/60">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand-orange" role="alert">{error}</p>}
    </div>
  );
}

export default function JoinMovement() {
  const { t, tr, isTe } = useLang();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const validate = () => {
    const er = {};
    if (form.fullName.trim().length < 2) er.fullName = t('join.errName');
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, ''))) er.mobile = t('join.errMobile');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = t('join.errEmail');
    if (!form.district) er.district = t('join.errDistrict');
    if (!form.consent) er.consent = t('join.errConsent');
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try { await api.joinMovement(form); setStatus('done'); setForm(initial); } catch { setStatus('error'); }
  };

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
          <form onSubmit={submit} noValidate className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-md sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'done' ? (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                  <CheckCircle2 size={48} className="mx-auto text-brand-green" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-2xl font-extrabold">{t('join.doneTitle')}</h3>
                  <p className="mt-2 text-white/70">{t('join.doneText')}</p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn-outline-light mt-6">{t('join.another')}</button>
                </motion.div>
              ) : (
                <motion.div key="form" className="grid gap-5 sm:grid-cols-2">
                  <Field id="j-name" label={t('join.fullName')} error={errors.fullName}><input id="j-name" className="input-dark" autoComplete="name" value={form.fullName} onChange={set('fullName')} placeholder={t('join.namePh')} required /></Field>
                  <Field id="j-mobile" label={t('join.mobile')} error={errors.mobile}><input id="j-mobile" className="input-dark" type="tel" inputMode="numeric" autoComplete="tel-national" value={form.mobile} onChange={set('mobile')} placeholder={t('join.mobilePh')} required /></Field>
                  <Field id="j-email" label={t('join.email')} error={errors.email}><input id="j-email" className="input-dark" type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder={t('join.emailPh')} required /></Field>
                  <Field id="j-district" label={t('join.district')} error={errors.district}>
                    <select id="j-district" className="input-dark [&>option]:text-navy" value={form.district} onChange={set('district')} required>
                      <option value="">{t('join.selectDistrict')}</option>
                      {districts.map((d) => <option key={d.id} value={d.id}>{tr(d.name)}</option>)}
                    </select>
                  </Field>
                  <div className="sm:col-span-2"><Field id="j-message" label={t('join.message')}><textarea id="j-message" className="input-dark min-h-[100px]" value={form.message} onChange={set('message')} placeholder={t('join.messagePh')} /></Field></div>
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-white/60">
                      <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange" />
                      <span>{t('join.consent')} <a href="/privacy" className="underline hover:text-white">{t('join.privacy')}</a>.</span>
                    </label>
                    {errors.consent && <p className="mt-1 text-xs text-brand-orange" role="alert">{errors.consent}</p>}
                  </div>
                  {status === 'error' && <p className="flex items-center gap-2 text-sm text-brand-orange sm:col-span-2" role="alert"><AlertTriangle size={16} /> {t('join.error')}</p>}
                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:col-span-2 disabled:opacity-60">{status === 'sending' ? t('join.sending') : t('join.submit')}</button>
                  <p className="flex items-center justify-center gap-2 text-[11px] text-white/40 sm:col-span-2"><Lock size={12} aria-hidden="true" /> {t('join.private')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
