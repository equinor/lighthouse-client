import { FilterOptions } from '../../../packages/Filter/Types';
import { StatusFilter } from '../CustomViews/StatusFilter';
import { SwcrPackage, SwcrStatus } from '../models/SwcrPackage';
import { getLatestSignedRankingKey, getNextSignatureRoleKeys, getNextToSignKeys } from './packages';
import { sortBySwcrStatusPriority } from './sortFunctions';

export const filterSetup: FilterOptions<SwcrPackage> = [
    {
        name: 'Status',
        valueFormatter: ({ status }) => status,
        isQuickFilter: true,
        sort: (filterValues) =>
            filterValues.sort((a, b) => sortBySwcrStatusPriority(a as string, b as string)),
        customValueRender: (value) => {
            return <StatusFilter status={value as SwcrStatus} />;
        },
    },
    {
        name: 'Project identifier',
        valueFormatter: ({ projectIdentifier }) => projectIdentifier,
    },
    {
        name: 'Contract',
        valueFormatter: ({ contract }) => contract,
        isQuickFilter: true,
    },
    {
        name: 'Supplier',
        valueFormatter: ({ supplier }) => supplier,
        isQuickFilter: true,
    },
    {
        name: 'System',
        valueFormatter: ({ system }) => system,
        isQuickFilter: true,
    },
    {
        name: 'Types',
        valueFormatter: ({ types }) => (types.length > 0 ? types.split(',') : []),
        isQuickFilter: true,
    },
    {
        name: 'Plant',
        valueFormatter: ({ siteCode }) => siteCode,
    },
    {
        name: 'Priority',
        valueFormatter: ({ priority }) => priority,
    },
    {
        name: 'Control system',
        valueFormatter: ({ controlSystem }) => controlSystem,
    },
    {
        name: 'Next signature by',
        valueFormatter: (swcr) => getNextToSignKeys(swcr, ''),
        isQuickFilter: true,
    },
    {
        name: 'Next signature role',
        valueFormatter: (swcr) => getNextSignatureRoleKeys(swcr, ''),
    },
    {
        name: 'Last signed ranking',
        valueFormatter: (swcr) => getLatestSignedRankingKey(swcr, ''),
    },
    {
        name: 'Action',
        valueFormatter: ({ action }) => action,
    },
    {
        name: 'Node',
        valueFormatter: ({ node }) => node,
    },
    {
        name: 'Estimated manhours',
        valueFormatter: ({ estimatedManhours }) => estimatedManhours,
    },
    {
        name: 'COMMPK no',
        valueFormatter: ({ cpkgNo }) => cpkgNo,
    },
    {
        name: 'COMM phase',
        valueFormatter: ({ cpkgPhase }) => cpkgPhase,
    },
    {
        name: 'Other references',
        valueFormatter: ({ referenceTypes }) => referenceTypes,
    },
    {
        name: 'Due date',
        valueFormatter: ({ dueAtDate }) => dueAtDate,
    },
];
