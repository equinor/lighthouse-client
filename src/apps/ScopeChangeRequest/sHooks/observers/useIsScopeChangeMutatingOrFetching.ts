import { useIsFetching, useIsMutating } from 'react-query';
import { scopeChangeQueryKeys } from '../../sKeys/scopeChangeQueryKeys';

export function useIsScopeChangeMutatingOrFetching(id: string): boolean {
    const { baseKey } = scopeChangeQueryKeys(id);
    const isFetching = useIsFetching(baseKey, { active: true }) > 0;
    const isMutating = useIsMutating(baseKey) > 0;

    return isFetching || isMutating;
}
