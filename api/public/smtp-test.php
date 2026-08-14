<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: text/plain; charset=utf-8');

if (is_file(__DIR__ . '/../.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->safeLoad();
}

$host = getenv('SMTP_HOST') ?: '(missing)';
$port = getenv('SMTP_PORT') ?: '(missing)';
$user = getenv('SMTP_USER') ?: '(missing)';
$passRaw = getenv('SMTP_PASS') ?: '';
$passMasked = $passRaw === ''
    ? '(missing)'
    : sprintf('%s… (%d chars)', substr($passRaw, 0, 2), strlen($passRaw));

echo "=== ENV CHECK ===\n";
echo "SMTP_HOST = {$host}\n";
echo "SMTP_PORT = {$port}\n";
echo "SMTP_USER = {$user}\n";
echo "SMTP_PASS = {$passMasked}\n";
echo "SMTP_FROM = " . (getenv('SMTP_FROM') ?: '(missing)') . "\n";
echo "MAIL_TO   = " . (getenv('MAIL_TO') ?: '(missing)') . "\n";
echo "\n=== SMTP DIALOGUE ===\n";

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 3;
    $mail->Debugoutput = static function (string $str, int $level): void {
        echo trim($str) . "\n";
        @ob_flush();
        @flush();
    };

    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = $host;
    $mail->SMTPAuth = true;
    $mail->Username = $user;
    $mail->Password = $passRaw;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int) $port;
    $mail->Timeout = 20;

    $mail->setFrom(getenv('SMTP_FROM') ?: $user, 'Test');
    $mail->addAddress(getenv('MAIL_TO') ?: $user);
    $mail->Subject = 'SMTP test ' . date('c');
    $mail->Body = 'Ceci est un test SMTP direct depuis smtp-test.php';

    $mail->send();
    echo "\n=== RESULT ===\nOK — email envoyé\n";
} catch (PHPMailerException $e) {
    echo "\n=== RESULT ===\nÉCHEC — " . $mail->ErrorInfo . "\n";
    echo "Exception: " . $e->getMessage() . "\n";
}
