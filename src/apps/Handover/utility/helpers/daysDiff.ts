import { DateTime, Duration } from 'luxon';
export const daysDiff = (date: Date): Duration => {
    const now = DateTime.local();
    const woDate = DateTime.fromJSDate(date);
    const diff = woDate.diff(now, ['days']);
    return diff;
};
