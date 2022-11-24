import { getMappedMaterialStatus, MaterialStatus, statusColorMap } from '@equinor/GardenUtils';
import { WorkOrder } from '../models';

type MatStatus = 'OK' | 'AVAILABLE' | 'NOT_AVAILABLE';

const materialColorMap: Record<MatStatus, string> = {
    OK: statusColorMap.OK,
    AVAILABLE: statusColorMap.PB,
    NOT_AVAILABLE: statusColorMap.PA,
};
const materialPackageStatusMap: Partial<Record<MaterialStatus, MatStatus>> = {
    MN: 'OK',
    M10: 'OK',
    M11: 'OK',
    M12: 'OK',
    M05: 'AVAILABLE',
    M06: 'AVAILABLE',
    M07: 'AVAILABLE',
    M09: 'AVAILABLE',
    M02: 'NOT_AVAILABLE',
    M03: 'NOT_AVAILABLE',
    M04: 'NOT_AVAILABLE',
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
export const getMatStatusColorByStatus = (matStatus: string | null): string => {
    if (!matStatus) return statusColorMap.OS;
    const materialStatus = getMappedMaterialStatus(matStatus, materialPackageStatusMap);

    const materialStatusColor = materialStatus
        ? materialColorMap[materialStatus] || statusColorMap.OS
        : statusColorMap.OS;

    return materialStatusColor;
};
export const getMatStatusColor = (workOrder: WorkOrder): string =>
    getMatStatusColorByStatus(workOrder.materialStatus);

export const getMatStatus = (workOrder: WorkOrder): string => {
    if (!workOrder.materialStatus) return 'NOT_AVAILABLE';
    const mappedStatus = getMappedMaterialStatus(
        workOrder.materialStatus,
        materialPackageStatusMap
    );
    return mappedStatus || 'NOT_AVAILABLE';
};
