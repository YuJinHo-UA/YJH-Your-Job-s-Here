<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/functions.php';

session_start();
$type = $_GET['type'] ?? '';
$id = (int)($_GET['id'] ?? 0);

if ($type === 'bug') {
    $row = fetch_one('SELECT id, title, status FROM bugs WHERE id = :id', [':id' => $id]);
    if ($row) {
        json_response(['title' => '#' . $row['id'] . ' ' . $row['title'], 'subtitle' => 'Status: ' . $row['status']]);
    }
}

if ($type === 'testcase') {
    $row = fetch_one('SELECT id, title, priority FROM test_cases WHERE id = :id', [':id' => $id]);
    if ($row) {
        json_response(['title' => 'TC-' . $row['id'] . ' ' . $row['title'], 'subtitle' => 'Priority: ' . $row['priority']]);
    }
}

if ($type === 'wiki') {
    $row = fetch_one('SELECT id, title FROM wiki_pages WHERE id = :id', [':id' => $id]);
    if ($row) {
        json_response(['title' => $row['title'], 'subtitle' => 'Wiki Page']);
    }
}

json_response(['title' => 'Not found']);
