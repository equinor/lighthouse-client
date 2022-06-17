import { httpClient } from '@equinor/lighthouse-portal-client';
import { LoopContent } from '../../types';
import { FamRequest } from '../helpers/fam';
export const columnNames = [
    'Facility',
    'LoopId',
    'ContentId',
    'Register',
    'MechanicalCompletionStatus',
    'MechanicalCompletionStatusOrder',
    'MechanicalCompletionPackageNo',
    'CommissioningPackageNo',
    'Description',
    'PlannedCompletionDate',
    'ActualCompletionDate',
    'RemainingManHours',
    'ChecklistID',
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
