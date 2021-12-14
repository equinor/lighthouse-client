import { useMemo } from 'react';
import { TableOptions } from 'react-table';
import { Column, TableData } from '../types';

export const createDefaultColumn = <T extends TableData>(
    props?: TableOptions<T>
): Partial<Column<T>> => ({
    minWidth: 30,
    width: 150,
    maxWidth: 500,

    ...(props?.defaultColumn || {}),
});

export const useDefaultColumn = <T extends TableData>(
    props: TableOptions<T>
): Partial<Column<T>> => {
    const column = useMemo(() => createDefaultColumn(props), []);
    return column as Partial<Column<T>>;
};
