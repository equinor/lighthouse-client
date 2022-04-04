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

export function SidesheetWrapper(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    const { activeTab, handleChange } = useEdsTabs();

    const request = useGetScopeChangeRequest(item.id, item);
    const requestAccess = useScopeChangeAccess(item.id);

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        //HACK: Increase width on mount
        setWidth(1000);
    }, []);

    return (
        <>
            <ScopeChangeErrorBanner />
            <ScopeChangeContext.Provider
                value={{
                    request: request ?? item,
                    requestAccess: requestAccess,
                }}
            >
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
                    <Tabs.Panels>
                        <Tabs.Panel>
                            <RequestTab />
                        </Tabs.Panel>
                        <Tabs.Panel>{activeTab === 1 && <WorkOrderTab />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 2 && <LogTab />}</Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </ScopeChangeContext.Provider>
        </>
    );
}
