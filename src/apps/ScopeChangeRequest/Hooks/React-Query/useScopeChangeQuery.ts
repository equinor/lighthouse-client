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
    errorMessage: string,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
    return useQuery(queryKey, queryFn, {
        ...options,
        onError: () => {
            sendErrorMessage({ title: errorMessage });
        },
    });
}
