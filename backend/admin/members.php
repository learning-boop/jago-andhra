<?php
/**
 * GET           → Member[] (newest first)
 * DELETE ?id=N  → { ok: true }
 */
require __DIR__ . '/../lib/bootstrap.php';
allow('GET', 'DELETE');
require_admin();

if (method() === 'DELETE') {
    db()->prepare('DELETE FROM members WHERE id = ?')->execute([(int) ($_GET['id'] ?? 0)]);
    json_out(['ok' => true]);
}

$rows = db()->query('SELECT id, full_name AS fullName, mobile, email, age, profession, district, address, message, created_at AS createdAt FROM members ORDER BY id DESC')->fetchAll();
json_out($rows);
