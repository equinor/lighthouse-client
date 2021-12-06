import { Divider, Tabs } from '@equinor/eds-core-react';
import { useEffect, useRef } from 'react';
import { StatusBar } from '../../../../../packages/StatusBar';
import { useFilteredData } from '../../../../Filter';
import Icon from '../../../../Icon/Icon';
import { useDataContext } from '../../Context/DataProvider';
import { TabButton } from '../ToggleButton';
import {
    HeaderWrapper,
    LeftSection,
    RightSection,
    TabTitle,
    Title
} from './DataViewerHeaderStyles';

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
    const { getData, statusFunc } = useDataContext();
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
