import { useQuery, UseQueryOptions } from 'react-query';
import { canReassign, canSign, canUnsign } from '../Api/Access';
import { ServerError } from '../Api/Types/ServerError';
import { CacheTime } from '../Enums/cacheTimes';
import { useReleaseControlQueryKeyGen } from './React-Query/useReleaseControlQueryKeyGen';

interface CriteriaOptions {
    canSign: boolean | undefined;
    canUnsign: boolean | undefined;
    canReassign: boolean | undefined;
}

export function useWorkflowCriteriaOptions(
    processId: string,
    criteriaId: string,
    stepId: string,
    errorPipe?: (value: ServerError) => void
): CriteriaOptions {
    const params = {
        criteriaId,
        processId,
        stepId,
    };

    const queryParams: Omit<
        UseQueryOptions<boolean, string, boolean, string[]>,
        'queryKey' | 'queryFn'
    > = {
        refetchOnWindowFocus: false,
        retry: 3,
        staleTime: CacheTime.FiveMinutes,
        cacheTime: CacheTime.FiveMinutes,
        onError: (e: string) => {
            if (errorPipe) {
                errorPipe({ detail: e, title: 'Query failed', validationErrors: {} });
            }
        },
    };
    const { workflowKeys } = useReleaseControlQueryKeyGen(processId);
    const { criteriaCanSignKey, criteriaCanReassignKey, criteriaCanUnsignKey } = workflowKeys;

    const checkCanSign = () => canSign(params);
    const { data: userCanSign } = useQuery(
        criteriaCanSignKey(stepId, criteriaId),
        checkCanSign,
        queryParams
    );
    const checkCanReassign = () => canReassign(params);
    const { data: userCanReassign } = useQuery(
        criteriaCanReassignKey(stepId, criteriaId),
        checkCanReassign,
        queryParams
    );
    const checkCanUnsign = () => canUnsign(params);
    const { data: userCanUnsign } = useQuery(
        criteriaCanUnsignKey(stepId, criteriaId),
        checkCanUnsign,
        queryParams
    );

    return {
        canSign: userCanSign,
        canReassign: userCanReassign,
        canUnsign: userCanUnsign,
    };
}
