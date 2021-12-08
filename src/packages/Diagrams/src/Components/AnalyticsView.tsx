import { useMemo } from 'react';
import { AnalyticsOptions, getSections } from '../Types';
import { Page, Wrapper } from './analyticsViewStyles';
import { getChart } from './GetCharts';

export interface AnalyticsViewProps<T> {
    data: T[];
    isLoading?: boolean;
    options: AnalyticsOptions<T>;
}

export function AnalyticsView<T>({ isLoading, data, options }: AnalyticsViewProps<T>): JSX.Element {
    const sections = useMemo(() => getSections(options), [options]);

    return (
        <Page>
            <Wrapper>
                {getChart(data, sections.section1.chart1, isLoading)}
                {getChart(data, sections.section1.chart2, isLoading)}
                {getChart(data, sections.section1.chart3, isLoading)}
            </Wrapper>
            <Wrapper>
                {getChart(data, sections.section2.chart1, isLoading)}
                {getChart(data, sections.section2.chart2, isLoading)}
                {getChart(data, sections.section2.chart3, isLoading)}
            </Wrapper>
            <Wrapper>
                {getChart(data, sections.section3.chart1, isLoading)}
                {getChart(data, sections.section3.chart2, isLoading)}
                {getChart(data, sections.section3.chart3, isLoading)}
            </Wrapper>
            <Wrapper>
                {getChart(data, sections.section4.chart1, isLoading)}
                {getChart(data, sections.section4.chart2, isLoading)}
                {getChart(data, sections.section4.chart3, isLoading)}
            </Wrapper>
            <Wrapper>
                {getChart(data, sections.section5.chart1, isLoading)}
                {getChart(data, sections.section5.chart2, isLoading)}
                {getChart(data, sections.section5.chart3, isLoading)}
            </Wrapper>
        </Page>
    );
}
