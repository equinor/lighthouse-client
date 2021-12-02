import { Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { TabsConfigItem } from '../Tabs/tabsConfig';

const { Panels, Panel } = Tabs;

const PanelsView = styled(Panels)`
    overflow: auto;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
`;

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
    activeTab: number;
}

export const CompletionViewTabs = ({ tabs, activeTab }: CompletionViewTabsProps): JSX.Element => {
    return (
        <PanelsView>
            {tabs.map((tab, index) => {
                const ViewComponent = tab.viewComponent;
                return (
                    <Panel key={`panel-${tab.title}`} style={{ paddingTop: 0 }}>
                        {activeTab == index && <ViewComponent />}
                    </Panel>
                );
            })}
        </PanelsView>
    );
};
