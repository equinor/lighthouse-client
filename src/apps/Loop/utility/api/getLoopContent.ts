import { FamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { LoopContent } from '../../types';
export const loopContentColumnNames = [
    'Facility',
    'LoopNo',
    'ContentTagId',
    'ContentTagNo',
    'Register',
    'CLStatus',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageUrlId',
    'CommissioningPackageNo',
    'CommissioningPackageUrlId',
    'Description',
];
export const getLoopContent = async (
    famFilter: FamRequest,
    signal?: AbortSignal
): Promise<LoopContent[]> => {
    const { FAM } = httpClient();
    const res = await FAM.post(
        `v1/typed/completion/custom_loopcontent/facility/JCA?view-version=v1`,
        {
            body: JSON.stringify(famFilter),
            signal,
        }
    );

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
