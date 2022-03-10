import { UseQueryOptions } from 'react-query';
import { canReassign, canUnsign, canSign } from '../Api/ScopeChange/Access';
import { ServerError } from '../Types/ScopeChange/ServerError';
import { CacheTime } from '../Enums/cacheTimes';
import { useScopechangeQueryKeyGen } from './React-Query/useScopechangeQueryKeyGen';
import { useScopeChangeQuery } from './React-Query/useScopeChangeQuery';

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
    const { data: userCanSign } = useScopeChangeQuery(
        criteriaCanSignKey(stepId, criteriaId),
        checkCanSign,
        'Failed to get permissions',
        queryParams
    );
    const checkCanReassign = () => canReassign(params);
    const { data: userCanReassign } = useScopeChangeQuery(
        criteriaCanReassignKey(stepId, criteriaId),
        checkCanReassign,
        'Failed to get permissions',
        queryParams
    );
    const checkCanUnsign = () => canUnsign(params);
    const { data: userCanUnsign } = useScopeChangeQuery(
        criteriaCanUnsignKey(stepId, criteriaId),
        checkCanUnsign,
        'Failed to get permissions',
        queryParams
    );

    return {
        canSign: userCanSign,
        canReassign: userCanReassign,
        canUnsign: userCanUnsign,
    };
}
