import { DateTime } from 'luxon';
import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { HandoverPackage, HandoverCustomGroupByKeys } from '../models';

export const getFieldKeyBasedOnPlannedForecast = (
    groupBy: string,
    plannedForecast: string
): keyof HandoverPackage => {
    switch (groupBy) {
        case 'RFOC':
            return plannedForecast === 'Forecast' ? 'forecastFinishDate' : 'plannedFinishDate';

        case 'RFCC':
            return plannedForecast === 'Forecast' ? 'forecastStartDate' : 'plannedStartDate';

        case 'TAC':
            return plannedForecast === 'Forecast' ? 'forecastTacDate' : 'plannedTacDate';

        case 'DCC':
            return plannedForecast === 'Forecast'
                ? 'demolitionForecastStartDate'
                : 'demolitionPlannedStartDate';

        case 'RFRC':
            return plannedForecast === 'Forecast'
                ? 'demolitionForecastFinishDate'
                : 'demolitionPlannedFinishDate';

        default:
            return 'plannedFinishDate';
    }
};

const getKeyData = (item: HandoverPackage, groupBy: keyof HandoverPackage): string => {
    const value = item[groupBy] as string;

    if (value) return value;

    const groupByPlanned = groupBy
        .replace('forecast', 'planned')
        .replace('Forecast', 'Planned') as keyof HandoverPackage;
    return item[groupByPlanned] as string;
};

export const getYearAndWeekAndDayFromString = (dateString: string) => {
    const date = new Date(dateString);
    const dateTime = DateTime.fromJSDate(date);
    if (!dateTime.isValid) return 'N/A';
    return `${dateTime.weekYear}-${dateTime.month}-${dateTime.weekday}`;
};

export const getYearAndWeekFromDate = (date: Date): string => {
    const dateTime = DateTime.fromJSDate(date);
    return `${dateTime.weekYear}-${dateTime.weekNumber}`;
};

export const getYearAndWeekFromString = (dateString: string): string => {
    const date = new Date(dateString);
    return DateTime.fromJSDate(date).isValid ? getYearAndWeekFromDate(date) : 'N/A';
};

export const getDateFromString = (dateString: string): string => dateString || 'N/A';

const getColumnDateKey = (handoverFieldKey, weeklyDaily, item): string => {
    const date = getKeyData(item, handoverFieldKey);
    return weeklyDaily === 'Weekly'
        ? getYearAndWeekFromString(date)
        : getYearAndWeekAndDayFromString(date);
};

export const getDateKey: GetKeyFunction<HandoverPackage> = (item, key, groupBy) => {
    const { plannedForecast, weeklyDaily } = groupBy as HandoverCustomGroupByKeys;
    const handoverFieldKey = getFieldKeyBasedOnPlannedForecast(key as string, plannedForecast);
    return getColumnDateKey(handoverFieldKey, weeklyDaily, item);
};

export const getProgressKey: GetKeyFunction<HandoverPackage> = (item) => `${item.progress || '0'}%`;

export const getMaxVolumeFromData = (data: HandoverPackage[]): number => {
    const volumes = data.map((d) => d.volume).sort((a, b) => a - b);

    volumes.pop();
    volumes.shift();
    return (volumes.reduce((a, b) => a + b, 0) / volumes.length) * 2;
};
