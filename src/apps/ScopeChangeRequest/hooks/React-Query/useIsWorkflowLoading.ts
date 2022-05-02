import { useIsFetching, useIsMutating } from 'react-query';
import { useScopeChangeContext } from '../context/useScopeChangeAccessContext';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../keys/scopeChangeQueryKeys';

export function useIsWorkflowLoading(): boolean {
    const id = useScopeChangeContext({ select: (s) => s.request.id });
    const { workflowKeys: workflowMutationKeys } = scopeChangeMutationKeys(id);
    const { workflowKeys } = scopeChangeQueryKeys(id);

    const workflowFetching = useIsFetching(workflowKeys.baseKey);
    const workflowMutating = useIsMutating(workflowMutationKeys.baseKey);

    return workflowFetching > 0 || workflowMutating > 0;
}
