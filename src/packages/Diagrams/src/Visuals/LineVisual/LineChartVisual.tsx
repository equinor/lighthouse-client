import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useLineChart } from './Hooks/useLineChart';

export type BarChartProps<T extends Record<PropertyKey, unknown>> = {
    data: T[];
    options: LineChartOptions<T>;
};
export type LineChartOptions<T extends Record<PropertyKey, unknown>> = {
    nameKey: keyof T;
    categoryKey: keyof T;
    colors?: string[];
};

export function LineChartVisual<T extends Record<PropertyKey, unknown>>({
    data,
    options,
}: BarChartProps<T>): JSX.Element {
    const { series, lineChartOptions } = useLineChart(data, options);

    return (
        <AutoSizer>
            {({ width }) => (
                <Chart
                    options={lineChartOptions}
                    series={series}
                    type="line"
                    width={`${width}px`}
                />
            )}
        </AutoSizer>
    );
}
