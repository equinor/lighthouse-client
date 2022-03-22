import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

export function useScopeChangeQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
    return useQuery(queryKey, queryFn, {
        ...options,
    });
}
