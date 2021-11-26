import Chart from "react-apexcharts";
import AutoSizer from "react-virtualized-auto-sizer";
import { useLineChart } from "./Hooks/useLineChart";

export interface BarChartProps<T> {
    data: T[]
    options: LineChartOptions<T>
}
export interface LineChartOptions<T> {
    nameKey: keyof T
    categoryKey: keyof T,
    colors?: string[]
}


export function LineChartVisual<T>({ data, options }: BarChartProps<T>): JSX.Element {
    const { series, lineChartOptions } = useLineChart(data, options)

    return (
        <AutoSizer>
            {(
                { width }) => (
                <Chart
                    options={lineChartOptions}
                    series={series}
                    type="line"
                    width={`${width}px`}
                />
            )}
        </AutoSizer>
    )
}