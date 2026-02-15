<?php
require_once __DIR__ . '/../includes/auth.php';
require_role(['admin']);
require_once __DIR__ . '/../includes/header.php';
require_once __DIR__ . '/../includes/sidebar.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $stmt = db()->prepare('INSERT INTO users (username, email, password_hash, role) VALUES (:username, :email, :password_hash, :role)');
    $stmt->execute([
        ':username' => post_param('username'),
        ':email' => post_param('email'),
        ':password_hash' => password_hash(post_param('password'), PASSWORD_DEFAULT),
        ':role' => post_param('role'),
    ]);
    add_toast('User created', 'success');
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
                <h6>Create User</h6>
                <form method="post" data-draft-key="user">
                    <input type="hidden" name="csrf_token" value="<?php echo h(csrf_token()); ?>">
                    <input class="form-control mb-2" name="username" placeholder="Username" required>
                    <input class="form-control mb-2" name="email" type="email" placeholder="Email" required>
                    <input class="form-control mb-2" name="password" type="password" placeholder="Password" required>
                    <select class="form-select mb-2" name="role">
                        <option value="admin">Admin</option>
                        <option value="qa">QA</option>
                        <option value="developer">Developer</option>
                        <option value="viewer">Viewer</option>
                    </select>
                    <button class="btn btn-primary">Save</button>
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
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($users as $u): ?>
                        <tr>
                            <td><?php echo h($u['username']); ?></td>
                            <td><?php echo h($u['email']); ?></td>
                            <td><?php echo h($u['role']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>
