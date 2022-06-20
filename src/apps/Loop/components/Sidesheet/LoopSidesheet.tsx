import { Progress, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { formatDateString, StringCell, Table } from '@equinor/GardenUtils';
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

type LoopDetailsProps = {
    loop: Loop;
};
const LoopDetails = ({ loop }: LoopDetailsProps) => {
    return (
        <div>
            <h3>Details</h3>
            <Table>
                <tbody>
                    <tr>
                        <td>Project</td>
                        <td>
                            <StringCell value={loop.project} />
                        </td>
                    </tr>
                    <tr>
                        <td>Loop</td>
                        <td>
                            <StringCell value={loop.tagNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm pkg</td>
                        <td>
                            <StringCell value={loop.commissioningPackageNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>Mc pkg</td>
                        <td>
                            <StringCell value={loop.mechanicalCompletionPackageNo} />
                        </td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>
                            <StringCell value={loop.location} />
                        </td>
                    </tr>
                    <tr>
                        <td>Aggregated MC status</td>
                        <td>
                            <StringCell value={loop.loopContentStatus} />
                        </td>
                    </tr>

                    <tr>
                        <td>Planned/Actual MC complete</td>
                        <td>
                            <StringCell
                                value={formatDateString(
                                    loop.woActualCompletionDate
                                        ? loop.woActualCompletionDate.toString()
                                        : null
                                )}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>Remaning hours</td>
                        <td>
                            <StringCell
                                value={loop.remainingManHours ? `${loop.remainingManHours}` : 'N/A'}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
