import { useSideSheet } from '@equinor/sidesheet';
import {
    MutationFunction,
    MutationKey,
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
} from 'react-query';
import { scopeChangeQueryKeys } from '../../keys/scopeChangeQueryKeys';

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
    const { appName } = useSideSheet();

    const { baseKey } = scopeChangeQueryKeys(requestId);
    function invalidate() {
        queryClient.invalidateQueries(appName);
        queryClient.invalidateQueries(baseKey);
    }

    return useMutation(mutationKey, mutationFn, {
        ...options,
        retry: 0,
        onSettled: invalidate,
    });
}
