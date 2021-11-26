export interface BarChartOptions<T> {
    nameKey: keyof T;
    categoryKey: keyof T;
    stacked?: boolean;
    colors?: string[];
}
