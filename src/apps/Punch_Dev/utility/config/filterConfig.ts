import { FilterOptions } from '@equinor/filter';
import { Punch } from '../../types/punch';

export const filterConfig: FilterOptions<Punch> = [
    {
        name: 'Category',
        valueFormatter: (punch) => punch.punchItemCategory,
    },
    {
        name: 'PL Sorting',
        valueFormatter: (punch) => punch.punchListSorting,
        isQuickFilter: true,
    },
    {
        name: 'PL type',
        valueFormatter: (punch) => punch.punchListType,
        isQuickFilter: true,
    },
    {
        name: 'Punch priority',
        valueFormatter: (punch) => punch.punchPriority,
    },
];
