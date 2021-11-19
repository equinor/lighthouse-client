import moment from 'moment';

export function createAccumulativeSeries<T>(
    dataItem: T[],
    dateKey: keyof T,
    categoryKey: keyof T
) {
    const timeLine = dataItem.reduce((acc, item) => {
        const date = moment(item[dateKey]).format('LL');
        acc[date] = acc[date] || {
            tile: dateKey,
            value: 0,
            cumulativeValue: 0
        };
        acc[date].value = acc[date].value + 1;

        return acc;
    }, {} as AccumulativeSeries);
}

interface SeriesItem {
    tile: string;
    value: number;
    cumulativeValue: number;
}

interface AccumulativeSeries {
    [date: string]: SeriesItem;
}
