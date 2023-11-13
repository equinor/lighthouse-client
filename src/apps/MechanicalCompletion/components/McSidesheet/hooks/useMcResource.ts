import { usePackageResource } from '@equinor/GardenUtils';
import { isProduction, useHttpClient } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { McNcr, McPunchItem, McWorkOrder } from '../types';
type McResourceTypeMap = {
    ncr: McNcr;
    'work-orders': McWorkOrder;
    punch: McPunchItem;
};
export const useMcResource = <T extends keyof McResourceTypeMap>(
    packageId: string,
    packageType: T
) => {
    const { fusionDataproxy } = useHttpClient();
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const fetch = useCallback(
        async (id: string, signal?: AbortSignal) => {
            const result = await fusionDataproxy.fetch(
                `api/contexts/${contextId}/mc-pkgs/${id}/${packageType}`,
                { signal }
            );

            return JSON.parse(await result.text()) as McResourceTypeMap[T][];
        },
        [fusionDataproxy, contextId, packageType]
    );

    const resource = usePackageResource(packageType, packageId, fetch);

    return {
        data: resource.data,
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
