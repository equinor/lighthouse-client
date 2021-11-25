import { Card } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import { Loop } from "../../../../apps/loopApp";
import { useFilteredData } from "../../../../components/Filter";
import { Status, StatusItem } from "../../../StatusBar/src/components/satusItem/StatusItem";
import { StatusBar } from "../../../StatusBar/src/components/statusBar/StatusBar";
import { BarChartOptions } from "./BarChart";
import { LineChartOptions } from "./LineChart";
import { TableVisual } from "./TableVisual/TableVisual";
import { TimeChart } from "./TimeVisual/TimeVisual";
import { TimeBarChartOptions } from "./TimeVisual/Types/timeVisualOptions";

const WrapperCharts = styled(Card)`
    width: 100%;
    height: 350px;
    margin: 0rem 0.5rem;
`;
const Wrapper = styled.div`
    display: flex;
    height: auto;
    flex-direction: row;
    margin-bottom: 1rem;
    width: 100%;
    `;

const Page = styled.section`
    background-color: ${tokens.colors.ui.background__light.rgba};
    height: 100%;
    width: 100%;
    margin-bottom: 1rem;
`



function getStatus<T, K extends keyof T>(data: T[], key: K, value: T[K], swap?: boolean): keyof Status {

    const percentage = getPercentageNum(data, key, value);

    if (percentage < 25) {
        return swap ? "ok" : "waring"
    }
    if (percentage > 25 && percentage < 75) {
        return "info"
    }
    if (percentage > 80) {
        return swap ? "waring" : "ok"
    }
    return "default"

}
function getDateStatus<T, K extends keyof T>(data: T[], key: K, swap?: boolean): keyof Status {

    const percentage = data.filter(i => i[key]).length / data.length * 100;
    // console.log(percentage);
    if (percentage < 25) {
        return swap ? "ok" : "waring"
    }
    if (percentage > 25 && percentage < 75) {
        return "info"
    }
    if (percentage > 80) {
        return swap ? "waring" : "ok"
    }
    return "default"

}

function getPercentageNum<T, K extends keyof T>(data: T[], key: K, value: T[K]): number {
    return Math.round(data.filter(i => i[key] === value).length / data.length * 100);
}

function getPercentage<T, K extends keyof T>(data: T[], key: K, value: T[K]): string {
    return (Math.round(data.filter(i => i[key] === value).length / data.length * 100)).toString() + "%";
}
function getDatePercentage<T, K extends keyof T>(data: T[], key: K): string {
    return (Math.round(data.filter(i => i[key]).length / data.length * 100)).toString() + "%";
}



export function AnalyticsView() {
    const data = useFilteredData() as Loop[]

    const statusBarData: StatusItem[] = [
        {
            title: "Status OK",
            value: () => getPercentage(data, "status", "OK"),
            description: "Status",
            status: getStatus(data, "status", "OK")
        },
        {
            title: "Status OS",
            value: () => data.filter(i => i.status === "OS").length.toString(),
            description: "Status",
            status: getStatus(data, "status", "OS")
        },
        {
            title: "Signed",
            value: () => getDatePercentage(data, "signedAt"),
            description: "Status",
            status: getDateStatus(data, "signedAt")
        },
        {
            title: "Status PB",
            value: () => data.filter(i => i.status === "PB").length.toString(),
            description: "Status",
            status: getStatus(data, "status", "PB", true)
        },

    ]
    const option: BarChartOptions<Loop> = {
        stacked: true,
        nameKey: "status",
        categoryKey: "responsible",
        colors: ['#F44336', '#E91E63', '#9C27B0'],
    }
    const option2: LineChartOptions<Loop> = {
        nameKey: "status",
        categoryKey: "phase",
        colors: ['#F44336', '#E91E63', '#9C27B0'],
    }
    const o2: TimeBarChartOptions<Loop> = {
        title: "Punch B",
        timeChartOptions: {
            categoriesKey: "createdAt",
            title: "PB",
            type: 'bar',
            key: "status",
            value: "PB"
            // accenting?: boolean;
            // filter: (data: SeriesItem) => data.date.includes("2021")

        },
        colors: ['#36f4f4', '#fb548c', '#9C27B0', "#eeb752"],
        //  colors: ['#F44336', '#E91E63', '#9C27B0'],
    }
    const o3: TimeBarChartOptions<Loop> = {
        title: "Outstanding",
        timeChartOptions: {
            categoriesKey: "createdAt",
            title: "OS",
            type: 'bar',
            key: "status",
            value: "OS"
            // accenting?: boolean;
            // filter: (data: SeriesItem) => data.date.includes("2021")

        },
        colors: ['#36f4f4', '#fb548c', '#9C27B0', "#eeb752"],
        //  colors: ['#F44336', '#E91E63', '#9C27B0'],
    }

    const o1: TimeBarChartOptions<Loop> = {
        title: "Loops Created",
        timeChartOptions: {
            categoriesKey: "createdAt",
            title: "Created",
            type: 'bar',
            // key: "status",
            // value: "PB"
            // accenting?: boolean;
            // filter: (data: SeriesItem) => data.date.includes("2021")

        },
        colors: ['#36f4f4', '#fb548c', '#9C27B0', "#eeb752"],
        //  colors: ['#F44336', '#E91E63', '#9C27B0'],
    }



    // createCumulativeSeries(data, "column", "createdAt", "status");

    return (
        <Page>
            <StatusBar data={statusBarData} />;
            <Wrapper>
                {/* <WrapperCharts>
                    {data?.length && <BarChart<Loop> data={data} options={option} />}
                </WrapperCharts> */}
                <WrapperCharts>
                    {data?.length && <TimeChart<Loop> data={data} options={o1} />}
                </WrapperCharts>
            </Wrapper>
            <Wrapper>
                <WrapperCharts>
                    {data?.length && <TimeChart<Loop> data={data} options={o2} />}
                </WrapperCharts>
                <WrapperCharts>
                    {data?.length && <TimeChart<Loop> data={data} options={o3} />}
                </WrapperCharts>
            </Wrapper>
            <Wrapper>
                <WrapperCharts>
                    {data?.length && <TableVisual data={data} options={{ initialGroup: "status" }} />}
                </WrapperCharts>
            </Wrapper>
        </Page>
    )
}