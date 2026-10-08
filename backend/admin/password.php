<?php
/** POST { current, new } → { ok: true }  (signs out all other sessions) */
require __DIR__ . '/../lib/bootstrap.php';
allow('POST');
$admin = require_admin();

$b = body();
$new = (string) ($b['new'] ?? '');
if (strlen($new) < 10) fail('New password must be at least 10 characters.');

$st = db()->prepare('SELECT password_hash FROM admins WHERE id = ?');
$st->execute([$admin['id']]);
if (!password_verify((string) ($b['current'] ?? ''), (string) $st->fetchColumn())) fail('Current password is incorrect.', 403);

db()->prepare('UPDATE admins SET password_hash = ? WHERE id = ?')->execute([password_hash($new, PASSWORD_DEFAULT), $admin['id']]);
db()->prepare('DELETE FROM admin_tokens WHERE admin_id = ? AND token_hash <> ?')->execute([$admin['id'], hash('sha256', bearer_token())]);
json_out(['ok' => true]);
