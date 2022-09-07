import { CumulativeSeriesOptions, TimeDimension } from '../../../Types';

export type TimeBarChartProps<T extends Record<PropertyKey, unknown>> = {
    data: T[];
    options: TimeBarChartOptions<T>;
};
export type TimeBarChartOptions<T extends Record<PropertyKey, unknown>> = {
    title: string;
    defaultTime?: TimeDimension;
    timeChartOptions: CumulativeSeriesOptions<T>;
    colors?: string[];
    dateAccessor?: any | string | ((data: T[]) => any);
    accumulative?: boolean;
};
