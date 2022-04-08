import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { Panel, Wrapper } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
}

export const WorkSpaceTabs = ({ tabs }: CompletionViewTabsProps): JSX.Element => {
    const { activeTab } = useLocationContext();
    console.log(activeTab, tabs);
    return (
        <Wrapper>
            {tabs.map((tab) => {
                if (activeTab !== tab.tabId) return null;
                const ViewComponent = tab.viewComponent;
                return (
                    <Panel key={`panel-${tab.title}`}>
                        {activeTab === tab.tabId && <ViewComponent />}
                    </Panel>
                );
            })}
        </Wrapper>
    );
};
