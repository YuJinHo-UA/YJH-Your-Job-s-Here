<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/functions.php';

session_start();
$q = trim((string)($_GET['q'] ?? ''));
if ($q === '') {
    json_response(['results' => []]);
}

$like = '%' . $q . '%';
$results = [
    'Bugs' => [],
    'Test Cases' => [],
    'Projects' => [],
    'Wiki' => [],
    'Users' => [],
];

foreach (fetch_all('SELECT id, title FROM bugs WHERE title LIKE :q LIMIT 5', [':q' => $like]) as $row) {
    $results['Bugs'][] = ['title' => '#' . $row['id'] . ' ' . $row['title'], 'url' => '/bug.php?id=' . $row['id']];
}

foreach (fetch_all('SELECT id, title FROM test_cases WHERE title LIKE :q LIMIT 5', [':q' => $like]) as $row) {
    $results['Test Cases'][] = ['title' => 'TC-' . $row['id'] . ' ' . $row['title'], 'url' => '/testcase.php?id=' . $row['id']];
}

foreach (fetch_all('SELECT id, name FROM projects WHERE name LIKE :q LIMIT 5', [':q' => $like]) as $row) {
    $results['Projects'][] = ['title' => $row['name'], 'url' => '/project.php?id=' . $row['id']];
}

foreach (fetch_all('SELECT id, title FROM wiki_pages WHERE title LIKE :q LIMIT 5', [':q' => $like]) as $row) {
    $results['Wiki'][] = ['title' => $row['title'], 'url' => '/wiki-page.php?id=' . $row['id']];
}

foreach (fetch_all('SELECT id, username FROM users WHERE username LIKE :q LIMIT 5', [':q' => $like]) as $row) {
    $results['Users'][] = ['title' => $row['username'], 'url' => '/admin/users.php'];
}

json_response(['results' => $results]);
