import { deref, useAtom } from '@dbeining/react-atom';
import { Tabs } from '@equinor/eds-core-react';
import { useEdsTabs } from '@equinor/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';
import { sideSheetEditModeAtom } from '../../../Atoms/editModeAtom';
import { scopeChangeAtom } from '../../../Atoms/scopeChangeAtom';
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
import { toggleEditMode } from './Utils/toggleEditMode';
import { resetEditMode } from './Utils/resetEditMode';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Types/SidesheetApi';

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

    const editMode = useAtom(sideSheetEditModeAtom);

    useEffect(() => {
        resetEditMode();
        updateContext(item, actions);
    }, [item?.id]);

    if (Object.keys(deref(scopeChangeAtom).request).length < 2) {
        return <></>;
    }

    return (
        <Wrapper>
            <ScopeChangeErrorBanner />
            {editMode ? (
                <ScopeChangeRequestEditForm
                    request={deref(scopeChangeAtom).request}
                    close={resetEditMode}
                />
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
