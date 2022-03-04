import { useCallback } from 'react';
import { isProduction } from '../../../../../../Core/Client/Functions';
import { useHttpClient } from '../../../../../../Core/Client/Hooks';
import { WorkOrderMccr } from '../../../models';
import { usePackageResource } from './usePackageResource';

export const useMccr = (
    packageId: string | null
): { mccr: WorkOrderMccr[]; isFetching: boolean; error: Error | null } => {
    const { fusionDataproxy } = useHttpClient();
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const fetch = useCallback(async (id: string) => {
        const response = await fusionDataproxy.fetch(
            `api/contexts/${contextId}/work-orders/${id}/mccr`
        );
        return JSON.parse(await response.text()) as WorkOrderMccr[];
    }, []);
    const resource = usePackageResource(packageId, fetch);

    return {
        mccr: resource.data.filter(
            (wo, i, list) => i === list.findIndex((w) => w.tagNumber === wo.tagNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
