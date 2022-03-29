import { DateTime, Duration } from 'luxon';
export const weekDiff = (week: Date): Duration => {
    const now = DateTime.local();
    const woDate = DateTime.fromJSDate(week);
    const diff = woDate.diff(now, ['days', 'weeks']);
    return diff;
};
