import { isProduction } from '@equinor/portal-client';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useHttpClient } from '../../../../Core/Client/Hooks';
import { HandoverResourceTypeMap } from '../models/handoverResources';

type UseHandoverResource<T extends keyof HandoverResourceTypeMap> = {
    data: HandoverResourceTypeMap[T][];
    dataIsFetching: boolean;
};

const useHandoverResource = <T extends keyof HandoverResourceTypeMap>(
    packageId: string,
    packageType: T
): UseHandoverResource<T> => {
    const [data, setData] = useState<HandoverResourceTypeMap[T][]>([]);
    const [dataIsFetching, setDataIsFetching] = useState<boolean>(false);
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    /** 
    This causes an infinite render loop when added as dependency to getData.
     apiClient should be stable, but does not look to be the case.   
    **/
    const apiClient = useHttpClient();
    const fusionApi = useMemo(() => apiClient.fusion, [apiClient]);
    fusionApi.setBaseUrl(
        `https://pro-s-dataproxy-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/api/contexts/`
    );
    const getData = useCallback(async () => {
        setDataIsFetching(true);
        try {
            const result = await fusionApi.fetch(
                `${contextId}/handover/${packageId}/${packageType}`
            );

            const parsedSignatures = JSON.parse(
                await result.text()
            ) as HandoverResourceTypeMap[T][];

            setData(parsedSignatures || []);
        } catch {
            setData([]);
        } finally {
            setDataIsFetching(false);
        }
    }, [packageId, packageType]);

    useEffect(() => {
        getData();
    }, [getData]);

    return { data, dataIsFetching };
};

export default useHandoverResource;
