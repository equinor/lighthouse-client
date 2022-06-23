import { httpClient } from '@equinor/lighthouse-portal-client';
import { LoopContent } from '../../types';
import { FamRequest } from '../helpers/fam';
export const loopContentColumnNames = [
    'Facility',
    'ChecklistID',
    'LoopId',
    'ContentId',
    'MechanicalCompletionStatus',
    'MechanicalCompletionStatusOrder',
    'MechanicalCompletionPackageNo',
    'CommissioningPackageNo',
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
