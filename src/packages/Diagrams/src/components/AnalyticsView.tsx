import styled from "styled-components";
import { Loop } from "../../../../apps/loopApp";
import { useFilteredData } from "../../../../components/Filter";
import { BarChart, BarChartOptions } from "./BarChart";
import { LineChart, LineChartOptions } from "./LineChart";

const WrapperCharts = styled.div`
    width: 45%;
    height: 500px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;


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
        <Wrapper>
            <WrapperCharts>
                <BarChart<Loop> data={data} options={option} />
            </WrapperCharts>
            <WrapperCharts>
                <LineChart<Loop> data={data} options={option2} />
            </WrapperCharts>
        </Wrapper>
    )
}