import { useQueryClient } from 'react-query';
import { useDataContext } from '../../../Core/WorkSpace/src/Context/DataProvider';
import { useGlobalMutationListener } from '../Components/Sidesheet/useGlobalMutationListener';
import { scopeChangeQueryKeys } from '../Keys/scopeChangeQueryKeys';

/**
 * Invalidates scope change query if any mutation takes place
 * TODO: Scope to specific mutations
 */
export function useScopeChangeMutationWatcher(requestId: string): void {
    const queryClient = useQueryClient();
    const { baseKey } = scopeChangeQueryKeys(requestId);

    const {
        dataApi: { queryKey: workspaceKey },
    } = useDataContext();

    useGlobalMutationListener({
        onMutationSettled: (mutationEvent) => {
            baseKey ? queryClient.invalidateQueries(baseKey) : queryClient.invalidateQueries();
            /** Only invalidate list if the mutation was a success */
            if (mutationEvent.state.status === 'success') {
                queryClient.invalidateQueries(workspaceKey);
            }
        },
    });
}
