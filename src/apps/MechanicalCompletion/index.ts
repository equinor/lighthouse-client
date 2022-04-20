import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { McPackage } from './types';
import { gardenConfig } from './utils/config/gardenSetup';
import { sortPackagesByStatus } from './utils/helpers/sortPackages';
import { McSideSheet } from './components';
import { filterConfig } from './utils/config/filterConfig';
import { tableConfig } from './utils/config/tableConfig';

export function setup(addApi: ClientApi): void {
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';

    async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
        const { fusionDataproxy } = httpClient();

        return await fusionDataproxy.fetch(`api/contexts/${contextId}/mc-pkgs`, {
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
