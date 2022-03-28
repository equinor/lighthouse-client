import { getSystems } from '../../Api/PCS/getSystems';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';
import { getDisciplines } from '../../Api/PCS/getDisciplines';
import { proCoSysQueryKeys } from '../../Keys/proCoSysQueryKeys';
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
