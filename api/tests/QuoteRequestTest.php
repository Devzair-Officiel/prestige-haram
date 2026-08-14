<?php

declare(strict_types=1);

/**
 * Tests reproductibles pour QuoteRequest — sans dépendance PHPUnit.
 * Lancement :
 *   docker compose exec php php /var/www/html/tests/QuoteRequestTest.php
 * ou :
 *   php api/tests/QuoteRequestTest.php   (depuis la racine du projet)
 */

require_once __DIR__ . '/../vendor/autoload.php';

use HaramainPrestige\QuoteRequest;

$tests = [];
$failures = [];

function baseData(array $overrides = []): array
{
    return array_merge([
        'name' => 'Test User',
        'countryCode' => '+33',
        'phone' => '612345678',
        'email' => 'test@example.com',
        'city' => 'makkah',
        'arrival' => '2026-04-01',
        'departure' => '2026-04-08',
        'adults' => 2,
        'children' => 0,
        'services' => ['hotel'],
        'rooms' => '1',
        'category' => '4*',
        'kaabaView' => 'Indifférent',
        'budget' => 'Indifférent',
        'message' => '',
    ], $overrides);
}

function assertOk(string $label, callable $fn): void
{
    global $tests, $failures;
    $tests[] = $label;
    try {
        $fn();
        echo "  \033[32mOK\033[0m   {$label}\n";
    } catch (Throwable $e) {
        $failures[] = $label . ' — ' . $e->getMessage();
        echo "  \033[31mFAIL\033[0m {$label} — " . $e->getMessage() . "\n";
    }
}

function assertThrows(string $label, callable $fn, string $expectedSubstr = ''): void
{
    global $tests, $failures;
    $tests[] = $label;
    try {
        $fn();
        $failures[] = $label . ' — attendu InvalidArgumentException, aucune exception levée';
        echo "  \033[31mFAIL\033[0m {$label} — aucune exception levée\n";
    } catch (InvalidArgumentException $e) {
        if ($expectedSubstr !== '' && !str_contains($e->getMessage(), $expectedSubstr)) {
            $failures[] = $label . ' — message inattendu : ' . $e->getMessage();
            echo "  \033[31mFAIL\033[0m {$label} — message : " . $e->getMessage() . "\n";
        } else {
            echo "  \033[32mOK\033[0m   {$label} — rejeté (« " . $e->getMessage() . " »)\n";
        }
    } catch (Throwable $e) {
        $failures[] = $label . ' — type d\'exception inattendu : ' . get_class($e);
        echo "  \033[31mFAIL\033[0m {$label} — exception : " . get_class($e) . "\n";
    }
}

echo "\n=== QuoteRequest — tests ===\n\n";

echo "-- Dates --\n";
assertOk('date valide', function () {
    $q = QuoteRequest::fromArray(baseData());
    if ($q->arrival === null || $q->arrival->format('Y-m-d') !== '2026-04-01') {
        throw new RuntimeException('arrivée mal parsée');
    }
});

assertThrows('date impossible 2026-02-30', function () {
    QuoteRequest::fromArray(baseData(['arrival' => '2026-02-30']));
}, 'arrivée');

assertThrows('date impossible 2026-13-01', function () {
    QuoteRequest::fromArray(baseData(['arrival' => '2026-13-01']));
}, 'arrivée');

assertThrows('date impossible 2025-04-31', function () {
    QuoteRequest::fromArray(baseData(['departure' => '2025-04-31']));
}, 'départ');

assertThrows('date format invalide', function () {
    QuoteRequest::fromArray(baseData(['arrival' => '01/04/2026']));
}, 'arrivée');

assertThrows('départ avant arrivée', function () {
    QuoteRequest::fromArray(baseData([
        'arrival' => '2026-05-10',
        'departure' => '2026-05-01',
    ]));
}, 'postérieure');

assertOk('départ = arrivée (0 nuit) autorisé', function () {
    $q = QuoteRequest::fromArray(baseData([
        'arrival' => '2026-05-10',
        'departure' => '2026-05-10',
    ]));
    if ($q->nights() !== 0) {
        throw new RuntimeException('nights doit être 0');
    }
});

echo "\n-- Email --\n";
assertThrows('email invalide', function () {
    QuoteRequest::fromArray(baseData(['email' => 'pas-un-email']));
}, 'email');

assertOk('email vide accepté (WhatsApp obligatoire, pas email)', function () {
    $q = QuoteRequest::fromArray(baseData(['email' => '']));
    if ($q->email !== '') {
        throw new RuntimeException('email doit être vide');
    }
});

echo "\n-- Services --\n";
assertThrows('services vides', function () {
    QuoteRequest::fromArray(baseData(['services' => []]));
}, 'service');

