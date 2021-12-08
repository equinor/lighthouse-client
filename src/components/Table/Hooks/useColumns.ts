import { useMemo } from 'react';
import { CellValue, Row } from 'react-table';
import { CustomColumn, TableData } from '../types';
import { generateHeaderKeys } from '../Utils/generateHeaderKeys';

export function useColumns<D extends TableData>(dataObject: D, customColumns?: CustomColumn[]) {
    const columns = useMemo(
        () => generateHeaderKeys(dataObject, customColumns),
        [dataObject, customColumns]
    );
    return columns;
}
