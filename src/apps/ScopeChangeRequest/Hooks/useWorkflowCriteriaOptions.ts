import { useQuery, UseQueryOptions } from 'react-query';
import { canReassign, canUnsign, canSign } from '../Api/ScopeChange/Access';
import { ServerError } from '../Types/ScopeChange/ServerError';
import { CacheTime } from '../Enums/cacheTimes';
import { useScopechangeQueryKeyGen } from './React-Query/useScopechangeQueryKeyGen';

interface CriteriaOptions {
    canSign: boolean | undefined;
    canUnsign: boolean | undefined;
    canReassign: boolean | undefined;
}

export function useWorkflowCriteriaOptions(
    requestId: string,
    criteriaId: string,
    stepId: string,
    errorPipe?: (value: ServerError) => void
): CriteriaOptions {
    const params = {
        criteriaId,
        requestId,
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
    const { workflowKeys } = useScopechangeQueryKeyGen(requestId);
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
