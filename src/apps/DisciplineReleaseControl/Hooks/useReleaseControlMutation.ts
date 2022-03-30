import {
    useMutation,
    MutationFunction,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutationKey,
} from 'react-query';
import { useReleaseControlQueryKeyGen } from './React-Query/useReleaseControlQueryKeyGen';

export function useReleaseControlMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    processId: string,
    mutationKey: MutationKey,
    mutationFn: MutationFunction<TData, TVariables>,
    options?: Omit<
        UseMutationOptions<TData, TError, TVariables, TContext>,
        'mutationFn' | 'onSettled'
    >
): UseMutationResult<TData, TError, TVariables, TContext> {
    const queryClient = useQueryClient();
    const { baseKey } = useReleaseControlQueryKeyGen(processId);

    function invalidate() {
        queryClient.invalidateQueries(baseKey);
    }

    return useMutation(mutationKey, mutationFn, { ...options, onSettled: invalidate });
}
