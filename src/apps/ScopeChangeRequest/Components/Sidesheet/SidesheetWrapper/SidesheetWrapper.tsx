import { useAtom } from '@dbeining/react-atom';
import { Tabs } from '@equinor/eds-core-react';
import { useEdsTabs } from '@equinor/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';

import {
    disableEditMode,
    sideSheetEditModeAtom,
    toggleEditMode,
} from '../../../Atoms/editModeAtom';
import { useOctopusErrorHandler } from '../../../hooks/observers/useOctopusErrorHandler';
import { useScopeChangeMutationWatcher } from '../../../hooks/observers/useScopeChangeMutationWatcher';
import { useGetScopeChangeRequest } from '../../../hooks/queries/useGetScopeChangeRequest';
import { useScopeChangeAccess } from '../../../hooks/queries/useScopeChangeAccess';
import { useSidesheetEffects } from '../../../hooks/sidesheet/useSidesheetEffects';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from '../../ErrorBanner/ErrorBanner';
import { ScopeChangeRequestEditForm } from '../../Form/ScopeChangeRequestEditForm';
import { SidesheetBanner } from '../SidesheetBanner/SidesheetBanner';
import { LogTab, LogTabTitle } from '../Tabs/Log';
import { RequestTab, RequestTabTitle } from '../Tabs/Request';
import { WorkOrderTab, WorkOrderTabTitle } from '../Tabs/WorkOrders';
import { SidesheetTabList } from './SidesheetWrapper.styles';
import { updateContext } from './Utils/updateContext';

import { SidesheetApi } from '@equinor/sidesheet';
import { getScopeChangeSnapshot } from '../../../hooks/context/useScopeChangeContext';
import { scopeChangeRequestStats } from '../../../workspaceConfig/dataOptions';

interface SidesheetWrapperProps {
    item: ScopeChangeRequest;
    actions: SidesheetApi;
}

export function SidesheetWrapper({ item, actions }: SidesheetWrapperProps): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    useGetScopeChangeRequest(item.id, item);
    useScopeChangeAccess(item.id);
    useSidesheetEffects(actions, toggleEditMode, item.id);

    const { activeTab, handleChange } = useEdsTabs();
    const { readAtomValue } = scopeChangeRequestStats;

    console.log(readAtomValue());

    const editMode = useAtom(sideSheetEditModeAtom);

    useEffect(() => {
        disableEditMode();
        updateContext(item, actions);
    }, [item?.id]);

    if (Object.keys(getScopeChangeSnapshot().request).length < 2) {
        return <></>;
    }

    return (
        <Wrapper>
            <ScopeChangeErrorBanner />
            {editMode ? (
                <ScopeChangeRequestEditForm />
            ) : (
                <>
                    <SidesheetBanner />
                    <Tabs activeTab={activeTab} onChange={handleChange}>
                        <SidesheetTabList>
                            <HeaderTab>
                                <RequestTabTitle />
                            </HeaderTab>
                            <HeaderTab>
                                <WorkOrderTabTitle />
                            </HeaderTab>
                            <HeaderTab>
                                <LogTabTitle />
                            </HeaderTab>
                        </SidesheetTabList>
                        <TabList>
                            <Tab>
                                <RequestTab />
                            </Tab>
                            <Tab>{activeTab === 1 && <WorkOrderTab />}</Tab>
                            <Tab>{activeTab === 2 && <LogTab />}</Tab>
                        </TabList>
                    </Tabs>
                </>
            )}
        </Wrapper>
    );
}

const HeaderTab = styled(Tabs.Tab)``;

const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;

const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 90%;
`;
