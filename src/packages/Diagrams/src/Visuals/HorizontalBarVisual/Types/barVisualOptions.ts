export interface HorizontalBarChartOptions<T> {
    nameKey: keyof T;
    categoryKey: keyof T;
    onClick?: (data: T[], chartData: any, groupByKey: keyof T) => void;
    enableGroupBy?: boolean;
    stacked?: boolean;
    colors?: string[];
    title?: string;
}
