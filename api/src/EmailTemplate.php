<?php

declare(strict_types=1);

namespace HaramainPrestige;

final class EmailTemplate
{
    private const FR_MONTHS = [
        1 => 'janvier', 2 => 'février', 3 => 'mars', 4 => 'avril',
        5 => 'mai', 6 => 'juin', 7 => 'juillet', 8 => 'août',
        9 => 'septembre', 10 => 'octobre', 11 => 'novembre', 12 => 'décembre',
    ];

    public function __construct(
        private readonly string $whatsappFallback,
    ) {
    }

    public function subject(QuoteRequest $q): string
    {
        return sprintf(
            'Nouvelle demande — %s · %s',
            $q->name,
            $q->cityLabel,
        );
    }

    public function html(QuoteRequest $q, \DateTimeImmutable $receivedAt): string
    {
        $eb = fn (string $s) => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

        $dateStr = $this->frenchDate($receivedAt);
        $timeStr = $receivedAt->format('H\hi');

        $badges = '';
        foreach ($q->services as $service) {
            $badges .= '<span style="display:inline-block;padding:6px 12px;margin:0 6px 6px 0;border-radius:999px;background:#F0E4C7;color:#7A5A1E;font-size:12px;font-weight:700;font-family:Arial,Helvetica,sans-serif;letter-spacing:0.2px;">'
                . $eb($service) . '</span>';
        }

        $arrival = $q->arrival ? $this->frenchDate($q->arrival) : '—';
        $departure = $q->departure ? $this->frenchDate($q->departure) : '—';
        $nights = $q->nights();

        $hotelSection = '';
        if ($q->hasHotel()) {
            $rooms = $q->rooms !== '' ? $q->rooms : 'Non précisé';
            $category = ($q->category !== '' && $q->category !== 'Indifférent') ? $q->category : 'Indifférent';
            $budget = ($q->budget !== '' && $q->budget !== 'Indifférent') ? $q->budget : 'Indifférent';
            $kaabaRow = '';
            if ($q->kaabaView !== '' && $q->kaabaView !== 'Indifférent') {
                $kaabaRow = $this->fieldCell('VUE KAABA', $eb($q->kaabaView));
            }

            $hotelSection = $this->sectionOpen('2', 'Préférences hôtel') . <<<HTML
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                <tr>
                  {$this->fieldCell('CHAMBRES', $eb($rooms))}
                  {$this->fieldCell('CATÉGORIE', $eb($category))}
                  {$this->fieldCell('BUDGET / NUIT', $eb($budget))}
                </tr>
                {$this->rowIfNotEmpty($kaabaRow)}
              </table>
            HTML . $this->sectionClose();
        }

        $messageBlock = '';
        if ($q->message !== '') {
            $messageBlock = <<<HTML
            <tr>
              <td style="padding:0 32px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF4E4;border-left:3px solid #C9A24B;border-radius:8px;">
                  <tr><td style="padding:16px 18px;">
                    <div style="font-size:10px;letter-spacing:1.4px;font-weight:700;color:#8B7A4B;font-family:Arial,Helvetica,sans-serif;">DEMANDE PARTICULIÈRE</div>
                    <p style="margin:8px 0 0;font-style:italic;color:#3E362B;font-size:14px;line-height:1.55;font-family:Georgia,'Times New Roman',serif;">« {$eb($q->message)} »</p>
                  </td></tr>
                </table>
              </td>
            </tr>
            HTML;
        }

        $waNumber = $q->phoneIntl() !== '' ? $q->phoneIntl() : $this->whatsappFallback;
        $emailForButton = $q->email !== '' ? $q->email : '';
        $emailButton = $emailForButton !== ''
            ? '<a href="mailto:' . $eb($emailForButton) . '?subject=' . rawurlencode('Votre demande — Haramain Prestige') . '" style="display:block;text-align:center;padding:14px 18px;background:#E6C878;color:#14110E;text-decoration:none;font-weight:700;font-size:14px;border-radius:10px;font-family:Arial,Helvetica,sans-serif;">Répondre par email</a>'
            : '<div style="display:block;text-align:center;padding:14px 18px;background:#EFE7D6;color:#8B7A4B;font-weight:700;font-size:13px;border-radius:10px;font-family:Arial,Helvetica,sans-serif;">Email non renseigné</div>';

        return <<<HTML
        <!DOCTYPE html>
        <html lang="fr">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Nouvelle demande de proposition</title>
        </head>
        <body style="margin:0;padding:0;background:#F5EFE6;font-family:Arial,Helvetica,sans-serif;color:#14110E;-webkit-font-smoothing:antialiased;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:28px 12px;">
            <tr><td align="center">
              <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(20,17,14,0.08);">

                <tr>
                  <td style="background:#14110E;padding:28px 32px 26px;">
                    <div style="font-size:11px;letter-spacing:2.6px;font-weight:700;color:#E6C878;text-transform:uppercase;">Devis personnalisé</div>
                    <div style="margin-top:10px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.15;color:#FFFFFF;font-weight:600;">Nouvelle demande de proposition</div>
                    <div style="margin-top:10px;font-size:12.5px;color:rgba(245,239,230,0.55);">Reçue le {$eb($dateStr)} à {$eb($timeStr)} · via le formulaire du site</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px 32px 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="top" style="width:50%;padding-right:12px;">
                          <div style="font-size:10px;letter-spacing:1.4px;font-weight:700;color:#8B8378;">CLIENT</div>
                          <div style="margin-top:6px;font-size:20px;line-height:1.2;font-weight:600;font-family:Georgia,'Times New Roman',serif;color:#14110E;">{$eb($q->name)}</div>
                        </td>
                        <td valign="top" style="width:50%;padding-left:12px;">
                          <div style="font-size:10px;letter-spacing:1.4px;font-weight:700;color:#8B8378;">SERVICES DEMANDÉS</div>
                          <div style="margin-top:6px;">{$badges}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="padding:0 32px;"><div style="border-top:1px solid rgba(20,17,14,0.08);"></div></td></tr>

                {$this->sectionOpen('1', 'Votre séjour')}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                    <tr>
                      {$this->fieldCell('VILLE', $eb($q->cityLabel))}
                      {$this->fieldCell('VOYAGEURS', $eb($q->travelersLabel()))}
                    </tr>
                    <tr>
                      {$this->fieldCell("DATE D'ARRIVÉE", $eb($arrival))}
                      {$this->fieldCell('DATE DE DÉPART', $eb($departure) . ' <span style="color:#8B8378;font-weight:400;">(' . $nights . ' nuit' . ($nights > 1 ? 's' : '') . ')</span>')}
                    </tr>
                  </table>
                {$this->sectionClose()}

                {$hotelSection}

                <tr><td style="padding:0 32px;"><div style="border-top:1px solid rgba(20,17,14,0.08);"></div></td></tr>

                {$this->sectionOpen('3', 'Coordonnées')}
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
                    <tr>
                      {$this->fieldCell('WHATSAPP', '<span style="font-size:15px;">' . $eb($q->phoneDisplay()) . '</span>')}
                      {$this->fieldCell('EMAIL', $q->email !== '' ? '<a href="mailto:' . $eb($q->email) . '" style="color:#14110E;text-decoration:none;font-size:15px;">' . $eb($q->email) . '</a>' : '<span style="color:#8B8378;">Non renseigné</span>')}
                    </tr>
                  </table>
                {$this->sectionClose()}

                {$messageBlock}

                <tr>
                  <td style="padding:8px 32px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:50%;padding-right:6px;">
                          <a href="https://wa.me/{$eb($waNumber)}" style="display:block;text-align:center;padding:14px 18px;background:#14110E;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;border-radius:10px;font-family:Arial,Helvetica,sans-serif;">Répondre sur WhatsApp</a>
                        </td>
                        <td style="width:50%;padding-left:6px;">
                          {$emailButton}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div style="margin-top:14px;font-size:11px;color:#8B8378;font-family:Arial,Helvetica,sans-serif;">Haramain Prestige · Notification interne</div>
            </td></tr>
          </table>
        </body>
        </html>
        HTML;
    }

