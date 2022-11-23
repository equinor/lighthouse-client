import { DateTime } from 'luxon';
import { PunchStatus } from '../../types';

export const DATE_BLANKSTRING = 'No Date';

export const itemSize = (volume: number, maxVolume: number) => {
    if (maxVolume <= 0) return 'small';
    const percentage = (volume / maxVolume) * 100;
    return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};

export const getYearAndWeekFromDate = (date: Date): string => {
    const dateTime = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const weekNumber = dateTime.weekNumber < 10 ? `0${dateTime.weekNumber}` : dateTime.weekNumber;
    return `${dateTime.year}-${weekNumber}`;
};
export const getYearAndWeekFromString = (dateString: string, removeDays = 0): string => {
    const date = new Date(dateString);
    return DateTime.fromJSDate(date).isValid
        ? getYearAndWeekFromDate(
              removeDays ? new Date(date.setDate(date.getDate() - removeDays)) : date
          )
        : DATE_BLANKSTRING;
};

export const sortByDate = (a: string, b: string) => {
    if (a === DATE_BLANKSTRING) return -1;
    if (b === DATE_BLANKSTRING) return 1;
    if (a === b) return 0;

    return a.localeCompare(b);
};

const PunchStatusColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#0084C4',
    Open: '#D9EAF2',
    Closed: '#4BB748',
};

export const getPunchStatusColors = (status: PunchStatus): string => PunchStatusColors[status];

const PunchStatusTextColors: Record<PunchStatus, string> = {
    'Cleared not verified': '#FFFFFF',
    Open: '#565656',
    Closed: '#FFFFFF',
};

export const getPunchStatusTextColors = (status: PunchStatus): string =>
    PunchStatusTextColors[status];
