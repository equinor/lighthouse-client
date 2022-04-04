import { Tabs } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { useInternalSidesheetFunction } from '../../../../../packages/Sidesheet/Hooks/useInternalSidesheetFunction';
import { useGetScopeChangeRequest } from '../../../sHooks/queries/useGetScopeChangeRequest';
import { useEdsTabs } from '../../../sHooks/edsTabs/useEdsTabs';
import { useScopeChangeAccess } from '../../../sHooks/queries/useScopeChangeAccess';
import { useScopeChangeMutationWatcher } from '../../../sHooks/observers/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../../sTypes/scopeChangeRequest';
import { ScopeChangeContext } from '../../../scontext/scopeChangeAccessContext';
import { ScopeChangeErrorBanner } from '../../ErrorBanner/ErrorBanner';
import { SidesheetBanner } from '../SidesheetBanner/SidesheetBanner';
import { LogTabTitle, LogTab } from '../Tabs/Log';
import { RequestTabTitle, RequestTab } from '../Tabs/Request';
import { WorkOrderTabTitle, WorkOrderTab } from '../Tabs/WorkOrders';
import { useOctopusErrorHandler } from '../../../sHooks/observers/useOctopusErrorHandler';
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
