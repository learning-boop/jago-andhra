import { useEffect, useState } from 'react';
import { Check, RefreshCw, RotateCcw, Trash2, X } from 'lucide-react';
import { adminApi } from './adminApi';
import { ErrorNote, SectionTitle, fmtDateTime } from './AdminUi';
import { districts } from '../data/districts';
import { discussionPoints } from '../data/discussion';

const districtName = Object.fromEntries(districts.map((d) => [d.id, d.name.en]));
const FILTERS = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
  { id: '', label: 'All' },
];
const statusStyle = { pending: 'bg-brand-orange/15 text-[#b84000]', approved: 'bg-brand-green/15 text-brand-green', rejected: 'bg-navy/10 text-navy/60' };

/** Moderation queue for comments on the Points of Discussion. Only approved comments appear on the site. */
export default function CommentsManager({ onCountsChange }) {
  const [filter, setFilter] = useState('pending');
  const [data, setData] = useState({ items: null, counts: null });
  const [error, setError] = useState('');

  const load = (f = filter) => {
    setError('');
    adminApi.comments(f)
      .then((res) => { setData(res); onCountsChange?.(res.counts); })
      .catch((e) => { setData({ items: [], counts: null }); setError(e.message); });
  };
  useEffect(() => { load(filter); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (c, status) => {
    try {
      await adminApi.setCommentStatus(c.id, status);
      load();
    } catch (e) { window.alert(e.message); }
  };

  const remove = async (c) => {
    if (!window.confirm(`Delete the comment from ${c.name}? This cannot be undone.`)) return;
    try {
      await adminApi.deleteComment(c.id);
      load();
    } catch (e) { window.alert(e.message); }
  };

  const { items, counts } = data;

  return (
    <section>
      <SectionTitle title="Comments">
        <button type="button" onClick={() => load()} className="btn !border !border-navy/15 !px-4 !py-2 !text-xs text-navy hover:bg-white"><RefreshCw size={14} /> Refresh</button>
      </SectionTitle>

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter comments">
        {FILTERS.map((f) => (
          <button key={f.id || 'all'} type="button" role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${filter === f.id ? 'bg-navy text-white' : 'bg-white text-navy/70 hover:text-navy'}`}>
            {f.label}{counts && f.id && <span className="ml-1.5 opacity-70">({counts[f.id]})</span>}
          </button>
        ))}
      </div>
      <p className="mb-5 text-xs text-navy/55">Only <strong>approved</strong> comments are shown on the website (Issue page → Points of Discussion).</p>

      <ErrorNote>{error}</ErrorNote>
      {items === null ? <p className="text-sm text-navy/60">Loading…</p> : !items.length ? (
        <p className="rounded-xl bg-white p-8 text-center text-sm text-navy/60">{filter === 'pending' ? 'No comments waiting for review.' : 'No comments here.'}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((c) => (
            <li key={c.id} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-bold">{c.name}</span>
                {c.district && <span className="text-sm text-navy/55">· {districtName[c.district] || c.district}</span>}
                <span className={`badge ${statusStyle[c.status] || ''}`}>{c.status}</span>
                <span className="ml-auto text-xs text-navy/50">{fmtDateTime(c.createdAt)}</span>
              </div>
              {c.question && <p className="mt-2 text-xs text-navy/55"><strong>On point {c.question}:</strong> {discussionPoints[c.question - 1]?.en}</p>}
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-navy/85">{c.message}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.status !== 'approved' && <button type="button" onClick={() => setStatus(c, 'approved')} className="btn !bg-brand-green !px-4 !py-2 !text-xs text-white hover:opacity-90"><Check size={14} /> Approve</button>}
                {c.status !== 'rejected' && <button type="button" onClick={() => setStatus(c, 'rejected')} className="btn !border !border-navy/15 !px-4 !py-2 !text-xs text-navy hover:bg-navy-50"><X size={14} /> {c.status === 'approved' ? 'Hide from website' : 'Reject'}</button>}
                {c.status !== 'pending' && <button type="button" onClick={() => setStatus(c, 'pending')} className="btn !px-4 !py-2 !text-xs text-navy/60 hover:text-navy"><RotateCcw size={14} /> Back to pending</button>}
                <button type="button" onClick={() => remove(c)} className="btn ml-auto !px-3 !py-2 !text-xs text-navy/40 hover:text-brand-red" aria-label={`Delete comment from ${c.name}`}><Trash2 size={14} /> Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
