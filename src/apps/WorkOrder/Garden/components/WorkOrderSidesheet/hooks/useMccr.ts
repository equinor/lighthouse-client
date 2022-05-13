import { usePackageResource } from '@equinor/GardenUtils';
import { isProduction, useHttpClient } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { WorkOrderMccr } from '../../../models';

export const useMccr = (
    packageId: string | null
): { mccr: WorkOrderMccr[] | undefined; isFetching: boolean; error: Error | null } => {
    const { FAM } = useHttpClient();

    const fetch = useCallback(async (id: string) => {
        const response = await FAM.fetch(`v0.1/procosys/workorder/JCA/mccr/${id}`);
        return JSON.parse(await response.text()) as WorkOrderMccr[];
    }, []);
    const resource = usePackageResource('mccr', packageId || '', fetch);

    return {
        mccr: resource?.data?.filter(
            (wo, i, list) => i === list.findIndex((w) => w.tagNumber === wo.tagNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
