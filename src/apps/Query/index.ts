import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Query } from './model';
import { QuerySideSheet } from './components/QuerySidesheet/querySidesheet';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { sortQueryByStatus } from './helpers/sortFuctions';
import {
    analyticsConfig,
    tableConfig,
    filterConfig,
    statusBarConfig,
    gardenConfig,
} from './config';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v0.1/dynamic/completion/custom_query/JCA', {
        body: JSON.stringify({}),
        signal,
    });
}

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as Query[];
    return parsedResponse.sort(sortQueryByStatus);
}
const creator = setupWorkspaceSidesheet<Query, 'queryDetails'>({
    id: 'queryDetails',
    color: '#0084C4',
    component: QuerySideSheet,
    props: {
        objectIdentifier: 'queryNo',
        parentApp: 'handover',
        function: async (id: string) => {
            const items = await responseParser(await responseAsync());
            const result = items.find((item) => item.queryId === id);
            return result ? result : items.find((item) => item.queryNo === id);
        },
    },
});
export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Query>({
            objectIdentifier: 'queryId',
            customSidesheetOptions: creator('WorkspaceSideSheet'),
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
