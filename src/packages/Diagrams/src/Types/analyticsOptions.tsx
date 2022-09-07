import { BarChartOptions } from '../Visuals/BarVisual/Types/barVisualOptions';
import { HorizontalBarChartOptions } from '../Visuals/HorizontalBarVisual/Types/barVisualOptions';
import { LineChartOptions } from '../Visuals/LineVisual/LineChartVisual';
import { TableVisualOptions } from '../Visuals/TableVisual/Types/tableVisualOptions';
import { TimeBarChartOptions } from '../Visuals/TimeVisual/Types/timeVisualOptions';

type BarChart<T extends Record<PropertyKey, unknown>> = {
    type: 'barChart';
    options: BarChartOptions<T>;
};
type LineChart<T extends Record<PropertyKey, unknown>> = {
    type: 'lineChart';
    options: LineChartOptions<T>;
};

type ControlledTimeBarChart<T extends Record<PropertyKey, unknown>> = {
    type: 'timeBarChart';
    options: TimeBarChartOptions<T>;
};

type Table<T extends Record<PropertyKey, unknown>> = {
    type: 'table';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    options: TableVisualOptions<T>;
};

type HorizontalBarChart<T extends Record<PropertyKey, unknown>> = {
    type: 'horizontalBarChart';
    options: HorizontalBarChartOptions<T>;
};

type CustomVisual<T extends Record<PropertyKey, unknown>> = {
    type: 'customVisual';
    options: CustomVisualOptions<T>;
};
export type CustomVisualArgs<T extends Record<PropertyKey, unknown>> = {
    data: T[];
    [x: string]: unknown;
};
type CustomVisualOptions<T extends Record<PropertyKey, unknown>> = {
    component: React.ComponentType<CustomVisualArgs<T>>;
    componentProps?: { [x: string]: unknown };
};
type Default = {
    type: 'default';
};

export type Options<T extends Record<PropertyKey, unknown>> =
    | BarChart<T>
    | LineChart<T>
    | ControlledTimeBarChart<T>
    | CustomVisual<T>
    | HorizontalBarChart<T>
    | Table<T>
    | Default;

type Section<T extends Record<PropertyKey, unknown>> = {
    chart1?: Options<T>;
    chart2?: Options<T>;
    chart3?: Options<T>;
};

type AnalyticsSections<T extends Record<PropertyKey, unknown>> = {
    section1: Section<T>;
    section2: Section<T>;
    section3: Section<T>;
    section4: Section<T>;
    section5: Section<T>;
};

export type AnalyticsOptions<T extends Record<PropertyKey, unknown>> = Partial<
    AnalyticsSections<T>
>;

export function getSections<T extends Record<PropertyKey, unknown>>(
    options: Partial<AnalyticsOptions<T>>
): AnalyticsSections<T> {
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
