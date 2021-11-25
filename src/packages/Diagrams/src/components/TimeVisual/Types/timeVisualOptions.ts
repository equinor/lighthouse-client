import { CumulativeSeriesOptions } from '../../../types/cumulativeSeriesOptions';

export interface TimeBarChartProps<T> {
    data: T[];
    options: TimeBarChartOptions<T>;
}
export interface TimeBarChartOptions<T> {
    title: string;
    timeChartOptions: CumulativeSeriesOptions<T>;
    colors?: string[];
}
