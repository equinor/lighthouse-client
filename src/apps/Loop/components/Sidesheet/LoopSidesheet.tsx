import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { statusColorMap } from '@equinor/GardenUtils';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { Loop } from '../../types';
import { workorderColumnNames } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';
import { Status } from '../Status';
import { Banner } from './Banner';
import { BannerItem } from './BannerItem';
import { Checklists } from './Checklists';
import { LoopContentDetails } from './LoopContentDetails';
import { LoopDetails } from './LoopDetails';
import { ItemLink } from './sidesheet-styles';

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
        actions.setTitle(`${item.tagNo}, ${item.description}`);
    }, [item.tagNo, item.description]);
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
                                href={proCoSysUrls.getCommPkgUrl(
                                    item.commissioningPackage_ID ?? ''
                                )}
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
                                href={proCoSysUrls.getMcUrl(item.mcpkgId ?? '')}
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
            <div style={{ height: '100%', gridTemplateRows: 'auto 1fr' }}>
                <SidesheetTabs activeTab={activeTab} onChange={handleChange}>
                    <SidesheetTabList>
                        <Tabs.Tab>Overview</Tabs.Tab>
                        <Tabs.Tab>3D</Tabs.Tab>
                    </SidesheetTabList>
                    <Tabs.Panels
                        style={{
                            padding: '1em',
                            height: '83%',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        <Tabs.Panel>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <LoopDetails loop={item} />
                                <Checklists tagNo={item.loopId!} />
                                <LoopContentDetails item={item} />
                            </div>
                        </Tabs.Panel>

                        <Tabs.Panel>3D</Tabs.Panel>
                    </Tabs.Panels>
                </SidesheetTabs>
            </div>
        </div>
    );
};
const SidesheetTabs = styled(Tabs)`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
`;
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
