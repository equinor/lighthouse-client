import { QueryClient, UseQueryResult } from 'react-query';

export interface QueryCacheArgs<T> {
    queryClient: QueryClient;
    key: string;
    queryApi: UseQueryResult<T[] | undefined, unknown>;
    objectIdentifier: string;
}
