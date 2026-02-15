(() => {
    const t = (value) => (window.uiT ? window.uiT(value) : value);
    const bodyStyles = getComputedStyle(document.body);
    const textColor = bodyStyles.getPropertyValue('--text')?.trim() || '#e2e8f0';
    const gridColor = 'rgba(148, 163, 184, 0.18)';
    const isDark = document.body.classList.contains('theme-dark');
    const tickColor = isDark ? 'rgba(226, 232, 240, 0.9)' : textColor;

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 700,
            easing: 'easeOutQuart'
        },
        interaction: {
            mode: 'nearest',
            intersect: true
        },
        plugins: {
            legend: {
                labels: {
                    color: tickColor,
                    boxWidth: 14,
                    boxHeight: 14,
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    padding: 14
                }
            },
            tooltip: {
                backgroundColor: isDark ? '#0b1220' : '#ffffff',
                titleColor: textColor,
                bodyColor: textColor,
                borderColor: gridColor,
                borderWidth: 1,
                padding: 10,
                cornerRadius: 10
            }
        }
    };

    const donut = document.getElementById('chartPassFail');
    if (donut) {
        donut.style.cursor = 'pointer';
        const data = JSON.parse(donut.dataset.chart || '{}');
        const donutChart = new Chart(donut, {
            type: 'doughnut',
            data: {
                labels: [t('Pass'), t('Fail')],
                datasets: [{
                    data: [data.pass || 0, data.fail || 0],
                    backgroundColor: ['#22c58b', '#ff4d4f'],
                    borderColor: isDark ? '#1e293b' : '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                ...commonOptions,
                cutout: '58%'
            }
        });
        donut.addEventListener('click', (event) => {
            const points = donutChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (!points.length) {
                return;
            }
            const index = points[0].index;
            const result = index === 0 ? 'pass' : 'fail';
            window.location.href = `/testruns.php?result=${encodeURIComponent(result)}`;
        });
    }

    const bar = document.getElementById('chartPriority');
    if (bar) {
        bar.style.cursor = 'pointer';
        const data = JSON.parse(bar.dataset.chart || '{}');
        const barChart = new Chart(bar, {
            type: 'bar',
            data: {
                labels: data.labels || [],
                datasets: [{
                    label: t('High Priority Bugs'),
                    data: data.values || [],
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) {
                            return '#3b82f6';
                        }
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, '#60a5fa');
                        gradient.addColorStop(1, '#2563eb');
                        return gradient;
                    },
                    borderRadius: 10,
                    borderSkipped: false,
                    maxBarThickness: 44
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        ticks: { color: tickColor },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: tickColor },
                        grid: { color: gridColor }
                    }
                }
            }
        });
        bar.addEventListener('click', (event) => {
            const points = barChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (!points.length) {
                return;
            }
            const label = data.labels?.[points[0].index];
            if (!label) {
                return;
            }
            const params = new URLSearchParams({ priority_group: 'high', status: label });
            window.location.href = `/bugs.php?${params.toString()}`;
        });
    }

    const line = document.getElementById('chartTrends');
    if (line) {
        line.style.cursor = 'pointer';
        const data = JSON.parse(line.dataset.chart || '{}');
        const lineChart = new Chart(line, {
            type: 'line',
            data: {
                labels: data.labels || [],
                datasets: [
                    {
                        label: t('Opened'),
                        data: data.opened || [],
                        borderColor: '#ff4d4f',
                        backgroundColor: 'rgba(255, 77, 79, 0.16)',
                        pointBackgroundColor: '#ff4d4f',
                        pointBorderColor: '#ff4d4f',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.35,
                        borderWidth: 3,
                        fill: true
                    },
                    {
                        label: t('Closed'),
                        data: data.closed || [],
                        borderColor: '#22c58b',
                        backgroundColor: 'rgba(34, 197, 139, 0.14)',
                        pointBackgroundColor: '#22c58b',
                        pointBorderColor: '#22c58b',
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        tension: 0.35,
                        borderWidth: 3,
                        fill: true
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: {
                        ticks: { color: tickColor },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: tickColor },
                        grid: { color: gridColor }
                    }
                }
            }
        });
        line.addEventListener('click', (event) => {
            const points = lineChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (!points.length) {
                return;
            }
            const point = points[0];
            const date = data.labels?.[point.index];
            if (!date) {
                return;
            }
            if (point.datasetIndex === 0) {
                window.location.href = `/bugs.php?created_date=${encodeURIComponent(date)}`;
                return;
            }
            window.location.href = `/bugs.php?status=closed&closed_date=${encodeURIComponent(date)}`;
        });
    }
})();

