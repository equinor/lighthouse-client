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

    /** 
    This causes an infinite render loop when added as dependency to getData.
     apiClient should be stable, but does not look to be the case.   
    **/
    const apiClient = useHttpClient();
    const fusionApi = useMemo(() => apiClient.fusion, [apiClient]);

    const getData = useCallback(async () => {
        setDataIsFetching(true);
        try {
            const result = await fusionApi.fetch(
                `https://pro-s-dataproxy-ci.azurewebsites.net/api/contexts/94dd5f4d-17f1-4312-bf75-ad75f4d9572c/handover/${packageId}/${packageType}`
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
