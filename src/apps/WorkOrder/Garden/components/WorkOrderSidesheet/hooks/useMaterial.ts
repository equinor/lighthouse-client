import { isProduction } from '@equinor/portal-client';
import { useCallback } from 'react';
import { useHttpClient } from '../../../../../../Core/Client/Hooks';
import { WorkOrderMaterial } from '../../../models';
import { usePackageResource } from './usePackageResource';

export const useMaterial = (
    packageId: string | null
): { material: WorkOrderMaterial[]; isFetching: boolean; error: Error | null } => {
    const { fusionDataproxy, FAM } = useHttpClient();
    // const contextId = isProduction()
    //     ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
    //     : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const fetch = useCallback(async (id: string) => {
        const response = await FAM.fetch(`v0.1/procosys/workorder/JCA/material/${id}`);

        return JSON.parse(await response.text()) as WorkOrderMaterial[];
    }, []);
    const resource = usePackageResource<WorkOrderMaterial>(packageId, fetch);

    return {
        material: resource.data.filter(
            (wo, i, list) => i === list.findIndex((w) => w.itemNumber === wo.itemNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
