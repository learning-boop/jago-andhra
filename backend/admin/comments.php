<?php
/**
 * GET    ?status=pending|approved|rejected (optional) → Comment[] (newest first) + counts
 * PUT    ?id=N { status: 'approved'|'rejected'|'pending' } → { ok: true }
 * DELETE ?id=N → { ok: true }
 */
require __DIR__ . '/../lib/bootstrap.php';
allow('GET', 'PUT', 'DELETE');
require_admin();
$id = (int) ($_GET['id'] ?? 0);

if (method() === 'PUT') {
    $status = body()['status'] ?? '';
    if (!in_array($status, ['approved', 'rejected', 'pending'], true)) fail('Invalid status');
    db()->prepare('UPDATE comments SET status = ?, reviewed_at = ? WHERE id = ?')->execute([$status, $status === 'pending' ? null : now(), $id]);
    json_out(['ok' => true]);
}

if (method() === 'DELETE') {
    db()->prepare('DELETE FROM comments WHERE id = ?')->execute([$id]);
    json_out(['ok' => true]);
}

$counts = ['pending' => 0, 'approved' => 0, 'rejected' => 0];
foreach (db()->query('SELECT status, COUNT(*) AS n FROM comments GROUP BY status') as $r) $counts[$r['status']] = (int) $r['n'];

$status = $_GET['status'] ?? '';
$sql = 'SELECT id, name, district, question, message, status, created_at AS createdAt, reviewed_at AS reviewedAt FROM comments';
if (in_array($status, ['pending', 'approved', 'rejected'], true)) {
    $st = db()->prepare("$sql WHERE status = ? ORDER BY id DESC");
    $st->execute([$status]);
} else {
    $st = db()->query("$sql ORDER BY id DESC");
}
$rows = $st->fetchAll();
foreach ($rows as &$r) { $r['id'] = (int) $r['id']; $r['question'] = $r['question'] !== null ? (int) $r['question'] : null; }
json_out(['items' => $rows, 'counts' => $counts]);
