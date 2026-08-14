<?php

declare(strict_types=1);

namespace HaramainPrestige;

final class RateLimiter
{
    public function __construct(
        private readonly int $maxHits,
        private readonly int $windowSec,
        private readonly string $storageDir,
    ) {
    }

    public function allow(string $key): bool
    {
        if (!is_dir($this->storageDir)) {
            @mkdir($this->storageDir, 0700, true);
        }
        $file = $this->storageDir . '/rl_' . hash('sha256', $key);
        $now = time();

        // Ouvre / crée le fichier et verrouille l'ensemble
        // lecture → nettoyage → décision → écriture sous le même flock exclusif.
        $fh = @fopen($file, 'c+');
        if ($fh === false) {
            // En cas d'impossibilité d'ouvrir/verrouiller, on ne bloque pas
            // silencieusement l'utilisateur légitime (fail-open) mais on log.
            error_log('[rate-limiter] impossible d\'ouvrir ' . $file);
            return true;
        }

        try {
            if (!flock($fh, LOCK_EX)) {
                error_log('[rate-limiter] flock LOCK_EX échoué sur ' . $file);
                return true;
            }

            rewind($fh);
            $raw = stream_get_contents($fh);
            $hits = [];
            if (is_string($raw) && $raw !== '') {
                $decoded = json_decode($raw, true);
                if (is_array($decoded)) {
                    $hits = $decoded;
                }
            }

            $hits = array_values(array_filter(
                $hits,
                fn ($t) => is_int($t) && $t > $now - $this->windowSec,
            ));

            if (count($hits) >= $this->maxHits) {
                return false;
            }

            $hits[] = $now;
            $encoded = json_encode($hits);
            if ($encoded === false) {
                return true;
            }

            rewind($fh);
            ftruncate($fh, 0);
            fwrite($fh, $encoded);
            fflush($fh);
            return true;
        } finally {
            flock($fh, LOCK_UN);
            fclose($fh);
        }
    }
}
