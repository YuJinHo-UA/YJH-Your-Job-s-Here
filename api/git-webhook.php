<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/functions.php';

$payload = json_decode(file_get_contents('php://input'), true) ?: [];
$commits = $payload['commits'] ?? [];

foreach ($commits as $commit) {
    $message = $commit['message'] ?? '';
    if (preg_match_all('/(?:Fixes|Closes)\s+#(\d+)/i', $message, $matches)) {
        foreach ($matches[1] as $bugId) {
            $stmt = db()->prepare('UPDATE bugs SET status = :status, updated_at = CURRENT_TIMESTAMP WHERE id = :id');
            $stmt->execute([':status' => 'fixed', ':id' => $bugId]);

            $stmt = db()->prepare('INSERT INTO bug_comments (bug_id, user_id, message, is_system) VALUES (:bug_id, :user_id, :message, :is_system)');
            $stmt->execute([
                ':bug_id' => $bugId,
                ':user_id' => 1,
                ':message' => 'Auto-updated by commit ' . ($commit['id'] ?? ''),
                ':is_system' => 1,
            ]);

            $stmt = db()->prepare('INSERT INTO git_commits (bug_id, commit_hash, commit_message, author_name, author_email, committed_at, branch, repository_url) VALUES (:bug_id, :commit_hash, :commit_message, :author_name, :author_email, :committed_at, :branch, :repository_url)');
            $stmt->execute([
                ':bug_id' => $bugId,
                ':commit_hash' => $commit['id'] ?? '',
                ':commit_message' => $message,
                ':author_name' => $commit['author']['name'] ?? '',
                ':author_email' => $commit['author']['email'] ?? '',
                ':committed_at' => $commit['timestamp'] ?? '',
                ':branch' => $payload['ref'] ?? '',
                ':repository_url' => $payload['repository']['url'] ?? '',
            ]);
        }
    }
}

json_response(['status' => 'ok']);
