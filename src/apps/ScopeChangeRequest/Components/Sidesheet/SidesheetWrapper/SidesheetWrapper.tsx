import { Tabs } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { useInternalSidesheetFunction } from '../../../../../packages/Sidesheet/Hooks/useInternalSidesheetFunction';
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

export function SidesheetWrapper(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    const { activeTab, handleChange } = useEdsTabs();

    const request = useGetScopeChangeRequest(item.id, item);
    const requestAccess = useScopeChangeAccess(item.id);

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        //HACK: Increase width on mount
        setWidth(1100);
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
                <Title>
                    {item.sequenceNumber}, {item.title}
                </Title>
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
            </ScopeChangeContext.Provider>
        </Wrapper>
    );
}

const Title = styled.div`
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: left;

    padding-left: 7px;
`;

const TabList = styled(Tabs.Panels)`
    padding: 24px 32px;
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 95%;
`;
