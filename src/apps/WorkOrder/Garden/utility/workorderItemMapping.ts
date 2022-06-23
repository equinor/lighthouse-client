import { MaterialStatus, statusColorMap } from '@equinor/GardenUtils';
import { WorkOrder } from '../models';

type MatStatus = 'OK' | 'AVAILABLE' | 'NOT_AVAILABLE';

const materialColorMap: Record<MatStatus, string> = {
    OK: statusColorMap.OK,
    AVAILABLE: statusColorMap.PA,
    NOT_AVAILABLE: statusColorMap.PB,
};
const materialPackageStatusMap: Partial<Record<MaterialStatus, string>> = {
    MN: 'OK',
    M10: 'OK',
    M11: 'OK',
    M12: 'OK',
    M5: 'AVAILABLE',
    M6: 'AVAILABLE',
    M7: 'AVAILABLE',
    M9: 'AVAILABLE',
    M2: 'NOT_AVAILABLE',
    M3: 'NOT_AVAILABLE',
    M4: 'NOT_AVAILABLE',
};

export const getMccrStatusColor = (workOrder: WorkOrder): string => {
    const status = workOrder.mccrStatus;
    if (!status) {
        return statusColorMap.OK;
    }
    return statusColorMap[status];
};

export const getMccrStatusColorByStatus = (mccrStatus: string): string => {
    return statusColorMap[mccrStatus];
};

export const getMatStatusColor = (workOrder: WorkOrder): string => {
    if (workOrder?.materialStatus === null) {
        return statusColorMap.OS;
    }
    const materialStatus = materialPackageStatusMap[workOrder.materialStatus];
    return materialColorMap[materialStatus] || statusColorMap.OS;
};

export const getMatStatusColorByStatus = (matStatus: string): string => {
    const materialStatus = materialPackageStatusMap[matStatus];
    return materialColorMap[materialStatus] || statusColorMap.OS;
};
export const getMatStatus = (workOrder: WorkOrder): string =>
    materialPackageStatusMap[workOrder?.materialStatus ?? 'M4'];
