import { useCallback, useEffect, useState } from 'react';

export type FetchPackageResource<T> = (packageId: string) => Promise<T[]>;

export const usePackageResource = <T>(packageId: string | null, fetch: FetchPackageResource<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const reset = useCallback(() => {
        setData([]);
        setIsFetching(false);
        setError(null);
    }, []);
    const preformFetch = useCallback(async () => {
        if (!packageId) {
            reset();
            return;
        }

        try {
            setIsFetching(true);
            setError(null);
            const response = await fetch(packageId);
            setData(response);
        } catch (e) {
            if (e instanceof Error) setError(e);
        } finally {
            setIsFetching(false);
        }
    }, [packageId, fetch]);

    useEffect(() => {
        preformFetch();
    }, [preformFetch]);

    return {
        data,
        isFetching,
        error,
        reset,
    };
};
