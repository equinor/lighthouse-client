import { ClientApi } from '@equinor/portal-client';
import {
    ScopeChangeSidesheetNew,
    ScopeChangeSidesheetWrapper,
} from './Components/Sidesheet/ScopeChangeSidesheetWrapper';
import { ScopeChangeRequest } from './Types/scopeChangeRequest';
import { dataCreator } from './WorkspaceConfig/dataCreatorConfig';
import { dataSource, idResolver } from './WorkspaceConfig/dataOptions';
import { filterConfig } from './WorkspaceConfig/filterConfig';
import { gardenConfig } from './WorkspaceConfig/Garden/gardenConfig';
import { prefetchQueriesOptions } from './WorkspaceConfig/prefetchQueryOptions';
import { statusBarConfig } from './WorkspaceConfig/statusBarConfig';
import { tableConfig } from './WorkspaceConfig/Table/tableConfig';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<ScopeChangeRequest>({
            CustomSidesheet: ScopeChangeSidesheetNew,
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
