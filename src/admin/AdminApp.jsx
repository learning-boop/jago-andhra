import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CalendarDays, Images, KeyRound, LogOut, Mail, MessageSquare, Newspaper, ThumbsUp, Users } from 'lucide-react';
import logo from '../assets/logo.webp';
import { adminApi, backendConnected, session } from './adminApi';
import { Members, Messages, Poll } from './Inbox';
import ContentManager from './ContentManager';
import GalleryManager from './GalleryManager';
import CommentsManager from './CommentsManager';
import { Modal } from './AdminUi';

const tabs = [
  { id: 'members', label: 'Join submissions', icon: Users, el: <Members /> },
  { id: 'messages', label: 'Messages', icon: Mail, el: <Messages /> },
  { id: 'comments', label: 'Comments', icon: MessageSquare, el: null }, // rendered in Dashboard (needs the pending badge)
  { id: 'poll', label: 'Poll', icon: ThumbsUp, el: <Poll /> },
  { id: 'update', label: 'News', icon: Newspaper, el: <ContentManager type="update" /> },
  { id: 'event', label: 'Events', icon: CalendarDays, el: <ContentManager type="event" /> },
  { id: 'document', label: 'Documents', icon: FileText, el: <ContentManager type="document" /> },
  { id: 'gallery', label: 'Gallery', icon: Images, el: <GalleryManager /> },
];

/** Admin area at /admin — rendered without the public site's navbar, footer and poll. */
export default function AdminApp() {
  const [email, setEmail] = useState(null);
  const [checking, setChecking] = useState(Boolean(session.get()));

  useEffect(() => {
    document.title = 'Admin | Jago Andhra';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const onOut = () => setEmail(null);
    window.addEventListener('admin-signed-out', onOut);
    if (session.get()) adminApi.me().then((r) => setEmail(r.email)).catch(() => {}).finally(() => setChecking(false));
    return () => { meta.remove(); window.removeEventListener('admin-signed-out', onOut); };
  }, []);

  return (
    <div className="min-h-screen bg-navy-50 text-navy">
      {!backendConnected ? <NotConnected />
        : checking ? <p className="p-10 text-center text-sm text-navy/60">Checking session…</p>
        : email ? <Dashboard email={email} onSignOut={() => setEmail(null)} />
        : <Login onSignedIn={setEmail} />}
    </div>
  );
}

function Shell({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <img src={logo} alt="" className="h-12 w-12 rounded-full" width="48" height="48" />
          <div><p className="font-display text-lg font-extrabold leading-none">JAGO <span className="text-brand-orange">ANDHRA</span></p><p className="mt-1 text-xs font-semibold uppercase tracking-widest text-navy/50">Admin</p></div>
        </div>
        {children}
      </div>
    </div>
  );
}

function NotConnected() {
  return (
    <Shell>
      <h1 className="font-display text-xl font-extrabold">Backend not connected</h1>
      <p className="mt-3 text-sm leading-relaxed text-navy/70">The admin area needs the PHP backend. Set <code className="rounded bg-navy-50 px-1">VITE_API_BASE_URL</code> to the backend URL and redeploy — see <code className="rounded bg-navy-50 px-1">backend/README.md</code>.</p>
      <Link to="/" className="btn-outline mt-6 w-full">Back to website</Link>
    </Shell>
  );
}

function Login({ onSignedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ busy: false, error: '' });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ busy: true, error: '' });
    try {
      const res = await adminApi.login(form.email.trim(), form.password);
      onSignedIn(res.email);
    } catch (err) {
      setStatus({ busy: false, error: err.message || 'Sign-in failed' });
    }
  };

  return (
    <Shell>
      <h1 className="font-display text-xl font-extrabold">Sign in</h1>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-navy/60">Email
          <input className="input mt-1.5" type="email" autoComplete="username" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy/60">Password
          <input className="input mt-1.5" type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        {status.error && <p className="rounded-lg bg-brand-red/10 px-3 py-2 text-sm text-brand-red" role="alert">{status.error}</p>}
        <button type="submit" disabled={status.busy} className="btn-primary w-full disabled:opacity-60">{status.busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </Shell>
  );
}

