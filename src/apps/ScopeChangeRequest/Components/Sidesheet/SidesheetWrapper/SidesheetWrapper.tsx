import { Tabs } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ScopeChangeContext } from '../../../context/scopeChangeAccessContext';
import { useEdsTabs } from '../../../hooks/edsTabs/useEdsTabs';
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
    const [editMode, setEditMode] = useState<boolean>(false);
    const toggleEditMode = () => setEditMode((prev) => !prev);
    useSidesheetEffects(actions, toggleEditMode, item.id);

    useEffect(() => {
        setEditMode(false);
    }, [request?.id]);

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
                                <Tabs.Tab disabled>
                                    <WorkOrderTabTitle />
                                </Tabs.Tab>
                                <Tabs.Tab>
                                    <LogTabTitle />
                                </Tabs.Tab>
                            </SidesheetTabList>
                            <TabList>
                                <Tabs.Panel>
                                    <RequestTab />
                                </Tabs.Panel>
                                <Tabs.Panel>{activeTab === 1 && <WorkOrderTab />}</Tabs.Panel>
                                <Tabs.Panel>{activeTab === 2 && <LogTab />}</Tabs.Panel>
                            </TabList>
                        </Tabs>
                    </>
                )}
            </ScopeChangeContext.Provider>
        </Wrapper>
    );
}

const TabList = styled(Tabs.Panels)`
    padding: 24px 32px;
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 95%;
`;
