import { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../../../Core/Client/Hooks';
import SwcrSignature from '../models/SwcrSignature';

type UseSignatures = {
    signatures: SwcrSignature[];
    signaturesFetching: boolean;
};

const useSignatures = (swcrId: string): UseSignatures => {
    const [signatures, setSignatures] = useState<SwcrSignature[]>([]);
    const [signaturesFetching, setSignaturesFetching] = useState<boolean>(false);

    const apiClient = useHttpClient().fusion;

    const getSignatures = useCallback(
        async (swcrId: string) => {
            setSignaturesFetching(true);
            try {
                const result = await apiClient.fetch(
                    `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/swcr/${swcrId}/signatures`
                );

                const parsedSignatures = JSON.parse(await result.text()) as SwcrSignature[];

                setSignatures(
                    parsedSignatures.sort((a, b) =>
                        a.ranking.localeCompare(b.ranking, undefined, {
                            numeric: true,
                            sensitivity: 'base',
                        })
                    ) || []
                );
            } catch {
                setSignatures([]);
            } finally {
                setSignaturesFetching(false);
            }
        },
        [apiClient]
    );

    useEffect(() => {
        getSignatures(swcrId);
    }, [swcrId, getSignatures]);

    return {
        signatures,
        signaturesFetching,
    };
};

export default useSignatures;
