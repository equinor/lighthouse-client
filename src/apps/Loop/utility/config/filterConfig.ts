import { FilterOptions } from '@equinor/filter';
import { Loop } from '../../types/loop';

export const filterConfig: FilterOptions<Loop> = [
    {
        name: 'Priority 1',
        valueFormatter: (pkg) => pkg.priority1,
    },
    {
        name: 'Responsible',
        valueFormatter: (pkg) => pkg.responsible,
    },
    {
        name: 'MC status',
        valueFormatter: (pkg) => pkg.loopContentStatus,
    },
    {
        name: 'Functional System',
        valueFormatter: (pkg) => pkg.functionalSystem,
    },
];
