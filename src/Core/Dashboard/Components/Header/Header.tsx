import { KpiBar } from '@equinor/Kpi';
import { useDashboardDataContext } from '../../Context/DataProvider';
import { PageConfig } from '../../Types/State';
import { HeaderTab, Line, TabTitle, Wrap, Wrapper } from './HeaderStyles';
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
                        <HeaderTab
                            key={`tab-pages-${page.title}`}
                            onClick={() => setActivePage(page.pageId)}
                            active={activePage === page.pageId}
                        >
                            <TabTitle>{page.title}</TabTitle>
                        </HeaderTab>
                    );
                })}
                <Line />
            </Wrap>
        </Wrapper>
    );
}
