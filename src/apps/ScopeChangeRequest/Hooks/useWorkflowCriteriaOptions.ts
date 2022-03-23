import { UseQueryOptions } from 'react-query';
import { canReassign, canUnsign, canSign } from '../Api/ScopeChange/Access';
import { CacheTime } from '../Enums/cacheTimes';
import { scopeChangeQueryKeys } from '../Keys/scopeChangeQueryKeys';
import { useScopeChangeQuery } from './React-Query/useScopeChangeQuery';

interface CriteriaOptions {
    canSign: boolean | undefined;
    canUnsign: boolean | undefined;
    canReassign: boolean | undefined;
}

export function useWorkflowCriteriaOptions(
    requestId: string,
    criteriaId: string,
    stepId: string
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
    };
    const { workflowKeys } = scopeChangeQueryKeys(requestId);
    const { criteriaCanSignKey, criteriaCanReassignKey, criteriaCanUnsignKey } = workflowKeys;

    const checkCanSign = () => canSign(params);
    const { data: userCanSign } = useScopeChangeQuery(
        criteriaCanSignKey(stepId, criteriaId),
        checkCanSign,
        queryParams
    );
    const checkCanReassign = () => canReassign(params);
    const { data: userCanReassign } = useScopeChangeQuery(
        criteriaCanReassignKey(stepId, criteriaId),
        checkCanReassign,
        queryParams
    );
    const checkCanUnsign = () => canUnsign(params);
    const { data: userCanUnsign } = useScopeChangeQuery(
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
