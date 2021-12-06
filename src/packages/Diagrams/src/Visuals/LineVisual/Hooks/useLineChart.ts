import { useMemo } from 'react';
import { LineChartOptions } from '../LineChartVisual';
import { createSeriesByKeys } from '../Utils/createSeriesByKeys';

interface LineChart {
    series: string[] | { name: string; type: string; data: number[] }[];
    lineChartOptions: {
        chart: { id: string; stacked: boolean; toolbar: { show: boolean } };
        plotOptions: { bar: { columnWidth: string } };
        stroke: { width: number[] };
        colors: string[];
        xaxis: { categories: string[] | { name: string; type: string; data: number[] }[] };
        markers: {
            size: number;
            strokeWidth: number;
            fillOpacity: number;
            strokeOpacity: number;
            hover: { size: number };
        };
        yaxis: { tickAmount: number; min: number };
    };
}

export function useLineChart<T>(
    data: T[],
    { nameKey, categoryKey }: LineChartOptions<T>
): LineChart {
    const [series, categories] = useMemo(
        () => createSeriesByKeys(data, 'line', nameKey as string, categoryKey as string),
        [categoryKey, data, nameKey]
    );

    const lineChartOptions = useMemo(
        () => ({
            chart: {
                id: 'basic-line',
                stacked: false,
                toolbar: {
                    show: true,
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '20%',
                },
            },
            stroke: {
                width: [2, 2],
            },
            colors: ['#36f456', '#1ee9e9', '#9C27B0'],
            xaxis: {
                categories,
            },
            markers: {
                size: 1,
                strokeWidth: 1,
                fillOpacity: 0,
                strokeOpacity: 0,
                hover: {
                    size: 8,
                },
            },
            yaxis: {
                tickAmount: 5,
                min: 0,
            },
        }),
        [categories]
    );

    return {
        series,
        lineChartOptions,
    };
}
