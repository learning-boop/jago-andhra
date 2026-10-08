<?php
/** POST multipart `file` (PDF, max 20 MB) → { url, size }.  Save the document record afterwards via content.php. */
require __DIR__ . '/../lib/bootstrap.php';
allow('POST');
require_admin();

$f = $_FILES['file'] ?? null;
if (!$f || ($f['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) fail('Upload failed — check the file is under the server upload limit.');
if ($f['size'] > 20 * 1024 * 1024) fail('PDF must be 20 MB or smaller.');

// Must really be a PDF: check both the detected type and the file signature.
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
$head = (string) file_get_contents($f['tmp_name'], false, null, 0, 5);
if ($mime !== 'application/pdf' || $head !== '%PDF-') fail('Only PDF files can be uploaded.');

$base = strtolower(preg_replace('/[^A-Za-z0-9]+/', '-', pathinfo((string) $f['name'], PATHINFO_FILENAME)));
$base = trim(substr($base, 0, 60), '-') ?: 'document';
$name = bin2hex(random_bytes(8)) . '-' . $base . '.pdf';

if (!move_uploaded_file($f['tmp_name'], __DIR__ . '/../uploads/' . $name)) fail('Could not save the file on the server.', 500);

$mb = $f['size'] / (1024 * 1024);
json_out([
    'url' => rtrim((string) cfg('public_url'), '/') . '/uploads/' . $name,
    'size' => $mb < 0.1 ? '0.1 MB' : number_format($mb, 1) . ' MB',
], 201);
