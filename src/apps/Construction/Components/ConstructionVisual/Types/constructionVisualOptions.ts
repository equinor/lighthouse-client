export interface ConstructionGraphProps<T> {
    data: T[];
    options: ConstructionGraphOptions<T>;
}
export interface ConstructionGraphOptions<T extends unknown> {
    title: string;
    defaultTime?: TimeDimension;
    timeChartOptions: CumulativeSeriesOptions<T>;
    colors?: string[];
    dateAccessor?: any | string | ((data: T[]) => any);
    accumulative?: boolean;
    sidesheetContent?: ({ data }: { data: T[] }) => JSX.Element;
}
