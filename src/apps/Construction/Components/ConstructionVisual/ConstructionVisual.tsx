import { useMemo, useRef, useState } from 'react';
import { Chart as ChartJS, ChartOptions, ChartData, registerables } from 'chart.js';
import { Chart as ReactChart, getDatasetAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
    createSeries,
    createUniqueCategories,
    renameCategories,
    sortCategories,
} from './Utils/cutoffUtils';
import { openSidesheet } from '@equinor/sidesheet';
import { WorkOrder } from './Types';
import { CustomVisualArgs, TimeDimension } from '@equinor/Diagrams';
import { SidesheetContent } from '../SidesheetContent';
ChartJS.register(...registerables, zoomPlugin);

export const chartoptions = (title?: string): ChartOptions => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
        },
        title: {
            text: title || '',
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
            position: 'bottom',
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

type ConstructionVisualProps = CustomVisualArgs<WorkOrder> & {
    accumulative?: boolean;
    defaultTime?: TimeDimension;
    title?: string;
};
export const ConstructionVisual = ({
    data,
    accumulative,
    defaultTime,
    title,
}: ConstructionVisualProps) => {
    const [time, setTime] = useState<TimeDimension>(defaultTime || 'week');
    const sortedCategories = sortCategories(createUniqueCategories(data));

    const series = useMemo(
        () =>
            createSeries({
                data: data,
                categories: sortedCategories,
                options: {},
            }),
        [data, sortedCategories, accumulative]
    );

    const renamedCategories = renameCategories(sortedCategories);

    const chartData = useMemo(
        () => ({
            labels: renamedCategories,
            datasets: [...series],
        }),
        [renamedCategories, series]
    );

    const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }
        // W07, W01...
        const dataset = getDatasetAtEvent(chart, event);
        const status = chartData.datasets[dataset[0].datasetIndex].label;
        // category date
        const element = getElementsAtEvent(chart, event);
        const { index } = element[0];
        const categoryDate = chartData.labels![index];
        let showData = [] as WorkOrder[];
        data.forEach((wo) => {
            wo.jobStatusCutoffs.forEach((jobStatus) => {
                if (jobStatus.status === status) {
                    const weeks = renameCategories(jobStatus.weeks);
                    if (weeks.includes(categoryDate)) {
                        showData.push(wo);
                    }
                    return;
                }
                return;
            });
        });
        openSidesheet(SidesheetContent, { data: showData });
    };

    function getVariant(type: TimeDimension) {
        return time === type ? 'active' : 'default';
    }

    const chartRef = useRef<ChartJS>(null);
    return (
        <ReactChart
            type="bar"
            ref={chartRef}
            options={chartoptions(title)}
            data={chartData as ChartData}
            height={400}
            onClick={onClick}
        />
    );
};
