import { Tabs } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { useGetScopeChangeRequest } from '../../../hooks/queries/useGetScopeChangeRequest';
import { useEdsTabs } from '../../../hooks/edsTabs/useEdsTabs';
import { useScopeChangeAccess } from '../../../hooks/queries/useScopeChangeAccess';
import { useScopeChangeMutationWatcher } from '../../../hooks/observers/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from '../../ErrorBanner/ErrorBanner';
import { SidesheetBanner } from '../SidesheetBanner/SidesheetBanner';
import { LogTabTitle, LogTab } from '../Tabs/Log';
import { RequestTabTitle, RequestTab } from '../Tabs/Request';
import { WorkOrderTabTitle, WorkOrderTab } from '../Tabs/WorkOrders';
import { useOctopusErrorHandler } from '../../../hooks/observers/useOctopusErrorHandler';
import { SidesheetTabList } from './SidesheetWrapper.styles';
import styled from 'styled-components';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { ScopeChangeRequestEditForm } from '../../Form/ScopeChangeRequestEditForm';
import { useSidesheetEffects } from '../../../hooks/sidesheet/useSidesheetEffects';
import { deref, swap, useAtom } from '@dbeining/react-atom';
import { sideSheetEditModeAtom } from '../../../Atoms/editModeAtom';
import { scopeChangeAtom } from '../../../Atoms/scopeChangeAtom';

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

    function toggleEditMode() {
        swap(sideSheetEditModeAtom, (s) => !s);
    }

    useEffect(() => {
        swap(sideSheetEditModeAtom, () => false);
        swap(scopeChangeAtom, (old) => ({
            ...old,
            request: item,
            actions: actions,
        }));
    }, [item?.id]);

    return (
        <Wrapper>
            <ScopeChangeErrorBanner />
            {editMode ? (
                <ScopeChangeRequestEditForm
                    request={deref(scopeChangeAtom).request}
                    close={toggleEditMode}
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
