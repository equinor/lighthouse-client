import { ClientApi } from '@equinor/lighthouse-portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import { htSidesheetCreator, rcSidesheetCreator } from './DisciplineReleaseControlWidgets';
import { chewPipetestDataFromApi } from './Functions/statusHelpers';
import { Pipetest } from './Types/pipetest';
import { filterConfig, gardenConfig, presetConfig, tableConfig } from './WorkspaceConfig';

export const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
    const { FAM } = httpClient();
    return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal });
};

export const responseParser = async (response: Response) => {
    let json = JSON.parse(await response.text());
    json = chewPipetestDataFromApi(json);
    return json;
};
export function setup({ createWorkSpace }: ClientApi): void {
    createWorkSpace<Pipetest, 'pt'>({
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
        .registerStatusItems(statusBarConfig);
}
