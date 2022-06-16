import { statusColorMap } from '@equinor/GardenUtils';
import { EstimateBar } from '@equinor/Table';
import { TableOptions } from '@equinor/WorkSpace';
import { Loop } from '../../types/loop';
const hiddenColumns: (keyof Loop)[] = [];

const columnOrder: (keyof Loop | string)[] = [
    'tagNo',
    'description',
    'functionalSystem',
    'commissioningPackageNo',
    'mechanicalCompletionPackageNo',
    'priority1',
    'rfcDate',
    'rfoDate',
];
export const tableConfig: TableOptions<Loop> = {
    objectIdentifierKey: 'checklistId',
    itemSize: 32,
    headers: [
        {
            key: 'tagNo',
            title: 'Loop tag',
            width: 200,
        },
        // {
        //     key: 'description',
        //     title: 'Description',
        //     width: 350,
        // },
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
            key: 'loopContentStatus',
            title: 'Content MC status',
        },
        // {
        //     key: 'mechanicalCompletionPackageNo',
        //     title: 'Planned MC complete',
        // },
        // {
        //     key: 'lastActualCompletionDate',
        //     title: 'Actual MC complete',
        // },
        // {
        //     key: 'sumRemainingManHours',
        //     title: 'Rem mhrs',
        // },
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
        // {
        //     key: 'lastActualCompletionDate',
        //     type: 'Date',
        // },
        // {
        //     key: 'plan',
        //     type: 'Date',
        // },
        // {
        //     key: 'description',
        //     type: 'Description',
        // },
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
            key: 'loopContentStatus',
            type: 'Status',
            cellAttributeFn: (pkg) => {
                return {
                    style: {
                        backgroundColor: pkg.loopContentStatus
                            ? statusColorMap[pkg.loopContentStatus]
                            : 'transparent',
                    },
                };
            },
        },
        // {
        //     key: 'sumRemainingManHours',
        //     type: {
        //         Cell: (table) => {
        //             const maxCount = Math.max(
        //                 ...table.cell.column.filteredRows.map((val) =>
        //                     Number(val.original?.sumRemainingManHours)
        //                 )
        //             );
        //             return (
        //                 <EstimateBar
        //                     current={Number(table.value.content.sumRemainingManHours)}
        //                     max={maxCount}
        //                 />
        //             );
        //         },
        //     },
        // },
    ],

    // customColumns: [
    //     {
    //         Header: 'RFC Planned/Forecast',
    //         id: 'rfcDate',
    //         accessor: (pkg) => (pkg.c01ForecastDate ? pkg.c01ForecastDate : pkg.c01PlannedDate),
    //         Cell: (table) => {
    //             return <div>{table.value ? new Date(table.value).toLocaleDateString() : ''}</div>;
    //         },
    //         Aggregated: () => null,
    //         aggregate: 'count',
    //         width: 160,
    //     },
    //     {
    //         Header: 'RFC Planned/Forecast',
    //         id: 'rfoDate',
    //         accessor: (pkg) => (pkg.c07ForecastDate ? pkg.c07ForecastDate : pkg.c07PlannedDate),
    //         Cell: (table) => {
    //             return <>{table.value ? new Date(table.value).toLocaleDateString() : ''}</>;
    //         },
    //         Aggregated: () => null,
    //         aggregate: 'count',
    //         width: 160,
    //     },
    // ],
};
