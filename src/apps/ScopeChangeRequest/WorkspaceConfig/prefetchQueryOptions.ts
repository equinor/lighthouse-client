import { PrefetchQueriesOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { getDisciplines } from '../Api/PCS/getDisciplines';
import { getFunctionalRoles } from '../Api/PCS/getFunctionalRoles';
import { getSystems } from '../Api/PCS/getSystems';
import { getCategories } from '../Api/ScopeChange/Form/getCategories';
import { getPhases } from '../Api/ScopeChange/Form/getPhases';
import { CacheTime } from '../Enums/cacheTimes';
import { proCoSysQueryKeys } from '../Keys/proCoSysQueryKeys';

const { disciplines, systems, functionalRoles } = proCoSysQueryKeys();

export const prefetchQueriesOptions: PrefetchQueriesOptions[] = [
    {
        queryFn: getSystems,
        queryKey: systems,
        options: { cacheTime: CacheTime.TenHours },
    },
    {
        queryFn: getDisciplines,
        queryKey: disciplines,
        options: { cacheTime: CacheTime.TenHours },
    },
    {
        queryFn: getFunctionalRoles,
        queryKey: functionalRoles,
        options: { cacheTime: CacheTime.TenHours },
    },
    {
        queryFn: getPhases,
        queryKey: ['phases'],
        options: { cacheTime: CacheTime.TenHours, staleTime: CacheTime.TenHours },
    },
    {
        queryFn: getCategories,
        queryKey: ['categories'],
        options: { cacheTime: CacheTime.TenHours, staleTime: CacheTime.TenHours },
    },
];
