(() => {
    const form = document.getElementById('bugAttachmentForm');
    const dropzone = document.getElementById('bugAttachmentDropzone');
    const input = document.getElementById('bugAttachmentInput');
    const list = document.getElementById('bugAttachmentList');

    if (!form || !dropzone || !input || !list) {
        return;
    }

    const renderItem = (file) => {
        const link = document.createElement('a');
        link.className = 'attachment-item';
        link.href = file.filepath;
        link.target = '_blank';
        link.rel = 'noopener';

        const img = document.createElement('img');
        img.src = file.filepath;
        img.alt = file.filename || 'attachment';
        img.loading = 'lazy';

        const meta = document.createElement('div');
        meta.className = 'attachment-meta';

        const name = document.createElement('div');
        name.className = 'attachment-name';
        name.textContent = file.filename || 'attachment';

        const author = document.createElement('div');
        author.className = 'attachment-author text-muted small';
        author.textContent = `${file.username || ''} | ${file.uploaded_at || ''}`;

        meta.appendChild(name);
        meta.appendChild(author);
        link.appendChild(img);
        link.appendChild(meta);
        list.prepend(link);
    };

    const uploadFiles = async (files) => {
        if (!files || files.length === 0) {
            return;
        }

        const payload = new FormData();
        payload.append('csrf_token', form.querySelector('[name="csrf_token"]').value);
        payload.append('target_type', form.querySelector('[name="target_type"]').value);
        payload.append('target_id', form.querySelector('[name="target_id"]').value);
        Array.from(files).forEach((file) => payload.append('attachments[]', file));

        dropzone.classList.add('is-loading');
        try {
            const response = await fetch('/api/upload.php', {
                method: 'POST',
                body: payload
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            (data.uploaded || []).forEach(renderItem);
            if ((data.errors || []).length) {
                alert(data.errors.join('\n'));
            }
        } catch (error) {
            alert(error.message || 'Upload failed');
        } finally {
            dropzone.classList.remove('is-loading');
            input.value = '';
        }
    };

    dropzone.addEventListener('click', () => input.click());
    input.addEventListener('change', (event) => uploadFiles(event.target.files));

    ['dragenter', 'dragover'].forEach((eventName) => {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.add('is-dragover');
        });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
        dropzone.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.remove('is-dragover');
        });
    });

    dropzone.addEventListener('drop', (event) => {
        uploadFiles(event.dataTransfer.files);
    });
})();
