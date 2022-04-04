import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import {
    HandoverGardenHeader,
    HandoverGardenItem,
    HandoverGroupByView,
    HandoverSideSheet,
} from './Garden/CustomViews';
import { HandoverCustomGroupByKeys, HandoverPackage } from './Garden/models';
import {
    fieldSettings,
    getDotsColor,
    getMaxVolumeFromData,
    hiddenColumns,
    removedFilterOptions,
    sortPackagesByStatus,
} from './Garden/utility';
import { Status } from './Garden/components/commonStyles';
import { statusBarData } from './Garden/components/statusItems';
enum Tabs {
    TABLE,
    GARDEN,
}
export function setup(appApi: ClientApi): void {
    const handover = appApi
        .createWorkSpace<HandoverPackage>({
            CustomSidesheet: HandoverSideSheet,
            objectIdentifier: 'id',
            defaultTab: Tabs.GARDEN,
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions({ excludeKeys: removedFilterOptions });

    async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
        const { fusion } = httpClient();
        fusion.setBaseUrl(
            `https://pro-s-dataproxy-${
                isProduction() ? 'fprd' : 'ci'
            }.azurewebsites.net/api/contexts/`
        );
        const contextId = isProduction()
            ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
            : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
        return await fusion.fetch(`${contextId}/handover/`, { signal: signal });
    }

    async function responseParser(response: Response) {
        const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
        [];

        return parsedResponse.sort(sortPackagesByStatus);
    }

    // handover.registerFilterOptions({});

    //  handover.registerTableOptions({ objectIdentifierKey: '' });

    const initialCustomGroupByKeys: HandoverCustomGroupByKeys = {
        weeklyDaily: 'Weekly',
        plannedForecast: 'Planned',
    };
    handover.registerTableOptions({
        objectIdentifierKey: 'commpkgNo',
        hiddenColumns: hiddenColumns,
        customCellView: [
            {
                key: 'commpkgStatus',
                type: {
                    Cell: ({ cell }) => {
                        const commStatus = cell.value.content.commpkgStatus;
                        const commStatusColor = getDotsColor(commStatus);
                        return (
                            <Status color={commStatusColor} width={25} height={20}>
                                {commStatus}
                            </Status>
                        );
                    },
                },
            },
            {
                key: 'mcStatus',
                type: {
                    Cell: ({ cell }) => {
                        const mcStatus = cell.value.content.mcStatus;
                        const mcStatusColor = getDotsColor(mcStatus);
                        return (
                            <Status color={mcStatusColor} width={25} height={20}>
                                {mcStatus}
                            </Status>
                        );
                    },
                },
            },
            {
                key: 'progress',
                type: 'Number',
            },
            {
                key: 'volume',
                type: 'Number',
            },
            {
                key: 'mcPkgsCount',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFCCShippedCount',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFCCSigned',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFOCShipped',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFOCSigned',
                type: 'Number',
            },
            {
                key: 'createdDate',
                type: 'Date',
            },
        ],
    });
    handover.registerGardenOptions({
        gardenKey: 'RFCC' as keyof HandoverPackage, // HOW to handled this ????
        itemKey: 'commpkgNo',
        type: 'normal',
        fieldSettings: fieldSettings,
        customGroupByKeys: initialCustomGroupByKeys,
        customViews: {
            customGroupByView: HandoverGroupByView,
            customItemView: HandoverGardenItem,
            customHeaderView: HandoverGardenHeader,
        },
        customStateFunction: (data) => ({ maxVolume: getMaxVolumeFromData(data) }),
    });

    handover.registerStatusItems(statusBarData);
}
