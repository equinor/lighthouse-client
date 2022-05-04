import { deref } from '@dbeining/react-atom';
import { useFactory } from '@equinor/DataFactory';
import { Chip, CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useFilterApiContext } from '@equinor/filter';
import { ClickableIcon, Icon } from '@equinor/lighthouse-components';
import { StatusBar } from '@equinor/lighthouse-status-bar';
import { useMemo } from 'react';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import { PerformanceObserver } from '../../../../PerformanceObserver/PerformanceObserver';
import { useDataContext } from '../../Context/DataProvider';
import { useLocationContext } from '../../Context/LocationProvider';
import { useViewerContext } from '../../Context/ViewProvider';
import { useIntervalTimestamp } from '../../Hooks/useIntervalTimestamp';
import { gardenApiAtom } from '../../Tabs/GardenTab';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
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
    TitleBar,
} from './HeaderStyles';

interface CompletionViewHeaderProps {
    title: string;
    tabs: TabsConfigItem[];
}

const ANALYTICS = 'analytics';

export const CompletionViewHeader = ({ title, tabs }: CompletionViewHeaderProps): JSX.Element => {
    const { statusFunc, key, dataApi } = useDataContext();
    const { factory, setSelected } = useFactory(key);
    const {
        hasPowerBi,
        pages,
        setActivePage,
        activePage,
        isFilterActive,
        hasActiveFilters,
        toggleFilter,
    } = useViewerContext();

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
                    <Presets />
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
                        {dataApi.isFetching ? (
                            <CircularProgress size={24} />
                        ) : (
                            <ClickableIcon size={24} name="refresh" />
                        )}
                    </TabButton>

                    {activeTab !== ANALYTICS ? (
                        <TabButton
                            onClick={toggleFilter}
                            aria-selected={isFilterActive}
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
                            onClick={toggleFilter}
                            aria-selected={isFilterActive}
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

export function Presets(): JSX.Element {
    const { presetOptions } = useWorkSpace();

    const { activeTab } = useLocationContext();
    const {
        operations: { setFilterState },
    } = useFilterApiContext();

    function handleClick(presetName: string) {
        const preset = presetOptions?.find(({ name }) => name === presetName);
        if (!preset) return;

        setFilterState(preset.filter.filterGroups);

        switch (preset.type) {
            case 'garden': {
                const gardenApi = deref(gardenApiAtom);
                gardenApi?.mutations.setGardenKey(preset.garden.gardenKey);

                break;
            }

            case 'table': {
                break;
            }
        }
    }

    return (
        <>
            {presetOptions
                ?.filter(({ type }) => type === activeTab)
                .map((x) => (
                    <TabButton
                        aria-selected={false}
                        onClick={() => handleClick(x.name)}
                        key={x.name}
                    >
                        <Chip>{x.name}</Chip>
                    </TabButton>
                ))}
        </>
    );
}
