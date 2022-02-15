import { useEffect, useState } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';

export function useApiActionObserver(): boolean {
    const queriesFetching = useIsFetching();
    const mutating = useIsMutating();

    useEffect(() => {
        setIsFetching(mutating > 0);
    }, [mutating]);

    useEffect(() => {
        setIsFetching(queriesFetching > 0);
    }, [queriesFetching]);

    const [isFetching, setIsFetching] = useState<boolean>(false);

    return isFetching;
}
