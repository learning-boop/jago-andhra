import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Pencil, RefreshCw, Trash2 } from 'lucide-react';
import { adminApi } from './adminApi';
import { ErrorNote, Modal, SectionTitle } from './AdminUi';
import { galleryCategories } from '../data/gallery';

const catName = (id) => galleryCategories.find((c) => c.id === id)?.en || id;

export default function GalleryManager() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);

  const load = () => {
    setError('');
    adminApi.content('photo').then(setItems).catch((e) => { setItems([]); setError(e.message); });
  };
  useEffect(load, []);

  const remove = async (p) => {
    if (!window.confirm('Delete this photo from the gallery? This cannot be undone.')) return;
    try {
      await adminApi.deleteContent('photo', p.id);
      setItems((list) => list.filter((x) => x.id !== p.id));
    } catch (e) { window.alert(e.message); }
  };

  const shown = (items || []).filter((p) => filter === 'all' || p.categoryId === filter);

  return (
    <section>
      <SectionTitle title="Gallery" count={items?.length}>
        <select className="input !w-auto !py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {galleryCategories.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
        </select>
        <button type="button" onClick={load} className="btn !border !border-navy/15 !px-4 !py-2 !text-xs text-navy hover:bg-white"><RefreshCw size={14} /> Refresh</button>
      </SectionTitle>

      <Uploader onUploaded={(photos) => setItems((list) => [...photos, ...(list || [])])} />

      <ErrorNote>{error}</ErrorNote>
      {items === null ? <p className="mt-6 text-sm text-navy/60">Loading…</p> : !shown.length ? <p className="mt-6 rounded-xl bg-white p-8 text-center text-sm text-navy/60">No photos here yet.</p> : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {shown.map((p) => (
            <li key={p.id} className="group overflow-hidden rounded-xl bg-white shadow-sm">
              <a href={p.src} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden bg-navy-50">
                <img src={p.thumb || p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </a>
              <div className="flex items-start justify-between gap-1 p-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold" title={p.caption?.en}>{p.caption?.en || <span className="font-normal text-navy/40">No caption</span>}</p>
                  <p className="mt-0.5 text-[11px] text-navy/50">{catName(p.categoryId)}</p>
                </div>
                <div className="flex shrink-0">
                  <button type="button" onClick={() => setEditing(p)} className="rounded-full p-1.5 text-navy/50 hover:bg-navy-50 hover:text-navy" aria-label="Edit photo details"><Pencil size={14} /></button>
                  <button type="button" onClick={() => remove(p)} className="rounded-full p-1.5 text-navy/40 hover:bg-brand-red/10 hover:text-brand-red" aria-label="Delete photo"><Trash2 size={14} /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <PhotoEditor photo={editing} onClose={() => setEditing(null)}
          onSaved={(saved) => { setItems((list) => list.map((x) => (x.id === saved.id ? saved : x))); setEditing(null); }} />
      )}
    </section>
  );
}

function Uploader({ onUploaded }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [categoryId, setCategoryId] = useState('meetings');
  const [caption, setCaption] = useState({ en: '', te: '' });
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState([]);

  const upload = async () => {
    const uploaded = [];
    const errs = [];
    // One photo per request keeps each request under the server's upload size limit.
    for (let i = 0; i < files.length; i++) {
      setProgress({ done: i, total: files.length });
      try {
        const res = await adminApi.uploadPhoto(files[i], categoryId, caption);
        uploaded.push(...res.created);
        errs.push(...res.errors);
      } catch (e) {
        errs.push(`${files[i].name}: ${e.message}`);
      }
    }
    setProgress(null);
    setErrors(errs);
    if (uploaded.length) onUploaded(uploaded);
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const busy = progress !== null;

  return (
    <div className="rounded-xl border border-dashed border-navy/20 bg-white p-5">
      <h2 className="flex items-center gap-2 font-display text-lg font-extrabold"><ImagePlus size={18} /> Add photos</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_200px]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">Photos (JPEG, PNG or WebP, up to 15 MB each)</span>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={busy}
            onChange={(e) => setFiles([...(e.target.files || [])])}
            className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-navy-800" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy/60">Category</span>
          <select className="input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} disabled={busy}>
            {galleryCategories.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input className="input" placeholder="Caption in English (optional)" value={caption.en} onChange={(e) => setCaption({ ...caption, en: e.target.value })} disabled={busy} aria-label="Caption in English" />
        <input className="input font-telugu" lang="te" placeholder="తెలుగులో వివరణ (ఐచ్ఛికం)" value={caption.te} onChange={(e) => setCaption({ ...caption, te: e.target.value })} disabled={busy} aria-label="Caption in Telugu" />
      </div>
      <p className="mt-2 text-xs text-navy/50">The category and caption apply to every photo in this batch; you can edit each photo afterwards.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={upload} disabled={!files.length || busy} className="btn-primary disabled:opacity-50">
          {busy ? `Uploading ${progress.done + 1} of ${progress.total}…` : files.length ? `Upload ${files.length} photo${files.length === 1 ? '' : 's'}` : 'Choose photos first'}
        </button>
        {busy && <div className="h-2 w-48 overflow-hidden rounded-full bg-navy/10"><div className="h-full bg-brand-orange transition-all" style={{ width: `${(progress.done / progress.total) * 100}%` }} /></div>}
      </div>
      {errors.length > 0 && <div className="mt-4"><ErrorNote>{errors.map((e) => <span key={e} className="block">{e}</span>)}</ErrorNote></div>}
    </div>
  );
}

function PhotoEditor({ photo, onClose, onSaved }) {
  const [form, setForm] = useState({ ...photo, caption: { en: photo.caption?.en || '', te: photo.caption?.te || '' } });
  const [status, setStatus] = useState({ busy: false, error: '' });

  const save = async (e) => {
    e.preventDefault();
    setStatus({ busy: true, error: '' });
    try {
      onSaved(await adminApi.saveContent('photo', { ...form, alt: form.caption.en || form.alt }));
    } catch (err) {
      setStatus({ busy: false, error: err.message });
    }
  };

  return (
    <Modal title="Edit photo" onClose={onClose} wide>
      <form onSubmit={save} className="grid gap-6 md:grid-cols-[220px_1fr]">
        <img src={photo.thumb || photo.src} alt={photo.alt} className="w-full rounded-xl object-cover" />
        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-navy/60">Category
            <select className="input mt-1.5" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              {galleryCategories.map((c) => <option key={c.id} value={c.id}>{c.en}</option>)}
            </select>
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy/60">Caption (English)
            <input className="input mt-1.5" value={form.caption.en} onChange={(e) => setForm({ ...form, caption: { ...form.caption, en: e.target.value } })} />
          </label>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy/60">Caption (తెలుగు)
            <input className="input mt-1.5 font-telugu" lang="te" value={form.caption.te} onChange={(e) => setForm({ ...form, caption: { ...form.caption, te: e.target.value } })} />
          </label>
          <ErrorNote>{status.error}</ErrorNote>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn text-navy/60 hover:text-navy">Cancel</button>
            <button type="submit" disabled={status.busy} className="btn-primary disabled:opacity-60">{status.busy ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
