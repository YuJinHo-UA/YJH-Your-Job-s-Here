(() => {
    document.querySelectorAll('form[data-draft-key]').forEach((form) => {
        const key = `draft:${form.dataset.draftKey}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(data).forEach((name) => {
                if (name === 'csrf_token') {
                    return;
                }
                const field = form.querySelector(`[name="${name}"]`);
                if (field) {
                    field.value = data[name];
                }
            });
        }

        form.addEventListener('input', () => {
            const payload = {};
            form.querySelectorAll('input, textarea, select').forEach((field) => {
                if (field.name) {
                    if (field.name === 'csrf_token' || field.type === 'password' || field.type === 'hidden') {
                        return;
                    }
                    payload[field.name] = field.value;
                }
            });
            localStorage.setItem(key, JSON.stringify(payload));
        });

        form.addEventListener('submit', () => {
            localStorage.removeItem(key);
        });
    });
})();
