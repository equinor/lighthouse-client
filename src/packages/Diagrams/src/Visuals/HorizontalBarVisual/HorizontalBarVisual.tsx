import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useHorizontalBarChart } from './Hooks/useHorizontalBarChart';
import { BarChartOptions } from './Types/barVisualOptions';

interface HorizontalBarVisual<T> {
    data: T[];
    options: BarChartOptions<T>;
}

/**
 * A Simple BarChart Visual
 *
 * Exported Options from barChartVisual
 * ```
 *  interface BarChartOptions<T> {
 *  stacked: boolean;
 *  nameKey: keyof T;
 *  categoryKey: keyof T;
 *  colors?: string[];
 * ```
 *
 * usage:
 * ```
 * interface DataItem {
 *  id: string
 *  name: string
 *  date: string
 *  value: number
 *  description: string
 * }
 *
 * const data: DataItem[] = [...]
 *
 * const options: BarChartOptions<DataItem> = {
 *   stacked: true,
 *   nameKey: "name",
 *   categoryKey: "value",
 *   colors: ["#ff3400"]
 * }
 *
 * <HorizontalBarVisual {...{data, options}} />
 *
 *
 * ```
 */
export function HorizontalBarVisual<T>({ data, options }: HorizontalBarVisual<T>): JSX.Element {
    const { barChartOptions, series } = useHorizontalBarChart(data, options);

    return (
        <AutoSizer>
            {({ width }) => (
                <Chart
                    options={barChartOptions}
                    series={series}
                    type="bar"
                    height={`${300}px`}
                    width={`${width}px`}
                />
            )}
        </AutoSizer>
    );
}
