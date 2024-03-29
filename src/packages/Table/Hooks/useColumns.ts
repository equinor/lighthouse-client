import { useMemo } from 'react';
import { TableData, ColumnOptions, Column } from '../Types/types';
import { generateHeaderKeys } from '../Utils/generateColumns';

/**
 * Hook to generate columns according to the data object parameter.
 * Possible to override the default generated columns by passing more arguments.
 * @param dataObject - The data object that is to be displayed
 * @param customColumns - Add extra columns i.e a computed column
 * @param headers - Change default Header title
 * @param customCellView - Change default cell view
 * @returns
 */
export function useColumns<TData extends TableData>(
  dataObject: TData,
  preventAutoGenerateColumns: boolean,
  options?: ColumnOptions<TData>
): Column<TData>[] {
  const columns = useMemo(
    () => generateHeaderKeys(dataObject, preventAutoGenerateColumns, options),
    [dataObject, options, preventAutoGenerateColumns]
  );
  return columns;
}
