import { DateTime } from 'luxon';
import { SwcrPackage } from '../models/SwcrPackage';

export const getLastWeeks = (numberOfWeeksBack?: number) => {
    const today = new Date();
    const week = DateTime.fromJSDate(today).startOf('week').toJSDate();
    const weeks: DateTime[] = [];
    const limit = numberOfWeeksBack || 20;
    for (let i = 0; i < limit; i++) {
        const offset = i * 7;
        const startOfWeek = DateTime.fromJSDate(today).startOf('week').toJSDate();
        startOfWeek.setDate(week.getDate() - offset);
        weeks.push(DateTime.fromJSDate(startOfWeek));
    }
    return weeks.reverse();
};
