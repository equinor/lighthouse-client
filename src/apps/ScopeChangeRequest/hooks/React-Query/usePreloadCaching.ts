import { getSystems } from '../../api/PCS/getSystems';
import { getFunctionalRoles } from '../../api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';
import { getDisciplines } from '../../api/PCS/getDisciplines';
import { proCoSysQueryKeys } from '../../keys/proCoSysQueryKeys';
import { useFacility } from '../../../../Core/Client/Hooks';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
    const { disciplines, systems, functionalRoles } = proCoSysQueryKeys();
    const { procosysPlantId } = useFacility();

    useInfiniteCachedQuery(systems, () => getSystems(procosysPlantId));
    useInfiniteCachedQuery(functionalRoles, () => getFunctionalRoles(procosysPlantId));
    useInfiniteCachedQuery(disciplines, () => getDisciplines(procosysPlantId));
}
