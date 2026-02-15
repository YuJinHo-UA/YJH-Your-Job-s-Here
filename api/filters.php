<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/functions.php';

session_start();
$user = current_user();
if (!$user) {
    json_response(['error' => 'Unauthorized'], 401);
}

$payload = json_decode(file_get_contents('php://input'), true) ?: [];
$name = $payload['name'] ?? '';
$filter = $payload['filter'] ?? [];

if ($name === '') {
    json_response(['error' => 'Name required'], 400);
}

$stmt = db()->prepare('INSERT INTO saved_filters (user_id, name, filter_json) VALUES (:user_id, :name, :filter_json)');
$stmt->execute([
    ':user_id' => $user['id'],
    ':name' => $name,
    ':filter_json' => json_encode($filter),
]);

json_response(['status' => 'ok']);
