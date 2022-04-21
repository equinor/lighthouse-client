import { useFactory } from '@equinor/DataFactory';
import { tokens } from '@equinor/eds-tokens';
import { useFilterApiContext } from '@equinor/filter';
import { Icon } from '@equinor/lighthouse-components';
import { StatusBar } from '@equinor/lighthouse-status-bar';
import { useMemo } from 'react';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import { PerformanceObserver } from '../../../../PerformanceObserver/PerformanceObserver';
import { useDataContext } from '../../Context/DataProvider';
import { useLocationContext } from '../../Context/LocationProvider';
import { useViewerContext } from '../../Context/ViewProvider';
import { useIntervalTimestamp } from '../../Hooks/useIntervalTimestamp';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { TabButton } from '../ToggleButton';
import {
    ActionBar,
    Divider,
    FillSection,
    HeaderWrapper,
    LeftSection,
    RightSection,
    TabTitle,
    Title,
    TitleBar
} from './HeaderStyles';

type VoidFunction = () => void;

interface CompletionViewHeaderProps {
    title: string;
    tabs: TabsConfigItem[];
    handleFilter: VoidFunction;
    activeFilter: boolean;
}

const PRIMARY_INTERACTIVE = tokens.colors.interactive.primary__resting.hex;
const ANALYTICS = 'analytics';

export const CompletionViewHeader = ({
    title,
    tabs,
    handleFilter,
    activeFilter,
}: CompletionViewHeaderProps): JSX.Element => {
    const { statusFunc, key, dataApi } = useDataContext();
    const { factory, setSelected } = useFactory(key);
    const { hasPowerBi, pages, setActivePage, activePage, hasActiveFilters, togglePowerBIFilter } =
        useViewerContext();

    const { handleSetActiveTab, activeTab } = useLocationContext();

    const {
        filterState: { getFilteredData, checkHasActiveFilters },
    } = useFilterApiContext();

    const data = getFilteredData();
    const timestamp = useIntervalTimestamp(dataApi?.dataUpdatedAt);

    const statusItems = useMemo(() => statusFunc && statusFunc(data), [data, statusFunc, key]);

    return (
        <HeaderWrapper>
            <TitleBar>
                <Title variant="h3">{title}</Title>
                <PerformanceObserver />
            </TitleBar>
            <ActionBar>
                <LeftSection>
                    {activeTab !== ANALYTICS ? (
                        <FillSection>
                            <StatusBar statusItems={statusItems} />
                        </FillSection>
                    ) : (
                        <>
                            {pages.map((page) => {
                                return (
                                    <TabButton
                                        aria-selected={
                                            (activePage?.pageId &&
                                                page.pageId === activePage.pageId &&
                                                page.pageTitle === page.pageTitle) ||
                                            false
                                        }
                                        key={`pages-${page.pageId}`}
                                        onClick={() => setActivePage(page)}
                                    >
                                        <TabTitle>{page.pageTitle}</TabTitle>
                                    </TabButton>
                                );
                            })}
                            <FillSection />
                        </>
                    )}
                </LeftSection>
                <RightSection>
                    {factory && (
                        <>
                            <TabButton
                                onClick={setSelected}
                                aria-selected={false}
                                title={factory.title}
                            >
                                <Icon name={'add'} />
                                {factory.title}
                            </TabButton>
                            <Divider />
                        </>
                    )}

                    {hasPowerBi && (
                        <>
                            <TabButton
                                onClick={() => handleSetActiveTab(ANALYTICS)}
                                aria-selected={activeTab === ANALYTICS}
                                title={'Power Bi analytics'}
                            >
                                <Icon name={'bar_chart'} />
                            </TabButton>
                            <Divider />
                        </>
                    )}

                    <>
                        {tabs.map((tab) => {
                            if (tab.tabId === ANALYTICS) return;
                            const Icon = tab.icon;
                            return (
                                <TabButton
                                    onClick={() => handleSetActiveTab(tab.tabId)}
                                    key={`tab-${tab.icon}`}
                                    aria-selected={activeTab === tab.tabId}
                                    title={tab.title}
                                >
                                    <Icon />
                                </TabButton>
                            );
                        })}
                    </>
                    <Divider />
                    {/* <SearchButton /> */}

                    <TabButton
                        color={
                            dataApi?.isStale
                                ? tokens.colors.infographic.primary__energy_red_100.hex
                                : PRIMARY_INTERACTIVE
                        }
                        aria-selected={false}
                        title={
                            dataApi?.isStale
                                ? 'This data is over 1 hour old and might be outdated'
                                : `Updated: ${timestamp}`
                        }
                        onClick={() => dataApi.refetch()}
                    />

                    {activeTab !== ANALYTICS ? (
                        <TabButton
                            onClick={handleFilter}
                            aria-selected={activeFilter}
                            title="Filter"
                        >
                            {checkHasActiveFilters() ? (
                                <FilterFilled />
                            ) : (
                                <Icon name={'filter_alt'} />
                            )}
                        </TabButton>
                    ) : (
                        <TabButton
                            onClick={togglePowerBIFilter}
                            aria-selected={activeFilter}
                            title="PowerBi Filter"
                        >
                            {hasActiveFilters ? <FilterFilled /> : <Icon name={'filter_alt'} />}
                        </TabButton>
                    )}
                </RightSection>
            </ActionBar>
        </HeaderWrapper>
    );
};
