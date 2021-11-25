import { TableInstance } from 'react-table';

export interface Table extends TableInstance<object> {
    setGroupBy: (arr: string[]) => void;
}

export interface CustomTableState {
    groupBy: string[];
}
