import moment from 'moment';

interface CumulativeSeries {
    title: string;
    key: string;
    value: number;
}
export interface CumulativeSeriesOptions<T> {
    categoriesKey: keyof T;
    title: string;
    type: 'column' | 'line' | 'bar';
    series?: Record<string, Series<T>>;
    accenting?: boolean;
    filter?: (data: SeriesItem<T>) => boolean;
}

function sortDate<T>(dataItem: T[], key: keyof T, accenting: boolean = true) {
    return dataItem.sort((a: T, b: T) => {
        return new Date(a[key as string]).getTime() - new Date(b[key as string]).getTime();
    });
}

// function sortByKey<T>(dataItem: T[], key: keyof T, accenting: boolean = true) {
//     return dataItem.sort((a: T, b: T) => {
//         if (accenting) {
//             return a[key as string] - b[key as string];
//         }
//         return b[key as string] - a[key as string];
//     });
// }

function dataReducer<T>(sortedData: T[], options: CumulativeSeriesOptions<T>) {
    const reducedData = sortedData.reduce((acc, item) => {
        if (!item[options.categoriesKey] || item[options.categoriesKey as string] === '')
            return acc;
        const date = moment(item[options.categoriesKey]).format('L');
        acc[date] = acc[date] || {
            categoriesKey: options.categoriesKey,
            value: 0,
            date,
        };

        acc[date].value = acc[date].value + 1;

        if (options.series) {
            Object.values(options.series).forEach((series: Series<T>) => {
                if (item[series.key] === series.value) {
                    acc[date].series[series.key].value = acc[date].series[series.key].value + 1;
                }
            });
        }

        return acc;
    }, {} as AccumulativeSeries<T>);
    return Object.values(reducedData).filter(options.filter ? options.filter : () => true);
}

export function cumulativeSeries<T>(dataItem: T[], options: CumulativeSeriesOptions<T>) {
    const sortedData = sortDate(dataItem, options.categoriesKey, options.accenting);

    const reducedData = dataReducer<T>(sortedData, options);
    const data = reducedData.map((i) => i.value);
    const series = [{ data, name: options.title, type: options.type }];

    const cumulativeData: number[] = [];
    reducedData.reduce((a, b, i) => (cumulativeData[i] = a + b.value), 0);
    series.push({ data: cumulativeData, name: `${options.title} accumulated`, type: 'line' });

    const categories = reducedData.map((i) => i.date);

    if (options.series) {
        Object.values(options.series).forEach((seriesItem: Series<T>) => {
            const currentData = reducedData.map((i: SeriesItem<T>) => i.value);
            const cumulativeData: number[] = [];
            reducedData.reduce((a, b, i) => (cumulativeData[i] = a + b.value), 0);
            series.push({ data: currentData, name: seriesItem.key, type: seriesItem.type });
            series.push({ data: cumulativeData, name: seriesItem.key, type: 'line' });
        });
    }
    console.log(series, categories);
    return {
        series,
        categories,
    };
}

export function createCumulativeSeries<T>(
    dataItem: T[],
    type: string,
    dateKey: string,
    categoryKey: string,
    value: string
) {
    const sortedData = dataItem.sort((a: T, b: T) => {
        return new Date(a[dateKey]).getTime() - new Date(b[dateKey]).getTime();
    });

    const reducedData = sortedData.reduce((acc, item) => {
        if (!item[dateKey] || item[dateKey] === '') return acc;
        const date = moment(item[dateKey]).format('L');
        acc[date] = acc[date] || {
            tile: date,
            value: 0,
        };
        if (item[categoryKey] === value) {
            acc[date].value = acc[date].value + 1;
        }

        return acc;
    }, {} as AccumulativeSeries<T>);
    const items = Object.values(reducedData).filter((f) => f.categoriesKey.includes('2021'));

    const data = items.map((i) => i.value);
    const categories = items.map((i) => i.categoriesKey);
    const cumulativeData: number[] = [];
    items.reduce((a, b, i) => (cumulativeData[i] = a + b.value), 0);
    return {
        series: [
            { data, name: value, type: 'column' },
            { data: cumulativeData, name: `Cumulative ${value}`, type: 'line' },
        ],
        categories,
    };
}
export interface Series<T> {
    key: keyof T;
    type: 'column' | 'line' | 'bar';
    value: number;
}
export interface SeriesItem<T> {
    categoriesKey: string;
    type: string;
    date: string;
    value: number;
    series: {
        [key: string]: Series<T>;
    };
}

interface AccumulativeSeries<T> {
    [key: string]: SeriesItem<T>;
}
