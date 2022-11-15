import { useIsFetching, useIsMutating } from 'react-query';
import { adminQueryKeys } from '../Queries/workflowQueryKeys';

export function useIsAdminMutatingOrFetching(id: string): boolean {
    const { baseKey } = adminQueryKeys(id);
    const isFetching = useIsFetching(baseKey, { active: true }) > 0;
    const isMutating = useIsMutating(baseKey) > 0;

    return isFetching || isMutating;
}
