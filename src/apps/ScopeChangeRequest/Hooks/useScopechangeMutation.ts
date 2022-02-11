import {
    useMutation,
    MutationFunction,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
} from 'react-query';
import { QueryKeys } from '../Api/ScopeChange/queryKeys';

export function useScopeChangeMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    mutationFn: MutationFunction<TData, TVariables>,
    options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables, TContext> {
    const queryClient = useQueryClient();
    function invalidate() {
        queryClient.invalidateQueries(QueryKeys.Scopechange);
        queryClient.invalidateQueries(QueryKeys.History);
        /**
         * Invalidate all options
         */
        const keys = queryClient.getQueryCache().getAll().map((query) => query.queryKey)
        keys.filter((queryKey) => queryKey.toString().startsWith("step") === true).forEach((queryKey) => queryClient.invalidateQueries(queryKey))
    }

    return useMutation(mutationFn, { ...options, onSettled: invalidate });
}
