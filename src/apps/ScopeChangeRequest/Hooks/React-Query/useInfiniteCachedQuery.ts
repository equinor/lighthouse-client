import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { CacheTime } from '../../Enums/cacheTimes';

/**
 * React query hook that caches the query for 10 hours
 * @param queryKey
 * @param queryFn
 * @param options
 * @returns
 */
export function useInfiniteCachedQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
        'queryKey' | 'queryFn' | 'staleTime' | 'cacheTime'
    >
): UseQueryResult<TData, TError> {
    return useQuery(queryKey, queryFn, {
        ...options,
        staleTime: CacheTime.FiveMinutes,
        cacheTime: CacheTime.TenHours,
        retry: 3,
        retryDelay: 1000,
    });
}
