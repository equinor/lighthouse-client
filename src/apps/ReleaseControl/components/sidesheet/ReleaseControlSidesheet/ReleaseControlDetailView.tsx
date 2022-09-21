import { Tabs } from '@equinor/eds-core-react';
import { useEdsTabs } from '@equinor/hooks';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { HeaderTab, SidesheetTabList, Tab, TabList } from './sidesheetStyles';
import { CircuitDiagramTab } from './Tabs/CircuitDiagramTab';
import { HistoryTab } from './Tabs/HistoryTab';
import { ScopeTab } from './Tabs/ScopeTab';
import { WorkflowTab } from './Tabs/WorkflowTab';

export const ReleaseControlDetailView = (): JSX.Element => {
    const { activeTab, handleChange } = useEdsTabs();
    return (
        <>
            <ReleaseControlSidesheetBanner />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <HeaderTab>Scope</HeaderTab>
                    <HeaderTab>Workflow</HeaderTab>
                    <HeaderTab>Circuit diagram</HeaderTab>
                    <HeaderTab>History</HeaderTab>
                </SidesheetTabList>
                <TabList>
                    <Tab>
                        <ScopeTab />
                    </Tab>
                    <Tab>
                        <WorkflowTab />
                    </Tab>
                    <Tab>
                        <CircuitDiagramTab />
                    </Tab>
                    <Tab>
                        <HistoryTab />
                    </Tab>
                </TabList>
            </Tabs>
        </>
    );
};
