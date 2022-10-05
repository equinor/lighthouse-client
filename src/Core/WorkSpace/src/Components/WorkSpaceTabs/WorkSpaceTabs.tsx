import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { Tab, TabsWrapper } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
}

export const WorkSpaceTabs = ({ tabs }: CompletionViewTabsProps): JSX.Element => {
    const { activeTab } = useLocationContext();
    console.log('workspace tabs', tabs);
    return (
        <TabsWrapper>
            {tabs.map((tab, index) => {
                return activeTab === tab.tabId ? (
                    <Tab key={`${index}-${tab.title}`}>{<tab.viewComponent />}</Tab>
                ) : null;
            })}
        </TabsWrapper>
    );
};
