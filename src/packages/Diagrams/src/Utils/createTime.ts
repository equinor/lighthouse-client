import { DateTime } from 'luxon';
import { ChartData, CumulativeSeries, CumulativeSeriesOptions } from '../Types';
import { convertToDate, sortDateByKey, sorting } from './sortDate';

export type TimeDimension = 'month' | 'week' | 'year' | 'quarter';

function getInitialTimeDecimation<T>(
    years: number[],
    timeDimension: TimeDimension,
    categoriesKey: string
): CumulativeSeries<T> {
    switch (timeDimension) {
        case 'month':
            return getMoths(years, categoriesKey);
        case 'quarter':
            return getQuarter(years, categoriesKey);
        case 'week':
            return getWeeks(years, categoriesKey);
        case 'year':
            return {};
        default:
            return {};
    }
}

const DummyData = null;

function getQuarter(years: number[], categoriesKey: string) {
    return years.reduce((quarters, year) => {
        Array.apply(DummyData, Array(4)).forEach((_, index) => {
            index++;
            quarters[`${index}-${year}`] = {
                categoriesKey,
                value: 0,
                date: `Q${index}/${year}`,
                series: {},
            };
        });
        return quarters;
    }, {});
}
function getMoths(years: number[], categoriesKey: string) {
    return years.reduce((months, year) => {
        Array.apply(DummyData, Array(12)).forEach((_, index) => {
            index++;
            months[`${index}-${year}`] = {
                categoriesKey,
                value: 0,
                date: `${index}/${year}`,
                series: {},
            };
        });
        return months;
    }, {});
}
function getWeeks(years: number[], categoriesKey: string) {
    return years.reduce((weeks, year) => {
        const weeksCount = DateTime.local(year).weeksInWeekYear;
        Array.apply(DummyData, Array(weeksCount)).forEach((_, index) => {
            index++;
            weeks[`${index}-${year}`] = {
                categoriesKey,
                value: 0,
                date: `W${index}/${year}`,
                series: {},
            };
        });
        return weeks;
    }, {});
}

function getTimeDimension(date: string, timeDimension: TimeDimension): string {
    const dt = DateTime.fromISO(new Date(date).toISOString());

    switch (timeDimension) {
        case 'month':
            return `${dt.month}-${dt.year}`;
        case 'quarter':
            return `${dt.quarter}-${dt.year}`;
        case 'week':
            return `${dt.weekNumber}-${dt.year}`;
        case 'year':
            return `${dt.year}`;
        default:
            return `${dt.year}`;
    }
}

function getYears<T>(data: T[], dateKey: keyof T): number[] {
    const years: Set<number> = new Set();
    data.forEach((item) => {
        item[dateKey] && years.add(new Date(item[dateKey] as any).getUTCFullYear());
    });
    return [...years];
}

function dataReducer<T>(sortedData: T[], options: CumulativeSeriesOptions<T>, time: TimeDimension) {
    const years = getYears(sortedData, options.categoriesKey);
    const initialData = getInitialTimeDecimation<T>(
        years,
        time,
        options.categoriesKey.toString()
    ) as CumulativeSeries<T>;

    const reducedData = sortedData.reduce((acc, item) => {
        if (!item[options.categoriesKey] || item[options.categoriesKey as string] === '')
            return acc;

        if (!options.key && !options.value) {
            const key = getTimeDimension(`${item[options.categoriesKey]}`, time);
            acc[key] = acc[key] || {
                categoriesKey: options.categoriesKey,
                value: 0,
                date: '',
                series: {},
            };
            acc[key].value = acc[key].value + 1;
            return acc;
        }
        if (options.key && item[options.key] === options.value) {
            const key = getTimeDimension(`${item[options.categoriesKey]}`, time);
            acc[key] = acc[key] || {
                categoriesKey: options.categoriesKey,
                value: 0,
                date: '',
                series: {},
            };
            acc[key].value = acc[key].value + 1;
            return acc;
        }

        return acc;
    }, initialData as CumulativeSeries<T>);
    return Object.values(reducedData).filter(options.filter ? options.filter : () => true);
}

