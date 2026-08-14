<?php

declare(strict_types=1);

/**
 * Tests reproductibles pour ClientIp + RateLimiter.
 * Lancement : docker compose exec php php /var/www/html/tests/ClientIpTest.php
 */

require_once __DIR__ . '/../vendor/autoload.php';

use HaramainPrestige\ClientIp;
use HaramainPrestige\RateLimiter;

$failures = [];

function check(string $label, bool $condition, string $detail = ''): void
{
    global $failures;
    if ($condition) {
        echo "  \033[32mOK\033[0m   {$label}\n";
    } else {
        $failures[] = $label . ($detail !== '' ? ' — ' . $detail : '');
        echo "  \033[31mFAIL\033[0m {$label}" . ($detail !== '' ? ' — ' . $detail : '') . "\n";
    }
}

echo "\n=== ClientIp — X-Forwarded-For trust ===\n\n";

echo "-- Aucun proxy trusté (défaut) : XFF ignoré --\n";
check(
    'attaquant envoie XFF quand proxies trustés vide',
    ClientIp::resolve([
        'REMOTE_ADDR' => '203.0.113.7',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4',
    ], '') === '203.0.113.7',
);

check(
    'attaquant envoie XFF quand proxies trustés = ""',
    ClientIp::resolve([
        'REMOTE_ADDR' => '203.0.113.7',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4, 5.6.7.8',
    ], '') === '203.0.113.7',
);

echo "\n-- Proxy trusté par IP exacte --\n";
check(
    'connexion directe non-proxy → REMOTE_ADDR',
    ClientIp::resolve([
        'REMOTE_ADDR' => '203.0.113.7',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4',
    ], '127.0.0.1') === '203.0.113.7',
);

check(
    'via proxy 127.0.0.1 avec XFF → prend XFF',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4',
    ], '127.0.0.1') === '1.2.3.4',
);

check(
    'via proxy 127.0.0.1 sans XFF → REMOTE_ADDR',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
    ], '127.0.0.1') === '127.0.0.1',
);

echo "\n-- Proxy trusté par CIDR --\n";
check(
    'via 10.0.5.99 dans CIDR 10.0.0.0/8',
    ClientIp::resolve([
        'REMOTE_ADDR' => '10.0.5.99',
        'HTTP_X_FORWARDED_FOR' => '9.9.9.9',
    ], '10.0.0.0/8') === '9.9.9.9',
);

check(
    'via 11.0.0.1 hors CIDR 10.0.0.0/8',
    ClientIp::resolve([
        'REMOTE_ADDR' => '11.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '9.9.9.9',
    ], '10.0.0.0/8') === '11.0.0.1',
);

echo "\n-- Chaîne XFF avec plusieurs proxies --\n";
check(
    'chaîne "client, proxy2, proxy1" → prend client',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4, 10.0.0.1, 127.0.0.1',
    ], '127.0.0.1, 10.0.0.0/8') === '1.2.3.4',
);

check(
    'non-IP côté proxy (droite XFF) → fallback REMOTE_ADDR',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4, bogus',
    ], '127.0.0.1') === '127.0.0.1',
);

echo "\n-- Anti-spoofing (edge proxy en mode append) --\n";
// Scénario réel : le reverse proxy hôte fait
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for
// (comportement par défaut) → il APPEND la vraie IP client à ce que
// le client a envoyé. Un attaquant qui envoie "X-Forwarded-For: 1.2.3.4"
// ne doit PAS être vu comme 1.2.3.4 : sa vraie IP a été ajoutée juste
// après, et le parcours right-to-left doit la trouver en premier.
check(
    'attaquant injecte XFF à gauche, edge proxy append la vraie IP',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4, 203.0.113.55',
    ], '127.0.0.1') === '203.0.113.55',
);

check(
    'attaquant injecte plusieurs IP falsifiées à gauche',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '9.9.9.9, 8.8.8.8, 1.2.3.4, 203.0.113.55',
    ], '127.0.0.1') === '203.0.113.55',
);

check(
    'plusieurs proxies trustés successifs, client réel derrière',
    ClientIp::resolve([
        'REMOTE_ADDR' => '10.0.0.5',
        'HTTP_X_FORWARDED_FOR' => '203.0.113.55, 10.0.0.9',
    ], '10.0.0.0/8') === '203.0.113.55',
);

check(
    'toute la chaîne composée de proxies trustés → fallback REMOTE_ADDR',
    ClientIp::resolve([
        'REMOTE_ADDR' => '10.0.0.5',
        'HTTP_X_FORWARDED_FOR' => '10.0.0.9, 10.0.0.7',
    ], '10.0.0.0/8') === '10.0.0.5',
);

check(
    'non-IP juste avant REMOTE_ADDR trusté → fallback REMOTE_ADDR',
    ClientIp::resolve([
        'REMOTE_ADDR' => '10.0.0.5',
        'HTTP_X_FORWARDED_FOR' => '203.0.113.55, garbage',
    ], '10.0.0.0/8') === '10.0.0.5',
);

