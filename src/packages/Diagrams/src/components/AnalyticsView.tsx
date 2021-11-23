import { Card } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import { Loop } from "../../../../apps/loopApp";
import { useFilteredData } from "../../../../components/Filter";
import { Status, StatusItem } from "../../../StatusBar/src/components/satusItem/StatusItem";
import { StatusBar } from "../../../StatusBar/src/components/statusBar/StatusBar";
import { BarChartOptions } from "./BarChart";
import { LineChartOptions } from "./LineChart";
import { TimeBarChart, TimeBarChartOptions } from "./TimeBarChart";

const WrapperCharts = styled(Card)`
    width: 100%;
    height: 350px;
    margin: 0rem 0.5rem;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Page = styled.section`
    background-color: ${tokens.colors.ui.background__light.rgba};
    height: 100vh;
    width: 100%;
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
    const option3: TimeBarChartOptions<Loop> = {
        timeChartOptions: {
            categoriesKey: "createdAt",
            title: "Created At",
            type: 'line',
            series: {
                os: {
                    title: "PB",
                    type: "line",
                    key: "status",
                    value: "PB"
                }
            }
            // accenting?: boolean;
            // filter: (data: SeriesItem) => data.date.includes("2021")

        }
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
                    {data?.length && <TimeBarChart<Loop> data={data} options={option3} />}
                </WrapperCharts>
            </Wrapper>
        </Page>
    )
}