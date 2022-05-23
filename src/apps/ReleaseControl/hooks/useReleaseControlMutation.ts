import { useSideSheet } from '@equinor/sidesheet';
import {
    MutationFunction,
    MutationKey,
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
} from 'react-query';
import { releaseControlQueries } from '../queries/queries';

export function useReleaseControlMutation<
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

    const baseKey = releaseControlQueries.baseQuery(requestId).queryKey;
    function invalidate() {
        queryClient.invalidateQueries(appName);
        queryClient.invalidateQueries(baseKey);
    }

    return useMutation(mutationKey, mutationFn, {
        ...options,
        retry: false,
        onSettled: invalidate,
    });
}
