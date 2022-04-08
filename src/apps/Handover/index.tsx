import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { statusBarData } from './Garden/components/statusItems';
import { HandoverGroupByView, HandoverSideSheet } from './Garden/CustomViews';
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
import { tableConfig } from './Garden/utility/tableConfig';
enum Tabs {
    TABLE,
    GARDEN,
}
export function setup(appApi: ClientApi): void {
    const initialCustomGroupByKeys: HandoverCustomGroupByKeys = {
        weeklyDaily: 'Weekly',
        plannedForecast: 'Planned',
    };
    appApi
        .createWorkSpace<HandoverPackage>({
            CustomSidesheet: HandoverSideSheet,
            objectIdentifier: 'id',
            defaultTab: 'Garden',
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions([
            {
                name: 'Comm pkg status',
                valueFormatter: ({ commpkgStatus }) => commpkgStatus,
            },
            {
                name: 'MC status',
                valueFormatter: ({ mcStatus }) => mcStatus,
            },
            {
                name: 'System',
                valueFormatter: ({ system }) => system,
            },
            {
                name: 'Comm pkg responsible',
                valueFormatter: ({ responsible }) => responsible,
            },
            {
                name: 'Comm pkg discipline',
                valueFormatter: ({ mcDisciplineCodes }) => mcDisciplineCodes,
            },
            {
                name: 'Comm pkg phase',
                valueFormatter: ({ phase }) => phase,
            },
            {
                name: 'Comm pkg priority 1',
                valueFormatter: ({ priority1 }) => priority1,
            },
            {
                name: 'Comm pkg priority 2',
                valueFormatter: ({ priority2 }) => priority2,
            },
            {
                name: 'Comm pkg priority 3',
                valueFormatter: ({ priority3 }) => priority3,
            },
            {
                name: 'Area',
                valueFormatter: ({ area }) => area,
            },
        ])
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
        .registerStatusItems(statusBarData);
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
