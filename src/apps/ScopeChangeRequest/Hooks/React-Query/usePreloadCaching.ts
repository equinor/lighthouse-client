import { QueryKeys } from '../../Enums/queryKeys';
import { getSystems } from '../../Api/PCS/getSystems';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { useInfiniteCachedQuery } from './useInfiniteCachedQuery';
import { getDisciplines } from '../../Api/PCS/getDisciplines';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';

/**
 * Preloads api calls that should never invalidate
 */
export function usePreloadCaching(): void {
    useInfiniteCachedQuery([QueryKeys.Systems], getSystems);
    useInfiniteCachedQuery([QueryKeys.FunctionalRole], getFunctionalRoles);
    useInfiniteCachedQuery([QueryKeys.Discipline], getDisciplines);

    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.removeQueries(QueryKeys.Systems);
            queryClient.removeQueries(QueryKeys.FunctionalRole);
            queryClient.removeQueries(QueryKeys.Discipline);
        };
    }, []);
}
