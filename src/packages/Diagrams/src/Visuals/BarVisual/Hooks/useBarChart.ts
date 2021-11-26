import { useMemo } from 'react';
import { BarChartOptions } from '../Types/barVisualOptions';
import { createSeriesByKeys } from '../Utils/createSeriesByKeys';

export function useBarChart<T>(
    data,
    { stacked, nameKey, categoryKey, colors }: BarChartOptions<T>
) {
    const [series, categories] = useMemo(
        () => createSeriesByKeys(data, 'column', nameKey as string, categoryKey as string),
        [data]
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
        [series, categories]
    );

    return {
        barChartOptions,
        series,
    };
}
