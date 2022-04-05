import { Column } from '@equinor/Table';
import { TableOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { SwcrPackage } from '../models/SwcrPackage';
import { getNextSignatureRoleKeys, getNextToSignKeys, getTypeKeys } from './packages';
export const tableConfig: TableOptions<SwcrPackage> = {
    objectIdentifierKey: 'swcrId',
    columnOrder: [
        'swcrNo',
        'title',
        'contract',
        'system',
        'status',
        'nextToSign',
        'nextSignRanking',
        'supplier',
        'types',
        'priority',
        'controlSystem',
        'node',
    ],
    headers: [
        {
            key: 'swcrNo',
            title: 'Swcr',
            width: 60,
        },
        {
            key: 'title',
            title: 'Title',
            width: 500,
        },
        {
            key: 'contract',
            title: 'Contract',
            width: 100,
        },
        {
            key: 'system',
            title: 'System',
            width: 80,
        },
        {
            key: 'status',
            title: 'Status',
            width: 150,
        },
        {
            key: 'nextToSign',
            title: 'Next sign by',
            width: 600,
        },
        {
            key: 'nextSignRanking',
            title: 'Next sign role',
            width: 500,
        },
        {
            key: 'supplier',
            title: 'Supplier',
            width: 150,
        },
        {
            key: 'types',
            title: 'Types',
            width: 70,
        },
        {
            key: 'priority',
            title: 'Priority',
            width: 150,
        },

        {
            key: 'controlSystem',
            title: 'Control System',
            width: 150,
        },
        {
            key: 'node',
            title: 'Node',
            width: 60,
        },
    ],
    customCellView: [
        {
            key: 'title',
            type: 'Description',
        },
        {
            key: 'nextToSign',
            type: {
                Cell: (cell) => {
                    const keys = getNextToSignKeys(cell.value.content, '');
                    return (
                        <div
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {keys}
                        </div>
                    );
                },
            },
        },
        {
            key: 'types',
            type: {
                Cell: (cell) => {
                    return getTypeKeys(cell.value.content, '');
                },
            },
        },
        {
            key: 'nextSignRanking',
            type: {
                Cell: (cell) => {
                    return getNextSignatureRoleKeys(cell.value.content, '');
                },
            },
        },
    ],
    hiddenColumns: [
        'siteCode',
        'projectIdentifier',
        'projectDescription',
        'modification',
        'action',
        'referenceTypes',
        'createdAtDate',
        'updatedAtDate',
        'dueAtDate',
        'closedAtDate',
        'closedAtDate',
        'estimatedManhours',
        'cntAttachments',
        'cpkgNo',
        'cpkgPhase',
        'cpkgStartPlannedAtDate',
        'cpkgStartForecastAtDate',
        'cpkgFinishPlannedAtDate',
        'cpkgFinishForecastAtDate',
        'url',
        'latestSignRanking',
        'swcrId',
        'rowKey',
        'nextsToSign',
        'description',
    ],
};
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
