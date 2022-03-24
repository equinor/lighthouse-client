import { useCallback, useEffect } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';
import { CacheTime } from '../../Enums/cacheTimes';
import { useQueryCacheLookup } from './useQueryCacheLookup';

interface EagerLoadingProps<T> {
    items: T[];
    key: (item: T) => string[];
    queryFn: (item: T) => Promise<unknown>;
}

export function useEagerLoading<T = unknown>({ items, key, queryFn }: EagerLoadingProps<T>): void {
    const fetching = useIsFetching({ active: true });
    const queryCache = useQueryCacheLookup();

    const queryClient = useQueryClient();

    const startLoading = useCallback(async () => {
        const toResolve = items.find((x) => !queryCache.isInQueryCache(key(x)));
        if (!toResolve) return;
        /** Must be 2 otherwise it never starts */
        if (fetching < 2) {
            if (!toResolve) {
                return;
            }
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
