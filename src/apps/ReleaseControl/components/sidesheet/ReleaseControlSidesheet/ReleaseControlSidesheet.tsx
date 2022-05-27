import { createAtom } from '@equinor/atom';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { useEdsTabs } from '../../../../../hooks/edsTabs/useEdsTabs';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Types/SidesheetApi';
import { BannerItem } from '../../../../DisciplineReleaseControl/Components/Sidesheet/ReleaseControlSidesheetBanner';
import { Banner } from '../../../../ScopeChangeRequest/Components/Sidesheet/SidesheetBanner/SidesheetBanner';
import { toggleEditMode } from '../../../Atoms/editModeAtom';
import { getReleaseControlSnapshot } from '../../../hooks/useReleaseControlContext';
import { useSidesheetEffects } from '../../../hooks/useSidesheetEffects';
import { ReleaseControl } from '../../../types/releaseControl';
import { DetailsTab } from './Tabs/DetailsTab';
import { HistoryTab } from './Tabs/HistoryTab';

interface ReleaseControlSidesheetProps {
    item: ReleaseControl;
    actions: SidesheetApi;
}
export const ReleaseControlSidesheet = ({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element => {
    const { activeTab, handleChange } = useEdsTabs();
    useSidesheetEffects(actions, toggleEditMode, item);

    if (Object.keys(getReleaseControlSnapshot().releaseControl).length < 2) {
        return <></>;
    }

    return (
        <div>
            <Banner>
                <BannerItem title="" />
                <BannerItem title={'Phase'} value={item.phase} />
                <BannerItem title={'Status'} value={item.workflowStatus} />
                <BannerItem title={'State'} value={item.isVoided ? 'Voided' : item.state} />
            </Banner>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <HeaderTab>
                        <div>Details</div>
                    </HeaderTab>

                    <HeaderTab>History</HeaderTab>
                </SidesheetTabList>
                <TabList>
                    <Tab>
                        <DetailsTab />
                    </Tab>

                    <Tab>
                        <HistoryTab />
                    </Tab>
                </TabList>
            </Tabs>
        </div>
    );
};

const HeaderTab = styled(Tabs.Tab)``;
export const relaseControlSidesheetContext = createAtom({});
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;
