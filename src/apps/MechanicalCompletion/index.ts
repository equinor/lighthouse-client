import { ClientApi, getFusionContextId, httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { McSideSheet } from './components';
import { McPackage } from './types';
import { filterConfig } from './utils/config/filterConfig';
import { gardenConfig } from './utils/config/gardenSetup';
import { tableConfig } from './utils/config/tableConfig';
import { sortPackagesByStatus } from './utils/helpers/sortPackages';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const contextId = getFusionContextId();
    const { fusionDataproxy } = httpClient();

    return await fusionDataproxy.fetch(`api/contexts/${contextId}/mc-pkgs?api-version=2.0`, {
        signal,
    });
}

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as McPackage[];
    return parsedResponse.sort(sortPackagesByStatus);
}

const creator = setupWorkspaceSidesheet<McPackage, 'mcDetails'>({
    id: 'mcDetails',
    color: '#0084C4',
    component: McSideSheet,
    props: {
        objectIdentifier: 'mcPkgId',
        parentApp: 'mc',
        function: async (id: string) => {
            // TODO: Add Proper resolver function
            const items = await responseParser(await responseAsync());
            return items.find((item) => item.mcPkgId === id);
        },
    },
});

export const mcCreatorManifest = creator('SidesheetManifest');
export const mcCreatorComponent = creator('SidesheetComponentManifest');
export const mcResolverFunction = creator('ResolverFunction');

export function setup(addApi: ClientApi): void {
    addApi
        .createWorkSpace<McPackage>({
            objectIdentifier: 'mcPkgId',
            defaultTab: 'garden',
            customSidesheetOptions: creator('WorkspaceSideSheet'),
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions(filterConfig)
        .registerSearchOptions([{ name: 'Id', valueFormatter: ({ mcPkgNumber }) => mcPkgNumber }])

        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig);
}
