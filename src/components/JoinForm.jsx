import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { districts } from '../data/districts';
import { useLang } from '../i18n/LanguageContext';

const initial = { fullName: '', mobile: '', email: '', age: '', profession: '', district: '', address: '', message: '', consent: false };
const professions = ['govtEmployee', 'student', 'private', 'selfEmployed', 'farmer', 'homemaker', 'retired', 'other'];

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

/** "Join the Movement" form. `onClose` is passed when it is shown inside the popup. */
export default function JoinForm({ onClose, className = '' }) {
  const { t, tr } = useLang();
  const uid = useId(); // unique ids: the form can be on the page and in the popup at once
  const id = (name) => `${uid}-${name}`;
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const validate = () => {
    const er = {};
    const age = Number(form.age);
    if (form.fullName.trim().length < 2) er.fullName = t('join.errName');
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, ''))) er.mobile = t('join.errMobile');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = t('join.errEmail');
    if (!Number.isInteger(age) || age < 18 || age > 100) er.age = t('join.errAge');
    if (!form.profession) er.profession = t('join.errProfession');
    if (!form.district) er.district = t('join.errDistrict');
    if (form.address.trim().length < 5) er.address = t('join.errAddress');
    if (!form.consent) er.consent = t('join.errConsent');
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try { await api.joinMovement({ ...form, age: Number(form.age) }); setStatus('done'); setForm(initial); } catch { setStatus('error'); }
  };

  return (
    <form onSubmit={submit} noValidate className={className}>
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-brand-green" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl font-extrabold">{t('join.doneTitle')}</h3>
            <p className="mt-2 text-white/70">{t('join.doneText')}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => setStatus('idle')} className="btn-outline-light">{t('join.another')}</button>
              {onClose && <button type="button" onClick={onClose} className="btn-primary">{t('common.close')}</button>}
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" className="grid gap-5 sm:grid-cols-2">
            <Field id={id('name')} label={t('join.fullName')} error={errors.fullName}><input id={id('name')} className="input-dark" autoComplete="name" value={form.fullName} onChange={set('fullName')} placeholder={t('join.namePh')} required /></Field>
            <Field id={id('mobile')} label={t('join.mobile')} error={errors.mobile}><input id={id('mobile')} className="input-dark" type="tel" inputMode="numeric" autoComplete="tel-national" value={form.mobile} onChange={set('mobile')} placeholder={t('join.mobilePh')} required /></Field>
            <Field id={id('email')} label={t('join.email')} error={errors.email}><input id={id('email')} className="input-dark" type="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder={t('join.emailPh')} required /></Field>
            <Field id={id('age')} label={t('join.age')} error={errors.age}><input id={id('age')} className="input-dark" type="number" inputMode="numeric" min="18" max="100" value={form.age} onChange={set('age')} placeholder={t('join.agePh')} required /></Field>
            <Field id={id('profession')} label={t('join.profession')} error={errors.profession}>
              <select id={id('profession')} className="input-dark [&>option]:text-navy" value={form.profession} onChange={set('profession')} required>
                <option value="">{t('join.selectProfession')}</option>
                {professions.map((p) => <option key={p} value={p}>{t(`join.professions.${p}`)}</option>)}
              </select>
            </Field>
            <Field id={id('district')} label={t('join.district')} error={errors.district}>
              <select id={id('district')} className="input-dark [&>option]:text-navy" value={form.district} onChange={set('district')} required>
                <option value="">{t('join.selectDistrict')}</option>
                {districts.map((d) => <option key={d.id} value={d.id}>{tr(d.name)}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2"><Field id={id('address')} label={t('join.address')} error={errors.address}><textarea id={id('address')} className="input-dark min-h-[80px]" autoComplete="street-address" value={form.address} onChange={set('address')} placeholder={t('join.addressPh')} required /></Field></div>
            <div className="sm:col-span-2"><Field id={id('message')} label={t('join.message')}><textarea id={id('message')} className="input-dark min-h-[80px]" value={form.message} onChange={set('message')} placeholder={t('join.messagePh')} /></Field></div>
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
  );
}
