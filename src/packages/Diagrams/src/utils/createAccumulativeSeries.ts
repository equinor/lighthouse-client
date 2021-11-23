import moment from 'moment';
import { CumulativeSeries, SeriesItem } from '../types/cumulativeSeries';
import { CumulativeSeriesOptions, SeriesItemOptions } from '../types/cumulativeSeriesOptions';
import { sortDate } from './sortDate';

function dataReducer<T>(sortedData: T[], options: CumulativeSeriesOptions<T>) {
    console.log(sortedData.length);
    const reducedData = sortedData.reduce((acc, item) => {
        if (!item[options.categoriesKey] || item[options.categoriesKey as string] === '')
            return acc;
        const date = moment(item[options.categoriesKey]).format('L');
        acc[date] = acc[date] || {
            categoriesKey: options.categoriesKey,
            value: 0,
            date,
            series: {},
        };

        acc[date].value = acc[date].value + 1;

        if (options.series) {
            Object.values(options.series).forEach((series: SeriesItemOptions<T>) => {
                if (item[series.key] === series.value) {
                    acc[date].series[series.key.toString()] = acc[date].series[
                        series.key.toString()
                    ] || {
                        key: series.key,
                        type: series.type,
                        value: 0,
                    };
                    acc[date].series[series.key.toString()].value =
                        acc[date].series[series.key.toString()].value + 1;
                }
            });
        }

        return acc;
    }, {} as CumulativeSeries<T>);
    return Object.values(reducedData).filter(options.filter ? options.filter : () => true);
}

export function cumulativeSeries<T>(dataItem: T[], options: CumulativeSeriesOptions<T>) {
    const sortedData = sortDate(dataItem, options.categoriesKey);

    const reducedData = dataReducer<T>(sortedData, options);
    const data = reducedData.map((i) => i.value);
    const series = [{ data, name: options.title, type: options.type }];

    const cumulativeData: number[] = [];
    reducedData.reduce((a, b, i) => (cumulativeData[i] = a + b.value), 0);
    series.push({ data: cumulativeData, name: `${options.title} accumulated`, type: 'line' });

    const categories = reducedData.map((i) => i.date);

    if (options.series) {
        Object.values(options.series).forEach((seriesItem: SeriesItemOptions<T>) => {
            const currentData = reducedData.map((i: SeriesItem<T>) => {
                if (i.series[seriesItem.key.toString()]) {
                    return i.series[seriesItem.key.toString()].value;
                } else {
                    return 0;
                }
            });
            console.log(currentData);
            // const cumulativeData: number[] = [];
            // reducedData.reduce(
            //     (a, b, i) => (cumulativeData[i] = a + b.series[seriesItem.key.toString()].value),
            //     0
            // );
            series.push({
                data: currentData,
                name: seriesItem.title.toString(),
                type: seriesItem.type,
            });
            // series.push({ data: cumulativeData, name: seriesItem.title.toString(), type: 'line' });
        });
    }
    // console.log(series, categories);
    return {
        series,
        categories,
    };
}

// export function createCumulativeSeries<T>(
//     dataItem: T[],
//     type: string,
//     dateKey: string,
//     categoryKey: string,
//     value: string
// ) {
//     const sortedData = dataItem.sort((a: T, b: T) => {
//         return new Date(a[dateKey]).getTime() - new Date(b[dateKey]).getTime();
//     });

//     const reducedData = sortedData.reduce((acc, item) => {
//         if (!item[dateKey] || item[dateKey] === '') return acc;
//         const date = moment(item[dateKey]).format('L');
//         acc[date] = acc[date] || {
//             tile: date,
//             value: 0,
//         };
//         if (item[categoryKey] === value) {
//             acc[date].value = acc[date].value + 1;
//         }

//         return acc;
//     }, {} as CumulativeSeries<T>);
//     const items = Object.values(reducedData).filter((f) => f.categoriesKey.includes('2021'));

//     const data = items.map((i) => i.value);
//     const categories = items.map((i) => i.categoriesKey);
//     const cumulativeData: number[] = [];
//     items.reduce((a, b, i) => (cumulativeData[i] = a + b.value), 0);
//     return {
//         series: [
//             { data, name: value, type: 'column' },
//             { data: cumulativeData, name: `Cumulative ${value}`, type: 'line' },
//         ],
//         categories,
//     };
// }


