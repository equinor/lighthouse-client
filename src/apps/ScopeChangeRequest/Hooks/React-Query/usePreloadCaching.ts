import { QueryKeys } from '../../Api/ScopeChange/queryKeys';
import { getSystems } from '../../Api/PCS/getSystems';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
    useInfiniteCachedQuery([QueryKeys.Systems], getSystems);
    useInfiniteCachedQuery([QueryKeys.FunctionalRole], getFunctionalRoles);
}
