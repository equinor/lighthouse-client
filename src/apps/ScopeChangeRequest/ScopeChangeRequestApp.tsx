import { ClientApi } from '@equinor/lighthouse-portal-client';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import {
    statusBarConfig,
    dataSource,
    prefetchQueriesOptions,
    filterConfig,
    gardenConfig,
    tableConfig,
    sidesheetCreator,
} from './utils/config';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<ScopeChangeRequest, 'change'>({
            customSidesheetOptions: sidesheetCreator('WorkspaceSideSheet'),
            objectIdentifier: 'id',
        })
        .registerDataSource(dataSource)
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerFilterOptions(filterConfig)
        .registerPrefetchQueries(prefetchQueriesOptions)
        .registerSearchOptions([
            { name: 'Id', valueFormatter: ({ sequenceNumber }) => sequenceNumber.toString() },
            { name: 'Title', valueFormatter: ({ title }) => title },
            { name: 'Description', valueFormatter: ({ description }) => description },
            {
                name: 'Warranty case',
                valueFormatter: (s) => (s.potentialWarrantyCase ? 'Warranty' : ''),
            },
        ])
        .registerPowerBIOptions({
            reportURI: 'pp-scope-change-analytics',
        });
}
