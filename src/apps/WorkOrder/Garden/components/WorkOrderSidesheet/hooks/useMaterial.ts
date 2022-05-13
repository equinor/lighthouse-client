import { usePackageResource } from '@equinor/GardenUtils';
import { isProduction, useHttpClient } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { WorkOrderMaterial } from '../../../models';

export const useMaterial = (
    packageId: string | null
): { material: WorkOrderMaterial[] | undefined; isFetching: boolean; error: Error | null } => {
    const { FAM } = useHttpClient();

    const fetch = useCallback(async (id: string) => {
        const response = await FAM.fetch(`v0.1/procosys/workorder/JCA/material/${id}`);

        return JSON.parse(await response.text()) as WorkOrderMaterial[];
    }, []);

    const resource = usePackageResource<WorkOrderMaterial>('material', packageId || '', fetch);

    return {
        material: resource?.data?.filter(
            (wo, i, list) => i === list.findIndex((w) => w.itemNumber === wo.itemNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
