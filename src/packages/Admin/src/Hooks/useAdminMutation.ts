import { useSideSheet } from '@equinor/sidesheet';
import {
  MutationFunction,
  MutationKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { adminQueryKeys } from '../Queries/adminQueryKeys';

export function useAdminMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  workflowId: string,
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn' | 'onSettled'
  >
): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();
  const { appName } = useSideSheet();

  const { baseKey } = adminQueryKeys();
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
