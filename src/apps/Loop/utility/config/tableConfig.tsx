import { statusColorMap } from '@equinor/GardenUtils';
import { EstimateBar } from '@equinor/Table';
import { TableOptions } from '@equinor/WorkSpace';
import { Loop } from '../../types/loop';
const hiddenColumns: (keyof Loop)[] = [
    'c01PlannedDate',
    'c01ForecastDate',
    'c07ForecastDate',
    'c07PlannedDate',
    'sourceIdentity',
    'facility',
    'project',
];

const columnOrder: (keyof Loop | string)[] = [
    'loopNo',
    'description',
    'functionalSystem',
    'commissioningPackageNo',
    'mechanicalCompletionPackageNo',
    'priority1',
    'rfcDate',
    'rfoDate',
];
export const tableConfig: TableOptions<Loop> = {
    objectIdentifierKey: 'loopNo',
    itemSize: 32,
    hiddenColumns,
    columnOrder,
    headers: [
        {
            key: 'loopNo',
            title: 'Loop tag',
            width: 200,
        },
        {
            key: 'description',
            title: 'Description',
            width: 350,
        },
        {
            key: 'functionalSystem',
            title: 'System',
            width: 80,
        },
        {
            key: 'commissioningPackageNo',
            title: 'Comm pkg',
        },
        {
            key: 'mechanicalCompletionPackageNo',
            title: 'MC pkg',
        },
        {
            key: 'priority1',
            title: 'Priority 1',
            width: 100,
        },
        {
            key: 'status',
            title: 'Checklist status',
            width: 120,
        },
        {
            key: 'responsible',
            title: 'Responsible',
            width: 100,
        },
        {
            key: 'signedDate',
            title: 'Signed',
        },
        {
            key: 'verifiedDate',
            title: 'Verified',
        },
        {
            key: 'firstMechanicalCompletionStatus',
            title: 'Content MC status',
        },
        {
            key: 'lastPlannedCompletionDate',
            title: 'Planned MC complete',
        },
        {
            key: 'lastActualCompletionDate',
            title: 'Actual MC complete',
        },
        {
            key: 'sumRemainingManHours',
            title: 'Rem mhrs',
        },
    ],
    customCellView: [
        {
            key: 'signedDate',
            type: 'Date',
        },
        {
            key: 'verifiedDate',
            type: 'Date',
        },
        {
            key: 'lastActualCompletionDate',
            type: 'Date',
        },
        {
            key: 'lastPlannedCompletionDate',
            type: 'Date',
        },
        {
            key: 'description',
            type: 'Description',
        },
        {
            key: 'status',
            type: 'Status',
            cellAttributeFn: (pkg) => {
                return {
                    style: {
                        backgroundColor: pkg.status ? statusColorMap[pkg.status] : 'transparent',
                    },
                };
            },
        },
        {
            key: 'firstMechanicalCompletionStatus',
            type: 'Status',
            cellAttributeFn: (pkg) => {
                return {
                    style: {
                        backgroundColor: pkg.firstMechanicalCompletionStatus
                            ? statusColorMap[pkg.firstMechanicalCompletionStatus]
                            : 'transparent',
                    },
                };
            },
        },
        {
            key: 'sumRemainingManHours',
            type: {
                Cell: (table) => {
                    const maxCount = Math.max(
                        ...table.cell.column.filteredRows.map((val) =>
                            Number(val.original?.sumRemainingManHours)
                        )
                    );
                    return (
                        <EstimateBar
                            current={Number(table.value.content.sumRemainingManHours)}
                            max={maxCount}
                        />
                    );
                },
            },
        },
    ],

    customColumns: [
        {
            Header: 'RFC Planned/Forecast',
            id: 'rfcDate',
            accessor: (pkg) => (pkg.c01ForecastDate ? pkg.c01ForecastDate : pkg.c01PlannedDate),
            Cell: (table) => {
                return <div>{table.value ? new Date(table.value).toLocaleDateString() : ''}</div>;
            },
            Aggregated: () => null,
            aggregate: 'count',
            width: 160,
        },
        {
            Header: 'RFC Planned/Forecast',
            id: 'rfoDate',
            accessor: (pkg) => (pkg.c07ForecastDate ? pkg.c07ForecastDate : pkg.c07PlannedDate),
            Cell: (table) => {
                return <>{table.value ? new Date(table.value).toLocaleDateString() : ''}</>;
            },
            Aggregated: () => null,
            aggregate: 'count',
            width: 160,
        },
    ],
};
