import { ClientApi, httpClient, isProduction } from '@equinor/lighthouse-portal-client';
import { McSideSheet } from './components';
import { McPackage } from './types';
import { filterConfig } from './utils/config/filterConfig';
import { gardenConfig } from './utils/config/gardenSetup';
import { tableConfig } from './utils/config/tableConfig';
import { sortPackagesByStatus } from './utils/helpers/sortPackages';

export function setup(addApi: ClientApi): void {
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';

    async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
        const { fusionDataproxy } = httpClient();

        return await fusionDataproxy.fetch(`api/contexts/${contextId}/mc-pkgs?api-version=2.0`, {
            signal: signal,
        });
    }

    async function responseParser(response: Response) {
        const parsedResponse = JSON.parse(await response.text()) as McPackage[];
        return parsedResponse.sort(sortPackagesByStatus);
    }

    addApi
        .createWorkSpace<McPackage>({
            objectIdentifier: 'mcPkgId',
            defaultTab: 'garden',
            CustomSidesheet: McSideSheet,
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions(filterConfig)

        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig);
}
