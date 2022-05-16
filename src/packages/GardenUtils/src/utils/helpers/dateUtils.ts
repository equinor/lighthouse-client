import { DateTime } from 'luxon';

export const getYearAndWeekFromDate = (date: Date): string => {
    const dateTime = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return `${dateTime.weekYear}-${dateTime.weekNumber}`;
};
export const getYearAndWeekFromString = (dateString: string): string => {
    const date = new Date(dateString);
    return DateTime.fromJSDate(date).isValid ? getYearAndWeekFromDate(date) : 'N/A';
};
export const formatDateString = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') return 'N/A';
    const dateParts = new Intl.DateTimeFormat(undefined).formatToParts(date);
    return `${dateParts[0].value}/${dateParts[2].value}/${dateParts[4].value}`;
};

export const getYearAndWeekAndDayFromString = (dateString: string) => {
    const date = new Date(dateString);
    const dateTime = DateTime.fromJSDate(date);
    if (!dateTime.isValid) return 'N/A';
    return `${dateTime.weekYear}-${dateTime.month}-${dateTime.weekday}`;
};
