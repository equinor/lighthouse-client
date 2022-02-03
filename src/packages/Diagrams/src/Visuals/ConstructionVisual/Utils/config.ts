import { ChartOptions } from 'chart.js';
export enum ChartNames {
    CONTAINERID = 'legend-container',
    WOACC = 'w04-w08 acc',
    ACC = 'accumulated',
    YAXISID = 'acc',
}

export const chartoptions = (title: string): ChartOptions => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        //@ts-ignore
        htmlLegend: {
            containerID: ChartNames.CONTAINERID,
        },
        tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
        },
        title: {
            text: title,
            display: true,
            align: 'start',
            color: 'black',
            font: {
                size: 16,
                family: 'Equinor',
                weight: 'bolder',
            },
        },
        legend: {
            display: false,
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                drag: {
                    enabled: true,
                },
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            position: 'left',
            type: 'linear',
            title: {
                display: true,
                text: 'Bars',
            },
        },
        acc: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Lines',
            },

            grid: {
                display: false,
            },
            beginAtZero: true,
        },
        xAxis: {
            offset: true,
        },
    },
});
