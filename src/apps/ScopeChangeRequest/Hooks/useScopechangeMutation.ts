import {
    useMutation,
    MutationFunction,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutationKey,
    QueryKey,
} from 'react-query';
import { QueryKeys } from '../Api/ScopeChange/queryKeys';

export function useScopeChangeMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    mutationKey: MutationKey,
    mutationFn: MutationFunction<TData, TVariables>,
    options?: Omit<
        UseMutationOptions<TData, TError, TVariables, TContext>,
        'mutationFn' | 'onSettled'
    >,
    invalidateKeys?: QueryKey
): UseMutationResult<TData, TError, TVariables, TContext> {
    const queryClient = useQueryClient();

    function invalidate() {
        if (invalidateKeys) {
            queryClient.invalidateQueries(invalidateKeys);
        } else {
            queryClient.invalidateQueries(QueryKeys.Scopechange);
            queryClient.invalidateQueries(QueryKeys.History);
            queryClient.invalidateQueries(QueryKeys.Step);
        }
    }

    return useMutation(mutationKey, mutationFn, { ...options, onSettled: invalidate });
}
