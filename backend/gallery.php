<?php
/** GET → GalleryItem[] (newest uploads first; photos added together keep their order) */
require __DIR__ . '/lib/bootstrap.php';
allow('GET');
$rows = db()->query("SELECT id, data FROM content WHERE type = 'photo' ORDER BY sort_date DESC, id ASC")->fetchAll();
json_out(array_map(fn ($r) => ['id' => (int) $r['id']] + (json_decode($r['data'], true) ?: []), $rows));
