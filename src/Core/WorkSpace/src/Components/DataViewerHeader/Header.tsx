import { useFactory } from '@equinor/DataFactory';
import { CircularProgress, Search, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { ClickableIcon } from '../../../../../components/Icon/ClickableIcon';
import Icon from '../../../../../components/Icon/Icon';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { StatusBar } from '../../../../../packages/StatusBar';
import { useSettings } from '../../../../Client/Hooks';
import { PerformanceObserver } from '../../../../PerformanceObserver/PerformanceObserver';
import { useDataContext } from '../../Context/DataProvider';
import { useIntervalTimestamp } from '../../Hooks/useIntervalTimestamp';
import { TabButton } from '../ToggleButton';
import { Divider, HeaderWrapper, LeftSection, RightSection, Title, TitleBar } from './HeaderStyles';

const { Tab, List } = Tabs;

interface TabItem {
    icon: React.FC;
    title: string;
}

type VoidFunction = () => void;

interface CompletionViewHeaderProps {
    title: string;
    tabs: TabItem[];
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

    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    const timestamp = useIntervalTimestamp(dataApi?.dataUpdatedAt);

    const { clientEnv } = useSettings();

    return (
        <HeaderWrapper>
            <LeftSection>
                <TitleBar>
                    <Title variant="h3">{title}</Title>
                    {clientEnv === 'dev' && <PerformanceObserver />}
                </TitleBar>
                {statusFunc && <StatusBar data={statusFunc(data)} />}
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
                <List>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <Tab key={`tab-${tab.icon}`} title={tab.title}>
                                <Icon />
                            </Tab>
                        );
                    })}
                </List>
                <Divider />
                <SearchButton />
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
                <TabButton onClick={handleFilter} aria-selected={activeFilter} title="Filter">
                    <Icon name={'filter_alt'} />
                </TabButton>
            </RightSection>
        </HeaderWrapper>
    );
};

/** Search button for searching data in workspace */
function SearchButton() {
    const {
        search: { clearSearch, search },
        filterState: { getAllFilterGroups },
    } = useFilterApiContext();

    const [isActive, setIsActive] = useState(false);
    const handleChange = () =>
        setIsActive((prev) => {
            if (prev === false) {
                clearSearch();
            }
            return !prev;
        });

    function handleSearch(e) {
        const value = e.target.value;

        value === ''
            ? clearSearch()
            : search(
                getAllFilterGroups().map(({ name }) => name),
                value,
                'Data'
            );
    }

    function handleClear(e) {
        e.isTrusted ? void 0 : clearSearch();
    }

    return (
        <>
            <TabButton aria-selected={false} onClick={handleChange}>
                <Icon name="search" />
            </TabButton>
            {isActive && (
                <Search
                    onChange={handleClear}
                    placeholder="Type to search..."
                    onInput={handleSearch}
                />
            )}
        </>
    );
}
