import { httpClient } from '../../../../Core/Client/Functions';
import { WorkOrder } from '../../types/FAM/workOrder';

export async function getWorkOrderByIds(ids: number[]): Promise<WorkOrder[]> {
    const { FAM } = httpClient();

    const requestArgs = {
        andParameters: [],
        orParameters: ids.map((id) => ({
            columnName: 'workordernumber',
            value: id,
            operator: 'Equals',
        })),

        orderByParameter: {
            order: 'Ascending',
        },
    };

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

    workOrders.sort((a, b) => Number(a.workOrderNumber) - Number(b.workOrderNumber));

    return workOrders;
}
