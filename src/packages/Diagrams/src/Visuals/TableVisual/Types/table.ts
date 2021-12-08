import { TableInstance } from 'react-table';

export interface Table extends TableInstance<Record<string, unknown>> {
    setGroupBy: (arr: string[]) => void;
}

export interface CustomTableState {
    groupBy: string[];
}
