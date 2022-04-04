import { useIsFetching, useIsMutating } from 'react-query';
import { useScopeChangeContext } from '../../context/useScopeChangeAccessContext';
import { scopeChangeMutationKeys } from '../../sKeys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../sKeys/scopeChangeQueryKeys';

export function useIsWorkflowLoading(): boolean {
    const { request } = useScopeChangeContext();
    const { workflowKeys: workflowMutationKeys } = scopeChangeMutationKeys(request.id);
    const { workflowKeys } = scopeChangeQueryKeys(request.id);

    const workflowFetching = useIsFetching(workflowKeys.baseKey);
    const workflowMutating = useIsMutating(workflowMutationKeys.baseKey);

    return workflowFetching > 0 || workflowMutating > 0;
}
