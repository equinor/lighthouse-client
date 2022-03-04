import { isProduction } from '@equinor/portal-client';
import { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../../../../../../Core/Client/Hooks';
import { WorkOrderMaterial, WorkOrderMccr } from '../../../models';
type WorkorderResourceTypeMap = {
    mccr: WorkOrderMccr;
    material: WorkOrderMaterial;
};
type UseWorkorderResource<T extends keyof WorkorderResourceTypeMap> = {
    data: WorkorderResourceTypeMap[T][];
    dataIsFetching: boolean;
    error: Error | null;
};
export type FetchPackageResource<T extends keyof WorkorderResourceTypeMap> = (
    packageId: string,
    packageType: T
) => Promise<T[]>;

export const usePackageResource = <T extends keyof WorkorderResourceTypeMap>(
    packageId: string | null,
    packageType: T
) => {
    const [data, setData] = useState<WorkorderResourceTypeMap[T][]>([]);
    const [dataIsFetching, setDataIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { fusionDataproxy } = useHttpClient();
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const getData = useCallback(async () => {
        try {
            setDataIsFetching(true);
            setError(null);
            const response = await fusionDataproxy.fetch(
                `api/contexts/${contextId}/work-orders/${packageId}/${packageType}`
            );
            const parsedResponse = JSON.parse(
                await response.text()
            ) as WorkorderResourceTypeMap[T][];
            setData(parsedResponse || []);
        } catch (e) {
            if (e instanceof Error) setError(e);
        } finally {
            setDataIsFetching(false);
        }
    }, [packageId, packageType, contextId]);

    useEffect(() => {
        getData();
    }, [getData]);

    return {
        data,
        dataIsFetching,
        error,
    };
};
