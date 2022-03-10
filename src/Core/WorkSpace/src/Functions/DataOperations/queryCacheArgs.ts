import { QueryClient, UseQueryResult } from 'react-query';

export interface QueryCacheArgs {
    queryClient: QueryClient;
    key: string;
    queryApi: UseQueryResult<any[] | undefined, unknown>;
    objectIdentifier: string;
}
