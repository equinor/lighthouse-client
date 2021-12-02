import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { CumulativeSeriesOptions } from '../../types/cumulativeSeriesOptions';
import { cumulativeSeries } from '../../utils/createAccumulativeSeries';

export interface ControlledTimeBarChartProps<T> {
    data: T[];
    options: ControlledTimeBarChartOptions<T>;
}
export interface ControlledTimeBarChartOptions<T> {
    timeChartOptions: CumulativeSeriesOptions<T>;
}

export function ControlledTimeBarChart<T>({
    data,
    options: { timeChartOptions },
}: ControlledTimeBarChartProps<T>): JSX.Element {
    const { series, categories } = useMemo(
        () => cumulativeSeries(data, timeChartOptions),
        [data, timeChartOptions]
    );

    const options: ApexOptions = useMemo(
        () => ({
            chart: {
                id: 'chart2',
                height: 350,

                toolbar: {
                    autoSelected: 'pan',
                    show: false,
                },
                zoom: {
                    enabled: true,
                },
                animations: {
                    enabled: false,
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            dataLabels: {
                enabled: data.length > 500 ? false : true,
                enabledOnSeries: data.length > 500 ? undefined : [1],
            },
            markers: {
                size: data.length > 500 ? 0 : 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '90%',
                },
            },
            stroke: {
                width: [2, 2],
            },
            colors: ['#F44336', '#9C27B0', '#9C27B0'],
            xaxis: {
                type: 'datetime',
                categories,
                showForNullSeries: true,
                showAlways: false,
            },
            yaxis: [
                {
                    title: {
                        text: `ert`,
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: `Cumulative `,
                    },
                },
            ],
            legend: {
                offsetY: 40,
            },
            fill: {
                opacity: 1,
            },
        }),
        [categories, data]
    );

    const optionsLine: ApexOptions = {
        chart: {
            id: 'chart1',
            brush: {
                target: 'chart2',
                enabled: true,
            },
            toolbar: {
                show: false,
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: new Date(moment(new Date()).subtract(30, 'days').calendar()).getTime(),
                },
            },
        },
        colors: ['#008FFB'],
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.5,
            },
        },
        xaxis: {
            type: 'datetime',
            categories,

            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            tickAmount: 1,
            show: false,
        },
    };

    return (
        <AutoSizer>
            {({ width }) => (
                <>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height={`${300}px`}
                        width={`${width}px`}
                    />
                    <Chart
                        options={optionsLine}
                        series={[series[0]]}
                        type="line"
                        height={`${100}px`}
                        width={`${width}px`}
                    />
                </>
            )}
        </AutoSizer>
    );
}
