import React, { HTMLAttributes } from 'react';
import {
    Column as ColumnDefault,
    PluginHook as PluginHookDefault,
    Renderer,
    UseFiltersColumnOptions,
    UseSortByColumnOptions,
    UseGroupByColumnOptions,
    CellProps,
    Cell,
} from 'react-table';
export type TableData = Record<string | number, unknown>;
export type CellAttributeFn<T> = (content: T) => HTMLAttributes<HTMLDivElement>;
export type ColumnOptions<T extends TableData> = {
    customColumns?: CustomColumn<T>[];
    headers?: CustomHeader<T>[];
    customCellView?: CustomCell<T>[];
};
/**
 * Type for what the accessor property method in the column object can accept as arguments
 * and added to the value property of the table data model.
 * Note that accessors should return primitive values, so only use this when needed.
 */
export type CellRenderProps<T> = {
    content: T;
    currentKey: string;
    cellAttributeFn?: CellAttributeFn<T>;
};
/**
 * Makes it possible to pass any generic T to CustomColumn which requires a T extending object.
 */
type ObjectOrTableData<T> = T extends object ? T : TableData;

export type CustomColumn<T> = Column<ObjectOrTableData<T>> &
    Required<Pick<Column<ObjectOrTableData<T>>, 'Aggregated' | 'aggregate' | 'Header' | 'id'>>;
export type CustomCellType<T, D extends TableData> = {
    /** Custom cell to be display. Has access to table data object when used as a method */
    Cell: Renderer<CellProps<D, CellRenderProps<T>>>;
};
export type CellType<T, D extends TableData = TableData> =
    | 'Date'
    | 'Description'
    | 'Status'
    | 'Link'
    | 'Progress'
    | CustomCellType<T, D>;
export type CustomCell<T> = {
    /** Unique key to specify which column the custom cell is added to */
    key: keyof T;
    /** What type of Cell view is wanted. Custom type is also possible by making type an object*/
    type: CellType<T>;
	@@ -71,7 +71,7 @@
    title: string;
};

export type Column<T extends object = TableData> = ColumnDefault<T> &
    UseSortByColumnOptions<T> &
    UseGroupByColumnOptions<T> &
    UseFiltersColumnOptions<T> & {
	@@ -88,15 +88,16 @@ declare module 'react-table' {
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
        /** Set to true if checkboxes should be shown */
        enableSelectRows?: boolean;
        /** Click handler for cells */
        onCellClick?: CellClickHandler<TData>;
        setSelected?: (item: any) => void;
        onSelect?: (item: TData) => void;
        /** Order columns. Has to be an array of id's (keyof T) */
        columnOrder?: string[];
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
    export interface TableInstance<D extends TableData>
        extends UsePaginationInstanceProps<D>,
        UseColumnOrderInstanceProps<D> {
        pageSizes?: number[];
        data: D[];
    }

    //@ts-ignore
    export interface Cell<D extends TableData>
        extends UseTableCellProps<D>,
        UseGroupByCellProps<D> { }

    //@ts-ignore
    export type Column<TData extends TableData> = Column<TData>;

    //@ts-ignore
    export type PluginHook<TData extends TableData> = PluginHookDefault<TData>;

    //@ts-ignore
    export interface TableState<D extends TableData> extends Partial<UseGroupByState<D>> { }
}

export type { TableOptions, Cell, TableInstance, CellProps } from 'react-table';