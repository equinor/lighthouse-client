import { SeriesItem } from './cumulativeSeries';

export type SeriesItemOptions<T extends Record<PropertyKey, unknown>> = {
    title: string;
    key: keyof T;
    type: 'column' | 'line' | 'bar';
    value: T[keyof T];
};

export type CumulativeSeriesOptions<T extends Record<PropertyKey, unknown>> = {
    categoriesKey: keyof T;
    title: string;
    type: 'column' | 'line' | 'bar';
    series?: Record<string, SeriesItemOptions<T>>;
    accenting?: boolean;
    key?: keyof T;
    value?: T[keyof T];
    filter?: (data: SeriesItem<T>) => boolean;
};
