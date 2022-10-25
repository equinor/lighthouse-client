import { Progress, Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer, SidesheetHeaderContent } from '@equinor/GardenUtils';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { ModelViewerContextProvider } from '../../../../../packages/ModelViewer/context/modelViewerContext';
import { proCoSysUrls } from '../../../../../packages/ProCoSysUrls/procosysUrl';
import { WorkOrder } from '../../models';
import { useMaterial, useMccr } from './hooks';
import { DetailsTab, MccrTab } from './Tabs';
import { ThreeDView } from './Tabs/3dView';
import { MaterialTab } from './Tabs/MaterialTab';

interface WorkorderSideSheetProps {
    item: WorkOrder;
    actions: SidesheetApi;
}

const Loading = () => {
    return <Progress.Dots color="primary" />;
};

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
                    <Tabs.Tab>
                        MCCR {mccrIsFetching ? <Loading /> : `(${mccr?.length || 0})`}
                    </Tabs.Tab>
                    <Tabs.Tab>
                        Material {materialIsFetching ? <Loading /> : `(${material?.length || 0})`}
                    </Tabs.Tab>
                    <Tabs.Tab>3D</Tabs.Tab>
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
                    <Tabs.Panel>
                        {activeTab === 3 && (
                            <ModelViewerContextProvider>
                                <ThreeDView isLoading={mccrIsFetching} mccr={mccr} />
                            </ModelViewerContextProvider>
                        )}
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </SideSheetContainer>
    );
};
