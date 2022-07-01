import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Punch } from './types/punch';
import {
    analyticsConfig,
    filterConfig,
    gardenConfig,
    sidesheetConfig,
    statusBarConfig,
    tableConfig,
} from './utility/config';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v0.1/dynamic/completion/custom_completionpunchitemextended/JCA', {
        body: JSON.stringify({}),
        signal,
    });
}

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Punch>({
            objectIdentifier: 'punchItemNo',
            customSidesheetOptions: sidesheetConfig('WorkspaceSideSheet'),
        })
        .registerDataSource({ responseAsync: responseAsync })
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerFilterOptions(filterConfig)
        .registerPowerBIOptions(analyticsConfig)
        .registerSearchOptions([
            { name: 'Punch No', valueFormatter: (punch) => punch.punchItemNo },
            { name: 'Compack', valueFormatter: (punch) => punch.commissioningPackageNo || '' },
        ]);
}
