import { useFactory } from '@equinor/DataFactory';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useFilteredData } from '@equinor/filter';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { ClickableIcon } from '../../../../../components/Icon/ClickableIcon';
import Icon from '../../../../../components/Icon/Icon';
import { StatusBar } from '../../../../../packages/StatusBar';
import { useDataContext } from '../../Context/DataProvider';
import { TabButton } from '../ToggleButton';
import { Divider, HeaderWrapper, LeftSection, RightSection, Title } from './HeaderStyles';

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
    const { data } = useFilteredData();
    const [timestamp, setTimestamp] = useState<string | null>(makeTimestamp(dataApi.dataUpdatedAt));

    function makeTimestamp(timeInMs: number): string | null {
        return DateTime.fromMillis(timeInMs).toRelative({ unit: 'minutes' });
    }

    useEffect(() => {
        setTimestamp(makeTimestamp(dataApi.dataUpdatedAt));
        setInterval(() => setTimestamp(makeTimestamp(dataApi.dataUpdatedAt)), 1000 * 60);
    }, [dataApi.dataUpdatedAt]);

    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{title}</Title>
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
                <TabButton onClick={handleFilter} aria-selected={activeFilter} title="Filter">
                    <Icon name={'filter_alt'} />
                </TabButton>
                <TabButton
                    color={
                        dataApi.isStale
                            ? tokens.colors.infographic.primary__energy_red_100.hex
                            : 'grey'
                    }
                    aria-selected={false}
                    title={
                        dataApi.isStale
                            ? 'This data is over 1 hour old and might be outdated'
                            : `Updated: ${timestamp}`
                    }
                    onClick={() => dataApi.refetch()}
                >
                    <ClickableIcon size={32} name="refresh" />
                </TabButton>
            </RightSection>
        </HeaderWrapper>
    );
};
