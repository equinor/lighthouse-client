import { KpiBar } from '@equinor/Kpi';
import { useDashboardDataContext } from '../../Context/DataProvider';
import { PageConfig } from '../../Types/State';
import { Line, TabTitle, Wrap, Wrapper } from './HeaderStyles';
import { Tabs } from '@equinor/eds-core-react';
const { Tab } = Tabs;
interface HeaderProps<T> {
    setActivePage: (pageId: string) => void;
    activePage: string;
    pages: Record<string, PageConfig<T>>;
}
export function Header<T>({ pages, setActivePage, activePage }: HeaderProps<T>): JSX.Element {
    const { instance, data } = useDashboardDataContext();
    return (
        <Wrapper>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {instance.kpiBuilder && <KpiBar data={instance.kpiBuilder(data)} />}
            </div>
            <Wrap>
                {Object.values(pages).map((page) => {
                    return (
                        <Tab
                            key={`tab-pages-${page.title}`}
                            onClick={() => setActivePage(page.pageId)}
                            active={activePage === page.pageId}
                            style={{
                                height: '25px',
                            }}
                        >
                            <TabTitle>{page.title}</TabTitle>
                        </Tab>
                    );
                })}
                <Line />
            </Wrap>
        </Wrapper>
    );
}
