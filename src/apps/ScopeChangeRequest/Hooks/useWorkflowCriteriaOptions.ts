import { useQuery, UseQueryOptions } from 'react-query';
import { canReassign, canUnsign, canSign } from '../Api/ScopeChange/Access';
import { ServerError } from '../Types/ScopeChange/ServerError';

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
        staleTime: 5 * 1000 * 60,
        cacheTime: 5 * 1000 * 60,
        onError: (e: string) => {
            if (errorPipe) {
                errorPipe({ detail: e, title: 'Query failed', validationErrors: {} });
            }
        },
    };

    const checkCanSign = () => canSign(params);
    const { data: userCanSign } = useQuery(
        ['step', stepId, 'criteria', criteriaId],
        checkCanSign,
        queryParams
    );
    const checkCanReassign = () => canReassign(params);
    const { data: userCanReassign } = useQuery(
        ['step', stepId, 'criteria', criteriaId],
        checkCanReassign,
        queryParams
    );
    const checkCanUnsign = () => canUnsign(params);
    const { data: userCanUnsign } = useQuery(
        ['step', stepId, 'criteria', criteriaId],
        checkCanUnsign,
        queryParams
    );

    return {
        canSign: userCanSign,
        canReassign: userCanReassign,
        canUnsign: userCanUnsign,
    };
}
