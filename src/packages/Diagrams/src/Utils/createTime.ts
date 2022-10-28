import { DateTime } from 'luxon';
import { ChartData, CumulativeSeries, CumulativeSeriesOptions, TimeDimension } from '../Types';
import { sortDateByKey } from './sortDate';

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

function dataReducer<T extends Record<PropertyKey, unknown>>(
    sortedData: T[],
    options: CumulativeSeriesOptions<T>,
    time: TimeDimension
) {
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

export function timeChartSeries<T extends Record<PropertyKey, unknown>>(
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
