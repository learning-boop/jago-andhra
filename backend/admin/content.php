<?php
/**
 * News posts, events and documents.  ?type=update|event|document
 * GET               → record[]
 * POST   {record}   → record      (create)
 * PUT    ?id=N {record} → record  (replace)
 * DELETE ?id=N      → { ok: true }  (also removes an uploaded PDF for documents)
 */
require __DIR__ . '/../lib/bootstrap.php';
allow('GET', 'POST', 'PUT', 'DELETE');
require_admin();

$type = $_GET['type'] ?? '';
if (!in_array($type, CONTENT_TYPES, true)) fail('Unknown content type');
$id = (int) ($_GET['id'] ?? 0);

if (method() === 'GET') json_out(content_list($type, $type === 'event' ? 'ASC' : 'DESC'));

if (method() === 'DELETE') {
    $existing = content_get($type, $id) ?? fail('Not found', 404);
    if ($type === 'document') delete_upload($existing['url'] ?? '');
    db()->prepare('DELETE FROM content WHERE id = ? AND type = ?')->execute([$id, $type]);
    json_out(['ok' => true]);
}

if (method() === 'PUT' && !content_get($type, $id)) fail('Not found', 404);

$record = validate($type, body());
$saved = content_save($type, $record, method() === 'PUT' ? $id : null);
json_out(content_get($type, $saved), method() === 'POST' ? 201 : 200);

/* ---------- helpers ---------- */

/** Links must be http(s) or site-relative — blocks javascript: and other unsafe URLs. */
function safe_url($url): string
{
    $url = trim((string) $url);
    return ($url === '' || preg_match('~^(https?://|/|#$)~i', $url)) ? $url : fail('Links must start with https:// or /');
}

function bilingual($v, int $max = 500): array
{
    $v = is_array($v) ? $v : [];
    return ['en' => clean($v['en'] ?? '', $max), 'te' => clean($v['te'] ?? '', $max)];
}

function slugify(string $s): string
{
    $s = strtolower(preg_replace('/[^A-Za-z0-9]+/', '-', $s));
    return trim($s, '-') ?: 'item-' . bin2hex(random_bytes(3));
}

function valid_date($d): string
{
    return preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $d) ? $d : fail('Enter a valid date.');
}

function validate(string $type, array $r): array
{
    $title = bilingual($r['title'] ?? [], 300);
    if ($title['en'] === '') fail('English title is required.');

    if ($type === 'update') {
        $body = $r['body'] ?? [];
        // Body: string (blank-line separated blocks) or array of blocks, per language.
        $bodyOut = [];
        foreach (['en', 'te'] as $l) {
            $v = $body[$l] ?? '';
            $bodyOut[$l] = is_array($v) ? array_map(fn ($b) => clean($b, 20000), $v) : clean($v, 100000);
        }
        $sources = [];
        foreach (($r['sources'] ?? []) as $s) {
            if (!empty($s['url'])) $sources[] = ['label' => bilingual($s['label'] ?? [], 300), 'url' => safe_url($s['url'])];
        }
        return [
            'slug' => slugify(($r['slug'] ?? '') ?: $title['en']),
            'categoryId' => clean($r['categoryId'] ?? 'news', 30),
            'date' => valid_date($r['date'] ?? ''),
            'title' => $title,
            'excerpt' => bilingual($r['excerpt'] ?? [], 1000),
            'image' => safe_url($r['image'] ?? ''),
            'imageAlt' => clean($r['imageAlt'] ?? '', 300),
            'body' => $bodyOut,
            'sources' => $sources,
        ];
    }

    if ($type === 'event') {
        return [
            'slug' => slugify(($r['slug'] ?? '') ?: $title['en'] . '-' . ($r['date'] ?? '')),
            'date' => valid_date($r['date'] ?? ''),
            'time' => clean($r['time'] ?? '', 20),
            'districtId' => clean($r['districtId'] ?? '', 60),
            'typeId' => clean($r['typeId'] ?? '', 60),
            'title' => $title,
            'venue' => bilingual($r['venue'] ?? [], 300),
            'address' => bilingual($r['address'] ?? [], 500),
            'mapsQuery' => clean($r['mapsQuery'] ?? '', 200),
            'description' => bilingual($r['description'] ?? [], 3000),
            'status' => in_array($r['status'] ?? '', ['upcoming', 'completed', 'cancelled'], true) ? $r['status'] : 'upcoming',
        ];
    }

    // document
    $url = safe_url($r['url'] ?? '');
    if ($url === '') fail('Upload a PDF or enter a link.');
    return [
        'categoryId' => clean($r['categoryId'] ?? 'notices', 30),
        'title' => $title,
        'date' => valid_date($r['date'] ?? ''),
        'description' => bilingual($r['description'] ?? [], 2000),
        'url' => $url,
        'size' => clean($r['size'] ?? '', 20),
        'official' => !empty($r['official']),
    ];
}

/** Deletes a PDF previously stored in uploads/ (ignores links elsewhere). */
function delete_upload(string $url): void
{
    $prefix = rtrim((string) cfg('public_url'), '/') . '/uploads/';
    if (strpos($url, $prefix) !== 0) return;
    $name = basename(substr($url, strlen($prefix)));
    $path = __DIR__ . '/../uploads/' . $name;
    if (preg_match('/^[a-f0-9]{16}-[a-z0-9-]+\.pdf$/', $name) && is_file($path)) unlink($path);
}
