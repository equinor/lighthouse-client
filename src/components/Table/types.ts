import { HTMLAttributes } from 'react';
import {
    Column as ColumnDefault,
    PluginHook as PluginHookDefault,
    Renderer,
    UseFiltersColumnOptions,
    UseSortByColumnOptions,
    UseGroupByColumnOptions,
    CellProps,
} from 'react-table';

export type TableData = Record<string | number, unknown>;

export type CellFn<TData> = (content: TData) => HTMLAttributes<HTMLDivElement>;

/**
 * Types for what the accessor property method in the column object can accept as arguments
 * and added to the value property of the table data model.
 * Note that accessors should return primitive values, so only use this when needed.
 */
export type CellRenderProps<TData> = {
    content: TData;
    currentKey: string;
    cellFn?: CellFn<TData>;
};

export type CustomColumn = Column & Required<Pick<Column, 'Aggregated' | 'aggregate' | 'Header'>>;

export type CustomCellType<TData, D extends TableData> = {
    /** Custom cell to be display. Has access to table data object when used as a method */
    Cell: Renderer<CellProps<D, CellRenderProps<TData>>>;
};

export type CellType<TData, D extends TableData = TableData> =
    | 'Date'
    | 'Description'
    | 'Status'
    | CustomCellType<TData, D>;

export type CustomCell<TData> = {
    /** Unique key to specify which column the custom cell is added to */
    key: keyof TData;

    /** What type of Cell view is wanted. Custom type is also possible by making type an object*/
    type: CellType<TData>;

    /** Function that returns HTML attributes that are added to the custom cell, i.e. styling */
    cellFn?: CellFn<TData>;
};

export type CustomHeader<TData> = {
    /** Unique key to specify which column the custom header is added to */
    key: keyof TData;

    /** Title which is shown instead of default header title */
    title: string;
};

export type Column<TData extends TableData = TableData> = ColumnDefault<TData> &
    UseSortByColumnOptions<TData> &
    UseGroupByColumnOptions<TData> &
    UseFiltersColumnOptions<TData> & {
        columns?: Array<Column<TData>>;
        //ColumnHeader?: Renderer<HeaderProps<TData>>;
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
        setSelected?: (item: any) => void;
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
