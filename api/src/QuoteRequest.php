<?php

declare(strict_types=1);

namespace HaramainPrestige;

final class QuoteRequest
{
    private const CITY_LABELS = [
        'makkah' => 'Makkah',
        'madinah' => 'Madinah',
        'both' => 'Makkah & Madinah',
    ];

    private const ALLOWED_SERVICES = [
        'hotel' => 'Hôtel',
        'transfer' => 'Transfert aéroport',
        'driver' => 'Chauffeur / déplacements',
        'visit' => 'Visites & accompagnement',
    ];

    /** @param string[] $services */
    private function __construct(
        public readonly string $name,
        public readonly string $countryCode,
        public readonly string $phone,
        public readonly string $email,
        public readonly string $cityKey,
        public readonly string $cityLabel,
        public readonly ?\DateTimeImmutable $arrival,
        public readonly ?\DateTimeImmutable $departure,
        public readonly int $adults,
        public readonly int $children,
        public readonly array $services,
        public readonly string $rooms,
        public readonly string $category,
        public readonly string $kaabaView,
        public readonly string $budget,
        public readonly string $message,
    ) {
    }

    /**
     * @param array<string,mixed> $data
     * @throws \InvalidArgumentException
     */
    public static function fromArray(array $data): self
    {
        $name = self::str($data, 'name', 120);
        if ($name === '') {
            throw new \InvalidArgumentException('Le nom est obligatoire.');
        }

        $phone = self::str($data, 'phone', 30);
        if ($phone === '') {
            throw new \InvalidArgumentException('Le numéro WhatsApp est obligatoire.');
        }

        $email = self::str($data, 'email', 190);
        if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("L'email n'est pas valide.");
        }

        $cityKey = strtolower(self::str($data, 'city', 20));
        if (!isset(self::CITY_LABELS[$cityKey])) {
            throw new \InvalidArgumentException('La ville est obligatoire.');
        }

        $arrival = self::date($data, 'arrival');
        $departure = self::date($data, 'departure');
        if ($arrival === null) {
            throw new \InvalidArgumentException("La date d'arrivée est obligatoire.");
        }
        if ($departure === null) {
            throw new \InvalidArgumentException('La date de départ est obligatoire.');
        }
        if ($departure < $arrival) {
            throw new \InvalidArgumentException('La date de départ doit être postérieure à la date d\'arrivée.');
        }

        $servicesIn = $data['services'] ?? [];
        if (!is_array($servicesIn) || $servicesIn === []) {
            throw new \InvalidArgumentException('Sélectionnez au moins un service.');
        }
        $services = [];
        foreach ($servicesIn as $s) {
            $key = strtolower((string) $s);
            if (isset(self::ALLOWED_SERVICES[$key])) {
                $services[] = self::ALLOWED_SERVICES[$key];
            }
        }
        if ($services === []) {
            throw new \InvalidArgumentException('Aucun service valide n\'a été sélectionné.');
        }

        $countryCode = self::str($data, 'countryCode', 12);
        if ($countryCode === '') {
            $countryCode = '+33';
        }

        $adults = self::intBetween($data, 'adults', 1, 20, 1);
        $children = self::intBetween($data, 'children', 0, 20, 0);

        return new self(
            name: $name,
            countryCode: $countryCode,
            phone: $phone,
            email: $email,
            cityKey: $cityKey,
            cityLabel: self::CITY_LABELS[$cityKey],
            arrival: $arrival,
            departure: $departure,
            adults: $adults,
            children: $children,
            services: $services,
            rooms: self::str($data, 'rooms', 40),
            category: self::str($data, 'category', 40),
            kaabaView: self::str($data, 'kaabaView', 40),
            budget: self::str($data, 'budget', 40),
            message: self::str($data, 'message', 2000),
        );
    }

    public function hasHotel(): bool
    {
        return in_array(self::ALLOWED_SERVICES['hotel'], $this->services, true);
    }

    public function nights(): int
    {
        if ($this->arrival === null || $this->departure === null) {
            return 0;
        }
        return max(0, (int) $this->arrival->diff($this->departure)->days);
    }

    public function travelersLabel(): string
    {
        $s = $this->adults . ' adulte' . ($this->adults > 1 ? 's' : '');
        if ($this->children > 0) {
            $s .= ' · ' . $this->children . ' enfant' . ($this->children > 1 ? 's' : '');
        }
        return $s;
    }

    public function phoneIntl(): string
    {
        $digits = preg_replace('/\D+/', '', $this->countryCode . $this->phone) ?? '';
        return $digits;
    }

    public function phoneDisplay(): string
    {
        return trim($this->countryCode . ' ' . $this->phone);
    }

    /** @param array<string,mixed> $data */
    private static function str(array $data, string $key, int $maxLen): string
    {
        $v = $data[$key] ?? '';
        if (!is_scalar($v)) {
            return '';
        }
        $s = trim((string) $v);
        $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $s) ?? '';
        return mb_substr($s, 0, $maxLen);
    }

    /** @param array<string,mixed> $data */
    private static function intBetween(array $data, string $key, int $min, int $max, int $default): int
    {
        $v = $data[$key] ?? $default;
        if (!is_numeric($v)) {
            return $default;
        }
        return max($min, min($max, (int) $v));
    }

    /** @param array<string,mixed> $data */
    private static function date(array $data, string $key): ?\DateTimeImmutable
    {
        $raw = $data[$key] ?? '';
        if (!is_string($raw) || $raw === '') {
            return null;
        }
        $d = \DateTimeImmutable::createFromFormat('!Y-m-d', $raw);
        if ($d === false) {
            return null;
        }
        return $d;
    }
}
