import { useCallback, useEffect } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';
import { CacheTime } from '../../enum/cacheTimes';
import { useQueryCacheLookup } from './useQueryCacheLookup';

interface EagerLoadingProps<T> {
    /** Items to be passed to the query function  */
    items: T[];
    /** Querykey to be assigned to the function, must be unique for each item */
    key: (item: T) => string[];
    /** Function used to fetch the specific item */
    queryFn: (item: T) => Promise<unknown>;
}
const THRESHOLD = 2;

/**
 * Starts loading data if the network traffic reaches a certain threshold.
 */
export function useEagerLoading<T = unknown>({ items, key, queryFn }: EagerLoadingProps<T>): void {
    const fetching = useIsFetching({ active: true });
    const queryCache = useQueryCacheLookup();

    const queryClient = useQueryClient();

    const startLoading = useCallback(async () => {
        const toResolve = items.find((x) => !queryCache.isInQueryCache(key(x)));
        if (!toResolve) return;
        /** Must be 2 otherwise it never starts */
        if (fetching < THRESHOLD) {
            await queryClient.prefetchQuery(key(toResolve), async () => await queryFn(toResolve), {
                staleTime: CacheTime.TenHours,
                cacheTime: CacheTime.TenHours,
            });
            setTimeout(startLoading, 2000);
        } else {
            setTimeout(startLoading, 4000);
        }
    }, []);

    useEffect(() => {
        startLoading();
    }, []);
}
