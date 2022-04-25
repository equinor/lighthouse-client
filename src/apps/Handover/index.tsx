import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { HandoverSideSheet } from './Garden/components/HandoverSidesheet';
import { statusBarData } from './Garden/components/statusItems';
import { HandoverGroupByView } from './Garden/CustomViews';
import HandoverGardenHeader from './Garden/CustomViews/HandoverGardenHeader';
import HandoverGardenItem from './Garden/CustomViews/HandoverGardenItem/HandoverGardenItem';
import { HandoverCustomGroupByKeys, HandoverPackage } from './Garden/models';
import {
    fieldSettings,
    getHighlightedColumn,
    getItemWidth,
    getMaxVolumeFromData,
    sortPackagesByStatus
} from './Garden/utility';
import { filterConfig } from './utility/config/filterSetup';
import { tableConfig } from './utility/config/tableConfig';
export function setup(appApi: ClientApi): void {
    const initialCustomGroupByKeys: HandoverCustomGroupByKeys = {
        weeklyDaily: 'Weekly',
        plannedForecast: 'Planned',
    };
    appApi
        .createWorkSpace<HandoverPackage>({
            CustomSidesheet: HandoverSideSheet,
            objectIdentifier: 'id',
            defaultTab: 'garden',
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions(filterConfig)
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'RFCC' as keyof HandoverPackage, // HOW to handled this ????
            itemKey: 'commpkgNo',
            type: 'virtual',
            fieldSettings: fieldSettings,
            customGroupByKeys: initialCustomGroupByKeys,
            customViews: {
                customGroupByView: HandoverGroupByView,
                customItemView: HandoverGardenItem,
                customHeaderView: HandoverGardenHeader,
            },
            rowHeight: 30,
            itemWidth: getItemWidth,
            highlightColumn: getHighlightedColumn,
            customStateFunction: (data) => ({ maxVolume: getMaxVolumeFromData(data) }),
        })
        .registerStatusItems(statusBarData)
        .registerPowerBIOptions({
            reportURI: 'pp-handover-analytics',
            pages: [
                {
                    pageTitle: 'RFO Overview',
                    pageId: 'ReportSectionb937310a77e18f67ff37',
                    default: true,
                },
                { pageTitle: 'RFC overview', pageId: 'ReportSectionda03508103eaf565faf8' },
                { pageTitle: 'Browser', pageId: 'ReportSection272f7d54d84d16689496' },
            ],
            options: {
                pageLoad: true,
            },
        });
}

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
    [];

    return parsedResponse.sort(sortPackagesByStatus);
}

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { fusion } = httpClient();
    fusion.setBaseUrl(
        `https://pro-s-dataproxy-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/api/contexts/`
    );
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    return await fusion.fetch(`${contextId}/handover/`, { signal: signal });
}
