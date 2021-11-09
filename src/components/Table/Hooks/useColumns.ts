import { useMemo } from 'react';
import { generateDefaultColumns } from '../Utils/generateHeaderKeys';

export function useColumns<D extends Object = {}>(dataObject: D) {
    const columns = useMemo(
        () => generateDefaultColumns(dataObject),
        [dataObject]
    );
    return columns;
}
