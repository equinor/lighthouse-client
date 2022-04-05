import { Icon, Tabs } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

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
import { MenuItem } from '../../MenuButton';
import { tokens } from '@equinor/eds-tokens';
import { ScopeChangeRequestEditForm } from '../../Form/ScopeChangeRequestEditForm';

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

    const menuItems: MenuItem[] = [
        {
            icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
            label: 'Edit ',
            isDisabled: requestAccess.canPatch,
            onClick: toggleEditMode,
        },
    ];

    useEffect(() => {
        setEditMode(false);
        actions.setTitle(
            <>
                {item.sequenceNumber}, {item.title}
            </>
        );
        actions.setMenuItems(menuItems);
    }, [request?.id]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1100);
    }, []);

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
                    <ScopeChangeRequestEditForm request={item} close={toggleEditMode} />
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
