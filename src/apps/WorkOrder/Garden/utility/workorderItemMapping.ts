import { MaterialStatus, WorkOrder } from '../models';

type Status = 'OS' | 'PB' | 'PA' | 'OK';
type MatStatus = 'OK' | 'AVAILABLE' | 'NOT_AVAILABLE';

const statusColorMap: Record<Status, string> = {
    OS: '#9e9e9e',
    PB: '#ffc107',
    PA: '#ff4081',
    OK: '#00c853',
};

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

export const materialStatusMap: Partial<Record<MaterialStatus, string>> = {
    M10: 'Material requested to job site',
    M12: 'Material received on job site',
    M2: 'Materials linked to Smartpack/Jobcard',
    M6: 'Material partly delivered',
    M7: 'Materials fully delivered',
    M9: 'Material returned',
    MN: 'No Material required',
    MN1: 'Additional material to be issued Offshore from Min/Max Stock',
    MNX1: 'Materials not linked to Smartpack/Jobcard',
    MNX2: 'Materials partially linked to Smartpack/Jobcard',
};

export const getMccrStatusColor = (workOrder: WorkOrder): string => {
    const status = workOrder.mccrStatus;
    if (!status) {
        return statusColorMap.OK;
    }
    return statusColorMap[status];
};

export const getMatStatusColor = (workOrder: WorkOrder): string => {
    const materialStatus = materialPackageStatusMap[workOrder.materialStatus];
    return materialColorMap[materialStatus] || statusColorMap.OS;
};

export const getMatStatus = (workOrder: WorkOrder) =>
    materialPackageStatusMap[workOrder.materialStatus];
