import { usePackageResource } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { useHttpClient } from '../../../../Core/Client/Hooks';
import { HandoverResourceTypeMap } from '../models/handoverResources';

type UseHandoverResource<T extends keyof HandoverResourceTypeMap> = {
    data: HandoverResourceTypeMap[T][] | undefined;
    dataIsFetching: boolean;
    error: unknown;
};

const useHandoverResource = <T extends keyof HandoverResourceTypeMap>(
    packageId: string,
    packageType: T
): UseHandoverResource<T> => {
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    /** 
    This causes an infinite render loop when added as dependency to getData.
     apiClient should be stable, but does not look to be the case.   
    **/
    const { fusionDataproxy } = useHttpClient();

    const getData = useCallback(
        async (id: string, signal?: AbortSignal) => {
            const result = await fusionDataproxy.fetch(
                `api/contexts/${contextId}/handover/${id}/${packageType}`,
                { signal }
            );

            return JSON.parse(await result.text()) as HandoverResourceTypeMap[T][];
        },
        [packageType, contextId, fusionDataproxy]
    );

    const resource = usePackageResource(packageType, packageId, getData);

    return { data: resource.data, dataIsFetching: resource.isFetching, error: resource.error };
};

export default useHandoverResource;
