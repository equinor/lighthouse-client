import { CacheTime } from '@equinor/Workflow';
import { UseQueryOptions } from 'react-query';
import { System } from '../../Types/ProCoSys/system';
import { getAreaByCode } from './getAreaByCode';
import { getCommPkgById } from './getCommPkgById';
import { getDisciplines } from './getDisciplines';
import { getFunctionalRoles } from './getFunctionalRoles';
import { getMcPkgById } from './getMcPkgById';
import { getSystems } from './getSystems';
import { getTagById } from './getTagById';

export const ProCoSysBaseKey = ['ProCoSys'];

type Options = Pick<UseQueryOptions, 'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey'>;

export const proCoSysQueries = {
    getAreaByCodeQuery: (areaCode: string, plantId: string): Options => ({
        queryFn: ({ signal }) => getAreaByCode(plantId, areaCode, signal),
        queryKey: [...ProCoSysBaseKey, 'Area', areaCode],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getDisciplinesQuery: (plantId: string): Options => ({
        queryFn: ({ signal }) => getDisciplines(plantId, signal),
        queryKey: [...ProCoSysBaseKey, 'Disciplines'],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getCommPkgByCodeQuery: (commPkgId: number, plantId: string): Options => ({
        queryFn: ({ signal }) => getCommPkgById(plantId, commPkgId, signal),
        queryKey: [...ProCoSysBaseKey, 'CommPkg', commPkgId],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getMcPkgByCodeQuery: (mcPkgId: number, plantId: string): Options => ({
        queryFn: ({ signal }) => getMcPkgById(plantId, mcPkgId, signal),
        queryKey: [...ProCoSysBaseKey, 'McPkg', mcPkgId],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getTagByNoQuery: (tagId: number, plantId: string): Options => ({
        queryFn: ({ signal }) => getTagById(plantId, tagId, signal),
        queryKey: [...ProCoSysBaseKey, 'tag', tagId],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getSystemsQuery: (plantId: string): Options => ({
        queryFn: ({ signal }): Promise<System[]> => getSystems(plantId, signal),
        queryKey: [...ProCoSysBaseKey, 'systems'],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
    getFunctionalRolesQuery: (plantId: string, classification?: string | undefined): Options => ({
        queryFn: ({ signal }) => getFunctionalRoles(plantId, classification, signal),
        queryKey: [...ProCoSysBaseKey, 'FunctionalRoles', classification],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
};
