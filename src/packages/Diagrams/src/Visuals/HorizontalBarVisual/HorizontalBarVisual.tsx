import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { GroupingSelectors } from './Components';
import { useHorizontalBarChart } from './Hooks/useHorizontalBarChart';
import { HorizontalBarChartOptions } from './Types/barVisualOptions';
const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
`;
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
    const dataKeys = data.length > 0 ? Object.keys(data[0]) : [''];

    const handleChange = (selector: 'groupBy' | 'series', selectedItem: keyof T) => {
        selector === 'groupBy' ? setGroupByKey(selectedItem) : setNameByKey(selectedItem);
    };
    useEffect(() => {
        setGroupByKey(options.categoryKey);
        setNameByKey(options.nameKey);
    }, [options.categoryKey, options.nameKey]);

    return (
        <div style={{ paddingBottom: '1em' }}>
            <Title>{options?.title}</Title>
            <GroupingSelectors<T>
                enableGroupBy={options.enableGroupBy}
                options={dataKeys}
                groupByKey={groupByKey}
                seriesKey={nameByKey}
                handleChange={handleChange}
            />
            <Chart options={barChartOptions} series={series} type="bar" height={`${300}px`} />
        </div>
    );
}
