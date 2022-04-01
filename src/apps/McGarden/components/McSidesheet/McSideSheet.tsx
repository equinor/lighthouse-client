import { Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer } from '@equinor/GardenUtils';
import { useState } from 'react';
import { McPackage } from '../../types';
import { useNcr, usePunch, useWorkorders } from './hooks';
import { NcrTab, PunchTab, WorkordersTab } from './Tabs';
import { DetailsTab } from './Tabs/DetailsTab';

export const McSideSheet = (mcPackage: McPackage): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
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
