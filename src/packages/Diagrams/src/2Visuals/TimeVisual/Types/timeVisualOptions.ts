import { TimeDimension } from '../../../2utils/createTime';
import { CumulativeSeriesOptions } from '../../../types/cumulativeSeriesOptions';

export interface TimeBarChartProps<T> {
    data: T[];
    options: TimeBarChartOptions<T>;
}
export interface TimeBarChartOptions<T> {
    title: string;
    defaultTime?: TimeDimension;
    timeChartOptions: CumulativeSeriesOptions<T>;
    colors?: string[];
}
