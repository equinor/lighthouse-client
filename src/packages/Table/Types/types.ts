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
    HeaderProps,
} from 'react-table';

export type TableData = Record<string | number, unknown>;

export type CellAttributeFn<T> = (content: T) => HTMLAttributes<HTMLDivElement>;

export type ColumnOptions<T extends TableData> = {
    customColumns?: CustomColumn<T>[];
    headers?: CustomHeader<T>[];
    customCellView?: CustomCell<T>[];
    hiddenColumnsCount?: number;
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
    Required<
        Pick<Column<ObjectOrTableData<T>>, 'Aggregated' | 'aggregate' | 'Header' | 'id' | 'width'>
    >;

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
    | 'Array'
    | 'RelativeDate'
    | 'Number'
    | 'YearAndWeek'
    | CustomCellType<T, D>;

export type CustomCell<T> = {
    /** Unique key to specify which column the custom cell is added to */
    key: keyof T;

    /** What type of Cell view is wanted. Custom type is also possible by making type an object*/
    type: CellType<T>;

    /** Function that returns HTML attributes that are added to the custom cell, i.e. styling */
    cellAttributeFn?: CellAttributeFn<T>;
};

export type CustomHeaderType<T> = {
    /** Custom Header to be displayed. Has access to table data object when used as a method */
    Custom: Renderer<HeaderProps<ObjectOrTableData<T>>>;
};

export type HeaderType<T> = string | CustomHeaderType<T>;

export type CustomHeader<T> = {
    /** Unique key to specify which column the custom header is added to */
    key: keyof T;

    /** Title which is shown instead of default header title. Either string og object with custom Header renderer */
    title: HeaderType<T>;

    /** Optional width parameter for the column in px */
    width?: number;
};

export type Column<T extends object = TableData> = ColumnDefault<T> &
    UseSortByColumnOptions<T> &
    UseGroupByColumnOptions<T> &
    UseFiltersColumnOptions<T> & {
        columns?: Array<Column<T>>;
        //ColumnHeader?: Renderer<HeaderProps<TData>>;
    };

export type CellClickHandler<D extends TableData> = (
    cell: Cell<D, Partial<Pick<CellRenderProps<D>, 'content' | 'currentKey'>>>,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void;

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
        /** Set to true if checkboxes should be shown */
        enableSelectRows?: boolean;
        /** Click handler for cells */
        onCellClick?: CellClickHandler<TData>;
        setSelected?: (item: any) => void;

        onSelect?: (item: TData, id: string) => void;
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
            UseColumnOrderInstanceProps<D>,
            UseGroupByInstanceProps<D>,
            UseExpandedInstanceProps<D> {
        pageSizes?: number[];
        data: D[];
    }
    //@ts-ignore
    export interface Row<D extends TableData>
        extends UseTableRowProps<D>,
            UseGroupByRowProps<D>,
            UseExpandedRowProps<D> {}
    //@ts-ignore
    export interface Cell<D extends TableData>
        extends UseTableCellProps<D>,
            UseGroupByCellProps<D> {}

    //@ts-ignore
    export type Column<TData extends TableData> = Column<TData>;

    //@ts-ignore
    export type PluginHook<TData extends TableData> = PluginHookDefault<TData>;

    //@ts-ignore
    export interface TableState<D extends TableData>
        extends Partial<UseGroupByState<D>>,
            UseExpandedState<D> {}
}

export type { TableOptions, Cell, TableInstance, CellProps } from 'react-table';
