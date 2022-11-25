import { Tabs } from '@equinor/eds-core-react';
import { SideSheetContainer, SidesheetHeaderContent } from '@equinor/GardenUtils';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { Punch } from '../../types';
import { DetailsTab } from './Tabs';

interface punchSideSheetProps {
    item: Punch;
    actions: SidesheetApi;
}

export const PunchSideSheet = ({ item, actions }: punchSideSheetProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };
    const punchProcosysurl = proCoSysUrls.getPunchUrl(item.punchItemNo ?? '');

    useEffect(() => {
        actions.setTitle(
            <SidesheetHeaderContent title={item.punchItemNo} url={punchProcosysurl} />
        );
    }, [item.punchItemNo, punchProcosysurl]);

    return (
        <SideSheetContainer>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <Tabs.List>
                    <Tabs.Tab>Details</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panels>
                    <Tabs.Panel>
                        <DetailsTab punch={item} />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </SideSheetContainer>
    );
};
