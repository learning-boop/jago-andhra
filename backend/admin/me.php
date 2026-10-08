<?php
/** GET → { email }  (checks the token is still valid) */
require __DIR__ . '/../lib/bootstrap.php';
allow('GET');
$admin = require_admin();
json_out(['email' => $admin['email']]);
