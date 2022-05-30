import { ClientApi, getFusionContextId, httpClient } from '@equinor/lighthouse-portal-client';
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
    sortPackagesByStatus,
} from './Garden/utility';
import { filterConfig } from './utility/config/filterSetup';
import { tableConfig } from './utility/config/tableConfig';
export function setup(appApi: ClientApi): void {
    const initialCustomGroupByKeys: HandoverCustomGroupByKeys = {
        weeklyDaily: 'Weekly',
        plannedForecast: 'Forecast',
    };
    appApi
        .createWorkSpace<HandoverPackage>({
            CustomSidesheet: HandoverSideSheet,
            objectIdentifier: 'id',
            defaultTab: 'garden',
        })
        .registerDataSource({
            responseAsync,
            responseParser,
        })
        .registerFilterOptions(filterConfig)
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'RFCC' as keyof HandoverPackage, // HOW to handled this ????
            itemKey: 'commpkgNo',
            objectIdentifier: 'id',
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
        // .registerSearchOptions([{ name: 'Id', valueFormatter: ({ commpkgNo }) => commpkgNo }])
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
    return parsedResponse.sort(sortPackagesByStatus);
}

async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { fusionDataproxy } = httpClient();
    const contextId = getFusionContextId();
    return await fusionDataproxy.fetch(`/api/contexts/${contextId}/handover/`, { signal: signal });
}
