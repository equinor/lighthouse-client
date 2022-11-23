import { Punch } from '../../types';
import { punchStatusOrder } from './getStatusOrder';

export const sortPackagesByStatus = (a: Punch, b: Punch): number => {
    return (
        punchStatusOrder[b.status] - punchStatusOrder[a.status] ||
        a.punchItemNo.localeCompare(b.punchItemNo)
    );
};
