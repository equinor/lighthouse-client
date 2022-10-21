import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { Tab, TabsWrapper } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
}

export const WorkSpaceTabs = ({ tabs }: CompletionViewTabsProps): JSX.Element => {
    const { activeTab } = useLocationContext();
    console.log('workspace tabs', tabs);
    return (
        <TabsWrapper>
            {tabs.map((tab) => {
                return activeTab === tab.tabId ? (
                    <Tab key={`${tab.title}`}>{<tab.viewComponent />}</Tab>
                ) : null;
            })}
        </TabsWrapper>
    );
};
