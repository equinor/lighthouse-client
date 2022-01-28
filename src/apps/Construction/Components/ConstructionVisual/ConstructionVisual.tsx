import { ExoticComponent, useMemo, useRef, useState } from 'react';
import { ConstructionGraphProps } from './Types/constructionVisualOptions';
import { Chart as ChartJS, ChartOptions, ChartData, registerables } from 'chart.js';
import { Chart as ReactChart, getDatasetAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
    createSeries,
    createUniqueCategories,
    renameCategories,
    sortCategories,
} from './Utils/cutoffUtils';
import { TimeDimension } from '../../../../packages/Diagrams/src/Utils/createTime';
import { openSidesheet } from '@equinor/sidesheet';
import { WorkOrder } from '../../mocData/mockData';
import { CustomVisualArgs } from '../../../../packages/Diagrams/src';
ChartJS.register(...registerables, zoomPlugin);

export const chartoptions = (title: string): ChartOptions => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
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
type ConstructionVisualProps = {
    data: WorkOrder[];
    other: {};
};
export const ConstructionVisual = ({ data }: ConstructionVisualProps) => {
    const [time, setTime] = useState<TimeDimension>(defaultTime || 'week');
    const sortedCategories = sortCategories(createUniqueCategories(data as WorkOrder[]));

    const series = useMemo(
        () =>
            createSeries({
                data: data as WorkOrder[],
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
            (wo as WorkOrder).jobStatusCutoffs.forEach((jobStatus) => {
                if (jobStatus.status === status) {
                    const weeks = renameCategories(jobStatus.weeks);
                    if (weeks.includes(categoryDate as string)) {
                        showData.push(wo as WorkOrder);
                    }
                    return;
                }
                return;
            });
        });
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
