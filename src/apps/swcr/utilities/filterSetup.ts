import { FilterOptions } from '../../../packages/Filter/Types';
import { SwcrPackage } from '../models/SwcrPackage';
import { getLatestSignedRankingKey, getNextSignatureRoleKeys, getNextToSignKeys } from './packages';

export const filterSetup: FilterOptions<SwcrPackage> = [
    {
        name: 'Status',
        valueFormatter: ({ status }) => status,
    },
    {
        name: 'Project identifier',
        valueFormatter: ({ projectIdentifier }) => projectIdentifier,
        defaultHidden: true,
    },
    {
        name: 'Contract',
        valueFormatter: ({ contract }) => contract,
    },
    {
        name: 'Supplier',
        valueFormatter: ({ supplier }) => supplier,
    },
    {
        name: 'System',
        valueFormatter: ({ system }) => system,
    },
    {
        name: 'Types',
        valueFormatter: ({ types }) => (types.length > 0 ? types.split(',') : []),
    },
    {
        name: 'Plant',
        valueFormatter: ({ siteCode }) => siteCode,
        defaultHidden: true,
    },
    {
        name: 'Priority',
        valueFormatter: ({ priority }) => priority,
        defaultHidden: true,
    },
    {
        name: 'Control system',
        valueFormatter: ({ controlSystem }) => controlSystem,
        defaultHidden: true,
    },
    {
        name: 'Next signature by',
        valueFormatter: (swcr) => getNextToSignKeys(swcr, ''),
    },
    {
        name: 'Next signature role',
        valueFormatter: (swcr) => getNextSignatureRoleKeys(swcr, ''),
    },
    {
        name: 'Last signed ranking',
        valueFormatter: (swcr) => getLatestSignedRankingKey(swcr, ''),
        defaultHidden: true,
    },
    {
        name: 'Action',
        valueFormatter: ({ action }) => action,
        defaultHidden: true,
    },
    {
        name: 'Node',
        valueFormatter: ({ node }) => node,
        defaultHidden: true,
    },
    {
        name: 'Estimated manhours',
        valueFormatter: ({ estimatedManhours }) => estimatedManhours,
        defaultHidden: true,
    },
    {
        name: 'COMMPK no',
        valueFormatter: ({ cpkgNo }) => cpkgNo,
        defaultHidden: true,
    },
    {
        name: 'COMM phase',
        valueFormatter: ({ cpkgPhase }) => cpkgPhase,
        defaultHidden: true,
    },
    {
        name: 'Other references',
        valueFormatter: ({ referenceTypes }) => referenceTypes,
        defaultHidden: true,
    },
    {
        name: 'Due date',
        valueFormatter: ({ dueAtDate }) => dueAtDate,
        defaultHidden: true,
    },
];
