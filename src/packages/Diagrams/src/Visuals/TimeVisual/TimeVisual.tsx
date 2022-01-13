import { tokens } from '@equinor/eds-tokens';
import { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { getSeriesAndCategories, timeChartSeries, TimeDimension } from '../../Utils/createTime';
import { TimeChip, TimeWrapper } from './Styles/Styles';
import { TimeBarChartProps } from './Types/timeVisualOptions';
import { Table, useColumns } from '@equinor/Table';
import ReactDOM from 'react-dom';
import { PopupFilter } from '../../../../Filter/Components/PopoutFilter/PopupFilter';
import {
    createSeries,
    renameCats,
    sortCategories,
    createUniqueCategories,
} from '../../Utils/cutoffUtils';
import { WorkOrder } from '../../../../../apps/Construction/mocData/mockData';
import { createAccumulativeSeries } from '../../Utils/accumulativeUtils';

export function TimeChart<T extends unknown>({
    data,
    options: { title, timeChartOptions, colors, defaultTime, accumulative },
}: TimeBarChartProps<T>): JSX.Element {
    const [time, setTime] = useState<TimeDimension>(defaultTime || 'week');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showData, setShowData] = useState<T[]>();
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
    const wo4series = series.filter((serie) => serie.name === 'W04');
    let a = [{ name: 'wo4', data: [] }] as { name: string; data: number[] }[];
    for (let i = 0; i < accumulated.categories.length; i++) {
        a[0].data.push(wo4series[wo4series.length - 1].data[cats.length - 1]);
    }
    const blahh = accumulated.series.concat(a);
    const categories = renameCats(accumulative ? accumulated.categories : cats);
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
                    // click: (_event, _chartContext, config) => {
                    //     console.log('I clicked!');
                    //     console.log(data);
                    //     MyPortalThing();
                    // },
                    click: (event, chartContext, config) => {
                        setIsOpen(true);

                        const categoryClicked =
                            config.config.xaxis.categories[config.dataPointIndex];
                        const clickedName = config.globals.initialSeries[config.seriesIndex].name;

                        const filtered = data.filter((wo) =>
                            (wo as WorkOrder).jobStatusCutoffs.some(
                                (jobStatus) =>
                                    jobStatus.weeks.indexOf(categoryClicked) > -1 &&
                                    jobStatus.status === clickedName
                            )
                        );
                        debugger;
                        setShowData(filtered);
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
        [cats]
    );

    function getVariant(type: TimeDimension) {
        return time === type ? 'active' : 'default';
    }

    return (
        <>
            <AutoSizer>
                {({ width }) => (
                    <>
                        <TimeWrapper>
                            <TimeChip variant={getVariant('week')} onClick={() => setTime('week')}>
                                Week
                            </TimeChip>
                            <TimeChip
                                variant={getVariant('month')}
                                onClick={() => setTime('month')}
                            >
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
                            series={accumulative ? blahh : series}
                            type={accumulative ? 'line' : 'bar'}
                            height={`${300}px`}
                            width={`${width}px`}
                        />
                    </>
                )}
            </AutoSizer>
            {isOpen && <Something data={showData} setIsOpen={setIsOpen} />}
        </>
    );
}
type SomethingProps<T> = {
    data: T[] | undefined;
    setIsOpen: (value: React.SetStateAction<boolean>) => void;
};
function Something<T>({ data, setIsOpen }: SomethingProps<T>) {
    const columns = useColumns(data ? (data[0] as any) : []);
    const temp = document.getElementById('temp');
    temp!.hidden = false;
    temp!.style.position = 'absolute';
    temp!.style.zIndex = '2';
    temp!.style.background = 'white';
    temp!.style.width = '50%';
    temp!.style.height = '100vh';
    temp!.style.right = '0';
    return ReactDOM.createPortal(
        <div
            style={{
                borderLeft: '1px solid lightgray',
                overflow: 'auto',
                height: '100%',
            }}
        >
            <button
                onClick={() => {
                    setIsOpen(false);
                    temp!.hidden = true;
                }}
            >
                X
            </button>

            <div style={{ height: '100%' }}>{data && <Table options={{ data, columns }} />}</div>
        </div>,
        temp!
    );
}
