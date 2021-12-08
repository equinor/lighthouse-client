import {
    Column as ColumnDefault,
    PluginHook as PluginHookDefault,
    HeaderProps,
    Renderer,
    UseFiltersColumnOptions,
    UseSortByColumnOptions,
    UseGroupByColumnOptions,
    CellValue,
    CellProps,
} from 'react-table';

export type TableData = Record<string | number, unknown>;
export type Column<TData extends TableData = TableData> = ColumnDefault<TData> &
    UseSortByColumnOptions<TData> &
    UseGroupByColumnOptions<TData> &
    UseFiltersColumnOptions<TData> & {
        columns?: Array<Column<TData>>;
        //ColumnHeader?: Renderer<HeaderProps<TData>>;
    };
export type CustomColumn<TData extends TableData = TableData> = {
    Header: Renderer<HeaderProps<TData>>;
    accessor: (row: TData) => CellValue;
    Aggregated?: Renderer<CellProps<TData>>;
};
declare module 'react-table' {
    //@ts-ignore
    export interface TableOptions<TData extends TableData = TableData>
        extends UseExpandedOptions<TData>,
            UseFiltersOptions<TData>,
            UseGlobalFiltersOptions<TData>,
            UseGroupByOptions<TData>,
            UsePaginationOptions<TData>,
            UseResizeColumnsOptions<TData>,
            UseRowSelectOptions<TData>,
            UseRowStateOptions<TData>,
            UseSortByOptions<TData>,
            TableData {
        enableSelectRow?: boolean;
        onCellClick?: (cell: Cell) => void;
    }

    //@ts-ignore
    export interface ColumnInstance<TData extends TableData = TableData>
        extends UseFiltersColumnProps<TData>,
            UseGroupByColumnProps<TData>,
            UseResizeColumnsColumnProps<TData>,
            UseSortByColumnProps<TData> {
        align: any; // TODO : what is it used for
    }

    //@ts-ignore
    export interface TableInstance<D extends TableData> extends UsePaginationInstanceProps<D> {
        pageSizes?: number[];
    }

    //@ts-ignore
    export interface Cell<D extends TableData>
        extends UseTableCellProps<D>,
            UseGroupByCellProps<D> {}

    //@ts-ignore
    export type Column<TData extends TableData> = Column<TData>;

    //@ts-ignore
    export type PluginHook<TData extends TableData> = PluginHookDefault<TData>;
}

export type { TableOptions, Cell } from 'react-table';
