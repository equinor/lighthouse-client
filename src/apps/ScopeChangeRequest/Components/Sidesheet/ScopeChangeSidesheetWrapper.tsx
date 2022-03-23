import { useScopeChangeMutationWatcher } from '../../Hooks/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from './ErrorBanner';
import { ScopeChangeSideSheet } from './ScopeChangeSidesheet';

export function ScopeChangeSidesheetWrapper(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    return (
        <>
            <ScopeChangeErrorBanner />
            <ScopeChangeSideSheet {...item} />;
        </>
    );
}
