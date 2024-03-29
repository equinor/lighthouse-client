import { ClientApi } from '@equinor/lighthouse-portal-client';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import { dataSource, idResolver } from './workspaceConfig/dataOptions';
import { filterConfig } from './workspaceConfig/filter/filterConfig';
import { prefetchQueriesOptions } from './workspaceConfig/prefetchQueryOptions';
import { gardenConfig } from './workspaceConfig/sGarden/gardenConfig';
import { tableConfig } from './workspaceConfig/sTable/tableConfig';
import { statusBarConfig } from './workspaceConfig/statusBarConfig';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';

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
      { name: 'Id', valueFormatter: ({ serialNumber }) => serialNumber },
      { name: 'Title', valueFormatter: ({ title }) => title },
      { name: 'Description', valueFormatter: ({ description }) => description },
      {
        name: 'Warranty case',
        valueFormatter: (s) => (s.potentialWarrantyCase ? 'Warranty' : ''),
      },
    ])
    .registerPrefetchQueries(prefetchQueriesOptions)
    .registerPowerBIOptions({
      reportURI: 'pp-scope-change-analytics',
    });
}
