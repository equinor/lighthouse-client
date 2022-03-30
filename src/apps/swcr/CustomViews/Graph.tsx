import { Chart as ChartJS, ChartData, registerables } from 'chart.js';
import { useRef } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';
import { SwcrPackage } from '../models/SwcrPackage';
import { ChartOptions } from 'chart.js';
import { CustomVisualArgs } from '../../../packages/Diagrams/src';
import { getLastWeeks, getMonths } from './graphUtils';
import { createAccSeries, createCreatedClosedSeries, createOpenSeries } from './createSeries';
ChartJS.register(...registerables);

export const SwcrGraph = <T extends SwcrPackage>(props: CustomVisualArgs<T>) => {
    const { data, graphType } = props;
    const chartRef = useRef<ChartJS>();
    const categories = getLastWeeks();
    const monthsCategories = getMonths(data);
    const series =
        graphType === 'open'
            ? createOpenSeries(data, categories)
            : graphType === 'acc'
            ? createAccSeries(data, [...monthsCategories])
            : createCreatedClosedSeries(data, categories);

    const chartData = {
        labels:
            graphType === 'open' || graphType === 'created-closed'
                ? categories.map((cat) => `${cat.year}w${cat.weekNumber}`)
                : [...monthsCategories].map((cat) => `${cat.year}m${cat.month}`),
        datasets: series,
    };
    return (
        <ReactChart
            type={graphType === 'open' || graphType === 'acc' ? 'line' : 'bar'}
            ref={chartRef}
            options={chartoptions()}
            data={chartData as ChartData}
            height={200}
        />
    );
};

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
                text: '# of SWCRs',
            },
        },

        xAxis: {
            offset: true,
        },
    },
});
