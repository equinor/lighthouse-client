import { tokens } from '@equinor/eds-tokens';
import { ApexOptions } from 'apexcharts';
import { useMemo, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getSeriesAndCategories, timeChartSeries, TimeDimension } from '../../Utils/createTime';
import { TimeChip, TimeWrapper } from './Styles/Styles';
import { TimeBarChartProps } from './Types/timeVisualOptions';
import { Table, useColumns } from '@equinor/Table';
import { PopupFilter } from '../../../../Filter/Components/PopoutFilter/PopupFilter';
import {
    createSeries,
    renameCats,
    sortCategories,
    createUniqueCategories,
} from '../../Utils/cutoffUtils';
import { WorkOrder } from '../../../../../apps/Construction/mocData/mockData';
import { createAccumulativeSeries } from '../../Utils/accumulativeUtils';
import { openSidesheet } from '../../../../Sidesheet/Functions';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Chart as ReactChart, getDatasetAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    zoomPlugin
);

export const chartoptions: ChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                drag: {
                    enabled: true,
                },
            },
        },
    },

    scales: {
        y: {
            beginAtZero: true,
            position: 'left',
            type: 'linear',
        },
        acc: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                display: false,
            },
            beginAtZero: true,
        },
        xAxis: {
            offset: true,
        },
    },
};
export function TimeChart<T extends unknown>({
    data,
    options: { title, timeChartOptions, colors, defaultTime, accumulative },
}: TimeBarChartProps<T>): JSX.Element {
    const [time, setTime] = useState<TimeDimension>(defaultTime || 'week');
    const cats = sortCategories(createUniqueCategories(data as WorkOrder[]));
    const accumulated = useMemo(
        () => createAccumulativeSeries(data as WorkOrder[], 'createdAt', new Date('07/01/2020')),
        [data]
    );
    const series = useMemo(
        () =>
            createSeries({
                data: data as WorkOrder[],
                cats,
                options: {},
            }),
        [data, cats, accumulative]
    );

    const categories = accumulative ? accumulated.categories : cats;

    const tempData = useMemo(
        () => ({
            labels: categories,
            datasets: [...series],
        }),
        [categories, series]
    );

    const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }
        // W07, W01...
        const dataset = getDatasetAtEvent(chart, event);
        const status = tempData.datasets[dataset[0].datasetIndex].label;
        // category date
        const element = getElementsAtEvent(chart, event);
        const { index } = element[0];
        const categoryDate = tempData.labels![index];
        let showData = [] as WorkOrder[];
        data.forEach((wo) => {
            (wo as WorkOrder).jobStatusCutoffs.forEach((jobStatus) => {
                if (jobStatus.status === status) {
                    if (jobStatus.weeks.includes(categoryDate as string)) {
                        showData.push(wo as WorkOrder);
                    }
                    return;
                }
                return;
            });
        });
        openSidesheet(SidesheetContent, { data: showData });
    };
    const options: ApexOptions = useMemo(
        () => ({
            title: {
                text: title,
                align: 'left',
            },
            chart: {
                id: 'chart2',
                height: 350,
                type: 'line',
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
                events: {
                    click: (event, chartContext, config) => {
                        const categoryClicked =
                            config.config.xaxis.categories[config.dataPointIndex];
                        const catClicked = config.globals.categoryLabels[config.dataPointIndex];
                        const clickedName = config.globals.initialSeries[config.seriesIndex].name;

                        const filtered = data.filter((wo) =>
                            (wo as WorkOrder).jobStatusCutoffs.some(
                                (jobStatus) =>
                                    jobStatus.weeks.indexOf(catClicked) > -1 &&
                                    jobStatus.status === clickedName
                            )
                        );
                        // @ts-ignore
                        if (filtered) openSidesheet(SidesheetContent, { data: filtered });
                    },
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
                categories: categories,

                showAlways: true,
            },
            yaxis: [
                // {
                //     showAlways: true,
                //     opposite: true,
                //     forceNiceScale: false,
                //     title: {
                //         text: 'Accumulative',
                //     },
                // },
                {
                    showAlways: true,
                    forceNiceScale: false,
                    title: {
                        text: `Amount`,
                    },
                },
                // {
                //     showAlways: accumulative,
                //     opposite: true,
                //     forceNiceScale: false,
                //     title: {
                //         text: 'a',
                //     },
                // },
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

    const chartRef = useRef<ChartJS>(null);
    return (
        // <AutoSizer>
        //     {({ width }) => (
        //         <>
        //             <TimeWrapper>
        //                 <TimeChip variant={getVariant('week')} onClick={() => setTime('week')}>
        //                     Week
        //                 </TimeChip>
        //                 <TimeChip variant={getVariant('month')} onClick={() => setTime('month')}>
        //                     Month
        //                 </TimeChip>
        //                 <TimeChip
        //                     variant={getVariant('quarter')}
        //                     onClick={() => setTime('quarter')}
        //                 >
        //                     Quarter
        //                 </TimeChip>
        //                 <TimeChip variant={getVariant('year')} onClick={() => setTime('year')}>
        //                     Year
        //                 </TimeChip>
        //             </TimeWrapper>
        //             {/* <Chart
        //                 options={options}
        //                 series={accumulative ? blahh : series}
        //                 type={accumulative ? 'line' : 'bar'}
        //                 height={`${300}px`}
        //                 width={`${width}px`}
        //             /> */}
        //             <ReactChart
        //                 type="bar"
        //                 ref={chartRef}
        //                 options={chartoptions}
        //                 data={tempData}
        //                 height={300}
        //                 width={`${width}px`}
        //             />
        //         </>
        //     )}
        // </AutoSizer>

        <ReactChart
            type="bar"
            ref={chartRef}
            options={chartoptions}
            data={tempData as ChartData}
            height={400}
            onClick={onClick}
        />
    );
}
interface Props<T> {
    data: T[];
}
function SidesheetContent<T>({ data }: Props<T>) {
    const columns = useColumns(data[0] as any);
    return (
        <div style={{ overflowX: 'scroll' }}>{data && <Table options={{ data, columns }} />}</div>
    );
}
