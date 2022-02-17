import { useQuery } from 'react-query';

import { QueryKeys } from '../Api/ScopeChange/queryKeys';
import { getSystems } from '../Api/PCS/getSystems';
import { getFunctionalRoles } from '../Api/PCS/getFunctionalRoles';

/**
 * Preloads api calls that should never invalidate
 */
//10 hour cache
const LONG_CACHE = 10 * 1000 * 60 * 60;
export function usePreloadCaching(): void {
    useQuery(QueryKeys.Systems, getSystems, {
        staleTime: LONG_CACHE,
        cacheTime: LONG_CACHE,
    });

    useQuery([QueryKeys.FunctionalRole], getFunctionalRoles, {
        staleTime: LONG_CACHE,
        cacheTime: LONG_CACHE,
    });
}
