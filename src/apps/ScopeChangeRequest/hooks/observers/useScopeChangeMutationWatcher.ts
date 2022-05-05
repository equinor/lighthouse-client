import { useSideSheet } from '@equinor/sidesheet';
import { useQueryClient } from 'react-query';
import { scopeChangeQueryKeys } from '../../keys/scopeChangeQueryKeys';
import { useGlobalMutationListener } from './useGlobalMutationListener';

/**
 * Invalidates scope change query if any mutation takes place
 * TODO: Scope to specific mutations
 */
export function useScopeChangeMutationWatcher(requestId: string): void {
    const queryClient = useQueryClient();
    const { baseKey } = scopeChangeQueryKeys(requestId);

    //TODO: investigate
    //Maybe subscribe and unsub when requestId changes
    const { appName } = useSideSheet();

    useGlobalMutationListener({
        onMutationSettled: (mutationEvent) => {
            baseKey ? queryClient.invalidateQueries(baseKey) : queryClient.invalidateQueries();
            /** Only invalidate list if the mutation was a success */
            if (mutationEvent.state.status === 'success') {
                queryClient.invalidateQueries(appName);
            }
        },
    });
}
