import { getYearAndWeekAndDayFromString, getYearAndWeekFromString } from '@equinor/GardenUtils';
import { GetKeyFunction } from '@equinor/ParkView';
import { CustomGroupByKeys, Punch } from '../../types';
import { ExtendedGardenFields } from '../config';
const getFieldKeyBasedOnPlannedForecast = (
    groupBy: ExtendedGardenFields | string,
    plannedForecast: CustomGroupByKeys['plannedForecast']
): keyof Punch => {
    switch (groupBy) {
        case 'handoverPlan':
            return plannedForecast === 'HandoverPlan' ? 'handoverPlan' : 'dueDate';
        case 'RFO':
            return plannedForecast === 'DueDate' ? 'dueDate' : 'handoverPlan';

        default:
            return 'handoverPlan';
    }
};

const getKeyData = (item: Punch, groupBy: keyof Punch): string => {
    const value = item[groupBy]?.toString();
    if (value) return value;

    const groupByPlanned = groupBy.replace('forecast', 'planned').replace('Forecast', 'Planned');
    return item[groupByPlanned];
};
const getColumnDateKey = (fieldKey: keyof Punch, weeklyDaily: 'Weekly' | 'Daily', item: Punch) => {
    const date = getKeyData(item, fieldKey);
    return weeklyDaily === 'Weekly'
        ? getYearAndWeekFromString(date ?? '')
        : getYearAndWeekAndDayFromString(date ?? '');
};
export const getDateKey: GetKeyFunction<Punch> = (item, key, groupBy) => {
    const { plannedForecast, weeklyDaily } = groupBy as CustomGroupByKeys;
    const fieldKey = getFieldKeyBasedOnPlannedForecast(key, plannedForecast);
    return getColumnDateKey(fieldKey, weeklyDaily, item);
};
