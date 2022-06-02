import { UseQueryOptions } from 'react-query';
import { getAreaByCode } from '../api/releaseControl/PCS/getAreaByCode';
import { getFunctionalRoles } from '../api/releaseControl/PCS/getFunctionalRoles';
import { getTagById } from '../api/releaseControl/PCS/getTagById';
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
    getTagByNoQuery: (tagId: number, plantId: string): Options => ({
        queryFn: ({ signal }) => getTagById(plantId, tagId, signal),
        queryKey: [...ProCoSysBaseKey, 'tag', tagId],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getAreaByCodeQuery: (areaCode: string, plantId: string): Options => ({
        queryFn: ({ signal }) => getAreaByCode(plantId, areaCode, signal),
        queryKey: [...ProCoSysBaseKey, 'Area', areaCode],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
};
