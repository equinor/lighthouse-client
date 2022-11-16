import { useSideSheet } from '@equinor/sidesheet';
import { useGlobalMutationListener } from '@equinor/Workflow';
import { useQueryClient } from 'react-query';
import { adminQueries } from '../Queries/queries';

/**
 * Invalidates admin query if any mutation takes place
 * TODO: Scope to specific mutations
 */
export function useAdminMutationWatcher(requestId: string): void {
    const queryClient = useQueryClient();
    const baseKey = adminQueries.baseQuery(requestId).queryKey;

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
