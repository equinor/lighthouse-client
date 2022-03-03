import { Status } from '.';
import { HandoverPackage } from '../models';

type KPIStatus = Extract<Status, 'RFOC Accepted' | 'RFOC Sent' | 'OS'> | 'RFOC Partly';
type KPI = Partial<KPIStatus> | 'overdue' | 'targetSum';

const getKPIStatus = (pkg: HandoverPackage): KPIStatus => {
    if (
        pkg.mcPkgsRFOCSigned > 0 &&
        pkg.mcPkgsCount > 0 &&
        pkg.mcPkgsRFOCSigned === pkg.mcPkgsCount
    ) {
        return 'RFOC Accepted';
    }
    if (
        pkg.mcPkgsRFOCShipped > 0 &&
        pkg.mcPkgsCount > 0 &&
        pkg.mcPkgsRFOCShipped === pkg.mcPkgsCount
    ) {
        return 'RFOC Sent';
    }
    if (pkg.mcPkgsRFOCSigned > 0) {
        return 'RFOC Partly';
    }
    return 'OS';
};

/**
 * Function to count the number of packages that are in status X, packages that are
 * overdue and sum of rfo vs target.
 */
export const getStatusBarData = (data: HandoverPackage[]): Record<KPI, number> => {
    return data.reduce(
        (acc, curr) => {
            /** status */
            const pkgStatus = getKPIStatus(curr);
            acc[pkgStatus] = acc[pkgStatus] + 1;

            /** overdue */
            if (
                curr.rfocActualDate === '' &&
                curr.rfocPlannedDate !== '' &&
                new Date(curr.rfocPlannedDate).getTime() < new Date().getTime()
            ) {
                acc.overdue = acc.overdue + 1;
            }

            /** rfo vs target */
            if (
                curr.rfocPlannedDate !== '' &&
                new Date(curr.rfocPlannedDate).getTime() <= new Date().getTime()
            ) {
                acc.targetSum = acc.targetSum + 1;
            }

            return acc;
        },
        {
            'RFOC Accepted': 0,
            'RFOC Partly': 0,
            'RFOC Sent': 0,
            OS: 0,
            overdue: 0,
            targetSum: 0,
        } as Record<KPI, number>
    );
};
