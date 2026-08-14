<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use HaramainPrestige\ClientIp;
use HaramainPrestige\EmailTemplate;
use HaramainPrestige\Mailer;
use HaramainPrestige\QuoteRequest;
use HaramainPrestige\RateLimiter;

$env = loadEnv(__DIR__ . '/../.env');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = array_map('trim', explode(',', $env['ALLOWED_ORIGINS'] ?? ''));
if ($origin !== '' && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 600');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['error' => 'Method not allowed.']);
}

// Content-Type doit être application/json (avec ou sans charset).
$contentType = (string) ($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '');
$mime = trim(strtolower(explode(';', $contentType, 2)[0] ?? ''));
if ($mime !== 'application/json') {
    respond(415, ['error' => 'Content-Type must be application/json.']);
}

$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 20_000) {
    respond(413, ['error' => 'Payload too large.']);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['error' => 'JSON invalide.']);
}

if (!empty($data['website'])) {
    respond(200, ['success' => true]);
}

$ip = ClientIp::resolve($_SERVER, $env['TRUSTED_PROXIES'] ?? '');
$limiter = new RateLimiter(
    maxHits: (int) ($env['RATE_LIMIT_MAX'] ?? 5),
    windowSec: (int) ($env['RATE_LIMIT_WINDOW'] ?? 600),
    storageDir: sys_get_temp_dir() . '/haramain_rl',
);
if (!$limiter->allow($ip)) {
    respond(429, ['error' => 'Trop de tentatives, réessayez dans quelques minutes.']);
}

try {
    $quote = QuoteRequest::fromArray($data);
} catch (InvalidArgumentException $e) {
    respond(422, ['error' => $e->getMessage()]);
}

$template = new EmailTemplate(
    whatsappFallback: $env['WHATSAPP_FALLBACK'] ?? '',
);
$receivedAt = new DateTimeImmutable('now', new DateTimeZone('Europe/Paris'));

$subject = $template->subject($quote);
$html = $template->html($quote, $receivedAt);
$plain = $template->plainText($quote, $receivedAt);

try {
    (new Mailer($env))->send(
        subject: $subject,
        html: $html,
        plainText: $plain,
        replyToEmail: $quote->email !== '' ? $quote->email : null,
        replyToName: $quote->name,
    );
} catch (RuntimeException $e) {
    error_log('[send-quote] ' . $e->getMessage());
    respond(502, ['error' => "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp."]);
}

respond(200, ['success' => true]);


/**
 * @return array<string,string>
 */
function loadEnv(string $path): array
{
    $out = [];
    foreach (['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'SMTP_FROM_NAME',
              'MAIL_TO', 'MAIL_TO_NAME', 'ALLOWED_ORIGINS', 'RATE_LIMIT_MAX',
              'RATE_LIMIT_WINDOW', 'WHATSAPP_FALLBACK', 'SMTP_DEBUG',
              'TRUSTED_PROXIES'] as $k) {
        $v = getenv($k);
        if ($v !== false && $v !== '') {
            $out[$k] = $v;
        }
    }

    if (is_file($path)) {
        $dotenv = Dotenv\Dotenv::createImmutable(dirname($path));
        $vars = $dotenv->load();
        foreach ($vars as $k => $v) {
            if (!isset($out[$k]) || $out[$k] === '') {
                $out[$k] = (string) $v;
            }
        }
    }
    return $out;
}

/**
 * @param array<string,mixed> $body
 */
function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}
