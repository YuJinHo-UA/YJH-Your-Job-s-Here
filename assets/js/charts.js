(() => {
    const t = (value) => (window.uiT ? window.uiT(value) : value);
    const bodyStyles = getComputedStyle(document.body);
    const textColor = bodyStyles.getPropertyValue('--text')?.trim() || '#e2e8f0';
    const gridColor = 'rgba(148, 163, 184, 0.18)';
    const isDark = document.body.classList.contains('theme-dark');
    const tickColor = isDark ? 'rgba(226, 232, 240, 0.9)' : textColor;
    const legendColor = isDark ? '#f1f5f9' : '#1f2937';
    const palette = {
        opened: '#ef4444',
        closed: '#3b82f6',
        inProgress: '#22c55e'
    };

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
                    color: legendColor,
                    font: {
                        size: 15,
                        weight: '600'
                    },
                    boxWidth: 14,
                    boxHeight: 14,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 18
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
        const pass = Number(data.pass || 0);
        const fail = Number(data.fail || 0);
        const inProgress = Number(data.in_progress || 0);
        const groups = [
            { label: t('New Bugs'), value: inProgress, result: 'in_progress', color: palette.inProgress },
            { label: t('Closed'), value: pass, result: 'pass', color: palette.closed },
            { label: t('Opened'), value: fail, result: 'fail', color: palette.opened }
        ];
        const total = groups.reduce((sum, group) => sum + group.value, 0);
        const ringBorder = isDark ? '#1a2740' : '#e2e8f0';
        const chartValues = total > 0 ? groups.map((group) => group.value) : [1];
        const chartColors = total > 0 ? groups.map((group) => group.color) : [isDark ? '#334155' : '#cbd5e1'];
        const chartLabels = total > 0 ? groups.map((group) => group.label) : [t('No open tasks.')];

        const donutChart = new Chart(donut, {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartValues,
                    backgroundColor: chartColors,
                    borderColor: ringBorder,
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                ...commonOptions,
                cutout: '56%',
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'bottom',
                        align: 'center',
                        labels: {
                            ...commonOptions.plugins.legend.labels,
                            boxWidth: 14,
                            boxHeight: 14,
                            padding: 16,
                            generateLabels(chart) {
                                if (total <= 0) {
                                    return [{
                                        text: t('No open tasks.'),
                                        fillStyle: chartColors[0],
                                        strokeStyle: chartColors[0],
                                        lineWidth: 0,
                                        hidden: false,
                                        index: 0
                                    }];
                                }
                                const dataset = chart.data.datasets[0];
                                const bg = dataset.backgroundColor || [];
                                return groups.map((group, index) => ({
                                    text: `${group.label}: ${group.value}`,
                                    fillStyle: bg[index] || group.color,
                                    strokeStyle: bg[index] || group.color,
                                    lineWidth: 0,
                                    hidden: false,
                                    index
                                }));
                            }
                        }
                    },
                    tooltip: {
                        ...commonOptions.plugins.tooltip,
                        callbacks: {
                            label(context) {
                                if (total <= 0) return t('No open tasks.');
                                const value = Number(context.raw || 0);
                                const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${groups[context.dataIndex].label}: ${value} (${pct}%)`;
                            }
                        }
                    }
                }
            }
        });
        donut.addEventListener('click', (event) => {
            const points = donutChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (!points.length) {
                return;
            }
            const index = points[0].index;
            const result = groups[index] ? groups[index].result : '';
            if (!result) return;
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
                    backgroundColor: palette.closed,
                    borderRadius: 8,
                    borderSkipped: false,
                    maxBarThickness: 56,
                    barPercentage: 0.62,
                    categoryPercentage: 0.7
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'top',
                        align: 'center'
                    }
                },
                scales: {
                    x: {
                        ticks: { color: tickColor, font: { size: 13, weight: '600' } },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: tickColor, precision: 0, stepSize: 1 },
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
                        borderColor: palette.opened,
                        backgroundColor: 'rgba(239, 68, 68, 0.16)',
                        pointBackgroundColor: palette.opened,
                        pointBorderColor: palette.opened,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.35,
                        borderWidth: 3,
                        fill: true
                    },
                    {
                        label: t('Closed'),
                        data: data.closed || [],
                        borderColor: palette.closed,
                        backgroundColor: 'rgba(59, 130, 246, 0.14)',
                        pointBackgroundColor: palette.closed,
                        pointBorderColor: palette.closed,
                        pointRadius: 4,
                        pointHoverRadius: 6,
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
                        ticks: { color: tickColor, font: { size: 13, weight: '600' } },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: tickColor, font: { size: 13, weight: '600' }, precision: 0 },
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




