<?php
/** POST → { ok: true }  (invalidates the current token) */
require __DIR__ . '/../lib/bootstrap.php';
allow('POST');
db()->prepare('DELETE FROM admin_tokens WHERE token_hash = ?')->execute([hash('sha256', bearer_token())]);
json_out(['ok' => true]);
