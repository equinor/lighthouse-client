import { useMemo } from 'react';
import { BarChartOptions } from '../Types/barVisualOptions';
import { createSeriesByKeys } from '../Utils/createSeriesByKeys';

interface BarChart {
    barChartOptions: {
        chart: { id: string; stacked: boolean | undefined; toolbar: { show: boolean } };
        plotOptions: { bar: { columnWidth: string; horizontal?: boolean } };
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
    series: string[] | { name: string; type: string; data: number[] }[];
}

export function useHorizontalBarChart<T>(
    data: T[],
    { stacked, nameKey, categoryKey, colors }: BarChartOptions<T>
): BarChart {
    const { series, categories } = useMemo(
        () => createSeriesByKeys(data, 'column', nameKey as string, categoryKey as string),
        [categoryKey, data, nameKey]
    );

    const barChartOptions = useMemo(
        () => ({
            chart: {
                id: 'basic-bar',
                stacked,
                toolbar: {
                    show: true,
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%',
                    horizontal: true,
                },
            },
            stroke: {
                width: [1, 0, 0],
            },
            colors: colors ? colors : ['#F44336', '#E91E63', '#9C27B0'],
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
        [stacked, colors, categories]
    );

    return {
        barChartOptions,
        series,
    };
}
