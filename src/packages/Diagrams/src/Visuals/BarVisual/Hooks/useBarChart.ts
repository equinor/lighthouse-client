import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import { BarChartOptions } from '../Types/barVisualOptions';
import { createSeriesByKeys } from '../Utils/createSeriesByKeys';

interface BarChart {
    barChartOptions: ApexOptions;
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

    const barChartOptions: ApexOptions = useMemo(
        () => ({
            chart: {
                id: 'basic-bar',
                stacked,
                animations: {
                    enabled: false,
                },
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
        [stacked, colors, categories, data, nameKey, categoryKey]
    );

    return {
        barChartOptions,
        series,
    };
}
