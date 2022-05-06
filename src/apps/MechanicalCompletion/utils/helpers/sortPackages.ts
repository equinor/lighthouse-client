import { McPackage } from '../../types';
import { commissioningStatusOrder } from '../config/commStatusOrder';
import { getCommissioningStatus } from './getStatuses';

export const sortPackagesByStatus = (a: McPackage, b: McPackage): number => {
    return (
        commissioningStatusOrder[getCommissioningStatus(b)] -
            commissioningStatusOrder[getCommissioningStatus(a)] ||
        a.mcPkgNumber.localeCompare(b.mcPkgNumber)
    );
};
