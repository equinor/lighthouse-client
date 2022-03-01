import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { Panel, Panels } from './WorkSpaceTabsStyles';

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
