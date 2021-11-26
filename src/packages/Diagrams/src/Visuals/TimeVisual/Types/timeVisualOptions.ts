import { CumulativeSeriesOptions } from '../../../types/cumulativeSeriesOptions';
import { TimeDimension } from '../../../utils/createTime';

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
