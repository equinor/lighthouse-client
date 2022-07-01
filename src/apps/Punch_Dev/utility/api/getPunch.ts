import { FamRequest } from '@equinor/GardenUtils';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { Punch } from '../../types';
export const punchColumns = [
    'Facility',
    'PunchItemNo',
    'ChecklistId',
    'Description',
    'PunchItemCategory',
    'RaisedByOrganization',
    'ClearingByOrganization',
    'DueDate',
    'PunchListSorting',
    'PunchListType',
    'PunchPriority',
    'Estimate',
    'WorkOrderNo',
    'WorkOrderId',
    'MaterialRequired',
    'MaterialEstimatedTimeOfArrival',
    'ExternalMaterialNo',
    'ClearedAtDate',
    'RejectedAtDate',
    'VerifiedAtDate',
    'UpdatedDate',
    'Responsible',
    'FormularType',
    'TagNo',
    'TagId',
    'CallOffNo',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'CommissioningPackageNo',
    'CommissioningPackageId',
    'FunctionalSystem',
    'C01PlannedDate',
    'C01ForecastDate',
    'C07PlannedDate',
    'C07ForecastDate',
    'Priority1',
];
export const getPunch = async (famFilter: FamRequest, signal?: AbortSignal): Promise<Punch[]> => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_completionpunchitemextended/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
