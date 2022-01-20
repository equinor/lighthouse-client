export interface HorizontalBarChartOptions<T> {
    nameKey: keyof T;
    categoryKey: keyof T;
    onClick?: (data: T[], chartData: any) => void;
    stacked?: boolean;
    colors?: string[];
}
