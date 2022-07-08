import { Tabs } from '@equinor/eds-core-react';
import { statusColorMap } from '@equinor/GardenUtils';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { ModelViewerContextProvider } from '../../../../packages/ModelViewer/context/modelViewerContext';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { Loop } from '../../types';
import { workorderColumnNames } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';
import { Status } from '../Status';
import { ThreeDView } from './3D/3dView';
import { Banner } from './Banner';
import { BannerItem } from './BannerItem';
import { Checklists } from './Checklists';
import { LoopContentDetails } from './LoopContentDetails';
import { LoopDetails } from './LoopDetails';
import {
    ItemLink,
    OverviewPanel,
    PanelContentWrapper,
    SidesheetPanels,
    SidesheetTabList,
    SidesheetTabs,
    TabsWrapper,
} from './sidesheet-styles';

type LoopSidesheetProps = {
    item: Loop;
    actions: SidesheetApi;
};
export const LoopSidesheet = ({ item, actions }: LoopSidesheetProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    useEffect(() => {
        actions.setTitle(`${item.loopNo}, ${item.description}`);
    }, [item.loopNo, item.description]);
    const workorderExpressions = generateExpressions('checklistID', 'Equals', [
        item.checklistId || '',
    ]);
    const workorderRequestArgs = generateFamRequest(
        workorderColumnNames,
        'Or',
        workorderExpressions
    );
    // const {
    //     data: workorders,
    //     isLoading: isLoadingWorkorders,
    //     error: workorderError,
    // } = useQuery(['workorder', item.checklistId], ({ signal }) =>
    //     getWorkorders(workorderRequestArgs, signal)
    // );
    return (
        <div style={{ height: '100%' }}>
            <Banner padding="0 1.2em">
                <BannerItem
                    title="Checklist status"
                    value={
                        item.status ? (
                            <Status
                                content={item.status}
                                statusColor={statusColorMap[item.status]}
                            />
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
                                href={proCoSysUrls.getCommPkgUrl(item.commissioningPackageId ?? '')}
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
                                href={proCoSysUrls.getMcUrl(
                                    item.mechanicalCompletionPackageId ?? ''
                                )}
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
                        <Tabs.Tab>3D</Tabs.Tab>
                    </SidesheetTabList>
                    <SidesheetPanels>
                        <OverviewPanel>
                            <PanelContentWrapper>
                                <LoopDetails loop={item} />
                                <Checklists loopNo={item.loopNo} />
                                <LoopContentDetails item={item} />
                            </PanelContentWrapper>
                        </OverviewPanel>

                        <Tabs.Panel style={{ height: '100%' }}>
                            {activeTab === 1 && (
                                <ModelViewerContextProvider>
                                    <ThreeDView loop={item} />
                                </ModelViewerContextProvider>
                            )}
                        </Tabs.Panel>
                    </SidesheetPanels>
                </SidesheetTabs>
            </TabsWrapper>
        </div>
    );
};
