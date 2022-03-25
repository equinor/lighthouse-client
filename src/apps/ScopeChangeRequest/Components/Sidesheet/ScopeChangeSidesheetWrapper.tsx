import { useEffect } from 'react';
import { useInternalSidesheetFunction } from '../../../../packages/Sidesheet/Hooks/useInternalSidesheetFunction';
import { useScopeChangeMutationWatcher } from '../../Hooks/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeRequestForm } from '../Form/ScopeChangeRequestForm';
import { ScopeChangeErrorBanner } from './ErrorBanner';
import { ScopeChangeSideSheet } from './ScopeChangeSidesheet';

export function ScopeChangeSidesheetWrapper(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        setWidth(1000);
    }, []);

    return (
        <>
            {/* <ScopeChangeErrorBanner />
            <ScopeChangeSideSheet {...item} /> */}
            <ScopeChangeRequestForm closeScrim={() => null}></ScopeChangeRequestForm>
        </>
    );
}
