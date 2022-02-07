import { AnalyticsView } from '@equinor/Diagrams';
import { Progress } from '@equinor/eds-core-react';
import { useFilteredData } from '@equinor/filter';
import styled from 'styled-components';
import { useDashboardDataContext } from '../../Context/DataProvider';

import { DashboardInstance, PageConfig } from '../../Types/State';
import { Page, PageWrapper } from './PagesStyles';
const Circular = styled(Progress.Circular)`
    padding: 1rem;
`;
const Loading = styled.p`
    width: 100%;
    height: 350px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
interface PagesProps<T> extends DashboardInstance<T> {
    activePage: string;
}

export function Pages<T>({ pages, activePage }: PagesProps<T>): JSX.Element {
    const { data, isLoading } = useFilteredData<T>();
    const { isLoading: isLoadingData } = useDashboardDataContext();
    if (isLoadingData) {
        return (
            <Loading>
                <Circular />
                Loading..
            </Loading>
        );
    }
    return (
        <PageWrapper>
            {Object.keys(pages).map((key: string) => {
                const page: PageConfig<T> = pages[key];
                if (page.type === 'Custom') {
                    const CustomPageComponent = page.component;
                    return (
                        <Page key={`page-${key}`} style={{ paddingTop: 0 }}>
                            {activePage === page.pageId && <CustomPageComponent />}
                        </Page>
                    );
                }
                if (page.type === 'AnalyticsPage') {
                    return (
                        <Page key={`page-${key}`} style={{ paddingTop: 0 }}>
                            {activePage == page.pageId && (
                                <AnalyticsView<T>
                                    data={data}
                                    isLoading={isLoading}
                                    options={page}
                                />
                            )}
                        </Page>
                    );
                }
            })}
        </PageWrapper>
    );
}
