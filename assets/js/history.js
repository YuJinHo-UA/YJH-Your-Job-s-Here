(() => {
    const content = document.querySelector('.app-content');
    if (!content) return;

    document.addEventListener('click', async (event) => {
        const link = event.target.closest('a[data-ajax]');
        if (!link) return;
        event.preventDefault();
        const res = await fetch(link.href, { headers: { 'X-Requested-With': 'fetch' } });
        const html = await res.text();
        content.innerHTML = html;
        history.pushState({}, '', link.href);
    });

    window.addEventListener('popstate', async () => {
        const res = await fetch(location.href, { headers: { 'X-Requested-With': 'fetch' } });
        const html = await res.text();
        content.innerHTML = html;
    });
})();
