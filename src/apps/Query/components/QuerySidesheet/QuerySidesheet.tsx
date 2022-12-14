import { Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer, SidesheetHeaderContent } from '@equinor/GardenUtils';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Query } from '../../types';
import { DetailsTab, CommpkgTab } from './Tabs';

type QuerySideSheetProps = {
    item: Query;
    actions: SidesheetApi;
};
const SubHeader = styled.div`
    margin: 0 8px 8px;
`;
export const QuerySideSheet = ({ item, actions }: QuerySideSheetProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    const queryProcosysUrl = proCoSysUrls.getQueryUrl(item.queryUrlId ?? '');

    useEffect(() => {
        actions.setTitle(<SidesheetHeaderContent title={item.queryNo} url={queryProcosysUrl} />);
    }, [item.queryNo, queryProcosysUrl]);

    return (
        <SideSheetContainer>
            <SubHeader> {item.title}</SubHeader>
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
