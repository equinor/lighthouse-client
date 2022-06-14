import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Loop } from './types/loop';
import { filterConfig, gardenConfig, sidesheetConfig, tableConfig } from './utility/config';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v0.1/dynamic/completion/custom_loopready/JCA', {
        body: JSON.stringify({}),
        signal,
    });
}

export function setup(addApi: ClientApi): void {
    addApi
        .createWorkSpace<Loop>({
            customSidesheetOptions: sidesheetConfig('WorkspaceSideSheet'),
            objectIdentifier: 'loopNo',
        })
        .registerDataSource({ responseAsync: responseAsync })
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerFilterOptions(filterConfig);
}
