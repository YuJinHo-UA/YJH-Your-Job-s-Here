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
    $pages = fetch_all('SELECT * FROM wiki_pages ORDER BY created_at DESC');
    json_response(['data' => $pages]);
}

if ($method === 'POST') {
    $payload = json_decode(file_get_contents('php://input'), true) ?: [];
    $stmt = db()->prepare('INSERT INTO wiki_pages (project_id, slug, title, content, author_id, editor_id) VALUES (:project_id, :slug, :title, :content, :author_id, :editor_id)');
    $stmt->execute([
        ':project_id' => $payload['project_id'] ?? 1,
        ':slug' => $payload['slug'] ?? uniqid('page-'),
        ':title' => $payload['title'] ?? 'Untitled',
        ':content' => $payload['content'] ?? '',
        ':author_id' => $user['id'],
        ':editor_id' => $user['id'],
    ]);
    json_response(['status' => 'created', 'id' => db()->lastInsertId()]);
}

json_response(['error' => 'Method not allowed'], 405);
