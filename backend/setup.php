<?php
/**
 * ONE-TIME SETUP. Creates the database tables, imports the current website content
 * (seed.json) and creates the admin account with a password you type here.
 * It needs `setup_key` from config.php and stops working once an admin exists.
 * Delete this file from the server after use.
 */
declare(strict_types=1);
require __DIR__ . '/lib/bootstrap.php';
header_remove('Content-Type');
header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex');

function create_tables(): void
{
    $sql = file_get_contents(__DIR__ . '/schema.sql');
    $sql = preg_replace('/^--.*$/m', '', $sql);
    if (db()->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite') {
        // Local testing only: translate the MySQL schema to SQLite.
        $sql = str_replace('INT UNSIGNED AUTO_INCREMENT PRIMARY KEY', 'INTEGER PRIMARY KEY AUTOINCREMENT', $sql);
        $sql = preg_replace('/,\s*INDEX \([^)]*\)/', '', $sql);
        $sql = preg_replace('/\)\s*ENGINE=[^;]*;/', ');', $sql);
    }
    foreach (array_filter(array_map('trim', explode(';', $sql))) as $stmt) db()->exec($stmt);
}

function admin_exists(): bool
{
    try {
        return (int) db()->query('SELECT COUNT(*) FROM admins')->fetchColumn() > 0;
    } catch (PDOException $e) {
        return false; // tables not created yet
    }
}

function import_seed(): int
{
    if ((int) db()->query('SELECT COUNT(*) FROM content')->fetchColumn() > 0) return 0;
    $seed = json_decode((string) @file_get_contents(__DIR__ . '/seed.json'), true) ?: [];
    $n = 0;
    foreach (['update' => 'updates', 'event' => 'events', 'document' => 'documents'] as $type => $key) {
        foreach ($seed[$key] ?? [] as $record) { content_save($type, $record); $n++; }
    }
    return $n;
}

$error = '';
$done = null;
if (admin_exists()) {
    $done = 'already';
} elseif (method() === 'POST') {
    $key = (string) ($_POST['setup_key'] ?? '');
    $email = strtolower(trim((string) ($_POST['email'] ?? '')));
    $pass = (string) ($_POST['password'] ?? '');
    $configured = (string) cfg('setup_key', '');
    if ($configured === '' || str_starts_with($configured, 'replace-with') || !hash_equals($configured, $key)) {
        $error = 'Setup key is wrong (or still the sample value in config.php).';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Enter a valid email address.';
    } elseif (strlen($pass) < 10) {
        $error = 'Password must be at least 10 characters.';
    } elseif ($pass !== ($_POST['password2'] ?? '')) {
        $error = 'The two passwords do not match.';
    } else {
        create_tables();
        $imported = import_seed();
        db()->prepare('INSERT INTO admins (email, password_hash, created_at) VALUES (?, ?, ?)')
            ->execute([$email, password_hash($pass, PASSWORD_DEFAULT), now()]);
        $done = "Admin account created for $email. Imported $imported content items.";
    }
}
$h = fn ($s) => htmlspecialchars((string) $s, ENT_QUOTES);
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Jago Andhra — backend setup</title>
<style>
  body { font: 16px/1.5 system-ui, sans-serif; background: #f4f6fb; color: #062B63; margin: 0; padding: 40px 16px; }
  main { max-width: 440px; margin: 0 auto; background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(6,43,99,.1); }
  label { display: block; font-size: 13px; font-weight: 700; margin: 16px 0 6px; }
  input { width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #c9d3e6; border-radius: 10px; font: inherit; }
  button { margin-top: 22px; width: 100%; padding: 12px; border: 0; border-radius: 999px; background: #E7191F; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
  .err { background: #fdecec; color: #a40e12; padding: 10px 12px; border-radius: 10px; margin-top: 16px; }
  .ok { background: #e8f6ee; color: #0b6b35; padding: 12px; border-radius: 10px; }
  small { color: #5b6b86; }
</style>
</head>
<body>
<main>
  <h1 style="margin-top:0">Backend setup</h1>
  <?php if ($done === 'already'): ?>
    <p class="ok">Setup is complete — an admin account already exists.</p>
    <p><strong>Delete <code>setup.php</code> from the server now.</strong></p>
  <?php elseif ($done): ?>
    <p class="ok"><?= $h($done) ?></p>
    <p><strong>Delete <code>setup.php</code> from the server now</strong>, then sign in at <code>/admin</code> on the website.</p>
  <?php else: ?>
    <p><small>Creates the database tables, imports the current website content and creates the admin login. The password is stored only as a secure hash.</small></p>
    <?php if ($error): ?><p class="err"><?= $h($error) ?></p><?php endif; ?>
    <form method="post" autocomplete="off">
      <label for="k">Setup key (from config.php)</label>
      <input id="k" name="setup_key" type="password" required>
      <label for="e">Admin email</label>
      <input id="e" name="email" type="email" required value="<?= $h($_POST['email'] ?? '') ?>">
      <label for="p">Admin password <small>(at least 10 characters)</small></label>
      <input id="p" name="password" type="password" minlength="10" required autocomplete="new-password">
      <label for="p2">Confirm password</label>
      <input id="p2" name="password2" type="password" minlength="10" required autocomplete="new-password">
      <button type="submit">Create admin &amp; set up database</button>
    </form>
  <?php endif; ?>
</main>
</body>
</html>
