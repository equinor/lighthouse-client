import { useIsFetching, useIsMutating } from 'react-query';
import { adminQueryKeys } from '../Queries/adminQueryKeys';

export function useIsAdminMutatingOrFetching(): boolean {
  const { baseKey } = adminQueryKeys();
  const isFetching = useIsFetching(baseKey, { active: true }) > 0;
  const isMutating = useIsMutating(baseKey) > 0;

  return isFetching || isMutating;
}
