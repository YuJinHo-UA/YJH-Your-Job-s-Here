<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';

function h(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

function current_user(): ?array
{
    if (!isset($_SESSION['user_id'])) {
        return null;
    }
    $stmt = db()->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->execute([':id' => $_SESSION['user_id']]);
    $user = $stmt->fetch();
    return $user ?: null;
}

function require_login(): void
{
    if (!current_user()) {
        header('Location: /login.php');
        exit;
    }
}

function require_role(array $roles): void
{
    $user = current_user();
    if (!$user || !in_array($user['role'], $roles, true)) {
        http_response_code(403);
        echo 'Forbidden';
        exit;
    }
}

function redirect(string $path): void
{
    header('Location: ' . $path);
    exit;
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

function get_param(string $key, $default = null)
{
    return $_GET[$key] ?? $default;
}

function post_param(string $key, $default = null)
{
    return $_POST[$key] ?? $default;
}

function normalize_language(string $lang): string
{
    return in_array($lang, ['en', 'ru'], true) ? $lang : 'en';
}

function current_language(): string
{
    $user = current_user();
    if ($user && isset($user['language'])) {
        return normalize_language((string)$user['language']);
    }

    if (isset($_COOKIE['lang'])) {
        return normalize_language((string)$_COOKIE['lang']);
    }

    return 'en';
}

function add_toast(string $message, string $level = 'info'): void
{
    $_SESSION['toasts'][] = ['message' => $message, 'level' => $level];
}

function consume_toasts(): array
{
    $toasts = $_SESSION['toasts'] ?? [];
    $_SESSION['toasts'] = [];
    return $toasts;
}

function is_active(string $path): string
{
    $current = $_SERVER['SCRIPT_NAME'] ?? '';
    return str_contains($current, $path) ? 'active' : '';
}

function fetch_all(string $sql, array $params = []): array
{
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

function fetch_one(string $sql, array $params = []): ?array
{
    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    $row = $stmt->fetch();
    return $row ?: null;
}

