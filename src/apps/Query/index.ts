import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Query } from './types';
import {
    analyticsConfig,
    tableConfig,
    filterConfig,
    statusBarConfig,
    gardenConfig,
    sidesheetConfig,
} from './utility/config';
import { sortQueryByStatus } from './utility/helpers';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v1/typed/completion/custom_query/facility/JCA?view-version=v0', {
        body: JSON.stringify({}),
        signal,
    });
}

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as Query[];
    return parsedResponse.sort(sortQueryByStatus);
}

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Query>({
            objectIdentifier: 'queryUrlId',
            customSidesheetOptions: sidesheetConfig('WorkspaceSideSheet'),
        })
        .registerDataSource({ responseAsync: responseAsync, responseParser: responseParser })
        .registerTableOptions(tableConfig)
        .registerFilterOptions(filterConfig)
        .registerStatusItems(statusBarConfig)
        .registerGardenOptions(gardenConfig)
        .registerPowerBIOptions(analyticsConfig)
        .registerSearchOptions([
            { name: 'Query No', valueFormatter: (query) => query.queryNo },
            { name: 'Title', valueFormatter: (query) => query.title },
        ]);
}
