<?php
require_once __DIR__ . '/../includes/auth.php';
require_role(['admin']);
require_once __DIR__ . '/../includes/header.php';
require_once __DIR__ . '/../includes/sidebar.php';

$currentUser = current_user();
$editId = (int)get_param('edit_id', 0);
$editUser = null;
if ($editId > 0) {
    $editUser = fetch_one('SELECT * FROM users WHERE id = :id', [':id' => $editId]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $action = post_param('action', 'save');
    $userId = (int)post_param('user_id', 0);

    if ($action === 'delete' && $userId > 0) {
        if ($userId === (int)$currentUser['id']) {
            add_toast('You cannot delete your own account', 'danger');
            redirect('/admin/users.php');
        }
        try {
            $stmt = db()->prepare('DELETE FROM users WHERE id = :id');
            $stmt->execute([':id' => $userId]);
            add_toast('User deleted', 'success');
        } catch (Throwable $e) {
            add_toast('Cannot delete user: linked records exist', 'danger');
        }
        redirect('/admin/users.php');
    }

    if ($userId > 0) {
        $sql = 'UPDATE users SET username=:username, email=:email, role=:role, updated_at=CURRENT_TIMESTAMP';
        $params = [
            ':username' => post_param('username'),
            ':email' => post_param('email'),
            ':role' => post_param('role'),
            ':id' => $userId,
        ];
        $password = (string)post_param('password', '');
        if ($password !== '') {
            $sql .= ', password_hash=:password_hash';
            $params[':password_hash'] = password_hash($password, PASSWORD_DEFAULT);
        }
        $sql .= ' WHERE id=:id';
        $stmt = db()->prepare($sql);
        $stmt->execute($params);
        add_toast('User updated', 'success');
    } else {
        $stmt = db()->prepare('INSERT INTO users (username, email, password_hash, role) VALUES (:username, :email, :password_hash, :role)');
        $stmt->execute([
            ':username' => post_param('username'),
            ':email' => post_param('email'),
            ':password_hash' => password_hash(post_param('password'), PASSWORD_DEFAULT),
            ':role' => post_param('role'),
        ]);
        add_toast('User created', 'success');
    }
    redirect('/admin/users.php');
}

$users = fetch_all('SELECT * FROM users ORDER BY created_at DESC');
?>
<div class="app-content">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Users</h2>
    </div>
    <div class="row g-4">
        <div class="col-lg-4">
            <div class="card p-3">
                <h6><?php echo $editUser ? 'Edit User' : 'Create User'; ?></h6>
                <form method="post" data-draft-key="user">
                    <input type="hidden" name="csrf_token" value="<?php echo h(csrf_token()); ?>">
                    <input type="hidden" name="action" value="save">
                    <input type="hidden" name="user_id" value="<?php echo (int)($editUser['id'] ?? 0); ?>">
                    <input class="form-control mb-2" name="username" placeholder="Username" value="<?php echo h($editUser['username'] ?? ''); ?>" required>
                    <input class="form-control mb-2" name="email" type="email" placeholder="Email" value="<?php echo h($editUser['email'] ?? ''); ?>" required>
                    <input class="form-control mb-2" name="password" type="password" placeholder="<?php echo $editUser ? 'Leave empty to keep password' : 'Password'; ?>" <?php echo $editUser ? '' : 'required'; ?>>
                    <select class="form-select mb-2" name="role">
                        <option value="admin" <?php echo ($editUser['role'] ?? '') === 'admin' ? 'selected' : ''; ?>>Admin</option>
                        <option value="qa" <?php echo ($editUser['role'] ?? '') === 'qa' ? 'selected' : ''; ?>>QA</option>
                        <option value="developer" <?php echo ($editUser['role'] ?? '') === 'developer' ? 'selected' : ''; ?>>Developer</option>
                        <option value="viewer" <?php echo ($editUser['role'] ?? '') === 'viewer' ? 'selected' : ''; ?>>Viewer</option>
                    </select>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary">Save</button>
                        <?php if ($editUser): ?>
                            <a class="btn btn-outline-secondary" href="/admin/users.php">Cancel</a>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card p-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($users as $u): ?>
                        <tr>
                            <td><?php echo h($u['username']); ?></td>
                            <td><?php echo h($u['email']); ?></td>
                            <td><?php echo h($u['role']); ?></td>
                            <td class="d-flex gap-2">
                                <a class="btn btn-sm btn-outline-primary" href="/admin/users.php?edit_id=<?php echo (int)$u['id']; ?>">Edit</a>
                                <?php if ((int)$u['id'] !== (int)$currentUser['id']): ?>
                                    <form method="post" onsubmit="return confirm('Delete user?');">
                                        <input type="hidden" name="csrf_token" value="<?php echo h(csrf_token()); ?>">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="user_id" value="<?php echo (int)$u['id']; ?>">
                                        <button class="btn btn-sm btn-outline-danger">Delete</button>
                                    </form>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>
