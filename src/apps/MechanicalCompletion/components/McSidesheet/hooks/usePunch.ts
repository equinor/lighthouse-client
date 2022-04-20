import { usePackageResource } from '@equinor/GardenUtils';
import { isProduction, useHttpClient } from '@equinor/portal-client';
import { useCallback } from 'react';
import { McPunchItem } from '../types';

export const usePunch = (
    mcPackageId: string | null
): { punchItems: McPunchItem[]; isFetching: boolean; error: Error | null } => {
    const { fusionDataproxy } = useHttpClient();
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const fetch = useCallback(async (id: string) => {
        const response = await fusionDataproxy.fetch(
            `api/contexts/${contextId}/mc-pkgs/${id}/punch`
        );
        return JSON.parse(await response.text()) as McPunchItem[];
    }, []);
    const resource = usePackageResource<McPunchItem>(mcPackageId, fetch);

    return {
        punchItems: resource.data,
        isFetching: resource.isFetching,
        error: resource.error,
    };
};
