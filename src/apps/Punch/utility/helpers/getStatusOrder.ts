import { Punch, PunchStatus } from '../../types';

export const punchStatusOrder: Record<PunchStatus, number> = {
    Closed: 0,
    'Cleared not verified': 1,
    Open: 2,
};

export const getPunchStatus = (punch: Punch): PunchStatus => {
    if (punch.status == 'Closed') {
        return 'Closed';
    } else if (punch.status == 'Open') {
        return 'Open';
    }
    return 'Cleared not verified';
};
