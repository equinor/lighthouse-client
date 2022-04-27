import { Tabs } from '@equinor/eds-core-react';
import { isProduction } from '@equinor/portal-client';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { ScopeChangeContext } from '../../../context/scopeChangeAccessContext';

import { useGetScopeChangeRequest } from '../../../hooks/queries/useGetScopeChangeRequest';
import { useEdsTabs } from '../../../hooks/edsTabs/useEdsTabs';
import { useOctopusErrorHandler } from '../../../hooks/observers/useOctopusErrorHandler';
import { useScopeChangeMutationWatcher } from '../../../hooks/observers/useScopeChangeMutationWatcher';
import { useScopeChangeAccess } from '../../../hooks/queries/useScopeChangeAccess';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from '../../ErrorBanner/ErrorBanner';
import { SidesheetBanner } from '../SidesheetBanner/SidesheetBanner';
import { LogTab, LogTabTitle } from '../Tabs/Log';
import { RequestTab, RequestTabTitle } from '../Tabs/Request';
import { WorkOrderTab, WorkOrderTabTitle } from '../Tabs/WorkOrders';
import { SidesheetTabList } from './SidesheetWrapper.styles';
import styled from 'styled-components';
import { ScopeChangeRequestEditForm } from '../../Form/ScopeChangeRequestEditForm';
import { useSidesheetEffects } from '../../../hooks/sidesheet/useSidesheetEffects';
import { swap, useAtom } from '@dbeining/react-atom';
import { sideSheetEditModeAtom } from '../../../Atoms/editModeAtom';
import { scopeChangeAtom } from '../../../Atoms/scopeChangeAtom';

interface SidesheetWrapperProps {
    item: ScopeChangeRequest;
    actions: SidesheetApi;
}

export function SidesheetWrapper({ item, actions }: SidesheetWrapperProps): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    const { activeTab, handleChange } = useEdsTabs();

    const request = useGetScopeChangeRequest(item.id, item);
    const requestAccess = useScopeChangeAccess(item.id);

    const toggleEditMode = () => swap(sideSheetEditModeAtom, (s) => !s);

    useSidesheetEffects(actions, toggleEditMode, item.id);

    useEffect(() => {
        swap(sideSheetEditModeAtom, () => false);
    }, [request?.id]);

    useEffect(() => {
        swap(scopeChangeAtom, () => ({
            actions,
            request: request ?? item,
            requestAccess,
        }));
    }, [request, requestAccess, item]);

    const editMode = useAtom(sideSheetEditModeAtom);

    return (
        <Wrapper>
            <ScopeChangeErrorBanner />
            <ScopeChangeContext.Provider
                value={{
                    request: request ?? item,
                    requestAccess: requestAccess,
                }}
            >
                {editMode ? (
                    <ScopeChangeRequestEditForm request={request ?? item} close={toggleEditMode} />
                ) : (
                    <>
                        <SidesheetBanner />
                        <Tabs activeTab={activeTab} onChange={handleChange}>
                            <SidesheetTabList>
                                <Tabs.Tab>
                                    <RequestTabTitle />
                                </Tabs.Tab>
                                <Tabs.Tab disabled={isProduction()}>
                                    <WorkOrderTabTitle />
                                </Tabs.Tab>
                                <Tabs.Tab>
                                    <LogTabTitle />
                                </Tabs.Tab>
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
            </ScopeChangeContext.Provider>
        </Wrapper>
    );
}

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
