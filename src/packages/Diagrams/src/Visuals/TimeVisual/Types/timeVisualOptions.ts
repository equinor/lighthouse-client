import { CumulativeSeriesOptions, TimeDimension } from '../../../Types';

export interface TimeBarChartProps<T> {
    data: T[];
    options: TimeBarChartOptions<T>;
}
export interface TimeBarChartOptions<T extends unknown> {
    title: string;
    defaultTime?: TimeDimension;
    timeChartOptions: CumulativeSeriesOptions<T>;
    colors?: string[];
    dateAccessor?: any | string | ((data: T[]) => any);
    accumulative?: boolean;
}
