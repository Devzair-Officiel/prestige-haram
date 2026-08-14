<?php

declare(strict_types=1);

namespace HaramainPrestige;

/**
 * Résout l'IP réelle du client en tenant compte d'une liste de reverse proxies
 * trustés. X-Forwarded-For n'est pris en compte QUE si l'IP directement
 * connectée (REMOTE_ADDR) correspond à une entrée trustée.
 *
 * Stratégie « rightmost-non-trusted » : la chaîne complète
 * [XFF..., REMOTE_ADDR] est parcourue de DROITE à GAUCHE et les hops trustés
 * sont sautés. La première IP valide non trustée rencontrée est renvoyée.
 * Ceci reste sûr même si le reverse proxy de bord utilise
 * X-Forwarded-For: $proxy_add_x_forwarded_for (append) : les IP injectées
 * par un client à gauche seront cachées derrière la vraie IP ajoutée par le
 * proxy et ne seront donc jamais atteintes.
 *
 * Format TRUSTED_PROXIES (env) :
 *   liste séparée par des virgules d'IP ou de blocs CIDR (v4/v6)
 *   ex. "127.0.0.1, ::1, 10.0.0.0/8, fd00::/8"
 */
final class ClientIp
{
    /**
     * @param array<string,string> $server $_SERVER
     * @param string $trustedProxies liste CSV IP/CIDR
     */
    public static function resolve(array $server, string $trustedProxies): string
    {
        $remote = (string) ($server['REMOTE_ADDR'] ?? '');
        if ($remote === '') {
            return 'unknown';
        }

        $proxies = self::parseList($trustedProxies);
        if ($proxies === [] || !self::ipMatchesAny($remote, $proxies)) {
            // REMOTE_ADDR n'est pas un proxy trusté → XFF entièrement ignoré.
            return $remote;
        }

        // Chaîne complète : XFF (client → proxies successifs) puis REMOTE_ADDR
        // (proxy directement connecté à PHP).
        $chain = [];
        $xff = (string) ($server['HTTP_X_FORWARDED_FOR'] ?? '');
        if ($xff !== '') {
            foreach (explode(',', $xff) as $item) {
                $item = trim($item);
                if ($item !== '') {
                    $chain[] = $item;
                }
            }
        }
        $chain[] = $remote;

        // Parcours de droite à gauche : on saute les proxies trustés et on
        // renvoie la première IP non trustée. Toute valeur non-IP rencontrée
        // pendant le parcours = chaîne suspecte → fallback sûr sur REMOTE_ADDR.
        for ($i = count($chain) - 1; $i >= 0; $i--) {
            $candidate = $chain[$i];
            if (filter_var($candidate, FILTER_VALIDATE_IP) === false) {
                return $remote;
            }
            if (!self::ipMatchesAny($candidate, $proxies)) {
                return $candidate;
            }
        }

        // Tous les hops sont trustés → fallback sur REMOTE_ADDR.
        return $remote;
    }

    /**
     * @return string[]
     */
    private static function parseList(string $csv): array
    {
        $out = [];
        foreach (explode(',', $csv) as $item) {
            $item = trim($item);
            if ($item !== '') {
                $out[] = $item;
            }
        }
        return $out;
    }

    /**
     * @param string[] $rules IP ou CIDR
     */
    private static function ipMatchesAny(string $ip, array $rules): bool
    {
        if (filter_var($ip, FILTER_VALIDATE_IP) === false) {
            return false;
        }
        foreach ($rules as $rule) {
            if (self::ipMatches($ip, $rule)) {
                return true;
            }
        }
        return false;
    }

    private static function ipMatches(string $ip, string $rule): bool
    {
        // IP exacte
        if (strpos($rule, '/') === false) {
            return $ip === $rule;
        }
        // CIDR
        [$subnet, $maskStr] = explode('/', $rule, 2);
        if (!ctype_digit($maskStr)) {
            return false;
        }
        $mask = (int) $maskStr;
        $ipBin = @inet_pton($ip);
        $subnetBin = @inet_pton($subnet);
        if ($ipBin === false || $subnetBin === false || strlen($ipBin) !== strlen($subnetBin)) {
            return false;
        }
        $bytes = intdiv($mask, 8);
        $bits = $mask % 8;
        if ($bytes > 0 && substr($ipBin, 0, $bytes) !== substr($subnetBin, 0, $bytes)) {
            return false;
        }
        if ($bits === 0) {
            return true;
        }
        $ipByte = ord($ipBin[$bytes] ?? "\0");
        $subnetByte = ord($subnetBin[$bytes] ?? "\0");
        $maskByte = (~((1 << (8 - $bits)) - 1)) & 0xFF;
        return ($ipByte & $maskByte) === ($subnetByte & $maskByte);
    }
}
