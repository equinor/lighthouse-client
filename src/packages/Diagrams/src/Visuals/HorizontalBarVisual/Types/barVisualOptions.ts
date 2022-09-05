export type HorizontalBarChartOptions<T extends Record<PropertyKey, unknown>> = {
    nameKey: keyof T;
    categoryKey: keyof T;
    title?: string;
    onClick?: (data: T[], chartData: any, groupByKey: keyof T) => void;
    enableGroupBy?: boolean;
    stacked?: boolean;
    colors?: string[];
};
