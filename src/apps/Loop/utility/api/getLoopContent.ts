import { FamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { LoopContent } from '../../types';
export const loopContentColumnNames = [
    'Facility',
    'LoopNo',
    'ContentTagId',
    'ContentTagNo',
    'Register',
    'MechanicalCompletionStatus',
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
    const res = await FAM.post(`v0.1/dynamic/completion/custom_loopcontent/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
