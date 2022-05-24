import { ClientApi } from '@equinor/lighthouse-portal-client';
import { ReleaseControlSidesheet } from './components/sidesheet/ReleaseControlSidesheet/ReleaseControlSidesheet';
import { ReleaseControl } from './types/releaseControl';
import { dataSource, filterOptions, tableConfig } from './workspaceConfig';
import { gardenOptions } from './workspaceConfig/garden/gardenConfig';

//Update Sidesheet config
export function setup({ createWorkSpace }: ClientApi): void {
    createWorkSpace<ReleaseControl>({
        objectIdentifier: 'id',
        CustomSidesheet: ReleaseControlSidesheet,
        defaultTab: 'garden',
    })
        .registerDataSource(dataSource)
        .registerTableOptions(tableConfig)
        .registerFilterOptions(filterOptions)
        .registerGardenOptions(gardenOptions);
}
