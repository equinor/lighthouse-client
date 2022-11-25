import { Punch } from '../../types/punch';
import { statusColorMap } from '@equinor/GardenUtils';

export type MaterialStatus = 'Yes' | 'No';

export const getMaterialRequired = (punch: Punch): MaterialStatus => {
    if (punch.materialRequired) return 'Yes';
    return 'No';
};

export const getHasWO = (item: Punch): MaterialStatus => {
    if (item.hasWO) return 'Yes';
    return 'No';
};

export const getPunchCategoryColor = (puStatus: string): string => {
    return statusColorMap[puStatus];
};
export const getPunchStatusColorByStatus = (puStatus: string): string => {
    if (puStatus === 'Open') return '#D9EAF2';
    if (puStatus === 'Closed') return '#4BB748';
    return '#0084C4';
};
