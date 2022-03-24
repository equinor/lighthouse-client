import { useIsFetching, useIsMutating } from 'react-query';
import { useScopeChangeContext } from '../../Components/Sidesheet/Context/useScopeChangeAccessContext';
import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';

export function useIsWorkflowLoading(): boolean {
    const { request } = useScopeChangeContext();
    const { workflowKeys: workflowMutationKeys } = scopeChangeMutationKeys(request.id);
    const { workflowKeys } = scopeChangeQueryKeys(request.id);

    const workflowFetching = useIsFetching(workflowKeys.baseKey);
    const workflowMutating = useIsMutating(workflowMutationKeys.baseKey);

    return workflowFetching > 0 || workflowMutating > 0;
}
