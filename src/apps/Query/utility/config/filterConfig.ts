import { FilterOptions } from '@equinor/filter';
import { Query } from '../../types';
import { getOverdue } from '../helpers/queryItemMapping';

export const filterConfig: FilterOptions<Query> = [
    {
        name: 'Discipline',
        valueFormatter: (Query) => Query.disciplineDescription,
        isQuickFilter: true,
    },
    {
        name: 'Next To sign',
        valueFormatter: (Query) => Query.nextToSign,
        isQuickFilter: true,
    },
    {
        name: 'Status',
        valueFormatter: (Query) => Query.queryStatus,
        isQuickFilter: true,
    },
    {
        name: 'Query type',
        valueFormatter: (Query) => Query.queryType,
        isQuickFilter: true,
    },
    {
        name: 'Milestone',
        valueFormatter: (Query) => Query.milestone,
        isQuickFilter: true,
    },
    {
        name: 'Is overdue',
        valueFormatter: (pkg) => getOverdue(pkg),
        isQuickFilter: true,
    },
];
