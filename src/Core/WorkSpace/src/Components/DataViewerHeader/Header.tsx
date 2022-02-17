import { useFactory } from '@equinor/DataFactory';
import { Tabs } from '@equinor/eds-core-react';
import { useFilteredData } from '@equinor/filter';
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
    toggleFullscreen: VoidFunction;
    activeFilter: boolean;
}

export const CompletionViewHeader = ({
    title,
    tabs,
    handleFilter,
    activeFilter,
    toggleFullscreen,
}: CompletionViewHeaderProps): JSX.Element => {
    const { statusFunc, key } = useDataContext();
    const { factory, setSelected } = useFactory(key);
    const { data } = useFilteredData();

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
                    onClick={toggleFullscreen}
                    aria-selected={activeFilter}
                    title="Fullscreen"
                >
                    <Icon name={'fullscreen'} />
                </TabButton>
            </RightSection>
        </HeaderWrapper>
    );
};
