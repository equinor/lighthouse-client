import { getYearAndWeekAndDayFromString, getYearAndWeekFromString } from '@equinor/GardenUtils';
import { GetKeyFunction } from '@equinor/ParkView';
import { CustomGroupByKeys } from '../../types';
import { Loop } from '../../types/loop';
import { ExtendedGardenFields } from '../config';
const getFieldKeyBasedOnPlannedForecast = (
    groupBy: ExtendedGardenFields | string,
    plannedForecast: string
): keyof Loop => {
    switch (groupBy) {
        case 'c01':
            return plannedForecast === 'Forecast' ? 'c01ForecastDate' : 'c01PlannedDate';
        case 'c07':
            return plannedForecast === 'Forecast' ? 'c07ForecastDate' : 'c07PlannedDate';

        default:
            return 'c01ForecastDate';
    }
};

const getKeyData = (item: Loop, groupBy: keyof Loop): string => {
    const value = item[groupBy]?.toString();

    if (value) return value;

    const groupByPlanned = groupBy.replace('forecast', 'planned').replace('Forecast', 'Planned');
    return item[groupByPlanned];
};
const getColumnDateKey = (fieldKey: keyof Loop, weeklyDaily: 'Weekly' | 'Daily', item: Loop) => {
    const date = getKeyData(item, fieldKey);
    return weeklyDaily === 'Weekly'
        ? getYearAndWeekFromString(date)
        : getYearAndWeekAndDayFromString(date);
};
export const getDateKey: GetKeyFunction<Loop> = (item, key, groupBy) => {
    const { plannedForecast, weeklyDaily } = groupBy as CustomGroupByKeys;
    const fieldKey = getFieldKeyBasedOnPlannedForecast(key, plannedForecast);
    return getColumnDateKey(fieldKey, weeklyDaily, item);
};
