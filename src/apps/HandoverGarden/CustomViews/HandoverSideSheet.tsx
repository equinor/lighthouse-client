import styled from 'styled-components';
import { Tabs } from '@equinor/eds-core-react';

import { HandoverPackage } from '../models/HandoverPackage';
import useHandoverResource from '../hooks/useHandoverResource';
import { useState } from 'react';
import DetailsTab from '../components/handoverSidesheetTabs/DetailsTab';
import McPackagesTab from '../components/handoverSidesheetTabs/McPackagesTab';

const SideSheetContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
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

    /* 
    const { data: ncrPackages, isDataFetching: isDataFetchingNcr } = useHandoverResource(
        handoverPackage.id,
        'ncr'
    );

    const { data: workOrderPackages, isDataFetching: isDataFetchingWorkOrder } =
        useHandoverResource(handoverPackage.id, 'work-orders');

    const { data: unsignedTasks, isDataFetching: isDataFetchingUnsignedTasks } =
        useHandoverResource(handoverPackage.id, 'unsigned-tasks');

    const { data: unsignedActions, isDataFetching: isDataFetchingUnsignedActions } =
        useHandoverResource(handoverPackage.id, 'unsigned-actions');

    const { data: punchPackages, isDataFetching: isDataFetchingPunch } = useHandoverResource(
        handoverPackage.id,
        'punch'
    );

    const { data: swcrPackages, isDataFetching: isDataFetchingSwcr } = useHandoverResource(
        handoverPackage.id,
        'swcr'
    );

    const { data: queryPackages, isDataFetching: isDataFetchingQuery } = useHandoverResource(
        handoverPackage.id,
        'query'
    ); */

    return (
        <div style={{ height: '100%' }}>
            <SideSheetContainer>
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <Tabs.List>
                        <Tabs.Tab>Details </Tabs.Tab>
                        <Tabs.Tab>McPackages </Tabs.Tab>
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

                        {/*              
                        <Tabs.Panel>{activeTab === 2 && <TreeRoot />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 3 && <Garden />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 4 && <TreeRoot />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 5 && <Garden />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 6 && <TreeRoot />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 7 && <Garden />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 8 && <TreeRoot />}</Tabs.Panel> */}
                    </Tabs.Panels>
                </Tabs>
            </SideSheetContainer>
        </div>
    );
}
