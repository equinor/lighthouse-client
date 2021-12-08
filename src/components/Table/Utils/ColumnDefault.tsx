import { useMemo } from 'react';
import { TableOptions } from 'react-table';
import { Column, TableData } from '../types';

export const createDefaultColumn = <D extends TableData>(
    props?: TableOptions<D>
): Partial<Column<D>> => ({
    minWidth: 30,
    width: 150,
    maxWidth: 500,

    ...(props?.defaultColumn || {}),
});

export const useDefaultColumn = <D extends TableData>(
    props: TableOptions<D>
): Partial<Column<D>> => {
    const column = useMemo(() => createDefaultColumn(props), []);
    return column as Partial<Column<D>>;
};
