# Jago Andhra — PHP backend & admin

Plain PHP 8 + MySQL. No framework or Composer needed; works on standard shared hosting
(cPanel / Hostinger / etc.) with Apache.

It stores join-form submissions, contact messages and poll votes, serves news / events /
documents to the website, and powers the admin area at **`/admin`** on the website.

## cPanel hosting (website + backend on one domain) — recommended

Needs: PHP **8.1+ recommended** (7.4 works but is out of support; GD and pdo_mysql — standard), MySQL, and Apache (all cPanel hosts).

1. **Build the package** on your computer: `npm run package:cpanel` → `deploy/jago-andhra-cpanel.zip`.
2. **PHP version**: cPanel → *MultiPHP Manager* → set the domain to PHP 8.1+ (8.0 minimum).
3. **Upload limits**: cPanel → *MultiPHP INI Editor* → `upload_max_filesize = 20M`, `post_max_size = 25M`,
   `memory_limit = 256M` (for PDFs and photos).
4. **Database**: cPanel → *MySQL® Databases* → create a database (e.g. `cpuser_jago`), create a user with a
   strong password, *Add User To Database* with **ALL PRIVILEGES**.
5. **Upload**: cPanel → *File Manager* → `public_html` → *Upload* the zip → right-click → *Extract*.
   (Back up or clear anything already in `public_html` first. Turn on *Settings → Show Hidden Files* to see `.htaccess`.)
6. **Configure**: in `public_html/api/` copy `config.sample.php` to `config.php` and edit:
   `db_dsn` → `mysql:host=localhost;dbname=cpuser_jago;charset=utf8mb4`, `db_user`, `db_pass`,
   `secret` and `setup_key` (two different long random strings), `public_url` → `/api`.
7. **Create the admin**: open `https://yourdomain/api/setup.php`, enter the setup key, admin email and password.
   It creates the tables and imports the site's news, events, documents and gallery.
8. **Delete `public_html/api/setup.php`** in File Manager.
9. **SSL**: cPanel → *SSL/TLS Status* → *Run AutoSSL*. Then uncomment the HTTPS lines in `public_html/.htaccess`.
10. Visit `https://yourdomain/` and sign in at `https://yourdomain/admin`.

**Updating later** — run `npm run package:cpanel`, then:
- **Website-only change** (text, layout, colours): upload `deploy/jago-andhra-update.zip` (≈0.4 MB, just
  `index.html` + `assets/`) to `public_html` → *Extract* → overwrite. Done.
- **Backend change** (files in `backend/`): upload just the changed `.php` file(s) into `public_html/api/`,
  or the full `jago-andhra-cpanel.zip`.
- Either way `api/config.php` and `api/uploads/` on the server are kept (no zip contains them).
- News, events, documents, photos and comments never need an upload — change them in **/admin**.

## Separate backend server (e.g. website on Vercel)

### 1. Upload

1. Create a MySQL database and user in your hosting panel.
2. Upload the contents of this `backend/` folder to your server, e.g. to a subdomain such as
   `https://api.jagoandhra.com/` (or a folder like `https://yourdomain/api/`).
3. Make sure `uploads/` is writable by PHP (permission 755 or 775). Gallery photos go to `uploads/gallery/` (created automatically). PHP needs the GD extension (standard on most hosts).

## 2. Configure

Copy `config.sample.php` to `config.php` **on the server** and fill in:

| Setting | What to put |
|---|---|
| `db_dsn`, `db_user`, `db_pass` | Your MySQL database name, user and password |
| `allowed_origins` | The website address(es), e.g. `https://jagoandhra.com` and your `*.vercel.app` URL |
| `secret` | A long random string (`php -r "echo bin2hex(random_bytes(32));"`) |
| `setup_key` | Another long random string — needed once, for step 3 |
| `public_url` | The address of this backend, e.g. `https://api.jagoandhra.com` |

`config.php` is never committed to git and `.htaccess` blocks it from the web.

## 3. Create the admin account (one time)

1. Open `https://<backend address>/setup.php` in a browser.
2. Enter the `setup_key`, the admin email and a password (10+ characters).
   The password is stored **only as a secure hash** — nobody, including developers, can read it back.
3. Setup also creates the tables and imports the website's current news, events and documents.
4. **Delete `setup.php` from the server.** (It also locks itself once an admin exists.)

## 4. Connect the website

In Vercel → Project → Settings → Environment Variables add:

```
VITE_API_BASE_URL = https://api.jagoandhra.com
```

Redeploy. The site now reads news/events/documents from the backend and saves forms there.
Sign in at `https://jagoandhra.com/admin`.

## Admin features

- **Join submissions** — table, search, delete, export to CSV (opens in Excel, Telugu-safe)
- **Messages** — contact-form messages
- **Comments** — comments on the Points of Discussion (Issue page). New comments wait as *pending*; only *approved* ones appear on the website. Approve, reject/hide, or delete. The tab shows a red badge with the number waiting.
- **Poll** — support poll totals
- **News / Events / Documents** — add, edit, delete; upload PDFs (max 20 MB)
- **Gallery** — upload many photos at once (JPEG/PNG/WebP, max 15 MB each); they are rotated upright, resized to 1600 px with a thumbnail, and shown on the website's Gallery. Edit captions/category or delete.
- **Password** — change the admin password (signs out other sessions)

## Security notes

- Login is rate-limited: 5 failed attempts per IP → 15-minute lockout.
- Sessions are random tokens (only their hash is stored), expire after 12 hours
  (`token_hours`), and live in the browser tab's session storage.
- Uploads must be real PDFs (type and file signature checked); scripts can't run in `uploads/`.
- Visitor IPs are stored only as keyed hashes (for one-vote-per-visitor and login limits).
- Use HTTPS for the backend address.
- If you forget the password: in phpMyAdmin, delete the row from the `admins` table, upload
  `setup.php` again and repeat step 3 (existing content is kept).

## Endpoints

Public: `GET updates.php`, `GET events.php`, `GET documents.php`, `GET gallery.php`, `GET|POST votes.php`, `GET|POST comments.php` (GET = approved only; max 5 posts per visitor per hour),
`POST members.php`, `POST contact.php`.

Admin (header `Authorization: Bearer <token>`): `admin/login.php`, `admin/logout.php`,
`admin/me.php`, `admin/password.php`, `admin/members.php`, `admin/messages.php`, `admin/comments.php`,
`admin/content.php?type=update|event|document|photo`, `admin/upload.php` (PDF), `admin/photos.php` (gallery photos).

## Refreshing the seed

`seed.json` is generated from the website's built-in content with `npm run export-seed`
(only used by setup when the content table is empty).

## Local testing

With PHP 8 installed, create a `config.php` using SQLite:
`'db_dsn' => 'sqlite:' . __DIR__ . '/test.sqlite'` (user/pass `null`), run
`php -S localhost:8090 -t backend` from the project root, open `http://localhost:8090/setup.php`,
and put `VITE_API_BASE_URL=http://localhost:8090` in `.env.local`.
