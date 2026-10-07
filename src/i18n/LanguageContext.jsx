import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import te from './te';
import logoEn from '../assets/logo.webp';
import logoTe from '../assets/logo-te.webp';

const dictionaries = { en, te };
const logos = { en: logoEn, te: logoTe };
const STORAGE_KEY = 'jago-andhra-lang';

const LanguageContext = createContext(null);

function detectInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'te') return saved;
    if (navigator.language?.toLowerCase().startsWith('te')) return 'te';
  } catch {
    /* localStorage unavailable */
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial);

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle('lang-te', lang === 'te');
  }, [lang]);

  const value = useMemo(() => {
    const dict = dictionaries[lang];
    /** UI string by dotted key, e.g. t('nav.home'). Falls back to English, then the key. */
    const t = (key) => key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), dict)
      ?? key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), en)
      ?? key;
    /** Bilingual data value: {en, te} → string. Plain strings pass through. */
    const tr = (v) => (v && typeof v === 'object' ? v[lang] ?? v.en ?? '' : v ?? '');
    return { lang, setLang, t, tr, logo: logos[lang], isTe: lang === 'te' };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
