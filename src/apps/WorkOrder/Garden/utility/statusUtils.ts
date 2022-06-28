import { FollowUpStatuses, MaterialStatus, ProcosysStatuses } from '@equinor/GardenUtils';
import { WorkOrder } from '../models';
import { followUpColorMap, orderedProCoSysStatuses } from './pcsFollowUp';
import { proCoSysWorkOrderColorMap } from './pcsWorkOrder';

const getWoStatusFromDates = (workOrder: WorkOrder): ProcosysStatuses => {
    if (workOrder.w10ActualDate) return ProcosysStatuses.SentToPlanning;
    if (workOrder.w9ActualDate) return ProcosysStatuses.ASBuiltCompleted;
    if (workOrder.w8ActualDate) return ProcosysStatuses.SentDC;
    if (workOrder.w7ActualDate) return ProcosysStatuses.Cancelled;
    if (workOrder.w6ActualDate) return ProcosysStatuses.ComplByMC;
    if (workOrder.w5ActualDate) return ProcosysStatuses.FromField;
    if (workOrder.w4ActualDate) return ProcosysStatuses.ToField;
    if (workOrder.w3ActualDate) return ProcosysStatuses.MCDocsPrepared;
    if (workOrder.w2ActualDate) return ProcosysStatuses.ToMC;
    if (workOrder.w1ActualDate) return ProcosysStatuses.Prepared;

    return ProcosysStatuses.NoStatus;
};

/**
 * Function to retrieve a package's status based on its jobStatus property.
 * If there are no appropriate jobStatus values, the status will be based on
 * w1-w10 actual date properties.
 */
export const getWoStatus = (workOrder: WorkOrder): ProcosysStatuses => {
    switch (workOrder.jobStatus) {
        case 'W01':
            return ProcosysStatuses.Prepared;

        case 'W02':
            return ProcosysStatuses.ToMC;

        case 'W03':
            return ProcosysStatuses.MCDocsPrepared;

        case 'W04':
            return ProcosysStatuses.ToField;

        case 'W05':
            return ProcosysStatuses.FromField;

        case 'W06':
            return ProcosysStatuses.ComplByMC;

        case 'W07':
            return ProcosysStatuses.Cancelled;

        case 'W08':
            return ProcosysStatuses.SentDC;

        case 'W09':
            return ProcosysStatuses.ASBuiltCompleted;

        case 'W10':
            return ProcosysStatuses.SentToPlanning;
    }

    return getWoStatusFromDates(workOrder);
};

const prepareMaterialStatus = (status: MaterialStatus): string[] => {
    const statusLower = status.toLowerCase();

    let number = statusLower.replace(/[^0-9]+/, '');
    if (number.length === 1) {
        number = '0' + number;
    }

    if (!number.length) {
        return [statusLower];
    }

    return [statusLower, 'm' + number];
};
const woHasMaterialStatus = (workOrder: WorkOrder, ...statuses: MaterialStatus[]) => {
    const materialStatuses = statuses
        .map((status) => prepareMaterialStatus(status))
        .reduce((all, current) => all.concat(current), []);
    const woMaterialStatus = workOrder?.materialStatus?.toLowerCase();
    return materialStatuses.filter(
        (materialStatus) => woMaterialStatus?.indexOf(materialStatus) === 0
    ).length;
};
const materialOk = (workOrder: WorkOrder) => woHasMaterialStatus(workOrder, 'M12', 'M13', 'MN');

const materialAvailable = (workOrder: WorkOrder) =>
    woHasMaterialStatus(workOrder, 'M7', 'M9', 'M10', 'M11', 'MN');

/**
 * Function to retrieve "follow up" status of a package based on the package's projectProgress
 * and materialStatus.
 * Will be used if the current grouping of the garden is "wp".
 */
export const getFollowUpStatus = (workOrder: WorkOrder) => {
    const status = getWoStatus(workOrder);
    const statusIndex = orderedProCoSysStatuses.indexOf(status);

    if (workOrder?.projectProgress === '100') {
        return FollowUpStatuses.WOFinished;
    } else if (materialOk(workOrder) && [4, 5, 6, 7, 8, 9, 10].indexOf(statusIndex) > -1) {
        return FollowUpStatuses.MaterialAndWoOk;
    } else if (
        materialAvailable(workOrder) &&
        [3, 4, 5, 6, 7, 8, 9, 10].indexOf(statusIndex) > -1
    ) {
        return FollowUpStatuses.MaterialAndWoAvailable;
    }

    return FollowUpStatuses.MaterialAndOrWoNotAvailable;
};

/**
 * Function that returns another function, depending on what is currently grouped, which retrieves the package's status.
 * Workorder packages can have different logic for retrieving status based on how the packages are grouped.
 * "wp" will return a different status function that the rest of the grouping options.
 */
export const getStatus = (filter: string) => (filter === 'wp' ? getWoStatus : getFollowUpStatus);

export const getColor = (filter: string) =>
    filter === 'wp' ? proCoSysWorkOrderColorMap : followUpColorMap;

export const getTextColorForStatus = (status: string) => {
    return status === FollowUpStatuses.WOFinished || status === ProcosysStatuses.ComplByMC
        ? '#ffffff'
        : '#212121';
};
