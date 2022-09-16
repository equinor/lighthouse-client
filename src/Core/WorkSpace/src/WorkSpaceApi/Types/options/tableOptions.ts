import {
    CustomCell,
    CustomColumn,
    CustomHeader,
    TableData,
    Row,
    TableOptions as ReactTableOptions,
} from '@equinor/Table';
export type TableOptions<T> = Pick<
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ReactTableOptions<T>,
    'enableSelectRows' | 'onCellClick' | 'setSelected' | 'columnOrder' | 'onSelect'
> & {
    /** Function to run on Export to Excel button click handler. */
    excelExport?: (
        filteredRows: Row<T extends Record<PropertyKey, unknown> ? T : TableData>[]
    ) => Promise<void>;
    preventAutoGenerateColumns?: boolean;
    objectIdentifierKey: string;
    /** Hide certain columns based on key */
    hiddenColumns?: (keyof T)[];

    /** Change the default header */
    headers?: CustomHeader<T>[];

    /** Change the default cell view */
    customCellView?: CustomCell<T>[];
    /** Add extra columns that are not part of the dataset */
    customColumns?: CustomColumn<T>[];
    /** Height of each row */
    itemSize?: number;
};
