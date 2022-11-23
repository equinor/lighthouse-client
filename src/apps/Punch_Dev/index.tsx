import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Punch } from './types/punch';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { PunchSideSheet } from './components';
import {
    analyticsConfig,
    filterConfig,
    gardenConfig,
    statusBarConfig,
    tableConfig,
} from './utility/config';
import { sortPackagesByStatus } from './utility/helpers/sortPackages';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v0.1/dynamic/completion/custom_punch/JCA', {
        body: JSON.stringify({}),
        signal,
    });
}

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as Punch[];
    return parsedResponse.sort(sortPackagesByStatus);
}

const creator = setupWorkspaceSidesheet<Punch, 'punchDetails'>({
    id: 'punchDetails',
    color: '#0364B8',
    component: PunchSideSheet,
    props: {
        objectIdentifier: 'punchItemNo',
        parentApp: 'punch',
        function: async (id: string) => {
            // TODO: Add Proper resolver function
            const items = await responseParser(await responseAsync());
            return items.find((item) => item.punchItemNo === id);
        },
    },
});

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Punch>({
            objectIdentifier: 'punchItemNo',
            customSidesheetOptions: creator('WorkspaceSideSheet'),
        })
        .registerDataSource({ responseAsync: responseAsync, responseParser: responseParser })
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerFilterOptions(filterConfig)
        .registerPowerBIOptions(analyticsConfig)
        .registerSearchOptions([
            { name: 'Punch No', valueFormatter: (punch) => punch.punchItemNo },
        ]);
}
