import { PunchStatus } from '../../types';

const punchStatusColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#0084C4',
    Open: '#D9EAF2',
    Closed: '#4BB748',
};

export const getPunchStatusColors = (status: PunchStatus): string => punchStatusColors[status];

const punchStatusTextColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#FFFFFF',
    Open: '#565656',
    Closed: '#FFFFFF',
};

export const getPunchStatusTextColors = (status: PunchStatus): string =>
    punchStatusTextColors[status];

export const getDotsColor = (category: string | null): string => {
    switch (category) {
        case 'PA':
            return '#ff4081';
        default:
            return '#ffc107';
    }
};
