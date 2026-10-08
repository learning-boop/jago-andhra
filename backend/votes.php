<?php
/**
 * GET  → { up, down }
 * POST { vote: 'up' | 'down' } → { up, down }   (one vote per visitor IP; voting again changes it)
 */
require __DIR__ . '/lib/bootstrap.php';
allow('GET', 'POST');

if (method() === 'POST') {
    $vote = body()['vote'] ?? '';
    if ($vote !== 'up' && $vote !== 'down') fail('Invalid vote');
    $ip = ip_hash();
    $st = db()->prepare('UPDATE votes SET vote = ?, created_at = ? WHERE ip_hash = ?');
    $st->execute([$vote, now(), $ip]);
    if ($st->rowCount() === 0) {
        try {
            db()->prepare('INSERT INTO votes (ip_hash, vote, created_at) VALUES (?, ?, ?)')->execute([$ip, $vote, now()]);
        } catch (PDOException $e) {
            // Same vote already recorded for this IP (no row changed above) — nothing to do.
        }
    }
}

$tally = ['up' => 0, 'down' => 0];
foreach (db()->query('SELECT vote, COUNT(*) AS n FROM votes GROUP BY vote') as $r) $tally[$r['vote']] = (int) $r['n'];
json_out($tally);
