import { tokens } from '@equinor/eds-tokens';
import { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { timeChartSeries, TimeDimension } from '../../Utils/createTime';
import { TimeChip, TimeWrapper } from './Styles/Styles';
import { TimeBarChartProps } from './Types/timeVisualOptions';

export function TimeChart<T>({
    data,
    options: { title, timeChartOptions, colors, defaultTime },
}: TimeBarChartProps<T>): JSX.Element {
    const [time, setTime] = useState<TimeDimension>(defaultTime || 'month');
    const { series, categories } = useMemo(
        () => timeChartSeries(data, timeChartOptions, time),
        [data, time]
    );

    const options: ApexOptions = useMemo(
        () => ({
            title: {
                text: title,
                align: 'left',
            },
            chart: {
                id: 'chart2',
                height: 350,
                // title: timeChartOptions.title,
                // type: 'line',
                toolbar: {
                    // autoSelected: 'pan',
                    show: true,
                },
                zoom: {
                    enabled: true,
                    // type: 'x',

                    // zoomedArea: {
                    //     fill: {
                    //         color: '#90CAF9',
                    //         opacity: 0.4
                    //     },
                    //     stroke: {
                    //         color: '#0D47A1',
                    //         opacity: 0.4,
                    //         width: 1
                    //     }
                    // }
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
                enabled: data.length > 10 ? false : true,
                enabledOnSeries: data.length > 10 ? undefined : [1],
            },
            markers: {
                size: data.length > 10 ? 0 : 1,
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
            colors: colors
                ? colors
                : [
                    tokens.colors.infographic.substitute__blue_sky.hex,
                    tokens.colors.infographic.primary__moss_green_100.hex,
                ],
            xaxis: {
                type: 'category',
                tickPlacement: 'on',
                categories,

                showAlways: true,
            },
            yaxis: [
                {
                    showAlways: true,
                    forceNiceScale: false,
                    title: {
                        text: `Amount`,
                    },
                },
                {
                    opposite: true,
                    showAlways: true,
                    forceNiceScale: false,
                    // reversed: true,
                    title: {
                        text: `Cumulative `,
                    },
                },
            ],
            legend: {
                // position: 'right',
                horizontalAlign: 'right',
                // offsetY: 40
            },
            fill: {
                opacity: 1,
            },
        }),
        [categories]
    );

    function getVariant(type: TimeDimension) {
        return time === type ? 'active' : 'default';
    }

    return (
        <AutoSizer>
            {({ width }) => (
                <>
                    <TimeWrapper>
                        <TimeChip variant={getVariant('week')} onClick={() => setTime('week')}>
                            Week
                        </TimeChip>
                        <TimeChip variant={getVariant('month')} onClick={() => setTime('month')}>
                            Month
                        </TimeChip>
                        <TimeChip
                            variant={getVariant('quarter')}
                            onClick={() => setTime('quarter')}
                        >
                            Quarter
                        </TimeChip>
                        <TimeChip variant={getVariant('year')} onClick={() => setTime('year')}>
                            Year
                        </TimeChip>
                    </TimeWrapper>
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height={`${300}px`}
                        width={`${width}px`}
                    />
                </>
            )}
        </AutoSizer>
    );
}
