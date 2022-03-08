import { MaterialStatus, WorkOrder, HandoverWorkOrder } from '../models';

/**
 * Accepts a string of type `MaterialStatus` and will return a tuple with lowercase status
 * and status with modified suffix if original status contains numbers lower than or equal to 9.
 * @example "M2" -> ["m2", "m02"]
 * @example "M12" -> ["m12", "m12"]
 * @example "MN" -> ["mn"]
 *
 */
export const prepareMaterialStatus = (status: MaterialStatus): string[] => {
    const statusLower = status.toLowerCase();

    /** Extract number from material status string if any */
    let number = statusLower.replace(/[^0-9]+/, '');

    /**Prefix number with '0' if less than or equal to 9 */
    if (number.length === 1) {
        number = '0' + number;
    }

    if (!number.length) {
        return [statusLower];
    }

    return [statusLower, 'm' + number];
};

export const woHasMaterialStatus = (
    workOrder: WorkOrder | HandoverWorkOrder,
    ...statuses: MaterialStatus[]
) => {
    const materialStatuses = statuses
        .map((status) => prepareMaterialStatus(status))
        .reduce((all, current) => all.concat(current), []);
    const woMaterialStatus = workOrder.materialStatus.toLowerCase();
    return materialStatuses.filter(
        (materialStatus) => woMaterialStatus.indexOf(materialStatus) === 0
    ).length;
};

export const materialOk = (workOrder: WorkOrder | HandoverWorkOrder): number =>
    woHasMaterialStatus(workOrder, 'M12', 'M13', 'MN');

export const materialAvailable = (workOrder: WorkOrder | HandoverWorkOrder): number =>
    woHasMaterialStatus(workOrder, 'M7', 'M9', 'M10', 'M11', 'MN');
