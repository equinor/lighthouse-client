import { CumulativeSeriesOptions } from '../../../2types/cumulativeSeriesOptions';
import { TimeDimension } from '../../../Utils/createTime';

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
