import { httpClient, isProduction } from '@equinor/portal-client';
import { useCallback, useEffect, useState } from 'react';
import SwcrSignature from '../models/SwcrSignature';

type UseSignatures = {
    signatures: SwcrSignature[];
    signaturesFetching: boolean;
};

const useSignatures = (swcrId: string): UseSignatures => {
    const [signatures, setSignatures] = useState<SwcrSignature[]>([]);
    const [signaturesFetching, setSignaturesFetching] = useState<boolean>(false);
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    const getSignatures = useCallback(async (swcrId: string) => {
        setSignaturesFetching(true);
        const { fusionDataproxy } = httpClient();
        try {
            const result = await fusionDataproxy.fetch(
                `api/contexts/${contextId}/swcr/${swcrId}/signatures`
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
