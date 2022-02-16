import { useEffect, useState } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';

export function useApiActionObserver(): boolean {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const queriesFetching = useIsFetching();
    const mutating = useIsMutating();

    useEffect(() => {
        setIsFetching(mutating > 0);
    }, [mutating]);

    useEffect(() => {
        setIsFetching(queriesFetching > 0);
    }, [queriesFetching]);

    return isFetching;
}
