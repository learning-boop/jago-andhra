/**
 * Admin calls to the PHP backend. The login token lives in sessionStorage, so it is
 * cleared when the browser tab closes; the server also expires it (12 h by default).
 */
import { BASE_URL, USE_API, request } from '../services/api';

const TOKEN_KEY = 'jago-andhra-admin-token';

export const backendConnected = USE_API;

export const session = {
  get: () => { try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (t) => { try { sessionStorage.setItem(TOKEN_KEY, t); } catch { /* storage unavailable */ } },
  clear: () => { try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* storage unavailable */ } },
};

/** Authenticated request; a 401 clears the session so the UI returns to the login screen. */
async function authed(path, options = {}) {
  try {
    return await request(path, { ...options, headers: { Authorization: `Bearer ${session.get()}`, ...options.headers } });
  } catch (e) {
    if (e.status === 401) {
      session.clear();
      window.dispatchEvent(new Event('admin-signed-out'));
    }
    throw e;
  }
}

const json = (method, data) => ({ method, body: JSON.stringify(data) });

export const adminApi = {
  async login(email, password) {
    const res = await request('/admin/login.php', json('POST', { email, password }));
    session.set(res.token);
    return res;
  },
  async logout() {
    try { await authed('/admin/logout.php', { method: 'POST' }); } finally { session.clear(); }
  },
  me: () => authed('/admin/me.php'),
  changePassword: (current, next) => authed('/admin/password.php', json('POST', { current, new: next })),

  members: () => authed('/admin/members.php'),
  deleteMember: (id) => authed(`/admin/members.php?id=${id}`, { method: 'DELETE' }),
  messages: () => authed('/admin/messages.php'),
  deleteMessage: (id) => authed(`/admin/messages.php?id=${id}`, { method: 'DELETE' }),
  votes: () => request('/votes.php'),

  /** type: 'update' | 'event' | 'document' */
  content: (type) => authed(`/admin/content.php?type=${type}`),
  saveContent: (type, record) => (record.id
    ? authed(`/admin/content.php?type=${type}&id=${record.id}`, json('PUT', record))
    : authed(`/admin/content.php?type=${type}`, json('POST', record))),
  deleteContent: (type, id) => authed(`/admin/content.php?type=${type}&id=${id}`, { method: 'DELETE' }),

  /** Uploads a PDF; resolves to { url, size }. */
  async upload(file) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE_URL}/admin/upload.php`, { method: 'POST', body: form, headers: { Authorization: `Bearer ${session.get()}` } });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) { session.clear(); window.dispatchEvent(new Event('admin-signed-out')); }
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data;
  },
};
