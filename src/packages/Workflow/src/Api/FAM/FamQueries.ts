import { CacheTime } from '@equinor/Workflow';
import { UseQueryOptions } from 'react-query';
import { getPunchListItemByNo } from './getPunchListItemByNo';

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
