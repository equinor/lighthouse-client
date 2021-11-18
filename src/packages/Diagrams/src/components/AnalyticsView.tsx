import { Card } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import { Loop } from "../../../../apps/loopApp";
import { useFilteredData } from "../../../../components/Filter";
import { StatusItem } from "../../../StatusBar/src/components/satusItem/StatusItem";
import { StatusBar } from "../../../StatusBar/src/components/statusBar/StatusBar";
import { BarChart, BarChartOptions } from "./BarChart";
import { LineChart, LineChartOptions } from "./LineChart";

const WrapperCharts = styled(Card)`
    width: 100%;
    height: 350px;
    margin: 0rem 1rem;
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


export const statusBarData: StatusItem[] = [
    {
        title: "Status",
        value: () => "50%",
        description: "This is not good!",
        status: "waring"
    },
    {
        title: "Home",
        value: () => "60%",
        description: "Im about way there.",
        status: "ok"
    },
    {
        title: "Status",
        value: () => "1",
        description: "This is not good!",
        status: "info"
    },
    {
        title: "Signed",
        value: () => "5344",
        description: "This is not good!",
        status: "default"
    }
]

export function AnalyticsView() {
    const data = useFilteredData() as Loop[]
    const option: BarChartOptions<Loop> = {
        stacked: true,
        nameKey: "responsible",
        categoryKey: "status",
        colors: ['#F44336', '#E91E63', '#9C27B0'],
    }
    const option2: LineChartOptions<Loop> = {
        nameKey: "status",
        categoryKey: "phase",
        colors: ['#F44336', '#E91E63', '#9C27B0'],
    }

    return (
        <Page>
            <StatusBar data={statusBarData} />;
            <Wrapper>
                <WrapperCharts>
                    {data?.length && <BarChart<Loop> data={data} options={option} />}
                </WrapperCharts>
                <WrapperCharts>
                    {data?.length && <LineChart<Loop> data={data} options={option2} />}
                </WrapperCharts>
            </Wrapper>
        </Page>
    )
}