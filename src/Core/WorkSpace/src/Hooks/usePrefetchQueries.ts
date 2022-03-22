import { DeepImmutableArray } from '@dbeining/react-atom';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { PrefetchQueriesOptions } from '../WorkSpaceApi/workspaceState';

export function usePrefetchQueries(
    prefetchQueriesOptions: PrefetchQueriesOptions[] & DeepImmutableArray<PrefetchQueriesOptions>
): void {
    const queryClient = useQueryClient();

    useEffect(() => {
        prefetchQueriesOptions?.forEach(
            async (query) =>
                await queryClient.prefetchQuery(query.queryKey, query.queryFn, query.options)
        );
    }, [prefetchQueriesOptions, queryClient]);
}