    public function plainText(QuoteRequest $q, \DateTimeImmutable $receivedAt): string
    {
        $lines = [];
        $lines[] = 'NOUVELLE DEMANDE DE PROPOSITION';
        $lines[] = 'Reçue le ' . $this->frenchDate($receivedAt) . ' à ' . $receivedAt->format('H:i');
        $lines[] = str_repeat('-', 42);
        $lines[] = 'Client   : ' . $q->name;
        $lines[] = 'WhatsApp : ' . $q->phoneDisplay();
        if ($q->email !== '') {
            $lines[] = 'Email    : ' . $q->email;
        }
        $lines[] = '';
        $lines[] = 'Services : ' . implode(', ', $q->services);
        $lines[] = 'Ville    : ' . $q->cityLabel;
        if ($q->arrival && $q->departure) {
            $lines[] = 'Séjour   : ' . $this->frenchDate($q->arrival) . ' → ' . $this->frenchDate($q->departure)
                . ' (' . $q->nights() . ' nuit' . ($q->nights() > 1 ? 's' : '') . ')';
        }
        $lines[] = 'Voyageurs: ' . $q->travelersLabel();

        if ($q->hasHotel()) {
            $lines[] = '';
            $lines[] = '-- Préférences hôtel --';
            if ($q->rooms !== '') $lines[] = 'Chambres  : ' . $q->rooms;
            if ($q->category !== '' && $q->category !== 'Indifférent') $lines[] = 'Catégorie : ' . $q->category;
            if ($q->kaabaView !== '' && $q->kaabaView !== 'Indifférent') $lines[] = 'Vue Kaaba : ' . $q->kaabaView;
            if ($q->budget !== '' && $q->budget !== 'Indifférent') $lines[] = 'Budget    : ' . $q->budget;
        }

        if ($q->message !== '') {
            $lines[] = '';
            $lines[] = '-- Demande particulière --';
            $lines[] = $q->message;
        }

        return implode("\n", $lines);
    }

