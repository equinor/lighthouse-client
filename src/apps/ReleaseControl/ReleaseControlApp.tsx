import { ClientApi } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { ReleaseControlSidesheet } from './components/sidesheet/ReleaseControlSidesheet/ReleaseControlSidesheet';
import { ReleaseControl } from './types/releaseControl';
import { dataSource, filterOptions, idResolverFunction, tableConfig } from './workspaceConfig';
import { dataCreatorConfig } from './workspaceConfig/DataCreator/dataCreatorConfig';
import { gardenOptions } from './workspaceConfig/garden/gardenConfig';

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

export const releaseCreatorManifest = creator('SidesheetManifest');
export const releaseCreatorComponent = creator('SidesheetComponentManifest');
export const releaseResolverFunction = creator('ResolverFunction');

export function setup({ createWorkSpace }: ClientApi): void {
    createWorkSpace<ReleaseControl>({
        objectIdentifier: 'id',
        customSidesheetOptions: creator('WorkspaceSideSheet'),
        defaultTab: 'garden',
    })
        .registerDataCreator(dataCreatorConfig)
        .registerDataSource(dataSource)
        .registerTableOptions(tableConfig)
        .registerFilterOptions(filterOptions)
        .registerGardenOptions(gardenOptions);
}
