import { FollowUpStatuses } from '@equinor/GardenUtils';
import { StatusItem } from '@equinor/lighthouse-status-bar';
import { WorkOrder } from '../Garden/models';
import { getFollowUpStatus } from '../Garden/utility';
type Kpi = {
    /** Mhrs total */
    estMhrs: number;
    /** Mhrs not available */
    remMhrsNotAvailable: number;
    /** Mhrs available */
    remMhrsAvailable: number;
    /** Mhrs ready for execution */
    remMhrsWoOk: number;
    /** Mhrs expended */
    expMhrsCompleted: number;
    /** Mhrs remaining */
    remMhrs: number;
};
const getKpis = (workOrders: WorkOrder[]) => {
    const sum = workOrders.reduce(
        (acc, curr) => {
            const followUpStatus = getFollowUpStatus(curr);

            // Mhrs total
            acc.estMhrs += Number(curr.estimatedHours);

            // Mhrs not available
            if (followUpStatus === FollowUpStatuses.MaterialAndOrWoNotAvailable) {
                acc.remMhrsNotAvailable += Number(curr.remainingHours);
            }

            // Mhrs available
            if (followUpStatus === FollowUpStatuses.MaterialAndWoAvailable) {
                acc.remMhrsAvailable += Number(curr.remainingHours);
            }
            // Mhrs ready for execution
            if (followUpStatus === FollowUpStatuses.MaterialAndWoOk) {
                acc.remMhrsWoOk += Number(curr.remainingHours);
            }

            // Mhrs completed
            acc.expMhrsCompleted += Number(curr.expendedHours);

            // Mhrs remaining
            acc.remMhrs += Number(curr.remainingHours);
            return acc;
        },
        {
            estMhrs: 0,
            expMhrsCompleted: 0,
            remMhrs: 0,
            remMhrsWoOk: 0,
            remMhrsAvailable: 0,
            remMhrsNotAvailable: 0,
        } as Kpi
    );

    return sum;
};
function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}

export const statusBarConfig = (data: WorkOrder[]): StatusItem[] => {
    const kpis = getKpis(data);
    return [
        {
            title: 'Mhrs total',
            value: () => numberFormat(kpis.estMhrs),
        },
        {
            title: 'Mhrs not available',
            value: () => numberFormat(kpis.remMhrsNotAvailable),
        },
        {
            title: 'Mhrs available',
            value: () => numberFormat(kpis.remMhrsAvailable),
        },
        {
            title: 'Mhrs ready for execution',
            value: () => numberFormat(kpis.remMhrsWoOk),
        },
        {
            title: 'Mhrs expended',
            value: () => numberFormat(kpis.expMhrsCompleted),
        },
        {
            title: 'Mhrs remaining',
            value: () => numberFormat(kpis.remMhrs),
        },
    ];
};
