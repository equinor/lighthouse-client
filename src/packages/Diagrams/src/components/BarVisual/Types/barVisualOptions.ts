export interface BarChartOptions<T> {
    stacked: boolean;
    nameKey: keyof T;
    categoryKey: keyof T;
    colors?: string[];
}
