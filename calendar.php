<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/sidebar.php';

$user = current_user();
$editId = (int)get_param('edit_id', 0);
$editItem = null;
if ($editId > 0) {
    $editItem = fetch_one('SELECT * FROM user_availability WHERE id = :id', [':id' => $editId]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $action = post_param('action', 'save');
    $itemId = (int)post_param('item_id', 0);

    if ($action === 'delete' && $itemId > 0) {
        $stmt = db()->prepare('DELETE FROM user_availability WHERE id = :id');
        $stmt->execute([':id' => $itemId]);
        add_toast('Availability deleted', 'success');
        redirect('/calendar.php');
    }

    if ($itemId > 0) {
        $stmt = db()->prepare('UPDATE user_availability SET type=:type, start_date=:start_date, end_date=:end_date, reason=:reason WHERE id=:id');
        $stmt->execute([
            ':type' => post_param('type'),
            ':start_date' => post_param('start_date'),
            ':end_date' => post_param('end_date'),
            ':reason' => post_param('reason'),
            ':id' => $itemId,
        ]);
        add_toast('Availability updated', 'success');
    } else {
        $stmt = db()->prepare('INSERT INTO user_availability (user_id, type, start_date, end_date, reason) VALUES (:user_id, :type, :start_date, :end_date, :reason)');
        $stmt->execute([
            ':user_id' => $user['id'],
            ':type' => post_param('type'),
            ':start_date' => post_param('start_date'),
            ':end_date' => post_param('end_date'),
            ':reason' => post_param('reason'),
        ]);
        add_toast('Availability added', 'success');
    }
    redirect('/calendar.php');
}

$availability = fetch_all('SELECT a.*, u.username FROM user_availability a JOIN users u ON u.id=a.user_id ORDER BY start_date DESC');
?>
<div class="app-content">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Team Calendar</h2>
    </div>
    <div class="row g-4">
        <div class="col-lg-4">
            <div class="card p-3">
                <h6><?php echo $editItem ? 'Edit absence' : 'Add absence'; ?></h6>
                <form method="post" data-draft-key="availability">
                    <input type="hidden" name="csrf_token" value="<?php echo h(csrf_token()); ?>">
                    <input type="hidden" name="item_id" value="<?php echo (int)($editItem['id'] ?? 0); ?>">
                    <input type="hidden" name="action" value="save">
                    <select class="form-select mb-2" name="type">
                        <option value="vacation" <?php echo ($editItem['type'] ?? 'vacation') === 'vacation' ? 'selected' : ''; ?>>Vacation</option>
                        <option value="sick_leave" <?php echo ($editItem['type'] ?? 'vacation') === 'sick_leave' ? 'selected' : ''; ?>>Sick leave</option>
                        <option value="day_off" <?php echo ($editItem['type'] ?? 'vacation') === 'day_off' ? 'selected' : ''; ?>>Day off</option>
                        <option value="conference" <?php echo ($editItem['type'] ?? 'vacation') === 'conference' ? 'selected' : ''; ?>>Conference</option>
                        <option value="other" <?php echo ($editItem['type'] ?? 'vacation') === 'other' ? 'selected' : ''; ?>>Other</option>
                    </select>
                    <input class="form-control mb-2" type="date" name="start_date" value="<?php echo h($editItem['start_date'] ?? ''); ?>" required>
                    <input class="form-control mb-2" type="date" name="end_date" value="<?php echo h($editItem['end_date'] ?? ''); ?>" required>
                    <input class="form-control mb-2" name="reason" placeholder="Reason" value="<?php echo h($editItem['reason'] ?? ''); ?>">
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary">Save</button>
                        <?php if ($editItem): ?>
                            <a class="btn btn-outline-secondary" href="/calendar.php">Cancel</a>
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
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($availability as $row): ?>
                        <tr>
                            <td><?php echo h($row['username']); ?></td>
                            <td><?php echo h($row['type']); ?></td>
                            <td><?php echo h($row['start_date']); ?></td>
                            <td><?php echo h($row['end_date']); ?></td>
                            <td class="d-flex gap-2">
                                <a class="btn btn-sm btn-outline-primary" href="/calendar.php?edit_id=<?php echo (int)$row['id']; ?>">Edit</a>
                                <form method="post" onsubmit="return confirm('Delete record?');">
                                    <input type="hidden" name="csrf_token" value="<?php echo h(csrf_token()); ?>">
                                    <input type="hidden" name="item_id" value="<?php echo (int)$row['id']; ?>">
                                    <input type="hidden" name="action" value="delete">
                                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
