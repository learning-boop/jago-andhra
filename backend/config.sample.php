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

    // Website origins allowed to call this API from ANOTHER domain (e.g. a Vercel site).
    // Not needed when the website and this backend are on the same domain (cPanel: public_html + public_html/api).
    'allowed_origins' => [
        'https://jagoandhra.com',
        'https://www.jagoandhra.com',
    ],

    // Long random string used to hash visitor IPs (votes, login rate limit).
    // Generate one at https://www.random.org/strings/ or with: php -r "echo bin2hex(random_bytes(32));"
    'secret' => 'replace-with-a-long-random-string',

    // One-time key needed to open setup.php. Choose any long value, use it once, then delete setup.php.
    'setup_key' => 'replace-with-another-long-random-string',

    // Public URL of this backend folder, used for uploaded PDF and photo links.
    // Same domain (cPanel, backend in public_html/api): '/api'. Separate domain: 'https://api.jagoandhra.com'.
    'public_url' => '/api',

    // Admin login lifetime in hours.
    'token_hours' => 12,
];
