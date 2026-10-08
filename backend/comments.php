<?php
/**
 * GET  → approved comments [{ id, name, district, question, message, date }] (newest first)
 * POST { name, district?, question?, message, website? } → { ok: true, pending: true }
 *      New comments are hidden until an admin approves them. `website` is a honeypot (must be empty).
 *      Limit: 5 comments per visitor IP per hour.
 */
require __DIR__ . '/lib/bootstrap.php';
allow('GET', 'POST');

if (method() === 'GET') {
    $rows = db()->query("SELECT id, name, district, question, message, COALESCE(reviewed_at, created_at) AS date FROM comments WHERE status = 'approved' ORDER BY COALESCE(reviewed_at, created_at) DESC, id DESC LIMIT 200")->fetchAll();
    foreach ($rows as &$r) { $r['id'] = (int) $r['id']; $r['question'] = $r['question'] !== null ? (int) $r['question'] : null; }
    json_out($rows);
}

$b = body();
if (!empty($b['website'])) json_out(['ok' => true, 'pending' => true]); // bot filled the hidden field: pretend success

$name = clean($b['name'] ?? '', 120);
$district = clean($b['district'] ?? '', 60);
$message = clean($b['message'] ?? '', 1000);
$question = filter_var($b['question'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 15]]);

if (mb_strlen($name) < 2) fail('Please enter your name.');
if (mb_strlen($message) < 5) fail('Please write your comment.');

$ip = ip_hash();
$st = db()->prepare('SELECT COUNT(*) FROM comments WHERE ip_hash = ? AND created_at > ?');
$st->execute([$ip, gmdate('Y-m-d H:i:s', time() - 3600)]);
if ((int) $st->fetchColumn() >= 5) fail('You have sent several comments recently. Please try again later.', 429);

db()->prepare('INSERT INTO comments (name, district, question, message, status, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    ->execute([$name, $district ?: null, $question ?: null, $message, 'pending', $ip, now()]);
json_out(['ok' => true, 'pending' => true], 201);
