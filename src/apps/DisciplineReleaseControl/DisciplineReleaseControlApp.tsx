import { ClientApi } from '@equinor/lighthouse-portal-client';
import { PowerBiOptions } from '../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import { htSidesheetCreator, rcSidesheetCreator } from './DisciplineReleaseControlWidgets';
import { Pipetest } from './Types/pipetest';
import { filterConfig, gardenConfig, presetConfig, tableConfig } from './WorkspaceConfig';
import { responseAsync, responseParser } from './WorkspaceConfig/DataSource';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Pipetest, 'pt'>({
            customSidesheetOptions: rcSidesheetCreator('WorkspaceSideSheet'),
            customGroupeSidesheet: htSidesheetCreator('WorkspaceSideSheet'),
            objectIdentifier: 'name',
            defaultTab: 'garden',
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions(filterConfig)
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerPresets(presetConfig)
        .registerSearchOptions([{ name: 'Id', valueFormatter: ({ name }) => name }])
        .registerStatusItems(statusBarConfig)
        .registerPowerBIOptions(
            !appApi.isProduction
                ? {
                      reportURI: 'pp-pipetest-analytics',
                  }
                : (undefined as unknown as PowerBiOptions)
        );
}
