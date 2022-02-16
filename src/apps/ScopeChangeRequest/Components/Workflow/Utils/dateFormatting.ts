import { DateTime } from 'luxon';

export const convertUtcToLocalDate = (date: Date): Date =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

/**
 * Converts js date to this format "DD/MM/YYYY HH:SS"
 * @param date
 * @returns
 */
export function dateToDateTimeFormat(date: Date): string {
    const { day, month, year, hour, minute } = DateTime.fromJSDate(date).toObject();
    const paddedMinutes = minute.toString().length === 1 ? `0${minute}` : minute;

    return `${day}/${month}/${year} ${hour}:${paddedMinutes}`;
}
