import { SeriesItem } from './cumulativeSeries';

export interface SeriesItemOptions<T> {
    title: string;
    key: keyof T;
    type: 'column' | 'line' | 'bar';
    value: T[keyof T];
}

export interface CumulativeSeriesOptions<T> {
    categoriesKey: keyof T;
    title: string;
    type: 'column' | 'line' | 'bar';
    series?: Record<string, SeriesItemOptions<T>>;
    accenting?: boolean;
    key?: keyof T;
    value?: T[keyof T];
    filter?: (data: SeriesItem<T>) => boolean;
}
