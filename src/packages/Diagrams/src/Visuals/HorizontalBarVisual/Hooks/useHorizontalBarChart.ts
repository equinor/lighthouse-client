import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import { useFilter } from '../../../../../Filter/Hooks/useFilter';
import { HorizontalBarChartOptions } from '../Types/barVisualOptions';
import { createSeriesByKeys } from '../Utils/createSeriesByKeys';

interface BarChart {
    barChartOptions: ApexOptions;
    series: string[] | { name: string; type: string; data: number[] }[];
}

export function useHorizontalBarChart<T>(
    data: T[],
    { stacked, colors, onClick }: HorizontalBarChartOptions<T>,
    groupByKey: keyof T,
    nameByKey: keyof T
): BarChart {
    const { series, categories } = useMemo(
        () => createSeriesByKeys(data, 'column', nameByKey as string, groupByKey as string),
        [groupByKey, data, nameByKey]
    );
    const { filterItemCheck } = useFilter();
    const barChartOptions: ApexOptions = useMemo(
        () => ({
            chart: {
                id: 'basic-bar',
                stacked,
                toolbar: {
                    show: true,
                },
                events: {
                    click: function (_event, _chartContext, config) {
                        // onClick && onClick(data, config, groupByKey);

                        const labelClicked = config.globals.labels[config.dataPointIndex] as string;
                        if (groupByKey === nameByKey) {
                            debugger;
                            filterItemCheck(
                                { checked: true, type: `${groupByKey}`, value: `${labelClicked}` },
                                true
                            );
                        } else {
                            debugger;
                            const seriesClicked = config.globals.seriesNames[config.seriesIndex];
                            console.log('nameBYkey', nameByKey, 'seriesClicked', seriesClicked);
                            console.log('groupbykey', groupByKey, ' labelclicked', labelClicked);
                            filterItemCheck(
                                {
                                    checked: true,
                                    type: `${groupByKey}`,
                                    value: `${labelClicked}`,
                                },

                                true
                            );
                            filterItemCheck(
                                {
                                    checked: true,
                                    type: `${nameByKey}`,
                                    value: `${seriesClicked}`,
                                },
                                true
                            );
                        }

                        // filterItemCheck({ checked: true, type: 'discipline', value: 'N' }, true);
                    },
                },
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
            },

            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            stroke: {
                width: [1, 0, 0],
            },
            colors: colors ? colors : ['#F44336', '#E91E63', '#9C27B0'],
            xaxis: {
                categories,
                columnHeight: '80%',
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
        [stacked, colors, categories, groupByKey, nameByKey]
    );

    return {
        barChartOptions,
        series,
    };
}
