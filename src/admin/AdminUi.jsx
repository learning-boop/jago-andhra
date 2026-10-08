import { useEffect } from 'react';

/** Server timestamps are UTC "YYYY-MM-DD HH:MM:SS"; show them in local time. */
export function fmtDateTime(s) {
  if (!s) return '';
  const d = new Date(s.replace(' ', 'T') + 'Z');
  return Number.isNaN(d.getTime()) ? s : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function ErrorNote({ children }) {
  return children ? <p className="rounded-lg bg-brand-red/10 px-3 py-2 text-sm text-brand-red" role="alert">{children}</p> : null;
}

export function SectionTitle({ title, count, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="font-display text-2xl font-extrabold">{title}{count != null && <span className="ml-2 text-base font-semibold text-navy/45">({count})</span>}</h1>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-900/60 p-4 sm:p-8" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className={`w-full rounded-2xl bg-white p-6 shadow-2xl sm:p-8 ${wide ? 'max-w-3xl' : 'max-w-md'}`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-extrabold">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full px-3 py-1 text-2xl leading-none text-navy/50 hover:bg-navy-50" aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
