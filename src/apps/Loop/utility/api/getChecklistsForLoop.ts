import { httpClient } from '@equinor/lighthouse-portal-client';
import { FamRequest } from '../helpers/fam';
export const checklistColumnNames = [
    'ChecklistID',
    'Facility',
    'Project',
    'FormularType',
    'FormularGroup',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'MechanicalCompletionStatus',
    'CommissioningPackageNo',
    'CommissioningPackageId',
];
export const getChecklistsForLoop = async (famFilter: FamRequest, signal?: AbortSignal) => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_loopsidesheetchecklists/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }

    return await res.json();
};
