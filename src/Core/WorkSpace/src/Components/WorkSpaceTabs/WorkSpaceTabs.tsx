import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { Tab, TabsWrapper } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
}

export const WorkSpaceTabs = ({ tabs }: CompletionViewTabsProps): JSX.Element => {
    const { activeTab } = useLocationContext();

    return (
        <TabsWrapper>
            {tabs.map(({ tabId, title, viewComponent: ViewComponent }) => (
                <Tab isActive={activeTab === tabId} key={`panel-${title}`}>
                    <ViewComponent isActive={activeTab === tabId} />
                </Tab>
            ))}
        </TabsWrapper>
    );
};
