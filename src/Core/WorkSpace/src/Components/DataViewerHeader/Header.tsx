import { BookmarkDropdown } from '@equinor/BookmarksManager';
import { CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useFilterApiContext } from '@equinor/filter';
import { ClickableIcon, Icon } from '@equinor/lighthouse-components';
import { useDataCreator } from '@equinor/lighthouse-fusion-modules';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { StatusBar } from '@equinor/lighthouse-status-bar';
import { useMemo } from 'react';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import { PerformanceObserver } from '../../../../PerformanceObserver/PerformanceObserver';
import { useDataContext } from '../../Context/DataProvider';
import { useLocationContext } from '../../Context/LocationProvider';
import { useViewerContext } from '../../Context/ViewProvider';
import { useIntervalTimestamp } from '../../Hooks/useIntervalTimestamp';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { Presets } from '../Presets/Presets';
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


interface CompletionViewHeaderProps {
    title: string;
    shortName: string;
    groupe: string;
    tabs: TabsConfigItem[];
    sideSheetWidth: number;
}

const ANALYTICS = 'analytics';

export const CompletionViewHeader = ({
    title,
    shortName,
    tabs,
    groupe,
    sideSheetWidth,
}: CompletionViewHeaderProps): JSX.Element => {
    const { statusFunc, key, dataApi } = useDataContext();
    const { openCreatorById, creator } = useDataCreator(`${key}Creator`);
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
        <HeaderWrapper sideSheetWidth={sideSheetWidth}>
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
                                        width={`${page.pageTitle.length * 10}px`}
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

                    <>
                        {creator && (
                            <TabButton
                                aria-disabled={!creator.props.hasAccess}
                                onClick={() =>
                                    creator.props.hasAccess !== false &&
                                    openCreatorById(creator.widgetId)
                                }
                                width={'48px'}
                                aria-selected={false}
                                title={
                                    creator.props.hasAccess !== false
                                        ? creator.title
                                        : 'Contact Support for access'
                                }
                            >
                                <Icon name={'add'} />

                                {creator.title}
                            </TabButton>
                        )}
                        <Divider />
                    </>

                    {hasPowerBi && (
                        <>
                            <TabButton
                                onClick={() => handleSetActiveTab(ANALYTICS)}
                                aria-selected={activeTab === ANALYTICS}
                                title={'Power Bi analytics'}
                                color={
                                    activeTab === ANALYTICS
                                        ? tokens.colors.interactive.primary__resting.hex
                                        : undefined
                                }
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

                            const isActiveTab = activeTab === tab.tabId;

                            return (
                                <TabButton
                                    onClick={() => handleSetActiveTab(tab.tabId)}
                                    key={`tab-${tab.icon}`}
                                    aria-selected={isActiveTab}
                                    title={tab.title}
                                    color={
                                        isActiveTab
                                            ? tokens.colors.interactive.primary__resting.hex
                                            : undefined
                                    }
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
                    {!isProduction() && <BookmarkDropdown appKey={shortName} subSystem={groupe} />}

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
                        <>
                            <TabButton
                                onClick={toggleFilter}
                                aria-selected={isFilterActive}
                                title="PowerBi Filter"
                            >
                                {hasActiveFilters ? <FilterFilled /> : <Icon name={'filter_alt'} />}
                            </TabButton>
                        </>
                    )}
                </RightSection>
            </ActionBar>
        </HeaderWrapper>
    );
};
