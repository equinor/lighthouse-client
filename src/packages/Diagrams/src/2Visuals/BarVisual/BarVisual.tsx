import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useBarChart } from './Hooks/useBarChart';
import { BarChartOptions } from './Types/barVisualOptions';

interface BarChartVisualProps<T> {
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
 * <BarChartVisual {...{data, options}} />
 *
 *
 * ```
 */
export function BarChartVisual<T>({ data, options }: BarChartVisualProps<T>): JSX.Element {
    const { barChartOptions, series } = useBarChart(data, options);

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
