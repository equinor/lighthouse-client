import { ClientApi } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import {
    statusBarConfig,
    dataSource,
    idResolver,
    prefetchQueriesOptions,
    filterConfig,
    gardenConfig,
    tableConfig,
} from './utils/config';

const sidesheetCreator = setupWorkspaceSidesheet<ScopeChangeRequest, 'change'>({
    id: 'change',
    color: '#7B3A96',
    component: SidesheetWrapper,
    props: {
        objectIdentifier: 'id',
        parentApp: 'change',
        function: idResolver,
    },
});

export const changeSideSheetWidgetManifest = sidesheetCreator('SidesheetManifest');
export const changeSideSheetWidgetComponent = sidesheetCreator('SidesheetComponentManifest');
export const changeResolverFunction = sidesheetCreator('ResolverFunction');

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
