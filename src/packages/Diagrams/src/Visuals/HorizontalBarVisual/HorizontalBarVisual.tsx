import { useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useHorizontalBarChart } from './Hooks/useHorizontalBarChart';
import { HorizontalBarChartOptions } from './Types/barVisualOptions';
import { GroupingSelectors } from './Components/GroupingSelectors';

interface HorizontalBarVisual<T> {
    data: T[];
    options: HorizontalBarChartOptions<T>;
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
    const [groupByKey, setGroupByKey] = useState<keyof T>(options.categoryKey);
    const [nameByKey, setNameByKey] = useState<keyof T>(options.nameKey);
    const { barChartOptions, series } = useHorizontalBarChart(data, options, groupByKey, nameByKey);
    const dataKeys = data.length > 0 ? Object.keys(data[1]) : [''];

    const handleChange = useCallback(
        (selector: 'groupBy' | 'series', selectedItem: keyof T) => {
            selector === 'groupBy' ? setGroupByKey(selectedItem) : setNameByKey(selectedItem);
        },
        [setGroupByKey, setNameByKey]
    );
    useEffect(() => {
        setGroupByKey(options.categoryKey);
        setNameByKey(options.nameKey);
    }, [options.categoryKey, options.nameKey]);

    return (
        <div style={{ height: 'inherit', overflow: 'scroll' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{options?.title}</div>
            <GroupingSelectors<T>
                enableGroupBy={options.enableGroupBy}
                options={dataKeys}
                groupByKey={groupByKey}
                seriesKey={nameByKey}
                handleChange={handleChange}
            />

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
        </div>
    );
}
