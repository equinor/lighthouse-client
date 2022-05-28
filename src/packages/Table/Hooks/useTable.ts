import { PluginHook, TableInstance, TableOptions, useTable as useReactTable } from 'react-table';
import { TableData } from '../Types/types';
import { useDefaultColumn } from '../Utils/ColumnDefault';

export const useTable = <TData extends TableData>(
    options: TableOptions<TData>,
    plugins: Array<PluginHook<TData>> = []
): TableInstance<TData> => {
    const defaultColumn = useDefaultColumn<TData>(options);
    const instance = useReactTable({ ...options, defaultColumn }, ...plugins);
    return instance;
};
