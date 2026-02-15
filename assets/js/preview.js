(() => {
    let preview;
    document.addEventListener('mouseover', async (event) => {
        const target = event.target.closest('[data-preview-type]');
        if (!target) return;
        const type = target.dataset.previewType;
        const id = target.dataset.previewId;
        if (!type || !id) return;

        const res = await fetch(`/api/preview.php?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`);
        const payload = await res.json();
        if (!payload || !payload.title) return;

        preview = document.createElement('div');
        preview.className = 'preview-pop';
        preview.innerHTML = `<div class="fw-semibold">${payload.title}</div><div class="small text-muted">${payload.subtitle || ''}</div>`;
        document.body.appendChild(preview);
        const rect = target.getBoundingClientRect();
        preview.style.left = `${rect.left}px`;
        preview.style.top = `${rect.bottom + 8 + window.scrollY}px`;
    });

    document.addEventListener('mouseout', (event) => {
        if (preview) {
            preview.remove();
            preview = null;
        }
    });
})();
