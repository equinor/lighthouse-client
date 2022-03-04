import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import { WorkOrder } from '../../models';
import { useMaterial, useMccr } from './hooks';
import { SideSheetContainer } from './styles';
import { DetailsTab, MccrTab } from './Tabs';
import { MaterialTab } from './Tabs/MaterialTab';

export const WorkorderSideSheet = (workorder: WorkOrder): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    const {
        material,
        isFetching: materialIsFetching,
        error: materialError,
    } = useMaterial(workorder.workOrderId);
    const { mccr, isFetching: mccrIsFetching, error: mccrError } = useMccr(workorder.workOrderId);

    return (
        <SideSheetContainer style={{ overflow: 'auto', height: '100%' }}>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Tabs.List>
                    <Tabs.Tab>Details</Tabs.Tab>
                    <Tabs.Tab>MCCR ({mccr?.length || 0})</Tabs.Tab>
                    <Tabs.Tab>Material ({material?.length || 0})</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panels>
                    <Tabs.Panel>
                        <DetailsTab workOrder={workorder} />
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
