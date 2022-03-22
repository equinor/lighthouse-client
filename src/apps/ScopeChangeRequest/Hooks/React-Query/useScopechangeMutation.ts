import {
    useMutation,
    MutationFunction,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
    MutationKey,
} from 'react-query';
import { useDataContext } from '../../../../Core/WorkSpace/src/Context/DataProvider';

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
    const {
        dataApi: { queryKey: workspaceKey },
    } = useDataContext();

    function invalidate() {
        queryClient.invalidateQueries(workspaceKey);
    }

    return useMutation(mutationKey, mutationFn, {
        ...options,
        onSettled: invalidate,
    });
}
