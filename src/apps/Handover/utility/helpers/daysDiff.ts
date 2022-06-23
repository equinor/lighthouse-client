import { DateTime, Duration } from 'luxon';
export const daysDiff = (date: string | null): Duration | null => {
    if (!date) return null;
    const now = DateTime.local();
    const woDate = DateTime.fromFormat(date, 'yyyy-MM-dd');
    const diff = woDate.diff(now, ['days']);
    return diff;
};
