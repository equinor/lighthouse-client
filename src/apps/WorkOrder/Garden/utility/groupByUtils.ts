import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { WorkOrder } from '../models';
import { getYearAndWeekFromString } from '@equinor/GardenUtils';
export const getGroupBy = (groupBy: string) => {
    switch (groupBy) {
        case 'wp':
        case 'hwp':
            return 'plannedStartupDate';
        case 'fwp':
            return 'plannedFinishDate';

        default:
            return groupBy;
    }
};

export const columnKeyAccessor: GetKeyFunction<WorkOrder> = (item, key) => {
    const groupBy = getGroupBy(key);
    switch (groupBy) {
        case 'plannedStartupDate':
        case 'plannedFinishDate':
            return getYearAndWeekFromString(item[groupBy] || '');
        default:
            return item[groupBy];
    }
};
