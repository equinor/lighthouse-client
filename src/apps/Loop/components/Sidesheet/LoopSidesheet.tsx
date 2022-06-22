import { Progress, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { statusColorMap } from '@equinor/GardenUtils';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { Loop } from '../../types';
import { getWorkorders, workorderColumnNames } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';
import { Status } from '../Status';
import { Banner } from './Banner';
import { BannerItem } from './BannerItem';
import { LoopContentTable } from './LoopContentTable';
import { LoopDetails } from './LoopDetails';
import { LoopWorkOrderTab } from './LoopWorkorderTable';
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
    const {
        data: workorders,
        isLoading: isLoadingWorkorders,
        error: workorderError,
    } = useQuery(['workorder', item.checklistId], ({ signal }) =>
        getWorkorders(workorderRequestArgs, signal)
    );
    return (
        <div>
            <Banner padding="0 1.2em">
                <BannerItem
                    title="MC Status"
                    value={
                        item.loopContentStatus ? (
                            <Status
                                content={item.loopContentStatus}
                                statusColor={statusColorMap[item.loopContentStatus]}
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
            <div>
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <SidesheetTabList>
                        <Tabs.Tab>Overview</Tabs.Tab>
                        <Tabs.Tab>
                            Work orders{' '}
                            {isLoadingWorkorders ? (
                                <Progress.Dots color="primary" />
                            ) : workorders ? (
                                `(${workorders.length})`
                            ) : (
                                `(${0})`
                            )}
                        </Tabs.Tab>
                        <Tabs.Tab>3D</Tabs.Tab>
                    </SidesheetTabList>
                    <Tabs.Panels style={{ padding: '1em' }}>
                        <Tabs.Panel>
                            <LoopDetails loop={item} />
                            <h3>Content</h3>
                            <LoopContentTable loop={item} />
                        </Tabs.Panel>
                        <Tabs.Panel>
                            <LoopWorkOrderTab
                                workorders={workorders}
                                isLoading={isLoadingWorkorders}
                                error={workorderError instanceof Error ? workorderError : null}
                            />
                        </Tabs.Panel>
                        <Tabs.Panel>3D</Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </div>
        </div>
    );
};
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
