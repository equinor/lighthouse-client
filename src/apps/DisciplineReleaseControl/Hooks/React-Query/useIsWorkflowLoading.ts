import { useIsFetching, useIsMutating } from 'react-query';
import { useReleaseControlContext } from '../../Components/Sidesheet/Context/useReleaseControlAccessContext';
import { useReleaseControlMutationKeyGen } from './useReleaseControlMutationKeyGen';
import { useReleaseControlQueryKeyGen } from './useReleaseControlQueryKeyGen';

export function useIsWorkflowLoading(): boolean {
    const { process } = useReleaseControlContext();
    const { workflowKeys: workflowMutationKeys } = useReleaseControlMutationKeyGen(process.id);
    const { workflowKeys } = useReleaseControlQueryKeyGen(process.id);

    const workflowFetching = useIsFetching(workflowKeys.baseKey);
    const workflowMutating = useIsMutating(workflowMutationKeys.baseKey);

    return workflowFetching > 0 || workflowMutating > 0;
}
