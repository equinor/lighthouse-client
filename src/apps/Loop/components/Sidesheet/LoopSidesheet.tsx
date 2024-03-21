import { Tabs } from '@equinor/eds-core-react-old';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { useEffect, useState } from 'react';
import { ModelViewerContextProvider } from '../../../../packages/ModelViewer/context/modelViewerContext';
import { statusColorMap, WorkorderTab } from '@equinor/GardenUtils';
import { SidesheetApi } from '@equinor/sidesheet';
import { useGetWorkorders } from '../../hooks';
import { Loop } from '../../types';
import { Status } from '../Status';
import { ThreeDView } from './3D/3dView';
import { Banner } from './Banner';
import { BannerItem } from './BannerItem';
import { Checklists } from './Checklists';
import { LoopContentDetails } from './LoopContentDetails';
import { LoopDetails } from './LoopDetails';
import {
  ItemLink,
  PanelContentWrapper,
  SidesheetPanels,
  SidesheetTabList,
  SidesheetTabs,
  StyledPanel,
  StyledSidesheetWrapper,
  TabsWrapper,
} from './sidesheet-styles';
import { TabTitle } from './TabTitle';

type LoopSidesheetProps = {
  item: Loop;
  actions: SidesheetApi;
};
export const LoopSidesheet = ({ item, actions }: LoopSidesheetProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { isLoadingWorkorders, workorderError, workorders } = useGetWorkorders(item.loopNo);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    actions.setTitle(`${item.loopNo}, ${item.description}`);
  }, [item.loopNo, item.description]);

  return (
    <StyledSidesheetWrapper>
      <Banner padding="0 1.2em">
        <BannerItem
          title="Checklist status"
          value={
            item.status ? (
              <Status content={item.status} statusColor={statusColorMap[item.status]} />
            ) : (
              'N/A'
            )
          }
        ></BannerItem>
        <BannerItem
          title="Cmpkg"
          value={
            item.commissioningPackageNo ? (
              <ItemLink
                target="_blank"
                href={proCoSysUrls.getCommPkgUrl(item.commissioningPackageUrlId ?? '')}
              >
                {item.commissioningPackageNo}
              </ItemLink>
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem
          title="Mcpkg"
          value={
            item.mechanicalCompletionPackageNo ? (
              <ItemLink
                target="_blank"
                href={proCoSysUrls.getMcUrl(item.mechanicalCompletionPackageUrlId ?? '')}
              >
                {item.mechanicalCompletionPackageNo}
              </ItemLink>
            ) : (
              'N/A'
            )
          }
        />
        <BannerItem title="Milestone" value={item.priority1 || 'N/A'} />
      </Banner>
      <TabsWrapper>
        <SidesheetTabs activeTab={activeTab} onChange={handleChange}>
          <SidesheetTabList>
            <Tabs.Tab>Overview</Tabs.Tab>
            <Tabs.Tab>
              Work orders <TabTitle isLoading={isLoadingWorkorders} data={workorders} />
            </Tabs.Tab>
            <Tabs.Tab>3D</Tabs.Tab>
          </SidesheetTabList>
          <SidesheetPanels>
            <StyledPanel>
              <PanelContentWrapper>
                <LoopDetails loop={item} />
                <Checklists loopId={item.loopId} />
                <LoopContentDetails item={item} />
              </PanelContentWrapper>
            </StyledPanel>

            <StyledPanel>
              <WorkorderTab
                error={workorderError instanceof Error ? workorderError : null}
                isLoading={isLoadingWorkorders}
                workorders={workorders}
              />
            </StyledPanel>

            <Tabs.Panel style={{ height: '100%' }}>
              {activeTab === 2 && (
                <ModelViewerContextProvider>
                  <ThreeDView loop={item} />
                </ModelViewerContextProvider>
              )}
            </Tabs.Panel>
          </SidesheetPanels>
        </SidesheetTabs>
      </TabsWrapper>
    </StyledSidesheetWrapper>
  );
};
