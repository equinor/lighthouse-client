import { AnalyticsView } from "../../../../packages/Diagrams/src/components/AnalyticsView";

export const AnalyticsTab = () => {


    // const [series, categories] = createSeriesByKeys<Loop>(data as Loop[], "column", "responsible", "status",);
    // const [series2, categories2] = createSeriesByKeys<Loop>(data as Loop[], "line", "status", "responsible");

    // const options2 = {
    //     chart: {
    //         id: "Line",
    //         stacked: false,
    //         toolbar: {
    //             show: true
    //         }
    //     },
    //     plotOptions: {
    //         bar: {
    //             columnWidth: "20%"
    //         }
    //     },
    //     stroke: {
    //         width: [2, 2]
    //     },
    //     colors: ['#36f456', '#1ee9e9', '#9C27B0'],
    //     xaxis: {
    //         categories: categories2,
    //     },
    //     markers: {
    //         size: 1,
    //         strokeWidth: 1,
    //         fillOpacity: 0,
    //         strokeOpacity: 0,
    //         hover: {
    //             size: 8
    //         }
    //     },
    //     yaxis: {
    //         tickAmount: 5,
    //         min: 0,

    //     }
    // };



    return (
        <div style={{ padding: "1rem" }}>
            <h1>Analytics</h1>
            <AnalyticsView />

        </div >
    );
}


{/* <div style={{ display: "flex", flexDirection: "row" }}> */ }

{/* {Object.keys(data[0]).map((key) => <div style={{ padding: "1rem" }}><h5>{key}</h5>{data.filter(i => i[key] === "OS").length}</div>)} */ }

{/* 
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
                /> */}
{/* </div> */ }
