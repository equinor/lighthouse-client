import { getSystems } from '../../Api/PCS/getSystems';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';
import { getDisciplines } from '../../Api/PCS/getDisciplines';
import { proCoSysQueryKeys } from '../../Keys/proCoSysQueryKeys';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
    const { disciplines, systems, functionalRoles } = proCoSysQueryKeys();

    useInfiniteCachedQuery(systems, getSystems);
    useInfiniteCachedQuery(functionalRoles, getFunctionalRoles);
    useInfiniteCachedQuery(disciplines, getDisciplines);
}
