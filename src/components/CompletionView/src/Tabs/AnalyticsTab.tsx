import Chart from "react-apexcharts";
import { Loop } from "../../../../apps/loopApp";
import { useFilteredData } from "../../../Filter";
export const AnalyticsTab = () => {
    const data = useFilteredData()

    const [series, categories] = createSeriesByKeys<Loop>(data as Loop[], "column", "responsible", "status",);
    const [series2, categories2] = createSeriesByKeys<Loop>(data as Loop[], "line", "status", "responsible");

    const options = {
        chart: {
            id: "basic-bar",
            stacked: true,
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
    };
    const options2 = {
        chart: {
            id: "Line",
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
            categories: categories2,
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
    };



    return (
        <div style={{ padding: "1rem" }}>
            <h1>Analytics</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>

                {/* {Object.keys(data[0]).map((key) => <div style={{ padding: "1rem" }}><h5>{key}</h5>{data.filter(i => i[key] === "OS").length}</div>)} */}


                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width="800px"
                />
                <Chart
                    options={options2}
                    series={series2}
                    type="line"
                    width="800px"
                />
            </div>
        </div >
    );
}


function createSeriesByKeys<T>(dataItem: T[], type: string, nameKey: string, categoryKey: string) {
    const categories = dataItem.reduce((acc, item) => {
        acc = acc || []
        const index = acc.findIndex(i => i === item[categoryKey]);
        if (index === -1) {
            acc.push(item[categoryKey])
        }
        return acc;
    }, [] as string[]);

    const names = dataItem.reduce((acc, item) => {
        acc = acc || []
        const index = acc.findIndex(i => i === item[nameKey]);
        if (index === -1) {
            acc.push(item[nameKey])
        }
        return acc;
    }, [] as string[]);

    const result = names.map(name => {
        const data: number[] = []
        categories.forEach(k => {
            data.push(dataItem.filter(i => i[categoryKey] === k && i[nameKey] === name).length);
        })
        return { name, type, data }
    })

    return [result, categories];
}

