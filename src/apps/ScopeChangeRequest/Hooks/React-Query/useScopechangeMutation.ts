import {
    useMutation,
    MutationFunction,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutationKey,
} from 'react-query';
import { useScopechangeQueryKeyGen } from './useScopechangeQueryKeyGen';

export function useScopeChangeMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    requestId: string,
    mutationKey: MutationKey,
    mutationFn: MutationFunction<TData, TVariables>,
    options?: Omit<
        UseMutationOptions<TData, TError, TVariables, TContext>,
        'mutationFn' | 'onSettled'
    >
): UseMutationResult<TData, TError, TVariables, TContext> {
    const queryClient = useQueryClient();
    const { baseKey } = useScopechangeQueryKeyGen(requestId);

    function invalidate() {
        queryClient.invalidateQueries(baseKey);
    }

    return useMutation(mutationKey, mutationFn, { ...options, onSettled: invalidate });
}
