import { BarChartOptions } from '../2Visuals/BarVisual/Types/barVisualOptions';
import { ControlledTimeBarChart } from '../2Visuals/ControledTimeVisual/ControlledTimeVisual';
import { LineChartOptions } from '../2Visuals/LineVisual/LineChartVisual';
import { TimeBarChartOptions } from '../2Visuals/TimeVisual/Types/timeVisualOptions';

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

interface CustomVisual<T> {
    type: 'customVisual';
    options: CustomVisualOptions<T>;
}

interface CustomVisualOptions<T> {
    component: React.FC<{ data: T[] }>;
}
interface Default {
    type: 'default';
}

export type Options<T> =
    | BarChart<T>
    | LineChart<T>
    | ControlledTimeBarChart<T>
    | CustomVisual<T>
    | Default;

interface Section<T> {
    chart1?: Options<T>;
    chart2?: Options<T>;
    chart3?: Options<T>;
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
