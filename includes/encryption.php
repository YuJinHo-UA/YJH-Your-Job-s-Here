<?php
declare(strict_types=1);

const YJH_CIPHER = 'AES-256-CBC';

function yjh_encryption_key(): string
{
    $configured = (string)(getenv('YJH_ENCRYPTION_KEY') ?: '');
    if ($configured === '') {
        // Development fallback. Set YJH_ENCRYPTION_KEY in production.
        $configured = 'change-this-dev-key-32-bytes-minimum';
    }
    return hash('sha256', $configured, true);
}

function encrypt_value(string $plainText): string
{
    $iv = random_bytes(16);
    $cipherText = openssl_encrypt($plainText, YJH_CIPHER, yjh_encryption_key(), OPENSSL_RAW_DATA, $iv);
    if ($cipherText === false) {
        throw new RuntimeException('Unable to encrypt value');
    }
    return base64_encode($iv . $cipherText);
}

function decrypt_value(?string $encoded): string
{
    $payload = (string)$encoded;
    if ($payload === '') {
        return '';
    }
    $decoded = base64_decode($payload, true);
    if ($decoded === false || strlen($decoded) < 17) {
        return '';
    }
    $iv = substr($decoded, 0, 16);
    $cipherText = substr($decoded, 16);
    $plain = openssl_decrypt($cipherText, YJH_CIPHER, yjh_encryption_key(), OPENSSL_RAW_DATA, $iv);
    return $plain === false ? '' : $plain;
}

function email_hash(string $email): string
{
    $normalized = strtolower(trim($email));
    return hash('sha256', $normalized);
}
