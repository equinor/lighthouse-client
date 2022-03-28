import { useEffect } from 'react';
import { useInternalSidesheetFunction } from '../../../../packages/Sidesheet/Hooks/useInternalSidesheetFunction';
import { useScopeChangeMutationWatcher } from '../../Hooks/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from './ErrorBanner';
import { ScopeChangeSideSheet } from './ScopeChangeSidesheet';
import { useOctopusErrorHandler } from './useOctopusErrorHandler';

export function ScopeChangeSidesheetWrapper(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);

    useOctopusErrorHandler();

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        //HACK: Increase width on mount
        setWidth(1000);
    }, []);

    return (
        <>
            <ScopeChangeErrorBanner />
            <ScopeChangeSideSheet {...item} />
        </>
    );
}
