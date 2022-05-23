import { ClientApi } from '@equinor/lighthouse-portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { GatewaySidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import { chewPipetestDataFromApi } from './Functions/statusHelpers';
import { Pipetest } from './Types/pipetest';

import { filterConfig, tableConfig, gardenConfig, presetConfig } from './WorkspaceConfig';

export function setup({ createWorkSpace }: ClientApi): void {
    const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
        const { FAM } = httpClient();
        return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal: signal });
    };

    const responseParser = async (response: Response) => {
        let json = JSON.parse(await response.text());
        json = chewPipetestDataFromApi(json);
        return json;
    };

    createWorkSpace<Pipetest>({
        CustomSidesheet: GatewaySidesheet,
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
        .registerStatusItems(statusBarConfig);
}
