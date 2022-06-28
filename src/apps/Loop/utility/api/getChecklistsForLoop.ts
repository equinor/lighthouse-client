import { httpClient } from '@equinor/lighthouse-portal-client';
import { FamRequest } from '../helpers/fam';
export const checklistColumnNames = [
    'ChecklistId',
    'Facility',
    'Project',
    'LoopId',
    'LoopNo',
    'Description',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'CommissioningPackageNo',
    'CommissioningPackageId',
    'FormularType',
    'FormularGroup',
    'Responsible',
    'Status',
    'Revision',
    'SignedDate',
    'VerifiedDate',
    'RFC_Planned_Forecast_Date',
    'RFO_Planned_Forecast_Date',
    'WOPlannedCompletionDate',
    'WOActualCompletionDate',
    'RemainingManHours',
    'System',
    'FunctionalSystem',
    'Priority1',
    'Priority2',
    'Priority3',
    'Location',
    'IsVoided',
    'PackageNo',
    'CallOffNo',
    'Register',
    'Function',
    'LoopContentStatus',
];
export const getChecklistsForLoop = async (famFilter: FamRequest, signal?: AbortSignal) => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_loopmccr/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }

    return await res.json();
};
