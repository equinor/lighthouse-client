import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

const LONG_CACHE = 10 * 1000 * 60 * 60;
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
        staleTime: LONG_CACHE,
        cacheTime: LONG_CACHE,
    });
}
