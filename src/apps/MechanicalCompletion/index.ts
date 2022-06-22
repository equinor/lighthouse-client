import { ClientApi, getFusionContextId, httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { McSideSheet } from './components';
import { McPackage } from './types';
import { filterConfig } from './utils/config/filterConfig';
import { gardenConfig } from './utils/config/gardenSetup';
import { statusBarConfig } from './utils/config/statusBarConfig';
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
            return items.find((item) => item.mcPkgId === id || item.mcPkgNumber === id);
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
        .registerSearchOptions([
            { name: 'Mc pkg', valueFormatter: ({ mcPkgNumber }) => mcPkgNumber },
            { name: 'Comm pkg', valueFormatter: (pkg) => pkg.commPkgNumber },
        ])

        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerStatusItems(statusBarConfig)
        .registerPowerBIOptions(
            !addApi.isProduction
                ? {
                      reportURI: 'pp-mc-analytics',
                      pages: [
                          {
                              pageTitle: 'RFC overview',
                              pageId: 'ReportSection',
                              default: true,
                          },
                          {
                              pageTitle: 'RFO overview',
                              pageId: 'ReportSection694be20a69e6e527702c',
                          },
                      ],
                  }
                : (undefined as any)
        );
}
