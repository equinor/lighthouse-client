import { useMemo } from "react";
import Chart from "react-apexcharts";
import AutoSizer from "react-virtualized-auto-sizer";
import { createSeriesByKeys } from "../utils/createSeriesByKeys";

export interface BarChartProps<T> {
    data: T[]
    options: BarChartOptions<T>
}
export interface BarChartOptions<T> {
    stacked: boolean;
    nameKey: keyof T
    categoryKey: keyof T,
    colors?: string[]
}


export function BarChart<T>({ data, options: { stacked, nameKey, categoryKey } }: BarChartProps<T>): JSX.Element {
    const [series, categories] = useMemo(() => createSeriesByKeys(data, "column", nameKey as string, categoryKey as string), [data]);

    const options = useMemo(() => ({
        chart: {
            id: "basic-bar",
            stacked,
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "80%"
            }
        },
        stroke: {
            width: [1, 0, 0]
        },
        colors: ['#F44336', '#E91E63', '#9C27B0'],
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
                    type="bar"
                    width={`${width}px`}
                />
            )}
        </AutoSizer>
    )
}