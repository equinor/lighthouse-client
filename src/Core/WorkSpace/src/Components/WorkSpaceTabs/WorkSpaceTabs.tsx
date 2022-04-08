import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { Tab, TabsWrapper } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
}

export const WorkSpaceTabs = ({ tabs }: CompletionViewTabsProps): JSX.Element => {
    const { activeTab } = useLocationContext();

    return (
        <TabsWrapper>
            {tabs.map((tab) => {
                return activeTab === tab.tabId ? (
                    <Tab key={`panel-${tab.title}`}>{<tab.viewComponent />}</Tab>
                ) : null;
            })}
        </TabsWrapper>
    );
};
