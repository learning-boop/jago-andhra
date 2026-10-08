<?php
/** POST Member → { ok: true, id }  ("Join the Movement" form) */
require __DIR__ . '/lib/bootstrap.php';
allow('POST');

$b = body();
$name = clean($b['fullName'] ?? '', 190);
$mobile = preg_replace('/\s+/', '', (string) ($b['mobile'] ?? ''));
$email = clean($b['email'] ?? '', 190);
$age = filter_var($b['age'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 18, 'max_range' => 100]]);
$profession = clean($b['profession'] ?? '', 60);
$district = clean($b['district'] ?? '', 60);
$address = clean($b['address'] ?? '', 1000);
$message = clean($b['message'] ?? '', 2000);

if (mb_strlen($name) < 2) fail('Please enter your name.');
if (!preg_match('/^[6-9]\d{9}$/', $mobile)) fail('Enter a valid 10-digit Indian mobile number.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Enter a valid email address.');
if ($age === false) fail('Enter a valid age (18 or above).');
if ($profession === '' || $district === '') fail('Select your profession and district.');
if (mb_strlen($address) < 5) fail('Please enter your address.');
if (empty($b['consent'])) fail('Please agree to the privacy notice.');

db()->prepare('INSERT INTO members (full_name, mobile, email, age, profession, district, address, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    ->execute([$name, $mobile, $email, $age, $profession, $district, $address, $message, now()]);
json_out(['ok' => true, 'id' => (int) db()->lastInsertId()], 201);
