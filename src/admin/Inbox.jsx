import { useEffect, useMemo, useState } from 'react';
import { Download, RefreshCw, Search, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import { adminApi } from './adminApi';
import { ErrorNote, SectionTitle, fmtDateTime } from './AdminUi';
import { districts } from '../data/districts';
import en from '../i18n/en';

const districtName = Object.fromEntries(districts.map((d) => [d.id, d.name.en]));
const professionName = (p) => en.join.professions[p] || p;

/** Loads a list from the backend with loading / error state and a reload function. */
function useList(fetcher) {
  const [state, setState] = useState({ items: null, error: '' });
  const load = () => {
    setState((s) => ({ ...s, error: '' }));
    fetcher().then((items) => setState({ items, error: '' })).catch((e) => setState({ items: [], error: e.message }));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [state, load, setState];
}

function RefreshButton({ onClick }) {
  return <button type="button" onClick={onClick} className="btn !border !border-navy/15 !px-4 !py-2 !text-xs text-navy hover:bg-white"><RefreshCw size={14} /> Refresh</button>;
}

function toCsv(rows, columns) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [columns.map((c) => esc(c.label)).join(','), ...rows.map((r) => columns.map((c) => esc(c.get(r))).join(','))].join('\r\n');
}

function download(name, text) {
  // BOM so Excel opens Telugu text correctly
  const url = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  a.click();
  URL.revokeObjectURL(url);
}

const memberColumns = [
  { label: 'Date', get: (m) => fmtDateTime(m.createdAt) },
  { label: 'Name', get: (m) => m.fullName },
  { label: 'Mobile', get: (m) => m.mobile },
  { label: 'Email', get: (m) => m.email },
  { label: 'Age', get: (m) => m.age },
  { label: 'Profession', get: (m) => professionName(m.profession) },
  { label: 'District', get: (m) => districtName[m.district] || m.district },
  { label: 'Address', get: (m) => m.address },
  { label: 'Message', get: (m) => m.message },
];

export function Members() {
  const [{ items, error }, load, setState] = useList(adminApi.members);
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (items || []).filter((m) => !s || memberColumns.some((c) => String(c.get(m)).toLowerCase().includes(s)));
  }, [items, q]);

  const remove = async (m) => {
    if (!window.confirm(`Delete the submission from ${m.fullName}? This cannot be undone.`)) return;
    try {
      await adminApi.deleteMember(m.id);
      setState((st) => ({ ...st, items: st.items.filter((x) => x.id !== m.id) }));
    } catch (e) { window.alert(e.message); }
  };

  return (
    <section>
      <SectionTitle title="Join submissions" count={items?.length}>
        <label className="relative">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
          <input className="input !w-56 !py-2 !pl-9 text-sm" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <RefreshButton onClick={load} />
        <button type="button" disabled={!shown.length} onClick={() => download(`jago-andhra-members-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(shown, memberColumns))} className="btn-primary !px-4 !py-2 !text-xs disabled:opacity-50"><Download size={14} /> Export CSV</button>
      </SectionTitle>
      <ErrorNote>{error}</ErrorNote>
      {items === null ? <p className="text-sm text-navy/60">Loading…</p> : !shown.length ? <p className="rounded-xl bg-white p-8 text-center text-sm text-navy/60">{q ? 'No submissions match your search.' : 'No submissions yet.'}</p> : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-navy text-xs uppercase tracking-wider text-white">
              <tr>{memberColumns.map((c) => <th key={c.label} className="px-3 py-3 font-semibold">{c.label}</th>)}<th className="px-3 py-3"><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {shown.map((m) => (
                <tr key={m.id} className="align-top hover:bg-navy-50/60">
                  {memberColumns.map((c) => <td key={c.label} className={`px-3 py-3 ${c.label === 'Address' || c.label === 'Message' ? 'max-w-[220px] whitespace-pre-wrap break-words' : 'whitespace-nowrap'}`}>{c.get(m)}</td>)}
                  <td className="px-3 py-3"><button type="button" onClick={() => remove(m)} className="rounded-full p-2 text-navy/40 hover:bg-brand-red/10 hover:text-brand-red" aria-label={`Delete ${m.fullName}`}><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function Messages() {
  const [{ items, error }, load, setState] = useList(adminApi.messages);

  const remove = async (m) => {
    if (!window.confirm(`Delete the message from ${m.name}? This cannot be undone.`)) return;
    try {
      await adminApi.deleteMessage(m.id);
      setState((st) => ({ ...st, items: st.items.filter((x) => x.id !== m.id) }));
    } catch (e) { window.alert(e.message); }
  };

  return (
    <section>
      <SectionTitle title="Contact messages" count={items?.length}><RefreshButton onClick={load} /></SectionTitle>
      <ErrorNote>{error}</ErrorNote>
      {items === null ? <p className="text-sm text-navy/60">Loading…</p> : !items.length ? <p className="rounded-xl bg-white p-8 text-center text-sm text-navy/60">No messages yet.</p> : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{m.name}</p>
                  <p className="text-sm text-navy/60"><a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a>{m.phone && <> · <a href={`tel:${m.phone}`} className="hover:underline">{m.phone}</a></>}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-navy/50">{fmtDateTime(m.createdAt)}</span>
                  <button type="button" onClick={() => remove(m)} className="rounded-full p-2 text-navy/40 hover:bg-brand-red/10 hover:text-brand-red" aria-label={`Delete message from ${m.name}`}><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-navy/80">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function Poll() {
  const [state, setState] = useState({ tally: null, error: '' });
  const load = () => adminApi.votes().then((tally) => setState({ tally, error: '' })).catch((e) => setState({ tally: null, error: e.message }));
  useEffect(() => { load(); }, []);
  const { tally, error } = state;
  const total = tally ? tally.up + tally.down : 0;
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

  return (
    <section>
      <SectionTitle title="Support poll" count={tally ? total : undefined}><RefreshButton onClick={load} /></SectionTitle>
      <ErrorNote>{error}</ErrorNote>
      {tally && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[['I Support', tally.up, ThumbsUp, 'text-brand-green', 'bg-brand-green'], ['I Don’t Support', tally.down, ThumbsDown, 'text-brand-red', 'bg-brand-red']].map(([label, n, Icon, text, bg]) => (
            <div key={label} className="rounded-xl bg-white p-6 shadow-sm">
              <p className={`flex items-center gap-2 text-sm font-bold ${text}`}><Icon size={18} /> {label}</p>
              <p className="mt-3 font-display text-4xl font-black">{n.toLocaleString('en-IN')}</p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-navy/10"><div className={`h-full rounded-full ${bg}`} style={{ width: `${pct(n)}%` }} /></div>
              <p className="mt-2 text-sm text-navy/60">{pct(n)}% of {total.toLocaleString('en-IN')} votes</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-xs text-navy/50">One vote is counted per visitor IP address; voting again changes that visitor’s vote.</p>
    </section>
  );
}
