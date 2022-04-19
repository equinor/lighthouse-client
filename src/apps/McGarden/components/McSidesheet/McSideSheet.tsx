import { Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer, SidesheetHeaderContent } from '@equinor/GardenUtils';
import { useEffect, useState } from 'react';
import { isProduction } from '../../../../Core/Client/Functions';
import { SidesheetApi } from '../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { McPackage } from '../../types';
import { useNcr, usePunch, useWorkorders } from './hooks';
import { NcrTab, PunchTab, WorkordersTab } from './Tabs';
import { DetailsTab } from './Tabs/DetailsTab';
type McSidesheetProps = {
    item: McPackage;
    actions: SidesheetApi;
};
export const McSideSheet = ({ item: mcPackage, actions }: McSidesheetProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const procosysUrl = isProduction()
        ? mcPackage.url
        : mcPackage.url.replace('procosys', 'procosystest');

    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    const {
        workOrders,
        isFetching: isFetchingWorkOrders,
        error: workOrderError,
    } = useWorkorders(mcPackage?.mcPkgId || null);

    const {
        punchItems,
        isFetching: isFetchingPunchItems,
        error: punchError,
    } = usePunch(mcPackage?.mcPkgId || null);
    const { ncr, isFetching: isFetchingNcr, error: ncrError } = useNcr(mcPackage?.mcPkgId || null);

    useEffect(() => {
        actions.setTitle(
            <SidesheetHeaderContent
                title={mcPackage.mcPkgNumber}
                url={procosysUrl}
                buttonContent="Open in ProCoSys"
            />
        );
    }, [mcPackage.mcPkgId, procosysUrl]);
    return (
        <SideSheetContainer>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Tabs.List>
                    <Tabs.Tab>Details</Tabs.Tab>
                    <Tabs.Tab
                        title={!isFetchingWorkOrders ? workOrders.length.toString() : undefined}
                    >
                        Workorders {!isFetchingWorkOrders && `(${workOrders.length})`}
                    </Tabs.Tab>
                    <Tabs.Tab>Punch {!isFetchingPunchItems && `(${punchItems.length})`}</Tabs.Tab>
                    <Tabs.Tab>NCR {!isFetchingNcr && `(${ncr.length})`}</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel>
                        <DetailsTab mcPackage={mcPackage} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <WorkordersTab
                            error={workOrderError}
                            isFetching={isFetchingWorkOrders}
                            packages={workOrders}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <PunchTab
                            error={punchError}
                            isFetching={isFetchingPunchItems}
                            packages={punchItems}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <NcrTab error={ncrError} isFetching={isFetchingNcr} packages={ncr} />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </SideSheetContainer>
    );
};
