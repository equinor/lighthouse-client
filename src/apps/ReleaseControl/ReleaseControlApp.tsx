import { ClientApi } from '@equinor/lighthouse-portal-client';

import { ReleaseControl } from './types/releaseControl';
import { filterOptions, tableConfig, dataSource, idResolver } from './workspaceConfig';
import { gardenOptions } from './workspaceConfig/garden/gardenConfig';
import { ReleaseControlSidesheet } from './components/sidesheet/ReleaseControlSidesheet/ReleaseControlSidesheet';
import { dataCreatorConfig } from './workspaceConfig/DataCreator/dataCreatorConfig';

export function setup({ createWorkSpace }: ClientApi): void {
    createWorkSpace<ReleaseControl>({
        objectIdentifier: 'id',
        CustomSidesheet: ReleaseControlSidesheet,
        defaultTab: 'garden',
    })
        .registerDataCreator(dataCreatorConfig)
        .registerDataSource(dataSource)
        .registerTableOptions(tableConfig)
        .registerFilterOptions(filterOptions)
        .registerIdResolver(idResolver)
        .registerGardenOptions(gardenOptions);
}
