// const statusBarData: StatusItem[] = [
//     {
//         title: "Status OK",
//         value: () => getPercentage(data, "status", "OK"),
//         description: "Status",
//         status: getStatus(data, "status", "OK")
//     },
//     {
//         title: "Status OS",
//         value: () => data.filter(i => i.status === "OS").length.toString(),
//         description: "Status",
//         status: getStatus(data, "status", "OS", true)
//     },
//     {
//         title: "Signed",
//         value: () => getDatePercentage(data, "signedAt"),
//         description: "Status",
//         status: getDateStatus(data, "signedAt")
//     },
//     {
//         title: "Status PB",
//         value: () => data.filter(i => i.status === "PB").length.toString(),
//         description: "Status",
//         status: getStatus(data, "status", "PB", true)
//     },

// ]
// const option5: BarChartOptions<Loop> = {
//     stacked: true,
//     nameKey: "status",
//     categoryKey: "responsible",
//     colors: ['#F44336', '#E91E63', '#9C27B0'],
// }
// const option2: LineChartOptions<Loop> = {
//     nameKey: "status",
//     categoryKey: "phase",
//     colors: ['#F44336', '#E91E63', '#9C27B0'],
// }
// const o2: TimeBarChartOptions<Loop> = {
//     title: "Punch B",
//     timeChartOptions: {
//         categoriesKey: "createdAt",
//         title: "PB",
//         type: 'bar',
//         key: "status",
//         value: "PB"
//         // accenting?: boolean;
//         // filter: (data: SeriesItem) => data.date.includes("2021")

//     },
//     colors: ['#36f4f4', '#fb548c', '#9C27B0', "#eeb752"],
//     //  colors: ['#F44336', '#E91E63', '#9C27B0'],
// }
// const o3: TimeBarChartOptions<Loop> = {
//     title: "Outstanding",
//     timeChartOptions: {
//         categoriesKey: "createdAt",
//         title: "OS",
//         type: 'bar',
//         key: "status",
//         value: "OS"
//         // accenting?: boolean;
//         // filter: (data: SeriesItem) => data.date.includes("2021")

//     },
//     colors: ['#36f4f4', '#fb548c', '#9C27B0', "#eeb752"],
//     //  colors: ['#F44336', '#E91E63', '#9C27B0'],
// }

// const o1: TimeBarChartOptions<Loop> = {
//     title: "Loops Created",
//     timeChartOptions: {
//         categoriesKey: "createdAt",
//         title: "Created",
//         type: 'bar',
//         // key: "status",
//         // value: "PB"
//         // accenting?: boolean;
//         // filter: (data: SeriesItem) => data.date.includes("2021")

//     },
//     colors: ['#36f4f4', '#fb548c', '#9C27B0', "#eeb752"],
//     //  colors: ['#F44336', '#E91E63', '#9C27B0'],
// }

// createCumulativeSeries(data, "column", "createdAt", "status");
