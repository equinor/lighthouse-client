import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Punch } from './types/punch';
import { gardenConfig, statusBarConfig, tableConfig } from './utility/config';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v0.1/dynamic/completion/completionpunchitem/JCA', {
        body: JSON.stringify({}),
        signal,
    });
}

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Punch>({
            objectIdentifier: 'punchItemNo',
        })
        .registerDataSource({ responseAsync: responseAsync })
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig);
}
