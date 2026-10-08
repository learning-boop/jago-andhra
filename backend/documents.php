<?php
/** GET → Document[] (official documents first, then newest first) */
require __DIR__ . '/lib/bootstrap.php';
allow('GET');
$docs = content_list('document');
usort($docs, fn ($a, $b) => (int) !empty($b['official']) <=> (int) !empty($a['official']) ?: strcmp($b['date'] ?? '', $a['date'] ?? ''));
json_out($docs);
