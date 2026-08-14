<?php

declare(strict_types=1);

namespace HaramainPrestige;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

final class Mailer
{
    /** @param array<string,string> $env */
    public function __construct(private readonly array $env)
    {
    }

    /**
     * @throws \RuntimeException
     */
    public function send(
        string $subject,
        string $html,
        string $plainText,
        ?string $replyToEmail,
        ?string $replyToName,
    ): void {
        $mail = new PHPMailer(true);

        try {
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            $mail->isSMTP();
            $mail->Host = $this->env['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $this->env['SMTP_USER'];
            $mail->Password = $this->env['SMTP_PASS'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = (int) $this->env['SMTP_PORT'];
            $mail->Timeout = 15;

            if (!empty($this->env['SMTP_DEBUG'])) {
                $mail->SMTPDebug = 2;
                $mail->Debugoutput = static function (string $str, int $level): void {
                    error_log('[smtp] ' . trim($str));
                };
            }

            $mail->setFrom($this->env['SMTP_FROM'], $this->env['SMTP_FROM_NAME']);
            $mail->addAddress($this->env['MAIL_TO'], $this->env['MAIL_TO_NAME'] ?? '');

            if ($replyToEmail !== null && $replyToEmail !== '') {
                $mail->addReplyTo($replyToEmail, $replyToName ?? '');
            }

            $mail->Subject = $subject;
            $mail->isHTML(true);
            $mail->Body = $html;
            $mail->AltBody = $plainText;

            $mail->send();
        } catch (PHPMailerException $e) {
            throw new \RuntimeException('SMTP: ' . $mail->ErrorInfo, previous: $e);
        }
    }
}
