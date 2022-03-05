import { useFactory } from '@equinor/DataFactory';
import { Button, Tabs } from '@equinor/eds-core-react';
import { useFilteredData } from '@equinor/filter';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { ClickableIcon } from '../../../../../components/Icon/ClickableIcon';
import Icon from '../../../../../components/Icon/Icon';
import { StatusBar } from '../../../../../packages/StatusBar';
import { useDataContext } from '../../Context/DataProvider';
import { TabButton } from '../ToggleButton';
import {
    Divider,
    HeaderWrapper,
    LeftSection,
    RightSection,
    Title,
    TitleHeader,
} from './HeaderStyles';

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
        setInterval(() => setTimestamp(makeTimestamp(dataApi.dataUpdatedAt)), 1000 * 60);
    }, [dataApi.dataUpdatedAt]);

    return (
        <HeaderWrapper>
            <LeftSection>
                <TitleHeader>
                    <Title variant="h3">{title}</Title>
                    <div>
                        {`Updated ${timestamp}`}
                        <ClickableIcon name="refresh" onClick={() => dataApi.refetch()} />
                    </div>
                </TitleHeader>
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
            </RightSection>
        </HeaderWrapper>
    );
};
