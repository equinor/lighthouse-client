import { useFactory } from '@equinor/DataFactory';
import { Tabs } from '@equinor/eds-core-react';
import { useEffect, useRef } from 'react';
import { useFilteredData } from '../../../../../components/Filter';
import Icon from '../../../../../components/Icon/Icon';
import { StatusBar } from '../../../../../packages/StatusBar';
import { useDataContext } from '../../Context/DataProvider';
import { TabButton } from '../ToggleButton';
import { Divider, HeaderWrapper, LeftSection, RightSection, TabTitle, Title } from './HeaderStyles';

const { Tab, List } = Tabs;

interface TabItem {
    icon: React.FC;
    title: string;
}

type HandleFilter = () => void;

interface CompletionViewHeaderProps {
    title: string;
    tabs: TabItem[];
    handleFilter: HandleFilter;
    activeFilter: boolean;
}

export const CompletionViewHeader = ({
    title,
    tabs,
    handleFilter,
    activeFilter,
}: CompletionViewHeaderProps): JSX.Element => {
    const { getData, statusFunc, key } = useDataContext();
    const { factory, setSelected } = useFactory(key);
    const { data } = useFilteredData();
    const isMounted = useRef(false);

    useEffect(() => {
        !isMounted.current && getData();
        isMounted.current = true;
    }, [getData]);

    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{title}</Title>
                {statusFunc && <StatusBar data={statusFunc(data)} />}
            </LeftSection>
            <RightSection>
                {factory && (
                    <>
                        <TabButton onClick={setSelected} aria-selected={false}>
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
                            <Tab key={`tab-${tab.icon}`}>
                                <Icon />
                                <TabTitle>{tab.title}</TabTitle>
                            </Tab>
                        );
                    })}
                </List>
                <Divider />
                <TabButton onClick={handleFilter} aria-selected={activeFilter}>
                    <Icon name={'filter_alt'} />
                </TabButton>
            </RightSection>
        </HeaderWrapper>
    );
};
