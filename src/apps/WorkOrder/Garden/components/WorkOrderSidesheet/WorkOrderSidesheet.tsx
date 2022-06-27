import { Tabs } from '@equinor/eds-core-react';
import {
    SideSheetContainer,
    SidesheetHeaderContent,
    PROCOSYS_PROD_JC_BASE_URL,
    PROCOSYS_TEST_JC_BASE_URL,
} from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { proCoSysUrls } from '../../../../../packages/ProCoSysUrls/procosysUrl';
import { WorkOrder } from '../../models';
import { useMaterial, useMccr } from './hooks';
import { DetailsTab, MccrTab } from './Tabs';
import { MaterialTab } from './Tabs/MaterialTab';

interface WorkorderSideSheetProps {
    item: WorkOrder;
    actions: SidesheetApi;
}

export const WorkorderSideSheet = ({ item, actions }: WorkorderSideSheetProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    const workOrderProcosysUrl = proCoSysUrls.getWorkOrderUrl(item.workOrderId ?? '');

    useEffect(() => {
        actions.setTitle(
            <SidesheetHeaderContent title={item.workOrderNumber} url={workOrderProcosysUrl} />
        );
    }, [item.workOrderNumber, workOrderProcosysUrl]);

    const {
        material,
        isFetching: materialIsFetching,
        error: materialError,
    } = useMaterial(item.workOrderId);
    const { mccr, isFetching: mccrIsFetching, error: mccrError } = useMccr(item.workOrderId);

    return (
        <SideSheetContainer>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Tabs.List>
                    <Tabs.Tab>Details</Tabs.Tab>
                    <Tabs.Tab>MCCR ({mccr?.length || 0})</Tabs.Tab>
                    <Tabs.Tab>Material ({material?.length || 0})</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panels>
                    <Tabs.Panel>
                        <DetailsTab workOrder={item} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <MccrTab packages={mccr} isFetching={mccrIsFetching} error={mccrError} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <MaterialTab
                            packages={material}
                            isFetching={materialIsFetching}
                            error={materialError}
                        />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </SideSheetContainer>
    );
};
