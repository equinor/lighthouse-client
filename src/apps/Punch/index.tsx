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
import { sortPackagesByStatus } from './utility/helpers/sortPackages';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v1/typed/completion/custom_punch/facility/JCA?view-version=v0', {
        body: JSON.stringify({}),
        signal,
    });
}

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as Punch[];
    return parsedResponse.sort(sortPackagesByStatus);
}

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Punch>({
            objectIdentifier: 'punchItemNo',
            customSidesheetOptions: sidesheetConfig('WorkspaceSideSheet'),
        })
        .registerDataSource({ responseAsync: responseAsync, responseParser: responseParser })
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerFilterOptions(filterConfig)
        .registerPowerBIOptions(analyticsConfig)
        .registerSearchOptions([
            { name: 'Punch No', valueFormatter: (punch) => punch.punchItemNo },
            { name: 'Description', valueFormatter: (punch) => punch.description ?? '' },
        ]);
}
