import { useMemo } from 'react';
import { Column } from 'react-table';
import { generateDefaultColumns } from '../Utils/generateDefaultColumns';

export function useColumns<D extends Record<string, unknown>>(
    dataObject: D,
    columns?: Column<D>[]
): Column<D>[] {
    const generatedColumns = useMemo(
        () => (columns ? columns : generateDefaultColumns(dataObject)),
        [dataObject, columns]
    );
    return generatedColumns;
}
