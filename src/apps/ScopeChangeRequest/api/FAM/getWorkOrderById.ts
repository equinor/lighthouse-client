import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '../../functions/FAM/generateFAMRequest';
import { WorkOrder } from '../../types/FAM/workOrder';

export async function getWorkOrderByIds(ids: string[]): Promise<WorkOrder[]> {
    if (ids.length === 0) return [];
    const { FAM } = httpClient();

    const columnNames: string[] = [
        'WorkOrderNumber',
        'Description',
        'DisciplineCode',
        'PlannedFinishDate',
        'ProjectProgress',
        'EstimatedHours',
        'RemainingHours',
        'ExpendedHours',
        'JobStatus',
        'ActualCompletionDate',
        'WorkOrderId',
    ];

    const expressions = generateExpressions('WorkOrderNumber', 'Equals', ids);

    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);

    const res = await FAM.fetch('v0.1/dynamic/completion/customapi_workorders/JCA', {
        method: 'POST',
        body: JSON.stringify(requestArgs),
    });

    const workOrders: WorkOrder[] = await res.json();

    if (!Array.isArray(workOrders)) {
        throw 'Invalid response';
    }
    if (workOrders.length !== ids.length) {
        throw 'Failed to load some work orders';
    }

    return workOrders;
}
