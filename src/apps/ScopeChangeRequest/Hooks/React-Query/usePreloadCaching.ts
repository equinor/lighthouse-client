import { getSystems } from '../../Api/PCS/getSystems';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';
import { getDisciplines } from '../../Api/PCS/getDisciplines';
import { useProcosysQueryKeyGen } from './useProcosysQueryKeyGen';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
    const { disciplinesKey, functionalRolesKey, systemsKey } = useProcosysQueryKeyGen();

    useInfiniteCachedQuery(systemsKey, getSystems);
    useInfiniteCachedQuery(functionalRolesKey, getFunctionalRoles);
    useInfiniteCachedQuery(disciplinesKey, getDisciplines);
}
