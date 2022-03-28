import { Chart as ChartJS, ChartData, registerables } from 'chart.js';
import { useRef } from 'react';
import { Chart as ReactChart } from 'react-chartjs-2';
import { SwcrPackage } from '../models/SwcrPackage';
import { ChartOptions } from 'chart.js';
import { CustomVisualArgs } from '../../../packages/Diagrams/src';
import { getLastWeeks } from './graphUtils';
import { createCreatedClosedSeries, createOpenSeries } from './createSeries';
ChartJS.register(...registerables);

export const SwcrGraph = <T extends SwcrPackage>(props: CustomVisualArgs<T>) => {
    const { data, graphType } = props;
    const chartRef = useRef<ChartJS>();
    const categories = getLastWeeks();

    // const series = createCreatedClosedSeries(filteredData, categories);
    const series =
        graphType === 'open'
            ? createOpenSeries(data, categories)
            : createCreatedClosedSeries(data, categories);

    const chartData = {
        labels: categories.map((cat) => `${cat.year}w${cat.weekNumber}`),
        datasets: series,
    };
    return (
        <ReactChart
            type={graphType === 'open' ? 'line' : 'bar'}
            ref={chartRef}
            options={chartoptions()}
            data={chartData as ChartData}
            height={250}
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
