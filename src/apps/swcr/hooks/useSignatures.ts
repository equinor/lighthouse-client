import { httpClient } from '@equinor/portal-client';
import { useCallback, useEffect, useState } from 'react';
import SwcrSignature from '../models/SwcrSignature';

type UseSignatures = {
    signatures: SwcrSignature[];
    signaturesFetching: boolean;
};

const useSignatures = (swcrId: string): UseSignatures => {
    const [signatures, setSignatures] = useState<SwcrSignature[]>([]);
    const [signaturesFetching, setSignaturesFetching] = useState<boolean>(false);

    const getSignatures = useCallback(async (swcrId: string) => {
        setSignaturesFetching(true);
        const { fusion } = httpClient();
        try {
            const result = await fusion.fetch(
                `https://pro-s-dataproxy-ci.azurewebsites.net/api/contexts/71db33bb-cb1b-42cf-b5bf-969c77e40931/swcr/${swcrId}/signatures`
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
    }, []);

    useEffect(() => {
        getSignatures(swcrId);
    }, [swcrId, getSignatures]);

    return {
        signatures,
        signaturesFetching,
    };
};

export default useSignatures;
