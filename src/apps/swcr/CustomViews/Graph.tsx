import { Chart as ChartJS, registerables } from 'chart.js';
import { DateTime } from 'luxon';
import { useRef } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';
import { weekDiff } from '../../Construction/Utils';
import { SwcrPackage } from '../models/SwcrPackage';
import { createSeries } from './__tests__/createSeries.test';
ChartJS.register(...registerables);

export const SwcrGraph = <T extends SwcrPackage>(props: CustomVisualArgs<T>) => {
    const { data } = props;
    const chartRef = useRef<ChartJS>();
    const filteredData = data.filter((swcr) => weekDiff(new Date(swcr.updatedAtDate)).weeks >= -20);
    const categories = getLastWeeks();

    const series = createSeries(filteredData);

    const chartData = {
        labels: categories,
        datasets: [...series],
    };
    return (
        <ReactChart
            type="bar"
            ref={chartRef}
            options={chartoptions()}
            data={chartData}
            height={250}
        />
    );
};
import { ChartOptions } from 'chart.js';
import { CustomVisualArgs } from '../../../packages/Diagrams/src';

export const chartoptions = (title?: string): ChartOptions => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        //@ts-ignore

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
            display: true,
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

        xAxis: {
            offset: true,
        },
    },
});
