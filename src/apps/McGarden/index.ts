import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { McCustomGroupByView } from './components/McCustomGroupByView';
import { CustomGroupByKeys, McPackage } from './types';
import { fieldSettings } from './utils/config/gardenSetup';
import McGardenItem from './components/CustomItemView/CustomItemView';
import McGardenHeader from './components/CustomHeaderView/CustomHeaderView';
import { getItemWidth } from './utils/helpers/getItemWidth';
import { sortPackagesByStatus } from './utils/helpers/sortPackages';
import { McSideSheet } from './components';
import { getHighlightedColumn } from './utils/helpers/getHighlightedColumn';

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
        console.log(parsedResponse);
        return parsedResponse.sort(sortPackagesByStatus);
    }
    const customGroupByKeys: CustomGroupByKeys = {
        plannedForecast: 'Planned',
        weeklyDaily: 'Weekly',
    };
    addApi
        .createWorkSpace<McPackage>({
            objectIdentifier: 'mcPkgId',
            CustomSidesheet: McSideSheet,
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions({
            excludeKeys: [
                'commPkgId',
                'commPkgNumber',
                'url',
                'siteCode',
                'priority',
                'priority2',
                'priority3',
            ],
        })
        .registerTableOptions({
            objectIdentifierKey: 'mcPkgId',
        })
        .registerGardenOptions({
            gardenKey: 'finalPunch' as keyof McPackage,
            itemKey: 'mcPkgNumber',
            type: 'virtual',
            fieldSettings: fieldSettings,
            customGroupByKeys,
            customViews: {
                customGroupByView: McCustomGroupByView,
                customHeaderView: McGardenHeader,
                customItemView: McGardenItem,
            },
            itemWidth: getItemWidth,
            rowHeight: 30,
            highlightColumn: getHighlightedColumn,
        });
}
