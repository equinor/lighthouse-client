import { ClientApi } from '@equinor/lighthouse-portal-client';
import {
    ResolverFunction,
    SidesheetComponentManifest,
    SidesheetWidgetManifest
} from '@equinor/WorkSpace';
import { SidesheetWrapper } from './Components/Sidesheet/SidesheetWrapper/SidesheetWrapper';
import { ScopeChangeRequest } from './types/scopeChangeRequest';
import { dataCreator } from './workspaceConfig/dataCreatorConfig';
import { dataSource, idResolver } from './workspaceConfig/dataOptions';
import { filterConfig } from './workspaceConfig/filter/filterConfig';
import { prefetchQueriesOptions } from './workspaceConfig/prefetchQueryOptions';
import { gardenConfig } from './workspaceConfig/sGarden/gardenConfig';
import { tableConfig } from './workspaceConfig/sTable/tableConfig';
import { statusBarConfig } from './workspaceConfig/statusBarConfig';


export const changeSideSheetWidgetManifest: SidesheetWidgetManifest<ScopeChangeRequest, 'change'> =
    {
        widgetId: 'change',
        widgetType: 'sidesheet',
        color: '#7B3A96',
        props: {
            resolverId: 'changeResolver',
            objectIdentifier: 'id',
            parentApp: 'change',
        },
    };

export const changeSideSheetWidgetComponent: SidesheetComponentManifest<'change'> = {
    widgetId: 'change',
    widgetType: 'sidesheet',
    widget: SidesheetWrapper,
};

export const changeFunction: ResolverFunction<ScopeChangeRequest, 'change'> = {
    functionId: 'changeResolver',
    function: idResolver,
};

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<ScopeChangeRequest, 'change'>({
            CustomSidesheet: SidesheetWrapper,
            customSidesheetOptions: {
                ...changeSideSheetWidgetManifest,
                ...changeSideSheetWidgetComponent,
                resolver: changeFunction,
            },
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
    // .registerPowerBIOptions({
    //     pages: [
    //         {
    //             pageId: 'ReportSectionb822b2eb4fc97aef255b',
    //             pageTitle: 'Overview',
    //             default: true,
    //         },
    //         {
    //             pageId: 'ReportSection40a8a70e6f82243888ca',
    //             pageTitle: 'History',
    //         },
    //     ],
    //     reportURI: 'pp-scope-change-analytics',
    // });
}