echo "\n-- CIDR IPv6 --\n";
check(
    'IPv6 CIDR fd00::/8 trusté',
    ClientIp::resolve([
        'REMOTE_ADDR' => 'fd12:3456:789a::1',
        'HTTP_X_FORWARDED_FOR' => '2001:db8::abcd',
    ], 'fd00::/8') === '2001:db8::abcd',
);

check(
    'IPv6 CIDR hors plage',
    ClientIp::resolve([
        'REMOTE_ADDR' => '2001:db8::1',
        'HTTP_X_FORWARDED_FOR' => '2001:db8::abcd',
    ], 'fd00::/8') === '2001:db8::1',
);

echo "\n-- IPv6 --\n";
check(
    'via ::1 trusté avec XFF v6',
    ClientIp::resolve([
        'REMOTE_ADDR' => '::1',
        'HTTP_X_FORWARDED_FOR' => '2001:db8::1',
    ], '::1') === '2001:db8::1',
);

check(
    'via ::1 non trusté',
    ClientIp::resolve([
        'REMOTE_ADDR' => '::1',
        'HTTP_X_FORWARDED_FOR' => '2001:db8::1',
    ], '') === '::1',
);

echo "\n-- Cas limites --\n";
check(
    'REMOTE_ADDR absent',
    ClientIp::resolve([
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4',
    ], '') === 'unknown',
);

check(
    'proxy list avec espaces',
    ClientIp::resolve([
        'REMOTE_ADDR' => '127.0.0.1',
        'HTTP_X_FORWARDED_FOR' => '1.2.3.4',
    ], ' 127.0.0.1 , ::1 ') === '1.2.3.4',
);

echo "\n=== RateLimiter — atomicité + fenêtre ===\n\n";

$tmpDir = sys_get_temp_dir() . '/haramain_rl_test_' . bin2hex(random_bytes(4));
$limiter = new RateLimiter(maxHits: 3, windowSec: 60, storageDir: $tmpDir);

$key = 'test-key-' . bin2hex(random_bytes(4));

check('hit 1 autorisé (max 3)', $limiter->allow($key));
check('hit 2 autorisé', $limiter->allow($key));
check('hit 3 autorisé', $limiter->allow($key));
check('hit 4 refusé (limite atteinte)', !$limiter->allow($key));
check('hit 5 refusé', !$limiter->allow($key));

// Nouvelle clé indépendante
$key2 = 'other-' . bin2hex(random_bytes(4));
check('clé différente non affectée', $limiter->allow($key2));

// Test de concurrence via forks (si pcntl dispo). Sinon test séquentiel rapide.
echo "\n-- Concurrence (10 requêtes rapides, limite = 5) --\n";
$concurrentDir = sys_get_temp_dir() . '/haramain_rl_test_conc_' . bin2hex(random_bytes(4));
$concurrentLimiter = new RateLimiter(maxHits: 5, windowSec: 60, storageDir: $concurrentDir);
$concurrentKey = 'conc-' . bin2hex(random_bytes(4));

if (function_exists('pcntl_fork')) {
    $resultsFile = tempnam(sys_get_temp_dir(), 'rl_res_');
    file_put_contents($resultsFile, '');

    $pids = [];
    for ($i = 0; $i < 10; $i++) {
        $pid = pcntl_fork();
        if ($pid === 0) {
            // Enfant
            $ok = $concurrentLimiter->allow($concurrentKey);
            file_put_contents($resultsFile, ($ok ? '1' : '0') . "\n", FILE_APPEND | LOCK_EX);
            exit(0);
        } elseif ($pid > 0) {
            $pids[] = $pid;
        }
    }
    foreach ($pids as $pid) {
        pcntl_waitpid($pid, $status);
    }

    $lines = array_filter(explode("\n", (string) file_get_contents($resultsFile)));
    $allowed = count(array_filter($lines, fn ($x) => $x === '1'));
    unlink($resultsFile);

    check(
        'exactement 5 allow=true sur 10 forks concurrents',
        $allowed === 5,
        "obtenu : {$allowed} allow=true (attendu 5)",
    );
} else {
    echo "  (pcntl non disponible, fallback séquentiel)\n";
    $allowed = 0;
    for ($i = 0; $i < 10; $i++) {
        if ($concurrentLimiter->allow($concurrentKey)) $allowed++;
    }
    check('exactement 5 allow=true sur 10 séquentiels', $allowed === 5, "obtenu : {$allowed}");
}

// Nettoyage
array_map('unlink', glob($tmpDir . '/*') ?: []);
@rmdir($tmpDir);
array_map('unlink', glob($concurrentDir . '/*') ?: []);
@rmdir($concurrentDir);

$failed = count($failures);
echo "\n=== Résultat : " . $failed . " FAIL ===\n";
if ($failed > 0) {
    foreach ($failures as $f) echo "  - {$f}\n";
    exit(1);
}
exit(0);
