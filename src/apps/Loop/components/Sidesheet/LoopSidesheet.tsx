import { Progress, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Loop } from '../../types';
import { getWorkorders, workorderColumnNames } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';
import { Banner } from './Banner';
import { BannerItem } from './BannerItem';
import { LoopContentTable } from './LoopContentTable';
import { LoopDetails } from './LoopDetails';
import { LoopWorkOrderTab } from './LoopWorkorderTable';

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
        actions.setTitle(`${item.tagNo}, ${item.checklistId}`);
    }, []);
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
            <Banner padding="0 0.5em">
                <BannerItem title="MC Status" value={item.loopContentStatus || 'N/A'}></BannerItem>
                <BannerItem title="Cmpkg" value={item.commissioningPackageNo || 'N/A'} />
                <BannerItem title="Mcpkg" value={item.mechanicalCompletionPackageNo || 'N/A'} />
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
                        <Tabs.Tab>Checklists</Tabs.Tab>
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
                        <Tabs.Panel>Checklists</Tabs.Panel>
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
