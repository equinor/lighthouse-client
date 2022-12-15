import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkOrder } from '../../Types/FAMTypes';

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
        'WorkOrderUrlId',
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

    return workOrders;
}
