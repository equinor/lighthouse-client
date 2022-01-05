import { AnalyticsView } from '@equinor/Diagrams';
import { useFilteredData } from '@equinor/filter';
import { DashboardInstance, PageConfig } from '../../Types/State';
import { Page, PageWrapper } from './PagesStyles';

interface PagesProps<T> extends DashboardInstance<T> {
    activePage: string;
}

export function Pages<T>({ pages, activePage }: PagesProps<T>): JSX.Element {
    const { data, isLoading } = useFilteredData<T>();

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
