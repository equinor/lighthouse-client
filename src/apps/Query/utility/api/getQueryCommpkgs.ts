import { FamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { QueryCommpkg } from '../../types';
export const queryCommpkgColumnNames = [
    'QueryNo',
    'Facility',
    'Project',
    'CommissioningPackageNo',
    'CommissioningPackageId',
    'CommissioningPackageUrlId',
    'QueryId',
    'IsVoided',
    'Title',
    'NextToSign',
    'QueryStatus',
    'QueryType',
    'RFC_Status',
    'RFO_Status',
    'Description',
];
export const getqueryCommpkg = async (
    famFilter: FamRequest,
    signal?: AbortSignal
): Promise<QueryCommpkg[]> => {
    const { FAM } = httpClient();
    const res = await FAM.fetchAsync(
        `v1/typed/completion/custom_commissioningpackagequery/facility/JCA?view-version=v0`,
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(famFilter),
            signal,
        }
    );

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
