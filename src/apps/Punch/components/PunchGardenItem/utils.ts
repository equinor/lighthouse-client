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

export const itemSize = (volume: number, maxVolume: number) => {
    if (maxVolume <= 0) return 'small';
    const percentage = (volume / maxVolume) * 100;
    return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};

export const getDotsColor = (category: string) => {
    switch (category) {
        case 'PA':
            return '#ff4081';
        default:
            return '#ffc107';
    }
};
