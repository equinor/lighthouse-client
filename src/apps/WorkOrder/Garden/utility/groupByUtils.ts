import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { WorkOrder } from '../models';
import { getYearAndWeekFromString } from './dateUtils';

export const getGroupBy = (groupBy: string) => {
    switch (groupBy) {
        case 'wp':
        case 'hwp':
            return 'plannedStartDate';
        case 'fwp':
            return 'plannedFinishDate';

        default:
            return groupBy;
    }
};

export const columnKeyAccessor: GetKeyFunction<WorkOrder> = (item, key) => {
    const groupBy = getGroupBy(key);
    switch (groupBy) {
        case 'plannedStartDate':
        case 'plannedFinishDate':
            return getYearAndWeekFromString(item[groupBy]);
        default:
            return item[groupBy];
    }
};
