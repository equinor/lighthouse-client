import { Tabs } from '@equinor/eds-core-react-old';
import { useEdsTabs } from '@equinor/hooks';
import styled from 'styled-components';
import { SidesheetBanner } from '../SidesheetBanner/SidesheetBanner';
import { LogTabTitle, LogTab } from '../Tabs/Log';
import { RequestTabTitle, RequestTab } from '../Tabs/Request';
import { WorkOrderTabTitle, WorkOrderTab } from '../Tabs/WorkOrders';
import { SidesheetTabList } from './SidesheetWrapper.styles';

export const ScopeChangeDetailView = (): JSX.Element => {
  const { activeTab, handleChange } = useEdsTabs();
  return (
    <div>
      <SidesheetBanner />
      <Tabs activeTab={activeTab} onChange={handleChange}>
        <SidesheetTabList>
          <HeaderTab>
            <RequestTabTitle />
          </HeaderTab>
          <HeaderTab>
            <WorkOrderTabTitle />
          </HeaderTab>
          <HeaderTab>
            <LogTabTitle />
          </HeaderTab>
        </SidesheetTabList>
        <TabList>
          <Tab>
            <RequestTab />
          </Tab>
          <Tab>{activeTab === 1 && <WorkOrderTab />}</Tab>
          <Tab>{activeTab === 2 && <LogTab />}</Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

const HeaderTab = styled(Tabs.Tab)``;

const Tab = styled(Tabs.Panel)`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  padding-bottom: 50px;
`;

const TabList = styled(Tabs.Panels)`
  margin: 24px 32px;
`;
