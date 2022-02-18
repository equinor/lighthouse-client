import { QueryKeys } from '../../Enums/queryKeys';
import { getSystems } from '../../Api/PCS/getSystems';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';
import { getDisciplines } from '../../Api/PCS/getDisciplines';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
    useInfiniteCachedQuery([QueryKeys.Systems], getSystems);
    useInfiniteCachedQuery([QueryKeys.FunctionalRole], getFunctionalRoles);
    useInfiniteCachedQuery([QueryKeys.Discipline], getDisciplines);
}
