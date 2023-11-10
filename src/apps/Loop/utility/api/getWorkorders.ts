import { FamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { Workorder } from '../../types';
export const workorderColumnNames = [
    'WorkOrderId',
    'WorkOrderUrlId',
    'WorkOrderNo',
    'LoopId',
    'LoopNo',
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
    const res = await FAM.fetchAsync(
        `v1/typed/completion/custom_loopworkorders/facility/JCA?view-version=v1`,
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
