import { useCallback, useEffect } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';
import { CacheTime } from '../../Enums/cacheTimes';
import { useQueryCacheLookup } from './useQueryCacheLookup';

interface EagerLoadingProps<T> {
    items: T[];
    key: (item: T) => string[];
    queryFn: (item: T) => Promise<unknown>;
    delayedStartTime?: number;
}

export function useEagerLoading<T = unknown>({
    items,
    key,
    queryFn,
    delayedStartTime = 0,
}: EagerLoadingProps<T>): void {
    const fetching = useIsFetching({ active: true });
    const queryCache = useQueryCacheLookup();

    const queryClient = useQueryClient();

    const eagerLoadCommPkg = useCallback(async () => {
        const toResolve = items.find((x) => !queryCache.isInQueryCache(key(x)));
        if (!toResolve) return;
        if (fetching < 2) {
            console.log('Preloading item');

            if (!toResolve) {
                console.log('All done');
                return;
            }
            await queryClient.prefetchQuery(key(toResolve), async () => await queryFn(toResolve), {
                staleTime: CacheTime.TenHours,
                cacheTime: CacheTime.TenHours,
            });
            eagerLoadCommPkg();
        } else {
            console.log('Waiting');
            setTimeout(eagerLoadCommPkg, 2000);
        }
    }, []);

    useEffect(() => {
        setTimeout(eagerLoadCommPkg, delayedStartTime);
    }, [eagerLoadCommPkg]);
}
