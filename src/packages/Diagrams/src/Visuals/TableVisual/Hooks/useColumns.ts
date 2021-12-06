import { useMemo } from 'react';
import { generateDefaultColumns } from '../Utils/generateDefaultColumns';

interface Columns<D> {
    accessor: keyof D;
    Header: string;
    minWidth: number;
    maxWidth: number;
    aggregate: string;
    Aggregated: (cell: any) => JSX.Element;
    Footer: (data: any) => JSX.Element;
}

export function useColumns<D>(dataObject: D): Columns<D>[] {
    const columns = useMemo(() => generateDefaultColumns(dataObject), [dataObject]);
    return columns;
}
