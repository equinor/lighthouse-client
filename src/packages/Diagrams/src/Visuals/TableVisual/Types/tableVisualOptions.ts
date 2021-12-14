import { Column } from 'react-table';

export type TableStyles = {
    table?: React.CSSProperties;
    tableHeader?: React.CSSProperties;
    tableRow?: React.CSSProperties;
    tableRows?: React.CSSProperties;
    tableFooter?: React.CSSProperties;
    tableFooterRow?: React.CSSProperties;
};

export type GroupBy<T extends Record<string, unknown>> = { key: keyof T; title?: string };
export interface TableVisualOptions<T extends Record<string, unknown>> {
    initialGroupBy: keyof T;
    groupBy?: GroupBy<T>[];
    columns?: Column<T>[];
    styles?: TableStyles;
}
