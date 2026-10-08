<?php
/**
 * Copy this file to config.php on your server and fill in the values.
 * config.php is git-ignored and blocked from web access by .htaccess — never commit it.
 */
return [
    // MySQL connection (from your hosting control panel)
    'db_dsn'  => 'mysql:host=localhost;dbname=jago_andhra;charset=utf8mb4',
    'db_user' => 'jago_user',
    'db_pass' => 'change-me',

    // Website origins allowed to call this API (your Vercel / custom domains).
    'allowed_origins' => [
        'https://jagoandhra.org',
        'https://www.jagoandhra.org',
    ],

    // Long random string used to hash visitor IPs (votes, login rate limit).
    // Generate one at https://www.random.org/strings/ or with: php -r "echo bin2hex(random_bytes(32));"
    'secret' => 'replace-with-a-long-random-string',

    // One-time key needed to open setup.php. Choose any long value, use it once, then delete setup.php.
    'setup_key' => 'replace-with-another-long-random-string',

    // Public URL of this backend folder, used for uploaded document links.
    'public_url' => 'https://api.jagoandhra.org',

    // Admin login lifetime in hours.
    'token_hours' => 12,
];
