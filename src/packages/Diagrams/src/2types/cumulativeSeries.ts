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

export interface CumulativeSeries<T> {
    [key: string]: SeriesItem<T>;
}

export interface SeriesData {
    data: number[];
    name: string;
    type: 'column' | 'line' | 'bar';
}

export interface ChartData {
    series: SeriesData[];
    categories: string[];
}
