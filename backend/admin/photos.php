<?php
/**
 * POST multipart: files[] (JPEG / PNG / WebP, max 15 MB each), categoryId, caption_en, caption_te
 * → { created: GalleryItem[], errors: string[] }
 * Each photo is rotated upright (phone EXIF), resized to max 1600 px plus a 640 px thumbnail,
 * saved as WebP in uploads/gallery/ and added to the gallery.
 */
require __DIR__ . '/../lib/bootstrap.php';
allow('POST');
require_admin();
ini_set('memory_limit', '512M');
set_time_limit(300);

$files = $_FILES['files'] ?? null;
if (!$files || !is_array($files['name'])) fail('Choose one or more photos.');

$category = in_array($_POST['categoryId'] ?? '', ['meetings', 'press', 'history'], true) ? $_POST['categoryId'] : 'meetings';
$caption = ['en' => clean($_POST['caption_en'] ?? '', 300), 'te' => clean($_POST['caption_te'] ?? '', 300)];

$dir = __DIR__ . '/../uploads/gallery';
if (!is_dir($dir) && !mkdir($dir, 0755, true)) fail('Could not create the uploads/gallery folder.', 500);
$publicBase = rtrim((string) cfg('public_url'), '/') . '/uploads/gallery/';

$created = [];
$errors = [];
foreach ($files['name'] as $i => $origName) {
    $label = basename((string) $origName);
    if ($files['error'][$i] !== UPLOAD_ERR_OK) { $errors[] = "$label: upload failed (file may be too large for the server)."; continue; }
    if ($files['size'][$i] > 15 * 1024 * 1024) { $errors[] = "$label: larger than 15 MB."; continue; }

    $tmp = $files['tmp_name'][$i];
    $info = @getimagesize($tmp);
    $type = $info[2] ?? null;
    if (!in_array($type, [IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_WEBP], true)) { $errors[] = "$label: only JPEG, PNG or WebP photos are allowed."; continue; }
    if ($info[0] * $info[1] > 50_000_000) { $errors[] = "$label: image is too large (over 50 megapixels)."; continue; }

    $img = match ($type) {
        IMAGETYPE_JPEG => @imagecreatefromjpeg($tmp),
        IMAGETYPE_PNG => @imagecreatefrompng($tmp),
        IMAGETYPE_WEBP => @imagecreatefromwebp($tmp),
    };
    if (!$img) { $errors[] = "$label: could not read the image."; continue; }
    if ($type === IMAGETYPE_JPEG) $img = upright($img, $tmp);

    $name = bin2hex(random_bytes(8));
    [$full, $fw, $fh] = resized($img, 1600, 1600);
    [$thumb] = resized($img, 640, 960);
    $ok = imagewebp($full, "$dir/$name.webp", 80) && imagewebp($thumb, "$dir/$name-thumb.webp", 72);
    imagedestroy($img); imagedestroy($full); imagedestroy($thumb);
    if (!$ok) { $errors[] = "$label: could not save the image."; continue; }

    $altBase = ['meetings' => 'Photo from a campaign meeting', 'press' => 'Newspaper clipping about the campaign', 'history' => 'Historical photograph from the Jai Andhra movement'][$category];
    $id = content_save('photo', [
        'categoryId' => $category,
        'src' => $publicBase . "$name.webp",
        'thumb' => $publicBase . "$name-thumb.webp",
        'w' => $fw,
        'h' => $fh,
        'alt' => $caption['en'] ?: $altBase,
        'caption' => $caption,
        'date' => gmdate('Y-m-d'),
    ]);
    $created[] = content_get('photo', $id);
}

json_out(['created' => $created, 'errors' => $errors], $created ? 201 : 400);

/** Rotates a JPEG according to its EXIF orientation (phone photos). */
function upright($img, string $path)
{
    $o = function_exists('exif_read_data') ? (@exif_read_data($path)['Orientation'] ?? 1) : 1;
    $angle = [3 => 180, 6 => -90, 8 => 90][$o] ?? 0;
    if (!$angle) return $img;
    $rotated = imagerotate($img, $angle, 0);
    imagedestroy($img);
    return $rotated;
}

/** Returns [image, width, height] scaled down to fit max W×H (never upscaled). */
function resized($img, int $maxW, int $maxH): array
{
    $w = imagesx($img); $h = imagesy($img);
    $scale = min(1, $maxW / $w, $maxH / $h);
    $nw = max(1, (int) round($w * $scale)); $nh = max(1, (int) round($h * $scale));
    $out = imagecreatetruecolor($nw, $nh);
    imagefill($out, 0, 0, imagecolorallocate($out, 255, 255, 255)); // transparent PNGs → white
    imagecopyresampled($out, $img, 0, 0, 0, 0, $nw, $nh, $w, $h);
    return [$out, $nw, $nh];
}
