import { useIsFetching, useIsMutating } from 'react-query';
import { releaseControlQueryKeys } from '../queries/releaseControlQueryKeys';

export function useIsReleaseControlMutatingOrFetching(id: string): boolean {
    const { baseKey } = releaseControlQueryKeys(id);
    const isFetching = useIsFetching(baseKey, { active: true }) > 0;
    const isMutating = useIsMutating(baseKey) > 0;

    return isFetching || isMutating;
}
