import { useIsFetching, useIsMutating } from 'react-query';
import { useScopeChangeContext } from '../../Components/Sidesheet/Context/useScopeChangeAccessContext';
import { useScopechangeMutationKeyGen } from './useScopechangeMutationKeyGen';
import { useScopechangeQueryKeyGen } from './useScopechangeQueryKeyGen';

export function useIsWorkflowLoading(): boolean {
    const { request } = useScopeChangeContext();
    const { workflowKeys: workflowMutationKeys } = useScopechangeMutationKeyGen(request.id);
    const { workflowKeys } = useScopechangeQueryKeyGen(request.id);

    const workflowFetching = useIsFetching(workflowKeys.baseKey);
    const workflowMutating = useIsMutating(workflowMutationKeys.baseKey);

    return workflowFetching > 0 || workflowMutating > 0;
}
