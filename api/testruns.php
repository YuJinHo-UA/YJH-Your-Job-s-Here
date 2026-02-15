<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/functions.php';

session_start();
$user = current_user();
if (!$user) {
    json_response(['error' => 'Unauthorized'], 401);
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $runs = fetch_all('SELECT * FROM test_runs ORDER BY created_at DESC');
    json_response(['data' => $runs]);
}

if ($method === 'POST') {
    $payload = json_decode(file_get_contents('php://input'), true) ?: [];
    $stmt = db()->prepare('INSERT INTO test_runs (plan_id, name, status, created_by) VALUES (:plan_id, :name, :status, :created_by)');
    $stmt->execute([
        ':plan_id' => $payload['plan_id'] ?? 1,
        ':name' => $payload['name'] ?? 'Untitled',
        ':status' => $payload['status'] ?? 'in_progress',
        ':created_by' => $user['id'],
    ]);
    json_response(['status' => 'created', 'id' => db()->lastInsertId()]);
}

json_response(['error' => 'Method not allowed'], 405);
