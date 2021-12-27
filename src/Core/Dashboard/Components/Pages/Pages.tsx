import { AnalyticsView } from '@equinor/Diagrams';
import { useFilter } from '../../../../components/Filter/Hooks/useFilter';
import { DashboardInstance, PageConfig } from '../../Types/State';
import { Page, PageWrapper } from './PagesStyles';

interface PagesProps<T> extends DashboardInstance<T> {
    activePage: string;
}

export function Pages<T>({ pages, activePage }: PagesProps<T>): JSX.Element {
    const { filteredData, isLoading } = useFilter();

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
                                    data={filteredData as T[]}
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
