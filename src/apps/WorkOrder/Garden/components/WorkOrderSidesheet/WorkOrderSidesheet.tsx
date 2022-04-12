import { Button, Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { WorkOrder } from '../../models';
import { useMaterial, useMccr } from './hooks';
import { DetailsTab, MccrTab } from './Tabs';
import { MaterialTab } from './Tabs/MaterialTab';
const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
interface WorkorderSideSheetProps {
    item: WorkOrder;
    actions: SidesheetApi;
}

export const WorkorderSideSheet = ({ item, actions }: WorkorderSideSheetProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    const procosysUrl = isProduction() ? item.url : item.url.replace('procosys', 'procosystest');

    useEffect(() => {
        actions.setTitle(
            <Header>
                {item.workOrderNumber}
                <a target="_BLANK" href={procosysUrl} rel="noreferrer">
                    <Button key="linkToProcosys" variant="ghost">
                        Open in ProCoSys
                    </Button>
                </a>
            </Header>
        );
    }, [item.workOrderId, procosysUrl]);

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
