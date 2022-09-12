import { FetchQueryOptions, QueryFunction } from 'react-query';
export interface PrefetchQueriesOptions {
    queryKey: string[];
    queryFn: QueryFunction<unknown, string[]>;
    options?: FetchQueryOptions<unknown, unknown, unknown, string[]> | undefined;
}
