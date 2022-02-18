import { useEffect, useState } from 'react';
import { MutationKey, QueryKey, useIsFetching, useIsMutating } from 'react-query';

/**
 * Listens for actions on the queries specified
 * @param queryKeys
 * @param mutationKeys
 * @returns
 */

export function useApiActionObserver(
    queryKeys: QueryKey | undefined,
    mutationKeys: MutationKey | undefined
): boolean {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const queriesFetching = useIsFetching(queryKeys);
    const mutating = useIsMutating(mutationKeys);

    useEffect(() => {
        setIsFetching(mutating > 0);
    }, [mutating]);

    useEffect(() => {
        setIsFetching(queriesFetching > 0);
    }, [queriesFetching]);

    return isFetching;
}
