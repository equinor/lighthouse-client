import { httpClient } from '@equinor/portal-client';
import { WorkOrder } from '../Types/workOrder';

export async function getWorkOrdersById(id: string): Promise<WorkOrder[]> {
    if (!id || id === '') return [];
    const { FAM } = httpClient();

    const res = await FAM.fetch(`v0.1/procosys/pipetest/JCA/workorders/${id}`, {
        method: 'GET',
    });

    const workOrders: WorkOrder[] = await res.json();

    if (!Array.isArray(workOrders)) {
        throw 'Invalid response';
    }

    workOrders.sort((a, b) => Number(a.workOrderNo) - Number(b.workOrderNo));

    return workOrders;
}
