import { UseQueryOptions } from 'react-query';
import { getFunctionalRoles } from '../api/releaseControl/PCS/getFunctionalRoles';
import { CacheTime } from '../Enums/cacheTimes';

export const ProCoSysBaseKey = ['ProCoSysReleaseControl'];

type Options = Pick<UseQueryOptions, 'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey'>;

export const ProCoSysQueries = {
    getFunctionalRolesQuery: (plantId: string, classification?: string | undefined): Options => ({
        queryFn: ({ signal }) => getFunctionalRoles(plantId, classification, signal),
        queryKey: [...ProCoSysBaseKey, 'FunctionalRoles', classification],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
};
