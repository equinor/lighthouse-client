import { useEffect, useState } from 'react';
import { QueryKey, useIsFetching, useIsMutating, useQueryClient } from 'react-query';

/**
 * Listens for actions on the queries specified
 * @param queryKeys
 * @param mutationKeys
 * @returns
 */

export function useApiActionObserver(
    queryKeys: QueryKey | undefined,
    mutationKeys: string[] | undefined
): boolean {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const queriesFetching = useIsFetching(queryKeys);
    const mutating = useIsMutating(mutationKeys);
    const queryClient = useQueryClient();

    useEffect(() => {
        let active = false;
        mutationKeys &&
            mutationKeys.forEach((x: string) => {
                if (
                    queryClient.isMutating({
                        mutationKey: x,
                    }) > 0
                ) {
                    setIsFetching(true);
                    active = true;
                }
            });
        if (active === false) {
            setIsFetching(false);
        }
    }, [mutating, mutationKeys, queryClient]);

    useEffect(() => {
        setIsFetching(queriesFetching > 0);
    }, [queriesFetching]);

    return isFetching;
}
