import { FamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { QuerySignature } from '../../types';
export const querySignaturesColumnNames = [
    'QueryNo',
    'SignatureRole',
    'Sequence',
    'SignedByAzureOid',
    'FunctionalRole',
    'SignedDate',
    'UpdatedDate',
];
export const getQuerySignatures = async (
    famFilter: FamRequest,
    signal?: AbortSignal
): Promise<QuerySignature[]> => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v1/typed/completion/querysignature/facility/JCA?view-version=v0`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
