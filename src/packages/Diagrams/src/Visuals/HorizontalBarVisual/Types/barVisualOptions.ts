export interface HorizontalBarChartOptions<T> {
    nameKey: keyof T;
    categoryKey: keyof T;
    stacked?: boolean;
    colors?: string[];
}
