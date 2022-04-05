import { WorkOrder } from '../models';
import { getGroupBy } from './groupByUtils';
import { followUpStatusPriorityMap } from './pcsFollowUp';
import { proCoSysStatusPriorityMap } from './pcsWorkOrder';
import { getStatus } from './statusUtils';

const getPriorityMap = (groupBy: string) => {
    return groupBy === 'wp' ? proCoSysStatusPriorityMap : followUpStatusPriorityMap;
};
/**
 * Function that will sort data inside each column based on the workorders' different statuses and priorities.
 * @param data List of workorders
 * @param groupByKeys List of grouping keys (only uses first item now, which is gardenKey)
 */
export const sortPackages = (data: WorkOrder[], ...groupByKeys: (keyof WorkOrder)[]) => {
    //TODO Handle multiple groupByKeys?
    const groupBy = groupByKeys[0] || 'fwp';
    const status = getStatus(groupBy);
    const priorityMap = getPriorityMap(groupBy);
    const sortBy =
        getGroupBy(groupBy).indexOf('Date') > 0 ? getGroupBy(groupBy) : 'workOrderNumber';

    return data.sort((a, b) => {
        const aStatus = status(a);
        const bStatus = status(b);
        return (
            (priorityMap[bStatus] || 0) - (priorityMap[aStatus] || 0) ||
            (a[sortBy] || '').localeCompare(b[sortBy] || '') ||
            a.workOrderNumber.localeCompare(b.workOrderNumber)
        );
    });
};
export const sortByNumber = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
