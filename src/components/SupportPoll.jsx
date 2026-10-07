import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { api } from '../services/api';
import { useLang } from '../i18n/LanguageContext';

const VOTED_KEY = 'jago-andhra-voted';
const OPEN_DELAY_MS = 1800;

const store = {
  get: (s, k) => { try { return s.getItem(k); } catch { return null; } },
  set: (s, k, v) => { try { s.setItem(k, v); } catch { /* storage unavailable */ } },
};

/**
 * "Do you support this movement?" thumbs-up / thumbs-down poll.
 * Pops up every time the website is opened. Visitors who already voted see their vote and the live results.
 */
export default function SupportPoll() {
  const { t, logo } = useLang();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [myVote, setMyVote] = useState(null);
  const [tally, setTally] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const previous = store.get(localStorage, VOTED_KEY);
    let alive = true;
    const id = setTimeout(async () => {
      if (previous === 'up' || previous === 'down') {
        try {
          const result = await api.getVotes();
          if (!alive) return;
          setMyVote(previous);
          setTally(result);
          setStatus('done');
        } catch { /* fall back to asking again */ }
      }
      if (alive) setOpen(true);
    }, OPEN_DELAY_MS);
    return () => { alive = false; clearTimeout(id); };
  }, []);

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
                      <Link to="/#join" onClick={() => setOpen(false)} className="btn-primary whitespace-nowrap sm:flex-[1.6]">{t('poll.join')}</Link>
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