export function timeChartSeries<T extends unknown>(
    dataItem: T[],
    options: CumulativeSeriesOptions<T>,
    time: TimeDimension
): ChartData {
    const sortedData = sortDateByKey(dataItem, options.categoriesKey);
    const reducedData = dataReducer<T>(sortedData, options, time);
    const data = reducedData.map((i) => i.value);
    const series = [{ data, name: options.title, type: options.type }];

    const cumulativeData: number[] = [];
    reducedData.reduce((a, b, i) => (cumulativeData[i] = a + b.value), 0);
    series.push({ data: cumulativeData, name: `${options.title} accumulated`, type: 'line' });

    const categories = reducedData.map((i) => i.date);

    return {
        series,
        categories,
    };
}
export function getWeek(date) {
    if (!(date instanceof Date)) date = new Date();

    // ISO week date weeks start on Monday, so correct the day number
    var nDay = (date.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week with the first Thursday of that year
    // Set the target date to the Thursday in the target week
    date.setDate(date.getDate() - nDay + 3);

    // Store the millisecond value of the target date
    var n1stThursday = date.valueOf();

    // Set the target to the first Thursday of the year
    // First, set the target to January 1st
    date.setMonth(0, 1);

    // Not a Thursday? Correct the date to the next Thursday
    if (date.getDay() !== 4) {
        date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
    }

    // The week number is the number of weeks between the first Thursday of the year
    // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
    return 1 + Math.ceil((n1stThursday - date) / 604800000);
}

/**
 * Accumulates based on month, year, quarter, week.
 * Counts the number of e.g. w1ActualDate in year 2020
 */
const accumulate = <T>(
    data: T[],
    name: string,
    type: 'month' | 'year' | 'quarter' | 'week',
    dateValue: number | string
) => {
    const accumulatedAmount = data.reduce((prev, curr) => {
        if (curr[name] !== '' && curr[name]) {
            switch (type) {
                case 'year':
                    if (new Date(curr[name]).getUTCFullYear() === dateValue) {
                        prev = prev + 1;
                        return prev;
                    }

                case 'month':
                    if (
                        `${new Date(curr[name]).getMonth() + 1}-${new Date(
                            curr[name]
                        ).getUTCFullYear()}` === dateValue
                    ) {
                        prev = prev + 1;
                        return prev;
                    }
                case 'quarter':
                    if (
                        `${Math.floor((new Date(curr[name]).getMonth() + 3) / 3)}-${new Date(
                            curr[name]
                        ).getUTCFullYear()}` === dateValue
                    ) {
                        prev = prev + 1;
                        return prev;
                    }
                case 'week':
                    if (
                        `${getWeek(new Date(curr[name]))}-${new Date(
                            curr[name]
                        ).getUTCFullYear()}` === dateValue
                    ) {
                        prev = prev + 1;
                        return prev;
                    }
            }

            return prev;
        }
        return prev;
    }, 0);
    return accumulatedAmount;
};
type CategoryValue = { values: (number | string)[] };
type CategoryMonth = CategoryValue & {
    type: 'month';
};
type CategoryYear = CategoryValue & {
    type: 'year';
};
type CategoryQuarter = CategoryValue & {
    type: 'quarter';
};
type CategoryWeek = CategoryValue & {
    type: 'week';
};
type CreateSeriesArgs<T> = {
    data: T[];
    keep: string[];
    categories: CategoryYear | CategoryMonth | CategoryQuarter | CategoryWeek;
};

/**
 * Iterates over the categories (could be years, quarters, months, weeks)
 * and for every category we iterate over the properties we want to show (w1, w2, w3....)
 */
const createSeries = <T>({ data, keep, categories }: CreateSeriesArgs<T>) => {
    const series: any[] = [];
    for (let i = 0; i < categories.values.length; i++) {
        for (let j = 0; j < keep.length; j++) {
            const dataSeries = accumulate(data, keep[j], categories.type, categories.values[i]);
            // only do this on first iteration of categories
            if (i > 0) {
                series[j].data.push(dataSeries);
            } else {
                series.push({
                    name: keep[j].replaceAll('ActualDate', ''),
                    data: [dataSeries],
                    type: 'column',
                });
            }
        }
    }
    return series;
};
export const getSeriesAndCategories = <T>(data: T[], time: TimeDimension) => {
    // years should come from somewhere in the dataset, not hardcoded
    const years = [2019, 2020, 2021];

    // I only want the keys, so the second argument beccomes irrelevant?
    const vals =
        time === 'month'
            ? getMoths(years, 'a')
            : time === 'quarter'
            ? getQuarter(years, 'a')
            : getWeeks(years, ' a');

    const categories = {
        values: time === 'year' ? years : Object.keys(vals),
        type: time,
    };

    const series = createSeries({ data, keep, categories });

    /**
     * Accumulated
     * Ex:
     * Categories:
     * [2019, 2020, 2021]
     * Series:
     * [[1,2,3], [2,3,1]]
     * Accumulated will be:
     * [3,5,4] for [2019, 2020,2021]
     * I want: [3, 8, 12]
     */
    const acc: number[] = series
        .map((entry) => entry.data)
        .reduce((prev, curr) => curr.map((entry, index) => (prev[index] || 0) + entry), []);

    let temp: number = 0;
    const tempAcc = acc.map((item) => (temp = (temp || 0) + item));

    series.push({ name: 'accumulated', data: tempAcc, type: 'line' });

    return {
        series,
        categories,
    };
};

// The properties from the WO object I want to use and iterate over.
export const keep = [
    'w1ActualDate',
    'w2ActualDate',
    'w3ActualDate',
    'w4ActualDate',
    'w5ActualDate',
    'w6ActualDate',
    'w7ActualDate',
    'w8ActualDate',
    'w9ActualDate',
    'w10ActualDate',
];

//
