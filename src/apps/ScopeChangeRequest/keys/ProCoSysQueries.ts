import { UseQueryOptions } from 'react-query';
import { getAreaByCode } from '../api/PCS/getAreaByCode';
import { getCommPkgById } from '../api/PCS/getCommPkgById';
import { getDisciplines } from '../api/PCS/getDisciplines';
import { getFunctionalRoles } from '../api/PCS/getFunctionalRoles';
import { getSystems } from '../api/PCS/getSystems';
import { getTagById } from '../api/PCS/getTagById';
import { CacheTime } from '../enum/cacheTimes';

export const ProCoSysBaseKey = ['ProCoSys'];

type Options = Pick<UseQueryOptions, 'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey'>;

export const ProCoSysQueries = {
    getAreaByCodeQuery: (areaCode: string, plantId: string): Options => ({
        queryFn: () => getAreaByCode(plantId, areaCode),
        queryKey: [...ProCoSysBaseKey, 'Area', areaCode],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getDisciplinesQuery: (plantId: string): Options => ({
        queryFn: () => getDisciplines(plantId),
        queryKey: [...ProCoSysBaseKey, 'Disciplines'],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getCommPkgByCodeQuery: (commPkgId: number, plantId: string): Options => ({
        queryFn: () => getCommPkgById(plantId, commPkgId),
        queryKey: [...ProCoSysBaseKey, 'CommPkg', commPkgId],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getTagByNoQuery: (tagId: number, plantId: string): Options => ({
        queryFn: () => getTagById(plantId, tagId),
        queryKey: [...ProCoSysBaseKey, 'tag', tagId],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getSystemsQuery: (plantId: string): Options => ({
        queryFn: () => getSystems(plantId),
        queryKey: [...ProCoSysBaseKey, 'systems'],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getFunctionalRolesQuery: (plantId: string): Options => ({
        queryFn: () => getFunctionalRoles(plantId),
        queryKey: [...ProCoSysBaseKey, 'FunctionalRoles'],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
};
