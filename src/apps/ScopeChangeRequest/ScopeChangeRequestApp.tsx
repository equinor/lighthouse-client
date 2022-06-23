import { ClientApi } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { PowerBiOptions } from '../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import { dataSource, idResolver } from './workspaceConfig/dataOptions';
import { filterConfig } from './workspaceConfig/filter/filterConfig';
import { prefetchQueriesOptions } from './workspaceConfig/prefetchQueryOptions';
import { gardenConfig } from './workspaceConfig/sGarden/gardenConfig';
import { tableConfig } from './workspaceConfig/sTable/tableConfig';
import { statusBarConfig } from './workspaceConfig/statusBarConfig';

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
        .registerPrefetchQueries(prefetchQueriesOptions)
        .registerPowerBIOptions(
            !appApi.isProduction
                ? {
                    pages: [
                        {
                            pageId: 'ReportSection4a8a96cf641d50747a13',
                            pageTitle: 'Overview',
                            default: true,
                        },
                        {
                            pageId: 'ReportSection40a8a70e6f82243888ca',
                            pageTitle: 'History',
                        },
                    ],
                    reportURI: 'pp-scope-change-analytics',
                }
                : (undefined as unknown as PowerBiOptions)
        );
}
