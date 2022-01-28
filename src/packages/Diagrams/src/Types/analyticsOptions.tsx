import React from 'react';
import { ConstructionGraphOptions } from '..';
import { BarChartOptions } from '../Visuals/BarVisual/Types/barVisualOptions';
import { HorizontalBarChartOptions } from '../Visuals/HorizontalBarVisual/Types/barVisualOptions';
import { LineChartOptions } from '../Visuals/LineVisual/LineChartVisual';
import { TableVisualOptions } from '../Visuals/TableVisual/Types/tableVisualOptions';
import { TimeBarChartOptions } from '../Visuals/TimeVisual/Types/timeVisualOptions';

interface BarChart<T> {
    type: 'barChart';
    options: BarChartOptions<T>;
}
interface LineChart<T> {
    type: 'lineChart';
    options: LineChartOptions<T>;
}

interface ControlledTimeBarChart<T> {
    type: 'timeBarChart';
    options: TimeBarChartOptions<T>;
}

interface ConstructionChart<T> {
    type: 'constructionChart';
    options: ConstructionGraphOptions<T>;
}

interface Table<T> {
    type: 'table';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    options: TableVisualOptions<T>;
}

interface HorizontalBarChart<T> {
    type: 'horizontalBarChart';
    options: HorizontalBarChartOptions<T>;
}

interface CustomVisual<
    T,
    D extends React.ComponentType<CustomVisualArgs<T>> = React.ComponentType<CustomVisualArgs<T>>
> {
    type: 'customVisual';
    component: D;
    options: CustomVisualOptions<D>;
}
export type CustomVisualArgs<T> = {
    data: T[];
    other: {};
};
interface CustomVisualOptions<D extends React.ComponentType<any>> {
    componentProps?: React.ComponentPropsWithoutRef<D>;
}
interface Default {
    type: 'default';
}

export type Options<T> =
    | BarChart<T>
    | LineChart<T>
    | ControlledTimeBarChart<T>
    | CustomVisual<T>
    | HorizontalBarChart<T>
    | Table<T>
    | ConstructionChart<T>
    | Default;

interface Section<T> {
    chart1?: CustomVisual<T>;
    chart2?: CustomVisual<T>;
    chart3?: CustomVisual<T>;
}

interface AnalyticsSections<T> {
    section1: Section<T>;
    section2: Section<T>;
    section3: Section<T>;
    section4: Section<T>;
    section5: Section<T>;
}

export type AnalyticsOptions<T> = Partial<AnalyticsSections<T>>;

export function getSections<T>(options: Partial<AnalyticsOptions<T>>): AnalyticsSections<T> {
    const section: Section<T> = {
        chart1: { type: 'default' },
        chart2: { type: 'default' },
        chart3: { type: 'default' },
    };
    return {
        section1: section,
        section2: section,
        section3: section,
        section4: section,
        section5: section,
        ...options,
    };
}
