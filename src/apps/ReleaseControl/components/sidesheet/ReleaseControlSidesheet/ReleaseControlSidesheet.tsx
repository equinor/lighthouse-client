import { useAtom } from '@dbeining/react-atom';
import { createAtom } from '@equinor/atom';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useEdsTabs } from '../../../../../hooks/edsTabs/useEdsTabs';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Types/SidesheetApi';
import { BannerItem } from '../../../../DisciplineReleaseControl/Components/Sidesheet/ReleaseControlSidesheetBanner';
import { Banner } from '../../../../ScopeChangeRequest/Components/Sidesheet/SidesheetBanner/SidesheetBanner';
import {
    disableEditMode,
    sideSheetEditModeAtom,
    toggleEditMode,
} from '../../../Atoms/editModeAtom';
import { useGetReleaseControl } from '../../../hooks/useGetReleaseControl';
import { useReleaseControlAccess } from '../../../hooks/useReleaseControlAccess';
import { getReleaseControlSnapshot } from '../../../hooks/useReleaseControlContext';
import { useReleaseControlMutationWatcher } from '../../../hooks/useReleaseControlMutationWatcher';
import { useSidesheetEffects } from '../../../hooks/useSidesheetEffects';
import { ReleaseControl } from '../../../types/releaseControl';
import { ReleaseControlEditForm } from '../../Form/ReleaseControlEditForm';
import { DetailsTab } from './Tabs/DetailsTab';
import { HistoryTab } from './Tabs/HistoryTab';
import { updateContext } from './updateContext';

interface ReleaseControlSidesheetProps {
    item: ReleaseControl;
    actions: SidesheetApi;
}
export const ReleaseControlSidesheet = ({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element => {
    useReleaseControlMutationWatcher(item.id);
    useGetReleaseControl(item.id, item);
    useReleaseControlAccess(item.id);
    useSidesheetEffects(actions, toggleEditMode, item);

    const { activeTab, handleChange } = useEdsTabs();

    const editMode = useAtom(sideSheetEditModeAtom);

    useEffect(() => {
        disableEditMode();
        updateContext(item, actions);
    }, [item?.id]);

    if (Object.keys(getReleaseControlSnapshot().releaseControl).length < 2) {
        return <></>;
    }

    return editMode ? (
        <ReleaseControlEditForm />
    ) : (
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
