import { httpClient } from '@equinor/lighthouse-portal-client';
import { FamRequest } from '../helpers/fam';

export const checklistColumnNames = [
    'ChecklistID',
    'Facility',
    'Project',
    'TagNo',
    'TagId',
    'FormularType',
    'FormularGroup',
    'PipingRevisionMechanicalCompletionPackageNo',
    'Responsible',
    'Status',
    'CreatedDate',
    'UpdatedDate',
    'SignedDate',
    'VerifiedDate',
    'CallOffNo',
    'PackageNo',
    'IsVoided',
    'Description',
    'Register',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'MechanicalCompletionStatus',
    'CommissioningPackageNo',
    'CommissioningPackageId',
];
export const getChecklistsForLoop = async (famFilter: FamRequest, signal?: AbortSignal) => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_checklist/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }

    return await res.json();
};
