import { useQuery } from 'react-query';

export type FetchPackageResource<T> = (packageId: string, signal?: AbortSignal) => Promise<T[]>;

export const usePackageResource = <T>(
    resourceName: string,
    packageId: string,
    fetch: FetchPackageResource<T>
) => {
    const { data, error, isLoading } = useQuery([resourceName, packageId], ({ signal }) =>
        fetch(packageId, signal)
    );

    return {
        data,
        isFetching: isLoading,
        error: error instanceof Error ? error : null,
    };
};
