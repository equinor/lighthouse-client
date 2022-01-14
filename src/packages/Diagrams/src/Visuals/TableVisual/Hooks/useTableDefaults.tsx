import React, { useMemo } from 'react';
import { TableState } from 'react-table';
import { CustomTableState } from '../Types/table';

export interface TableDefaults {
    initialState: Partial<TableState<CustomTableState>>;
    defaultColumn: {
        minWidth: number;
        maxWidth: number;
        width?: number;
        Footer: React.FC;
    };
}

export function useTableDefaults(initialGroupBy: string): TableDefaults {
    const initialState: CustomTableState = useMemo(
        () => ({
            groupBy: [initialGroupBy],
        }),
        [initialGroupBy]
    );

    const defaultColumn = useMemo(
        () => ({
            minWidth: 10,
            maxWidth: 100,
            Footer: () => <></>,
        }),
        []
    );

    return {
        initialState: initialState as Partial<TableState<CustomTableState>>,
        defaultColumn,
    };
}
