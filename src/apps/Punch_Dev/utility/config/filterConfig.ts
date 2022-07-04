import { FilterOptions } from '@equinor/filter';
import { Punch } from '../../types/punch';

export const filterConfig: FilterOptions<Punch> = [
    {
        name: 'Open/closed',
        valueFormatter: (punch) => {
            if (punch.clearedAtDate) {
                return 'Closed';
            } else {
                return 'Open';
            }
        },
        isQuickFilter: true,
    },
    {
        name: 'Clearing by',
        valueFormatter: (punch) => punch.clearingByOrganization,
        isQuickFilter: true,
    },
    {
        name: 'Priority',
        valueFormatter: (punch) => punch.punchPriority,
        isQuickFilter: true,
    },
    {
        name: 'Sorting',
        valueFormatter: (punch) => punch.punchListSorting,
        isQuickFilter: true,
    },
    {
        name: 'Category',
        valueFormatter: (punch) => punch.punchItemCategory,
    },

    {
        name: 'Type',
        valueFormatter: (punch) => punch.punchListType,
    },
];
