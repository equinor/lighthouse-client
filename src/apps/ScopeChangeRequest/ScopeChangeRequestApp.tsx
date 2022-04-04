import { ClientApi } from '@equinor/portal-client';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';

import { ScopeChangeRequest } from './sTypes/scopeChangeRequest';
import { dataCreator } from './sWorkspaceConfig/dataCreatorConfig';
import { dataSource, idResolver } from './sWorkspaceConfig/dataOptions';
import { filterConfig } from './sWorkspaceConfig/filterConfig';
import { gardenConfig } from './sWorkspaceConfig/sGarden/gardenConfig';
import { prefetchQueriesOptions } from './sWorkspaceConfig/prefetchQueryOptions';
import { statusBarConfig } from './sWorkspaceConfig/statusBarConfig';
import { tableConfig } from './sWorkspaceConfig/sTable/tableConfig';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<ScopeChangeRequest>({
            CustomSidesheet: SidesheetWrapper,
            objectIdentifier: 'id',
        })
        .registerDataSource(dataSource)
        .registerDataCreator(dataCreator)
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerFilterOptions(filterConfig)
        .registerIdResolver(idResolver)
        .registerPrefetchQueries(prefetchQueriesOptions);
}
