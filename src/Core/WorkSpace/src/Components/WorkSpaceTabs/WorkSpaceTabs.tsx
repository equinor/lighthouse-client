import { Tabs } from '@equinor/eds-core-react';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { Panels } from './WorkSpaceTabsStyles';

const { Panel } = Tabs;

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
    activeTab: number;
}

export const WorkSpaceTabs = ({ tabs, activeTab }: CompletionViewTabsProps): JSX.Element => {
    return (
        <Panels>
            {tabs.map((tab, index) => {
                const ViewComponent = tab.viewComponent;
                return (
                    <Panel key={`panel-${tab.title}`} style={{ paddingTop: 0 }}>
                        {activeTab == index && <ViewComponent />}
                    </Panel>
                );
            })}
        </Panels>
    );
};
