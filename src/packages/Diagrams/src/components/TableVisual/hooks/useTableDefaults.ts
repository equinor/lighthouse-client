import { useMemo } from 'react';
import { TableState } from 'react-table';
import { CustomTableState } from '../types/table';

export interface TableDefaults {
    initialState: Partial<TableState<CustomTableState>>;
    defaultColumn: {
        minWidth: number;
        maxWidth: number;
        width?: number;
    };
}

export function useTableDefaults(initialGroupBy: string): TableDefaults {
    const initialState: CustomTableState = useMemo(
        () => ({
            groupBy: [initialGroupBy],
        }),
        []
    );

    const defaultColumn = useMemo(
        () => ({
            minWidth: 30,
            // width: 150,
            maxWidth: 100,
        }),
        []
    );

    return {
        initialState: initialState as Partial<TableState<CustomTableState>>,
        defaultColumn,
    };
}
