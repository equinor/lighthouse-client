import { FetchQueryOptions, QueryKey, useQueryClient } from 'react-query';
import { Query, QueryState } from 'react-query/types/core/query';

interface QueryCacheLookup {
    getQueryData: <T>(queryKey: string[]) => T | undefined;
    getQueryState: (queryKey: string[]) => QueryState<unknown, unknown> | undefined;
    getCacheByKey: (queryKey: string[]) => Query<unknown, unknown, unknown, QueryKey> | undefined;
    isInQueryCache: (queryKey: string[]) => boolean;
    addToQueryCache<T>(
        queryKey: string[],
        queryFn: () => Promise<T>,
        options?: FetchQueryOptions<T, unknown, T, string[]> | undefined
    ): Promise<T>;
}

export function useQueryCacheLookup(): QueryCacheLookup {
    const queryClient = useQueryClient();

    /**
     * Fetches data from the queryCache
     * @param queryKey
     * @returns
     */
    function getQueryData<T>(queryKey: string[]): T | undefined {
        const data = queryClient.getQueryCache().find(queryKey)?.state.data;

        if (!data) {
            return undefined;
        }
        return data as T;
    }

    /**
     * Fetches the state of a query
     * @param queryKey
     * @returns
     */
    function getQueryState(queryKey: string[]): QueryState<unknown, unknown> | undefined {
        return queryClient.getQueryCache().find(queryKey)?.state;
    }

    /**
     * Returns the cache for a query
     * @param queryKey
     * @returns
     */
    function getCacheByKey(
        queryKey: string[]
    ): Query<unknown, unknown, unknown, QueryKey> | undefined {
        return queryClient.getQueryCache().find(queryKey);
    }

    /**
     * Returns true if the cache is present in the query cache
     * @param queryKey
     * @returns
     */
    function isInQueryCache(queryKey: string[]): boolean {
        return queryClient.getQueryCache().find(queryKey) ? true : false;
    }

    /**
     * Adds a new api call to the cache
     * @param queryKey
     * @param queryFn
     * @param options
     * @returns
     */
    async function addToQueryCache<T>(
        queryKey: string[],
        queryFn: () => Promise<T>,
        options?: FetchQueryOptions<T, unknown, T, string[]>
    ): Promise<T> {
        return (
            getQueryData<T>(queryKey) ?? (await queryClient.fetchQuery(queryKey, queryFn, options))
        );
    }

    return {
        getQueryData,
        getQueryState,
        getCacheByKey,
        isInQueryCache,
        addToQueryCache,
    };
}
