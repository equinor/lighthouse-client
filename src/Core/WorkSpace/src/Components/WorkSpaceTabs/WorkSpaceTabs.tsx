import { Tabs } from '@equinor/eds-core-react';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { Panels } from './WorkSpaceTabsStyles';

const { Panel } = Tabs;

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
    activeTab: number;
}

export const WorkSpaceTabs = ({ tabs, activeTab }: CompletionViewTabsProps): JSX.Element => {
    //Todo add loading spinner here !!!!!!!!
    return (
        <Panels>
            {tabs.map((tab, index) => {
                const ViewComponent = tab.viewComponent;
                return (
                    <Panel key={`panel-${tab.title}`}>
                        {activeTab == index && <ViewComponent />}
                    </Panel>
                );
            })}
        </Panels>
    );
};
