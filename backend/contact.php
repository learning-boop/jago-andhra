<?php
/** POST { name, email, phone?, message } → { ok: true, id } */
require __DIR__ . '/lib/bootstrap.php';
allow('POST');

$b = body();
$name = clean($b['name'] ?? '', 190);
$email = clean($b['email'] ?? '', 190);
$phone = clean($b['phone'] ?? '', 30);
$message = clean($b['message'] ?? '', 5000);

if (mb_strlen($name) < 2) fail('Please enter your name.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Enter a valid email address.');
if (mb_strlen($message) < 5) fail('Please enter a message.');

db()->prepare('INSERT INTO contact_messages (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?)')
    ->execute([$name, $email, $phone, $message, now()]);
json_out(['ok' => true, 'id' => (int) db()->lastInsertId()], 201);