function Dashboard({ email, onSignOut }) {
  const [tab, setTab] = useState('members');
  const [pwOpen, setPwOpen] = useState(false);
  const [pendingComments, setPendingComments] = useState(0);
  const current = tabs.find((t) => t.id === tab);

  // Badge on the Comments tab: how many comments are waiting for approval
  useEffect(() => {
    adminApi.comments('pending').then((r) => setPendingComments(r.counts.pending)).catch(() => {});
  }, []);

  const signOut = async () => {
    await adminApi.logout().catch(() => {});
    onSignOut();
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5" title="Open website">
            <img src={logo} alt="" className="h-9 w-9 rounded-full" width="36" height="36" />
            <span className="font-display font-extrabold">JAGO <span className="text-brand-orange">ANDHRA</span> <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-navy/50">Admin</span></span>
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <span className="hidden text-navy/60 md:inline">{email}</span>
            <button type="button" onClick={() => setPwOpen(true)} className="flex items-center gap-1.5 rounded-full px-3 py-2 font-semibold hover:bg-navy-50" title="Change password"><KeyRound size={16} /><span className="hidden sm:inline">Password</span></button>
            <button type="button" onClick={signOut} className="flex items-center gap-1.5 rounded-full px-3 py-2 font-semibold text-brand-red hover:bg-brand-red/5"><LogOut size={16} /><span className="hidden sm:inline">Sign out</span></button>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl overflow-x-auto px-4" aria-label="Admin sections">
          <ul className="flex gap-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button type="button" onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors ${tab === id ? 'border-brand-orange text-navy' : 'border-transparent text-navy/55 hover:text-navy'}`}>
                  <Icon size={16} /> {label}
                  {id === 'comments' && pendingComments > 0 && <span className="rounded-full bg-brand-red px-1.5 py-0.5 text-[10px] font-bold leading-none text-white" aria-label={`${pendingComments} pending`}>{pendingComments}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div key={current.id}>{current.id === 'comments' ? <CommentsManager onCountsChange={(c) => setPendingComments(c.pending)} /> : current.el}</div>
      </main>
      {pwOpen && <PasswordDialog onClose={() => setPwOpen(false)} />}
    </>
  );
}

function PasswordDialog({ onClose }) {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [status, setStatus] = useState({ busy: false, error: '', done: false });

  const submit = async (e) => {
    e.preventDefault();
    if (form.next.length < 10) return setStatus({ error: 'New password must be at least 10 characters.' });
    if (form.next !== form.confirm) return setStatus({ error: 'The new passwords do not match.' });
    setStatus({ busy: true, error: '' });
    try {
      await adminApi.changePassword(form.current, form.next);
      setStatus({ done: true });
    } catch (err) {
      setStatus({ error: err.message });
    }
  };

  return (
    <Modal title="Change password" onClose={onClose}>
      {status.done ? (
        <>
          <p className="rounded-lg bg-brand-green/10 px-3 py-2 text-sm text-brand-green">Password changed. Other signed-in sessions were signed out.</p>
          <button type="button" onClick={onClose} className="btn-primary mt-5 w-full">Done</button>
        </>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          {[['current', 'Current password', 'current-password'], ['next', 'New password (min. 10 characters)', 'new-password'], ['confirm', 'Confirm new password', 'new-password']].map(([k, label, ac]) => (
            <label key={k} className="block text-xs font-bold uppercase tracking-wider text-navy/60">{label}
              <input className="input mt-1.5" type="password" autoComplete={ac} required value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            </label>
          ))}
          {status.error && <p className="rounded-lg bg-brand-red/10 px-3 py-2 text-sm text-brand-red" role="alert">{status.error}</p>}
          <button type="submit" disabled={status.busy} className="btn-primary w-full disabled:opacity-60">{status.busy ? 'Saving…' : 'Change password'}</button>
        </form>
      )}
    </Modal>
  );
}
