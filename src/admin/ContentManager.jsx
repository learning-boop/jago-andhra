import { useEffect, useState } from 'react';
import { ExternalLink, Pencil, Plus, RefreshCw, Trash2, Upload } from 'lucide-react';
import { adminApi } from './adminApi';
import { ErrorNote, Modal, SectionTitle } from './AdminUi';
import { updateCategories } from '../data/updates';
import { eventTypes } from '../data/events';
import { documentCategories } from '../data/documents';
import { districts } from '../data/districts';

const opts = (list) => list.map((x) => ({ value: x.id, label: x.en || x.name?.en }));
const BODY_HELP = 'Leave a blank line between paragraphs. Start a line with "## " for a heading; lines starting with "- " become a bullet list. Text starting with "[" counts as a placeholder (no "Read more" link).';

/** Form layout per content type. kind: text | date | select | checkbox | bi (EN+TE inputs) | biArea | pdf */
const CONFIG = {
  update: {
    title: 'News & updates',
    noun: 'post',
    fields: [
      { name: 'categoryId', label: 'Category', kind: 'select', options: opts(updateCategories) },
      { name: 'date', label: 'Date', kind: 'date' },
      { name: 'title', label: 'Title', kind: 'bi', required: true },
      { name: 'excerpt', label: 'Summary (shown on the card)', kind: 'biArea', rows: 3 },
      { name: 'body', label: 'Full article', kind: 'biArea', rows: 14, help: BODY_HELP },
      { name: 'image', label: 'Image URL', kind: 'text', placeholder: 'https://…' },
      { name: 'imageAlt', label: 'Image description (for screen readers)', kind: 'text' },
      { name: 'slug', label: 'Web address (optional)', kind: 'text', placeholder: 'auto from the English title', help: 'Used in /updates/<address>. Leave empty to create one automatically.' },
    ],
    meta: (r) => [r.date, updateCategories.find((c) => c.id === r.categoryId)?.en],
    link: (r) => `/updates/${r.slug}`,
  },
  event: {
    title: 'Events & programmes',
    noun: 'event',
    fields: [
      { name: 'date', label: 'Date', kind: 'date' },
      { name: 'time', label: 'Time', kind: 'text', placeholder: '10:30 AM' },
      { name: 'typeId', label: 'Programme type', kind: 'select', options: opts(eventTypes) },
      { name: 'districtId', label: 'District', kind: 'select', options: opts(districts) },
      { name: 'status', label: 'Status', kind: 'select', options: [{ value: 'upcoming', label: 'Upcoming' }, { value: 'completed', label: 'Completed' }, { value: 'cancelled', label: 'Cancelled' }] },
      { name: 'title', label: 'Title', kind: 'bi', required: true },
      { name: 'venue', label: 'Venue', kind: 'bi' },
      { name: 'address', label: 'Address', kind: 'biArea', rows: 2 },
      { name: 'mapsQuery', label: 'Google Maps search text', kind: 'text', placeholder: 'e.g. Vijayawada, Andhra Pradesh' },
      { name: 'description', label: 'Description', kind: 'biArea', rows: 4 },
    ],
    meta: (r) => [r.date, r.time, districts.find((d) => d.id === r.districtId)?.name.en, r.status],
  },
  document: {
    title: 'Documents',
    noun: 'document',
    fields: [
      { name: 'url', label: 'PDF', kind: 'pdf' },
      { name: 'categoryId', label: 'Category', kind: 'select', options: opts(documentCategories) },
      { name: 'date', label: 'Date', kind: 'date' },
      { name: 'official', label: 'Official government document', kind: 'checkbox' },
      { name: 'title', label: 'Title', kind: 'bi', required: true },
      { name: 'description', label: 'Description', kind: 'biArea', rows: 3 },
    ],
    meta: (r) => [r.date, documentCategories.find((c) => c.id === r.categoryId)?.en, r.official && 'Official', r.size],
    link: (r) => (r.url && r.url !== '#' ? r.url : null),
  },
};

const today = () => new Date().toISOString().slice(0, 10);
const bi = (v) => ({ en: v?.en ?? '', te: v?.te ?? '' });

/** Record → form values (bilingual objects filled in, article body blocks joined for editing). */
function toForm(type, record) {
  const f = { ...record };
  for (const field of CONFIG[type].fields) {
    if (field.kind === 'bi' || field.kind === 'biArea') f[field.name] = bi(record[field.name]);
    else if (field.kind === 'select') f[field.name] = record[field.name] ?? field.options[0].value;
    else if (field.kind === 'date') f[field.name] = record[field.name] || today();
  }
  if (type === 'update') {
    const body = record.body || {};
    f.body = { en: [body.en].flat().filter(Boolean).join('\n\n'), te: [body.te].flat().filter(Boolean).join('\n\n') };
  }
  return f;
}

