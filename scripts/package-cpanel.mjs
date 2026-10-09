// Builds a ready-to-upload package for cPanel hosting:
//   deploy/public_html/        website (dist) + .htaccess
//   deploy/public_html/api/    PHP backend (no config.php, no local test files)
//   deploy/jago-andhra-cpanel.zip   full package (first upload)
//   deploy/jago-andhra-update.zip   website code only (later updates)
// Run: npm run package:cpanel   — then upload the zip and extract it inside public_html.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const out = join(root, 'deploy');
const site = join(out, 'public_html');
const api = join(site, 'api');

// 1. Build the website so it calls the backend on the same domain at /api
//    (a process env var outranks .env.local, so local settings don't leak into the build)
execSync('npx vite build', { cwd: root, stdio: 'inherit', env: { ...process.env, VITE_API_BASE_URL: '/api' } });

// 2. Fresh deploy folder
rmSync(out, { recursive: true, force: true });
mkdirSync(api, { recursive: true });
cpSync(join(root, 'dist'), site, { recursive: true });

// 3. Backend, minus secrets and local-only files
const skip = new Set(['config.php', 'README.md']);
cpSync(join(root, 'backend'), api, {
  recursive: true,
  filter: (src) => {
    const name = src.split(/[\\/]/).pop();
    if (skip.has(name) || name.endsWith('.sqlite')) return false;
    // keep the uploads folder and its .htaccess, but none of the local test uploads
    if (/[\\/]uploads[\\/]/.test(src) && name !== '.htaccess' && statSync(src).isFile()) return false;
    return true;
  },
});
mkdirSync(join(api, 'uploads', 'gallery'), { recursive: true });

if (!existsSync(join(site, '.htaccess'))) throw new Error('public/.htaccess was not copied into the build');
if (existsSync(join(api, 'config.php'))) throw new Error('config.php must not be packaged');

// 4. Zip the contents of public_html (Windows 10+ ships bsdtar, which writes zip; so do macOS/Linux)
const zip = join(out, 'jago-andhra-cpanel.zip');
const tar = process.platform === 'win32' ? join(process.env.SystemRoot || 'C:/Windows', 'System32', 'tar.exe') : 'tar';
const entries = readdirSync(site).map((e) => `"${e}"`).join(' '); // includes .htaccess; folders are added with their hidden files
execSync(`"${tar}" -a -c -f "${zip}" ${entries}`, { cwd: site, stdio: 'inherit' });

// 5. Small update package: only the website code (index.html + hashed assets).
//    Use it when you changed only the look/text of the site — photos, PDFs and the backend are untouched.
const update = join(out, 'jago-andhra-update.zip');
execSync(`"${tar}" -a -c -f "${update}" "index.html" "assets"`, { cwd: site, stdio: 'inherit' });

const count = (dir) => readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(join(dir, e.name)) : 1), 0);
console.log(`\nPackage ready: deploy/jago-andhra-cpanel.zip (${count(site)} files, ${(statSync(zip).size / 1048576).toFixed(1)} MB)`);
console.log(`Update only:  deploy/jago-andhra-update.zip (${(statSync(update).size / 1048576).toFixed(1)} MB) — index.html + assets, for website-only changes`);
console.log('Upload a zip to public_html in cPanel File Manager and Extract. Steps: backend/README.md → "cPanel hosting".');
