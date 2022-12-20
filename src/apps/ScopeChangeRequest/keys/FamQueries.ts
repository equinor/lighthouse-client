import { UseQueryOptions } from 'react-query';
import { getPunchListItemByNo } from '../api/FAM/getPunchListItemByNo';
import { CacheTime } from '../enum/cacheTimes';

export const FAMBaseKey = ['FAM'];

type Options = Pick<UseQueryOptions, 'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey'>;

export const FAMQueries = {
    getPunchListItemByNo: (punchListItemNo: number): Options => ({
        queryFn: ({ signal }) => getPunchListItemByNo(punchListItemNo, signal),
        queryKey: [...FAMBaseKey, 'PunchListItem', punchListItemNo],
        cacheTime: CacheTime.TenHours,
        staleTime: CacheTime.FiveMinutes,
    }),
};
