import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { sendErrorMessage } from '../../Functions/ErrorMessage/sendErrorMessage';

export function useScopeChangeQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    fallBackErrorMessage: string,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
    return useQuery(queryKey, queryFn, {
        ...options,
        onError: (thrown) => {
            const errorMessage =
                typeof thrown === 'string' ? thrown : thrown['title'] ?? fallBackErrorMessage;
            sendErrorMessage({ title: errorMessage });
        },
    });
}
