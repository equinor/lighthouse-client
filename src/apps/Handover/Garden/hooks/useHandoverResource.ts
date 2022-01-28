import { useCallback, useEffect, useState } from 'react';
import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { HandoverResourceTypeMap } from '../models/HandoverResources';

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

    //This causes rerendeds everytime. No adding it to getData dependency, as it should not change.
    const apiClient = useApiClient().fusion;

    const getData = useCallback(async () => {
        setDataIsFetching(true);
        try {
            const result = await apiClient.fetch(
                `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/handover/${packageId}/${packageType}`
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
