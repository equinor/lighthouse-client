import moment from 'moment';
import { ChartData, CumulativeSeries, SeriesItem } from '../types/cumulativeSeries';
import { CumulativeSeriesOptions, SeriesItemOptions } from '../types/cumulativeSeriesOptions';
import { sortDateByKey } from './sortDate';

function createCumulativeSeries<T>(sortedData: T[], options: CumulativeSeriesOptions<T>) {
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

export function cumulativeSeries<T>(dataItem: T[], options: CumulativeSeriesOptions<T>): ChartData {
    const sortedData = sortDateByKey(dataItem, options.categoriesKey);

    const reducedData = createCumulativeSeries<T>(sortedData, options);
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

            series.push({
                data: currentData,
                name: seriesItem.title.toString(),
                type: seriesItem.type,
            });
        });
    }
    return {
        series,
        categories,
    };
}
