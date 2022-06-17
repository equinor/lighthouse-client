import { httpClient } from '@equinor/lighthouse-portal-client';
import { Workorder } from '../../types';
import { FamRequest } from '../helpers/fam';
export const workorderColumnNames = [
    'WorkOrderId',
    'ChecklistID',
    'LoopId',
    'WorkOrderNo',
    'Facility',
    'Project',
    'HoldBy',
    'PlannedCompletionDate',
    'ActualCompletionDate',
    'RemainingManHours',
    'EstimatedManHours',
    'ProjectProgress',
    'ResponsibleDescription',
    'Responsible',
    'Title',
    'Description',
    'Discipline',
    'DisciplineDescription',
    'JobStatus',
    'MaterialStatus',
];
export const getWorkorders = async (
    famFilter: FamRequest,
    signal?: AbortSignal
): Promise<Workorder[]> => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_loopworkorders/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
