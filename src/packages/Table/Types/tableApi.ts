import { Row, ColumnInstance, HeaderGroup } from 'react-table';
import { TableData } from './types';

export type SelectedRowCallback = (rows: Row<TableData>[]) => string | null;
export interface TableAPI {
    toggleHideColumn: (colId: string) => void;
    setColumnOrder: (updater: string[] | ((columnOrder: string[]) => string[])) => void;
    getVisibleColumns: () => ColumnInstance<TableData, TableData>[];
    getHeaderGroups: () => HeaderGroup<TableData>[];
    getSelectedRowId: () => string | null;
    setSelectedRowId: (callbackOrId: SelectedRowCallback | string) => void;
    getColumns: () => ColumnInstance<TableData, TableData>[];
}
