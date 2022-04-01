import { getYearAndWeekFromString } from '@equinor/GardenUtils';
import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { getDateFromString } from '../../../Handover/Garden/utility';
import { CustomGroupByKeys, McPackage } from '../../types';
import { ExtendedGardenFields } from '../config/gardenSetup';

const getFieldKeyBasedOnPlannedForecast = (
    groupBy: ExtendedGardenFields | string,
    plannedForecast: string
): keyof McPackage => {
    switch (groupBy) {
        case 'finalPunch':
            return plannedForecast === 'Forecast'
                ? 'finalPunchForecastDate'
                : 'finalPunchPlannedDate';

        case 'rfcmc':
            return plannedForecast === 'Forecast' ? 'rfccForecastDate' : 'rfccPlannedDate';

        case 'rfcc':
            return plannedForecast === 'Forecast' ? 'rfccActualDate' : 'rfccActualDate';

        case 'punchAccepted':
            return plannedForecast === 'Forecast'
                ? 'punchAcceptActualDate'
                : 'punchAcceptActualDate';

        default:
            return 'rfccActualDate';
    }
};
const getKeyData = (item: McPackage, groupBy: keyof McPackage): string => {
    const value = item[groupBy].toString();

    if (value) return value;

    const groupByPlanned = groupBy.replace('forecast', 'planned').replace('Forecast', 'Planned');
    return item[groupByPlanned];
};
const getColumnDateKey = (
    mcFieldKey: keyof McPackage,
    weeklyDaily: 'Weekly' | 'Daily',
    item: McPackage
): string => {
    const date = getKeyData(item, mcFieldKey);
    return weeklyDaily === 'Weekly' ? getYearAndWeekFromString(date) : getDateFromString(date);
};
export const getDateKey: GetKeyFunction<McPackage> = (item, key, groupBy) => {
    const { plannedForecast, weeklyDaily } = groupBy as CustomGroupByKeys;
    const mcFieldKey = getFieldKeyBasedOnPlannedForecast(key, plannedForecast);
    return getColumnDateKey(mcFieldKey, weeklyDaily, item);
};
