import { Card, Progress } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { BarChartVisual } from '../Visuals/BarVisual/BarVisual';
import { BarChartOptions } from '../Visuals/BarVisual/Types/barVisualOptions';
import { ControlledTimeBarChart } from '../Visuals/ControledTimeVisual/ControlledTimeVisual';
import { LineChartOptions, LineChartVisual } from '../Visuals/LineVisual/LineChartVisual';
import { TimeChart } from '../Visuals/TimeVisual/TimeVisual';
import { TimeBarChartOptions } from '../Visuals/TimeVisual/Types/timeVisualOptions';

interface BarChart<T> {
    type: 'barChart';
    options: BarChartOptions<T>;
}
interface LineChart<T> {
    type: 'lineChart';
    options: LineChartOptions<T>;
}

interface ControlledTimeBarChart<T> {
    type: 'timeBarChart';
    options: TimeBarChartOptions<T>;
}

interface CustomVisual<T> {
    type: 'customVisual';
    options: CustomVisualOptions<T>
}


interface CustomVisualOptions<T> {
    component: React.FC<{ data: T[] }>;
}
interface Default {
    type: 'default';
}

type Options<T> = BarChart<T> | LineChart<T> | ControlledTimeBarChart<T> | CustomVisual<T> | Default;

interface Section<T> {
    chart1?: Options<T>;
    chart2?: Options<T>;
    chart3?: Options<T>;
}

interface AnalyticsSections<T> {
    section1: Section<T>;
    section2: Section<T>;
    section3: Section<T>;
    section4: Section<T>;
}

export type AnalyticsOptions<T> = Partial<AnalyticsSections<T>>;

export function getSections<T>(options: Partial<AnalyticsOptions<T>>) {
    const section: Section<T> = {
        chart1: { type: 'default' },
        chart2: { type: 'default' },
        chart3: { type: 'default' },
    };
    return {
        section1: section,
        section2: section,
        section3: section,
        section4: section,
        section5: section,
        ...options,
    };
}

// TODO Move all below to components
const WrapperCharts = styled(Card)`
    width: 100%;
    height: 350px;
    margin: 0rem 0.5rem;
    overflow: hidden;
`;
const Loading = styled.p`
    width: 100%;
    height: 350px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Circular = styled(Progress.Circular)`
    padding: 1rem;
`;



export function getChart<T>(data: T[], config: Options<T> = { type: 'default' }, isLoading?: boolean) {

    switch (config.type) {
        case 'barChart':
            return <WrapperCharts>
                {!isLoading ? <BarChartVisual data={data} options={config.options} /> : <Loading> <Circular />Loading...</Loading>}
            </WrapperCharts>
        case 'lineChart':
            return <WrapperCharts>
                {!isLoading ? <LineChartVisual data={data} options={config.options} /> : <Loading> <Circular />Loading...</Loading>}
            </WrapperCharts>
        case 'timeBarChart':
            return <WrapperCharts>
                {!isLoading ? <TimeChart<T> data={data} options={config.options} /> : <Loading> <Circular />Loading...</Loading>}
            </WrapperCharts>
        case "customVisual":
            const Component = config.options.component;
            return <WrapperCharts>
                {!isLoading ? <Component data={data} /> : <Loading> <Circular />Loading...</Loading>}
            </WrapperCharts>
        case 'default':
            return <></>
        default:
            return <></>
    }
}

