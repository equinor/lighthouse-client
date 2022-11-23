import { FilterOptions } from '@equinor/filter';
import { Punch, PunchStatus } from '../../types/punch';
import { getHasWO, getMaterialRequired } from './punchItemMapping';
import { StatusFilter } from '../helpers/StatusFilter';
export const filterConfig: FilterOptions<Punch> = [
    {
        name: 'Category',
        valueFormatter: (punch) => punch.category,
    },
    {
        name: 'Status',
        valueFormatter: ({ status }) => status,
        defaultUncheckedValues: ['Closed'],
        isQuickFilter: true,
        customValueRender: (value) => {
            return <StatusFilter status={value as PunchStatus} />;
        },
    },
    {
        name: 'Clearing by',
        valueFormatter: (punch) => punch.cleardBy,
        isQuickFilter: true,
    },
    {
        name: 'Raised by',
        valueFormatter: (punch) => punch.raisedBy,
    },
    {
        name: 'Punch priority',
        valueFormatter: (punch) => punch.priority,
        isQuickFilter: true,
    },
    {
        name: 'PL Sorting',
        valueFormatter: (punch) => punch.sorting,
        isQuickFilter: true,
    },
    {
        name: 'PL type',
        valueFormatter: (punch) => punch.type,
    },
    {
        name: 'Has Workorder',
        valueFormatter: (pkg) => getHasWO(pkg),
    },
    {
        name: 'Responsible',
        valueFormatter: (punch) => punch.responsible,
    },
    {
        name: 'Material',
        valueFormatter: (pkg) => getMaterialRequired(pkg),
    },
    {
        name: 'Commpkg',
        valueFormatter: (punch) => punch.commissioningPackageNo,
        isQuickFilter: true,
    },
    {
        name: 'System',
        valueFormatter: (punch) => punch.system,
    },
    {
        name: 'Identifier',
        valueFormatter: (punch) => punch.identifier,
    },
];
