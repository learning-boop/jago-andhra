import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { api } from '../services/api';
import { useLang } from '../i18n/LanguageContext';
import { useJoin } from './JoinModal';

const VOTED_KEY = 'jago-andhra-voted';
const SCROLL_TRIGGER = 0.2; // open once the visitor has scrolled through 20% of the page
const SHORT_PAGE_DELAY_MS = 12000; // pages too short to scroll: open after a while instead

const store = {
  get: (s, k) => { try { return s.getItem(k); } catch { return null; } },
  set: (s, k, v) => { try { s.setItem(k, v); } catch { /* storage unavailable */ } },
};

/**
 * "Do you support this movement?" thumbs-up / thumbs-down poll.
 * Opens by itself once per site visit, after the visitor scrolls 20% of the page.
 * A floating thumbs-up button stays on screen so the poll (or its results) is always one tap away.
 */
export default function SupportPoll() {
  const { t, logo } = useLang();
  const { openJoin } = useJoin();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [autoShown, setAutoShown] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [myVote, setMyVote] = useState(() => {
    const v = store.get(localStorage, VOTED_KEY);
    return v === 'up' || v === 'down' ? v : null;
  });
  const [tally, setTally] = useState(null);
  const cardRef = useRef(null);

  const openPoll = useCallback(async () => {
    if (myVote && status !== 'done') {
      try {
        setTally(await api.getVotes());
        setStatus('done');
      } catch { /* show the question again */ }
    }
    setOpen(true);
  }, [myVote, status]);

  // Auto-open once per visit, when the visitor has scrolled far enough into the page
  useEffect(() => {
    if (autoShown) return;
    const trigger = () => { setAutoShown(true); openPoll(); };
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER) trigger();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const id = setTimeout(() => {
      if (document.documentElement.scrollHeight <= window.innerHeight * 1.3) trigger();
    }, SHORT_PAGE_DELAY_MS);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(id); };
  }, [autoShown, openPoll, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => cardRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const vote = async (choice) => {
    setMyVote(choice);
    setStatus('sending');
    try {
      const result = await api.castVote(choice);
      store.set(localStorage, VOTED_KEY, choice);
      setTally(result);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const total = tally ? tally.up + tally.down : 0;
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

  return (
    <>
    <AnimatePresence>
      {!open && (
        <motion.button type="button" onClick={openPoll} aria-label={myVote ? t('poll.results') : t('poll.fab')}
          initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.3 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.94 }}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-brand-green py-2 pl-2 pr-2 text-white shadow-xl shadow-brand-green/30 ring-4 ring-white/80 sm:bottom-6 sm:right-6 sm:pr-5"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            {!myVote && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-white/40 animate-pulseRing" />}
            <ThumbsUp size={20} aria-hidden="true" />
            {myVote && (
              <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-green shadow">
                <Check size={12} strokeWidth={3} />
              </span>
            )}
          </span>
          <span className="hidden text-sm font-bold sm:inline">{myVote ? t('poll.results') : t('poll.fab')}</span>
        </motion.button>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />

          <motion.div ref={cardRef} role="dialog" aria-modal="true" aria-labelledby="poll-title" tabIndex={-1}
            initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl outline-none focus-visible:!ring-0">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-orange via-white to-brand-green" />

            <button type="button" onClick={() => setOpen(false)} aria-label={t('poll.close')}
              className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-full text-navy/50 transition hover:bg-navy/5 hover:text-navy">
              <X size={18} />
            </button>

            <div className="px-6 pb-6 pt-8 sm:px-8 sm:pb-8">
              <div className="flex items-center gap-4">
                <img src={logo} alt="" className="h-14 w-14 shrink-0 rounded-full shadow-md ring-2 ring-brand-orange/30" width="56" height="56" />
                <div className="min-w-0 pr-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">{t('poll.eyebrow')}</span>
                  <h2 id="poll-title" className="mt-1 font-display text-xl font-extrabold leading-tight text-navy sm:text-2xl">
                    {status === 'done' ? t(myVote === 'up' ? 'poll.thanksUp' : 'poll.thanksDown') : t('poll.title')}
                  </h2>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {status !== 'done' ? (
                  <motion.div key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}>
                    <p className="mt-4 text-sm leading-relaxed text-navy/70">{t('poll.text')}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <VoteButton kind="up" label={t('poll.up')} onClick={() => vote('up')} disabled={status === 'sending'} active={myVote === 'up'} />
                      <VoteButton kind="down" label={t('poll.down')} onClick={() => vote('down')} disabled={status === 'sending'} active={myVote === 'down'} />
                    </div>
                    <p className="mt-3 min-h-[1rem] text-center text-xs text-navy/50" role="status">
                      {status === 'sending' && t('poll.voting')}
                      {status === 'error' && <span className="text-brand-red">{t('poll.error')}</span>}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="mt-4 text-sm leading-relaxed text-navy/70">{t('poll.thanksText')}</p>
                    <div className="mt-5 space-y-3">
                      <ResultBar icon={ThumbsUp} label={t('poll.supporters')} pct={pct(tally.up)} tone="up" mine={myVote === 'up'} />
                      <ResultBar icon={ThumbsDown} label={t('poll.against')} pct={pct(tally.down)} tone="down" mine={myVote === 'down'} />
                    </div>
                    <p className="mt-2 text-right text-xs text-navy/50">{t('poll.votes')(total)}</p>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <button type="button" onClick={() => { setOpen(false); openJoin(); }} className="btn-primary whitespace-nowrap sm:flex-[1.6]">{t('poll.join')}</button>
                      <button type="button" onClick={() => setOpen(false)} className="btn flex-1 text-navy/60 hover:text-navy">{t('poll.later')}</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

function VoteButton({ kind, label, onClick, disabled, active }) {
  const up = kind === 'up';
  const Icon = up ? ThumbsUp : ThumbsDown;
  const tone = up
    ? 'border-brand-green/30 bg-brand-green/5 text-brand-green hover:bg-brand-green hover:text-white hover:border-brand-green'
    : 'border-brand-red/25 bg-brand-red/5 text-brand-red hover:bg-brand-red hover:text-white hover:border-brand-red';
  const activeTone = up ? '!bg-brand-green !text-white' : '!bg-brand-red !text-white';
  return (
    <motion.button type="button" onClick={onClick} disabled={disabled} whileTap={{ scale: 0.95 }}
      className={`group flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-5 text-sm font-bold transition-colors disabled:cursor-wait ${tone} ${active ? activeTone : ''}`}>
      <motion.span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:scale-110"
        animate={up && !disabled ? { rotate: [0, -14, 0, -10, 0] } : {}} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.6 }}>
        <Icon size={28} className={up ? 'text-brand-green' : 'text-brand-red'} aria-hidden="true" />
      </motion.span>
      <span className="text-center leading-tight">{label}</span>
    </motion.button>
  );
}

function ResultBar({ icon: Icon, label, pct, tone, mine }) {
  const color = tone === 'up' ? 'bg-brand-green' : 'bg-brand-red';
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold text-navy">
        <span className="flex items-center gap-2"><Icon size={16} aria-hidden="true" className={tone === 'up' ? 'text-brand-green' : 'text-brand-red'} /> {pct}% {label}{mine && ' ✓'}</span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-navy/10">
        <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </div>
  );
}
