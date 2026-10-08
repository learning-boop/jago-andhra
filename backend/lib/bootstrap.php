<?php
/**
 * Shared setup for every endpoint: config, database, CORS, JSON helpers and admin auth.
 */
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');

$configFile = __DIR__ . '/../config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Server not configured: copy config.sample.php to config.php']);
    exit;
}
$GLOBALS['CONFIG'] = require $configFile;

function cfg(string $key, $default = null)
{
    return $GLOBALS['CONFIG'][$key] ?? $default;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(cfg('db_dsn'), cfg('db_user'), cfg('db_pass'), [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
    return $pdo;
}

function now(): string
{
    return gmdate('Y-m-d H:i:s');
}

function json_out($data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $code = 400): void
{
    json_out(['error' => $message], $code);
}

/** Decoded JSON request body (empty array when missing or invalid). */
function body(): array
{
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    return is_array($data) ? $data : [];
}

function method(): string
{
    return $_SERVER['REQUEST_METHOD'] ?? 'GET';
}

function allow(string ...$methods): void
{
    if (!in_array(method(), $methods, true)) fail('Method not allowed', 405);
}

/** Visitor IP, hashed with the server secret so raw IPs are never stored. */
function ip_hash(): string
{
    return hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? '', (string) cfg('secret'));
}

function clean(?string $s, int $max = 2000): string
{
    return mb_substr(trim((string) $s), 0, $max);
}

/* ---------- CORS ---------- */

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, cfg('allowed_origins', []), true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 600');
}
if (method() === 'OPTIONS') {
    http_response_code(204);
    exit;
}

set_exception_handler(function (Throwable $e) {
    error_log('[jago-andhra] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    json_out(['error' => 'Server error'], 500);
});

/* ---------- Admin auth ---------- */

function bearer_token(): string
{
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!$h && function_exists('apache_request_headers')) {
        $headers = array_change_key_case(apache_request_headers(), CASE_LOWER);
        $h = $headers['authorization'] ?? '';
    }
    return preg_match('/^Bearer\s+([a-f0-9]{64})$/i', trim($h), $m) ? strtolower($m[1]) : '';
}

/** Ends the request with 401 unless a valid admin token is sent. Returns the admin row. */
function require_admin(): array
{
    $token = bearer_token();
    if ($token) {
        $st = db()->prepare('SELECT a.id, a.email FROM admin_tokens t JOIN admins a ON a.id = t.admin_id WHERE t.token_hash = ? AND t.expires_at > ?');
        $st->execute([hash('sha256', $token), now()]);
        if ($admin = $st->fetch()) return $admin;
    }
    fail('Not signed in', 401);
}

/* ---------- Content (news, events, documents) ---------- */

const CONTENT_TYPES = ['update', 'event', 'document', 'photo'];

function content_list(string $type, string $order = 'DESC'): array
{
    $st = db()->prepare("SELECT id, data FROM content WHERE type = ? ORDER BY sort_date $order, id $order");
    $st->execute([$type]);
    return array_map(fn ($r) => ['id' => (int) $r['id']] + (json_decode($r['data'], true) ?: []), $st->fetchAll());
}

function content_get(string $type, int $id): ?array
{
    $st = db()->prepare('SELECT id, data FROM content WHERE type = ? AND id = ?');
    $st->execute([$type, $id]);
    $r = $st->fetch();
    return $r ? ['id' => (int) $r['id']] + (json_decode($r['data'], true) ?: []) : null;
}

function content_save(string $type, array $record, ?int $id = null): int
{
    unset($record['id']);
    $date = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) ($record['date'] ?? '')) ? $record['date'] : gmdate('Y-m-d');
    $json = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($id) {
        db()->prepare('UPDATE content SET sort_date = ?, data = ?, updated_at = ? WHERE id = ? AND type = ?')
            ->execute([$date, $json, now(), $id, $type]);
        return $id;
    }
    db()->prepare('INSERT INTO content (type, sort_date, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)')
        ->execute([$type, $date, $json, now(), now()]);
    return (int) db()->lastInsertId();
}
