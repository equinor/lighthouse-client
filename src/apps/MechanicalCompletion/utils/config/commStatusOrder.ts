import { CommissioningStatus } from '../../types';

export const commissioningStatusOrder: Record<CommissioningStatus, number> = {
    'RFOC Accepted': 11,
    'RFOC Shipped': 10,
    'RFOC Rejected': 9,
    'TAC Accepted': 8,
    'TAC Shipped': 7,
    'TAC Rejected': 6,
    'RFCC Accepted': 5,
    'RFCC Shipped': 4,
    'RFCC Rejected': 3,
    'Punch status accepted': 2,
    'Contractor final punch': 1,
    OS: 0,
};
