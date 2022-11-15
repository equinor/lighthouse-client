import { ClientApi } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
// import { adminConfig } from './components/Admin/adminConfig';
import { ReleaseControlSidesheet } from './components/sidesheet/ReleaseControlSidesheet/ReleaseControlSidesheet';
import { ReleaseControl } from './types/releaseControl';
import { dataSource, filterOptions, idResolverFunction, tableConfig } from './workspaceConfig';
import { gardenOptions } from './workspaceConfig/garden/gardenConfig';
import { statusBarConfig } from './workspaceConfig/statusBar/statusBarConfig';

const creator = setupWorkspaceSidesheet<ReleaseControl, 'releaseDetails'>({
    id: 'releaseDetails',
    color: '#0084C4',
    component: ReleaseControlSidesheet,
    props: {
        objectIdentifier: 'id',
        parentApp: 'release',
        function: idResolverFunction,
    },
});

export const releaseManifest = creator('SidesheetManifest');
export const releaseComponent = creator('SidesheetComponentManifest');
export const releaseResolverFunction = creator('ResolverFunction');

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<ReleaseControl>({
            objectIdentifier: 'id',
            customSidesheetOptions: creator('WorkspaceSideSheet'),
            defaultTab: 'table',
        })
        .registerDataSource(dataSource)
        .registerTableOptions(tableConfig)
        .registerFilterOptions(filterOptions)
        .registerSearchOptions([
            {
                name: 'Title',
                valueFormatter: (pkg) => pkg.title,
            },
        ])
        .registerGardenOptions(gardenOptions)
        .registerPowerBIOptions({
            reportURI: 'pp-release-control-analytics',
        })
        .registerStatusItems(statusBarConfig);
    //TODO - temporarily commented out until admin is done
    // .registerAdminOptions(adminConfig);
}
