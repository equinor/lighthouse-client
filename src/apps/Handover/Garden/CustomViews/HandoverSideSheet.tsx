import styled from 'styled-components';
import { Tabs } from '@equinor/eds-core-react';

import { HandoverPackage } from '../models/HandoverPackage';
import useHandoverResource from '../hooks/useHandoverResource';
import { useState } from 'react';

import { SidesheetHeader } from '../components/handoverSidesheet/SidesheetHeader';
import DetailsTab from '../components/handoverSidesheet/handoverSidesheetTabs/DetailsTab';
import McPackagesTab from '../components/handoverSidesheet/handoverSidesheetTabs/McPackagesTab';
import NcrTab from '../components/handoverSidesheet/handoverSidesheetTabs/NcrTab';
import PunchTab from '../components/handoverSidesheet/handoverSidesheetTabs/PunchTab';
import QueryTab from '../components/handoverSidesheet/handoverSidesheetTabs/QueryTab';
import SwcrTab from '../components/handoverSidesheet/handoverSidesheetTabs/SwcrTab';
import UnsignedActionTab from '../components/handoverSidesheet/handoverSidesheetTabs/UnsignedActionTab';
import UnsignedTaskTab from '../components/handoverSidesheet/handoverSidesheetTabs/UnsignedTasksTab';
import WorkOrderTab from '../components/handoverSidesheet/handoverSidesheetTabs/WorkOrdersTab';

const SideSheetContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
`;

export function HandoverSideSheet(handoverPackage: HandoverPackage): JSX.Element {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    const { data: mcPackages, dataIsFetching: isDataFetchingMc } = useHandoverResource(
        handoverPackage.id,
        'mcpkg'
    );

    const { data: detailsData, dataIsFetching: isDataFetchingDetails } = useHandoverResource(
        handoverPackage.id,
        'details'
    );

    const { data: ncrPackages, dataIsFetching: isDataFetchingNcr } = useHandoverResource(
        handoverPackage.id,
        'ncr'
    );

    const { data: workOrderPackages, dataIsFetching: isDataFetchingWorkOrder } =
        useHandoverResource(handoverPackage.id, 'work-orders');

    const { data: unsignedTasks, dataIsFetching: isDataFetchingUnsignedTasks } =
        useHandoverResource(handoverPackage.id, 'unsigned-tasks');

    const { data: unsignedActions, dataIsFetching: isDataFetchingUnsignedActions } =
        useHandoverResource(handoverPackage.id, 'unsigned-actions');

    const { data: punchPackages, dataIsFetching: isDataFetchingPunch } = useHandoverResource(
        handoverPackage.id,
        'punch'
    );

    const { data: swcrPackages, dataIsFetching: isDataFetchingSwcr } = useHandoverResource(
        handoverPackage.id,
        'swcr'
    );

    const { data: queryPackages, dataIsFetching: isDataFetchingQuery } = useHandoverResource(
        handoverPackage.id,
        'query'
    );

    return (
        <SideSheetContainer>
            <SidesheetHeader handoverPackage={handoverPackage} />

            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Tabs.List>
                    <Tabs.Tab>Details </Tabs.Tab>
                    <Tabs.Tab>McPackages {`(${mcPackages?.length || 0})`} </Tabs.Tab>
                    <Tabs.Tab>Work Orders {`(${workOrderPackages?.length || 0})`} </Tabs.Tab>
                    <Tabs.Tab>Unsigned Tasks{`(${unsignedTasks?.length || 0})`} </Tabs.Tab>
                    <Tabs.Tab>Unsigned Actions{`(${unsignedActions?.length || 0})`} </Tabs.Tab>
                    <Tabs.Tab>Punch{`(${punchPackages?.length || 0})`} </Tabs.Tab>
                    <Tabs.Tab>SWCR {`(${swcrPackages?.length || 0})`}</Tabs.Tab>
                    <Tabs.Tab>NCr{`(${ncrPackages?.length || 0})`} </Tabs.Tab>
                    <Tabs.Tab>Query{`(${queryPackages?.length || 0})`} </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel>
                        <DetailsTab
                            commpkg={handoverPackage}
                            nextToSign={detailsData}
                            dataIsFetching={isDataFetchingDetails}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <McPackagesTab packages={mcPackages} isFetching={isDataFetchingMc} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <WorkOrderTab
                            packages={workOrderPackages}
                            isFetching={isDataFetchingWorkOrder}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <UnsignedTaskTab
                            packages={unsignedTasks}
                            isFetching={isDataFetchingUnsignedTasks}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <UnsignedActionTab
                            packages={unsignedActions}
                            isFetching={isDataFetchingUnsignedActions}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <PunchTab packages={punchPackages} isFetching={isDataFetchingPunch} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <SwcrTab packages={swcrPackages} isFetching={isDataFetchingSwcr} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <NcrTab packages={ncrPackages} isFetching={isDataFetchingNcr} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <QueryTab packages={queryPackages} isFetching={isDataFetchingQuery} />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </SideSheetContainer>
    );
}
