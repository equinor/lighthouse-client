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

export const getFirstMonth = (data: SwcrPackage[]): DateTime => {
    const createdAtDates = data.map((swcr) => swcr.createdAtDate);
    let firstCreatedMonth = DateTime.now().startOf('month');
    createdAtDates.forEach((date) => {
        const swcrDate = DateTime.fromJSDate(new Date(date));
        if (firstCreatedMonth.year > swcrDate.year) {
            firstCreatedMonth = swcrDate.startOf('month');
        } else if (firstCreatedMonth.year === swcrDate.year) {
            if (firstCreatedMonth.month > swcrDate.month) {
                firstCreatedMonth = swcrDate.startOf('month');
            }
        }
    });
    return firstCreatedMonth;
};

export const getMonths = (data: SwcrPackage[], numberOfMonthsBack?: number) => {
    let firstMonth = getFirstMonth(data);

    const startOfMonths = new Set<DateTime>();
    const today = DateTime.now().startOf('month');
    while (firstMonth.diff(today).as('months') < 0) {
        startOfMonths.add(firstMonth);
        firstMonth = firstMonth.plus({ month: 1 }).startOf('month');
    }

    return startOfMonths;
};
