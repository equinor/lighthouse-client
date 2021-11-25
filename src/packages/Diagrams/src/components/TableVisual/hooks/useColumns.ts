import { useMemo } from 'react';
import { generateDefaultColumns } from '../utils/generateDefaultColumns';

export function useColumns<D>(dataObject: D) {
    const columns = useMemo(() => generateDefaultColumns(dataObject), [dataObject]);
    return columns;
}
