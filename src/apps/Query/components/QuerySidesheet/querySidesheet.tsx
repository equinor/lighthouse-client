import { Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer, SidesheetHeaderContent } from '@equinor/GardenUtils';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
//import { ModelViewerContextProvider } from '../../../../../packages/ModelViewer/context/modelViewerContext';
import { Query } from '../../model';

import { DetailsTab, CommpkgTab } from './Tabs';

interface querySideSheetProps {
    item: Query;
    actions: SidesheetApi;
}

export const QuerySideSheet = ({ item, actions }: querySideSheetProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    const queryProcosysUrl = proCoSysUrls.getQueryUrl(item.queryId ?? '');

    useEffect(() => {
        actions.setTitle(<SidesheetHeaderContent title={item.queryId} url={queryProcosysUrl} />);
    }, [item.queryId, queryProcosysUrl]);

    return (
        <SideSheetContainer>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Tabs.List>
                    <Tabs.Tab>Details</Tabs.Tab>
                    <Tabs.Tab>Commpkg</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panels>
                    <Tabs.Panel>
                        <DetailsTab query={item} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <CommpkgTab query={item} />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </SideSheetContainer>
    );
};
