import React, { useMemo, useRef, useState } from 'react';
import { ConstructionGraphProps } from '../Types/constructionVisualOptions';
import { Chart as ChartJS, ChartData, registerables } from 'chart.js';
import { Chart as ReactChart, getDatasetAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { htmlLegendPlugin } from '../Utils/htmlLegendPlugin';
import { ChartNames, chartoptions } from '../Utils/config';
import { createSeries, createUniqueCategories, renameCategories, sortCategories } from '../Utils';
import { WorkOrder } from '../../../Types';
import { openSidesheet } from '@equinor/sidesheet';
import { TimeDimension } from '@equinor/Diagrams';
import { SidesheetContent } from '../../SidesheetContent';
ChartJS.register(...registerables, zoomPlugin);

export function Graph<T extends unknown>({
    data,
    title,
    defaultTime,
}: ConstructionGraphProps<T>): JSX.Element {
    const [time, setTime] = useState<TimeDimension>(defaultTime || 'week');

    const chartRef = useRef<ChartJS>(null);

    const sortedCategories = sortCategories(createUniqueCategories(data as WorkOrder[]));

    const series = useMemo(
        () =>
            createSeries({
                data: data as WorkOrder[],
                categories: sortedCategories,
                options: {},
            }),
        [data, sortedCategories]
    );

    const renamedCategories = renameCategories(sortedCategories);

    const chartData = useMemo(
        () => ({
            labels: renamedCategories,
            datasets: [...series],
        }),
        [renamedCategories, series]
    );

    const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { current: chart } = chartRef;

        if (!chart) {
            return;
        }
        // W07, W01...
        const dataset = getDatasetAtEvent(chart, event);
        const status = chartData.datasets[dataset[0].datasetIndex].label;
        // category date
        const element = getElementsAtEvent(chart, event);
        const { index } = element[0];
        const categoryDate = chartData.labels![index];
        let showData = [] as WorkOrder[];
        data.forEach((wo) => {
            (wo as WorkOrder).jobStatusCutoffs.forEach((jobStatus) => {
                if (jobStatus.status === status) {
                    const weeks = renameCategories(jobStatus.weeks);
                    if (weeks.includes(categoryDate as string)) {
                        showData.push(wo as WorkOrder);
                    }
                    return;
                }
                return;
            });
        });
        openSidesheet(SidesheetContent, { data: showData });
    };

    function getVariant(type: TimeDimension) {
        return time === type ? 'active' : 'default';
    }

    return (
        <div style={{ height: '300px' }}>
            <ReactChart
                type="bar"
                ref={chartRef}
                options={chartoptions(title)}
                data={chartData as ChartData}
                onClick={onClick}
                height={250}
                plugins={[htmlLegendPlugin]}
            />
            <div id={ChartNames.CONTAINERID}></div>
        </div>
    );
}
