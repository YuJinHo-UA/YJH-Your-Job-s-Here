    </div>
</div>

<div class="search-modal" id="searchModal">
    <div class="search-modal-card">
        <div class="search-modal-header">
            <input type="text" id="searchModalInput" placeholder="Type to search...">
            <button class="btn btn-sm btn-outline-secondary" id="searchModalClose">Esc</button>
        </div>
        <div class="search-modal-results" id="searchModalResults"></div>
    </div>
</div>

<div class="toast-container position-fixed top-0 end-0 p-3">
    <?php foreach ($toasts as $toast) : ?>
        <div class="toast align-items-center text-bg-<?php echo h($toast['level']); ?> border-0 show" role="alert">
            <div class="d-flex">
                <div class="toast-body"><?php echo h($toast['message']); ?></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="assets/js/app.js"></script>
<script src="assets/js/i18n.js"></script>
<script src="assets/js/search.js"></script>
<script src="assets/js/kanban.js"></script>
<script src="assets/js/charts.js"></script>
<script src="assets/js/preview.js"></script>
<script src="assets/js/drafts.js"></script>
<script src="assets/js/history.js"></script>
<script src="assets/js/filters.js"></script>
</body>
</html>
