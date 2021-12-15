import { useMemo } from 'react';
import { BarChartOptions } from '../Types/barVisualOptions';
import { createSeriesByKeys } from '../Utils/createSeriesByKeys';

interface BarChart {
    barChartOptions: {
        chart: { id: string; stacked: boolean | undefined; toolbar: { show: boolean } };
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
    series: string[] | { name: string; type: string; data: number[] }[];
}

export function useBarChart<T>(
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
                events: {
                    click: function (event, chartContext, config) {
                        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                        console.log(config.globals.labels[config.dataPointIndex]);
                        console.log(config.globals.initialSeries[config.seriesIndex]);
                        console.log(
                            data.filter(
                                (d) =>
                                    d[nameKey] ===
                                        config.globals.initialSeries[config.seriesIndex].name &&
                                    d[categoryKey] === config.globals.labels[config.dataPointIndex]
                            )
                        );
                        // console.log(event, chartContext, config);
                    },
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%',
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
