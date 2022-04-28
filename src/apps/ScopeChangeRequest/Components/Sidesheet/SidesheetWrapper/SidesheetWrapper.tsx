import { Tabs } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { useGetScopeChangeRequest } from '../../../hooks/queries/useGetScopeChangeRequest';
import { useEdsTabs } from '../../../hooks/edsTabs/useEdsTabs';
import { useScopeChangeAccess } from '../../../hooks/queries/useScopeChangeAccess';
import { useScopeChangeMutationWatcher } from '../../../hooks/observers/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { ScopeChangeContext } from '../../../context/scopeChangeAccessContext';
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
import { isProduction } from '../../../../../Core/Client/Functions';
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
