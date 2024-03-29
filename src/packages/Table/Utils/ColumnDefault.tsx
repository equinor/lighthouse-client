import { useMemo } from 'react';
import { TableOptions } from 'react-table';
import { Column, TableData } from '../Types/types';

export const createDefaultColumn = <T extends TableData>(
  props?: TableOptions<T>
): Partial<Column<T>> => ({
  minWidth: 10,
  width: 150,
  maxWidth: window.innerWidth - 90,

  ...(props?.defaultColumn || {}),
});

export const useDefaultColumn = <T extends TableData>(
  props: TableOptions<T>
): Partial<Column<T>> => {
  const column = useMemo(() => createDefaultColumn(props), []);
  return column as Partial<Column<T>>;
};
