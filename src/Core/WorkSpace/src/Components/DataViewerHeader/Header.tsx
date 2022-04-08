import { useFactory } from '@equinor/DataFactory';
import { CircularProgress, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';
import { ClickableIcon } from '../../../../../components/Icon/ClickableIcon';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import Icon from '../../../../../components/Icon/Icon';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { StatusBar } from '../../../../../packages/StatusBar';
import { PerformanceObserver } from '../../../../PerformanceObserver/PerformanceObserver';
import { useDataContext } from '../../Context/DataProvider';
import { useLocationContext } from '../../Context/LocationProvider';
import { useViewerContext } from '../../Context/ViewProvider';
import { useIntervalTimestamp } from '../../Hooks/useIntervalTimestamp';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
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

const { List } = Tabs;

type VoidFunction = () => void;

interface CompletionViewHeaderProps {
    title: string;
    tabs: TabsConfigItem[];
    handleFilter: VoidFunction;
    activeFilter: boolean;
}

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
                    {activeTab !== 'PowerBi' ? (
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
                                onClick={() => handleSetActiveTab('PowerBi')}
                                aria-selected={activeTab === 'PowerBi'}
                                title={'Power Bi'}
                            >
                                <Icon name={'bar_chart'} />
                            </TabButton>
                            <Divider />
                        </>
                    )}

                    <>
                        {tabs.map((tab) => {
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
                                : 'grey'
                        }
                        aria-selected={false}
                        title={
                            dataApi?.isStale
                                ? 'This data is over 1 hour old and might be outdated'
                                : `Updated: ${timestamp}`
                        }
                        onClick={() => dataApi.refetch()}
                    >
                        {dataApi?.isFetching ? (
                            <CircularProgress size={24} />
                        ) : (
                            <ClickableIcon size={24} name="refresh" />
                        )}
                    </TabButton>

                    {activeTab !== 'PowerBi' ? (
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
