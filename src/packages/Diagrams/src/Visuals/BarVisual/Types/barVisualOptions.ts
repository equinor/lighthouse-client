export type BarChartOptions<T extends Record<PropertyKey, unknown>> = {
    nameKey: keyof T;
    categoryKey: keyof T;
    stacked?: boolean;
    colors?: string[];
};
