import { useMemo } from 'react';
import { TableData, Column, CustomCell, CustomHeader } from '../types';
import { generateHeaderKeys } from '../Utils/generateHeaderKeys';

export function useColumns<D extends TableData>(
    dataObject: D,
    customColumns?: Column<D>[],
    headers?: CustomHeader[],
    customCellView?: CustomCell[]
) {
    const columns = useMemo(
        () => generateHeaderKeys(dataObject, customColumns, headers, customCellView),
        [dataObject, customColumns]
    );
    return columns;
}
