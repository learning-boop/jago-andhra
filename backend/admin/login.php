<?php
/** POST { email, password } → { token, email, expiresAt }   (max 5 failed attempts per IP per 15 minutes) */
require __DIR__ . '/../lib/bootstrap.php';
allow('POST');

$ip = ip_hash();
$since = gmdate('Y-m-d H:i:s', time() - 15 * 60);
$st = db()->prepare('SELECT COUNT(*) FROM login_attempts WHERE ip_hash = ? AND attempted_at > ?');
$st->execute([$ip, $since]);
if ((int) $st->fetchColumn() >= 5) fail('Too many failed attempts. Try again in 15 minutes.', 429);

$b = body();
$email = strtolower(clean($b['email'] ?? '', 190));
$password = (string) ($b['password'] ?? '');

$st = db()->prepare('SELECT id, email, password_hash FROM admins WHERE email = ?');
$st->execute([$email]);
$admin = $st->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    db()->prepare('INSERT INTO login_attempts (ip_hash, attempted_at) VALUES (?, ?)')->execute([$ip, now()]);
    usleep(500000);
    fail('Incorrect email or password.', 401);
}

if (password_needs_rehash($admin['password_hash'], PASSWORD_DEFAULT)) {
    db()->prepare('UPDATE admins SET password_hash = ? WHERE id = ?')->execute([password_hash($password, PASSWORD_DEFAULT), $admin['id']]);
}

db()->prepare('DELETE FROM login_attempts WHERE ip_hash = ?')->execute([$ip]);
db()->prepare('DELETE FROM admin_tokens WHERE expires_at <= ?')->execute([now()]);

$token = bin2hex(random_bytes(32));
$expires = gmdate('Y-m-d H:i:s', time() + 3600 * (int) cfg('token_hours', 12));
db()->prepare('INSERT INTO admin_tokens (token_hash, admin_id, expires_at) VALUES (?, ?, ?)')
    ->execute([hash('sha256', $token), $admin['id'], $expires]);

json_out(['token' => $token, 'email' => $admin['email'], 'expiresAt' => str_replace(' ', 'T', $expires) . 'Z']);
