import { useMemo } from "react";
import Chart from "react-apexcharts";
import AutoSizer from "react-virtualized-auto-sizer";
import { createSeriesByKeys } from "../utils/createSeriesByKeys";

export interface BarChartProps<T> {
    data: T[]
    options: LineChartOptions<T>
}
export interface LineChartOptions<T> {
    nameKey: keyof T
    categoryKey: keyof T,
    colors?: string[]
}


export function LineChart<T>({ data, options: { nameKey, categoryKey } }: BarChartProps<T>): JSX.Element {
    const [series, categories] = useMemo(() => createSeriesByKeys(data, "line", nameKey as string, categoryKey as string), [data]);

    const options = useMemo(() => ({
        chart: {
            id: "basic-line",
            stacked: false,
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "20%"
            }
        },
        stroke: {
            width: [2, 2]
        },
        colors: ['#36f456', '#1ee9e9', '#9C27B0'],
        xaxis: {
            categories,
        },
        markers: {
            size: 1,
            strokeWidth: 1,
            fillOpacity: 0,
            strokeOpacity: 0,
            hover: {
                size: 8
            }
        },
        yaxis: {
            tickAmount: 5,
            min: 0,

        }
    }), [series, categories])

    return (
        <AutoSizer>
            {(
                { width }) => (
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width={`${width}px`}
                />
            )}
        </AutoSizer>
    )
}