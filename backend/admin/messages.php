<?php
/**
 * GET           → ContactMsg[] (newest first)
 * DELETE ?id=N  → { ok: true }
 */
require __DIR__ . '/../lib/bootstrap.php';
allow('GET', 'DELETE');
require_admin();

if (method() === 'DELETE') {
    db()->prepare('DELETE FROM contact_messages WHERE id = ?')->execute([(int) ($_GET['id'] ?? 0)]);
    json_out(['ok' => true]);
}

json_out(db()->query('SELECT id, name, email, phone, message, created_at AS createdAt FROM contact_messages ORDER BY id DESC')->fetchAll());