assertThrows('services non-array', function () {
    QuoteRequest::fromArray(baseData(['services' => 'hotel']));
}, 'service');

assertThrows('services entièrement inconnus', function () {
    QuoteRequest::fromArray(baseData(['services' => ['spa', 'gym']]));
}, 'valide');

assertOk('services mixte : valides gardés, inconnus filtrés', function () {
    $q = QuoteRequest::fromArray(baseData(['services' => ['hotel', 'spa', 'transfer']]));
    if (count($q->services) !== 2) {
        throw new RuntimeException('doit garder 2 services valides, a : ' . count($q->services));
    }
});

echo "\n-- Adultes / enfants (limites) --\n";
assertOk('adults=1 (min)', function () {
    $q = QuoteRequest::fromArray(baseData(['adults' => 1]));
    if ($q->adults !== 1) throw new RuntimeException('adults != 1');
});

assertOk('adults=20 (max)', function () {
    $q = QuoteRequest::fromArray(baseData(['adults' => 20]));
    if ($q->adults !== 20) throw new RuntimeException('adults != 20');
});

assertOk('adults=0 forcé à 1 (borne min)', function () {
    $q = QuoteRequest::fromArray(baseData(['adults' => 0]));
    if ($q->adults !== 1) throw new RuntimeException('adults doit être borné à 1, a : ' . $q->adults);
});

assertOk('adults=999 borné à 20', function () {
    $q = QuoteRequest::fromArray(baseData(['adults' => 999]));
    if ($q->adults !== 20) throw new RuntimeException('adults doit être borné à 20, a : ' . $q->adults);
});

assertOk('children=0 (min)', function () {
    $q = QuoteRequest::fromArray(baseData(['children' => 0]));
    if ($q->children !== 0) throw new RuntimeException('children != 0');
});

assertOk('children=-5 borné à 0', function () {
    $q = QuoteRequest::fromArray(baseData(['children' => -5]));
    if ($q->children !== 0) throw new RuntimeException('children doit être borné à 0, a : ' . $q->children);
});

assertOk('children=999 borné à 20', function () {
    $q = QuoteRequest::fromArray(baseData(['children' => 999]));
    if ($q->children !== 20) throw new RuntimeException('children doit être borné à 20');
});

echo "\n-- Champs obligatoires --\n";
assertThrows('nom vide', function () {
    QuoteRequest::fromArray(baseData(['name' => '']));
}, 'nom');

assertThrows('téléphone vide', function () {
    QuoteRequest::fromArray(baseData(['phone' => '']));
}, 'WhatsApp');

assertThrows('ville invalide', function () {
    QuoteRequest::fromArray(baseData(['city' => 'paris']));
}, 'ville');

assertOk('ville "both" acceptée', function () {
    $q = QuoteRequest::fromArray(baseData(['city' => 'both']));
    if ($q->cityKey !== 'both') throw new RuntimeException('cityKey mauvaise');
});

echo "\n-- Nettoyage caractères de contrôle --\n";
assertOk('null byte (\\x00) strippé du name', function () {
    $q = QuoteRequest::fromArray(baseData(['name' => "Test\x00Bad"]));
    if (str_contains($q->name, "\x00")) {
        throw new RuntimeException('null byte non strippé');
    }
});

assertOk('caractères non-imprimables (\\x01-\\x08, \\x0B, \\x0C, \\x0E-\\x1F, \\x7F) strippés', function () {
    $q = QuoteRequest::fromArray(baseData(['name' => "A\x01B\x08C\x0BD\x1FE\x7FF"]));
    if ($q->name !== 'ABCDEF') {
        throw new RuntimeException('nettoyage incomplet, obtenu : ' . bin2hex($q->name));
    }
});

// Note : \t \r \n sont volontairement CONSERVÉS pour supporter le champ
// "message" multi-ligne. Les headers d'email sont sanitizés en aval par
// PHPMailer::secureHeader(), donc pas de risque d'injection SMTP.
assertOk('TAB / CR / LF conservés (pour message multi-ligne)', function () {
    $q = QuoteRequest::fromArray(baseData(['message' => "ligne 1\nligne 2\tavec tab\r\nligne 3"]));
    if (!str_contains($q->message, "\n")) {
        throw new RuntimeException('LF strippé à tort');
    }
});

$total = count($tests);
$failed = count($failures);
$passed = $total - $failed;

echo "\n=== Résultat : {$passed}/{$total} OK, {$failed} FAIL ===\n";

if ($failed > 0) {
    echo "\nÉchecs :\n";
    foreach ($failures as $f) {
        echo "  - {$f}\n";
    }
    exit(1);
}

exit(0);