    private function sectionOpen(string $badge, string $title): string
    {
        return <<<HTML
        <tr>
          <td style="padding:22px 32px 6px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:24px;">
                  <div style="width:24px;height:24px;border-radius:50%;background:#14110E;color:#E6C878;font-size:11px;font-weight:700;text-align:center;line-height:24px;font-family:Arial,Helvetica,sans-serif;">{$badge}</div>
                </td>
                <td style="padding-left:10px;font-weight:700;font-size:15px;color:#14110E;font-family:Arial,Helvetica,sans-serif;">{$title}</td>
              </tr>
            </table>
        HTML;
    }

    private function sectionClose(): string
    {
        return "\n          </td>\n        </tr>\n";
    }

    private function fieldCell(string $label, string $valueHtml): string
    {
        return <<<HTML
        <td valign="top" style="width:50%;padding:0 12px 14px 0;">
            <div style="font-size:10px;letter-spacing:1.4px;font-weight:700;color:#8B8378;font-family:Arial,Helvetica,sans-serif;">{$label}</div>
            <div style="margin-top:4px;font-size:14px;font-weight:600;color:#14110E;font-family:Arial,Helvetica,sans-serif;">{$valueHtml}</div>
        </td>
        HTML;
    }

    private function rowIfNotEmpty(string $cellHtml): string
    {
        return $cellHtml === '' ? '' : '<tr>' . $cellHtml . '<td></td></tr>';
    }

    private function frenchDate(\DateTimeImmutable $d): string
    {
        return $d->format('j') . ' ' . self::FR_MONTHS[(int) $d->format('n')] . ' ' . $d->format('Y');
    }
}
