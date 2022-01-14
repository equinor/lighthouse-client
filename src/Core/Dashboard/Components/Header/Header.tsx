import { KpiBar } from '@equinor/Kpi';
import { useDashboardDataContext } from '../../Context/DataProvider';
import { PageConfig } from '../../Types/State';
import { ChipTab, TabTitle, Wrapper } from './HeaderStyles';

interface HeaderProps<T> {
    setActivePage: (pageId: string) => void;
    pages: Record<string, PageConfig<T>>;
}

export function Header<T>({ pages, setActivePage }: HeaderProps<T>): JSX.Element {
    const { instance, data } = useDashboardDataContext();
    return (
        <Wrapper>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {instance.kpiBuilder && <KpiBar data={instance.kpiBuilder(data)} />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {Object.values(pages).map((page) => {
                    return (
                        <ChipTab
                            key={`pages-${page.title}`}
                            onClick={() => setActivePage(page.pageId)}
                        >
                            <TabTitle>{page.title}</TabTitle>
                        </ChipTab>
                    );
                })}
            </div>
        </Wrapper>
    );
}
