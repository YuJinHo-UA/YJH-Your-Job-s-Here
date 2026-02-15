<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

verify_csrf();

$targetType = post_param('target_type');
$targetId = (int)post_param('target_id');
$user = current_user();

if ($targetType !== 'bug' || $targetId <= 0) {
    json_response(['error' => 'Invalid target'], 400);
}

$bug = fetch_one('SELECT id FROM bugs WHERE id = :id', [':id' => $targetId]);
if (!$bug) {
    json_response(['error' => 'Bug not found'], 404);
}

if (empty($_FILES['attachments'])) {
    json_response(['error' => 'No files uploaded'], 400);
}

$uploadRootFs = realpath(__DIR__ . '/..');
if ($uploadRootFs === false) {
    json_response(['error' => 'Invalid upload root'], 500);
}

$uploadDirFs = $uploadRootFs . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'bugs';
if (!is_dir($uploadDirFs) && !mkdir($uploadDirFs, 0777, true) && !is_dir($uploadDirFs)) {
    json_response(['error' => 'Cannot create upload directory'], 500);
}

$allowedMime = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/gif' => 'gif',
    'image/webp' => 'webp',
];

$maxFileSize = 8 * 1024 * 1024;
$uploaded = [];
$errors = [];

$names = $_FILES['attachments']['name'] ?? [];
$tmpNames = $_FILES['attachments']['tmp_name'] ?? [];
$sizes = $_FILES['attachments']['size'] ?? [];
$fileErrors = $_FILES['attachments']['error'] ?? [];

for ($i = 0; $i < count($names); $i++) {
    $name = (string)($names[$i] ?? '');
    $tmpName = (string)($tmpNames[$i] ?? '');
    $size = (int)($sizes[$i] ?? 0);
    $error = (int)($fileErrors[$i] ?? UPLOAD_ERR_NO_FILE);

    if ($error === UPLOAD_ERR_NO_FILE) {
        continue;
    }
    if ($error !== UPLOAD_ERR_OK) {
        $errors[] = $name !== '' ? $name . ': upload failed' : 'upload failed';
        continue;
    }
    if ($size <= 0 || $size > $maxFileSize) {
        $errors[] = $name . ': invalid file size';
        continue;
    }
    if (!is_uploaded_file($tmpName)) {
        $errors[] = $name . ': invalid upload';
        continue;
    }

    $mime = '';
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = $finfo ? (string)finfo_file($finfo, $tmpName) : '';
        if ($finfo) {
            finfo_close($finfo);
        }
    } elseif (function_exists('mime_content_type')) {
        $mime = (string)mime_content_type($tmpName);
    }
    if (!isset($allowedMime[$mime])) {
        $errors[] = $name . ': unsupported type';
        continue;
    }

    $safeBase = preg_replace('/[^A-Za-z0-9._-]/', '_', pathinfo($name, PATHINFO_FILENAME));
    $safeBase = $safeBase !== '' ? $safeBase : 'image';
    $storedName = $safeBase . '_' . bin2hex(random_bytes(8)) . '.' . $allowedMime[$mime];
    $targetFs = $uploadDirFs . DIRECTORY_SEPARATOR . $storedName;
    $targetWeb = '/uploads/bugs/' . $storedName;

    if (!move_uploaded_file($tmpName, $targetFs)) {
        $errors[] = $name . ': cannot move file';
        continue;
    }

    $stmt = db()->prepare(
        'INSERT INTO attachments (target_type, target_id, filename, filepath, file_size, mime_type, uploaded_by) VALUES (:target_type, :target_id, :filename, :filepath, :file_size, :mime_type, :uploaded_by)'
    );
    $stmt->execute([
        ':target_type' => 'bug',
        ':target_id' => $targetId,
        ':filename' => $name !== '' ? $name : $storedName,
        ':filepath' => $targetWeb,
        ':file_size' => $size,
        ':mime_type' => $mime,
        ':uploaded_by' => $user['id'],
    ]);

    $uploaded[] = [
        'filename' => $name !== '' ? $name : $storedName,
        'filepath' => $targetWeb,
        'uploaded_at' => date('Y-m-d H:i:s'),
        'username' => $user['username'],
    ];
}

if (!$uploaded && $errors) {
    json_response(['error' => implode('; ', $errors)], 400);
}

json_response([
    'status' => 'ok',
    'uploaded' => $uploaded,
    'errors' => $errors,
]);
