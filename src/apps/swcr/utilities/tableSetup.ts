import { Column } from '@equinor/Table';
import { SwcrPackage } from '../models/SwcrPackage';

export const columns: Column<SwcrPackage>[] = [
    {
        Header: 'SWCRs',
        id: 'swcrId',
        aggregate: 'count',
        accessor: (a) => a.swcrId,
        Aggregated: ({ value }) => {
            return value;
        },
        Footer: (cell) => {
            const total = cell.rows.reduce((acc, curr) => curr.values.swcrId + acc, 0);
            return total;
        },
    },
    {
        Header: 'Open',
        id: 'swcrStatus',
        Aggregated: ({ row }) => {
            const count = row.subRows.reduce((acc, curr) => {
                acc =
                    curr.original.status !== 'Closed' &&
                    curr.original.status !== 'Closed - Rejected'
                        ? acc + 1
                        : acc;
                return acc;
            }, 0);
            return count;
        },
        Footer: (data) => {
            const count = data.data.reduce((acc, curr) => {
                acc =
                    curr.status !== 'Closed' && curr.status !== 'Closed - Rejected' ? acc + 1 : acc;
                return acc;
            }, 0);
            return count;
        },
    },
    {
        Header: 'Closed',
        id: 'swcrStatusClosed',
        Aggregated: ({ row }) => {
            const count = row.subRows.reduce((acc, curr) => {
                acc =
                    curr.original.status === 'Closed' ||
                    curr.original.status === 'Closed - Rejected'
                        ? acc + 1
                        : acc;
                return acc;
            }, 0);
            return count;
        },
        Footer: (data) => {
            const count = data.data.reduce((acc, curr) => {
                acc =
                    curr.status === 'Closed' || curr.status === 'Closed - Rejected' ? acc + 1 : acc;
                return acc;
            }, 0);
            return count;
        },
    },
    {
        Header: 'Closed %',
        id: 'closedpercent',
        accessor: () => 'swcrId',
        aggregate: 'count',
        Aggregated: (cell) => {
            const closed = cell.row.subRows.reduce((acc, curr) => {
                if (
                    curr.original.status === 'Closed' ||
                    curr.original.status === 'Closed - Rejected'
                ) {
                    acc++;
                }

                return acc;
            }, 0);
            const count = (closed / cell.row.values['swcrId']) * 100;
            return `${count.toFixed(2)}%`;
        },
        Footer: (cell) => {
            console.log('footer', cell);
            const subRows = cell.rows.flatMap((row) => row.subRows);
            const closed = subRows.reduce((acc, curr) => {
                if (
                    curr.original.status === 'Closed' ||
                    curr.original.status === 'Closed - Rejected'
                ) {
                    acc++;
                }
                return acc;
            }, 0);
            const sum = (closed / cell.data.length) * 100;
            return `${sum.toFixed(2)}%`;
        },
    },
    {
        Header: 'Priority',
        id: 'priority',
        accessor: (a) => a.priority,

        aggregate: 'count',
        Aggregated: ({ value }) => {
            return value;
        },
    },
    {
        Header: 'Control System',
        id: 'controlSystem',
        aggregate: 'count',
        accessor: (a) => a.controlSystem,
        Aggregated: ({ value }) => {
            return value;
        },
    },
    {
        Header: 'HW/SW',
        accessor: (swcr) => swcr.types,
        id: 'types',
    },
    {
        Header: 'System',
        id: 'system',
        accessor: (swcr) => swcr.system,
    },
];
