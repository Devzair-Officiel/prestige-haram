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
            mkdir($this->storageDir, 0700, true);
        }
        $file = $this->storageDir . '/rl_' . hash('sha256', $key);
        $now = time();

        $hits = [];
        if (is_file($file)) {
            $raw = file_get_contents($file);
            if ($raw !== false) {
                $decoded = json_decode($raw, true);
                if (is_array($decoded)) {
                    $hits = $decoded;
                }
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
        file_put_contents($file, json_encode($hits), LOCK_EX);
        return true;
    }
}
