import { useMemo } from 'react';
import { LineChartOptions } from '../LineChartVisual';
import { createSeriesByKeys } from '../utils/createSeriesByKeys';

export function useLineChart<T>(data: T[], { nameKey, categoryKey }: LineChartOptions<T>) {
    const [series, categories] = useMemo(
        () => createSeriesByKeys(data, 'line', nameKey as string, categoryKey as string),
        [data]
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
        [series, categories]
    );

    return {
        series,
        lineChartOptions,
    };
}
