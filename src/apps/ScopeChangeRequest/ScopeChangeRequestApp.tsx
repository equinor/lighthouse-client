import { ClientApi } from '@equinor/portal-client';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';

import { ScopeChangeRequest } from './types/scopeChangeRequest';
import { dataCreator } from './workspaceConfig/dataCreatorConfig';
import { dataSource, idResolver } from './workspaceConfig/dataOptions';
import { filterConfig } from './workspaceConfig/filterConfig';
import { gardenConfig } from './workspaceConfig/Garden/gardenConfig';
import { prefetchQueriesOptions } from './workspaceConfig/prefetchQueryOptions';
import { statusBarConfig } from './workspaceConfig/statusBarConfig';
import { tableConfig } from './workspaceConfig/Table/tableConfig';

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
