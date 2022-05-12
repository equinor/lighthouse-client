import { usePackageResource } from '@equinor/GardenUtils';
import { isProduction, useHttpClient } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { WorkOrderMaterial } from '../../../models';

export const useMaterial = (
    packageId: string
): { material: WorkOrderMaterial[] | undefined; isFetching: boolean; error: Error | null } => {
    const { fusionDataproxy } = useHttpClient();
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const fetch = useCallback(
        async (id: string, signal?: AbortSignal) => {
            const response = await fusionDataproxy.fetch(
                `api/contexts/${contextId}/work-orders/${id}/material`,
                { signal }
            );
            return JSON.parse(await response.text()) as WorkOrderMaterial[];
        },
        [fusionDataproxy, contextId]
    );
    const resource = usePackageResource<WorkOrderMaterial>('material', packageId, fetch);

    return {
        material: resource?.data?.filter(
            (wo, i, list) => i === list.findIndex((w) => w.itemNumber === wo.itemNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
