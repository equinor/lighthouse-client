import { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../../../../Core/Client/Hooks';

type HandoverPackageTypes =
    | 'mcpkg'
    | 'ncr'
    | 'work-orders'
    | 'unsigned-tasks'
    | 'unsigned-actions'
    | 'punch'
    | 'swcr';

type GetPackages = {
    selectedPackageId: string;
    packageType: HandoverPackageTypes;
};

type UseHandoverData<T> = {
    data: T[];
    dataFetching: boolean;
};

export const useHandoverData = <T extends unknown>(
    getPackages?: GetPackages
): UseHandoverData<T> => {
    const [data, setData] = useState<T[]>([]);
    const [dataFetching, setDataFetching] = useState<boolean>(false);

    const apiClient = useHttpClient().fusion;

    const getSignatures = useCallback(async () => {
        setDataFetching(true);

        const packageString = getPackages
            ? `/${getPackages.selectedPackageId}/${getPackages.packageType}`
            : '';

        try {
            const result = await apiClient.fetch(
                `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/handover/${packageString}`
            );

            const parseResult = JSON.parse(await result.text()) as T[];

            setData(parseResult);
        } catch {
            setData([]);
        } finally {
            setDataFetching(false);
        }
    }, [apiClient, getPackages]);

    useEffect(() => {
        getSignatures();
    }, [getSignatures]);

    return {
        data: data,
        dataFetching: dataFetching,
    };
};