export default function ContentManager({ type }) {
  const cfg = CONFIG[type];
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);

  const load = () => {
    setError('');
    adminApi.content(type).then(setItems).catch((e) => { setItems([]); setError(e.message); });
  };
  useEffect(load, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const remove = async (r) => {
    if (!window.confirm(`Delete "${r.title?.en}"? This cannot be undone.`)) return;
    try {
      await adminApi.deleteContent(type, r.id);
      setItems((list) => list.filter((x) => x.id !== r.id));
    } catch (e) { window.alert(e.message); }
  };

  return (
    <section>
      <SectionTitle title={cfg.title} count={items?.length}>
        <button type="button" onClick={load} className="btn !border !border-navy/15 !px-4 !py-2 !text-xs text-navy hover:bg-white"><RefreshCw size={14} /> Refresh</button>
        <button type="button" onClick={() => setEditing(toForm(type, {}))} className="btn-primary !px-4 !py-2 !text-xs"><Plus size={14} /> Add {cfg.noun}</button>
      </SectionTitle>
      <ErrorNote>{error}</ErrorNote>
      {items === null ? <p className="text-sm text-navy/60">Loading…</p> : !items.length ? <p className="rounded-xl bg-white p-8 text-center text-sm text-navy/60">Nothing here yet.</p> : (
        <ul className="divide-y divide-navy/10 overflow-hidden rounded-xl bg-white shadow-sm">
          {items.map((r) => {
            const href = cfg.link?.(r);
            return (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-bold">{r.title?.en || '(untitled)'}</p>
                  <p className="mt-0.5 text-xs text-navy/55">{cfg.meta(r).filter(Boolean).join(' · ')}</p>
                </div>
                <div className="flex items-center gap-1">
                  {href && <a href={href} target="_blank" rel="noreferrer" className="rounded-full p-2 text-navy/50 hover:bg-navy-50 hover:text-navy" aria-label="Open"><ExternalLink size={16} /></a>}
                  <button type="button" onClick={() => setEditing(toForm(type, r))} className="rounded-full p-2 text-navy/50 hover:bg-navy-50 hover:text-navy" aria-label={`Edit ${r.title?.en}`}><Pencil size={16} /></button>
                  <button type="button" onClick={() => remove(r)} className="rounded-full p-2 text-navy/40 hover:bg-brand-red/10 hover:text-brand-red" aria-label={`Delete ${r.title?.en}`}><Trash2 size={16} /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {editing && (
        <Editor type={type} initial={editing} onClose={() => setEditing(null)}
          onSaved={(saved) => {
            setItems((list) => (list.some((x) => x.id === saved.id) ? list.map((x) => (x.id === saved.id ? saved : x)) : [saved, ...list]));
            setEditing(null);
          }} />
      )}
    </section>
  );
}

function Editor({ type, initial, onClose, onSaved }) {
  const cfg = CONFIG[type];
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ busy: false, error: '' });
  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.title?.en?.trim()) return setStatus({ error: 'English title is required.' });
    if (type === 'document' && !form.url) return setStatus({ error: 'Upload a PDF or enter a link.' });
    setStatus({ busy: true, error: '' });
    try {
      onSaved(await adminApi.saveContent(type, form));
    } catch (err) {
      setStatus({ busy: false, error: err.message });
    }
  };

  return (
    <Modal title={`${form.id ? 'Edit' : 'Add'} ${cfg.noun}`} onClose={onClose} wide>
      <form onSubmit={save} className="space-y-5">
        {cfg.fields.map((field) => <Field key={field.name} field={field} value={form[field.name]} onChange={(v) => set(field.name, v)} form={form} setForm={setForm} />)}
        <ErrorNote>{status.error}</ErrorNote>
        <div className="flex justify-end gap-2 border-t border-navy/10 pt-5">
          <button type="button" onClick={onClose} className="btn text-navy/60 hover:text-navy">Cancel</button>
          <button type="submit" disabled={status.busy} className="btn-primary disabled:opacity-60">{status.busy ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </Modal>
  );
}

const labelCls = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60';

function Field({ field, value, onChange, form, setForm }) {
  const { name, label, kind, help } = field;
  const id = `f-${name}`;
  let control;

  if (kind === 'bi' || kind === 'biArea') {
    const Tag = kind === 'bi' ? 'input' : 'textarea';
    control = (
      <div className="grid gap-3 md:grid-cols-2">
        {[['en', 'English'], ['te', 'తెలుగు']].map(([l, lname]) => (
          <div key={l}>
            <span className="mb-1 block text-[11px] font-semibold text-navy/45">{lname}{field.required && l === 'en' && ' *'}</span>
            <Tag className={`input ${l === 'te' ? 'font-telugu' : ''}`} rows={field.rows} lang={l} value={value?.[l] ?? ''} onChange={(e) => onChange({ ...value, [l]: e.target.value })} aria-label={`${label} (${lname})`} />
          </div>
        ))}
      </div>
    );
  } else if (kind === 'select') {
    control = <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>{field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>;
  } else if (kind === 'checkbox') {
    return (
      <label className="flex items-center gap-3 text-sm font-semibold">
        <input type="checkbox" className="h-4 w-4 accent-brand-orange" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} /> {label}
      </label>
    );
  } else if (kind === 'pdf') {
    control = <PdfField form={form} setForm={setForm} />;
  } else {
    control = <input id={id} className="input" type={kind === 'date' ? 'date' : 'text'} placeholder={field.placeholder} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
  }

  return (
    <div>
      <label htmlFor={kind === 'bi' || kind === 'biArea' || kind === 'pdf' ? undefined : id} className={labelCls}>{label}</label>
      {control}
      {help && <p className="mt-1.5 text-xs text-navy/50">{help}</p>}
    </div>
  );
}

function PdfField({ form, setForm }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const { url, size } = await adminApi.upload(file);
      setForm((f) => ({ ...f, url, size }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-dashed border-navy/20 p-4">
      <label className="btn-outline inline-flex cursor-pointer !px-4 !py-2 !text-xs">
        <Upload size={14} /> {busy ? 'Uploading…' : form.url ? 'Replace PDF' : 'Upload PDF'}
        <input type="file" accept="application/pdf,.pdf" className="sr-only" disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
      </label>
      <span className="ml-3 text-xs text-navy/50">Max 20 MB</span>
      <div className="grid gap-3 sm:grid-cols-[1fr_110px]">
        <input className="input text-sm" placeholder="…or paste a link (https://…)" value={form.url ?? ''} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} aria-label="PDF link" />
        <input className="input text-sm" placeholder="Size" value={form.size ?? ''} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} aria-label="File size" />
      </div>
      <ErrorNote>{error}</ErrorNote>
    </div>
  );
}
