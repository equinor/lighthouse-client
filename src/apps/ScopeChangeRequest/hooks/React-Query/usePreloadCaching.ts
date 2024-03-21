import { useFacility } from '../../../../Core/Client/Hooks';
import { useQuery } from 'react-query';
import { proCoSysQueries } from '@equinor/Workflow';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
  const { procosysPlantId } = useFacility();
  const { getSystemsQuery, getFunctionalRolesQuery, getDisciplinesQuery } = proCoSysQueries;

  useQuery(getSystemsQuery(procosysPlantId));
  useQuery(getFunctionalRolesQuery(procosysPlantId));
  useQuery(getDisciplinesQuery(procosysPlantId));
}
