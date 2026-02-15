(() => {
    const saveBtn = document.getElementById('saveFilterBtn');
    if (!saveBtn) return;

    saveBtn.addEventListener('click', async () => {
        const label = window.uiT ? window.uiT('Filter name') : 'Filter name';
        const name = prompt(label);
        if (!name) return;
        const form = document.getElementById('bugFilterForm');
        const data = Object.fromEntries(new FormData(form));
        await fetch('/api/filters.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, filter: data })
        });
        window.location.reload();
    });
})();

