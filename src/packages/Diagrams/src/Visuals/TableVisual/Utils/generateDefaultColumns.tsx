import { useMemo } from 'react';

export interface HeaderData {
    key: string;
    title: string;
}

interface DefaultColumn<D> {
    accessor: keyof D;
    Header: string;
    minWidth: number;
    maxWidth: number;
    aggregate: string;
    Aggregated: (cell: any) => JSX.Element;
    Footer: (data: any) => JSX.Element;
}

export function generateDefaultColumns<D>(headerItem?: D): DefaultColumn<D>[] {
    if (!headerItem) return [];
    const filteredHeaderItem = Object.keys(headerItem).filter((key) => {
        if (Array.isArray(headerItem[key]) || typeof headerItem[key] === 'object') return false;
        return true;
    });
    return filteredHeaderItem.map((key) => {
        return {
            accessor: key as keyof D,
            Header: key,
            minWidth: 30,
            maxWidth: 100,
            aggregate: 'uniqueCount',
            Aggregated: (cell) => {
                return <>{cell.value}</>;
            },
            Footer: (data) => {
                const total = useMemo(
                    () => data.rows.reduce((sum, row) => row.values[key] + sum, 0),
                    [data.rows]
                );

                if (data.state.groupBy.includes(key)) {
                    return <div>Total: </div>;
                }
                return <div> {total}</div>;
            },
        };
    });
}
