type Status = 'OS' | 'PB' | 'PA' | 'OK';

/**
 * Dictionary mapping common dot statuses and their corresponding colors.
 */
export const statusColorMap: Record<Status, string> = {
    OS: '#9e9e9e',
    PB: '#ffc107',
    PA: '#ff4081',
    OK: '#00c853',
};
