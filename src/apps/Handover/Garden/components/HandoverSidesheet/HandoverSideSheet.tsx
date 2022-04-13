import { Tabs } from '@equinor/eds-core-react';
import { HandoverPackage } from '../../models/handoverPackage';
import useHandoverResource from '../../hooks/useHandoverResource';
import { useEffect, useState } from 'react';
import {
    DetailsTab,
    McPackagesTab,
    NcrTab,
    PunchTab,
    QueryTab,
    SidesheetHeader,
    SwcrTab,
    UnsignedActionTab,
    UnsignedTaskTab,
    WorkOrderTab,
} from '.';
import { SideSheetContainer, SidesheetHeaderContent } from '@equinor/GardenUtils';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { isProduction } from '@equinor/portal-client';

interface HandoverSideSheetProps {
    item: HandoverPackage;
    actions: SidesheetApi;
}

export function HandoverSideSheet({
    actions,
    item: handoverPackage,
}: HandoverSideSheetProps): JSX.Element {
    const [activeTab, setActiveTab] = useState<number>(0);
    const procosysUrl = isProduction()
        ? handoverPackage.url
        : handoverPackage.url.replace('procosys', 'procosystest');

    useEffect(() => {
        actions.setTitle(
            <SidesheetHeaderContent title={handoverPackage.commpkgNo} url={procosysUrl} />
        );
    }, [handoverPackage.commpkgNo, procosysUrl]);

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
